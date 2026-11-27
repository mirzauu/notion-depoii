"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Building2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface TimelineMilestone {
  id: string;
  year: string;
  dateBadge: string;
  label: string;
  category: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  takeaway: string;
  roofStatus: string;
  roofStatusColor: string;
}

const MILESTONES: TimelineMilestone[] = [
  {
    id: "1956",
    year: "1956",
    dateBadge: "Dallas County Archive",
    label: "Construction",
    category: "Deed & Footprint Record",
    badgeColor: "bg-neutral-100 text-neutral-800 border-neutral-200",
    title: "Original Commercial Construction & Footprint",
    subtitle:
      "Dallas County records log a 48,200 sq ft light industrial distribution center built with heavy fluted steel decking and built-up pitch roofing.",
    metrics: [
      { label: "Building Footprint", value: "48,200 sq ft industrial facility" },
      { label: "Structural Framing", value: "Heavy fluted 22-gauge steel deck" },
      { label: "Original Roof System", value: "Coal tar pitch & aggregate ballast" },
      { label: "Parcel Entity Record", value: "Dallas Central Appraisal District #000492" },
    ],
    takeaway:
      "Depoii indexes historical county blueprints and deed filings so contractors instantly know structural deck composition, square footage, and load capacity before bidding.",
    roofStatus: "Original Built-Up Roof",
    roofStatusColor: "text-neutral-600 bg-neutral-100",
  },
  {
    id: "2005",
    year: "2005",
    dateBadge: "City Permit #05-88219",
    label: "Permitted Re-Roof",
    category: "Municipal Permit Archive",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "45-mil Single-Ply TPO Re-Roof Filed & Installed",
    subtitle:
      "Full commercial tear-off permitted through the City of Dallas. Carlisle Sure-Weld 45-mil mechanically fastened TPO with 20-year manufacturer warranty.",
    metrics: [
      { label: "Municipal Permit", value: "City of Dallas #05-88219 (Commercial)" },
      { label: "Membrane Installed", value: "Carlisle Sure-Weld 45-mil White TPO" },
      { label: "Insulation Layer", value: "2.5\" Polyisocyanurate (R-14.4 rating)" },
      { label: "Warranty Horizon", value: "20-Year Manufacturer (Matures 2025)", highlight: true },
    ],
    takeaway:
      "Depoii tracks the remaining lifespan of every permitted commercial roof in DFW. This roof hit year 19—crossing directly into its capital replacement window.",
    roofStatus: "TPO Installed (Warranty: 20 yrs)",
    roofStatusColor: "text-blue-700 bg-blue-50",
  },
  {
    id: "2021",
    year: "2021",
    dateBadge: "Aerial Synthesis",
    label: "Satellite Baseline",
    category: "Multi-Year Vision Audit",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Computer Vision Detects Ponding & Accelerated Seam Wear",
    subtitle:
      "Depoii's multi-year aerial computer vision audit flags ponding scuppers along the northwest parapet and accelerated UV chalking across aged single-ply seams.",
    metrics: [
      { label: "Resolution Scanned", value: "15cm high-resolution ortho-imagery" },
      { label: "Surface Degradation", value: "+34% accelerated UV chalking", highlight: true },
      { label: "Drainage Hazard", value: "Standing ponding mapped near east scupper" },
      { label: "Forensic Baseline", value: "Pre-storm condition digitally stamped" },
    ],
    takeaway:
      "Having an unassailable pre-storm satellite baseline prevents insurance adjusters from claiming damages were pre-existing wear and tear.",
    roofStatus: "Accelerated Seam Wear (+34%)",
    roofStatusColor: "text-amber-700 bg-amber-50",
  },
  {
    id: "2024",
    year: "May 2024",
    dateBadge: "NOAA NEXRAD KFWS",
    label: "Severe Hail Event",
    category: "Sub-6hr Doppler Correlator",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    title: "1.75\" Dual-Pol Hail Swath Strikes Aging Membrane",
    subtitle:
      "Doppler Level-II radar tracks a 1.75\"–2.00\" severe hail core and 62 mph gusts cutting directly over the property's 19-year-old brittle TPO membrane.",
    metrics: [
      { label: "Radar Station", value: "KFWS Fort Worth NEXRAD Dual-Pol" },
      { label: "Impact Classification", value: "1.75\"–2.00\" Golf-ball hail corridor", highlight: true },
      { label: "Wind Gust Velocity", value: "62 mph sustained convective gusts" },
      { label: "Membrane Status", value: "Exceeds fracture threshold for 19-yr TPO" },
    ],
    takeaway:
      "Old TPO membranes lose elasticity after 15 years. Depoii correlates radar hail size against membrane age to identify roofs where micro-fractures are guaranteed.",
    roofStatus: "1.75\" Hail Impact Verified",
    roofStatusColor: "text-red-700 bg-red-50",
  },
  {
    id: "today",
    year: "Today",
    dateBadge: "Live Opportunity",
    label: "The Unclaimed Deal",
    category: "Entity & Pipeline Resolution",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    title: "0 Permits Filed · Entity Resolved to VP Asset Management",
    subtitle:
      "Months after the storm, no permit has been pulled. Depoii pierced the holding LLC directly to the executive who controls the $674k roof replacement budget.",
    metrics: [
      { label: "Municipal Permits", value: "0 Reroof permits filed (First mover)", highlight: true },
      { label: "Estimated Scope", value: "$674,800 Replacement (482 squares)", highlight: true },
      { label: "Corporate Entity", value: "Inwood Logistics Holdings LLC" },
      { label: "Direct Decision Maker", value: "Arthur Pendelton · VP Asset Management" },
    ],
    takeaway:
      "Commercial roofers usually chase storms 6 months late. Depoii hands you the storm evidence, the roof history, and the direct phone line before your competitors even know the building exists.",
    roofStatus: "Unclaimed $674,800 Replacement",
    roofStatusColor: "text-emerald-800 bg-emerald-50 font-bold",
  },
];

export function HowDepoiiThinks() {
  const [activeStep, setActiveStep] = useState<number>(4); // Default to "Today" (The final reveal)

  const activeMilestone = MILESTONES[activeStep];

  return (
    <section
      className="py-24 sm:py-32 bg-[#fafaf9] text-neutral-950 border-t border-neutral-200/80 relative"
      id="intelligence"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF9C6D]" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-neutral-800">
              The Living Property Archive
            </span>
          </div>

          <h2 className="text-[34px] sm:text-[48px] lg:text-[56px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12]">
            20 years of roof history.{" "}
            <span className="relative inline-block text-neutral-950">
              Uncovered
              <svg
                className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-[#FF9C6D] pointer-events-none overflow-visible"
                viewBox="0 0 160 16"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 4 12 C 40 4, 115 5, 156 8 C 130 14, 45 13, 12 14"
                  stroke="currentColor"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>{" "}
            in seconds.
          </h2>
          <p className="mt-5 text-[16px] sm:text-[18px] text-neutral-600 leading-relaxed">
            Commercial roofers lose deals when they walk in blind. Depoii automatically stitches
            together county deed archives, city permits, Doppler radar, and satellite imagery into a
            living forensic dossier for every commercial building in North Texas.
          </p>
        </div>

        {/* Case Study Property Badge Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-neutral-200" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[16px] sm:text-[18px] font-bold text-neutral-950">
                  8600 S Central Expy
                </span>
                <span className="text-neutral-400">·</span>
                <span className="text-[14px] text-neutral-600 font-medium">Dallas, TX 75241</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200">
                  Logistics Hub · 48,200 sq ft
                </span>
              </div>
              <p className="text-[13px] text-neutral-500 mt-0.5">
                Case Study: Complete Historical Intelligence Chain synthesized by Depoii AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-[12px] text-neutral-500 font-medium">Lifecycle State:</span>
            <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold border border-neutral-200 ${activeMilestone.roofStatusColor}`}>
              {activeMilestone.roofStatus}
            </span>
          </div>
        </div>

        {/* Interactive Timeline Stepper Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-3 sm:p-5 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {MILESTONES.map((milestone, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={milestone.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex flex-col items-start p-3 sm:p-4 rounded-xl border text-left transition-all ${
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                      : "bg-[#fafaf9] text-neutral-800 border-neutral-200/80 hover:bg-neutral-100 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-[12px] font-mono font-bold tracking-tight ${
                        isActive ? "text-[#FF9C6D]" : "text-neutral-500"
                      }`}
                    >
                      {milestone.year}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-neutral-800 text-neutral-300"
                          : "bg-white text-neutral-500 border border-neutral-200"
                      }`}
                    >
                      Step 0{idx + 1}
                    </span>
                  </div>
                  <div
                    className={`text-[13px] sm:text-[14px] font-bold leading-tight ${
                      isActive ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {milestone.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Card & Forensic Spec Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 text-left">
          {/* Main Dossier Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${activeMilestone.badgeColor}`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {activeMilestone.dateBadge}
                </span>
                <span className="text-[12px] font-semibold text-neutral-500">
                  {activeMilestone.category}
                </span>
              </div>

              <h3 className="text-[22px] sm:text-[28px] font-bold text-neutral-950 tracking-tight leading-snug">
                {activeMilestone.title}
              </h3>

              <p className="mt-3.5 text-[15px] sm:text-[16px] text-neutral-700 leading-relaxed">
                {activeMilestone.subtitle}
              </p>

              {/* Data Grid of Verified Evidence */}
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <div className="text-[12px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Verified Data Evidence
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeMilestone.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className={`p-3 rounded-xl border text-[13px] ${
                        m.highlight
                          ? "bg-amber-50/70 border-amber-200 text-amber-950 font-semibold"
                          : "bg-neutral-50/80 border-neutral-200/70 text-neutral-800"
                      }`}
                    >
                      <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-0.5">
                        {m.label}
                      </div>
                      <div className="text-[13px] font-medium text-neutral-900">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-700 hover:text-neutral-950 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous milestone
              </button>

              <div className="flex items-center gap-1.5">
                {MILESTONES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStep === i ? "w-6 bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveStep((prev) => Math.min(MILESTONES.length - 1, prev + 1))}
                disabled={activeStep === MILESTONES.length - 1}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-neutral-700 hover:text-neutral-950 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Next milestone <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Strategic Roofer Takeaway Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9C6D]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-[#FF9C6D] uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                The Contractor Edge
              </div>

              <h4 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight leading-snug">
                Why this closes the deal for you
              </h4>

              <p className="mt-4 text-[14px] sm:text-[15px] text-neutral-300 leading-relaxed">
                {activeMilestone.takeaway}
              </p>

              {/* Real Outcome Simulation */}
              <div className="mt-6 p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-neutral-400">Target Address</span>
                  <span className="font-mono text-neutral-200">8600 S Central Expy</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-neutral-400">Identified Replacement Need</span>
                  <span className="text-[#FF9C6D] font-bold">19-Yr TPO + 1.75&quot; Hail</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-neutral-400">Opportunity Value</span>
                  <span className="text-emerald-400 font-bold">$674,800 Scope</span>
                </div>
                <div className="flex items-center justify-between text-[12px] pt-1 border-t border-neutral-800">
                  <span className="text-neutral-400">Direct Decision Maker</span>
                  <span className="text-white font-medium">Arthur Pendelton (Verified)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800">
              <Link
                href="#demo"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-[14px] transition-all"
              >
                Claim your territory on Depoii
                <ArrowRight className="w-4 h-4 text-neutral-700" />
              </Link>
              <div className="text-center mt-2.5 text-[11px] text-neutral-500">
                Exclusive coverage capped at 2 commercial contractors per submarket
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
