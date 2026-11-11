"use client";

import React from "react";
import Link from "next/link";
import { DepoiiMark } from "./DepoiiLogo";
import { Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-12 text-neutral-900">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4 pr-4">
            <Link href="/" prefetch={false} className="inline-flex items-center gap-2.5">
              <DepoiiMark className="w-7 h-7 text-neutral-950" />
              <span className="font-bold text-[1.3rem] tracking-tight text-neutral-950">Depoii</span>
            </Link>
            <p className="text-[14px] text-neutral-600 max-w-sm leading-relaxed">
              Commercial roofing intelligence for Dallas–Fort Worth. Roof age, severe storm history, and verified decision makers mapped across 12,400+ properties.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[14px]">
              <Mail className="w-4 h-4 text-neutral-400" />
              <a
                href="mailto:hello@depoii.com"
                className="font-medium text-neutral-900 hover:underline underline-offset-4"
              >
                hello@depoii.com
              </a>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[13px] font-bold text-neutral-900 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-[14px] text-neutral-600">
              <li>
                <Link href="#intelligence" prefetch={false} className="hover:text-neutral-950 transition-colors">
                  How Depoii Thinks
                </Link>
              </li>
              <li>
                <Link href="#platform" prefetch={false} className="hover:text-neutral-950 transition-colors">
                  Interactive Dossier
                </Link>
              </li>
              <li>
                <Link href="#pipeline-finder" prefetch={false} className="hover:text-neutral-950 transition-colors">
                  DFW Flagged Properties
                </Link>
              </li>
              <li>
                <Link href="#pilot" prefetch={false} className="hover:text-neutral-950 transition-colors">
                  Corridor Lockout &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" prefetch={false} className="hover:text-neutral-950 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Public Sources & Exclusivity */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[13px] font-bold text-neutral-900 uppercase tracking-wider">Verified intelligence sources</h4>
            <ul className="space-y-2 text-[13px] text-neutral-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>NOAA SPC &amp; NEXRAD Level II Real-Time Radar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Dallas CAD (DCAD) &amp; Tarrant CAD (TAD) Property GIS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Municipal Commercial Permit Registries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Texas Secretary of State Corporate Entity Filings</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-[12px] text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Workspace exclusivity capped at 2 contractors per territory</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Operational Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[13px] text-neutral-500 gap-4">
          <div>© {new Date().getFullYear()} Depoii. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-neutral-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-800 cursor-pointer">Terms of Service</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              DFW Radar &amp; CAD Data Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
