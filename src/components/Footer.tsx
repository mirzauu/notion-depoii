"use client";

import React from "react";
import Link from "next/link";
import { DepoiiMark } from "./DepoiiLogo";
import { Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-12 text-[#111110]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-4 pr-2">
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
            <div className="pt-1 flex items-center gap-2 text-[13.5px] text-[#3a3835]">
              <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
              <span>Workspace access capped at 2 contractors per territory</span>
            </div>
          </div>

          {/* Product */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[14px] font-bold text-[#111110]">Product</p>
            <ul className="space-y-2.5 text-[15px] text-[#4a4845]">
              <li>
                <Link href="/#platform" prefetch={false} className="hover:text-[#111110] transition-colors">
                  Target Matcher
                </Link>
              </li>
              <li>
                <Link href="/#ai-engine" prefetch={false} className="hover:text-[#111110] transition-colors">
                  How It Picks
                </Link>
              </li>
              <li>
                <Link href="/#pipeline-finder" prefetch={false} className="hover:text-[#111110] transition-colors">
                  DFW Sample Roofs
                </Link>
              </li>
              <li>
                <Link href="/#pricing" prefetch={false} className="hover:text-[#111110] transition-colors">
                  Pricing &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[14px] font-bold text-[#111110]">Solutions</p>
            <ul className="space-y-2.5 text-[15px] text-[#4a4845]">
              <li>
                <Link href="/dfw-commercial-roofing-leads" className="hover:text-[#111110] transition-colors">
                  DFW Commercial Roofing Leads
                </Link>
              </li>
              <li>
                <Link href="/hail-swath-roof-intelligence" className="hover:text-[#111110] transition-colors">
                  Hail Swath Roof Intelligence
                </Link>
              </li>
              <li>
                <Link href="/commercial-property-owner-lookup" className="hover:text-[#111110] transition-colors">
                  Commercial Property Owner Lookup
                </Link>
              </li>
              <li>
                <Link href="/permit-history-commercial-roofs" className="hover:text-[#111110] transition-colors">
                  Permit History Commercial Roofs
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Records */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[14px] font-bold text-[#111110]">Research &amp; Records</p>
            <ul className="space-y-2.5 text-[15px] text-[#4a4845]">
              <li>
                <Link
                  href="/research/dfw-commercial-roof-storm-exposure-study"
                  className="hover:text-[#111110] transition-colors"
                >
                  DFW Storm Exposure Study
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies/dfw-commercial-roofing-territory-brief"
                  className="hover:text-[#111110] transition-colors"
                >
                  DFW Territory Brief Case Study
                </Link>
              </li>
            </ul>
            <ul className="pt-2 space-y-1.5 text-[13.5px] text-[#4a4845]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                <span>NWS Storm Reports</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                <span>DCAD &amp; TAD Rolls</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                <span>Municipal Permit Archives</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                <span>TX Corporate Records</span>
              </li>
            </ul>
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
