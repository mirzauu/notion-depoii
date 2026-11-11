"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does Depoii track commercial property intelligence so accurately?",
    answer:
      "Depoii does not search on demand. It continuously maintains an active intelligence map of every commercial structure over 25,000 sq ft across Dallas–Fort Worth. By unifying county appraisal rolls (DCAD & TAD), NOAA NEXRAD dual-pol radar, municipal permit registries, and Texas Secretary of State corporate filings, Depoii maintains the complete roof history, hail exposure index, and verified decision-maker contact for each property before you even search.",
  },
  {
    question: "What does 'maximum of 2 contractors per zone' mean for my territory?",
    answer:
      "To protect contractor margins and lead exclusivity, Depoii strictly caps standard corridor access to a maximum of 2 non-conflicting commercial contractors per DFW zone. If you require absolute exclusivity with 0 competitors across the entire metroplex, the Metroplex Dominator master license buys out all seats across all 5 zones.",
  },
  {
    question: "How fresh is the storm and permit intelligence?",
    answer:
      "Storm corridors are mapped within 6 hours of National Weather Service Doppler radar confirmation. Commercial permit filings are cross-checked daily across municipal building departments to flag unclaimed roofs immediately. County appraisal rolls and SOS corporate filings sync on a continuous schedule.",
  },
  {
    question: "Can I review real properties in my corridor before committing?",
    answer:
      "Yes. The territory briefing is a 15-minute live review. We open your designated DFW corridor on screen and show you 15 live, unpermitted commercial properties with roof age, storm exposure, and verified facility manager contacts so you can verify the data before securing your zone.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-24 sm:py-32 bg-[#fafaf9] text-neutral-950 border-t border-neutral-200" id="faq">
      <div className="max-w-[1020px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading: Direct, 2 lines max, no eyebrow */}
        <div className="text-left mb-14 sm:mb-16">
          <h2 className="text-[34px] sm:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] text-neutral-950">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-neutral-600 max-w-2xl leading-relaxed">
            Everything you need to know about Depoii commercial intelligence, corridor exclusivity, and data verification.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 sm:py-7">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] sm:text-[19px] font-bold text-neutral-950 group-hover:text-neutral-700 transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`p-1 rounded-full text-neutral-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-neutral-950" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-6 sm:pr-12 text-[14.5px] sm:text-[15.5px] text-neutral-600 leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <div>
            <div className="font-bold text-[15px] text-neutral-950">
              Have a specific question about your corridor?
            </div>
            <div className="text-[13px] text-neutral-600 mt-0.5">
              We can check active seat availability and sample targets for your bidding area.
            </div>
          </div>
          <Link
            href="#pilot"
            prefetch={false}
            className="px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-white bg-neutral-950 hover:bg-neutral-800 transition whitespace-nowrap text-center"
          >
            Schedule territory briefing
          </Link>
        </div>

      </div>
    </section>
  );
}

