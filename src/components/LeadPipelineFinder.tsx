"use client";

import React from "react";
import Image from "next/image";
import { Building2, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface PipelineLead {
  id: string;
  name: string;
  address: string;
  sqft: string;
  ageTag: string;
  substrate: string;
  triggerTag: string;
  triggerTone: string;
  condition: string;
  ownerGroup: string;
  estScope: string;
  image: string;
}

const ALL_PIPELINE_LEADS: PipelineLead[] = [
  {
    id: "valwood",
    name: "Valwood Industrial Distribution",
    address: "1685 Valwood Pkwy, Carrollton, TX",
    sqft: "68,400 sq ft",
    ageTag: "20 yrs (2004)",
    substrate: "Single-Ply TPO",
    triggerTag: "20-Yr Lifecycle Window",
    triggerTone: "bg-[#ffdec4] text-[#9a3412]",
    condition: "20-year commercial warehouse roof with zero replacement filings recorded in municipal history.",
    ownerGroup: "Texas Gateway Logistics",
    estScope: "$957k est. scope",
    image: "/assets/aerials/dcad-2501.jpg",
  },
  {
    id: "riverside",
    name: "Riverside Packaging Park",
    address: "3201 Riverside Dr, Irving, TX",
    sqft: "124,500 sq ft",
    ageTag: "18 yrs (2006)",
    substrate: "Single-Ply TPO",
    triggerTag: "Hail Track + Unreplaced",
    triggerTone: "bg-[#fee2e2] text-[#991b1b]",
    condition: "Large industrial footprint along Irving corridor inside recent severe storm swath with no active reroof.",
    ownerGroup: "Riverside Industrial Holdings",
    estScope: "$1.74M est. scope",
    image: "/assets/aerials/dcad-12221.jpg",
  },
  {
    id: "pioneer",
    name: "Pioneer Chemical Terminal",
    address: "6700 Chemical Ln, Denton, TX",
    sqft: "142,000 sq ft",
    ageTag: "19 yrs (2005)",
    substrate: "Modified Bitumen",
    triggerTag: "19-Yr Cap Sheet",
    triggerTone: "bg-[#ffdec4] text-[#9a3412]",
    condition: "Heavy manufacturing roof approaching 20-year mark, suited for tear-off or fluid-applied restoration.",
    ownerGroup: "Pioneer Operations Group",
    estScope: "$1.98M est. scope",
    image: "/assets/aerials/dcad-16850.jpg",
  },
  {
    id: "central-expy",
    name: "Central Expy Logistics Hub",
    address: "8600 S Central Expy, Dallas, TX",
    sqft: "48,200 sq ft",
    ageTag: "19 yrs (2005)",
    substrate: "Single-Ply TPO",
    triggerTag: '1.75" Hail Nearby',
    triggerTone: "bg-[#fee2e2] text-[#991b1b]",
    condition: "2005 TPO roof inside NWS severe hail path with no subsequent commercial roofing permit logged.",
    ownerGroup: "Inwood Logistics Partners",
    estScope: "$674k est. scope",
    image: "/assets/aerials/dcad-4100.jpg",
  },
  {
    id: "stemmons",
    name: "Stemmons Distribution Center",
    address: "11411 Stemmons Fwy, Dallas, TX",
    sqft: "84,300 sq ft",
    ageTag: "21 yrs (2003)",
    substrate: "Modified Bitumen",
    triggerTag: "21-Yr Industrial Roof",
    triggerTone: "bg-[#ffdec4] text-[#9a3412]",
    condition: "Aged modified bitumen assembly along Stemmons Freeway corridor with verified storm exposure.",
    ownerGroup: "Stemmons Trade Properties",
    estScope: "$1.18M est. scope",
    image: "/assets/aerials/dcad-outside.jpg",
  },
  {
    id: "regal-row",
    name: "Regal Row Wholesale Center",
    address: "2400 Regal Row, Dallas, TX",
    sqft: "112,000 sq ft",
    ageTag: "17 yrs (2007)",
    substrate: "Ballasted EPDM",
    triggerTag: "Coating / Re-Roof Fit",
    triggerTone: "bg-[#dcfce7] text-[#14532d]",
    condition: "17-year commercial logistics roof suited for membrane restoration or full system replacement.",
    ownerGroup: "Regal Wholesale Trust",
    estScope: "$1.56M est. scope",
    image: "/assets/aerials/hero-roof.jpg",
  },
];

export function LeadPipelineFinder() {
  const openBriefModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-trial"));
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white text-[#111110] overflow-hidden" id="pipeline-finder">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 mb-10 sm:mb-12">
        <Reveal>
          <div className="max-w-[760px] text-left">
            <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-bold text-[#111110] tracking-[-0.03em] leading-[1.12]">
              Sample DFW targets surfaced by Depoii.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
              Every property below pairs verified county square footage with roof age, weather proximity, and municipal work history so your estimators know why it matters before picking up the phone.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Auto-scrolling Property Showcase Marquee */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="relative w-full overflow-hidden rounded-2xl py-2">
          <div className="flex w-max gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...ALL_PIPELINE_LEADS, ...ALL_PIPELINE_LEADS].map((lead, index) => {
              const isDuplicate = index >= ALL_PIPELINE_LEADS.length;
              return (
                <div
                  key={`${lead.id}-${index}`}
                  aria-hidden={isDuplicate || undefined}
                  className="w-[330px] sm:w-[390px] shrink-0 bg-[#f5f5f4] rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                      <Image
                        src={lead.image}
                        alt={lead.name}
                        fill
                        sizes="(max-width: 640px) 330px, 390px"
                        className="object-cover"
                      />

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                        <span>{lead.ageTag}</span>
                      </div>

                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                        {lead.sqft}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col gap-3.5">
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="min-w-0">
                          {isDuplicate ? (
                            <p className="font-bold text-[18px] text-[#111110] leading-snug">
                              {lead.name}
                            </p>
                          ) : (
                            <h3 className="font-bold text-[18px] text-[#111110] leading-snug">
                              {lead.name}
                            </h3>
                          )}
                          <div className="flex items-center gap-1.5 text-[14px] text-[#4a4845] mt-1">
                            <MapPin className="w-3.5 h-3.5 text-[#4a4845] shrink-0" />
                            <span className="truncate">{lead.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[13px] font-semibold ${lead.triggerTone}`}>
                          {lead.triggerTag}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white text-[#111110] text-[13px] font-medium">
                          {lead.substrate}
                        </span>
                      </div>

                      <p className="text-[16px] text-[#3a3835] leading-[1.55]">
                        {lead.condition}
                      </p>

                      <div className="flex items-center justify-between gap-3 pt-2 text-[14px]">
                        <div className="flex items-center gap-2 min-w-0 text-[#111110] font-semibold">
                          <Building2 className="w-4 h-4 text-[#4a4845] shrink-0" />
                          <span className="truncate">{lead.ownerGroup}</span>
                        </div>

                        <span className="font-bold text-[#111110] shrink-0 tabular-nums">
                          {lead.estScope}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Territory Brief Callout */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 mt-10 sm:mt-12">
        <Reveal delayMs={90}>
          <div className="bg-[#f5f5f4] rounded-2xl p-7 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#111110] tracking-tight leading-snug">
                Get your top 10 DFW roofs.
              </h3>
              <p className="text-[16px] text-[#4a4845] mt-2 leading-[1.55]">
                Share your target building size and submarkets. We will send an unmasked estimator walk-sheet built around your crew within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={openBriefModal}
              className="shrink-0 h-12 px-7 rounded-full bg-[#111110] hover:bg-[#2b2a28] text-white font-semibold text-[16px] transition-[transform,background-color] duration-150 active:scale-[0.98] flex items-center gap-2 group cursor-pointer"
            >
              <span>Request Territory Brief</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
