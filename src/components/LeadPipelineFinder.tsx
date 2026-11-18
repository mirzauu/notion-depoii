"use client";

import React from "react";
import Image from "next/image";
import { 
  Building2, 
  Factory, 
  Layers, 
  Box, 
  BarChart3, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  User,
  Lock,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface PipelineLead {
  id: string;
  name: string;
  address: string;
  city: string;
  sqft: string;
  ageTag: string;
  substrate: string;
  grade: "Grade D" | "Grade C";
  condition: string;
  image: string;
  iconType: "building" | "factory" | "layers" | "box" | "barChart";
  contact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  theme: {
    cardBg: string;
    cardBorder: string;
    medallionBg: string;
    medallionText: string;
    gradeBg: string;
    gradeText: string;
    gradeBorder: string;
    waveColor: string;
  };
}

const ALL_PIPELINE_LEADS: PipelineLead[] = [
  {
    id: "valwood",
    name: "Valwood Industrial Distribution Center",
    address: "1685 Valwood Pkwy, Carrollton, TX",
    city: "Carrollton, TX",
    sqft: "68,400 sq ft",
    ageTag: "20 yrs (2004)",
    substrate: "TPO",
    grade: "Grade D",
    condition: "Perimeter seam separation & persistent ponding near central drainage scuppers.",
    image: "/assets/aerials/dcad-2501.jpg",
    iconType: "building",
    contact: {
      name: "Arthur Pendelton",
      title: "VP of Commercial Asset Management",
      email: "a.pendelton@texasgatewaylogistics.com",
      phone: "+1 (214) 555-0812",
    },
    theme: {
      cardBg: "bg-white",
      cardBorder: "border-neutral-200/90",
      medallionBg: "bg-[#e0f2fe]",
      medallionText: "text-[#0284c7]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#0284c7]",
    },
  },
  {
    id: "riverside",
    name: "Riverside Packaging Industrial Park",
    address: "3201 Riverside Dr, Irving, TX",
    city: "Irving, TX",
    sqft: "124,500 sq ft",
    ageTag: "18 yrs (2006)",
    substrate: "TPO",
    grade: "Grade D",
    condition: "Alligatoring and edge splitting on membrane, wear across south roof section.",
    image: "/assets/aerials/dcad-12221.jpg",
    iconType: "factory",
    contact: {
      name: "Becca Whitmore",
      title: "Director of Facilities",
      email: "b.whitmore@riversideindustrial.com",
      phone: "+1 (972) 555-0419",
    },
    theme: {
      cardBg: "bg-white",
      cardBorder: "border-neutral-200/90",
      medallionBg: "bg-[#dcfce7]",
      medallionText: "text-[#16a34a]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#16a34a]",
    },
  },
  {
    id: "pioneer",
    name: "Pioneer Tex Chemical Ops Terminal",
    address: "6700 Chemical Ln, Denton, TX",
    city: "Denton, TX",
    sqft: "142,000 sq ft",
    ageTag: "19 yrs (2005)",
    substrate: "Mod-Bit",
    grade: "Grade D",
    condition: "Granule loss, perimeter cracking, and aging flashings at mechanical penetrations.",
    image: "/assets/aerials/dcad-16850.jpg",
    iconType: "barChart",
    contact: {
      name: "Lisa Henderson",
      title: "Facilities Manager",
      email: "l.henderson@pioneertex.com",
      phone: "+1 (940) 555-0371",
    },
    theme: {
      cardBg: "bg-white",
      cardBorder: "border-neutral-200/90",
      medallionBg: "bg-[#fef3c7]",
      medallionText: "text-[#d97706]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#d97706]",
    },
  },
  {
    id: "central-expy",
    name: "Central Expressway Logistics Hub",
    address: "8600 S Central Expy, Dallas, TX",
    city: "Dallas, TX",
    sqft: "48,200 sq ft",
    ageTag: "19 yrs (2005)",
    substrate: "TPO",
    grade: "Grade D",
    condition: "Severe blistering along expansion joints following 1.75\" hail impact.",
    image: "/assets/aerials/dcad-4100.jpg",
    iconType: "building",
    contact: {
      name: "Marcus Vance",
      title: "VP of Real Estate Operations",
      email: "m.vance@centrallogisticsdfw.com",
      phone: "+1 (214) 555-9831",
    },
    theme: {
      cardBg: "bg-white",
      cardBorder: "border-neutral-200/90",
      medallionBg: "bg-[#e0f2fe]",
      medallionText: "text-[#0284c7]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#0284c7]",
    },
  },
  {
    id: "stemmons",
    name: "Stemmons Industrial Distribution Center",
    address: "11411 Stemmons Fwy, Dallas, TX",
    city: "Dallas, TX",
    sqft: "84,300 sq ft",
    ageTag: "21 yrs (2003)",
    substrate: "Mod-Bit",
    grade: "Grade C",
    condition: "Surface embrittlement and documented hail impacts across northwest bays.",
    image: "/assets/aerials/dcad-outside.jpg",
    iconType: "factory",
    contact: {
      name: "Sarah Jenkins",
      title: "Senior Director of Facilities",
      email: "s.jenkins@stemmonstrade.com",
      phone: "+1 (972) 555-8120",
    },
    theme: {
      cardBg: "bg-white",
      cardBorder: "border-neutral-200/90",
      medallionBg: "bg-[#fef3c7]",
      medallionText: "text-[#d97706]",
      gradeBg: "bg-[#fff7ed]",
      gradeText: "text-[#ea580c]",
      gradeBorder: "border-[#ffedd5]",
      waveColor: "text-[#d97706]",
    },
  },
  {
    id: "regal-row",
    name: "Regal Row Wholesale Logistics Center",
    address: "2400 Regal Row, Dallas, TX",
    city: "Dallas, TX",
    sqft: "112,000 sq ft",
    ageTag: "17 yrs (2007)",
    substrate: "EPDM",
    grade: "Grade D",
    condition: "Perimeter ballast displacement and severe seam shrinkage under south HVAC units.",
    image: "/assets/aerials/hero-roof.jpg",
    iconType: "layers",
    contact: {
      name: "David Thorne",
      title: "Head of Regional Asset Operations",
      email: "d.thorne@regalwholesale.com",
      phone: "+1 (214) 555-3419",
    },
    theme: {
      cardBg: "bg-white",
      cardBorder: "border-neutral-200/90",
      medallionBg: "bg-[#dcfce7]",
      medallionText: "text-[#16a34a]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#16a34a]",
    },
  },
];

function WaveIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M2 12c2.5-3.5 6-3.5 8.5 0s6 3.5 8.5 0" />
    </svg>
  );
}

function LeadIcon({ type }: { type: string }) {
  switch (type) {
    case "factory":
      return <Factory className="w-5 h-5" />;
    case "layers":
      return <Layers className="w-5 h-5" />;
    case "box":
      return <Box className="w-5 h-5" />;
    case "barChart":
      return <BarChart3 className="w-5 h-5" />;
    case "building":
    default:
      return <Building2 className="w-5 h-5" />;
  }
}

export function LeadPipelineFinder() {
  return (
    <section className="py-12 sm:py-16 bg-[#fafaf9] text-neutral-900 border-t border-neutral-200 overflow-hidden" id="pipeline-finder">
      {/* Auto-scrolling Cards Marquee (Left to Right) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left and Right Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#fafaf9] via-[#fafaf9]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#fafaf9] via-[#fafaf9]/80 to-transparent z-10" />

        {/* Continuous Marquee Track gliding from Left to Right */}
        <div className="flex w-max gap-6 animate-marquee-reverse hover:[animation-play-state:paused] px-4 cursor-grab active:cursor-grabbing">
          {/* Duplicated list to create an endless seamless loop */}
          {[...ALL_PIPELINE_LEADS, ...ALL_PIPELINE_LEADS].map((lead, index) => (
            <div
              key={`${lead.id}-${index}`}
              className="w-[340px] sm:w-[390px] shrink-0 bg-white rounded-2xl border border-neutral-200/90 overflow-hidden flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all duration-300"
            >
              <div>
                {/* Top Satellite Aerial Thumbnail with Badges */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Top-Left Badge: Age & Install Year */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1.5 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                    <span>{lead.ageTag}</span>
                  </div>

                  {/* Top-Right Badge: Sq Ft */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium shadow-xs">
                    {lead.sqft}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-3.5">
                  
                  {/* Header Row: Medallion + Name/Address + Grade Badge */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Medallion */}
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${lead.theme.medallionBg} ${lead.theme.medallionText} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}>
                        <LeadIcon type={lead.iconType} />
                      </div>

                      {/* Name & Address */}
                      <div className="min-w-0">
                        <h3 className="font-bold text-[14px] sm:text-[15px] text-neutral-900 leading-tight">
                          {lead.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] sm:text-[12px] text-neutral-500 mt-1">
                          <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                          <span className="truncate">{lead.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Grade Badge */}
                    <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${lead.theme.gradeBg} ${lead.theme.gradeText} border ${lead.theme.gradeBorder}`}>
                      {lead.grade}
                    </span>
                  </div>

                  {/* Row 2: Condition Note with Wave Icon */}
                  <div className="flex items-start gap-2.5 text-[11.5px] sm:text-[12px] text-neutral-700 leading-relaxed min-h-[36px]">
                    <WaveIcon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${lead.theme.waveColor}`} />
                    <p className="line-clamp-2">
                      {lead.condition}
                    </p>
                  </div>

                  {/* Row 3: Decision Maker & Action Buttons with Locked Indicator */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-100">
                    <a
                      href="#demo"
                      className="flex items-center gap-2.5 min-w-0 group/contact hover:opacity-85 transition-opacity"
                      title="Unlock full contact details in live briefing"
                    >
                      {/* User Icon */}
                      <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200/90 flex items-center justify-center shrink-0 text-neutral-950 shadow-2xs group-hover/contact:border-neutral-400">
                        <User className="w-4 h-4 text-neutral-950" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-[12px] sm:text-[13px] text-neutral-900 truncate leading-tight group-hover/contact:underline">
                          {lead.contact.name}
                        </div>
                        <div className="text-[10.5px] sm:text-[11px] text-neutral-500 truncate mt-0.5">
                          {lead.contact.title}
                        </div>
                      </div>
                    </a>

                    {/* Actions: Direct Line Locked Badge */}
                    <a
                      href="#demo"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-amber-200/90 bg-amber-50/80 hover:bg-amber-100/80 text-amber-900 transition-all shadow-2xs shrink-0 group/unlock"
                      title="Direct phone & email verified · Click to unlock in live briefing"
                    >
                      <Lock className="w-3 h-3 text-amber-700 shrink-0 group-hover/unlock:scale-110 transition-transform" />
                      <span className="text-[11px] font-semibold">Unlock Line</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Conversion Banner (Flaw 4) */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live DFW Pipeline Active
            </div>
            <h4 className="text-[20px] sm:text-[22px] font-bold text-neutral-950 tracking-tight">
              Over 1,240 commercial roofs currently hold severe storm exposure with 0 permits filed.
            </h4>
            <p className="text-[14px] sm:text-[15px] text-neutral-600 mt-1">
              Reserve your submarket to unlock full satellite dossiers, permit deltas, and verified owner direct dials.
            </p>
          </div>
          <a
            href="#demo"
            className="shrink-0 px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-[14px] transition-all shadow-sm flex items-center gap-2 group"
          >
            <span>Unlock All Direct Dials</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
