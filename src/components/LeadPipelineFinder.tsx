"use client";

import React, { useState, useMemo } from "react";
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
  Filter,
  User
} from "lucide-react";

interface PipelineLead {
  id: string;
  name: string;
  address: string;
  city: string;
  metro: "DFW" | "Houston" | "Austin";
  sqft: string;
  sqftNum: number;
  ageTag: string;
  ageYears: number;
  installYear: number;
  substrate: "TPO" | "EPDM" | "Mod-Bit";
  grade: "Grade D" | "Grade C";
  condition: string;
  image: string;
  iconType: "building" | "factory" | "layers" | "box" | "barChart";
  contact: {
    name: string;
    initials: string;
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
    avatarBg: string;
    avatarText: string;
  };
}

const ALL_PIPELINE_LEADS: PipelineLead[] = [
  {
    id: "valwood",
    name: "Valwood Industrial Distribution Center",
    address: "1685 Valwood Pkwy, Carrollton, TX",
    city: "Carrollton, TX",
    metro: "DFW",
    sqft: "68,400 sq ft",
    sqftNum: 68400,
    ageTag: "20 yrs (2004)",
    ageYears: 20,
    installYear: 2004,
    substrate: "TPO",
    grade: "Grade D",
    condition: "Perimeter seam separation & persistent ponding near central drainage scuppers.",
    image: "/assets/aerials/dcad-2501.jpg",
    iconType: "building",
    contact: {
      name: "Arthur Pendelton",
      initials: "AP",
      title: "VP of Commercial Asset Management",
      email: "a.pendelton@texasgatewaylogistics.com",
      phone: "+1 (214) 555-0812",
    },
    theme: {
      cardBg: "bg-[#f4f9ff]",
      cardBorder: "border-[#d6e8fc]",
      medallionBg: "bg-[#e0f2fe]",
      medallionText: "text-[#0284c7]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#0284c7]",
      avatarBg: "bg-[#dbeafe]",
      avatarText: "text-[#1d4ed8]",
    },
  },
  {
    id: "riverside",
    name: "Riverside Packaging Industrial Park",
    address: "3201 Riverside Dr, Irving, TX",
    city: "Irving, TX",
    metro: "DFW",
    sqft: "124,500 sq ft",
    sqftNum: 124500,
    ageTag: "18 yrs (2006)",
    ageYears: 18,
    installYear: 2006,
    substrate: "TPO",
    grade: "Grade D",
    condition: "Alligatoring and edge splitting on membrane, wear across south section.",
    image: "/assets/aerials/dcad-12221.jpg",
    iconType: "factory",
    contact: {
      name: "Becca Whitmore",
      initials: "BW",
      title: "Director of Facilities",
      email: "b.whitmore@riversideindustrial.com",
      phone: "+1 (972) 555-0419",
    },
    theme: {
      cardBg: "bg-[#f2faf5]",
      cardBorder: "border-[#d1f2dd]",
      medallionBg: "bg-[#dcfce7]",
      medallionText: "text-[#16a34a]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#16a34a]",
      avatarBg: "bg-[#fef3c7]",
      avatarText: "text-[#b45309]",
    },
  },
  {
    id: "pioneer",
    name: "Pioneer Tex Chemical Ops Terminal",
    address: "6700 Chemical Ln, Denton, TX",
    city: "Denton, TX",
    metro: "DFW",
    sqft: "142,000 sq ft",
    sqftNum: 142000,
    ageTag: "19 yrs (2005)",
    ageYears: 19,
    installYear: 2005,
    substrate: "Mod-Bit",
    grade: "Grade D",
    condition: "Granule loss, perimeter cracking, and aging flashings at penetrations.",
    image: "/assets/aerials/dcad-16850.jpg",
    iconType: "barChart",
    contact: {
      name: "Lisa Henderson",
      initials: "LH",
      title: "Facilities Manager",
      email: "l.henderson@pioneertex.com",
      phone: "+1 (940) 555-0371",
    },
    theme: {
      cardBg: "bg-[#fffcf2]",
      cardBorder: "border-[#feefc3]",
      medallionBg: "bg-[#fef3c7]",
      medallionText: "text-[#d97706]",
      gradeBg: "bg-[#fff2eb]",
      gradeText: "text-[#c2410c]",
      gradeBorder: "border-[#fed7aa]/70",
      waveColor: "text-[#d97706]",
      avatarBg: "bg-[#fef3c7]",
      avatarText: "text-[#b45309]",
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
  const [selectedMetro, setSelectedMetro] = useState<string>("All");
  const [selectedSubstrate, setSelectedSubstrate] = useState<string>("All");
  const [selectedAge, setSelectedAge] = useState<string>("All");
  const [minSqft, setMinSqft] = useState<number>(0);

  // Filter logic
  const filteredLeads = useMemo(() => {
    return ALL_PIPELINE_LEADS.filter((lead) => {
      if (selectedMetro !== "All" && lead.metro !== selectedMetro) return false;
      if (selectedSubstrate !== "All" && lead.substrate !== selectedSubstrate) return false;
      if (minSqft > 0 && lead.sqftNum < minSqft) return false;
      if (selectedAge === "14-16" && (lead.ageYears < 14 || lead.ageYears > 16)) return false;
      if (selectedAge === "18-20" && (lead.ageYears < 18 || lead.ageYears > 20)) return false;
      if (selectedAge === "22+" && lead.ageYears < 22) return false;
      return true;
    });
  }, [selectedMetro, selectedSubstrate, selectedAge, minSqft]);

  return (
    <section className="py-24 sm:py-32 bg-[#fafaf9] text-neutral-900 border-t border-neutral-200" id="pipeline-finder">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading — Bold, Two Lines or Fewer, Zero Eyebrows */}
        <div className="max-w-4xl text-left mb-10 sm:mb-14">
          <h2 className="text-[34px] sm:text-[48px] lg:text-[56px] font-extrabold text-neutral-950 tracking-[-0.03em] leading-[1.08]">
            Find $250k+ commercial reroofs before the warranty expires.
          </h2>
          <p className="mt-5 text-[17px] sm:text-[19px] text-neutral-600 leading-relaxed max-w-3xl">
            Filter every commercial building in your territory by roof age, substrate, and satellite condition. 
            Connect with the building asset manager before a roof leak turns into a multi-bid RFP race.
          </p>
        </div>

        {/* Interactive Filter Control Canvas */}
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs mb-8">
          <div className="flex items-center gap-2 pb-4 mb-5 border-b border-neutral-100 text-[13px] font-bold text-neutral-950">
            <Filter className="w-4 h-4 text-neutral-600" />
            <span>Commercial Territory Filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Filter 1: Texas Metro */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Metro Market
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "All Texas", value: "All" },
                  { label: "DFW", value: "DFW" },
                  { label: "Houston", value: "Houston" },
                  { label: "Austin", value: "Austin" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSelectedMetro(item.value)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                      selectedMetro === item.value
                        ? "bg-neutral-950 text-white shadow-sm"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Roof Substrate */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Roof Substrate
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "All Types", value: "All", color: "bg-neutral-950 text-white" },
                  { label: "TPO & PVC", value: "TPO", color: "bg-sky-600 text-white ring-1 ring-sky-700" },
                  { label: "EPDM", value: "EPDM", color: "bg-amber-600 text-white ring-1 ring-amber-700" },
                  { label: "Mod-Bit", value: "Mod-Bit", color: "bg-rose-600 text-white ring-1 ring-rose-700" },
                ].map((item) => {
                  const isActive = selectedSubstrate === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setSelectedSubstrate(item.value)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                        isActive
                          ? `${item.color} shadow-sm font-bold`
                          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 3: Roof Age & Warranty Lifecycle */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Roof Age / Lifecycle
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "All Ages", value: "All", color: "bg-neutral-950 text-white" },
                  { label: "14–16y", value: "14-16", color: "bg-sky-600 text-white" },
                  { label: "18–20y", value: "18-20", color: "bg-amber-600 text-white font-bold" },
                  { label: "22y+ (Critical)", value: "22+", color: "bg-rose-600 text-white font-bold" },
                ].map((item) => {
                  const isActive = selectedAge === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setSelectedAge(item.value)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                        isActive
                          ? `${item.color} shadow-sm`
                          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 4: Minimum Footprint */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Min. Usable Footprint
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Any Sq Ft", value: 0 },
                  { label: "60k+ sq ft", value: 60000 },
                  { label: "90k+ sq ft", value: 90000 },
                  { label: "140k+ sq ft", value: 140000 },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setMinSqft(item.value)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                      minSqft === item.value
                        ? "bg-neutral-950 text-white"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Lead Cards Grid — Exactly matching user design mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className={`${lead.theme.cardBg} ${lead.theme.cardBorder} rounded-2xl border overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300`}
            >
              <div>
                {/* Top Satellite Aerial Thumbnail with 2 Badges */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Top-Left Badge: Calendar + Age */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1.5 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                    <span>{lead.ageTag}</span>
                  </div>

                  {/* Top-Right Badge: Sq Ft */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium shadow-xs">
                    {lead.sqft}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col gap-3.5">
                  
                  {/* Header Row: Medallion + Name/Address + Grade Badge */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* 38px/40px Medallion */}
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

                  {/* Row 3: Decision Maker & Action Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-3">
                    <a
                      href="#pilot"
                      className="flex items-center gap-2.5 min-w-0 group/contact hover:opacity-85 transition-opacity"
                      title="Unlock full contact details in pilot workspace"
                    >
                      {/* Real User Icon in Black */}
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

                    {/* Actions: Mail and Phone Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="#pilot"
                        className="w-8 h-8 rounded-lg border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors shadow-2xs"
                        title="Unlock verified email in pilot workspace"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="#pilot"
                        className="w-8 h-8 rounded-lg border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors shadow-2xs"
                        title="Unlock direct phone line in pilot workspace"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 mt-6">
            <Building2 className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
            <div className="font-bold text-neutral-900 text-[16px]">No commercial properties match these filters.</div>
            <p className="text-neutral-500 text-[13px] mt-1">Try widening your square footage or selecting all Texas metros.</p>
          </div>
        )}

      </div>
    </section>
  );
}
