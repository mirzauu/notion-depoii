"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  CloudHail,
  UserCheck,
  Eye,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Activity,
  ShieldCheck,
  Zap
} from "lucide-react";

export function AIEngineSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const AI_CAPABILITIES = [
    {
      id: "vision",
      number: "01",
      badge: "Satellite Computer Vision",
      title: "Computer Vision & Membrane Age Synthesis",
      summary:
        "Scans multi-year satellite timelines to detect ponding, perimeter seam separation, and surface degradation before an estimator ever drives to the property.",
      highlight: "4-Year Aerial Audit",
      readout: [
        { label: "Substrate Identified", value: "45-mil Single-Ply TPO" },
        { label: "Estimated Roof Age", value: "19 Years (Installed 2005)" },
        { label: "Surface Wear Rate", value: "+34% over 3-year timeline", alert: true },
        { label: "Lifecycle Status", value: "Approaching warranty expiration" },
      ],
      icon: Eye,
      accent: "#FF9C6D",
    },
    {
      id: "radar",
      number: "02",
      badge: "Sub-6hr Doppler Ingestion",
      title: "Autonomous Radar & Severe Storm Correlation",
      summary:
        "When severe weather hits North Texas, the AI overlays the exact dual-pol radar swath onto aging commercial roofs and flags unpermitted replacement windows.",
      highlight: "NOAA NEXRAD Level II",
      readout: [
        { label: "Doppler Station", value: "KFWS Fort Worth Station" },
        { label: "Severe Hail Track", value: "1.75\"–2.25\" Hail corridor" },
        { label: "Impact Footprint", value: "142 commercial roofs >40k sqft" },
        { label: "Permit Delta", value: "0 reroof permits logged (First-mover)", alert: true },
      ],
      icon: CloudHail,
      accent: "#38bdf8",
    },
    {
      id: "entity",
      number: "03",
      badge: "Holding LLC Veil-Piercing",
      title: "Neural Entity Resolution & Direct Decision-Maker Access",
      summary:
        "Commercial properties hide behind shell LLCs. Depoii resolves corporate entity filings into the actual Director of Facilities or VP of Asset Management with direct phone and email.",
      highlight: "87% Direct-Dial Match",
      readout: [
        { label: "Parcel Entity", value: "Inwood Logistics Holdings LLC" },
        { label: "Corporate Filing", value: "Texas Secretary of State Resolved" },
        { label: "Key Decision Maker", value: "Arthur Pendelton · VP Asset Mgmt" },
        { label: "Verified Contact", value: "Direct Mobile & Work Email", alert: true },
      ],
      icon: UserCheck,
      accent: "#34d399",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#fafaf9] text-neutral-950 border-t border-neutral-200/80 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20" id="ai-engine">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#fff7f2]/50 via-[#f8fafc]/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-4xl text-left mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 shadow-2xs mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9C6D]" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-neutral-800">
              Purpose-Built Artificial Intelligence
            </span>
          </div>

          <h2 className="text-[36px] sm:text-[50px] lg:text-[60px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12]">
            An AI engine built specifically for{" "}
            <span className="relative inline-block text-neutral-950">
              commercial roofing
              {/* Depoii Signature Coral / Amber Underline */}
              <svg
                className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-[#FF9C6D] pointer-events-none overflow-visible"
                viewBox="0 0 160 16"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 4 12 C 40 4, 115 5, 156 8 C 130 14, 45 13, 12 14"
                  stroke="currentColor"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>.
          </h2>

          <p className="mt-6 text-[17px] sm:text-[20px] text-neutral-600 leading-relaxed max-w-3xl">
            Generic AI doesn’t understand TPO membranes or hail swaths. Depoii operates 24/7 as an autonomous intelligence analyst for your team—synthesizing aerial vision, Doppler radar corridors, and corporate SOS registries into qualified replacement deals.
          </p>
        </div>

        {/* 3 AI Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {AI_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            const isSelected = activeTab === idx;

            return (
              <div
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`group rounded-[28px] border p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 text-left cursor-pointer ${
                  isSelected
                    ? "bg-[#fafaf9] border-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-2 ring-neutral-950/10"
                    : "bg-white hover:bg-[#fafaf9] border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-neutral-300 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-950 shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-neutral-950" strokeWidth={2} />
                    </div>
                    <span className="font-mono text-[14px] font-bold text-neutral-400">
                      {cap.number}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-700 text-[11px] font-semibold tracking-wide mb-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cap.accent }} />
                    <span>{cap.badge}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[21px] sm:text-[23px] font-bold text-neutral-950 tracking-tight leading-snug">
                    {cap.title}
                  </h3>

                  <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-neutral-600 leading-relaxed">
                    {cap.summary}
                  </p>
                </div>

                {/* AI Live Readout Ledger */}
                <div className="mt-8 pt-5 border-t border-neutral-200/80 bg-white rounded-xl p-4 border border-neutral-100 shadow-2xs">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>Autonomous AI Readout</span>
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[9.5px]">Live Sync</span>
                  </div>

                  <div className="space-y-2 text-[12px]">
                    {cap.readout.map((row, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-between py-0.5 border-b border-neutral-50 last:border-0">
                        <span className="text-neutral-500">{row.label}</span>
                        <span className={`font-semibold ${row.alert ? "text-[#c2410c] bg-amber-50 px-1.5 py-0.2 rounded" : "text-neutral-900"}`}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner: What this means for your roofing company */}
        <div className="mt-14 rounded-2xl bg-neutral-950 text-white p-7 sm:p-10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[12px] font-semibold mb-3">
              <Zap className="w-3.5 h-3.5 text-[#FF9C6D]" />
              <span>Contractor Bottom-Line ROI</span>
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight">
              Replace 40 hours of manual canvassing with instant intelligence.
            </h3>
            <p className="mt-2 text-[14.5px] text-neutral-400 leading-relaxed">
              Your estimators stop driving industrial parks guessing roof age. Depoii delivers high-probability replacement targets with verified owner contacts straight to their queue.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-trial"));
                }
              }}
              className="px-6 py-3 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-[14px] transition-all shadow-sm active:scale-[0.98] flex items-center gap-2 group cursor-pointer"
            >
              <span>Start free trial</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
