"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/seo";
import { Reveal } from "./Reveal";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      badge: "Estimator & Rep",
      description: "For solo estimators and commercial reps searching DFW roofs.",
      monthlyPrice: 359,
      annualPrice: 249,
      annualBilled: 2988,
      popular: false,
      features: [
        "300 monthly credits",
        "1 estimator or rep seat",
        "DFW building, roof age & storm filters",
        "County roll & permit history timeline",
        "No claim lock or territory lock",
      ],
      ctaText: "Start Starter Plan",
      ctaType: "trial",
    },
    {
      id: "growth",
      name: "Growth",
      badge: "Small Roofing Team",
      description: "For small commercial crews protecting active inspections.",
      monthlyPrice: 869,
      annualPrice: 599,
      annualBilled: 7188,
      popular: false,
      features: [
        "1,000 monthly credits",
        "27-day property claim lock",
        "Limited Depoii Intelligence",
        "3 team seats · Walk-sheet export",
        "No territory lock",
      ],
      ctaText: "Start Growth Plan",
      ctaType: "trial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "1 Territory Lock",
      description: "Full Depoii AI and exclusive corridor protection for scaling crews.",
      monthlyPrice: 1885,
      annualPrice: 1299,
      annualBilled: 15588,
      popular: true,
      features: [
        "2,500 monthly credits",
        "Full Depoii AI Intelligence",
        "10 team seats",
        "1 Exclusive Territory Lock",
        "Direct priority support",
      ],
      ctaText: "Reserve Enterprise Territory",
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
      className="py-20 sm:py-28 bg-[#f5f5f4] text-[#111110] relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[780px] text-left">
            <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-bold text-[#111110] tracking-[-0.03em] leading-[1.12]">
              Pricing for{" "}
              <span className="relative inline-block">
                one won roof.
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-3 text-[#FF9C6D] pointer-events-none overflow-visible"
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

            <p className="mt-5 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
              Pick the plan sized for your crew. One 50,000 sq ft commercial replacement covers Depoii for years.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-white">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-colors cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-[#111110] text-white"
                    : "text-[#4a4845] hover:text-[#111110]"
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-semibold transition-colors cursor-pointer ${
                  billingCycle === "annual"
                    ? "bg-[#111110] text-white"
                    : "text-[#4a4845] hover:text-[#111110]"
                }`}
              >
                <span>Annual billing</span>
                <span className="px-2.5 py-0.5 rounded-full text-[13px] font-bold bg-[#dcfce7] text-[#14532d]">
                  Save 31%
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* 3 Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, pIdx) => {
            const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
            const isHighlighted = plan.popular;

            return (
              <Reveal key={plan.id} delayMs={pIdx * 70} className="flex">
                <div
                  className={`w-full rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-transform duration-200 ${
                    isHighlighted
                      ? "bg-[#111110] text-white"
                      : "bg-white text-[#111110]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[22px] sm:text-[24px] font-bold tracking-tight">
                        {plan.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap ${
                          isHighlighted
                            ? "bg-[#FF9C6D] text-[#111110]"
                            : "bg-[#f5f5f4] text-[#3a3835]"
                        }`}
                      >
                        {plan.badge}
                      </span>
                    </div>

                    <p
                      className={`mt-3 text-[16px] leading-relaxed min-h-[52px] ${
                        isHighlighted ? "text-neutral-300" : "text-[#4a4845]"
                      }`}
                    >
                      {plan.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-[44px] sm:text-[48px] font-bold tracking-tight leading-none tabular-nums">
                        ${price}
                      </span>
                      <span
                        className={`text-[16px] font-medium ${
                          isHighlighted ? "text-neutral-300" : "text-[#4a4845]"
                        }`}
                      >
                        / month
                      </span>
                    </div>

                    <p
                      className={`text-[14px] mt-1.5 ${
                        isHighlighted ? "text-neutral-300" : "text-[#4a4845]"
                      }`}
                    >
                      {billingCycle === "annual"
                        ? `Billed annually ($${plan.annualBilled.toLocaleString()}/yr)`
                        : "Billed monthly, cancel anytime"}
                    </p>

                    <div className="mt-7 space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-3 text-[16px] leading-snug ${
                            isHighlighted ? "text-neutral-100" : "text-[#262523]"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full shrink-0 mt-2 ${
                              isHighlighted ? "bg-[#FF9C6D]" : "bg-[#16a34a]"
                            }`}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => handleCta(plan.ctaType)}
                      className={`w-full min-h-[48px] py-3 px-6 rounded-full font-semibold text-[16px] flex items-center justify-center gap-2 transition-[transform,background-color] duration-150 active:scale-[0.98] cursor-pointer ${
                        isHighlighted
                          ? "bg-[#c2410c] hover:bg-[#9a3412] text-white"
                          : "bg-[#111110] hover:bg-[#2b2a28] text-white"
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 max-w-[840px]">
          <Reveal>
            <div className="mb-8 text-left">
              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#111110] tracking-tight">
                Frequently asked questions
              </h3>
              <p className="text-[16px] text-[#4a4845] mt-2">
                Straight answers about how Depoii matches territories and supports your estimating team.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white overflow-hidden transition-colors duration-150"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#fafaf9] transition-colors"
                  >
                    <span className="font-semibold text-[16px] text-[#111110] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#4a4845] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#111110]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-[16px] text-[#4a4845] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-[16px] text-[#4a4845]">
            <span>Expanding across Texas or need custom corridor mapping? </span>
            <button
              type="button"
              onClick={() => handleCta("demo")}
              className="font-semibold text-[#111110] hover:text-[#c2410c] underline underline-offset-4 cursor-pointer transition-colors"
            >
              Talk to our territory team →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
