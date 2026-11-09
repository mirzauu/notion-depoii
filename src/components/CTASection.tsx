"use client";

import React, { useState } from "react";
import { Check, X, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";

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
  const [selectedPlan, setSelectedPlan] = useState<"pilot" | "enterprise">("pilot");
  const [billingCycle, setBillingCycle] = useState<"3month" | "1month">("3month");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [territory, setTerritory] = useState(DALLAS_ZONES[0].name);
  const [sizeRange, setSizeRange] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const openFormFor = (plan: "pilot" | "enterprise") => {
    setSelectedPlan(plan);
    setTerritory(plan === "pilot" ? DALLAS_ZONES[0].name : "All 5 DFW Zones (Full Metroplex Lockout)");
    setStep(1);
    setSubmitted(false);
    setError("");
    setModalOpen(true);
  };

  const handleEmailNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid work email address.");
      return;
    }
    setError("");

    const planLabel =
      selectedPlan === "pilot"
        ? `Single-Zone Pilot (${billingCycle === "3month" ? "$349/mo" : "$549/mo"})`
        : "Enterprise Concession";

    // Step 1 Partial Capture to alert via email
    fetch("/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        isPartial: true,
        source: `${planLabel} - Step 1 Partial Capture`,
        territory: selectedPlan === "pilot" ? territory || "Single DFW Zone (Pending Step 2)" : "All DFW Metro (Pending Step 2)",
      }),
    }).catch(() => {});

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const planLabel =
      selectedPlan === "pilot"
        ? `Single-Zone Pilot (${billingCycle === "3month" ? "$349/mo (3-Month Commitment)" : "$549 (1-Month Run)"})`
        : "Enterprise Concession";

    const payload = {
      email: email.trim(),
      name: name.trim() || "Commercial Contractor",
      company: company.trim() || "Commercial Roofing Contractor",
      territory: selectedPlan === "pilot" ? territory.trim() : "All 5 DFW Zones (Full Metroplex Lockout)",
      sizeRange: selectedPlan === "pilot" ? sizeRange.trim() || "Commercial 40k+ sq ft" : "Enterprise Commercial / Industrial",
      source: planLabel,
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
          <div className="flex justify-center">
            <ClayBadge label="Founding Cohort" color="rose" />
          </div>

          <h2 className="mt-5 text-[2.15rem] leading-[1.12] font-bold tracking-tight text-neutral-950 sm:text-[2.85rem] md:text-[3.15rem]">
            Lock your operating corridor before competitors pull the permit.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:text-base">
            To protect lead exclusivity and contractor margins, Depoii caps workspace access to a maximum of 2 commercial contractors per DFW zone. Test live pre-permit intelligence in your primary corridor with a 90-day pilot, or secure full metroplex exclusivity.
          </p>
        </div>

        {/* Dual Cards Grid — Editorial Architectural Ledger */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          
          {/* Card 1: Single-Zone Pilot */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-7 sm:p-9 shadow-xs transition hover:border-neutral-400/80 hover:shadow-md">
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between">
                <ClayBadge label="Single-Zone Pilot" color="rose" />
                <span className="text-[12px] font-semibold tracking-wide text-neutral-500 uppercase">
                  1 Zone Cap
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Corridor Production Trial
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Validate unmasked commercial property intelligence &amp; 20–40 year municipal permit archives across your primary DFW bidding sector.
                </p>
              </div>

              {/* Price Block */}
              <div className="mt-6 rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-4.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight text-neutral-950">
                    {billingCycle === "3month" ? "$349" : "$549"}
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">/ month</span>
                </div>

                <p className="mt-1 text-xs text-neutral-500">
                  {billingCycle === "3month"
                    ? "3-month production trial ($1,047 total commitment)"
                    : "Flexible 1-month run · Cancel anytime"}
                </p>

                {/* Switcher */}
                <div className="mt-3 flex items-center rounded-lg bg-neutral-200/70 p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("3month")}
                    className={`flex-1 rounded-md py-1.5 transition cursor-pointer text-center ${
                      billingCycle === "3month"
                        ? "bg-white text-neutral-950 shadow-xs"
                        : "text-neutral-600 hover:text-neutral-950"
                    }`}
                  >
                    3-Month ($349/mo — Save 36%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("1month")}
                    className={`flex-1 rounded-md py-1.5 transition cursor-pointer text-center ${
                      billingCycle === "1month"
                        ? "bg-white text-neutral-950 shadow-xs"
                        : "text-neutral-600 hover:text-neutral-950"
                    }`}
                  >
                    1-Month ($549)
                  </button>
                </div>
              </div>

              {/* Architectural Spec Ledger */}
              <div className="mt-6 space-y-2.5 divide-y divide-neutral-100 text-[13.5px]">
                <div className="flex items-start justify-between pt-2.5 first:pt-0">
                  <span className="text-neutral-500">Geographic Scope</span>
                  <span className="text-right font-medium text-neutral-900">
                    1 Selected DFW Corridor (Dallas North, Tarrant, or Mid-Cities)
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Territory Defense</span>
                  <span className="text-right font-medium text-neutral-900">
                    Strict cap · Max 2 contractors per zone
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Municipal Archives</span>
                  <span className="text-right font-medium text-neutral-900">
                    20–40 yr permit history + aging roof alarms
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Weather Polygons</span>
                  <span className="text-right font-medium text-neutral-900">
                    NOAA Doppler hail swaths (&gt;1.25&quot; footprint)
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Decision-Maker Intel</span>
                  <span className="text-right font-medium text-neutral-900">
                    35 unmasked commercial deed owners / mo
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Estimating Desks</span>
                  <span className="text-right font-medium text-neutral-900">
                    2 Project Estimator / BD login seats
                  </span>
                </div>
                <div className="flex items-start justify-between pt-2.5">
                  <span className="text-neutral-500">Equity Guarantee</span>
                  <span className="text-right font-semibold text-rose-700">
                    100% of pilot spend credited toward Enterprise
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => openFormFor("pilot")}
                className="w-full h-11 rounded-xl bg-neutral-950 text-white font-semibold hover:bg-neutral-800 transition shadow-xs flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Claim your pilot zone</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Enterprise Dominator */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-neutral-950 bg-white p-7 sm:p-9 shadow-md relative">
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between">
                <ClayBadge label="Enterprise Concession" color="blue" />
                <span className="text-[12px] font-semibold tracking-wide text-neutral-900 uppercase">
                  Full DMA Exclusivity
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Metroplex Dominator
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Autonomous commercial intelligence, real-time storm dispatch, and guaranteed 100% competitor lockout for regional roofing heavyweights.
                </p>
              </div>

              {/* Price Block */}
              <div className="mt-6 rounded-xl border border-blue-200/80 bg-[#F4F8FE] p-4.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
                    Custom Retainer
                  </span>
                </div>

                <p className="mt-1 text-xs text-neutral-600">
                  Annual master license · Multi-zone or complete DFW territorial lockout
                </p>

                {/* Source Integration Badges */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <SourceBadge name="Doppler Radar" code="SPC" color="blue" />
                  <SourceBadge name="City Permits" code="BLD" color="blue" />
                  <SourceBadge name="Appraisal Roll" code="CAD" color="blue" />
                  <SourceBadge name="Secretary of State" code="SOS" color="blue" />
                </div>
              </div>

              {/* Architectural Spec Ledger */}
              <div className="mt-6 space-y-2.5 divide-y divide-neutral-100 text-[13.5px]">
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
                onClick={() => openFormFor("enterprise")}
                className="w-full h-11 rounded-xl bg-neutral-950 text-white font-semibold hover:bg-neutral-800 transition shadow-xs flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Schedule enterprise briefing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust & Guarantee Callout */}
        <div className="mt-12 rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <DepoiiMark className="size-5 text-neutral-900" />
            </div>
            <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600">
              <strong className="text-neutral-950 font-semibold">100% Production Pilot Credit Guarantee:</strong> Your entire pilot spend is credited dollar-for-dollar toward an annual enterprise license upon upgrade.
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
                  We logged your inquiry for <strong>{company || "your company"}</strong>. Our team will verify territory seat availability in <strong>{territory || "your selected corridor"}</strong> and contact you at <strong>{email}</strong> within 1 business day.
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
                        {selectedPlan === "pilot" ? "Single-Zone Pilot Application" : "Enterprise Intelligence Briefing"}
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

                    {selectedPlan === "pilot" && (
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-neutral-700">
                            Target Zone (Dallas)
                          </label>
                          <select
                            required
                            value={territory}
                            onChange={(e) => setTerritory(e.target.value)}
                            className="h-10 w-full rounded-xl border border-neutral-300 bg-white px-2.5 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
                          >
                            {DALLAS_ZONES.map((zone) => (
                              <option key={zone.id} value={zone.name}>
                                {zone.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-neutral-700">Typical Roof Sq Ft</label>
                          <input
                            placeholder="e.g. 40k+ sq ft"
                            value={sizeRange}
                            onChange={(e) => setSizeRange(e.target.value)}
                            className="h-10 w-full rounded-xl border border-neutral-300 px-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                          />
                        </div>
                      </div>
                    )}

                    {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="h-11 w-full rounded-xl bg-neutral-950 text-white font-semibold shadow-xs hover:bg-neutral-800 cursor-pointer flex items-center justify-center gap-1.5 transition disabled:opacity-60"
                      >
                        <span>
                          {submitting
                            ? "Submitting..."
                            : selectedPlan === "pilot"
                              ? "Submit Pilot Request"
                              : "Submit Enterprise Inquiry"}
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
