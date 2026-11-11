"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function HowDepoiiThinks() {
  return (
    <section className="py-24 sm:py-32 bg-white text-neutral-950 border-t border-neutral-200" id="intelligence">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Direct, 2 lines max, matching Hero section typography */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="text-[36px] sm:text-[50px] lg:text-[58px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12]">
            How Depoii{" "}
            <span className="relative inline-block text-neutral-950">
              intelligence
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
            </span>{" "}
            works.
          </h2>
          <p className="mt-5 text-[17px] sm:text-[19px] text-neutral-600 leading-relaxed max-w-2xl">
            Depoii does not search on demand. It continuously maintains an active intelligence map of every commercial building across Dallas–Fort Worth.
          </p>
        </div>

        {/* 3 Pillars Grid: Large stats, zero fake icon cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-16 border-b border-neutral-200">
          
          {/* Pillar 1 */}
          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="text-[38px] sm:text-[44px] font-black tracking-tight text-neutral-950 leading-none">
                12,400+
              </div>
              <h3 className="mt-4 text-[19px] sm:text-[21px] font-bold text-neutral-950 tracking-tight">
                Commercial roofs mapped
              </h3>
              <p className="mt-3 text-[14.5px] sm:text-[15px] text-neutral-600 leading-relaxed">
                Every commercial structure over 25,000 sq ft cataloged with verified installation year, membrane substrate (TPO, PVC, EPDM, Mod-Bit), and satellite degradation condition.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 text-[12px] font-medium text-neutral-500">
              Synced from Dallas &amp; Tarrant County appraisal rolls
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="text-[38px] sm:text-[44px] font-black tracking-tight text-neutral-950 leading-none">
                Sub-6hr
              </div>
              <h3 className="mt-4 text-[19px] sm:text-[21px] font-bold text-neutral-950 tracking-tight">
                Storm corridor tracking
              </h3>
              <p className="mt-3 text-[14.5px] sm:text-[15px] text-neutral-600 leading-relaxed">
                When hail or severe weather hits DFW, Depoii overlays the exact dual-pol radar swath onto roof ages and checks municipal registries for unpermitted replacement opportunities.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 text-[12px] font-medium text-neutral-500">
              NOAA SPC &amp; NEXRAD Level II live radar ingestion
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col justify-between text-left">
            <div>
              <div className="text-[38px] sm:text-[44px] font-black tracking-tight text-neutral-950 leading-none">
                87%
              </div>
              <h3 className="mt-4 text-[19px] sm:text-[21px] font-bold text-neutral-950 tracking-tight">
                Direct-dial match rate
              </h3>
              <p className="mt-3 text-[14.5px] sm:text-[15px] text-neutral-600 leading-relaxed">
                Commercial properties hide behind holding LLCs. Depoii resolves corporate entity filings to identify the actual Director of Facilities or VP of Asset Management with direct phone and email.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 text-[12px] font-medium text-neutral-500">
              Texas SOS corporate records &amp; verified direct contacts
            </div>
          </div>

        </div>

        {/* Piercing the LLC: The 3-Step Decision Maker Resolution Flow */}
        <div className="mt-16 sm:mt-20">
          <div className="max-w-2xl mb-8 text-left">
            <h3 className="text-[22px] sm:text-[26px] font-bold text-neutral-950 tracking-tight">
              Piercing the holding company LLC
            </h3>
            <p className="mt-2 text-[14.5px] sm:text-[15px] text-neutral-600 leading-relaxed">
              Why commercial contractors waste months cold calling: county appraisal rolls only list Delaware LLCs and PO boxes. Depoii bridges the full chain to the human decision maker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-6 rounded-2xl bg-[#fafaf9] border border-neutral-200/90 text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Public County Record
              </div>
              <div className="font-bold text-[16px] text-neutral-950">
                Holding Company LLC
              </div>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed font-mono text-[12px]">
                e.g. Valwood Industrial Holdings LP (Delaware registered, generic tax agent address)
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fafaf9] border border-neutral-200/90 text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Depoii Entity Resolution
              </div>
              <div className="font-bold text-[16px] text-neutral-950">
                Operating Parent Entity
              </div>
              <p className="mt-2 text-[13px] text-neutral-600 leading-relaxed">
                Depoii links Secretary of State filings to uncover the true managing asset group and commercial facility operator.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-950 text-white border border-neutral-900 text-left">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF9C6D] mb-2">
                Delivered in Your Dossier
              </div>
              <div className="font-bold text-[16px] text-white">
                Human Decision Maker
              </div>
              <p className="mt-2 text-[13px] text-neutral-300 leading-relaxed">
                Direct name, title (Director of Facilities / VP Asset Mgmt), direct-dial phone, and verified work email.
              </p>
            </div>

          </div>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-neutral-200/70">
            <div className="text-[14px] text-neutral-600">
              Ready to review verified opportunities in your target corridor?
            </div>
            <Link
              href="#pilot"
              prefetch={false}
              className="inline-flex items-center gap-2 text-[14px] font-bold text-neutral-950 hover:text-neutral-700 transition"
            >
              <span>Review intelligence for your territory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

