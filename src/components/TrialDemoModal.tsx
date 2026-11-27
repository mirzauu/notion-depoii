"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Building2,
  MapPin,
  Layers,
  Target,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { getOrCreateVisitorId, logVisitorEvent } from "./VisitorTracker";
import { trackGenerateLead } from "@/lib/analytics";

interface TrialDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_SIZE_OPTIONS = [
  "25,000–50,000 sq ft",
  "50,000–150,000 sq ft",
  "150,000+ sq ft Industrial",
  "All Commercial (25k+ sq ft)",
];

export function TrialDemoModal({ isOpen, onClose }: TrialDemoModalProps) {
  const [company, setCompany] = useState("");
  const [territory, setTerritory] = useState("");
  const [sizeRange, setSizeRange] = useState(TARGET_SIZE_OPTIONS[1]);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    setCompany("");
    setTerritory("");
    setSizeRange(TARGET_SIZE_OPTIONS[1]);
    setEmail("");
    setErrorMsg("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedCompany = company.trim();
    const trimmedTerritory = territory.trim() || "Dallas–Fort Worth Metroplex";

    if (!trimmedCompany) {
      setErrorMsg("Please enter your roofing company name.");
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setErrorMsg("Please enter a valid work email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const vid = getOrCreateVisitorId();

    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          visitorId: vid,
          name: trimmedCompany,
          company: trimmedCompany,
          territory: trimmedTerritory,
          sizeRange,
          source: "10-Roof Territory Brief Modal",
          isPartial: false,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Could not submit your brief request.");
      }

      trackGenerateLead({
        leadType: "trial_brief",
        source: "10-Roof Territory Brief Modal",
        territory: trimmedTerritory,
        sizeRange,
      });
      logVisitorEvent("interaction", {
        actionDetail: `Requested 10-Roof Brief for ${trimmedCompany} (${trimmedTerritory})`,
      });
      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      {/* Background Layer: Dimmed Depoii Commercial Territory Preview */}
      <div className="fixed inset-0 w-full h-full hidden md:flex bg-[#f5f5f4] text-[#111110] select-none pointer-events-none">
        <div className="w-16 bg-white border-r border-neutral-200 flex flex-col items-center py-5 gap-6 shrink-0">
          <DepoiiMark className="w-6 h-6 text-[#111110]" />
          <Target className="w-5 h-5 text-[#ea580c]" />
          <Building2 className="w-5 h-5 text-neutral-400" />
          <MapPin className="w-5 h-5 text-neutral-400" />
          <Layers className="w-5 h-5 text-neutral-400" />
        </div>

        <div className="flex-1 p-10 overflow-hidden">
          <div className="max-w-4xl">
            <h2 className="text-[26px] font-bold text-[#111110] tracking-tight">
              DFW Commercial Crew Queue
            </h2>
            <p className="text-[14px] text-[#4a4845] mt-1">
              Buildings matched to target square footage, corridor, and recent weather exposure
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { name: "8600 S Central Expy", spec: "48,200 sq ft · South Dallas", note: "19-yr TPO + 1.75\" hail nearby" },
                { name: "14201 Inwood Rd", spec: "84,000 sq ft · North Dallas", note: "22-yr Mod-Bit + 2.25\" hail track" },
                { name: "2200 E Airport Fwy", spec: "32,500 sq ft · Irving", note: "17-yr EPDM · No active reroof" },
              ].map((card) => (
                <div key={card.name} className="p-4 rounded-xl bg-white border border-neutral-200">
                  <div className="font-bold text-[14px] text-[#111110]">{card.name}</div>
                  <div className="text-[12.5px] text-[#4a4845] mt-1">{card.spec}</div>
                  <div className="mt-3 px-2.5 py-1 rounded bg-[#f5f4f1] text-[12px] font-medium text-[#111110]">
                    {card.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dim Scrim */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#111110]/55 cursor-pointer"
        aria-label="Close modal backdrop"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="brief-modal-title"
        className="relative bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.28)] p-6 sm:p-9 max-w-[500px] w-full z-10 text-left"
      >
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-[#4a4845] hover:text-[#111110] hover:bg-[#f5f5f4] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <DepoiiMark className="w-6 h-6 text-[#111110]" />
              <span className="text-[13.5px] font-semibold text-[#ea580c]">
                Custom DFW Walk-Sheet
              </span>
            </div>

            <h2
              id="brief-modal-title"
              className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#111110] leading-[1.15]"
            >
              Get your 10-Roof Territory Brief
            </h2>

            <p className="mt-2 text-[14.5px] text-[#4a4845] leading-relaxed">
              Tell us the buildings your crew chases. Within 24 hours, we will send 10 DFW commercial roofs matching your target, with roof age, weather proof, and owner entities.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              <div>
                <label htmlFor="brief-company" className="block text-[13.5px] font-semibold text-[#111110] mb-1.5">
                  Roofing company name
                </label>
                <input
                  id="brief-company"
                  type="text"
                  required
                  autoFocus
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Lone Star Commercial Roofing"
                  className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 text-[#111110] placeholder:text-neutral-500 focus:outline-none focus:border-[#111110] text-[14.5px]"
                />
              </div>

              <div>
                <label htmlFor="brief-territory" className="block text-[13.5px] font-semibold text-[#111110] mb-1.5">
                  Target DFW corridors or ZIPs
                </label>
                <input
                  id="brief-territory"
                  type="text"
                  required
                  value={territory}
                  onChange={(e) => setTerritory(e.target.value)}
                  placeholder="Irving, North Dallas, Fort Worth Industrial"
                  className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 text-[#111110] placeholder:text-neutral-500 focus:outline-none focus:border-[#111110] text-[14.5px]"
                />
              </div>

              <div>
                <label htmlFor="brief-size" className="block text-[13.5px] font-semibold text-[#111110] mb-1.5">
                  Ideal building size
                </label>
                <select
                  id="brief-size"
                  value={sizeRange}
                  onChange={(e) => setSizeRange(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-white text-[#111110] focus:outline-none focus:border-[#111110] text-[14.5px]"
                >
                  {TARGET_SIZE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="brief-email" className="block text-[13.5px] font-semibold text-[#111110] mb-1.5">
                  Work email
                </label>
                <input
                  id="brief-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estimating@company.com"
                  className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 text-[#111110] placeholder:text-neutral-500 focus:outline-none focus:border-[#111110] text-[14.5px]"
                />
              </div>

              {errorMsg && (
                <p className="text-[13px] text-[#b91c1c] font-medium">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full bg-[#111110] hover:bg-[#2b2a28] text-white font-semibold text-[15px] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
              >
                {isSubmitting ? (
                  <span>Preparing request...</span>
                ) : (
                  <>
                    <span>Send My 10-Roof Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-[13px] leading-relaxed text-[#4a4845]">
              By submitting, you request a custom DFW brief from Depoii. See our{" "}
              <Link href="/privacy" onClick={handleClose} className="underline hover:text-[#111110]">
                Privacy Policy
              </Link>
              .
            </p>

            <div className="mt-4 pt-3 flex items-center gap-2 text-[13px] font-medium text-[#3a3835]">
              <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
              <span>Built on NWS Storm Reports, DCAD/TAD Rolls, and City Permit Archives</span>
            </div>
          </>
        ) : (
          <div className="text-left">
            <div className="w-11 h-11 rounded-full bg-[#dcfce7] text-[#14532d] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h2 className="text-[24px] font-bold text-[#111110] tracking-tight leading-snug">
              Territory Brief request received.
            </h2>

            <p className="mt-2 text-[15px] text-[#4a4845] leading-relaxed">
              We are preparing a 10-roof DFW estimator walk-sheet for{" "}
              <strong className="text-[#111110]">{company}</strong> and will send it to{" "}
              <strong className="text-[#111110]">{email}</strong> within 24 hours.
            </p>

            <div className="mt-5 rounded-2xl bg-[#f5f5f4] p-4 space-y-2.5 text-[14px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#4a4845]">Corridors requested</span>
                <span className="font-semibold text-[#111110] text-right">{territory}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#4a4845]">Target footprint</span>
                <span className="font-semibold text-[#111110] text-right">{sizeRange}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#4a4845]">Delivery window</span>
                <span className="font-semibold text-[#14532d]">Within 24 hours</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full h-11 rounded-full bg-[#111110] hover:bg-[#2b2a28] text-white font-semibold text-[14.5px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Return to overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
