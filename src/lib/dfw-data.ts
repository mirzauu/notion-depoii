export type DataAttribution =
  | "notion_ui"
  | "dcad_sector_1_dossier"
  | "dcad_sector_4_dossier"
  | "illustrative_sample"
  | "placeholder";

export interface PlaceholderMetricDef {
  id: string;
  label: string;
  unit: string;
  scopeDescription: string;
  statusToken: "[VERIFIED_METRIC_PENDING]";
  attribution: "placeholder";
  requiredSource: string;
}

export interface DfwCityBreakdown {
  city: string;
  assetCount: number;
  grossBuildingSqFt: number;
  roofFootprintSqFt: number;
  sumRowReplacementUsd: number;
}

export interface VerifiedDossierAsset {
  rank: number;
  address: string;
  city: string;
  grossSqFt: number;
  roofFootprintSqFt: number;
  yearBuilt: number;
  exposureScore: number;
  estReplacementUsd: number;
  ownerName: string;
  stormDate: string;
  maxHailInches: number;
  cadRecordUrl: string;
}

export interface DfwSectorSummary {
  id: "sector_1" | "sector_4";
  title: string;
  corridorLabel: string;
  marketCitiesListed: string[];
  rankedAssetCount: number;
  dossierHeaderGrossSqFt: number;
  verifiedJsonGrossSqFt: number;
  grossSqFtDiscrepancyNote?: string;
  roofFootprintSqFt: number;
  benchmarkRatePerSqFt: number;
  combinedPipelineUsd: number;
  sumRowReplacementUsd: number;
  avgContractSizeUsd: number;
  postStormPermitCount: number;
  hailThresholdLabel: string;
  stormDates: { date: string; hailInches: number; assetCount: number }[];
  kineticEnergyJoules: number;
  scoreRange: { min: number; max: number };
  yearBuiltRange: { min: number; max: number };
  appraisalSource: string;
  snapshotLabel: string;
  methodologyCaveat?: string;
  cityBreakdown: DfwCityBreakdown[];
  topVerifiedSampleAssets: VerifiedDossierAsset[];
  attribution: "dcad_sector_1_dossier" | "dcad_sector_4_dossier";
}

export interface IllustrativeSampleProperty {
  id: string;
  address: string;
  submarket: string;
  roofAreaSqFt: number;
  buildingComplexSqFt: number;
  yearBuilt: number;
  roofAgeYears: number;
  roofSystem: string;
  permitRecord: string;
  hailSignal: string;
  fitScore: number;
  estScopeUsd: number;
  estScopeDisplay: string;
  ownerRole: string;
  entityTrail: string;
  statusSummary: string;
  isIllustrative: true;
  attribution: "illustrative_sample";
}

export const PLATFORM_FACTS = {
  coverageScale: "70,000+",
  targetSqFtFloor: "25,000+ sq ft",
  targetSweetSpot: "45,000 to 150,000 sq ft",
  roofSystems: [
    "TPO (45-mil & 60-mil)",
    "Ballasted EPDM",
    "Modified Bitumen (2-Ply SBS)",
    "Fluid-Applied Coatings",
  ],
  lifecycleHorizonYears: 20,
  lifecycleWindowLabel: "19 to 24 years",
  territoryBriefOffer: {
    count: 10,
    deliverySla: "Within 24 hours",
    cardRequired: false,
  },
  walkthroughSla: "Within 1 business day",
  territoryCap: "2 contractors per territory",
  uiBenchmarkRatePerSqFt: 14,
  dossierBenchmarkRatePerSqFt: 14.5,
  publicDataSources: [
    "National Weather Service (NWS) Storm Reports & Warnings",
    "Dallas CAD (DCAD) & Tarrant CAD (TAD) Building Rolls",
    "Municipal Commercial Roofing Permit Archives (Dallas, Irving)",
    "Texas Corporate Entity Ownership Records",
  ],
  pricingTiers: [
    {
      name: "Starter",
      annualMonthlyUsd: 249,
      monthlyUsd: 359,
      creditsPerMonth: 300,
      seats: 1,
      lockLabel: "No claim lock",
    },
    {
      name: "Growth",
      annualMonthlyUsd: 599,
      monthlyUsd: 869,
      creditsPerMonth: 1000,
      seats: 3,
      lockLabel: "27-day claim lock",
    },
    {
      name: "Enterprise",
      annualMonthlyUsd: 1299,
      monthlyUsd: 1885,
      creditsPerMonth: 2500,
      seats: 10,
      lockLabel: "1 Exclusive Territory Lock",
    },
  ],
  attribution: "notion_ui" as const,
};

export const SECTOR_1_DOSSIER: DfwSectorSummary = {
  id: "sector_1",
  title: "Sector 1 Top-50 Verified Commercial Roof Dossier",
  corridorLabel: "Dallas County Northwest Corridor & Central Core",
  marketCitiesListed: [
    "Farmers Branch",
    "Addison",
    "Carrollton",
    "Irving",
    "Coppell",
    "North Dallas",
  ],
  rankedAssetCount: 50,
  dossierHeaderGrossSqFt: 17842190,
  verifiedJsonGrossSqFt: 19945706,
  grossSqFtDiscrepancyNote:
    "The Sector 1 executive summary header lists 17,842,190 sq ft gross building area, whereas summing all 50 verified roster rows yields 19,945,706 sq ft. Roof envelope (9,377,345 sq ft) and modeled pipeline ($135,971,502.50) match identically across summary and row data.",
  roofFootprintSqFt: 9377345,
  benchmarkRatePerSqFt: 14.5,
  combinedPipelineUsd: 135971502.5,
  sumRowReplacementUsd: 135971505,
  avgContractSizeUsd: 2719430.0,
  postStormPermitCount: 0,
  hailThresholdLabel: '1.5" to 4.5" MESH / NWS severe convective hail',
  stormDates: [
    { date: "2026-06-02", hailInches: 2.0, assetCount: 41 },
    { date: "2026-05-23", hailInches: 1.5, assetCount: 6 },
    { date: "2026-04-28", hailInches: 4.5, assetCount: 3 },
  ],
  kineticEnergyJoules: 0.6,
  scoreRange: { min: 43, max: 99 },
  yearBuiltRange: { min: 1920, max: 2012 },
  appraisalSource: "Dallas Central Appraisal District (DCAD) 2026 Certified Roll",
  snapshotLabel: "October 2026",
  methodologyCaveat:
    "Rank 43 (2051 Mckenzie Dr, Carrollton) records 273,219 gross sq ft vs. 322,624 sq ft estimated roof footprint (+18.1%). Source DCAD zip_code fields represent owner tax-mailing ZIPs rather than property situs ZIPs and are omitted from building display tables.",
  cityBreakdown: [
    {
      city: "Addison",
      assetCount: 14,
      grossBuildingSqFt: 5618869,
      roofFootprintSqFt: 1445289,
      sumRowReplacementUsd: 20956691,
    },
    {
      city: "Farmers Branch",
      assetCount: 12,
      grossBuildingSqFt: 5373806,
      roofFootprintSqFt: 1687258,
      sumRowReplacementUsd: 24465242,
    },
    {
      city: "Coppell",
      assetCount: 9,
      grossBuildingSqFt: 2913566,
      roofFootprintSqFt: 2565120,
      sumRowReplacementUsd: 37194240,
    },
    {
      city: "Dallas",
      assetCount: 6,
      grossBuildingSqFt: 2493918,
      roofFootprintSqFt: 879570,
      sumRowReplacementUsd: 12753766,
    },
    {
      city: "Carrollton",
      assetCount: 5,
      grossBuildingSqFt: 2044491,
      roofFootprintSqFt: 2093896,
      sumRowReplacementUsd: 30361492,
    },
    {
      city: "Irving",
      assetCount: 4,
      grossBuildingSqFt: 1501056,
      roofFootprintSqFt: 706212,
      sumRowReplacementUsd: 10240074,
    },
  ],
  topVerifiedSampleAssets: [
    {
      rank: 1,
      address: "5001 Spring Valley Rd",
      city: "Farmers Branch",
      grossSqFt: 1126832,
      roofFootprintSqFt: 167894,
      yearBuilt: 1985,
      exposureScore: 99,
      estReplacementUsd: 2434463,
      ownerName: "Eos Properties At Providence Towers Llc",
      stormDate: "2026-06-02",
      maxHailInches: 2.0,
      cadRecordUrl: "https://www.dallascad.org/AcctDetailCom.aspx?ID=24147600000000000",
    },
    {
      rank: 4,
      address: "1785 Capital Pkwy",
      city: "Carrollton",
      grossSqFt: 676379,
      roofFootprintSqFt: 676379,
      yearBuilt: 1996,
      exposureScore: 48,
      estReplacementUsd: 9807496,
      ownerName: "Sandy Lake Road Dev Co",
      stormDate: "2026-05-23",
      maxHailInches: 1.5,
      cadRecordUrl: "https://www.dallascad.org/AcctDetailCom.aspx?ID=14006260010010000",
    },
    {
      rank: 6,
      address: "10501 N Macarthur Blvd",
      city: "Irving",
      grossSqFt: 544650,
      roofFootprintSqFt: 323040,
      yearBuilt: 1995,
      exposureScore: 99,
      estReplacementUsd: 4684080,
      ownerName: "Winsted Grantor Trust The",
      stormDate: "2026-06-02",
      maxHailInches: 2.0,
      cadRecordUrl: "https://www.dallascad.org/AcctDetailCom.aspx?ID=326045500A0010000",
    },
    {
      rank: 19,
      address: "2055 Luna Rd",
      city: "Carrollton",
      grossSqFt: 404200,
      roofFootprintSqFt: 404200,
      yearBuilt: 1981,
      exposureScore: 99,
      estReplacementUsd: 5860900,
      ownerName: "Columbia Tex Luna Ind Lp",
      stormDate: "2026-06-02",
      maxHailInches: 2.0,
      cadRecordUrl: "https://www.dallascad.org/AcctDetailCom.aspx?ID=14017100040020000",
    },
  ],
  attribution: "dcad_sector_1_dossier",
};

export const SECTOR_4_DOSSIER: DfwSectorSummary = {
  id: "sector_4",
  title: "Sector 4 Top-50 Verified Commercial Roof Dossier",
  corridorLabel: "Dallas County Sector 4 (East & Northeast Corridor)",
  marketCitiesListed: [
    "Garland",
    "Mesquite",
    "Richardson",
    "Rowlett",
    "Sunnyvale",
  ],
  rankedAssetCount: 50,
  dossierHeaderGrossSqFt: 20195927,
  verifiedJsonGrossSqFt: 20195927,
  roofFootprintSqFt: 20778121,
  benchmarkRatePerSqFt: 14.5,
  combinedPipelineUsd: 301282754.5,
  sumRowReplacementUsd: 301282759,
  avgContractSizeUsd: 6025655.09,
  postStormPermitCount: 0,
  hailThresholdLabel: '1.75" severe convective hail core (2024-05-28)',
  stormDates: [{ date: "2024-05-28", hailInches: 1.75, assetCount: 50 }],
  kineticEnergyJoules: 0.68,
  scoreRange: { min: 84, max: 96 },
  yearBuiltRange: { min: 1933, max: 2025 },
  appraisalSource: "Dallas Central Appraisal District (DCAD) 2026 Certified Roll",
  snapshotLabel: "Dallas County Deployment",
  methodologyCaveat:
    "Sensitivity disclosure: Rank 7 (1201 Chase Rd, Mesquite) reports 530,100 gross sq ft vs. 5,301,002 sq ft roof footprint ($76,864,529, 25.5% of Sector 4 dollar total) in the source DCAD/dossier export. Excluding Rank 7, the remaining 49 assets total 19,665,827 gross sq ft, 15,477,119 sq ft roof envelope, and $224,418,225.50 at $14.50/sq ft (or 16,007,219 sq ft / $232,104,675.50 if Rank 7 is normalized to 530,100 sq ft). Sector 4 also includes 16 multifamily apartment properties alongside commercial/industrial assets, and Sunnyvale recorded 0 assets in the Top 50 roster.",
  cityBreakdown: [
    {
      city: "Garland",
      assetCount: 20,
      grossBuildingSqFt: 8159306,
      roofFootprintSqFt: 7777293,
      sumRowReplacementUsd: 112770752,
    },
    {
      city: "Mesquite",
      assetCount: 18,
      grossBuildingSqFt: 7019031,
      roofFootprintSqFt: 10874432,
      sumRowReplacementUsd: 157679264,
    },
    {
      city: "Richardson",
      assetCount: 11,
      grossBuildingSqFt: 4704373,
      roofFootprintSqFt: 1997269,
      sumRowReplacementUsd: 28960401,
    },
    {
      city: "Rowlett",
      assetCount: 1,
      grossBuildingSqFt: 313217,
      roofFootprintSqFt: 129127,
      sumRowReplacementUsd: 1872342,
    },
    {
      city: "Sunnyvale",
      assetCount: 0,
      grossBuildingSqFt: 0,
      roofFootprintSqFt: 0,
      sumRowReplacementUsd: 0,
    },
  ],
  topVerifiedSampleAssets: [
    {
      rank: 1,
      address: "901 S Central Expy",
      city: "Richardson",
      grossSqFt: 879444,
      roofFootprintSqFt: 366286,
      yearBuilt: 1971,
      exposureScore: 96,
      estReplacementUsd: 5311147,
      ownerName: "Sic-Esperson Buildings Lp",
      stormDate: "2024-05-28",
      maxHailInches: 1.75,
      cadRecordUrl: "https://www.dallascad.org/AcctDetailCom.aspx?ID=420147500A01A0000",
    },
    {
      rank: 2,
      address: "2775 W Miller Rd",
      city: "Garland",
      grossSqFt: 870902,
      roofFootprintSqFt: 870902,
      yearBuilt: 1980,
      exposureScore: 96,
      estReplacementUsd: 12628079,
      ownerName: "Garlly Associates Limited Partnership",
      stormDate: "2024-05-28",
      maxHailInches: 1.75,
      cadRecordUrl: "https://www.dallascad.org/AcctDetailCom.aspx?ID=265133000101R0000",
    },
    {
      rank: 5,
      address: "2200 Big Town Blvd",
      city: "Mesquite",
      grossSqFt: 555510,
      roofFootprintSqFt: 555510,
      yearBuilt: 2006,
      exposureScore: 96,
      estReplacementUsd: 8054895,
      ownerName: "Scg Mesquite Business Center Lp",
      stormDate: "2024-05-28",
      maxHailInches: 1.75,
      cadRecordUrl: "https://www.dallascad.org/AcctDetailCom.aspx?ID=381240300A0010000",
    },
  ],
  attribution: "dcad_sector_4_dossier",
};

export const COMBINED_SECTOR1_SECTOR4_TOTALS = {
  totalAssets: 100,
  totalVerifiedGrossSqFt: 40141633,
  totalRoofEnvelopeSqFt: 30155466,
  combinedPipelineUsd: 437254257,
  combinedPipelineFormatted: "$437,254,257.00",
  combinedPipelineShort: "$437.25M",
  sector4ExRank7PipelineUsd: 360389728,
  postStormPermitCount: 0,
  statutoryNoticeContext: "Texas Insurance Code § 542A.003 (12–24 month notice window)",
};

export const ILLUSTRATIVE_SAMPLE_PROPERTIES: IllustrativeSampleProperty[] = [
  {
    id: "central-expy",
    address: "8600 S Central Expy, Dallas, TX 75241",
    submarket: "South Dallas",
    roofAreaSqFt: 48200,
    buildingComplexSqFt: 308343,
    yearBuilt: 1956,
    roofAgeYears: 19,
    roofSystem: "Single-Ply TPO (45-mil)",
    permitRecord: "Dallas #05-88219 (2005 Re-Roof)",
    hailSignal: '1.75" Hail Nearby · No post-storm reroof',
    fitScore: 96,
    estScopeUsd: 674800,
    estScopeDisplay: "$674,800",
    ownerRole: "VP of Asset Management",
    entityTrail: "Regional Logistics Group · Corporate Operating Trail",
    statusSummary: "20-yr lifecycle window + nearby storm corridor",
    isIllustrative: true,
    attribution: "illustrative_sample",
  },
  {
    id: "inwood-rd",
    address: "14201 Inwood Rd, Dallas, TX 75244",
    submarket: "North Dallas",
    roofAreaSqFt: 84000,
    buildingComplexSqFt: 112500,
    yearBuilt: 1988,
    roofAgeYears: 22,
    roofSystem: "Modified Bitumen (2-Ply SBS)",
    permitRecord: "Dallas #02-19402 (2002 Cap Sheet)",
    hailSignal: '2.25" Hail Track · No post-storm reroof',
    fitScore: 94,
    estScopeUsd: 1180000,
    estScopeDisplay: "$1,180,000",
    ownerRole: "Director of Facilities & CapEx",
    entityTrail: "Industrial Holdings LP · On-site Plant Ops",
    statusSummary: "Past 20-yr mark inside direct 2.25\" hail track",
    isIllustrative: true,
    attribution: "illustrative_sample",
  },
  {
    id: "sovereign-row",
    address: "7505 Sovereign Row, Dallas, TX 75247",
    submarket: "Brookhollow / Dallas",
    roofAreaSqFt: 52400,
    buildingComplexSqFt: 74000,
    yearBuilt: 2000,
    roofAgeYears: 6,
    roofSystem: "60-mil White TPO",
    permitRecord: "Dallas #18-44910 (2018 Re-Roof)",
    hailSignal: '0.75" Edge Hail · Active warranty until 2038',
    fitScore: 89,
    estScopeUsd: 84000,
    estScopeDisplay: "$84,000 / yr maint.",
    ownerRole: "Regional Director of Operations",
    entityTrail: "Institutional Portfolio · Lone Star Portfolio",
    statusSummary: "Warranty-active building filtered out of tear-off pitch",
    isIllustrative: true,
    attribution: "illustrative_sample",
  },
  {
    id: "airport-fwy",
    address: "2200 E Airport Fwy, Irving, TX 75062",
    submarket: "Irving",
    roofAreaSqFt: 32500,
    buildingComplexSqFt: 45000,
    yearBuilt: 1994,
    roofAgeYears: 17,
    roofSystem: "Ballasted EPDM (45-mil)",
    permitRecord: "Irving #07-33120 (2007 Ballasted)",
    hailSignal: '1.50" Hail Nearby · No post-storm reroof',
    fitScore: 84,
    estScopeUsd: 455000,
    estScopeDisplay: "$455,000",
    ownerRole: "Senior Property Manager",
    entityTrail: "Local Asset Manager · Airport Freeway Commercial",
    statusSummary: "Coating & mid-sized flex restoration candidate",
    isIllustrative: true,
    attribution: "illustrative_sample",
  },
  {
    id: "valwood-pkwy",
    address: "1685 Valwood Pkwy, Carrollton, TX",
    submarket: "Carrollton / Valwood",
    roofAreaSqFt: 68400,
    buildingComplexSqFt: 68400,
    yearBuilt: 1986,
    roofAgeYears: 20,
    roofSystem: "Single-Ply TPO",
    permitRecord: "2004 Re-Roof Window",
    hailSignal: "20-yr window · No reroof permit",
    fitScore: 93,
    estScopeUsd: 957000,
    estScopeDisplay: "$957,000 est.",
    ownerRole: "Facilities Director",
    entityTrail: "Valwood Industrial Corridor Portfolio",
    statusSummary: "Single-ply warehouse reaching 20-year replacement window",
    isIllustrative: true,
    attribution: "illustrative_sample",
  },
  {
    id: "riverside-dr",
    address: "3201 Riverside Dr, Irving, TX",
    submarket: "Irving / Las Colinas Edge",
    roofAreaSqFt: 124500,
    buildingComplexSqFt: 124500,
    yearBuilt: 1991,
    roofAgeYears: 18,
    roofSystem: "Single-Ply TPO",
    permitRecord: "2006 Re-Roof Window",
    hailSignal: "Storm swath · Unreplaced",
    fitScore: 92,
    estScopeUsd: 1740000,
    estScopeDisplay: "$1.74M est.",
    ownerRole: "VP of Operations",
    entityTrail: "North Texas Logistics Entity",
    statusSummary: "Large industrial distribution footprint inside storm path",
    isIllustrative: true,
    attribution: "illustrative_sample",
  },
];

export const PLACEHOLDER_METRICS: Record<string, PlaceholderMetricDef> = {
  dfw_county_breakdown: {
    id: "dfw_county_breakdown",
    label: "Per-County DFW Roof Distribution (Dallas, Tarrant, Denton, Collin)",
    unit: "commercial buildings",
    scopeDescription:
      "Full 70,000+ metro inventory split by county appraisal roll pending unified multi-county dataset publication.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "DCAD, TAD, Denton CAD, Collin CAD unified roll export",
  },
  dfw_permit_lag_benchmark: {
    id: "dfw_permit_lag_benchmark",
    label: "Metro-Wide Storm-to-Permit Lag & Unpermitted Ratio",
    unit: "days / %",
    scopeDescription:
      "Aggregate post-storm permit lag across all 70,000+ DFW buildings beyond the 100-asset Sector 1 & Sector 4 dossiers.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Multi-municipality DFW permit archive longitudinal audit",
  },
  annual_dfw_hail_swath_sqft: {
    id: "annual_dfw_hail_swath_sqft",
    label: "Annual DFW Commercial Roof Sq Ft Inside Hail Swaths",
    unit: "sq ft / year",
    scopeDescription:
      "Metro-wide annual storm intersection volume across all 4 core DFW counties pending publication.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "NOAA/NWS annual MESH polygon intersection ledger",
  },
  radar_ingestion_latency: {
    id: "radar_ingestion_latency",
    label: "NWS & Radar Swath Ingestion Latency SLA",
    unit: "hours",
    scopeDescription:
      "Measured median elapsed time from NWS severe hail warning to territory brief availability.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Production pipeline telemetry audit",
  },
  storm_inspection_win_rate: {
    id: "storm_inspection_win_rate",
    label: "Post-Storm Inspection-to-Contract Rate",
    unit: "%",
    scopeDescription:
      "Verified contractor conversion rate from storm-triggered roof inspection to signed reroof contract.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Audited contractor CRM outcome cohort",
  },
  llc_entity_resolution_rate: {
    id: "llc_entity_resolution_rate",
    label: "LLC-to-Operating-Entity Resolution Rate",
    unit: "%",
    scopeDescription:
      "Share of DFW LLC parcel owners matched to active corporate operating entities across full metro roll.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Texas Secretary of State / Comptroller entity match audit",
  },
  owner_contact_match_rate: {
    id: "owner_contact_match_rate",
    label: "Verified Direct-Dial & Decision-Maker Match Rate",
    unit: "%",
    scopeDescription:
      "Verified contactability rate for facility directors and asset managers on unmasked DFW briefs.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Verified outreach deliverability & connection audit",
  },
  cad_roll_sync_cadence: {
    id: "cad_roll_sync_cadence",
    label: "DCAD & TAD Appraisal Roll Sync Cadence",
    unit: "days",
    scopeDescription:
      "Published automated refresh interval across county appraisal district roll updates.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "CAD ingestion scheduler SLA log",
  },
  total_indexed_roof_permits: {
    id: "total_indexed_roof_permits",
    label: "Total DFW Commercial Roofing Permits Indexed",
    unit: "permits",
    scopeDescription:
      "Cumulative count of parsed commercial reroof permit filings across Dallas, Irving, and neighboring cities.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Municipal commercial permit warehouse count",
  },
  unpermitted_storm_ratio: {
    id: "unpermitted_storm_ratio",
    label: "DFW-Wide Storm-Exposed Roofs Without Post-Storm Permits",
    unit: "%",
    scopeDescription:
      "Metro-wide unpermitted share beyond the 100/100 (0 permits) observed in Sector 1 & Sector 4 Top-50 dossiers.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Metro-wide storm vs. permit reconciliation report",
  },
  permit_portal_sync_lag: {
    id: "permit_portal_sync_lag",
    label: "Municipal Permit Archive Sync Lag",
    unit: "days",
    scopeDescription:
      "Measured lag between city permit issuance and Depoii property timeline update.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Municipal portal ingestion benchmark",
  },
  contractor_close_rate: {
    id: "contractor_close_rate",
    label: "Brief-to-Inspection & Contract Close Rate",
    unit: "%",
    scopeDescription:
      "Verified percentage of 10-Roof Territory Brief targets converting into roof walks and signed scopes.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Post-cohort DFW contractor reporting",
  },
  contractor_pipeline_roi: {
    id: "contractor_pipeline_roi",
    label: "Verified Contractor Pipeline ROI Multiple",
    unit: "x return",
    scopeDescription:
      "Verified ratio of awarded commercial reroof contract value to Depoii subscription cost.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Audited customer attribution study",
  },
  contractor_response_time: {
    id: "contractor_response_time",
    label: "Speed-to-Site & Estimator Turnaround Improvement",
    unit: "hours / days",
    scopeDescription:
      "Measured reduction in estimator prospecting hours between storm event and first qualified roof walk.",
    statusToken: "[VERIFIED_METRIC_PENDING]",
    attribution: "placeholder",
    requiredSource: "Contractor field workflow time study",
  },
};
