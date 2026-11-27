import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import {
  COMBINED_SECTOR1_SECTOR4_TOTALS,
  PLACEHOLDER_METRICS,
  PLATFORM_FACTS,
} from "@/lib/dfw-data";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
  buildPageMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  composeJsonLdGraph,
} from "@/lib/seo";

const PAGE_PATH = "/hail-swath-roof-intelligence";
const PAGE_TITLE = "Hail Swath Roof Intelligence for DFW Crews";
const PAGE_DESCRIPTION =
  "Overlay National Weather Service hail tracks onto 70,000+ DFW commercial roofs. Spot 1.75\"+ storm-exposed buildings with zero post-storm reroof permits.";

const FAQS = [
  {
    question: "Which weather sources power Depoii's hail swath overlays?",
    answer:
      "Depoii cross-references National Weather Service (NWS) storm reports, NOAA NWS Fort Worth convective hail warnings, and MESH hail size / kinetic energy estimates against commercial building footprints.",
  },
  {
    question: "Why pair hail tracks with roof age and municipal permit history?",
    answer:
      "A hail map alone sends estimators to buildings that already replaced their roof last year or sit under an active 20-year manufacturer warranty. Pairing storm paths with municipal permit records isolates unreplaced aging membranes.",
  },
  {
    question: "How does Depoii separate tear-off targets from warranty-active roofs?",
    answer:
      "For example, an illustrative 2002 modified bitumen roof in a 2.25\" hail path with no post-storm permit flags as a replacement fit, whereas a 2018 60-mil TPO roof under active warranty until 2038 flags for maintenance rather than tear-off.",
  },
  {
    question: "Which DFW storm corridors are covered in verified dossiers?",
    answer:
      "Verified DCAD Top-50 dossiers currently document Sector 1 (Farmers Branch, Addison, Carrollton, Irving, Coppell, North Dallas at $135.97M) and Sector 4 (Garland, Mesquite, Richardson, Rowlett at $301.28M), alongside metro-wide 70,000+ building screening.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  imagePath: "/assets/aerials/dcad-12221.jpg",
  imageAlt: "North Dallas commercial corridor roof aerial inside severe hail track",
});

export default function HailSwathRoofIntelligencePage() {
  const breadcrumbId = "https://www.depoii.com/hail-swath-roof-intelligence#breadcrumb";
  const jsonLd = composeJsonLdGraph([
    buildWebPageJsonLd({
      path: PAGE_PATH,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      breadcrumbId,
    }),
    buildServiceJsonLd({
      path: PAGE_PATH,
      name: "DFW Commercial Hail Swath Roof Intelligence",
      description: PAGE_DESCRIPTION,
      serviceType: "Commercial Storm & Hail Roof Intelligence",
      areaServed: "Dallas-Fort Worth, Texas",
    }),
    buildBreadcrumbListJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Hail Swath Roof Intelligence", path: PAGE_PATH },
      ],
      PAGE_PATH
    ),
    buildFaqPageJsonLd(FAQS, PAGE_PATH),
  ]);

  return (
    <LandingPageTemplate
      jsonLd={jsonLd}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/#ai-engine" },
        { label: "Hail Swath Roof Intelligence" },
      ]}
      hero={{
        h1: "Hail swath roof intelligence before RFPs hit.",
        subtitle:
          "Overlay National Weather Service storm tracks onto 70,000+ DFW commercial buildings to find 1.75\"+ hail-exposed roofs with zero post-storm replacement permits.",
        trustNote: `Grounded in NWS storm records, DCAD/TAD rolls, and ${COMBINED_SECTOR1_SECTOR4_TOTALS.statutoryNoticeContext}.`,
        imageSrc: "/assets/aerials/dcad-12221.jpg",
        imageAlt: "North Dallas commercial facility aerial inside storm corridor",
        imageCaption: "North Dallas Storm Corridor · 124,500 sq ft",
      }}
      verifiedMetrics={{
        heading: "Verified storm exposure & permit resolution context",
        intro:
          "Confirmed across Depoii's Sector 1 and Sector 4 Top-50 DCAD dossiers and active NWS/NOAA Fort Worth storm tracking.",
        items: [
          {
            value: "NWS + NOAA",
            label: "Storm reports & convective warnings",
            source: "National Weather Service Fort Worth & MESH hail severity data",
          },
          {
            value: '1.75"–2.25"+',
            label: "Severe convective hail corridor focus",
            source: "Paired with 0.60–0.68 J kinetic energy thresholds in dossiers",
          },
          {
            value: COMBINED_SECTOR1_SECTOR4_TOTALS.combinedPipelineShort,
            label: "Modeled unpermitted pipeline (100 assets)",
            source: "Sector 1 ($135.97M) + Sector 4 ($301.28M) DCAD Top-50 dossiers",
          },
          {
            value: "12–24 mo",
            label: "Texas Insurance Code § 542A.003 window",
            source: "Statutory commercial policyholder notice period context",
          },
        ],
      }}
      workflow={{
        heading: "Turn hail paths into qualified commercial inspections",
        intro:
          "Storm polygons alone waste estimator fuel. Depoii validates every hit building against roof age, membrane type, and city permit history.",
        pillars: [
          {
            id: "swath-intersection",
            title: "Intersect NWS hail cores with roof footprints",
            summary:
              "Identify commercial and industrial low-slope roofs sitting inside verified convective hail swaths rather than guessing zip-code boundaries.",
            imageSrc: "/assets/aerials/dcad-12221.jpg",
            imageAlt: "North Dallas storm corridor aerial",
            imageCaption: "North Dallas Storm Corridor · 124,500 sq ft",
            readoutTitle: "Storm Intersection Layer",
            readout: [
              { label: "Weather Feed", value: "NWS Storm Reports & Warnings" },
              { label: "Dossier Hail Range", value: '1.50" to 4.50" MESH cores' },
              { label: "Kinetic Impact", value: "0.60 J (Sec 1) · 0.68 J (Sec 4)" },
              { label: "Verified Assets", value: "100 assets across Sec 1 & 4", accent: true },
            ],
          },
          {
            id: "permit-verification",
            title: "Confirm zero post-storm reroof permits filed",
            summary:
              "Before routing your crew, verify that municipal commercial permit archives show no completed post-storm replacement on the parcel.",
            imageSrc: "/assets/aerials/exact-roof-split-hd.jpg",
            imageAlt: "Aerial comparison of commercial roof condition",
            imageCaption: "Post-Storm Permit & Roof Verification",
            readoutTitle: "Permit Resolution Check",
            readout: [
              { label: "Sector 1 Post-Storm Permits", value: "0 of 50 assets permitted" },
              { label: "Sector 4 Post-Storm Permits", value: "0 of 50 assets permitted" },
              { label: "Matching Rule", value: "Street # + Directional + Street" },
              { label: "Statutory Context", value: "TX Ins. Code § 542A.003", accent: true },
            ],
          },
          {
            id: "warranty-filter",
            title: "Separate tear-offs from warranty-active roofs",
            summary:
              "Avoid pitching full replacements on 6-year-old TPO assemblies while prioritizing 17-to-24-year roofs impacted by severe hail.",
            imageSrc: "/assets/aerials/dcad-4100.jpg",
            imageAlt: "Commercial warehouse roof with aging single-ply membrane",
            imageCaption: "South Dallas Industrial Corridor · 48,200 sq ft",
            readoutTitle: "Assembly Age Triage",
            readout: [
              { label: "Replacement Fit", value: "19–22 yr TPO / Mod-Bit + Hail" },
              { label: "Restoration Fit", value: "17 yr Ballasted EPDM + 1.50\" Hail" },
              { label: "Warranty Filter", value: "2018 60-mil TPO flagged maint.", accent: true },
              { label: "Walk-Sheet Delivery", value: PLATFORM_FACTS.territoryBriefOffer.deliverySla },
            ],
          },
        ],
      }}
      evidenceTable={{
        heading: "How storm signals triage illustrative DFW buildings",
        intro:
          "Compare how Depoii separates high-priority post-hail replacement prospects from warranty-active maintenance accounts using public permit and weather data.",
        badgeText: "Illustrative DFW Sample Profiles",
        columns: [
          "Sample Building",
          "Roof Assembly & Age",
          "Hail Signal",
          "Triage Action",
          "Win Rate KPI",
        ],
        rows: [
          {
            rowKey: "inwood-storm",
            cells: [
              "14201 Inwood Rd · North Dallas",
              "22-yr Mod-Bit (84,000 sq ft)",
              '2.25" Direct Hail Track · No permit',
              "Priority Tear-Off Pitch ($1.18M)",
              {
                placeholderLabel: PLACEHOLDER_METRICS.storm_inspection_win_rate.label,
                templateId: "storm_inspection_win_rate",
                unitHint: PLACEHOLDER_METRICS.storm_inspection_win_rate.unit,
              },
            ],
          },
          {
            rowKey: "central-storm",
            cells: [
              "8600 S Central Expy · South Dallas",
              "19-yr TPO (48,200 sq ft)",
              '1.75" Hail Nearby · No permit',
              "20-Yr Lifecycle + Storm Pitch ($674.8k)",
              {
                placeholderLabel: PLACEHOLDER_METRICS.storm_inspection_win_rate.label,
                templateId: "storm_inspection_win_rate",
                unitHint: PLACEHOLDER_METRICS.storm_inspection_win_rate.unit,
              },
            ],
          },
          {
            rowKey: "airport-storm",
            cells: [
              "2200 E Airport Fwy · Irving",
              "17-yr Ballasted EPDM (32,500 sq ft)",
              '1.50" Hail Nearby · No permit',
              "Coating / Re-Roof Fit ($455k)",
              {
                placeholderLabel: PLACEHOLDER_METRICS.storm_inspection_win_rate.label,
                templateId: "storm_inspection_win_rate",
                unitHint: PLACEHOLDER_METRICS.storm_inspection_win_rate.unit,
              },
            ],
          },
          {
            rowKey: "sovereign-warranty",
            cells: [
              "7505 Sovereign Row · Dallas",
              "6-yr 60-mil TPO (52,400 sq ft)",
              '0.75" Edge Hail · Active 2038 warranty',
              "Maintenance Check Only ($84k/yr)",
              {
                placeholderLabel: PLACEHOLDER_METRICS.storm_inspection_win_rate.label,
                templateId: "storm_inspection_win_rate",
                unitHint: PLACEHOLDER_METRICS.storm_inspection_win_rate.unit,
              },
            ],
          },
        ],
        footnote:
          "Rows reflect illustrative DFW sample profiles from Depoii's workspace demonstration. Verified institutional parcel rosters appear in our DFW Commercial Roof Storm Exposure Study.",
        comparisonImages: [
          {
            src: "/assets/aerials/exact-roof-split-alt.jpg",
            alt: "Split aerial view of commercial roof membrane condition",
            caption: "Membrane lifecycle verification before crew dispatch",
          },
          {
            src: "/assets/aerials/dcad-2501.jpg",
            alt: "Industrial roof envelope in Valwood DFW submarket",
            caption: "Low-slope commercial roof footprint screening",
          },
        ],
      }}
      placeholderKpis={{
        heading: "Storm pipeline telemetry pending verification",
        intro:
          "Metro-wide annual hail volume, ingestion SLA latency, and verified post-storm close rates are held in structured placeholder slots until audited.",
        items: [
          {
            label: PLACEHOLDER_METRICS.annual_dfw_hail_swath_sqft.label,
            templateId: PLACEHOLDER_METRICS.annual_dfw_hail_swath_sqft.id,
            description: PLACEHOLDER_METRICS.annual_dfw_hail_swath_sqft.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.annual_dfw_hail_swath_sqft.unit,
          },
          {
            label: PLACEHOLDER_METRICS.radar_ingestion_latency.label,
            templateId: PLACEHOLDER_METRICS.radar_ingestion_latency.id,
            description: PLACEHOLDER_METRICS.radar_ingestion_latency.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.radar_ingestion_latency.unit,
          },
          {
            label: PLACEHOLDER_METRICS.storm_inspection_win_rate.label,
            templateId: PLACEHOLDER_METRICS.storm_inspection_win_rate.id,
            description: PLACEHOLDER_METRICS.storm_inspection_win_rate.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.storm_inspection_win_rate.unit,
          },
        ],
      }}
      faqs={{
        heading: "Questions about hail swath roof intelligence",
        intro: "How NWS storm tracking integrates with DFW appraisal and permit archives.",
        items: FAQS,
      }}
      relatedLinks={{
        heading: "Explore verified DFW storm research and permit timelines",
        intro:
          "Inspect the underlying 100-asset DCAD storm study or trace municipal permit timelines across Dallas and Irving.",
        items: [
          {
            title: "DFW Commercial Roof Storm Exposure Study",
            description:
              "100 verified institutional DCAD assets across Sector 1 and Sector 4 with zero post-storm permits filed.",
            href: "/research/dfw-commercial-roof-storm-exposure-study",
            ctaLabel: "Read the data study",
          },
          {
            title: "Permit History for Commercial Roofs",
            description:
              "Check 20-year installation dates, membrane assemblies, and post-storm permit status before bidding.",
            href: "/permit-history-commercial-roofs",
            ctaLabel: "Explore permit timelines",
          },
          {
            title: "DFW Territory Brief Case Study",
            description:
              "See how 4 illustrative sample property scenarios translate storm and age signals into estimator briefs.",
            href: "/case-studies/dfw-commercial-roofing-territory-brief",
            ctaLabel: "View territory brief workflow",
          },
        ],
      }}
      bottomCta={{
        heading: "Spot unpermitted storm-exposed roofs in your corridor.",
        body: "Request a 10-Roof Territory Brief filtered to recent hail tracks and your crew's target roof sizes.",
      }}
    />
  );
}
