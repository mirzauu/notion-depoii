"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CloudHail,
  Building2,
  FileText,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Layers,
  Home,
  Globe,
  HardHat,
  Users,
  Lock,
  Activity,
  Calendar,
  Phone,
  Mail,
  Target,
  Check,
} from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { Reveal } from "./Reveal";

interface TimelineMilestone {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  evidence: { label: string; value: string; highlight?: boolean }[];
  takeaway: string;
}

interface PropertyDeal {
  id: string;
  targetPresetLabel: string;
  name: string;
  address: string;
  cityStateZip: string;
  categoryTag: string;
  statusTag: string;
  statusTone: string;
  sqft: string;
  structure: string;
  buildingUse: string;
  builtYear: string;
  age: string;
  roofType: string;
  warrantyStatus: string;
  hailImpact: string;
  hailDetails: string;
  workStatus: string;
  workDetail: string;
  replacementValue: string;
  replacementShort: string;
  fitScore: number;
  ownerType: string;
  headerPhoto: string;
  thumbnailPhoto: string;
  satelliteImage: string;
  conditionNote: string;
  reasons: string[];
  estimatorSummary: string;
  decisionMaker: {
    title: string;
    company: string;
    entityTrail: string;
    phonePreview: string;
    emailPreview: string;
  };
  timeline: TimelineMilestone[];
}

const properties: PropertyDeal[] = [
  {
    id: "central-expy",
    targetPresetLabel: "Industrial Warehouses · 45k+ sq ft",
    name: "8600 S Central Expy",
    address: "8600 S Central Expy",
    cityStateZip: "Dallas, TX 75241",
    categoryTag: "Logistics Hub",
    statusTag: "19-Yr Roof + Hail Track",
    statusTone: "bg-[#ffdec4] text-[#9a3412]",
    sqft: "48,200 sq ft",
    structure: "308,343 sq ft complex",
    buildingUse: "Industrial Distribution",
    builtYear: "1956",
    age: "19 yrs (2005 Re-Roof)",
    roofType: "Single-Ply TPO",
    warrantyStatus: "20-Yr Window Reached",
    hailImpact: '1.75" Hail Nearby',
    hailDetails: "NWS Severe Storm Track",
    workStatus: "None Recorded",
    workDetail: "No post-storm reroof",
    replacementValue: "$674,800",
    replacementShort: "$674k",
    fitScore: 96,
    ownerType: "Regional Logistics Group",
    headerPhoto: "/assets/aerials/thumb-central-expy.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-1.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-hd.jpg",
    conditionNote: "Perimeter seam wear & drainage ponding near east scupper",
    reasons: [
      "Matches your target: 48,200 sq ft industrial distribution in South Dallas",
      "Roof installed ~2005, crossing the 20-year replacement horizon",
      '1.75" hail track verified nearby via National Weather Service reports',
      "No active roofing permit filed since storm, ahead of public bid lists",
    ],
    estimatorSummary:
      "Strong re-roof fit: matches 45k+ sq ft industrial scope, 20-year lifecycle window, recent hail track, and zero active replacement work underway.",
    decisionMaker: {
      title: "VP of Asset Management",
      company: "Inwood Logistics Partners",
      entityTrail: "Trinity Inwood Holdings LLC -> Inwood Partners Corp",
      phonePreview: "(214) •••-••12 · Included in Brief",
      emailPreview: "asset-mgmt@inwoodlogistics.com (Brief)",
    },
    timeline: [
      {
        year: "1956",
        badge: "County Building Roll",
        title: "Original Industrial Construction & Decking",
        subtitle: "Dallas County records log a 48,200 sq ft light industrial distribution warehouse with fluted steel decking.",
        evidence: [
          { label: "Footprint Area", value: "48,200 sq ft warehouse" },
          { label: "Deck Composition", value: "22-gauge fluted steel deck" },
          { label: "Original System", value: "Ballasted built-up roof" },
          { label: "County Record", value: "Dallas County Commercial Roll" },
        ],
        takeaway: "Deck and square footage baselines let estimators scope tear-off vs. recover before arriving on site.",
      },
      {
        year: "2005",
        badge: "Municipal Permit Record",
        title: "Single-Ply TPO Re-Roof Installed",
        subtitle: "Commercial tear-off permitted with City of Dallas for 45-mil white TPO over polyisocyanurate insulation.",
        evidence: [
          { label: "City Filing", value: "Dallas Commercial #05-88219" },
          { label: "Membrane Spec", value: "45-mil TPO assembly" },
          { label: "Insulation", value: '2.5" Polyiso thermal layer' },
          { label: "Lifecycle Window", value: "Year 19 of ~20-yr service life", highlight: true },
        ],
        takeaway: "Tracking last recorded re-roof year eliminates guesswork and filters out roofs replaced in the last 5 years.",
      },
      {
        year: "Current",
        badge: "Storm + Timing Window",
        title: "Hail Track Overlap With Zero Active Work",
        subtitle: "Recent NWS severe hail corridor crosses this aged roof with no subsequent roofing permit logged.",
        evidence: [
          { label: "Weather Report", value: '1.75" hail track (NWS)', highlight: true },
          { label: "Work History", value: "No later roofing permit found", highlight: true },
          { label: "Est. Scope", value: "$674,800 benchmark ($14/sq ft)" },
          { label: "Owner Entity", value: "Inwood Logistics Partners" },
        ],
        takeaway: "Walk in with verified weather exposure and roof history before competitors see a permit or tender.",
      },
    ],
  },
  {
    id: "inwood-rd",
    targetPresetLabel: "Storm-Exposed Plants · 80k+ sq ft",
    name: "14201 Inwood Rd",
    address: "14201 Inwood Rd",
    cityStateZip: "Dallas, TX 75244",
    categoryTag: "Manufacturing Plant",
    statusTag: '2.25" Hail Swath',
    statusTone: "bg-[#fee2e2] text-[#991b1b]",
    sqft: "84,000 sq ft",
    structure: "112,500 sq ft plant",
    buildingUse: "Manufacturing",
    builtYear: "1988",
    age: "22 yrs (2002 Cap Sheet)",
    roofType: "Modified Bitumen",
    warrantyStatus: "Past 20-Yr Mark",
    hailImpact: '2.25" Hail Track',
    hailDetails: "North Dallas Corridor",
    workStatus: "None Recorded",
    workDetail: "Open replacement window",
    replacementValue: "$1,180,000",
    replacementShort: "$1.18M",
    fitScore: 94,
    ownerType: "Industrial Holdings LP",
    headerPhoto: "/assets/aerials/carousel-prop-2.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-2.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-hd.jpg",
    conditionNote: "Aged SBS cap sheet inside 2.25-inch storm corridor",
    reasons: [
      "Matches your target: 84,000 sq ft heavy industrial in North Dallas",
      "Modified bitumen cap sheet installed ~2002 (22 years in service)",
      '2.25" hail warning polygon verified directly over the facility',
      "Zero subsequent commercial roofing filings logged post-storm",
    ],
    estimatorSummary:
      "High-value North Dallas manufacturing target: aged bitumen roof inside a 2.25-inch hail corridor with no replacement underway.",
    decisionMaker: {
      title: "Director of Facilities & CapEx",
      company: "Apex Precision Manufacturing",
      entityTrail: "Apex Industrial Holdings LP -> On-site Plant Ops",
      phonePreview: "(972) •••-••19 · Included in Brief",
      emailPreview: "facilities@apexprecision.com (Brief)",
    },
    timeline: [
      {
        year: "1988",
        badge: "County Building Roll",
        title: "Manufacturing Plant Footprint Recorded",
        subtitle: "Dallas County records log 84,000 sq ft tilt-wall manufacturing facility with open-web steel joists.",
        evidence: [
          { label: "Footprint Area", value: "84,000 sq ft plant" },
          { label: "Structural Framing", value: "Open-web steel joists" },
          { label: "Building Use", value: "Precision Manufacturing" },
          { label: "Corridor", value: "North Dallas / Inwood" },
        ],
        takeaway: "Large tilt-wall industrial footprints support seven-figure replacement and coating scopes.",
      },
      {
        year: "2002",
        badge: "Municipal Permit Record",
        title: "2-Ply SBS Modified Bitumen Installed",
        subtitle: "City filing records full tear-off and installation of granule-surfaced SBS modified bitumen system.",
        evidence: [
          { label: "City Filing", value: "Dallas Commercial #02-19402" },
          { label: "System Spec", value: "2-Ply SBS Modified Bitumen" },
          { label: "Roof Age", value: "22 years in service", highlight: true },
          { label: "Lifecycle Window", value: "Exceeded standard 20-yr window" },
        ],
        takeaway: "Bitumen cap sheets past 20 years lose granule protection and fracture easily under severe hail.",
      },
      {
        year: "Current",
        badge: "Storm + Timing Window",
        title: '2.25" Hail Corridor With No Replacement Filed',
        subtitle: "NWS severe thunderstorm warning covers the plant with zero subsequent roof permits filed.",
        evidence: [
          { label: "Weather Report", value: '2.25" hail warning polygon', highlight: true },
          { label: "Work History", value: "No post-storm reroof logged", highlight: true },
          { label: "Est. Scope", value: "$1,180,000 benchmark" },
          { label: "Owner Entity", value: "Apex Precision Manufacturing" },
        ],
        takeaway: "Prime commercial storm inspection target before claim filing windows narrow.",
      },
    ],
  },
  {
    id: "sovereign-row",
    targetPresetLabel: "Warranty-Safe Maintenance · 50k+ sq ft",
    name: "7505 Sovereign Row",
    address: "7505 Sovereign Row",
    cityStateZip: "Dallas, TX 75247",
    categoryTag: "Corporate Flex Park",
    statusTag: "Active Warranty · Service Fit",
    statusTone: "bg-[#e0f2fe] text-[#075985]",
    sqft: "52,400 sq ft",
    structure: "74,000 sq ft park",
    buildingUse: "Flex Office & Warehouse",
    builtYear: "2000",
    age: "6 yrs (2018 Re-Roof)",
    roofType: "60-mil TPO",
    warrantyStatus: "Active Until 2038",
    hailImpact: '0.75" Edge Hail',
    hailDetails: "Preventive Inspection Fit",
    workStatus: "Warranty Active",
    workDetail: "Service & maintenance target",
    replacementValue: "$84,000",
    replacementShort: "$84k/yr",
    fitScore: 89,
    ownerType: "Institutional Portfolio",
    headerPhoto: "/assets/aerials/dcad-2501.jpg",
    thumbnailPhoto: "/assets/aerials/dcad-2501.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-alt.jpg",
    conditionNote: "6-year roof under active warranty, ideal for recurring service",
    reasons: [
      "Prevents wasted replacement pitches: roof was replaced in 2018",
      "60-mil TPO likely under active 20-year manufacturer warranty",
      "Edge-of-storm proximity warrants a warranty-preservation inspection",
      "Institutional owner manages multiple DFW industrial assets",
    ],
    estimatorSummary:
      "Smart filter win: Depoii flags the 2018 re-roof so your crew pitches preventive maintenance and drain service instead of wasting time on a tear-off bid.",
    decisionMaker: {
      title: "Regional Director of Operations",
      company: "Lone Star Commercial Properties",
      entityTrail: "Sovereign Industrial Trust -> Lone Star Portfolio",
      phonePreview: "(214) •••-••19 · Included in Brief",
      emailPreview: "ops@lonestarproperties.com (Brief)",
    },
    timeline: [
      {
        year: "2000",
        badge: "County Building Roll",
        title: "Flex Warehouse Park Construction",
        subtitle: "Dallas County logs 52,400 sq ft flex office and logistics property in the Trinity corridor.",
        evidence: [
          { label: "Footprint Area", value: "52,400 sq ft flex" },
          { label: "Deck Framing", value: "Steel truss decking" },
          { label: "Submarket", value: "Trinity Industrial" },
          { label: "Portfolio Type", value: "Multi-building REIT" },
        ],
        takeaway: "Portfolio owners prefer one reliable roofing partner across multiple DFW assets.",
      },
      {
        year: "2018",
        badge: "Municipal Permit Record",
        title: "60-mil White TPO Re-Roof Logged",
        subtitle: "Full replacement filed in 2018, leaving roughly 14 years of remaining lifecycle.",
        evidence: [
          { label: "City Filing", value: "Dallas Commercial #18-44910" },
          { label: "Membrane Spec", value: "60-mil White TPO" },
          { label: "Remaining Life", value: "~14 years active warranty", highlight: true },
          { label: "Service Need", value: "Drain & storm certification" },
        ],
        takeaway: "Knowing a roof is only 6 years old stops estimators from pitching the wrong scope.",
      },
      {
        year: "Current",
        badge: "Service Opportunity",
        title: "Post-Storm Warranty Inspection & Service Plan",
        subtitle: "Edge hail report creates an easy opening for preventive maintenance and warranty documentation.",
        evidence: [
          { label: "Est. Service", value: "$84,000 portfolio maintenance", highlight: true },
          { label: "Roof Status", value: "Active warranty (No tear-off)" },
          { label: "Portfolio Reach", value: "12 DFW commercial assets" },
          { label: "Owner Entity", value: "Lone Star Commercial Properties" },
        ],
        takeaway: "Win the annual maintenance relationship now so you own the future re-roof.",
      },
    ],
  },
  {
    id: "airport-fwy",
    targetPresetLabel: "Aging Flat & Ballasted · 30k+ sq ft",
    name: "2200 E Airport Fwy",
    address: "2200 E Airport Fwy",
    cityStateZip: "Irving, TX 75062",
    categoryTag: "Commercial Flex Park",
    statusTag: "17-Yr Ballasted EPDM",
    statusTone: "bg-[#dcfce7] text-[#166534]",
    sqft: "32,500 sq ft",
    structure: "45,000 sq ft complex",
    buildingUse: "Commercial Flex Assembly",
    builtYear: "1994",
    age: "17 yrs (2007 Ballasted)",
    roofType: "Ballasted EPDM",
    warrantyStatus: "Coating / Re-Roof Fit",
    hailImpact: '1.50" Hail Nearby',
    hailDetails: "Irving / DFW Corridor",
    workStatus: "None Recorded",
    workDetail: "No active permit filed",
    replacementValue: "$455,000",
    replacementShort: "$455k",
    fitScore: 84,
    ownerType: "Local Asset Manager",
    headerPhoto: "/assets/aerials/carousel-prop-3.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-3.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-alt.jpg",
    conditionNote: "17-year ballasted EPDM in Irving storm corridor",
    reasons: [
      "Matches your target: 32,500 sq ft commercial flex in Irving corridor",
      "Ballasted EPDM installed ~2007 nearing seam adhesive fatigue",
      '1.50" hail reported along the DFW Airport corridor',
      "No active replacement permit logged, open for inspection",
    ],
    estimatorSummary:
      "Strong Irving corridor match for single-ply or restoration crews: 17-year ballasted EPDM with recent hail proximity and zero active work.",
    decisionMaker: {
      title: "Senior Property Manager",
      company: "Airport Freeway Holdings",
      entityTrail: "Airport Freeway Commercial LLC -> Local Management",
      phonePreview: "(972) •••-••10 · Included in Brief",
      emailPreview: "management@airportfreeway.com (Brief)",
    },
    timeline: [
      {
        year: "1994",
        badge: "County Building Roll",
        title: "Irving Flex Center Constructed",
        subtitle: "County appraisal roll logs 32,500 sq ft steel-frame flex building along Highway 183.",
        evidence: [
          { label: "Footprint Area", value: "32,500 sq ft flex" },
          { label: "Framing", value: "Pre-engineered rigid steel" },
          { label: "Submarket", value: "Irving / DFW Airport" },
          { label: "Building Age", value: "Built 1994" },
        ],
        takeaway: "Clear structural specs give estimators fast square-foot scope estimates.",
      },
      {
        year: "2007",
        badge: "Municipal Permit Record",
        title: "Ballasted EPDM Membrane Installed",
        subtitle: "City of Irving commercial filing records loose-laid EPDM membrane with river rock ballast.",
        evidence: [
          { label: "City Filing", value: "Irving Commercial #07-33120" },
          { label: "Membrane Spec", value: "45-mil ballasted EPDM" },
          { label: "Membrane Age", value: "17 years in service", highlight: true },
          { label: "Risk Profile", value: "Seam fatigue & ballast scour" },
        ],
        takeaway: "17-year EPDM roofs sit right in the replacement vs. restoration decision window.",
      },
      {
        year: "Current",
        badge: "Storm + Timing Window",
        title: "Open Irving Corridor Opportunity",
        subtitle: "No replacement filings logged following recent DFW storm activity.",
        evidence: [
          { label: "Weather Report", value: '1.50" hail proximity (NWS)', highlight: true },
          { label: "Work History", value: "No active reroof permit", highlight: true },
          { label: "Est. Scope", value: "$455,000 benchmark" },
          { label: "Owner Entity", value: "Airport Freeway Holdings" },
        ],
        takeaway: "Ideal target for Irving commercial crews looking for mid-sized flat scopes.",
      },
    ],
  },
];

export function WorkspaceDemo() {
  const [activePropertyIndex, setActivePropertyIndex] = useState<number>(0);
  const [aerialView, setAerialView] = useState<"site" | "roof">("roof");
  const [activeSubTab, setActiveSubTab] = useState<string>("Overview");
  const [timelineStep, setTimelineStep] = useState<number>(
    properties[0].timeline.length - 1
  );

  const activeProperty = properties[activePropertyIndex];

  const selectProperty = (nextIndex: number) => {
    setActivePropertyIndex(nextIndex);
    setTimelineStep(properties[nextIndex].timeline.length - 1);
  };

  const handleOpenBriefModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-trial"));
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white" id="platform">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[760px] text-left mb-10 sm:mb-12">
            <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-bold text-[#111110] tracking-[-0.03em] leading-[1.12]">
              Built for how your estimators bid.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
              Pick a contractor target profile below to see how Depoii filters 70,000+ DFW commercial properties down to buildings that match your crew, with plain-English proof on every pick.
            </p>
          </div>
        </Reveal>

        {/* Interactive Contractor Target Presets */}
        <Reveal delayMs={70}>
          <div className="flex flex-wrap items-center gap-2.5 mb-7">
            {properties.map((prop, idx) => {
              const isSelected = idx === activePropertyIndex;
              return (
                <button
                  key={prop.id}
                  type="button"
                  onClick={() => selectProperty(idx)}
                  className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-[#111110] text-white"
                      : "bg-[#f5f5f4] text-[#3a3835] hover:bg-[#e7e5e4]"
                  }`}
                >
                  {prop.targetPresetLabel}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Interactive Workspace Fragment (marked data-ui for realistic software chrome) */}
        <Reveal delayMs={130}>
          <div
            data-ui
            className="rounded-2xl border border-neutral-200 bg-white text-[#111110] shadow-[0_18px_50px_rgba(0,0,0,0.06)] overflow-hidden text-left"
          >
            {/* Top Window Bar */}
            <div className="h-10 px-3.5 bg-[#f8f9fa] border-b border-neutral-200 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                </div>

                <div className="hidden sm:flex items-center gap-0.5 text-neutral-500 pl-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      selectProperty(
                        (activePropertyIndex - 1 + properties.length) % properties.length
                      )
                    }
                    className="p-1 hover:text-neutral-950 hover:bg-neutral-200/60 rounded cursor-pointer"
                    aria-label="Previous building"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      selectProperty((activePropertyIndex + 1) % properties.length)
                    }
                    className="p-1 hover:text-neutral-950 hover:bg-neutral-200/60 rounded cursor-pointer"
                    aria-label="Next building"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-t-md border-t border-x border-neutral-200 text-[12px] font-medium text-neutral-900 truncate max-w-[220px]">
                  <Target className="w-3 h-3 text-[#ea580c] shrink-0" />
                  <span className="truncate">{activeProperty.name}</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${activeProperty.statusTone}`}>
                  {activeProperty.statusTag}
                </span>
              </div>
            </div>

            {/* Workspace Body */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Sidebar (Desktop Only) */}
              <aside className="hidden lg:flex lg:w-[196px] bg-[#fafaf9] border-r border-neutral-200 p-3.5 flex-col justify-between shrink-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <DepoiiMark className="w-5 h-5 text-[#111110]" />
                    <span className="font-bold text-[15px] tracking-tight text-[#111110]">
                      Depoii
                    </span>
                  </div>

                  <nav className="space-y-1 text-[12.5px]" aria-label="Workspace views">
                    {[
                      { label: "Property Brief", tab: "Overview", icon: Home },
                      { label: "Why Picked", tab: "Why Picked", icon: Sparkles },
                      { label: "20-Yr Roof History", tab: "20-Yr Roof History", icon: Calendar },
                      { label: "Ownership", tab: "Ownership", icon: Users },
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = activeSubTab === item.tab;
                      return (
                        <button
                          key={item.tab}
                          type="button"
                          onClick={() => setActiveSubTab(item.tab)}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                            active
                              ? "bg-neutral-200/80 text-neutral-950 font-semibold"
                              : "text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="pt-3 border-t border-neutral-200">
                    <div className="px-2 text-[11px] font-semibold text-neutral-500 mb-1.5">
                      DFW Corridors
                    </div>
                    <div className="space-y-1 text-[12px] text-neutral-700">
                      <div className="flex items-center gap-2 px-2 py-1">
                        <Globe className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Dallas County</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1">
                        <HardHat className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Tarrant County</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center gap-2 px-1">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-[10px] text-neutral-800">
                    DF
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[12px] font-semibold text-neutral-900">Estimating Team</div>
                    <div className="text-[10.5px] text-neutral-600">DFW Corridor</div>
                  </div>
                </div>
              </aside>

              {/* Main Workspace Canvas */}
              <div className="flex-1 flex flex-col p-4 sm:p-5 bg-white">
                {/* Building Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                      <Image
                        src={activeProperty.headerPhoto}
                        alt={activeProperty.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div>
                      <p className="text-[18px] sm:text-[22px] font-bold text-[#111110] tracking-tight">
                        {activeProperty.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[12px] text-neutral-600">
                        <span className="px-2 py-0.5 rounded-full bg-[#f5f4f1] text-neutral-900 font-semibold text-[11px]">
                          {activeProperty.categoryTag}
                        </span>
                        <span>
                          {activeProperty.cityStateZip} · {activeProperty.sqft} · {activeProperty.roofType}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenBriefModal}
                    className="px-4 py-2 rounded-lg bg-[#111110] hover:bg-[#2b2a28] text-[12px] font-semibold text-white transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-neutral-300" />
                    <span>Include in My Brief</span>
                  </button>
                </div>

                {/* Working Sub-Tabs Row */}
                <div className="flex flex-wrap items-center gap-1.5 py-2.5 border-b border-neutral-100 text-[12px]">
                  {[
                    { name: "Overview", icon: FileText },
                    { name: "Why Picked", icon: Sparkles },
                    { name: "20-Yr Roof History", icon: Calendar },
                    { name: "Ownership", icon: Users },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSubTab === tab.name;
                    return (
                      <button
                        key={tab.name}
                        type="button"
                        onClick={() => setActiveSubTab(tab.name)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[#111110] text-white font-semibold"
                            : "bg-[#f5f4f1] text-neutral-700 hover:bg-[#ebe9e4]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 5 Estimator Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 py-2.5 border-b border-neutral-100 text-left">
                  <div className="p-2.5 rounded-xl bg-[#fafaf9] border border-neutral-200">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                      <Check className="w-3.5 h-3.5 text-[#111110]" />
                      <span>Target Fit</span>
                    </div>
                    <div className="mt-1 text-[16px] font-bold text-[#111110] tabular-nums">
                      {activeProperty.fitScore}/100
                    </div>
                    <div className="text-[11px] text-neutral-700 font-medium mt-0.5">Matches crew</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#fafaf9] border border-neutral-200">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                      <Layers className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Roof Age</span>
                    </div>
                    <div className="mt-1 text-[15px] font-bold text-[#111110] truncate">
                      {activeProperty.age}
                    </div>
                    <div className="text-[11px] text-neutral-600 truncate mt-0.5">
                      {activeProperty.roofType}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#fafaf9] border border-neutral-200">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                      <CloudHail className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Weather Exposure</span>
                    </div>
                    <div className="mt-1 text-[15px] font-bold text-[#111110] truncate">
                      {activeProperty.hailImpact}
                    </div>
                    <div className="text-[11px] text-neutral-600 truncate mt-0.5">
                      {activeProperty.hailDetails}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#fafaf9] border border-neutral-200">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                      <Activity className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Roof Work</span>
                    </div>
                    <div className="mt-1 text-[15px] font-bold text-[#111110] truncate">
                      {activeProperty.workStatus}
                    </div>
                    <div className="text-[11px] text-neutral-600 truncate mt-0.5">
                      {activeProperty.workDetail}
                    </div>
                  </div>

                  <div className="hidden sm:block p-2.5 rounded-xl bg-[#f5f5f4] border border-neutral-200">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-700">
                      <TrendingUp className="w-3.5 h-3.5 text-[#111110]" />
                      <span>Est. Scope</span>
                    </div>
                    <div className="mt-1 text-[17px] font-bold text-[#111110] tabular-nums">
                      {activeProperty.replacementValue}
                    </div>
                    <div className="text-[11px] text-neutral-600 mt-0.5">Benchmark</div>
                  </div>
                </div>

                {/* Tab Views */}
                {activeSubTab === "20-Yr Roof History" ? (
                  <div className="flex-1 flex flex-col gap-3 mt-3 p-4 rounded-xl bg-[#fafaf9] border border-neutral-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-neutral-200">
                      <div>
                        <p className="font-bold text-[14px] text-[#111110]">
                          Building &amp; Roof Lifecycle Chronology
                        </p>
                        <p className="text-[12px] text-neutral-600 mt-0.5">
                          County building records, municipal permit history, and storm track verification
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {activeProperty.timeline.map((m, mIdx) => (
                          <button
                            key={mIdx}
                            type="button"
                            onClick={() => setTimelineStep(mIdx)}
                            className={`px-2.5 py-1 rounded-md text-[11.5px] font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                              timelineStep === mIdx
                                ? "bg-[#111110] text-white border-[#111110]"
                                : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                            }`}
                          >
                            {m.year}
                          </button>
                        ))}
                      </div>
                    </div>

                    {activeProperty.timeline[timelineStep] && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                        <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#f5f4f1] text-neutral-800">
                                {activeProperty.timeline[timelineStep].badge}
                              </span>
                              <span className="text-[12px] font-bold text-[#111110]">
                                {activeProperty.timeline[timelineStep].year}
                              </span>
                            </div>

                            <p className="text-[15px] font-bold text-[#111110]">
                              {activeProperty.timeline[timelineStep].title}
                            </p>

                            <p className="text-[12.5px] text-neutral-700 mt-1.5 leading-relaxed">
                              {activeProperty.timeline[timelineStep].subtitle}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-neutral-100">
                              {activeProperty.timeline[timelineStep].evidence.map((ev, evIdx) => (
                                <div
                                  key={evIdx}
                                  className={`p-2 rounded-lg border text-[11.5px] ${
                                    ev.highlight
                                      ? "bg-[#fff4ed] border-[#fed7aa] text-[#9a3412] font-semibold"
                                      : "bg-[#fafaf9] border-neutral-200 text-neutral-800"
                                  }`}
                                >
                                  <div className="text-[10.5px] text-neutral-600">
                                    {ev.label}
                                  </div>
                                  <div className="font-medium text-[#111110] mt-0.5 truncate">
                                    {ev.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-100 text-[12px]">
                            <button
                              type="button"
                              onClick={() => setTimelineStep((prev) => Math.max(0, prev - 1))}
                              disabled={timelineStep === 0}
                              className="font-semibold text-neutral-700 hover:text-neutral-950 disabled:opacity-30 cursor-pointer"
                            >
                              ← Earlier record
                            </button>
                            <span className="text-neutral-500">
                              {timelineStep + 1} of {activeProperty.timeline.length}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setTimelineStep((prev) =>
                                  Math.min(activeProperty.timeline.length - 1, prev + 1)
                                )
                              }
                              disabled={timelineStep === activeProperty.timeline.length - 1}
                              className="font-semibold text-neutral-700 hover:text-neutral-950 disabled:opacity-30 cursor-pointer"
                            >
                              Next record →
                            </button>
                          </div>
                        </div>

                        <div className="lg:col-span-5 bg-[#111110] text-white rounded-xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="text-[11px] font-semibold text-[#FF9C6D] mb-2">
                              Estimator Takeaway
                            </div>
                            <p className="text-[14px] font-bold text-white leading-snug">
                              Why this helps win the job
                            </p>
                            <p className="text-[12.5px] text-neutral-300 mt-2 leading-relaxed">
                              {activeProperty.timeline[timelineStep].takeaway}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={handleOpenBriefModal}
                            className="mt-4 w-full py-2.5 rounded-lg bg-white hover:bg-neutral-100 text-[#111110] font-semibold text-[12px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Get Territory Brief</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : activeSubTab === "Ownership" ? (
                  <div className="flex-1 flex flex-col gap-3.5 mt-3 p-4 rounded-xl bg-white border border-neutral-200">
                    <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100">
                      <div>
                        <p className="font-bold text-[14px] text-[#111110]">
                          Recorded Owner Entity &amp; Contact Path
                        </p>
                        <p className="text-[12px] text-neutral-600">
                          County tax roll ownership paired with corporate operating entity records
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f5f4f1] text-neutral-800">
                        Verified Public Trail
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-xl border border-neutral-200 bg-[#fafaf9] flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-[14px] text-[#111110]">
                            {activeProperty.decisionMaker.company}
                          </div>
                          <div className="text-[12px] text-neutral-600 mt-0.5">
                            Target Role: {activeProperty.decisionMaker.title}
                          </div>

                          <div className="space-y-2 mt-3 pt-3 border-t border-neutral-200 text-[12px]">
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-600 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5" /> Office / Direct:
                              </span>
                              <span className="font-semibold text-[#111110]">
                                {activeProperty.decisionMaker.phonePreview}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-600 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5" /> Domain Path:
                              </span>
                              <span className="font-semibold text-[#111110]">
                                {activeProperty.decisionMaker.emailPreview}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleOpenBriefModal}
                          className="mt-4 w-full py-2 rounded-lg bg-[#111110] hover:bg-[#2b2a28] text-white text-center font-semibold text-[12px] transition-colors cursor-pointer"
                        >
                          Request Full Owner Brief →
                        </button>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200 bg-[#fafaf9] space-y-2 text-[12px]">
                        <div className="font-semibold text-neutral-700 mb-1">
                          Ownership Provenance
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                          <span className="text-neutral-500 text-[11px] block">Tax Roll Classification</span>
                          <span className="font-semibold text-[#111110]">{activeProperty.ownerType}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                          <span className="text-neutral-500 text-[11px] block">Operating Entity Trail</span>
                          <span className="font-semibold text-[#111110]">{activeProperty.decisionMaker.entityTrail}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeSubTab === "Why Picked" ? (
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5 mt-3">
                    <div className="lg:col-span-7 p-4 rounded-xl bg-[#fafaf9] border border-neutral-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-[#ea580c]" />
                          <p className="font-bold text-[14px] text-[#111110]">
                            Why Depoii picked this building for your crew
                          </p>
                        </div>
                        <div className="space-y-2.5">
                          {activeProperty.reasons.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-[13px] text-neutral-800">
                              <CheckCircle2 className="w-4 h-4 text-[#111110] shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-white border border-neutral-200 text-[12.5px] text-neutral-700">
                        <strong className="text-[#111110]">Estimator Summary:</strong> {activeProperty.estimatorSummary}
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-4 rounded-xl bg-white border border-neutral-200 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-[13.5px] text-[#111110] mb-3">
                          Verified Source Receipts
                        </p>
                        <div className="space-y-2 text-[12px]">
                          <div className="p-2.5 rounded-lg bg-[#fafaf9] flex justify-between">
                            <span className="text-neutral-600">County Building Roll</span>
                            <span className="font-semibold text-[#111110]">{activeProperty.sqft} · Built {activeProperty.builtYear}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#fafaf9] flex justify-between">
                            <span className="text-neutral-600">Weather Station</span>
                            <span className="font-semibold text-[#111110]">{activeProperty.hailImpact}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#fafaf9] flex justify-between">
                            <span className="text-neutral-600">Municipal Permits</span>
                            <span className="font-semibold text-[#111110]">{activeProperty.workDetail}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenBriefModal}
                        className="mt-4 w-full py-2.5 rounded-lg bg-[#111110] hover:bg-[#2b2a28] text-white font-semibold text-[12px] transition-colors cursor-pointer"
                      >
                        Add Corridor to Brief →
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Overview Tab */
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3.5 flex-1">
                    {/* Card 1: Aerial Roof View */}
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col bg-white rounded-xl border border-neutral-200 p-3">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-neutral-600" />
                          <span className="text-[12px] font-bold text-[#111110]">
                            Aerial roof inspection
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px]">
                          <button
                            type="button"
                            onClick={() => setAerialView("site")}
                            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              aerialView === "site"
                                ? "bg-[#111110] text-white font-semibold"
                                : "text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            Site View
                          </button>
                          <button
                            type="button"
                            onClick={() => setAerialView("roof")}
                            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              aerialView === "roof"
                                ? "bg-[#111110] text-white font-semibold"
                                : "text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            Roof Compare
                          </button>
                        </div>
                      </div>

                      <div className="relative flex-1 min-h-[190px] rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                        <Image
                          src={aerialView === "roof" ? activeProperty.satelliteImage : activeProperty.headerPhoto}
                          alt={`${activeProperty.name} aerial roof view`}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium pointer-events-none">
                          {aerialView === "roof" ? "Roof Timeline Comparison" : `${activeProperty.sqft} Footprint`}
                        </div>
                      </div>

                      <div className="mt-2.5 p-2 rounded-lg bg-[#f5f4f1] flex items-center justify-center gap-1.5 text-center">
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                        <span className="text-[11.5px] font-semibold text-[#111110] truncate">
                          {activeProperty.conditionNote}
                        </span>
                      </div>
                    </div>

                    {/* Card 2: Plain-English Estimator Reasoning */}
                    <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-between bg-white rounded-xl border border-neutral-200 p-3.5">
                      <div>
                        <div className="flex items-center gap-1.5 pb-2 mb-2.5 border-b border-neutral-100">
                          <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
                          <span className="text-[12.5px] font-bold text-[#111110]">
                            Why Depoii Picked This
                          </span>
                        </div>

                        <div className="space-y-2 text-left">
                          {activeProperty.reasons.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11.5px] text-neutral-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#111110] shrink-0 mt-0.5" />
                              <span className="leading-snug">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 p-2.5 rounded-xl bg-[#f5f4f1] text-left">
                        <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#111110]">
                          <Target className="w-3.5 h-3.5 text-[#ea580c]" />
                          <span>Estimator Brief</span>
                        </div>
                        <p className="mt-1 text-[11.5px] text-neutral-700 leading-relaxed">
                          {activeProperty.estimatorSummary}
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Building Details (desktop & tablet; full specs in tabs on mobile) */}
                    <div className="hidden sm:flex md:col-span-12 lg:col-span-3 flex-col bg-white rounded-xl border border-neutral-200 p-3.5 text-left">
                      <div className="flex items-center gap-1.5 pb-2 mb-2.5 border-b border-neutral-100">
                        <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                        <span className="text-[12.5px] font-bold text-[#111110]">Building Specs</span>
                      </div>

                      <div className="space-y-2.5 text-[11.5px] flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-neutral-600">Complex Size</span>
                          <span className="font-semibold text-[#111110] text-right">
                            {activeProperty.structure}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-neutral-600">Use Type</span>
                          <span className="font-semibold text-[#111110] text-right">
                            {activeProperty.buildingUse}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-neutral-600">Owner Type</span>
                          <span className="font-semibold text-[#111110] text-right">
                            {activeProperty.ownerType}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-neutral-600">Warranty</span>
                          <span className="font-semibold text-[#111110] text-right">
                            {activeProperty.warrantyStatus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-neutral-600">Roof Work</span>
                          <span className="font-semibold text-[#111110] text-right">
                            {activeProperty.workStatus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                          <span className="text-neutral-600">Est. Scope</span>
                          <span className="font-bold text-[#111110] tabular-nums">
                            {activeProperty.replacementValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Compact Bottom 4-Property Selector Strip inside Workspace (Desktop/Tablet) */}
            <div className="hidden sm:grid bg-[#f8f9fa] border-t border-neutral-200 p-3 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {properties.map((prop, idx) => {
                const isActive = idx === activePropertyIndex;
                return (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => selectProperty(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer flex items-center justify-between gap-2.5 ${
                      isActive
                        ? "bg-white border-[#111110]"
                        : "bg-white/70 border-neutral-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                        <Image
                          src={prop.thumbnailPhoto}
                          alt={prop.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[12px] font-bold text-[#111110] truncate">
                          {prop.name}
                        </div>
                        <div className="text-[11px] text-neutral-600 truncate">
                          {prop.sqft} · {prop.roofType}
                        </div>
                      </div>
                    </div>
                    <span className="text-[12.5px] font-bold text-[#111110] shrink-0 tabular-nums">
                      {prop.replacementShort}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
