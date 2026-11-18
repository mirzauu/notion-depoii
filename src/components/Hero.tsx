"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Crosshair, Eye, DollarSign } from "lucide-react";

// Rotating action badge in hero heading
const rotatingBadges = [
  {
    word: "Audit",
    bg: "#ffdec4",
    text: "#c2410c",
    border: "#fed7aa",
    icon: Tag,
  },
  {
    word: "Spot",
    bg: "#f1f5f9",
    text: "#0f172a",
    border: "#cbd5e1",
    icon: Crosshair,
  },
  {
    word: "Inspect",
    bg: "#e0f2fe",
    text: "#0369a1",
    border: "#bae6fd",
    icon: Eye,
  },
  {
    word: "Price",
    bg: "#fef3c7",
    text: "#b45309",
    border: "#fde68a",
    icon: DollarSign,
  },
];

export function Hero() {
  const [badgeIndex, setBadgeIndex] = useState(0);

  // Auto-rotate badge in headline
  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % rotatingBadges.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const currentBadge = rotatingBadges[badgeIndex];
  const BadgeIcon = currentBadge.icon;

  return (
    <section className="relative -mt-16 sm:-mt-[68px] min-h-[88vh] sm:min-h-[94vh] flex items-center justify-center pt-32 pb-32 sm:pt-40 sm:pb-44 overflow-hidden">
      {/* Full Background Aerial Roof Image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/landing/hero-roof.jpg"
          alt="Commercial roofs in Dallas Fort Worth"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>

      {/* Atmospheric Light Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.28)_40%,rgba(255,255,255,0.68)_85%,#ffffff_100%)]" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Hero Heading with dynamic action pill and Depoii brand underline */}
        <h1 className="text-[40px] sm:text-[60px] lg:text-[76px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12] max-w-[1100px] mx-auto">
          Where commercial roofers{" "}
          <span
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full transition-all duration-200 align-middle shadow-xs border bg-white"
            style={{
              backgroundColor: currentBadge.bg,
              color: currentBadge.text,
              borderColor: currentBadge.border,
            }}
          >
            <BadgeIcon className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{currentBadge.word}</span>
          </span>{" "}
          the{" "}
          <span className="relative inline-block text-neutral-950">
            next
            {/* Depoii Signature Coral / Amber Underline */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#FF9C6D] pointer-events-none overflow-visible"
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
          job.
        </h1>

        {/* Sharpened Subtitle: Autonomous Discovery & High-Conviction Value (Flaw 2) */}
        <p className="mt-6 text-[18px] sm:text-[21px] text-neutral-700 max-w-[820px] mx-auto font-normal leading-[1.45]">
          The vertical AI engine that continuously monitors 70,000+ DFW commercial properties. Correlating NEXRAD hail swaths against aging single-ply membranes to uncover high-value unpermitted roof replacements — before competitors even know the storm hit.
        </p>

        {/* CTA in Depoii Theme */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-trial"));
              }
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-semibold text-[15px] bg-neutral-950 hover:bg-neutral-800 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_26px_rgba(0,0,0,0.3)] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start free trial</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          
          {/* Micro-trust signals */}
          <div className="flex items-center gap-2 text-[12px] text-neutral-500 font-medium">
            <span>Instant DFW pipeline access</span>
            <span>·</span>
            <span>No credit card required</span>
            <span>·</span>
            <span className="text-neutral-700 font-semibold">Territory locked upon reservation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
