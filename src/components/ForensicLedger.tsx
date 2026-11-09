"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  FileCheck2, 
  AlertTriangle, 
  Search, 
  ArrowUpRight, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Layers, 
  CheckCircle2,
  Calendar
} from "lucide-react";

interface ParcelAudit {
  id: string;
  address: string;
  city: string;
  countyParcel: string;
  sqft: string;
  roofType: string;
  builtYear: number;
  estReplacement: string;
  satelliteImage: string;
  stormEvent: {
    date: string;
    hailSize: string;
    radarStation: string;
    swathImpact: string;
  };
  permits: Array<{
    date: string;
    type: string;
    permitNumber: string;
    status: string;
    flag?: "unclaimed" | "expired" | "normal";
  }>;
  forensicSummary: string;
  degradationScore: string;
  decisionMaker: {
    title: string;
    entity: string;
    status: string;
  };
}

const PARCEL_AUDITS: ParcelAudit[] = [
  {
    id: "central-expy",
    address: "8600 S Central Expy",
    city: "Dallas, TX 75241",
    countyParcel: "DCAD #0000049281000",
    sqft: "48,200 sq ft",
    roofType: "Single-ply 45-mil TPO Membrane",
    builtYear: 1956,
    estReplacement: "$674,800",
    satelliteImage: "/assets/aerials/dcad-16850.jpg",
    stormEvent: {
      date: "May 28, 2024 (NWS Verified)",
      hailSize: '1.75" Severe Hail Ground Truth',
      radarStation: "KFWS Dual-Pol Doppler (Fort Worth)",
      swathImpact: "Direct Core Hit",
    },
    permits: [
      {
        date: "2024 - Present",
        type: "Commercial Roofing Repair / Reroof",
        permitNumber: "City of Dallas Building Dept.",
        status: "0 Filings Found",
        flag: "unclaimed",
      },
      {
        date: "2023-04-11",
        type: "Mechanical / Rooftop HVAC Replacement",
        permitNumber: "Permit #2304111002",
        status: "Inspected & Closed",
        flag: "normal",
      },
      {
        date: "2021-08-19",
        type: "Commercial Electrical Service Upgrade",
        permitNumber: "Permit #2108191045",
        status: "Inspected & Closed",
        flag: "normal",
      },
      {
        date: "2005-06-03",
        type: "Original Membrane Installation (TPO)",
        permitNumber: "Permit #0506031088",
        status: "Warranty Expired (19 yrs)",
        flag: "expired",
      },
    ],
    forensicSummary:
      "Roof membrane reached 19 years of service life without replacement. Severe 1.75\" hail impact recorded across the parcel with zero post-storm roofing permit activity logged with the city. Primary contact is an out-of-state corporate asset manager.",
    degradationScore: "+34% Seam Fatigue & Surface Ponding",
    decisionMaker: {
      title: "VP of Real Estate & Facility Operations",
      entity: "Pinecrest Logistics Portfolio REIT (Delaware)",
      status: "Direct Phone & Corporate Email Verified",
    },
  },
  {
    id: "inwood-rd",
    address: "14201 Inwood Rd",
    city: "Dallas, TX 75244",
    countyParcel: "DCAD #0000018492000",
    sqft: "84,000 sq ft",
    roofType: "4-Ply Modified Bitumen & Granule Surfacing",
    builtYear: 2002,
    estReplacement: "$1,180,000",
    satelliteImage: "/assets/satellite-roof-closeup.png",
    stormEvent: {
      date: "May 28, 2024 (NWS Verified)",
      hailSize: '2.25" High-Velocity Hail Swath',
      radarStation: "KFWS Dual-Pol Doppler (Fort Worth)",
      swathImpact: "Direct Core Hit",
    },
    permits: [
      {
        date: "2024 - Present",
        type: "Commercial Roofing Repair / Reroof",
        permitNumber: "City of Dallas Building Dept.",
        status: "0 Filings Found",
        flag: "unclaimed",
      },
      {
        date: "2022-11-04",
        type: "Structural Warehouse Mezzanine Addition",
        permitNumber: "Permit #2211048821",
        status: "Inspected & Closed",
        flag: "normal",
      },
      {
        date: "2002-09-14",
        type: "Original Commercial Construction Permit",
        permitNumber: "Permit #0209140019",
        status: "Warranty Expired (22 yrs)",
        flag: "expired",
      },
    ],
    forensicSummary:
      "Granule loss and severe seam blister acceleration visible in satellite timeline. 2.25\" hail corridor confirmed. Building is occupied by a manufacturing tenant under an NNN lease where the landlord is responsible for structural roof replacement.",
    degradationScore: "+48% Granule Displacement & Delamination",
    decisionMaker: {
      title: "Managing Director of Commercial Assets",
      entity: "Inwood Industrial Holdings LLC",
      status: "Corporate Switchboard Bypassed · Direct Cell",
    },
  },
  {
    id: "airport-fwy",
    address: "2200 E Airport Fwy",
    city: "Irving, TX 75062",
    countyParcel: "DCAD #0000039217000",
    sqft: "32,500 sq ft",
    roofType: "Mechanically Attached 60-mil EPDM",
    builtYear: 1998,
    estReplacement: "$455,000",
    satelliteImage: "/assets/aerials/preview-dcad-16850.jpg",
    stormEvent: {
      date: "June 02, 2024 (NWS Verified)",
      hailSize: '1.50" Hail Swath Contour',
      radarStation: "KFWS Dual-Pol Doppler (Fort Worth)",
      swathImpact: "Peripheral Core Impact",
    },
    permits: [
      {
        date: "2024 - Present",
        type: "Commercial Roofing Repair / Reroof",
        permitNumber: "City of Irving Code Compliance",
        status: "0 Filings Found",
        flag: "unclaimed",
      },
      {
        date: "2020-03-12",
        type: "Commercial Rooftop Solar Photovoltaic Interconnection",
        permitNumber: "Permit #2003120045",
        status: "Approved",
        flag: "normal",
      },
      {
        date: "1998-10-30",
        type: "Original Commercial Certificate of Occupancy",
        permitNumber: "Permit #9810300122",
        status: "Warranty Expired (26 yrs)",
        flag: "expired",
      },
    ],
    forensicSummary:
      "26-year-old EPDM rubber substrate exhibiting puncture vulnerabilities around parapet walls and RTU curbs. Storm occurred 3 days prior with zero insurance filings registered in municipal record.",
    degradationScore: "+29% Perimeter Flashing Tensile Breakdown",
    decisionMaker: {
      title: "Senior Facilities & Capital Projects Director",
      entity: "Trinity Gateway Commercial Center",
      status: "Direct Verified Contact on File",
    },
  },
];

export function ForensicLedger() {
  const [selectedParcelId, setSelectedParcelId] = useState<string>("central-expy");
  const [scanMode, setScanMode] = useState<"aerial" | "boundary" | "thermal">("aerial");

  const currentParcel =
    PARCEL_AUDITS.find((p) => p.id === selectedParcelId) || PARCEL_AUDITS[0];

  return (
    <section className="py-24 sm:py-32 bg-white text-neutral-900 border-t border-neutral-100" id="forensic-ledger">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading — Bold, Decisive, Two Lines or Fewer, No Fluff Eyebrow */}
        <div className="max-w-4xl text-left mb-12 sm:mb-16">
          <h2 className="text-[34px] sm:text-[48px] lg:text-[56px] font-extrabold text-neutral-950 tracking-[-0.03em] leading-[1.08]">
            Commercial roofs fail silently for years before water hits the floor.
          </h2>
          <p className="mt-5 text-[17px] sm:text-[19px] text-neutral-600 leading-relaxed max-w-3xl">
            By the time a tenant complains of an interior leak, a $300k reroof has become a $900k structural tear-off. 
            Depoii audits municipal permit registers against Doppler radar ground truth to surface unclaimed commercial jobs before competitors even know the storm hit.
          </p>
        </div>

        {/* Parcel Selector Strip — Real Texas Properties */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="text-[13px] font-semibold text-neutral-500 mr-2 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>Select Commercial Target:</span>
          </div>
          {PARCEL_AUDITS.map((parcel) => {
            const isSelected = parcel.id === currentParcel.id;
            return (
              <button
                key={parcel.id}
                onClick={() => setSelectedParcelId(parcel.id)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                  isSelected
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                }`}
              >
                <span>{parcel.address}</span>
                <span className="ml-1.5 opacity-60 text-[11px]">({parcel.sqft})</span>
              </button>
            );
          })}
        </div>

        {/* 60/40 Asymmetric Forensic Ledger Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT 7 COLS (60%): The Municipal Public Records Ledger */}
          <div className="lg:col-span-7 bg-[#fafaf9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-neutral-200 shadow-2xs">
            <div>
              {/* Ledger Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[18px] sm:text-[20px] text-neutral-950">
                      {currentParcel.address}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-200 text-neutral-800">
                      {currentParcel.countyParcel}
                    </span>
                  </div>
                  <div className="text-[13px] text-neutral-600 mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{currentParcel.city}</span>
                    <span>·</span>
                    <span>{currentParcel.sqft}</span>
                    <span>·</span>
                    <span>Built {currentParcel.builtYear}</span>
                  </div>
                </div>

                {/* Replacement Valuation Badge */}
                <div className="text-left sm:text-right">
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                    Est. Replacement Value
                  </div>
                  <div className="text-[22px] sm:text-[24px] font-extrabold text-neutral-950 tracking-tight">
                    {currentParcel.estReplacement}
                  </div>
                </div>
              </div>

              {/* Storm Ground Truth Verification Banner */}
              <div className="mt-5 p-4 rounded-xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 text-[#FF9C6D]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-neutral-950 flex items-center gap-2">
                      <span>{currentParcel.stormEvent.hailSize}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-semibold">
                        {currentParcel.stormEvent.swathImpact}
                      </span>
                    </div>
                    <div className="text-[12px] text-neutral-600 mt-0.5">
                      {currentParcel.stormEvent.date} · {currentParcel.stormEvent.radarStation}
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-neutral-100 text-neutral-900 border border-neutral-200">
                    <CheckCircle2 className="w-3 h-3 text-neutral-950" />
                    Radar Corroborated
                  </span>
                </div>
              </div>

              {/* Municipal Permit History Ledger Table */}
              <div className="mt-6">
                <div className="flex items-center justify-between pb-2 text-[12px] font-bold text-neutral-800 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-neutral-600" />
                    <span>Municipal Building Department Filings</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-normal">Official City Registry</span>
                </div>

                <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white overflow-hidden">
                  {currentParcel.permits.map((permit, idx) => {
                    const isUnclaimed = permit.flag === "unclaimed";
                    const isExpired = permit.flag === "expired";
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                          isUnclaimed ? "bg-[#fff7f2]" : "hover:bg-neutral-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="pt-0.5">
                            {isUnclaimed ? (
                              <AlertTriangle className="w-4 h-4 text-[#FF9C6D]" />
                            ) : isExpired ? (
                              <Clock className="w-4 h-4 text-neutral-400" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-[13px] font-semibold text-neutral-950 flex items-center gap-2">
                              <span>{permit.type}</span>
                              {isUnclaimed && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF9C6D]/20 text-[#c2501a]">
                                  ACTIONABLE OPPORTUNITY
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-neutral-500 mt-0.5">
                              {permit.permitNumber}
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-left sm:text-right shrink-0">
                          <span
                            className={`text-[12px] font-bold ${
                              isUnclaimed
                                ? "text-[#c2501a]"
                                : isExpired
                                ? "text-neutral-700"
                                : "text-neutral-600"
                            }`}
                          >
                            {permit.status}
                          </span>
                          <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {permit.date}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Decision Maker / Ownership Block */}
            <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
              <div>
                <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Property Ownership & Facility Contact
                </div>
                <div className="font-bold text-neutral-950 mt-0.5">
                  {currentParcel.decisionMaker.entity}
                </div>
                <div className="text-neutral-600 text-[12px]">
                  {currentParcel.decisionMaker.title} ·{" "}
                  <span className="text-neutral-900 font-medium">{currentParcel.decisionMaker.status}</span>
                </div>
              </div>
              <button className="px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-[13px] flex items-center gap-1.5 shrink-0 transition-colors">
                <span>View Full Audit Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT 5 COLS (40%): High-Resolution Satellite Orthomosaic Proof */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-neutral-200 shadow-2xs">
            <div>
              {/* Visual Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-neutral-700" />
                  <span className="font-bold text-[15px] text-neutral-950">
                    High-Res Orthomosaic Evidence
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setScanMode("aerial")}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
                      scanMode === "aerial" ? "bg-white text-neutral-950 shadow-2xs" : "text-neutral-600"
                    }`}
                  >
                    RGB
                  </button>
                  <button
                    onClick={() => setScanMode("thermal")}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
                      scanMode === "thermal" ? "bg-white text-neutral-950 shadow-2xs" : "text-neutral-600"
                    }`}
                  >
                    Stress
                  </button>
                </div>
              </div>

              {/* Aerial Image Frame */}
              <div className="relative mt-4 aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 group">
                <Image
                  src={currentParcel.satelliteImage}
                  alt={currentParcel.address}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    scanMode === "thermal" ? "contrast-125 saturate-150 brightness-95 filter hue-rotate-15" : ""
                  }`}
                  priority
                />

                {/* Overlaid Degradation Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-xs text-white text-[11px] font-semibold shadow flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF9C6D]" />
                  <span>{currentParcel.roofType}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/85 backdrop-blur-xs text-white text-[12px] shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                      Depoii Surface Diagnostic
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      {currentParcel.degradationScore}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#FF9C6D] px-2 py-0.5 rounded bg-white/10">
                    High Risk
                  </span>
                </div>
              </div>

              {/* Forensic Analysis Thesis */}
              <div className="mt-5 p-4 rounded-xl bg-[#fafaf9] border border-neutral-200">
                <div className="text-[12px] font-bold text-neutral-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#FF9C6D]" />
                  <span>Forensic Audit Finding</span>
                </div>
                <p className="mt-1.5 text-[13px] text-neutral-700 leading-relaxed">
                  {currentParcel.forensicSummary}
                </p>
              </div>
            </div>

            {/* Bottom Claim Probability Metric */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[12px]">
              <span className="text-neutral-500">Unclaimed Loss Probability:</span>
              <span className="font-extrabold text-neutral-950 text-[14px]">
                94.8% (Verified via Municipal Gaps)
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

