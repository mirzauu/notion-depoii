"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CloudHail,
  FileText,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  ArrowUpRight,
  Layers,
  Tag,
  Crosshair,
  Eye,
  DollarSign,
  Users,
  Lock,
  Filter,
  Check,
  Target,
  Plus,
  X,
  Activity,
  Zap,
} from "lucide-react";

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

interface PropertyDeal {
  id: string;
  name: string;
  address: string;
  cityStateZip: string;
  categoryTag: string;
  sqft: string;
  builtYear: string;
  age: string;
  roofType: string;
  hailImpact: string;
  hailDetails: string;
  stormDate: string;
  permitStatus: string;
  permitDetail: string;
  replacementValue: string;
  replacementShort: string;
  replacementLabel: string;
  verificationScore: number;
  ownerType: string;
  buildingUse: string;
  structure: string;
  headerPhoto: string;
  thumbnailPhoto: string;
  satelliteImage: string;
  degradationRate: string;
  thesis: string[];
  dealThesisSummary: string;
}

const properties: PropertyDeal[] = [
  {
    id: "central-expy",
    name: "8600 S Central Expy",
    address: "8600 S Central Expy",
    cityStateZip: "Dallas, TX 75403",
    categoryTag: "Logistics Hub",
    sqft: "48,200 sq ft",
    structure: "308,343 sq ft",
    buildingUse: "Industrial",
    builtYear: "1956 (~70 yrs)",
    age: "19 years",
    roofType: "TPO Membrane",
    hailImpact: '1.75" Hail',
    hailDetails: "3 days ago (NWS)",
    stormDate: "May 28, 2024 · Dallas Metro",
    permitStatus: "0 Filings",
    permitDetail: "(Post-storm)",
    replacementValue: "$674,800",
    replacementShort: "$674k",
    replacementLabel: "Est. commercial replacement",
    verificationScore: 85,
    ownerType: "Out-of-state REIT",
    headerPhoto: "/assets/aerials/thumb-central-expy.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-1.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-hd.jpg",
    degradationRate: "+34% over 3 years",
    thesis: [
      "19-yr old TPO membrane (near end of manufacturer warranty)",
      '1.75" hail reported 3 days ago by NWS Fort Worth station',
      "0 post-storm permits filed with City of Dallas (Unclaimed deal)",
      "Owner is an out-of-state entity; facility director contact verified",
    ],
    dealThesisSummary:
      "High-probability replacement: aged roof + verified hail + no permit activity + reachable decision maker.",
  },
  {
    id: "inwood-rd",
    name: "14201 Inwood Rd",
    address: "14201 Inwood Rd",
    cityStateZip: "Dallas, TX 75244",
    categoryTag: "Manufacturing Plant",
    sqft: "84,000 sq ft",
    structure: "112,500 sq ft",
    buildingUse: "Manufacturing",
    builtYear: "1988 (~36 yrs)",
    age: "22 years",
    roofType: "Modified Bitumen",
    hailImpact: '2.25" Hail',
    hailDetails: "3 days ago (NWS)",
    stormDate: "May 28, 2024 · North Dallas",
    permitStatus: "0 Filings",
    permitDetail: "(Post-storm)",
    replacementValue: "$1,180,000",
    replacementShort: "$1.18M",
    replacementLabel: "Est. commercial replacement",
    verificationScore: 92,
    ownerType: "Absentee Owner",
    headerPhoto: "/assets/aerials/carousel-prop-2.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-2.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-hd.jpg",
    degradationRate: "+48% surface wear & ponding",
    thesis: [
      "22-yr old Modified Bitumen showing seam blisters and gravel displacement",
      '2.25" severe hail corridor confirmed by Doppler dual-pol radar',
      "Zero commercial roofing permits logged within 180 days",
      "Delaware corporate owner with on-site VP of Operations reachable",
    ],
    dealThesisSummary:
      "High-probability replacement: aged bitumen membrane + 2.25\" hail + unpermitted restoration window.",
  },
  {
    id: "airport-fwy",
    name: "2200 E Airport Fwy",
    address: "2200 E Airport Fwy",
    cityStateZip: "Irving, TX 75062",
    categoryTag: "Commercial Flex Park",
    sqft: "32,500 sq ft",
    structure: "45,000 sq ft",
    buildingUse: "Commercial Flex",
    builtYear: "1994 (~30 yrs)",
    age: "17 years",
    roofType: "EPDM Membrane",
    hailImpact: '1.50" Hail',
    hailDetails: "3 days ago (NWS)",
    stormDate: "May 28, 2024 · DFW Corridor",
    permitStatus: "0 Filings",
    permitDetail: "(Post-storm)",
    replacementValue: "$455,000",
    replacementShort: "$455k",
    replacementLabel: "Est. commercial replacement",
    verificationScore: 78,
    ownerType: "Local Property Manager",
    headerPhoto: "/assets/aerials/carousel-prop-3.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-3.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-alt.jpg",
    degradationRate: "+26% perimeter fatigue",
    thesis: [
      "17-yr ballasted EPDM with perimeter parapet flashing distress",
      '1.50" hail confirmed on adjacent flight line weather station',
      "No restoration filings; tenant reported interior ceiling moisture",
      "Local property manager with direct cell phone and email verified",
    ],
    dealThesisSummary:
      "High-probability replacement: parapet seam failure + DFW hail track + reachable local property manager.",
  },
];

export function Hero() {
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [activeSubTab, setActiveSubTab] = useState<string>("Overview");
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate badge in headline
  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % rotatingBadges.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle properties every 10s when idle
  useEffect(() => {
    const propertyTimer = setInterval(() => {
      setActivePropertyIndex((prev) => (prev + 1) % properties.length);
    }, 10000);
    return () => clearInterval(propertyTimer);
  }, []);

  const activeProperty = properties[activePropertyIndex];
  const currentBadge = rotatingBadges[badgeIndex];
  const BadgeIcon = currentBadge.icon;

  // Drag handler for before/after satellite image slider
  const handleSliderMove = useCallback(
    (clientX: number) => {
      if (!sliderContainerRef.current) return;
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(5, Math.min(95, (x / width) * 100));
      setSliderPosition(percentage);
    },
    [sliderContainerRef]
  );

  const onMouseDown = () => setIsDraggingSlider(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider) {
        handleSliderMove(e.clientX);
      }
    };
    const onMouseUp = () => setIsDraggingSlider(false);

    if (isDraggingSlider) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDraggingSlider, handleSliderMove]);

  const onTouchStart = () => setIsDraggingSlider(true);
  const onTouchMove = (e: React.TouchEvent) => {
    if (isDraggingSlider && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };
  const onTouchEnd = () => setIsDraggingSlider(false);

  return (
    <section className="relative pt-6 pb-20 overflow-hidden bg-[#ffffff]">
      {/* Subtle atmospheric radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9]/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow Pill Badge with Depoii signature accent */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e7eb] shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-5 transition-all hover:border-neutral-400">
          <span className="w-2 h-2 rounded-full bg-[#FF9C6D] ring-4 ring-[#FF9C6D]/20 animate-pulse" />
          <span className="text-[13px] sm:text-[14px] font-medium text-neutral-900 tracking-tight">
            Commercial Roofing Intelligence
          </span>
        </div>

        {/* Hero Heading with dynamic action pill and Depoii brand underline */}
        <h1 className="text-[36px] sm:text-[54px] lg:text-[70px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12] max-w-[1100px] mx-auto">
          Where commercial roofers{" "}
          <span
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full transition-all duration-200 align-middle shadow-xs border"
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

        {/* Subtitle */}
        <p className="mt-5 text-[17px] sm:text-[20px] text-neutral-600 max-w-[760px] mx-auto font-normal leading-[1.45]">
          The AI intelligence platform mapping 70,000+ DFW commercial properties. Roof age, severe storm exposure, permit history, and verified decision makers — surfaced before competitors find them.
        </p>

        {/* CTA in Depoii Theme */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <Link
            href="#pilot"
            prefetch={false}
            className="w-full sm:w-auto px-7 py-3 rounded-full text-white font-semibold text-[15px] bg-neutral-950 hover:bg-neutral-800 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.26)] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Explore your territory intelligence</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* DEPOII THEMED LIGHT WORKSPACE WINDOW                     */}
        {/* ========================================================= */}
        <div id="platform" className="relative mt-12 w-full max-w-[1140px] mx-auto scroll-mt-24">
          <div className="rounded-2xl border border-neutral-200 bg-white text-neutral-950 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden text-left relative z-10">
            {/* Mobile-Only Mid-UI Floating Prev / Next Navigation Arrows */}
            <button
              onClick={() =>
                setActivePropertyIndex(
                  (prev) => (prev - 1 + properties.length) % properties.length
                )
              }
              aria-label="Previous property demo"
              className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 backdrop-blur border border-neutral-300 text-neutral-900 shadow-lg flex items-center justify-center active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setActivePropertyIndex((prev) => (prev + 1) % properties.length)
              }
              aria-label="Next property demo"
              className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 backdrop-blur border border-neutral-300 text-neutral-900 shadow-lg flex items-center justify-center active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* ----------------- TOP BROWSER & TAB HEADER ----------------- */}
            <div className="h-10 px-3 bg-[#f8f9fa] border-b border-neutral-200 flex items-center justify-between select-none">
              {/* Left: macOS dots + Back/Forward chevrons + Active Tab */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                </div>

                <div className="hidden sm:flex items-center gap-0.5 text-neutral-400 pl-2 shrink-0">
                  <button className="p-1 hover:text-neutral-950 hover:bg-neutral-100 rounded">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 hover:text-neutral-950 hover:bg-neutral-100 rounded">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Active Tab */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-t-md border-t border-x border-neutral-200 text-[12px] font-medium text-neutral-900 shadow-2xs truncate max-w-[200px]">
                  <Zap className="w-3 h-3 text-[#FF9C6D] shrink-0" />
                  <span className="truncate">{activeProperty.name}</span>
                  <X className="w-3 h-3 text-neutral-400 hover:text-neutral-900 ml-1 cursor-pointer shrink-0" />
                </div>

                <button className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Empty placeholder or minimal clean finish */}
              <div />
            </div>

            {/* ----------------- WORKSPACE BODY ----------------- */}
            <div className="flex flex-col min-h-[580px]">
              {/* ----------------- MAIN CANVAS ----------------- */}
              <div className="flex-1 flex flex-col p-4 sm:p-5 bg-white overflow-hidden">
                {/* Property Header Block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                  <div className="flex items-start sm:items-center gap-3">
                    {/* Warehouse Building Photo Thumbnail */}
                    <div className="relative w-16 h-13 sm:w-20 sm:h-14 rounded-lg overflow-hidden border border-neutral-200 shadow-2xs shrink-0">
                      <Image
                        src={activeProperty.headerPhoto}
                        alt={activeProperty.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Title and Specs */}
                    <div>
                      <h2 className="text-[20px] sm:text-[24px] font-bold text-neutral-950 tracking-tight">
                        {activeProperty.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[12px] text-neutral-600">
                        <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 font-semibold text-[11px] border border-neutral-200">
                          {activeProperty.categoryTag}
                        </span>
                        <span>
                          {activeProperty.cityStateZip} · {activeProperty.sqft} ·{" "}
                          {activeProperty.roofType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Tabs Row & Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-neutral-100 text-[12px]">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[
                      { name: "Overview", icon: FileText },
                      { name: "Deal Assessment ✨", icon: Zap },
                      { name: "Permit History", icon: FileText },
                      { name: "Contacts", icon: Users },
                      { name: "Activity", icon: Activity },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeSubTab === tab.name;
                      return (
                        <button
                          key={tab.name}
                          onClick={() => setActiveSubTab(tab.name)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                            isActive
                              ? "bg-neutral-100 text-neutral-950 font-semibold shadow-2xs"
                              : "text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{tab.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Header CTA & Search in Depoii Theme */}
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-md">
                      <Filter className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-md">
                      <Search className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-3.5 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-[12px] font-semibold text-white transition-all shadow-xs flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-neutral-300" />
                      <span>Claim Property</span>
                    </button>
                  </div>
                </div>

                {/* 5-Metric Quick Stats Horizontal Row */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 py-3 border-b border-neutral-100 text-left">
                  {/* Metric 1: Verification Score */}
                  <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <div className="w-4 h-4 rounded-full bg-neutral-950 flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Verification Score</span>
                    </div>
                    <div className="mt-1 text-[17px] font-bold text-neutral-950">
                      {activeProperty.verificationScore}/100
                    </div>
                    <div className="text-[10px] text-neutral-700 font-semibold mt-0.5">Verified</div>
                  </div>

                  {/* Metric 2: Roof Age */}
                  <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <Layers className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Roof Age</span>
                    </div>
                    <div className="mt-1 text-[17px] font-bold text-neutral-950">
                      {activeProperty.age}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                      {activeProperty.roofType}
                    </div>
                  </div>

                  {/* Metric 3: Storm Impact */}
                  <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <CloudHail className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Storm Impact</span>
                    </div>
                    <div className="mt-1 text-[17px] font-bold text-neutral-950">
                      {activeProperty.hailImpact}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                      {activeProperty.hailDetails}
                    </div>
                  </div>

                  {/* Metric 4: Permits */}
                  <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                      <FileText className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Permits</span>
                    </div>
                    <div className="mt-1 text-[17px] font-bold text-neutral-950">
                      {activeProperty.permitStatus}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                      {activeProperty.permitDetail}
                    </div>
                  </div>

                  {/* Metric 5: Replacement Value */}
                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 shadow-2xs col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-700">
                      <TrendingUp className="w-3.5 h-3.5 text-neutral-900" />
                      <span>Replacement Value</span>
                    </div>
                    <div className="mt-1 text-[18px] font-extrabold text-neutral-950">
                      {activeProperty.replacementValue}
                    </div>
                  </div>
                </div>

                {/* 3 Main Body Cards: Satellite Slider, AI Assessment, Property Details */}
                <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1">
                  {/* CARD 1: AERIAL ROOF TIMELINE (MATCHED ROOF SPLIT) */}
                  <div className="lg:col-span-5 flex flex-col bg-white rounded-xl border border-neutral-200 p-3 shadow-2xs">
                    {/* Header bar */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-[12px] font-bold text-neutral-950">
                          Aerial roof timeline
                        </span>
                      </div>

                      {/* Year pill tabs */}
                      <div className="flex items-center gap-1 text-[10px]">
                        {[2020, 2021, 2022, 2023, 2024].map((year) => (
                          <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-1.5 py-0.5 rounded transition-colors ${
                              selectedYear === year
                                ? "bg-neutral-950 text-white font-bold"
                                : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                        <span className="text-neutral-300">·</span>
                        <span className="text-neutral-600">Latest ▾</span>
                      </div>
                    </div>

                    {/* Satellite Roof Image */}
                    <div className="relative flex-1 min-h-[200px] sm:min-h-[220px] rounded-lg overflow-hidden select-none border border-neutral-200 bg-neutral-50">
                      {/* Exact Matched Same-Roof Comparison Photo */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={activeProperty.satelliteImage}
                          alt="Aerial Roof Degradation Comparison"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>

                      {/* Clean Floating Year Badges */}
                      <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-tight shadow pointer-events-none">
                        2021 (Clean)
                      </div>
                      <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-tight shadow pointer-events-none">
                        2024 (Degradation)
                      </div>
                    </div>

                    {/* Degradation Summary Pill in Depoii Theme */}
                    <div className="mt-2.5 p-1.5 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center gap-1.5 text-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF9C6D]" />
                      <span className="text-[11px] font-semibold text-neutral-900">
                        Membrane Degradation: {activeProperty.degradationRate}
                      </span>
                    </div>
                  </div>

                  {/* CARD 2: DEPOII AI DEAL ASSESSMENT */}
                  <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-xl border border-neutral-200 p-3 shadow-2xs">
                    <div>
                      {/* Box Header */}
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-100">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF9C6D]" />
                          <span className="text-[12px] font-bold text-neutral-950">
                            Depoii AI Assessment
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Audio equalizer bars in Depoii Coral */}
                          <div className="flex items-end gap-0.5 h-3">
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-1" />
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-2" />
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-3" />
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-1" />
                          </div>
                          <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Verified Brief
                          </span>
                        </div>
                      </div>

                      {/* 4 Sequenced AI Proof Checkpoints */}
                      <div className="space-y-2 text-left">
                        {activeProperty.thesis.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-950 shrink-0 mt-0.5" />
                            <span className="leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deal Thesis Box in Depoii Theme */}
                    <div className="mt-3 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-left">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-950">
                        <Target className="w-3.5 h-3.5 text-[#FF9C6D]" />
                        <span>Deal Thesis</span>
                      </div>
                      <p className="mt-1 text-[11px] text-neutral-700 leading-relaxed">
                        {activeProperty.dealThesisSummary}
                      </p>
                    </div>
                  </div>

                  {/* CARD 3: PROPERTY DETAILS TABLE */}
                  <div className="lg:col-span-3 flex flex-col bg-white rounded-xl border border-neutral-200 p-3 shadow-2xs text-left">
                    {/* Header */}
                    <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-neutral-100">
                      <FileText className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-[12px] font-bold text-neutral-950">Property details</span>
                    </div>

                    {/* Key-Value Table */}
                    <div className="space-y-2.5 text-[11px] flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Structure</span>
                        <span className="font-semibold text-neutral-950">
                          {activeProperty.structure}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Building Use</span>
                        <span className="font-semibold text-neutral-950">
                          {activeProperty.buildingUse}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Owner</span>
                        <span className="font-semibold text-neutral-950">
                          {activeProperty.ownerType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Contact</span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-800 font-semibold text-[10px] border border-neutral-200">
                          <Check className="w-2.5 h-2.5 stroke-[3] text-neutral-900" />
                          <span>Verified</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Permit Status</span>
                        <span className="font-semibold text-neutral-950">
                          {activeProperty.permitStatus}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                        <span className="text-neutral-500">Est. Value</span>
                        <span className="font-bold text-neutral-950">
                          {activeProperty.replacementValue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* THREE-PROPERTY CAROUSEL SWITCHER IN DEPOII THEME          */}
          {/* ========================================================= */}
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 w-full">
              {/* Previous button (Desktop / Tablet only) */}
              <button
                onClick={() =>
                  setActivePropertyIndex(
                    (prev) => (prev - 1 + properties.length) % properties.length
                  )
                }
                aria-label="Previous commercial property"
                className="hidden sm:flex w-8 h-8 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 shadow-2xs items-center justify-center transition-all active:scale-95 shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* 3 Interactive Property Opportunity Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-[1020px]">
                {properties.map((prop, idx) => {
                  const isActive = idx === activePropertyIndex;
                  return (
                    <div
                      key={prop.id}
                      onClick={() => setActivePropertyIndex(idx)}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 text-left ${
                        isActive
                          ? "bg-white border-neutral-950 shadow-[0_4px_16px_rgba(0,0,0,0.1)] ring-2 ring-neutral-950/15 scale-[1.01]"
                          : "bg-white hover:bg-neutral-50 border-neutral-200 shadow-2xs hover:border-neutral-300"
                      }`}
                    >
                      {/* Property aerial thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-neutral-200">
                        <Image
                          src={prop.thumbnailPhoto}
                          alt={prop.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Summary details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[12px] font-bold text-neutral-950 truncate">
                            {prop.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">
                            {prop.categoryTag}
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                          {prop.sqft} · {prop.roofType} · {prop.ownerType}
                        </div>
                      </div>

                      {/* Price badge */}
                      <div className="text-right shrink-0">
                        <div className="text-[14px] font-extrabold text-neutral-950">
                          {prop.replacementShort}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next button (Desktop / Tablet only) */}
              <button
                onClick={() =>
                  setActivePropertyIndex((prev) => (prev + 1) % properties.length)
                }
                aria-label="Next commercial property"
                className="hidden sm:flex w-8 h-8 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 shadow-2xs items-center justify-center transition-all active:scale-95 shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination indicator dots */}
            <div className="flex items-center justify-center gap-2 mt-3.5">
              {properties.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePropertyIndex(idx)}
                  aria-label={`Select property ${idx + 1}`}
                  className={`transition-all rounded-full ${
                    idx === activePropertyIndex
                      ? "w-6 h-1.5 bg-neutral-950"
                      : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
