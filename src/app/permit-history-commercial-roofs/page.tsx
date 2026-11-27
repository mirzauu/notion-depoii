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

const PAGE_PATH = "/permit-history-commercial-roofs";
const PAGE_TITLE = "Permit History for Commercial Roofs in DFW";
const PAGE_DESCRIPTION =
  "Check 20-year commercial roof installation dates, membrane specs, and post-storm permit status across Dallas and Irving before bidding.";

const FAQS = [
  {
    question: "Why do 20-year historical permit timelines beat live permit lead lists?",
    answer:
      "Live permit feeds only notify you after a competitor already signed the contract and pulled the city permit. Historical permit archives from 19–24 years ago reveal roofs approaching end-of-life today with zero active replacement underway.",
  },
  {
    question: "What specifications appear in municipal commercial roof permit records?",
    answer:
      "Recorded filings often capture filing year, permit ID (such as Dallas #05-88219 or Irving #07-33120), roof assembly details like 45-mil/60-mil TPO, ballasted EPDM, or 2-ply SBS modified bitumen, and scope type.",
  },
  {
    question: "How does permit history prevent estimators from pitching 6-year-old roofs?",
    answer:
      "When a building pulled a 60-mil TPO replacement permit in 2018 (carrying an active warranty through 2038), Depoii disqualifies it from tear-off outreach and marks it for routine inspection or maintenance instead.",
  },
  {
    question: "How does Depoii avoid cross-lot permit matching errors?",
    answer:
      "Depoii enforces strict address-token matching requiring exact Street Number, Directional Prefix (N/S/E/W), and Street Name rather than loose radius matching, preventing adjacent parcel permits from distorting a building's status.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  imagePath: "/assets/aerials/exact-roof-split-hd.jpg",
  imageAlt: "Side-by-side aerial roof verification against municipal permit timeline",
});

export default function PermitHistoryCommercialRoofsPage() {
  const breadcrumbId = "https://www.depoii.com/permit-history-commercial-roofs#breadcrumb";
  const jsonLd = composeJsonLdGraph([
    buildWebPageJsonLd({
      path: PAGE_PATH,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      breadcrumbId,
    }),
    buildServiceJsonLd({
      path: PAGE_PATH,
      name: "DFW Commercial Roof Permit History Intelligence",
      description: PAGE_DESCRIPTION,
      serviceType: "Commercial Roofing Permit & Lifecycle Intelligence",
      areaServed: "Dallas-Fort Worth, Texas",
    }),
    buildBreadcrumbListJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Permit History for Commercial Roofs", path: PAGE_PATH },
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
        { label: "Solutions", href: "/#platform" },
        { label: "Permit History for Commercial Roofs" },
      ]}
      hero={{
        h1: "Permit history for commercial roofs across DFW.",
        subtitle:
          "Check 20-year municipal roofing permit dates, membrane specifications, and post-storm reroof status across Dallas and Irving before sending an estimator on site.",
        trustNote: `Zero post-storm reroof permits found across all ${COMBINED_SECTOR1_SECTOR4_TOTALS.totalAssets} assets in verified Sector 1 & Sector 4 dossiers.`,
        imageSrc: "/assets/aerials/exact-roof-split-hd.jpg",
        imageAlt: "Aerial comparison of commercial roof assembly and historical timeline",
        imageCaption: "Roof Compare · Historical Permit & Assembly Verification",
      }}
      verifiedMetrics={{
        heading: "20-year lifecycle & municipal permit benchmarks",
        intro:
          "Historical permit timelines anchor every roof age estimate in Depoii's DFW workspace and DCAD storm dossiers.",
        items: [
          {
            value: `${PLATFORM_FACTS.lifecycleHorizonYears}-year`,
            label: "Commercial membrane replacement horizon",
            source: "19 to 24 year typical window tracked in Depoii workspace",
          },
          {
            value: "Dallas & Irving",
            label: "Municipal commercial permit archives",
            source: "Verified in workspace timelines (#05-88219, #02-19402, #18-44910, #07-33120)",
          },
          {
            value: "0 permits",
            label: "Post-storm reroofs across 100 dossier assets",
            source: "50/50 Sector 1 & 50/50 Sector 4 assets unresolved post-storm",
          },
          {
            value: "4 systems",
            label: "Tracked commercial roof assemblies",
            source: "TPO, Ballasted EPDM, Modified Bitumen (SBS), and Coatings",
          },
        ],
      }}
      workflow={{
        heading: "How municipal permit timelines qualify your pipeline",
        intro:
          "Pairing historical install dates with recent NWS storm data keeps crews off warranty-active roofs and onto true replacement candidates.",
        pillars: [
          {
            id: "twenty-year-window",
            title: "Surface 2002–2007 installs hitting replacement age",
            summary:
              "Pinpoint commercial roofs permitted 17 to 22 years ago that are now entering natural membrane end-of-life or restoration eligibility.",
            imageSrc: "/assets/aerials/exact-roof-split-hd.jpg",
            imageAlt: "Roof condition split comparison",
            imageCaption: "19–22 Year Replacement Window Verification",
            readoutTitle: "Lifecycle Permit Signal",
            readout: [
              { label: "Target Window", value: `${PLATFORM_FACTS.lifecycleWindowLabel} post-install` },
              { label: "Sample Filings", value: "2002–2007 Dallas & Irving" },
              { label: "Assemblies", value: "45-mil TPO, Mod-Bit, EPDM" },
              { label: "Post-Storm Check", value: "No replacement filed", accent: true },
            ],
          },
          {
            id: "strict-address-matching",
            title: "Strict address-token permit matching",
            summary:
              "Every permit requires exact Street Number, Directional Prefix, and Street Name matching—preventing cross-lot false positives in multi-building parks.",
            imageSrc: "/assets/aerials/exact-roof-split-alt.jpg",
            imageAlt: "Secondary aerial roof inspection angle",
            imageCaption: "Strict Parcel-to-Permit Address Matching",
            readoutTitle: "Address Token Guardrail",
            readout: [
              { label: "Token 1", value: "Exact Street Number match" },
              { label: "Token 2", value: "Exact Directional (N/S/E/W)" },
              { label: "Token 3", value: "Exact Street Name match" },
              { label: "Radius Guessing", value: "Zero cross-lot linking", accent: true },
            ],
          },
          {
            id: "warranty-disqualification",
            title: "Filter out recent 2018+ tear-offs automatically",
            summary:
              "Spot buildings with recent reroof permits so estimators never pitch tear-offs on 6-year-old roofs still under manufacturer warranty.",
            imageSrc: "/assets/aerials/dcad-outside.jpg",
            imageAlt: "Commercial building verified for recent roof permit",
            imageCaption: "Warranty-Active Roof Screening",
            readoutTitle: "Warranty & Maintenance Triage",
            readout: [
              { label: "Recent Permit Example", value: "Dallas #18-44910 (2018)" },
              { label: "Installed Spec", value: "60-mil White TPO (52,400 sq ft)" },
              { label: "Warranty Horizon", value: "Active until 2038" },
              { label: "Recommended Pitch", value: "Annual maintenance only", accent: true },
            ],
          },
        ],
      }}
      evidenceTable={{
        heading: "Illustrative 20-year commercial permit timelines",
        intro:
          "See how municipal permit numbers, installation dates, and membrane specs determine whether a roof is ready for replacement, coating, or maintenance.",
        badgeText: "Illustrative 20-Yr Permit Timelines",
        columns: [
          "Sample Building",
          "Recorded Permit Filing",
          "Roof System & Age",
          "Current Window",
          "Archive Sync KPI",
        ],
        rows: [
          {
            rowKey: "central-permit",
            cells: [
              "8600 S Central Expy · Dallas",
              "Dallas #05-88219 (2005)",
              "45-mil TPO · 19 yrs",
              "20-yr window · No post-storm reroof",
              {
                placeholderLabel: PLACEHOLDER_METRICS.permit_portal_sync_lag.label,
                templateId: "permit_portal_sync_lag",
                unitHint: PLACEHOLDER_METRICS.permit_portal_sync_lag.unit,
              },
            ],
          },
          {
            rowKey: "inwood-permit",
            cells: [
              "14201 Inwood Rd · Dallas",
              "Dallas #02-19402 (2002)",
              "2-Ply SBS Mod-Bit · 22 yrs",
              'Past 20-yr mark · 2.25" Hail',
              {
                placeholderLabel: PLACEHOLDER_METRICS.permit_portal_sync_lag.label,
                templateId: "permit_portal_sync_lag",
                unitHint: PLACEHOLDER_METRICS.permit_portal_sync_lag.unit,
              },
            ],
          },
          {
            rowKey: "sovereign-permit",
            cells: [
              "7505 Sovereign Row · Dallas",
              "Dallas #18-44910 (2018)",
              "60-mil White TPO · 6 yrs",
              "Active warranty until 2038",
              {
                placeholderLabel: PLACEHOLDER_METRICS.permit_portal_sync_lag.label,
                templateId: "permit_portal_sync_lag",
                unitHint: PLACEHOLDER_METRICS.permit_portal_sync_lag.unit,
              },
            ],
          },
          {
            rowKey: "airport-permit",
            cells: [
              "2200 E Airport Fwy · Irving",
              "Irving #07-33120 (2007)",
              "45-mil Ballasted EPDM · 17 yrs",
              "Coating / Re-Roof Fit",
              {
                placeholderLabel: PLACEHOLDER_METRICS.permit_portal_sync_lag.label,
                templateId: "permit_portal_sync_lag",
                unitHint: PLACEHOLDER_METRICS.permit_portal_sync_lag.unit,
              },
            ],
          },
        ],
        footnote:
          "Permit numbers above reflect illustrative DFW sample profiles from Depoii's workspace timeline. Institutional Top-50 dossiers verify 0 post-storm reroof permits across 100 Dallas County assets.",
        comparisonImages: [
          {
            src: "/assets/aerials/dcad-4100.jpg",
            alt: "Commercial warehouse roof with 2005 Dallas permit example",
            caption: "8600 S Central Expy · 19-year TPO lifecycle example",
          },
          {
            src: "/assets/aerials/dcad-16850.jpg",
            alt: "Large industrial terminal roof for permit and age audit",
            caption: "Logistics Terminal · Pre-bid permit history check",
          },
        ],
      }}
      placeholderKpis={{
        heading: "Metro permit archive metrics pending verification",
        intro:
          "Aggregate metro-wide permit counts, DFW-wide unpermitted ratios, and municipal sync-lag SLAs are marked pending until full-roll reconciliation is published.",
        items: [
          {
            label: PLACEHOLDER_METRICS.total_indexed_roof_permits.label,
            templateId: PLACEHOLDER_METRICS.total_indexed_roof_permits.id,
            description: PLACEHOLDER_METRICS.total_indexed_roof_permits.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.total_indexed_roof_permits.unit,
          },
          {
            label: PLACEHOLDER_METRICS.unpermitted_storm_ratio.label,
            templateId: PLACEHOLDER_METRICS.unpermitted_storm_ratio.id,
            description: PLACEHOLDER_METRICS.unpermitted_storm_ratio.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.unpermitted_storm_ratio.unit,
          },
          {
            label: PLACEHOLDER_METRICS.permit_portal_sync_lag.label,
            templateId: PLACEHOLDER_METRICS.permit_portal_sync_lag.id,
            description: PLACEHOLDER_METRICS.permit_portal_sync_lag.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.permit_portal_sync_lag.unit,
          },
        ],
      }}
      faqs={{
        heading: "Questions about commercial roof permit history",
        intro: "How historical city permits inform pre-RFP commercial roofing outreach.",
        items: FAQS,
      }}
      relatedLinks={{
        heading: "Pair permit timelines with hail tracks and owner trails",
        intro:
          "Combine municipal work history with NWS weather corridors and verified DCAD institutional studies.",
        items: [
          {
            title: "Hail Swath Roof Intelligence",
            description:
              "Find aging roofs inside 1.75\"+ hail tracks where no post-storm permit has been filed.",
            href: "/hail-swath-roof-intelligence",
            ctaLabel: "Explore hail intelligence",
          },
          {
            title: "Commercial Property Owner Lookup",
            description:
              "Connect DCAD/TAD tax rolls to operating corporate entities and facility roles.",
            href: "/commercial-property-owner-lookup",
            ctaLabel: "Explore owner lookup",
          },
          {
            title: "DFW Storm Exposure Data Study",
            description:
              "Inspect all 100 verified DCAD Sector 1 & Sector 4 assets with 0 post-storm permits.",
            href: "/research/dfw-commercial-roof-storm-exposure-study",
            ctaLabel: "Read the data study",
          },
        ],
      }}
      bottomCta={{
        heading: "Check roof age and permit gaps across your DFW corridors.",
        body: "Request a 10-Roof Territory Brief within 24 hours—each building screened for age, storm exposure, and post-storm permit status.",
      }}
    />
  );
}
