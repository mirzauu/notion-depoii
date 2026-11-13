"use client";

import React from "react";

export function HowDepoiiThinks() {
  return (
    <section className="py-24 sm:py-32 bg-[#fafaf9] text-neutral-950" id="intelligence">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Direct, 2 lines max, matching high-conviction typography */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="text-[36px] sm:text-[50px] lg:text-[58px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12]">
            How Depoii{" "}
            <span className="relative inline-block text-neutral-950">
              intelligence
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
            works.
          </h2>
          <p className="mt-5 text-[17px] sm:text-[19px] text-neutral-700 leading-relaxed max-w-2xl">
            Depoii does not search on demand. It continuously maintains an active intelligence map of every commercial building across Dallas–Fort Worth.
          </p>
        </div>

        {/* 3 Pillars Matrix: Substantive figures, 16px body copy, tone separation without hairline dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="text-[38px] sm:text-[44px] font-black tracking-tight text-neutral-950 leading-none">
                70,000+
              </div>
              <h3 className="mt-4 text-[20px] font-bold text-neutral-950 tracking-tight">
                Commercial roofs mapped
              </h3>
              <p className="mt-3 text-[16px] text-neutral-700 leading-relaxed">
                Every commercial structure over 25,000 sq ft cataloged with verified installation year, membrane substrate (TPO, PVC, EPDM, Mod-Bit), and satellite degradation condition.
              </p>
            </div>
            <div className="mt-6 text-[13px] font-medium text-neutral-500">
              Synced from Dallas and Tarrant County appraisal rolls
            </div>
          </div>

          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="text-[38px] sm:text-[44px] font-black tracking-tight text-neutral-950 leading-none">
                Sub-6hr
              </div>
              <h3 className="mt-4 text-[20px] font-bold text-neutral-950 tracking-tight">
                Storm corridor tracking
              </h3>
              <p className="mt-3 text-[16px] text-neutral-700 leading-relaxed">
                When hail or severe weather hits DFW, Depoii overlays the exact dual-pol radar swath onto roof ages and checks municipal registries for unpermitted replacement opportunities.
              </p>
            </div>
            <div className="mt-6 text-[13px] font-medium text-neutral-500">
              NOAA SPC and NEXRAD Level II live radar ingestion
            </div>
          </div>

          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="text-[38px] sm:text-[44px] font-black tracking-tight text-neutral-950 leading-none">
                87%
              </div>
              <h3 className="mt-4 text-[20px] font-bold text-neutral-950 tracking-tight">
                Direct-dial match rate
              </h3>
              <p className="mt-3 text-[16px] text-neutral-700 leading-relaxed">
                Commercial properties hide behind holding LLCs. Depoii resolves corporate entity filings to identify the actual Director of Facilities or VP of Asset Management with direct phone and email.
              </p>
            </div>
            <div className="mt-6 text-[13px] font-medium text-neutral-500">
              Texas SOS corporate records and verified direct contacts
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
