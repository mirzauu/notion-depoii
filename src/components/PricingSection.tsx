"use client";

import React, { useState } from "react";
import {
  Check,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronDown,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do property unlocks and intelligence credits work?",
    answer:
      "Searching addresses, viewing building footprints, and exploring satellite imagery is 100% free and unlimited. When you identify an opportunity, a single click unlocks the complete commercial dossier — verified roof age, 2013–Now municipal permit timeline, executive decision-maker contacts (direct cell & email), and AI pitch hooks. Each plan includes a monthly credit balance sized for active prospecting.",
  },
  {
    question: "Do unlocked properties ever expire or cost more to revisit?",
    answer:
      "Never. Once you unlock a commercial property, it remains permanently accessible in your workspace. You can review its permits, check storm updates, or export it to your CRM months later with zero repeat charges.",
  },
  {
    question: "What happens to unused credits at the end of the month?",
    answer:
      "Your unused intelligence credits automatically roll over month-to-month (30 to 90 days depending on your plan tier), so your balance stays intact during slower seasons or weather lulls.",
  },
  {
    question: "Can our team add more seats or upgrade anytime?",
    answer:
      "Yes. You can invite additional sales reps or estimators, upgrade to access larger portfolio datasets (like Owners & REITs), or cancel anytime with one click in your billing settings. No long-term commitments required.",
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      badge: "Solo Producer",
      description: "For solo commercial reps, estimators, or independent roofers closing regional jobs.",
      monthlyPrice: 299,
      annualPrice: 249,
      annualBilled: 2988,
      popular: false,
      features: [
        "35 Full Commercial Property Dossiers / mo",
        "300 monthly intelligence credits",
        "1 Estimator / Sales Seat",
        "Unlimited address & satellite map lookups",
        "Complete 2013–Now commercial permit timeline",
        "20+ year aging roof replacement filters",
        "NEXRAD Doppler hail swath overlays",
        "Verified decision-maker contacts (phone & email)",
        "30-day unused credit rollover",
        "Standard CSV lead export",
      ],
      excluded: ["Depoii AI Intelligence Layer", "Owners & REIT Portfolios"],
      ctaText: "Start 7-day free trial",
      ctaType: "trial",
    },
    {
      id: "growth",
      name: "Growth",
      badge: "Most Popular for DFW Crews",
      description: "For established commercial roofing contractors with active sales and estimating teams.",
      monthlyPrice: 699,
      annualPrice: 579,
      annualBilled: 6948,
      popular: true,
      features: [
        "✨ Depoii AI Intelligence Layer (Top Picks & Reroof Insights)",
        "125 Full Commercial Property Dossiers / mo",
        "1,000 monthly intelligence credits",
        "3 User Seats included (team sharing)",
        "Full Owners & REITs Portfolios access (LLC veil-piercing)",
        "Unlimited address & satellite map lookups",
        "Complete 2013–Now commercial permit timeline",
        "20+ year aging roof replacement filters",
        "NEXRAD Doppler hail swath overlays",
        "Verified decision-maker contacts (phone & email)",
        "60-day unused credit rollover",
        "Priority onboarding & 1-on-1 strategy call",
      ],
      excluded: [],
      ctaText: "Start 7-day free trial",
      ctaType: "trial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "Regional Powerhouse",
      description: "For high-volume regional contractors, multi-location operators, and top 100 roofing firms.",
      monthlyPrice: 1499,
      annualPrice: 1199,
      annualBilled: 14388,
      popular: false,
      features: [
        "✨ Depoii AI Enterprise Intelligence (Custom models & priority scoring)",
        "375 Full Commercial Property Dossiers / mo",
        "3,000 monthly intelligence credits",
        "10 User Seats included (full sales floor)",
        "Full Owners & REITs multi-market portfolio access",
        "Complete 2013–Now commercial permit timeline",
        "Direct Public Permit History API access",
        "Real-time competitor permit alerts",
        "90-day unused credit rollover",
        "Dedicated Account Manager & custom CRM sync",
      ],
      excluded: [],
      ctaText: "Talk to team / Start",
      ctaType: "demo",
    },
  ];

  const handleCta = (type: string) => {
    if (typeof window !== "undefined") {
      if (type === "demo") {
        window.dispatchEvent(new CustomEvent("open-demo"));
      } else {
        window.dispatchEvent(new CustomEvent("open-trial"));
      }
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section
      id="pricing"
      className="py-16 sm:py-24 bg-[#fafaf9] text-neutral-900 border-t border-neutral-200/90 relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto flex flex-col items-center">

          {/* Heading with Signature Amber/Coral Underline */}
          <h2 className="text-[32px] sm:text-[46px] lg:text-[54px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.14]">
            The intelligence platform to scale your{" "}
            <span className="relative inline-block text-neutral-950">
              commercial pipeline.
              {/* Depoii Signature Underline */}
              <svg
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#FF9C6D] pointer-events-none overflow-visible"
                viewBox="0 0 240 16"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 4 12 C 60 4, 180 5, 236 8 C 190 14, 75 13, 20 14"
                  stroke="currentColor"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-6 text-[16px] sm:text-[18px] text-neutral-600 font-normal leading-relaxed max-w-[720px]">
            Search 70,000+ DFW commercial properties for free. Unlock AI reroof predictions, verified owner cell phones, and 10-year permit histories when you&apos;re ready to close.
          </p>

          {/* Billing Cycle Segmented Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-white border border-neutral-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer ${billingCycle === "monthly"
                ? "bg-neutral-950 text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-950"
                }`}
            >
              Monthly billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer ${billingCycle === "annual"
                ? "bg-neutral-950 text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-950"
                }`}
            >
              <span>Annual billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 ${plan.popular
                  ? "border-2 border-[#ea580c] shadow-[0_16px_48px_rgba(234,88,12,0.12)] lg:-translate-y-2 z-10"
                  : "border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:border-neutral-300"
                  }`}
              >
                {/* Popular Pill Tag on Top of Growth Plan */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#ea580c] text-white text-[11px] sm:text-[12px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="p-7 sm:p-8 flex flex-col flex-1">

                  {/* Plan Name & Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[22px] sm:text-[24px] font-bold text-neutral-950 tracking-tight">
                      {plan.name}
                    </h3>
                    {!plan.popular && (
                      <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-medium border border-neutral-200">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Description */}
                  <p className="mt-2.5 text-[13px] sm:text-[14px] text-neutral-500 leading-normal min-h-[42px]">
                    {plan.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 flex items-baseline gap-2">
                    <span className="text-[40px] sm:text-[46px] font-bold text-neutral-950 tracking-tight leading-none">
                      ${price}
                    </span>
                    <span className="text-[14px] text-neutral-500 font-medium">
                      / month
                    </span>
                  </div>

                  {/* Annual billing note */}
                  <div className="text-[12px] text-neutral-500 mt-1 min-h-[18px]">
                    {billingCycle === "annual" ? (
                      <span>Billed annually (${plan.annualBilled.toLocaleString()}/yr)</span>
                    ) : (
                      <span>Billed monthly, cancel anytime</span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Included in this plan
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[13.5px] text-neutral-700 leading-snug">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}

                    {/* Excluded items (Starter plan only) */}
                    {plan.excluded.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[13.5px] text-neutral-400 line-through leading-snug opacity-75">
                        <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="p-7 sm:p-8 pt-0">
                  <button
                    type="button"
                    onClick={() => handleCta(plan.ctaType)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-[14px] sm:text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.popular
                      ? "bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-[0_4px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_24px_rgba(234,88,12,0.4)] active:scale-[0.98]"
                      : "bg-neutral-950 hover:bg-neutral-800 text-white shadow-xs active:scale-[0.98]"
                      }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal, Elegant FAQ Accordion */}
        <div className="mt-20 max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-[24px] sm:text-[28px] font-bold text-neutral-950 tracking-tight">
              Frequently asked questions
            </h3>
            <p className="text-[14px] text-neutral-500 mt-2">
              Everything you need to know about our commercial roof intelligence plans.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-neutral-200/90 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/60 transition-colors"
                  >
                    <span className="font-semibold text-[15px] sm:text-[16px] text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-neutral-950" : ""
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-[13.5px] sm:text-[14px] text-neutral-600 leading-relaxed border-t border-neutral-100 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Simple Clean Enterprise Prompt */}
          <div className="mt-10 text-center text-[13px] text-neutral-500">
            <span>Need custom statewide territory coverage or high-volume API access? </span>
            <button
              type="button"
              onClick={() => handleCta("demo")}
              className="font-semibold text-neutral-900 hover:text-orange-600 underline underline-offset-4 cursor-pointer transition-colors"
            >
              Talk to our team →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
