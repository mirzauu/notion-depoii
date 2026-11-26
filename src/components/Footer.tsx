"use client";

import React from "react";
import Link from "next/link";
import { DepoiiMark } from "./DepoiiLogo";
import { Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-12 text-[#111110]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4 pr-4">
            <Link href="/" prefetch={false} className="inline-flex items-center gap-2.5">
              <DepoiiMark className="w-7 h-7 text-[#111110]" />
              <span className="font-bold text-[1.35rem] tracking-tight text-[#111110]">Depoii</span>
            </Link>
            <p className="text-[16px] text-[#4a4845] max-w-sm leading-relaxed">
              Commercial roofing territory intelligence for Dallas–Fort Worth. Matching 70,000+ buildings to your crew’s size, corridor, and roof-age targets.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[16px]">
              <Mail className="w-4 h-4 text-[#4a4845]" />
              <a
                href="mailto:hello@depoii.com"
                className="font-medium text-[#111110] hover:underline underline-offset-4"
              >
                hello@depoii.com
              </a>
            </div>
          </div>

          {/* Fixed Navigation */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[14px] font-bold text-[#111110]">Product</p>
            <ul className="space-y-2.5 text-[16px] text-[#4a4845]">
              <li>
                <Link href="#platform" prefetch={false} className="hover:text-[#111110] transition-colors">
                  Target Matcher
                </Link>
              </li>
              <li>
                <Link href="#ai-engine" prefetch={false} className="hover:text-[#111110] transition-colors">
                  How It Picks
                </Link>
              </li>
              <li>
                <Link href="#pipeline-finder" prefetch={false} className="hover:text-[#111110] transition-colors">
                  DFW Sample Roofs
                </Link>
              </li>
              <li>
                <Link href="#pricing" prefetch={false} className="hover:text-[#111110] transition-colors">
                  Pricing &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Public Sources & Exclusivity */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[14px] font-bold text-[#111110]">Verified Public Records</p>
            <ul className="space-y-2 text-[14.5px] text-[#4a4845]">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] shrink-0" />
                <span>National Weather Service Storm Reports &amp; Warnings</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] shrink-0" />
                <span>Dallas CAD (DCAD) &amp; Tarrant CAD (TAD) Building Rolls</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] shrink-0" />
                <span>Municipal Commercial Roofing Permit Archives</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] shrink-0" />
                <span>Texas Corporate Entity Ownership Records</span>
              </li>
            </ul>

            <div className="mt-4 pt-2 flex items-center gap-2 text-[13.5px] text-[#3a3835]">
              <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
              <span>Workspace access capped at 2 contractors per territory</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[14px] text-[#4a4845] gap-4">
          <div>© {new Date().getFullYear()} Depoii. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-[#111110] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#111110] transition-colors">
              Terms of Service
            </Link>
            <span className="flex items-center gap-2 text-[#14532d] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
              DFW Records Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
