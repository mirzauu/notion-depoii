"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { getOrCreateVisitorId, logVisitorEvent } from "./VisitorTracker";
import { trackGenerateLead } from "@/lib/analytics";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [territory, setTerritory] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    setFirstName("");
    setLastName("");
    setCompany("");
    setTerritory("");
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setErrorMsg("Please enter your first name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const visitorId = getOrCreateVisitorId();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          email: email.trim(),
          name: fullName || "Commercial Contractor",
          company: company.trim() || "Commercial Roofing Contractor",
          territory: territory.trim() || "Dallas–Fort Worth, TX",
          sizeRange: "Enterprise Commercial / Industrial",
          source: "Walkthrough Request Form",
          isPartial: false,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed. Please try again.");
      }

      setIsSubmitted(true);
      trackGenerateLead({
        leadType: "walkthrough_demo",
        source: "Walkthrough Request Form",
        territory: territory.trim() || "Dallas–Fort Worth, TX",
        sizeRange: "Enterprise Commercial / Industrial",
      });
      logVisitorEvent("interaction", {
        actionDetail: `Completed Walkthrough request for ${email.trim()}`,
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#f5f5f4]"
    >
      <button
        onClick={handleClose}
        type="button"
        aria-label="Close walkthrough modal"
        className="fixed top-5 right-5 sm:top-6 sm:right-8 z-50 w-10 h-10 rounded-full bg-white text-[#4a4845] hover:text-[#111110] shadow-md flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      <header className="sticky top-0 z-40 w-full pointer-events-none px-5 sm:px-8">
        <div className="max-w-[1240px] mx-auto pointer-events-auto bg-white rounded-b-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-4 sm:px-7 h-16 sm:h-[68px] flex items-center justify-between">
          <Link href="/" prefetch={false} onClick={handleClose} className="flex items-center gap-2.5">
            <DepoiiMark className="w-7 h-7 text-[#111110]" />
            <span className="font-bold text-[1.35rem] tracking-tight text-[#111110]">
              Depoii
            </span>
          </Link>

          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-[14px] font-semibold rounded-full text-white bg-[#111110] hover:bg-[#2b2a28] transition-colors cursor-pointer"
          >
            Back to overview
          </button>
        </div>
      </header>

      <div className="max-w-[760px] mx-auto px-5 pt-10 sm:pt-14 pb-16 sm:pb-24">
        <div className="bg-white rounded-[28px] p-8 sm:p-12 text-left">
          <h2
            id="demo-modal-title"
            className="text-[32px] sm:text-[44px] font-bold text-[#111110] tracking-[-0.035em] leading-[1.1]"
          >
            Book a DFW territory walkthrough
          </h2>

          <p className="mt-4 text-[16px] text-[#4a4845] leading-relaxed max-w-xl">
            We will pull live commercial roofs matching your crew’s square footage and DFW corridors so your estimating team sees real opportunities on the call.
          </p>

          {isSubmitted ? (
            <div className="mt-8 p-8 rounded-2xl bg-[#dcfce7] text-left">
              <div className="w-11 h-11 rounded-full bg-white text-[#14532d] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-bold text-[#111110]">Walkthrough request received.</h3>
              <p className="mt-2 text-[#262523] text-[15px] leading-relaxed max-w-lg">
                We will reach out to <strong>{email}</strong> within 1 business day with territory availability and a live walkthrough for your corridors.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 h-11 px-6 rounded-full bg-[#111110] text-white font-semibold text-[14px] hover:bg-[#2b2a28] transition-colors cursor-pointer"
              >
                Return to overview
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="demo-first" className="block text-[14px] font-semibold text-[#111110] mb-1.5">
                    First name
                  </label>
                  <input
                    id="demo-first"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Steve"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f4f1] focus:bg-white border border-neutral-300 focus:border-[#111110] focus:outline-none text-[15px] text-[#111110]"
                  />
                </div>

                <div>
                  <label htmlFor="demo-last" className="block text-[14px] font-semibold text-[#111110] mb-1.5">
                    Last name
                  </label>
                  <input
                    id="demo-last"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Miller"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f4f1] focus:bg-white border border-neutral-300 focus:border-[#111110] focus:outline-none text-[15px] text-[#111110]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="demo-company" className="block text-[14px] font-semibold text-[#111110] mb-1.5">
                    Company name
                  </label>
                  <input
                    id="demo-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="DFW Commercial Roofing"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f4f1] focus:bg-white border border-neutral-300 focus:border-[#111110] focus:outline-none text-[15px] text-[#111110]"
                  />
                </div>

                <div>
                  <label htmlFor="demo-territory" className="block text-[14px] font-semibold text-[#111110] mb-1.5">
                    Target corridors
                  </label>
                  <input
                    id="demo-territory"
                    type="text"
                    value={territory}
                    onChange={(e) => setTerritory(e.target.value)}
                    placeholder="North Dallas, Fort Worth, Irving"
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f4f1] focus:bg-white border border-neutral-300 focus:border-[#111110] focus:outline-none text-[15px] text-[#111110]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="demo-email" className="block text-[14px] font-semibold text-[#111110] mb-1.5">
                  Work email
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estimating@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f4f1] focus:bg-white border border-neutral-300 focus:border-[#111110] focus:outline-none text-[15px] text-[#111110]"
                />
              </div>

              {errorMsg && (
                <p className="text-[14px] font-medium text-[#b91c1c]">
                  {errorMsg}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-8 rounded-full bg-[#111110] hover:bg-[#2b2a28] disabled:opacity-50 text-white font-semibold text-[15px] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending request..." : "Request Territory Walkthrough"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
