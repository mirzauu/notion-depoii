"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tag, Crosshair, Eye, Target } from "lucide-react";

const rotatingBadges = [
  {
    word: "Target",
    bg: "#ffdec4",
    text: "#9a3412",
    icon: Target,
  },
  {
    word: "Spot",
    bg: "#e2e8f0",
    text: "#0f172a",
    icon: Crosshair,
  },
  {
    word: "Inspect",
    bg: "#e0f2fe",
    text: "#075985",
    icon: Eye,
  },
  {
    word: "Win",
    bg: "#dcfce7",
    text: "#166534",
    icon: Tag,
  },
];

export function Hero() {
  const [badgeIndex, setBadgeIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % rotatingBadges.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const currentBadge = rotatingBadges[badgeIndex];
  const BadgeIcon = currentBadge.icon;

  return (
    <section className="relative -mt-16 sm:-mt-[68px] min-h-[84svh] sm:min-h-[88svh] flex items-center justify-center pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden bg-[#f5f5f4]">
      {/* Full Background Aerial Roof Image with subtle drift */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/landing/hero-roof.jpg"
          alt="Commercial warehouse roofs across Dallas Fort Worth"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%] hero-aerial-motion"
        />
      </div>

      {/* Flat Atmospheric Light Scrim for guaranteed text contrast */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/75" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        <h1 className="text-[34px] sm:text-[52px] lg:text-[64px] font-bold text-[#111110] tracking-[-0.035em] leading-[1.08] max-w-[900px] mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full transition-colors duration-200 align-middle"
            style={{
              backgroundColor: currentBadge.bg,
              color: currentBadge.text,
            }}
          >
            <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="font-semibold">{currentBadge.word}</span>
          </span>{" "}
          the{" "}
          <span className="relative inline-block text-[#111110]">
            right
            <svg
              className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#FF9C6D] pointer-events-none overflow-visible"
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
          <br />
          commercial roofs.
        </h1>

        <p className="mt-7 text-[16px] sm:text-[18px] text-[#262523] max-w-[660px] mx-auto font-normal leading-[1.55]">
          Tell Depoii your ideal building size, DFW corridor, and roof system. It scans 70,000+ commercial roofs to surface properties overdue for replacement or hit by recent storms, before they go to bid.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-trial"));
              }
            }}
            className="w-full sm:w-auto h-12 px-8 rounded-full text-white font-semibold text-[16px] bg-[#111110] hover:bg-[#2b2a28] transition-[transform,background-color] duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Get My 10-Roof Territory Brief</span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </button>

          <p className="text-[14px] text-[#3f3e3b] font-medium">
            Custom-built for your DFW corridors · Delivered within 24 hours · No card required
          </p>
        </div>
      </div>
    </section>
  );
}
