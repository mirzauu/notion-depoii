"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CloudHail,
  Building2,
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
  Inbox,
  Home,
  Globe,
  HardHat,
  Radio,
  Folder,
  Users,
  Settings,
  Lock,
  MessageSquare,
  Star,
  MoreHorizontal,
  Filter,
  Check,
  Target,
  Plus,
  X,
  Activity,
  Zap,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";

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
  name: string;
  address: string;
  cityStateZip: string;
  categoryTag: string;
  archetypeBadge: string;
  archetypeColor: string;
  sqft: string;
  structure: string;
  buildingUse: string;
  builtYear: string;
  age: string;
  roofType: string;
  warrantyStatus: string;
  warrantyColor: string;
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
  headerPhoto: string;
  thumbnailPhoto: string;
  satelliteImage: string;
  degradationRate: string;
  thesis: string[];
  dealThesisSummary: string;
  decisionMaker: {
    name: string;
    title: string;
    company: string;
    entityResolved: string;
    phoneMasked: string;
    emailMasked: string;
  };
  timeline: TimelineMilestone[];
}

const properties: PropertyDeal[] = [
  {
    id: "central-expy",
    name: "8600 S Central Expy",
    address: "8600 S Central Expy",
    cityStateZip: "Dallas, TX 75241",
    categoryTag: "Logistics Hub",
    archetypeBadge: "20-Year-Old Roof (Warranty Expired)",
    archetypeColor: "bg-amber-50 text-amber-900 border-amber-200",
    sqft: "48,200 sq ft",
    structure: "308,343 sq ft",
    buildingUse: "Industrial Distribution",
    builtYear: "1956 (~70 yrs)",
    age: "19 years (2005 Re-Roof)",
    roofType: "TPO Membrane",
    warrantyStatus: "20-Yr Warranty Expired (2025)",
    warrantyColor: "bg-red-50 text-red-700 border-red-200",
    hailImpact: '1.75" Hail',
    hailDetails: "3 days ago (NWS)",
    stormDate: "May 28, 2024 · Dallas Metro",
    permitStatus: "0 Filings",
    permitDetail: "(Post-storm)",
    replacementValue: "$674,800",
    replacementShort: "$674k",
    replacementLabel: "Est. commercial replacement",
    verificationScore: 96,
    ownerType: "Out-of-state REIT",
    headerPhoto: "/assets/aerials/thumb-central-expy.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-1.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-hd.jpg",
    degradationRate: "+34% over 3 years",
    thesis: [
      "19-yr old Carlisle TPO membrane (20-yr manufacturer warranty matured)",
      '1.75" severe hail corridor confirmed 3 days ago by KFWS radar station',
      "0 post-storm permits filed with City of Dallas (Unclaimed deal)",
      "Holding LLC pierced to active VP of Asset Management with direct mobile",
    ],
    dealThesisSummary:
      "High-probability replacement: aged roof + verified hail + no permit activity + reachable corporate decision maker.",
    decisionMaker: {
      name: "Arthur Pendelton",
      title: "VP of Asset Management",
      company: "Inwood Logistics Partners",
      entityResolved: "Trinity Inwood Holdings LLC ➔ Inwood Partners Corp",
      phoneMasked: "+1 (214) 555-0812 (Direct Mobile)",
      emailMasked: "a.pendelton@inwoodlogistics.com (Verified)",
    },
    timeline: [
      {
        year: "1956",
        badge: "County Deed Filing",
        title: "Original Commercial Construction & Footprint",
        subtitle: "Dallas County deed archives record 48,200 sq ft light industrial distribution facility with fluted steel decking.",
        evidence: [
          { label: "Footprint Area", value: "48,200 sq ft warehouse" },
          { label: "Deck Composition", value: "22-gauge fluted steel deck" },
          { label: "Original Roof", value: "Ballasted coal tar pitch" },
          { label: "Appraisal Parcel", value: "DCAD #000492-001" },
        ],
        takeaway: "Blueprint records provide exact deck structure and structural load calculations prior to contractor site walk.",
      },
      {
        year: "2005",
        badge: "City Permit #05-88219",
        title: "45-mil Single-Ply TPO Re-Roof Filed & Installed",
        subtitle: "Full commercial tear-off permitted through City of Dallas. Carlisle Sure-Weld 45-mil TPO with 20-year manufacturer warranty.",
        evidence: [
          { label: "Permit Number", value: "City of Dallas Commercial #05-88219" },
          { label: "Membrane Spec", value: "Carlisle 45-mil mechanically attached TPO" },
          { label: "Insulation Spec", value: "2.5\" Polyiso (R-14.4 thermal value)" },
          { label: "Warranty Horizon", value: "20-Year Manufacturer (Matured 2025)", highlight: true },
        ],
        takeaway: "Depoii tracks remaining warranty timelines for every commercial building in DFW. This roof crossed its replacement threshold.",
      },
      {
        year: "2021",
        badge: "Computer Vision Audit",
        title: "Satellite Baseline Detects Seam Wear & Parapet Ponding",
        subtitle: "Multi-year aerial synthesis flags standing water along northwest drainage scuppers and +34% accelerated seam chalking.",
        evidence: [
          { label: "Resolution", value: "15cm high-res aerial ortho-imagery" },
          { label: "Surface Wear", value: "+34% accelerated thermal fatigue", highlight: true },
          { label: "Drainage Hazard", value: "Standing ponding near east scupper" },
          { label: "Condition Stamp", value: "Digital pre-storm baseline locked" },
        ],
        takeaway: "Pre-storm visual baselines prove to insurance carriers that damages are storm-caused rather than normal wear.",
      },
      {
        year: "May 2024",
        badge: "NOAA NEXRAD KFWS",
        title: "1.75\" Dual-Pol Hail Swath Impact",
        subtitle: "Fort Worth radar overlays track 1.75\"–2.00\" severe hail and 62 mph convective winds directly across the 19-year membrane.",
        evidence: [
          { label: "Radar Swath", value: "KFWS Dual-Pol Level-II corridor" },
          { label: "Hail Size", value: "1.75\"–2.00\" Golf-ball class hail", highlight: true },
          { label: "Wind Velocity", value: "62 mph sustained convective gusts" },
          { label: "Fracture Risk", value: "Exceeds elasticity threshold for 19-yr TPO" },
        ],
        takeaway: "Brittle aged TPO cannot withstand 1.75\" hail without micro-punctures. Depoii alerts you immediately upon storm passage.",
      },
      {
        year: "Today",
        badge: "Unclaimed Opportunity",
        title: "0 Filings Logged · Resolved Decision Maker",
        subtitle: "Zero municipal reroof permits pulled in months post-storm. Holding entity pierced directly to the VP of Asset Management.",
        evidence: [
          { label: "Permit Status", value: "0 Filings logged (First-mover advantage)", highlight: true },
          { label: "Scope Value", value: "$674,800 Replacement (482 squares)", highlight: true },
          { label: "Entity Resolved", value: "Trinity Inwood Holdings LLC" },
          { label: "Direct Contact", value: "Arthur Pendelton · VP Asset Management" },
        ],
        takeaway: "Walk in with the complete 20-year building dossier, storm report, and direct contact before competitors notice the building.",
      },
    ],
  },
  {
    id: "inwood-rd",
    name: "14201 Inwood Rd",
    address: "14201 Inwood Rd",
    cityStateZip: "Dallas, TX 75244",
    categoryTag: "Manufacturing Plant",
    archetypeBadge: "Hail Reported Roof (Severe Storm Swath)",
    archetypeColor: "bg-red-50 text-red-900 border-red-200",
    sqft: "84,000 sq ft",
    structure: "112,500 sq ft",
    buildingUse: "Manufacturing",
    builtYear: "1988 (~36 yrs)",
    age: "22 years (2002 Cap Sheet)",
    roofType: "Modified Bitumen",
    warrantyStatus: "Expired (SBS Mineral Cap)",
    warrantyColor: "bg-red-50 text-red-700 border-red-200",
    hailImpact: '2.25" Severe Hail',
    hailDetails: "3 days ago (NWS)",
    stormDate: "May 28, 2024 · North Dallas",
    permitStatus: "0 Filings",
    permitDetail: "(Post-storm)",
    replacementValue: "$1,180,000",
    replacementShort: "$1.18M",
    replacementLabel: "Est. commercial replacement",
    verificationScore: 94,
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
    decisionMaker: {
      name: "Becca Whitmore",
      title: "Director of Facilities & CapEx",
      company: "Apex Precision Manufacturing",
      entityResolved: "Apex Industrial Holdings LP ➔ Delaware File #499120",
      phoneMasked: "+1 (972) 555-0419 (Direct Cell)",
      emailMasked: "b.whitmore@apexprecision.com (Verified)",
    },
    timeline: [
      {
        year: "1988",
        badge: "County Deed Filing",
        title: "Industrial Manufacturing Facility Construction",
        subtitle: "Dallas County logs 84,000 sq ft heavy manufacturing complex with reinforced concrete tilt-wall and structural steel joists.",
        evidence: [
          { label: "Footprint Area", value: "84,000 sq ft facility" },
          { label: "Structural Framing", value: "Heavy open-web steel joists" },
          { label: "Building Use", value: "Class B Precision Manufacturing" },
          { label: "Appraisal Parcel", value: "DCAD #000841-002" },
        ],
        takeaway: "Large industrial footprints command seven-figure re-roofing scopes with substantial margin.",
      },
      {
        year: "2002",
        badge: "City Permit #02-19402",
        title: "Multi-Ply SBS Modified Bitumen Roof Installed",
        subtitle: "Permitted complete tear-off and application of 2-ply SBS modified bitumen system with white ceramic granule cap sheet.",
        evidence: [
          { label: "Permit Number", value: "City of Dallas #02-19402" },
          { label: "System Spec", value: "2-Ply SBS Torch/Cold-applied Mod-Bit" },
          { label: "Membrane Age", value: "22 Years in service (Severely aged)", highlight: true },
          { label: "Warranty Horizon", value: "15-Year Manufacturer (Expired 2017)" },
        ],
        takeaway: "Granule-surfaced bitumen past 20 years sheds granules and becomes brittle, leaving substrate defenseless against hail.",
      },
      {
        year: "May 2024",
        badge: "NOAA NEXRAD KFWS",
        title: "2.25\" Severe Hail Corridor Stamped on Complex",
        subtitle: "Severe thunderstorm cell generates 2.25\" diameter hail and 68 mph gusts directly over the Inwood Road industrial corridor.",
        evidence: [
          { label: "Hail Swath", value: "2.25\" Severe Hail (Egg/Tennis ball)", highlight: true },
          { label: "Doppler Station", value: "KFWS Dual-Polarization radar" },
          { label: "Impact Class", value: "Catastrophic fracture of Mod-Bit cap" },
          { label: "Water Intrusion", value: "Active tenant moisture reports" },
        ],
        takeaway: "A 2.25\" hail strike on 22-year mod-bit guarantees fractures across fiberglass scrims, leading to immediate claims validity.",
      },
      {
        year: "Today",
        badge: "Unclaimed Opportunity",
        title: "0 Filings Logged · $1.18M Restoration Window",
        subtitle: "180 days post-storm without a single municipal permit filing. Entity resolved to Director of Facilities Becca Whitmore.",
        evidence: [
          { label: "Permit Delta", value: "0 Filings (Completely unclaimed)", highlight: true },
          { label: "Estimated Scope", value: "$1,180,000 Full restoration", highlight: true },
          { label: "Entity Pierced", value: "Delaware LP ➔ On-site VP of Operations" },
          { label: "Direct Phone", value: "+1 (972) 555-0419 (Verified Direct Dial)" },
        ],
        takeaway: "Prime first-mover window for commercial contractors to present an unassailable insurance recovery package.",
      },
    ],
  },
  {
    id: "sovereign-row",
    name: "7505 Sovereign Row",
    address: "7505 Sovereign Row",
    cityStateZip: "Dallas, TX 75247",
    categoryTag: "Corporate Park",
    archetypeBadge: "Unexpired Roof (14 Yrs Warranty Left)",
    archetypeColor: "bg-blue-50 text-blue-900 border-blue-200",
    sqft: "52,400 sq ft",
    structure: "74,000 sq ft",
    buildingUse: "Flex Office & Warehouse",
    builtYear: "2000 (~24 yrs)",
    age: "6 years (2018 Re-Roof)",
    roofType: "60-mil Firestone TPO",
    warrantyStatus: "Active Warranty (Matures 2038)",
    warrantyColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    hailImpact: '0.75" Pea Hail',
    hailDetails: "Edge of storm (NWS)",
    stormDate: "May 28, 2024 · Trinity Corridor",
    permitStatus: "Warranty Good Standing",
    permitDetail: "(Preventive service)",
    replacementValue: "$84,000",
    replacementShort: "$84k",
    replacementLabel: "Est. annual service scope",
    verificationScore: 89,
    ownerType: "Institutional REIT",
    headerPhoto: "/assets/aerials/dcad-2501.jpg",
    thumbnailPhoto: "/assets/aerials/dcad-2501.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-alt.jpg",
    degradationRate: "+6% minor ponding near scupper",
    thesis: [
      "6-yr old Firestone 60-mil TPO in good standing (14 years remaining)",
      "Edge of severe storm cell; 0.75\" pea hail with no membrane penetration",
      "Minor drainage ponding detected near east scupper requiring drain tie-in",
      "Institutional REIT managing 12 North Texas properties; high-margin maintenance candidate",
    ],
    dealThesisSummary:
      "High-margin preventive maintenance target: Unexpired roof under active manufacturer warranty + minor scupper ponding + institutional portfolio owner.",
    decisionMaker: {
      name: "David Thorne",
      title: "Regional Director of Asset Operations",
      company: "Lone Star Commercial REIT",
      entityResolved: "Sovereign Industrial Trust ➔ Lone Star REIT Dallas",
      phoneMasked: "+1 (214) 555-3419 (Direct Office)",
      emailMasked: "d.thorne@lonestarreit.com (Verified)",
    },
    timeline: [
      {
        year: "2000",
        badge: "County Deed Filing",
        title: "Flex Office Distribution Park Construction",
        subtitle: "Dallas Central Appraisal records log 52,400 sq ft flex industrial and logistics warehouse.",
        evidence: [
          { label: "Footprint Area", value: "52,400 sq ft flex warehouse" },
          { label: "Deck Framing", value: "Lightweight steel truss decking" },
          { label: "Original Roof", value: "Standard 3-ply gravel asphalt" },
          { label: "Appraisal Parcel", value: "DCAD #000319-004" },
        ],
        takeaway: "Commercial properties with active warranties provide recurring service and maintenance revenues.",
      },
      {
        year: "2018",
        badge: "City Permit #18-44910",
        title: "60-mil Firestone UltraPly TPO Re-Roof Installed",
        subtitle: "Complete permitted re-roof with 20-year No Dollar Limit (NDL) manufacturer warranty maturing in 2038.",
        evidence: [
          { label: "Permit Number", value: "City of Dallas #18-44910" },
          { label: "Membrane Spec", value: "Firestone 60-mil UltraPly White TPO" },
          { label: "Warranty Horizon", value: "14 Years Remaining (Matures 2038)", highlight: true },
          { label: "Warranty Type", value: "Manufacturer 20-Yr NDL Warranty" },
        ],
        takeaway: "Knowing warranty status prevents pitching total replacements to owners who would void their active manufacturer warranty.",
      },
      {
        year: "Today",
        badge: "Preventive Target",
        title: "Active Warranty Maintenance & Portfolio Expansion",
        subtitle: "Preventive maintenance and storm certification audit opportunity with regional REIT director.",
        evidence: [
          { label: "Contract Value", value: "$84,000 Annual preventive scope", highlight: true },
          { label: "Warranty Status", value: "Active (Good standing)" },
          { label: "Portfolio Size", value: "12 Properties across DFW" },
          { label: "Decision Maker", value: "David Thorne · Regional Director Operations" },
        ],
        takeaway: "Land the maintenance contract now to be first in line when the roof reaches replacement window.",
      },
    ],
  },
  {
    id: "airport-fwy",
    name: "2200 E Airport Fwy",
    address: "2200 E Airport Fwy",
    cityStateZip: "Irving, TX 75062",
    categoryTag: "Commercial Flex Park",
    archetypeBadge: "Ponding & Seam Wear (Ballasted EPDM)",
    archetypeColor: "bg-emerald-50 text-emerald-900 border-emerald-200",
    sqft: "32,500 sq ft",
    structure: "45,000 sq ft",
    buildingUse: "Commercial Flex Assembly",
    builtYear: "1994 (~30 yrs)",
    age: "17 years (2007 Ballasted)",
    roofType: "EPDM Membrane",
    warrantyStatus: "Warranty Expired (Ballasted)",
    warrantyColor: "bg-amber-50 text-amber-800 border-amber-200",
    hailImpact: '1.50" Hail Exposure',
    hailDetails: "3 days ago (NWS)",
    stormDate: "May 28, 2024 · DFW Corridor",
    permitStatus: "0 Filings",
    permitDetail: "(Post-storm)",
    replacementValue: "$455,000",
    replacementShort: "$455k",
    replacementLabel: "Est. commercial replacement",
    verificationScore: 82,
    ownerType: "Local Property Manager",
    headerPhoto: "/assets/aerials/carousel-prop-3.jpg",
    thumbnailPhoto: "/assets/aerials/carousel-prop-3.jpg",
    satelliteImage: "/assets/aerials/exact-roof-split-alt.jpg",
    degradationRate: "+26% perimeter fatigue",
    thesis: [
      "17-yr ballasted EPDM with perimeter parapet flashing distress and gravel displacement",
      '1.50" hail confirmed on adjacent flight line weather station',
      "No restoration filings; tenant reported interior ceiling moisture",
      "Local property manager with direct cell phone and email verified",
    ],
    dealThesisSummary:
      "High-probability replacement: parapet seam failure + DFW hail track + reachable local property manager.",
    decisionMaker: {
      name: "Lisa Henderson",
      title: "Senior Property Manager",
      company: "Airport Freeway Holdings",
      entityResolved: "Airport Freeway Commercial LLC ➔ Transwestern DFW",
      phoneMasked: "+1 (972) 555-8910 (Direct Mobile)",
      emailMasked: "l.henderson@airportfreeway.com (Verified)",
    },
    timeline: [
      {
        year: "1994",
        badge: "County Deed Filing",
        title: "Commercial Flex Assembly Center Construction",
        subtitle: "Dallas County logs 32,500 sq ft flex industrial building near DFW airport corridor.",
        evidence: [
          { label: "Footprint Area", value: "32,500 sq ft flex center" },
          { label: "Framing System", value: "Pre-engineered steel rigid frame" },
          { label: "Original Substrate", value: "Single-ply EPDM gravel ballasted" },
          { label: "Appraisal Parcel", value: "DCAD #000921-001" },
        ],
        takeaway: "Fast access to roof age and system specs saves hours of manual drive-bys.",
      },
      {
        year: "2007",
        badge: "City Permit #07-33120",
        title: "Ballasted 45-mil EPDM Membrane Installed",
        subtitle: "City of Irving commercial permit filed for loose-laid EPDM with river rock ballast.",
        evidence: [
          { label: "Permit Number", value: "City of Irving #07-33120" },
          { label: "Membrane Spec", value: "45-mil Carlisle EPDM ballasted" },
          { label: "Membrane Age", value: "17 Years (Seam adhesive nearing failure)", highlight: true },
          { label: "Warranty Horizon", value: "15-Year Manufacturer (Matured 2022)" },
        ],
        takeaway: "Ballasted EPDM roofs past 15 years experience seam adhesive degradation and gravel displacement.",
      },
      {
        year: "Today",
        badge: "High-Priority Conversion",
        title: "Active Moisture Intrusion & Direct Property Manager",
        subtitle: "Wind scouring and hail impact displaced river rock ballast, causing seam tears and moisture entry.",
        evidence: [
          { label: "Permit Status", value: "0 Filings pulled (Open opportunity)", highlight: true },
          { label: "Replacement Value", value: "$455,000 Scope (325 squares)", highlight: true },
          { label: "Tenant Report", value: "Moisture intrusion in warehouse section B" },
          { label: "Decision Maker", value: "Lisa Henderson · Senior Property Manager" },
        ],
        takeaway: "Direct contact with the local property manager means you can schedule an emergency roof walk within 24 hours.",
      },
    ],
  },
];

export function WorkspaceDemo() {
  const [activePropertyIndex, setActivePropertyIndex] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [activeSubTab, setActiveSubTab] = useState<string>("Overview");
  const [timelineStep, setTimelineStep] = useState<number>(0);

  const activeProperty = properties[activePropertyIndex];

  // Auto-cycle properties every 12s when idle
  useEffect(() => {
    const propertyTimer = setInterval(() => {
      setActivePropertyIndex((prev) => (prev + 1) % properties.length);
    }, 12000);
    return () => clearInterval(propertyTimer);
  }, []);

  // Sync timeline step to last step when property changes
  useEffect(() => {
    setTimelineStep(activeProperty.timeline.length - 1);
  }, [activePropertyIndex, activeProperty.timeline.length]);

  return (
    <section className="py-12 sm:py-20 bg-[#fafaf9] border-t border-neutral-200/80" id="platform">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Quick Filter Archetype Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8 max-w-[1100px] w-full">
          <span className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wide mr-1">
            Filter Targets:
          </span>
          {properties.map((prop, idx) => {
            const isSelected = idx === activePropertyIndex;
            return (
              <button
                key={prop.id}
                onClick={() => setActivePropertyIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                  isSelected
                    ? "bg-neutral-950 text-white border-neutral-950 shadow-xs scale-105"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 shadow-2xs"
                }`}
              >
                {prop.archetypeBadge}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* EXACT HERO WORKSPACE WINDOW (BROWSER + SIDEBAR + CANVAS)  */}
        {/* ========================================================= */}
        <div className="relative w-full max-w-[1100px] mx-auto">
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
                  <button
                    onClick={() =>
                      setActivePropertyIndex(
                        (prev) => (prev - 1 + properties.length) % properties.length
                      )
                    }
                    className="p-1 hover:text-neutral-950 hover:bg-neutral-100 rounded"
                    title="Previous property"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setActivePropertyIndex((prev) => (prev + 1) % properties.length)
                    }
                    className="p-1 hover:text-neutral-950 hover:bg-neutral-100 rounded"
                    title="Next property"
                  >
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

              {/* Status pill on right */}
              <div className="hidden sm:flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${activeProperty.archetypeColor}`}>
                  {activeProperty.archetypeBadge}
                </span>
              </div>
            </div>

            {/* ----------------- WORKSPACE BODY (SIDEBAR + MAIN) ----------------- */}
            <div className="flex flex-col lg:flex-row min-h-[580px]">
              {/* ----------------- LEFT SIDEBAR (Desktop Only) ----------------- */}
              <aside className="hidden lg:flex lg:w-[190px] bg-[#fafaf9] border-r border-neutral-200 p-3 flex-col justify-between shrink-0">
                <div className="space-y-4">
                  {/* Depoii Official Vortex Mark & Name */}
                  <div className="flex items-center gap-2 px-1 pt-0.5">
                    <DepoiiMark className="w-5 h-5 text-neutral-950" />
                    <span className="font-bold text-[15px] tracking-tight text-neutral-950">
                      Depoii
                    </span>
                  </div>

                  {/* Search & Inbox */}
                  <div className="space-y-0.5 text-[12px] text-neutral-700">
                    <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Search</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">⌘K</span>
                    </div>

                    <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Inbox className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Inbox</span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-neutral-900 text-white">
                        3
                      </span>
                    </div>
                  </div>

                  {/* Primary Nav List */}
                  <nav className="space-y-0.5 text-[13px] text-neutral-750">
                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer text-neutral-700">
                      <Home className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Home</span>
                    </div>

                    {/* Active Hot Sheet in Depoii Theme */}
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-neutral-200/70 text-neutral-950 font-semibold cursor-pointer border-l-2 border-neutral-950">
                      <Zap className="w-3.5 h-3.5 text-[#FF9C6D]" />
                      <span>Hot Sheet</span>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer text-neutral-700">
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Aging Roof</span>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer text-neutral-700">
                      <Globe className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Hail Map</span>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer text-neutral-700">
                      <FileText className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Permits</span>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer text-neutral-700">
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Buildings</span>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer text-neutral-700">
                      <HardHat className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Contractors</span>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer text-neutral-700">
                      <Radio className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Outreach</span>
                    </div>
                  </nav>

                  {/* Section: Workspaces */}
                  <div className="pt-2 border-t border-neutral-200">
                    <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Workspaces
                    </div>
                    <div className="space-y-0.5 text-[12px] text-neutral-700">
                      <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Folder className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Dallas Market</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">▾</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Team</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-100 cursor-pointer">
                        <Settings className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Integrations</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom User Profile */}
                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-[10px] text-neutral-700">
                      A
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-[12px] font-semibold text-neutral-900">Ali Mirsa</div>
                      <div className="text-[10px] text-neutral-500">Depoii</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400">▾</span>
                </div>
              </aside>

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
                      { name: "20-Yr Living Archive", icon: Calendar, highlight: true },
                      { name: "Contacts", icon: Users },
                      { name: "Activity", icon: Activity },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeSubTab === tab.name;
                      return (
                        <button
                          key={tab.name}
                          onClick={() => setActiveSubTab(tab.name)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${isActive
                            ? "bg-neutral-100 text-neutral-950 font-semibold shadow-2xs"
                            : tab.highlight
                              ? "bg-amber-50 text-amber-900 border border-amber-200/80 font-semibold hover:bg-amber-100"
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
                    <Link
                      href="#demo"
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-[12px] font-semibold text-white transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Lock className="w-3 h-3 text-neutral-300" />
                      <span>Claim Property</span>
                    </Link>
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

                {/* Sub-Tab Dynamic Views */}
                {activeSubTab === "20-Yr Living Archive" ? (
                  /* ================= 20-YR LIVING ARCHIVE TAB ================= */
                  <div className="flex-1 flex flex-col gap-3.5 mt-3.5 p-4 rounded-xl bg-[#fafaf9] border border-neutral-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-neutral-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF9C6D]" />
                          <h4 className="font-bold text-[14px] text-neutral-950">
                            Living Property Archive · 20-Year Forensic Chronology
                          </h4>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Autonomous historical chain from county deed recordings to current unpermitted replacement opportunity
                        </p>
                      </div>

                      {/* Milestone Selector Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {activeProperty.timeline.map((m, mIdx) => (
                          <button
                            key={mIdx}
                            onClick={() => setTimelineStep(mIdx)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${timelineStep === mIdx
                              ? "bg-neutral-950 text-white border-neutral-950 shadow-2xs"
                              : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                              }`}
                          >
                            {m.year} · {m.badge}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Milestone Card */}
                    {activeProperty.timeline[timelineStep] && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                        <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-100 text-neutral-800 border border-neutral-200">
                                {activeProperty.timeline[timelineStep].badge}
                              </span>
                              <span className="text-[12px] font-bold text-neutral-900">
                                {activeProperty.timeline[timelineStep].year}
                              </span>
                            </div>

                            <h5 className="text-[16px] font-bold text-neutral-950 tracking-tight">
                              {activeProperty.timeline[timelineStep].title}
                            </h5>

                            <p className="text-[12.5px] text-neutral-600 mt-1.5 leading-relaxed">
                              {activeProperty.timeline[timelineStep].subtitle}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-neutral-100">
                              {activeProperty.timeline[timelineStep].evidence.map((ev, evIdx) => (
                                <div
                                  key={evIdx}
                                  className={`p-2 rounded-lg border text-[11px] ${ev.highlight
                                    ? "bg-amber-50/80 border-amber-200 text-amber-950 font-semibold"
                                    : "bg-neutral-50/70 border-neutral-200/70 text-neutral-800"
                                    }`}
                                >
                                  <div className="text-[10px] text-neutral-500 uppercase tracking-wide">
                                    {ev.label}
                                  </div>
                                  <div className="font-medium text-neutral-900 mt-0.5 truncate">
                                    {ev.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-100 text-[11px]">
                            <button
                              onClick={() => setTimelineStep((prev) => Math.max(0, prev - 1))}
                              disabled={timelineStep === 0}
                              className="font-semibold text-neutral-600 hover:text-neutral-950 disabled:opacity-30 disabled:pointer-events-none"
                            >
                              ← Earlier Record
                            </button>
                            <span className="text-neutral-400">
                              Event {timelineStep + 1} of {activeProperty.timeline.length}
                            </span>
                            <button
                              onClick={() =>
                                setTimelineStep((prev) =>
                                  Math.min(activeProperty.timeline.length - 1, prev + 1)
                                )
                              }
                              disabled={timelineStep === activeProperty.timeline.length - 1}
                              className="font-semibold text-neutral-600 hover:text-neutral-950 disabled:opacity-30 disabled:pointer-events-none"
                            >
                              Next Milestone →
                            </button>
                          </div>
                        </div>

                        <div className="lg:col-span-5 bg-neutral-950 text-white rounded-xl p-4 flex flex-col justify-between">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-semibold text-[#FF9C6D] uppercase tracking-wider mb-2.5">
                              <Sparkles className="w-3 h-3" />
                              The Commercial Advantage
                            </div>

                            <h6 className="text-[14px] font-bold text-white leading-snug">
                              How this wins the commercial contract
                            </h6>

                            <p className="text-[12px] text-neutral-300 mt-2 leading-relaxed">
                              {activeProperty.timeline[timelineStep].takeaway}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-neutral-800 mt-3">
                            <div className="flex items-center justify-between text-[11px] mb-2">
                              <span className="text-neutral-400">Resolved Key Contact:</span>
                              <span className="text-white font-medium">{activeProperty.decisionMaker.name}</span>
                            </div>
                            <Link
                              href="#demo"
                              className="w-full py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-[11.5px] transition-all flex items-center justify-center gap-1.5"
                            >
                              <span>Unlock Complete Building Dossier</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-700" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : activeSubTab === "Contacts" ? (
                  /* ================= CONTACTS TAB ================= */
                  <div className="flex-1 flex flex-col gap-3.5 mt-3.5 p-4 rounded-xl bg-white border border-neutral-200">
                    <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100">
                      <div>
                        <h4 className="font-bold text-[14px] text-neutral-950">
                          Pierced Corporate Entity &amp; Verified Decision Maker
                        </h4>
                        <p className="text-[11px] text-neutral-500">
                          Texas Secretary of State filings resolved to the direct capital expenditure director
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        87% Direct Dial Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-xl border border-neutral-200 bg-[#fafafa] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[12px]">
                              {activeProperty.decisionMaker.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <div className="font-bold text-[14px] text-neutral-950">
                                {activeProperty.decisionMaker.name}
                              </div>
                              <div className="text-[11px] text-neutral-500">
                                {activeProperty.decisionMaker.title} · {activeProperty.decisionMaker.company}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mt-3 pt-3 border-t border-neutral-200 text-[12px]">
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-500 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-neutral-400" /> Phone:
                              </span>
                              <span className="font-semibold text-neutral-900">
                                {activeProperty.decisionMaker.phoneMasked}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-500 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-neutral-400" /> Email:
                              </span>
                              <span className="font-semibold text-neutral-900">
                                {activeProperty.decisionMaker.emailMasked}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href="#demo"
                          className="mt-4 w-full py-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white text-center font-semibold text-[12px] transition-all"
                        >
                          Unlock Verified Direct Line →
                        </Link>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200 bg-[#fafafa]">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                          Entity Chain of Title
                        </div>
                        <div className="space-y-2 text-[12px]">
                          <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                            <span className="text-neutral-400 text-[10px] block">PARCEL TITLE HOLDER</span>
                            <span className="font-semibold text-neutral-900">{activeProperty.ownerType}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                            <span className="text-neutral-400 text-[10px] block">RESOLVED OPERATING COMPANY</span>
                            <span className="font-semibold text-neutral-900">{activeProperty.decisionMaker.company}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                            <span className="text-neutral-400 text-[10px] block">STATE CORPORATE RESOLUTION</span>
                            <span className="font-medium text-emerald-800">{activeProperty.decisionMaker.entityResolved}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ================= OVERVIEW TAB: EXACT 3-CARD ORIGINAL HERO SPLIT ================= */
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
                              className={`px-1.5 py-0.5 rounded transition-colors ${selectedYear === year
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
                              Depoii AI Deal Assessment
                            </span>
                            <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
                              Beta
                            </span>
                          </div>
                          {/* Audio equalizer bars in Depoii Coral */}
                          <div className="flex items-end gap-0.5 h-3">
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-1" />
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-2" />
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-3" />
                            <span className="w-0.5 bg-[#FF9C6D] rounded-full animate-wave-1" />
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
                )}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* THREE/FOUR-PROPERTY CAROUSEL SWITCHER IN DEPOII THEME     */}
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

              {/* 4 Interactive Property Opportunity Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-[1020px]">
                {properties.map((prop, idx) => {
                  const isActive = idx === activePropertyIndex;
                  return (
                    <div
                      key={prop.id}
                      onClick={() => setActivePropertyIndex(idx)}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 text-left ${isActive
                        ? "bg-white border-neutral-950 shadow-[0_4px_16px_rgba(0,0,0,0.1)] ring-2 ring-neutral-950/15 scale-[1.01]"
                        : "bg-white hover:bg-neutral-50 border-neutral-200 shadow-2xs hover:border-neutral-300"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Property aerial thumbnail */}
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-neutral-200">
                          <Image
                            src={prop.thumbnailPhoto}
                            alt={prop.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Summary details */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-bold text-neutral-950 truncate">
                            {prop.name}
                          </div>
                          <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                            {prop.sqft} · {prop.roofType}
                          </div>
                        </div>
                      </div>

                      {/* Archetype Badge & Price */}
                      <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-neutral-100">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border truncate max-w-[125px] ${prop.archetypeColor}`}>
                          {prop.archetypeBadge.split("(")[0].trim()}
                        </span>
                        <span className="text-[13px] font-extrabold text-neutral-950 shrink-0">
                          {prop.replacementShort}
                        </span>
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
                  className={`transition-all rounded-full ${idx === activePropertyIndex
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
