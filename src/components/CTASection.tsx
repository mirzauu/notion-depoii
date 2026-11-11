"use client";

import React, { useState } from "react";
import { Check, X, Mail, ArrowRight } from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { getOrCreateVisitorId, logVisitorEvent } from "./VisitorTracker";

export const DALLAS_ZONES = [
  {
    id: "dallas-north-corridor",
    name: "Zone 1: North Dallas Corridor",
    description: "Galleria, Preston Hollow, Addison, Far North Dallas (Tollway)",
  },
  {
    id: "dallas-central-uptown",
    name: "Zone 2: Central / Uptown / CBD",
    description: "Downtown Dallas, Uptown, Knox-Henderson, Highland Park adjacent",
  },
  {
    id: "dallas-east-lakelands",
    name: "Zone 3: East Dallas / Lake Highlands",
    description: "Deep Ellum, Casa Linda, Lake Highlands commercial nodes",
  },
  {
    id: "dallas-south-industrial",
    name: "Zone 4: South Dallas Industrial",
    description: "Cedars, Oak Cliff, South Stemmons distribution parks",
  },
  {
    id: "dallas-northwest-suburbs",
    name: "Zone 5: Northwest / DFW Suburbs",
    description: "Stemmons Corridor, Farmers Branch, Coppell, Carrollton, Irving",
  },
];

export function ClayBadge({
  label,
  color = "rose",
}: {
  label: string;
  color?: "rose" | "blue" | "emerald";
}) {
  const styles = {
    rose: "bg-[#FFF2F4] text-[#E11D48] border-[#FED9DF]",
    blue: "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]",
    emerald: "bg-[#ECFDF5] text-[#059669] border-[#D1FAE5]",
  }[color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${styles}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function SourceBadge({
  name,
  code,
  color = "blue",
}: {
  name: string;
  code: string;
  color?: "blue" | "rose";
}) {
  const isBlue = color === "blue";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${
        isBlue
          ? "border-blue-200 bg-blue-50/80 text-blue-900"
          : "border-neutral-200 bg-neutral-50 text-neutral-800"
      }`}
    >
      <span className="font-mono text-[10px] font-bold opacity-75">{code}</span>
      <span>{name}</span>
    </span>
  );
}

export function CTASection() {
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [territory, setTerritory] = useState("All 5 DFW Zones (Full Metroplex Lockout)");
  const [sizeRange, setSizeRange] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const openFormFor = () => {
    setTerritory("All 5 DFW Zones (Full Metroplex Lockout)");
    setStep(1);
    setSubmitted(false);
    setError("");
    setModalOpen(true);
    logVisitorEvent("form_intent", {
      actionDetail: "Opened Enterprise Concession Briefing (Metroplex Dominator)",
    });
  };

  const handleEmailNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid work email address.");
      return;
    }
    setError("");

    const visitorId = getOrCreateVisitorId();

    // Step 1 Partial Capture to alert via email
    fetch("/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        email: email.trim(),
        isPartial: true,
        source: "Metroplex Dominator - Step 1 Partial Capture",
        territory: "All 5 DFW Zones (Full Metroplex Lockout)",
      }),
    }).catch(() => {});

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const visitorId = getOrCreateVisitorId();

    const payload = {
      visitorId,
      email: email.trim(),
      name: name.trim() || "Commercial Contractor",
      company: company.trim() || "Commercial Roofing Contractor",
      territory: "All 5 DFW Zones (Full Metroplex Lockout)",
      sizeRange: sizeRange.trim() || "Enterprise Commercial / Industrial",
      source: "Metroplex Dominator (Custom Retainer)",
      isPartial: false,
    };

    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "The form did not save. Try again.");
      }

      setSubmitted(true);
      logVisitorEvent("interaction", {
        actionDetail: "Completed Metroplex Dominator Application",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "The form did not save. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="pilot"
      className="scroll-mt-16 border-t border-neutral-200/90 bg-[#F9FAFB] py-24 sm:py-28 text-neutral-950"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.15rem] leading-[1.12] font-bold tracking-tight text-neutral-950 sm:text-[2.85rem] md:text-[3.15rem]">
            Get Depoii working for you.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:text-base">
            To protect contractor margins and lead exclusivity, standard corridor access is capped at a{" "}
            <span className="font-semibold text-neutral-950 bg-amber-100/80 border border-amber-300/80 px-2 py-0.5 rounded-md text-[14.5px] sm:text-[15.5px]">
              maximum of 2 commercial contractors
            </span>{" "}
            per DFW zone. Regional operators who require total lockout can secure the Metroplex Dominator master license to buy out all seats across all 5 zones with 0 competitors.
          </p>
        </div>

        {/* Metroplex Dominator Card — Architectural Ledger */}
        <div className="mt-14 max-w-3xl mx-auto">
          {/* Card: Enterprise Dominator */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-neutral-950 bg-white p-7 sm:p-10 shadow-lg relative">
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between">
                <ClayBadge label="Enterprise Concession" color="blue" />
                <span className="text-[12px] font-semibold tracking-wide text-neutral-900 uppercase">
                  Full DMA Exclusivity
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                  Metroplex Dominator
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600">
                  Autonomous commercial intelligence, real-time storm dispatch, and guaranteed 100% competitor lockout for regional roofing heavyweights.
                </p>
              </div>

              {/* Price Block */}
              <div className="mt-6 rounded-xl border border-blue-200/80 bg-[#F4F8FE] p-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
                    Custom Retainer
                  </span>
                </div>

                <p className="mt-1 text-xs sm:text-sm text-neutral-600">
                  Annual master license · Multi-zone or complete DFW territorial lockout
                </p>

                {/* Source Integration Badges */}
                <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                  <SourceBadge name="Doppler Radar" code="SPC" color="blue" />
                  <SourceBadge name="City Permits" code="BLD" color="blue" />
                  <SourceBadge name="Appraisal Roll" code="CAD" color="blue" />
                  <SourceBadge name="Secretary of State" code="SOS" color="blue" />
                </div>
              </div>

              {/* Architectural Spec Ledger */}
              <div className="mt-6 space-y-2.5 divide-y divide-neutral-100 text-[13.5px] sm:text-[14px]">
                <div className="flex items-start justify-between pt-2.5 first:pt-0">
                  <span className="text-neutral-500">Geographic Scope</span>
                  <span className="text-right font-medium text-neutral-900">
                    All 5 DFW Metro Zones (Complete county footprint)
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Territory Lockout</span>
                  <span className="text-right font-semibold text-blue-700">
                    100% exclusive lockout · 0 competitors in your turf
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Storm Velocity</span>
                  <span className="text-right font-medium text-neutral-900">
                    Sub-6hr real-time Doppler radar swath ingestion
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Autonomous AI</span>
                  <span className="text-right font-medium text-neutral-900">
                    Depoii AI first-touch outreach generator
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">CRM Integration</span>
                  <span className="text-right font-medium text-neutral-900">
                    Native 2-way sync (HubSpot, JobNimbus, Procore)
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Encroachment Radar</span>
                  <span className="text-right font-medium text-neutral-900">
                    Instant alerts when rivals file permits near your jobs
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Dedicated Support</span>
                  <span className="text-right font-medium text-neutral-900">
                    Unlimited seats + Dedicated Data Engineer
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={openFormFor}
                className="w-full h-11 rounded-xl bg-neutral-950 text-white font-semibold hover:bg-neutral-800 transition shadow-xs flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Request Corridor Intelligence Briefing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Contact info Callout */}
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <DepoiiMark className="size-5 text-neutral-900" />
            </div>
            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600">
              <strong className="text-neutral-950 font-semibold">Strict Territory Exclusivity:</strong> Depoii continuously tracks commercial opportunities across DFW corridors. Your briefing reveals active targets in your zone before locking territory exclusivity.
            </p>
          </div>
          <a
            href="mailto:hello@depoii.com?subject=Custom%20Depoii%20Enterprise%20Inquiry"
            className="text-xs sm:text-[13px] font-bold text-neutral-950 hover:text-neutral-700 whitespace-nowrap transition"
          >
            Contact us: hello@depoii.com →
          </a>
        </div>
      </div>

      {/* Action / Application Modal — High Taste Minimalist */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-[430px] rounded-2xl border border-neutral-200 bg-white p-7 sm:p-8 text-neutral-950 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Icon */}
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
              <DepoiiMark className="size-6 text-neutral-900" />
            </div>

            {submitted ? (
              <div className="text-center space-y-3 py-2">
                <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="size-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                  Request Received
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-600">
                  We logged your inquiry for <strong>{company || "your company"}</strong>. Our team will verify territory seat availability across <strong>{territory}</strong> and contact you at <strong>{email}</strong> within 1 business day.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="h-10 rounded-xl bg-neutral-950 text-white font-semibold hover:bg-neutral-800 w-full cursor-pointer transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {step === 1 ? (
                  <form onSubmit={handleEmailNext} className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                        Enterprise Intelligence Briefing
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500">
                        Enter your commercial contracting work email to begin.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <input
                        type="email"
                        required
                        autoFocus
                        placeholder="john@commercialroofing.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 w-full rounded-xl border border-neutral-300 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    {error && <p className="text-xs text-rose-600 font-medium text-left">{error}</p>}

                    <button
                      type="submit"
                      className="h-11 w-full rounded-xl bg-neutral-950 text-white font-semibold shadow-xs hover:bg-neutral-800 cursor-pointer flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Compact verified email chip */}
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="size-3.5 shrink-0 text-neutral-400" />
                        <span className="truncate font-medium text-neutral-900">{email}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setError("");
                        }}
                        className="font-semibold text-rose-600 hover:underline cursor-pointer ml-2 shrink-0"
                      >
                        Change
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-neutral-700">Your Name</label>
                        <input
                          required
                          autoFocus
                          placeholder="John Miller"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-10 w-full rounded-xl border border-neutral-300 px-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-neutral-700">Company</label>
                        <input
                          required
                          placeholder="Apex Commercial"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="h-10 w-full rounded-xl border border-neutral-300 px-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Typical Commercial Footprint</label>
                      <input
                        placeholder="e.g. 50k+ sq ft / Industrial / Warehouses"
                        value={sizeRange}
                        onChange={(e) => setSizeRange(e.target.value)}
                        className="h-10 w-full rounded-xl border border-neutral-300 px-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="h-11 w-full rounded-xl bg-neutral-950 text-white font-semibold shadow-xs hover:bg-neutral-800 cursor-pointer flex items-center justify-center gap-1.5 transition disabled:opacity-60"
                      >
                        <span>
                          {submitting ? "Submitting..." : "Submit Enterprise Inquiry"}
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
