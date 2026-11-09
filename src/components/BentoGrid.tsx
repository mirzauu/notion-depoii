"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BentoGrid() {
  return (
    <section className="py-16 sm:py-24 bg-white" id="bento-features">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-left">
          <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-[#191918] tracking-[-0.03em] leading-[1.1]">
            AI where your team works.
          </h2>
        </div>

        {/* Bento Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Capture knowledge */}
          <Link
            href="#capture"
            prefetch={false}
            id="capture"
            className="group relative bg-[#f9f9f8] hover:bg-[#f6f5f4] border border-black/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-6 z-10">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-black/50 mb-1">
                Capture knowledge
              </div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[20px] sm:text-[23px] font-bold text-black leading-snug">
                  Bring everything into one system of record.
                </h3>
                <span className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-black/10 flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>

            {/* Visual preview with layered UI elements */}
            <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-white/60 border border-black/[0.04] mt-4 shadow-sm">
              <Image
                src="/assets/bento-capture-desktop.jpg"
                alt="Capture knowledge workspace"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Floating Pin Capture Layer */}
              <div className="absolute inset-x-4 bottom-14 z-10">
                <Image
                  src="/assets/bento-pin-capture.png"
                  alt="Pin capture"
                  width={680}
                  height={160}
                  className="w-full object-contain drop-shadow-md rounded-lg"
                />
              </div>
              {/* Mini AI MN Floating Layer */}
              <div className="absolute inset-x-12 bottom-3 z-20">
                <Image
                  src="/assets/bento-mini-aimn.png"
                  alt="AI Assistant"
                  width={500}
                  height={60}
                  className="w-full object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </Link>

          {/* Card 2: Find answers */}
          <Link
            href="#find"
            prefetch={false}
            id="find"
            className="group relative bg-[#f9f9f8] hover:bg-[#f6f5f4] border border-black/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-6 z-10">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-black/50 mb-1">
                Find answers
              </div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[20px] sm:text-[23px] font-bold text-black leading-snug">
                  Get answers, instantly—with citations.
                </h3>
                <span className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-black/10 flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>

            {/* Visual preview with layered search elements */}
            <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-white/60 border border-black/[0.04] mt-4 shadow-sm">
              <Image
                src="/assets/bento-find-desktop.png"
                alt="Find answers workspace"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Find Layer Result */}
              <div className="absolute inset-x-6 top-8 bottom-16 z-10 flex items-center justify-center">
                <Image
                  src="/assets/bento-find-layer.png"
                  alt="Search results"
                  width={680}
                  height={340}
                  className="w-full object-contain drop-shadow-xl rounded-lg"
                />
              </div>
              {/* Chat Input Layer */}
              <div className="absolute inset-x-10 bottom-3 z-20">
                <Image
                  src="/assets/bento-chat-input.png"
                  alt="Chat prompt"
                  width={520}
                  height={60}
                  className="w-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </Link>

          {/* Card 3: Automate busywork (Wide 2-col Card) */}
          <Link
            href="#automate"
            prefetch={false}
            id="automate"
            className="lg:col-span-2 group relative bg-[#f9f9f8] hover:bg-[#f6f5f4] border border-black/[0.06] rounded-2xl p-6 sm:p-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="lg:col-span-5 z-10">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-black/50 mb-1">
                Automate busywork
              </div>
              <h3 className="text-[22px] sm:text-[28px] font-bold text-black leading-snug mb-4">
                Keep work moving 24/7 with agents.
              </h3>
              <p className="text-[15px] sm:text-[16px] text-black/70 leading-relaxed mb-6">
                Turn repetitious tasks into automated workflows. Agents monitor data, summarize updates, triage inquiries, and trigger actions.
              </p>
              <div className="inline-flex items-center gap-2 font-medium text-[15px] text-[#0075de] group-hover:text-[#005bab]">
                Explore agent workflows
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Visual media on right */}
            <div className="lg:col-span-7 relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-black/[0.06] bg-white flex items-center justify-center gap-4 p-4 shadow-sm">
              <div className="relative w-1/2 h-full rounded-lg overflow-hidden border border-black/[0.04]">
                <Image
                  src="/assets/bento-automate-desktop.jpg"
                  alt="Automate dashboard"
                  fill
                  className="object-cover object-left"
                />
              </div>
              <div className="relative w-1/2 h-full rounded-lg overflow-hidden border border-black/[0.04]">
                <Image
                  src="/assets/bento-automate-layer.png"
                  alt="Agent workflow automation"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
