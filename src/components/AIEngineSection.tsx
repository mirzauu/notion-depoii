"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface EnginePillar {
  id: string;
  title: string;
  summary: string;
  image: string;
  imageCaption: string;
  readoutTitle: string;
  readout: { label: string; value: string; accent?: boolean }[];
}

const ENGINE_PILLARS: EnginePillar[] = [
  {
    id: "crew-fit",
    title: "Matches your crew’s exact sweet spot",
    summary:
      "Stop wading through 10,000 sq ft strip centers when your crews chase 50,000+ sq ft warehouses. Set your preferred size, roof assembly, and DFW corridors.",
    image: "/assets/aerials/dcad-2501.jpg",
    imageCaption: "Valwood Industrial Corridor · 68,400 sq ft",
    readoutTitle: "Crew Target Match",
    readout: [
      { label: "Target Corridor", value: "Irving / North Dallas" },
      { label: "Footprint Sweet Spot", value: "45,000 to 150,000 sq ft" },
      { label: "Preferred Assemblies", value: "TPO, Mod-Bit & Coatings" },
      { label: "Fit Qualification", value: "Filtered to 24 priority roofs", accent: true },
    ],
  },
  {
    id: "timing",
    title: "Catches aging & storm windows early",
    summary:
      "Know which 20-year commercial roofs just sat inside a hail track and have zero replacement work underway, weeks before public RFPs go out.",
    image: "/assets/aerials/dcad-12221.jpg",
    imageCaption: "North Dallas Storm Corridor · 124,500 sq ft",
    readoutTitle: "Timing & Exposure Signals",
    readout: [
      { label: "Weather Corridor", value: '1.75" to 2.25" hail report nearby' },
      { label: "Estimated Roof Age", value: "19 to 24 years since install" },
      { label: "Recent Reroof Work", value: "None recorded post-storm", accent: true },
      { label: "Inspection Window", value: "First-mover outreach active" },
    ],
  },
  {
    id: "receipts",
    title: "Shows estimator receipts, not guesses",
    summary:
      "Roofing VPs never trust black-box AI scores. Every property includes the building age, county record, weather report, and corporate owner trail.",
    image: "/assets/aerials/dcad-16850.jpg",
    imageCaption: "Denton Logistics Terminal · 142,000 sq ft",
    readoutTitle: "Source Provenance Trail",
    readout: [
      { label: "Property Record", value: "DCAD & TAD Appraisal Rolls" },
      { label: "Weather Archive", value: "National Weather Service Reports" },
      { label: "Work History", value: "Municipal Commercial Permits" },
      { label: "Ownership Entity", value: "Corporate filing trail verified", accent: true },
    ],
  },
];

export function AIEngineSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const current = ENGINE_PILLARS[activeIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#f5f5f4] text-[#111110] scroll-mt-16 sm:scroll-mt-20" id="ai-engine">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[780px] text-left mb-12 sm:mb-14">
            <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-bold text-[#111110] tracking-[-0.03em] leading-[1.12]">
              Know which roofs fit{" "}
              <span className="relative inline-block">
                before you drive.
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-3 text-[#FF9C6D] pointer-events-none overflow-visible"
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
              </span>
            </h2>

            <p className="mt-5 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
              Generic parcel tools dump thousands of cold rows, and permit lists tell you who already lost the job. Depoii ranks DFW buildings by your crew’s sweet spot and explains why each roof is worth inspecting this week.
            </p>
          </div>
        </Reveal>

        {/* Asymmetric 2-Column Interactive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 3 Selectable Intelligence Pillars (no SVG icons on sibling cards) */}
          <Reveal delayMs={60} className="lg:col-span-6 flex flex-col justify-between gap-4">
            {ENGINE_PILLARS.map((pillar, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left rounded-2xl p-6 sm:p-7 transition-colors duration-200 cursor-pointer border-l-4 ${
                    isSelected
                      ? "bg-white border-[#c2410c]"
                      : "bg-[#eaeae7] border-transparent hover:bg-white/75"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[20px] font-bold text-[#111110] tracking-tight leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 text-[16px] text-[#4a4845] leading-[1.55]">
                        {pillar.summary}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[13px] font-semibold px-2.5 py-1 rounded-full ${
                        isSelected
                          ? "bg-[#ffdec4] text-[#9a3412]"
                          : "bg-white/70 text-[#4a4845]"
                      }`}
                    >
                      {isSelected ? "Active" : "Inspect"}
                    </span>
                  </div>
                </button>
              );
            })}
          </Reveal>

          {/* Right Column: Live Readout + Aerial Proof */}
          <Reveal delayMs={120} className="lg:col-span-6 flex">
            <div data-ui className="w-full rounded-2xl bg-white border border-neutral-200 p-5 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-100 mb-6">
                  <Image
                    src={current.image}
                    alt={current.imageCaption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                    {current.imageCaption}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-[16px] font-bold text-[#111110]">
                    {current.readoutTitle}
                  </p>
                  <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#14532d] text-[13px] font-semibold">
                    Verified Signals
                  </span>
                </div>

                <div className="space-y-3 text-[15px]">
                  {current.readout.map((row, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex items-center justify-between gap-4 py-2.5 px-3.5 rounded-lg bg-[#f5f5f4]"
                    >
                      <span className="text-[#4a4845]">{row.label}</span>
                      <span
                        className={`font-semibold text-right ${
                          row.accent
                            ? "text-[#9a3412]"
                            : "text-[#111110]"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Contractor ROI Callout */}
        <Reveal delayMs={160}>
          <div className="mt-10 rounded-2xl bg-[#111110] text-white p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left">
            <div className="max-w-2xl">
              <h3 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight leading-snug">
                Stop driving industrial parks blind.
              </h3>
              <p className="mt-2.5 text-[16px] text-neutral-300 leading-[1.55]">
                Your estimators stop cruising industrial parks guessing roof age. Depoii routes verified DFW targets straight to their morning schedule.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-trial"));
                  }
                }}
                className="h-12 px-7 rounded-full bg-white text-[#111110] hover:bg-[#f5f5f4] font-semibold text-[16px] transition-[transform,background-color] duration-150 active:scale-[0.98] flex items-center gap-2 group cursor-pointer"
              >
                <span>Get My 10-Roof Brief</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
