import type { Metadata } from "next";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";
import { PLACEHOLDER_METRICS, PLATFORM_FACTS } from "@/lib/dfw-data";
import {
  buildBreadcrumbListJsonLd,
  buildFaqPageJsonLd,
  buildPageMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  composeJsonLdGraph,
} from "@/lib/seo";

const PAGE_PATH = "/dfw-commercial-roofing-leads";
const PAGE_TITLE = "DFW Commercial Roofing Leads | Target 70,000+ Roofs";
const PAGE_DESCRIPTION =
  "Filter 70,000+ Dallas-Fort Worth commercial roofs by square footage, roof age, NWS hail track, and municipal permit history. Get a 10-Roof Territory Brief in 24 hours.";

const FAQS = [
  {
    question: "How does Depoii filter beyond cold parcel exports or permit lists?",
    answer:
      "Raw parcel exports dump tens of thousands of addresses with no urgency, while live permit alerts only tell you another contractor already won the job. Depoii combines building square footage, 20-year permit timelines, NWS hail corridors, and corporate ownership trails to surface roofs ready for inspection now.",
  },
  {
    question: "Which DFW building sizes and roof systems are supported?",
    answer:
      "You can filter across 25,000–50,000 sq ft, 50,000–150,000 sq ft, and 150,000+ sq ft industrial footprints, with a core sweet spot of 45,000 to 150,000 sq ft. Target systems include TPO, ballasted EPDM, modified bitumen, and fluid-applied coatings.",
  },
  {
    question: "What arrives in the 10-Roof Territory Brief within 24 hours?",
    answer:
      "You submit your roofing company name, target DFW corridors, and preferred square-footage band—no card required. Within 24 hours, Depoii delivers a 10-roof estimator walk-sheet with roof age, hail exposure, municipal permit status, and unmasked owner entity records.",
  },
  {
    question: "How do Growth claim locks and Enterprise territory locks work?",
    answer:
      "Starter ($249/mo annual) includes 300 monthly credits and 1 seat with no lock. Growth ($599/mo annual) adds 1,000 monthly credits, 3 seats, and a 27-day claim lock on pursued properties. Enterprise ($1,299/mo annual) adds 2,500 monthly credits, 10 seats, and 1 Exclusive Territory Lock, while workspace access is capped at 2 contractors per territory.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  imagePath: "/assets/aerials/dcad-2501.jpg",
  imageAlt: "Dallas-Fort Worth commercial industrial roof aerial in Valwood corridor",
});

export default function DfwCommercialRoofingLeadsPage() {
  const breadcrumbId = "https://www.depoii.com/dfw-commercial-roofing-leads#breadcrumb";
  const jsonLd = composeJsonLdGraph([
    buildWebPageJsonLd({
      path: PAGE_PATH,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      breadcrumbId,
    }),
    buildServiceJsonLd({
      path: PAGE_PATH,
      name: "DFW Commercial Roofing Leads & Territory Intelligence",
      description: PAGE_DESCRIPTION,
      serviceType: "Commercial Roofing Territory Intelligence",
      areaServed: "Dallas-Fort Worth, Texas",
    }),
    buildBreadcrumbListJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "DFW Commercial Roofing Leads", path: PAGE_PATH },
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
        { label: "DFW Commercial Roofing Leads" },
      ]}
      hero={{
        h1: "DFW commercial roofing leads built for crews.",
        subtitle:
          "Filter 70,000+ Dallas–Fort Worth commercial roofs by square footage, roof system, 20-year permit history, and National Weather Service hail tracks before jobs go to bid.",
        trustNote: `10-Roof Territory Brief delivered ${PLATFORM_FACTS.territoryBriefOffer.deliverySla.toLowerCase()} · No card required · Workspace access capped at ${PLATFORM_FACTS.territoryCap}.`,
        imageSrc: "/assets/aerials/dcad-2501.jpg",
        imageAlt: "Commercial warehouse low-slope roof aerial in DFW industrial corridor",
        imageCaption: "Valwood Industrial Corridor · 68,400 sq ft",
      }}
      verifiedMetrics={{
        heading: "Verified DFW scale and planning benchmarks",
        intro:
          "Every brief starts from verified public appraisal rolls, municipal commercial permit archives, and National Weather Service storm records.",
        items: [
          {
            value: PLATFORM_FACTS.coverageScale,
            label: "DFW commercial buildings indexed",
            source: "Depoii active Dallas–Fort Worth platform coverage",
          },
          {
            value: PLATFORM_FACTS.targetSqFtFloor,
            label: "Commercial & industrial footprint bands",
            source: "25k–50k, 50k–150k, and 150k+ sq ft crew filters",
          },
          {
            value: `$${PLATFORM_FACTS.uiBenchmarkRatePerSqFt}/sq ft`,
            label: "Commercial scope planning benchmark",
            source: "Depoii estimator planning model ($14.50/sq ft in DCAD dossiers)",
          },
          {
            value: "24 hours",
            label: "Custom 10-Roof Territory Brief turnaround",
            source: "Delivered to your estimating team with no card required",
          },
        ],
      }}
      workflow={{
        heading: "How Depoii matches commercial roofs to your crew",
        intro:
          "Instead of sorting generic spreadsheets, estimators inspect qualified DFW buildings backed by lifecycle and weather proof.",
        pillars: [
          {
            id: "crew-sweet-spot",
            title: "Filter by crew size and membrane spec",
            summary:
              "Focus exclusively on 25,000+ sq ft commercial and industrial roofs matching your production capacity across TPO, EPDM, modified bitumen, or coatings.",
            imageSrc: "/assets/aerials/dcad-2501.jpg",
            imageAlt: "Valwood industrial commercial roof target",
            imageCaption: "Valwood Industrial Corridor · 68,400 sq ft",
            readoutTitle: "Crew Target Match",
            readout: [
              { label: "Target Corridor", value: "Irving / North Dallas" },
              { label: "Footprint Sweet Spot", value: PLATFORM_FACTS.targetSweetSpot },
              { label: "Preferred Assemblies", value: "TPO, EPDM, Mod-Bit & Coatings" },
              { label: "Territory Cap", value: PLATFORM_FACTS.territoryCap, accent: true },
            ],
          },
          {
            id: "storm-lifecycle",
            title: "Pair 20-year roof age with NWS hail paths",
            summary:
              "Spot aging single-ply and modified bitumen roofs that sat inside recent 1.50\" to 2.25\"+ hail tracks with zero post-storm replacement permits.",
            imageSrc: "/assets/aerials/dcad-12221.jpg",
            imageAlt: "North Dallas commercial warehouse roof in storm corridor",
            imageCaption: "North Dallas Storm Corridor · 124,500 sq ft",
            readoutTitle: "Lifecycle & Weather Fit",
            readout: [
              { label: "Lifecycle Horizon", value: `${PLATFORM_FACTS.lifecycleWindowLabel} window` },
              { label: "Weather Source", value: "NWS Storm Reports & Warnings" },
              { label: "Post-Storm Permit Check", value: "Zero replacement permits found", accent: true },
              { label: "Exclusion Guard", value: "Filters out active warranties" },
            ],
          },
          {
            id: "estimator-receipts",
            title: "Walk in with public records, not cold guesses",
            summary:
              "Every recommended building includes DCAD/TAD appraisal data, municipal permit timelines, and Texas corporate entity trails.",
            imageSrc: "/assets/aerials/dcad-16850.jpg",
            imageAlt: "Denton logistics terminal flat commercial roof",
            imageCaption: "Denton Logistics Terminal · 142,000 sq ft",
            readoutTitle: "Public Record Provenance",
            readout: [
              { label: "Appraisal Rolls", value: "Dallas CAD (DCAD) & Tarrant CAD (TAD)" },
              { label: "Permit Archives", value: "Dallas & Irving commercial records" },
              { label: "Ownership Layer", value: "Texas Corporate Entity filings" },
              { label: "Brief Turnaround", value: PLATFORM_FACTS.territoryBriefOffer.deliverySla, accent: true },
            ],
          },
        ],
      }}
      evidenceTable={{
        heading: "Sample DFW commercial roofing targets",
        intro:
          "Below are illustrative DFW commercial building profiles from our workspace walkthrough showing how square footage, roof age, storm proximity, and permit history combine.",
        badgeText: "Illustrative DFW Sample Profiles",
        columns: [
          "Property & Submarket",
          "Footprint",
          "Roof Age & System",
          "Storm / Permit Signal",
          "Est. Benchmark Scope",
          "Outcome KPI",
        ],
        rows: [
          {
            rowKey: "central-expy",
            cells: [
              "8600 S Central Expy · South Dallas",
              "48,200 sq ft",
              "19 yrs · TPO",
              '1.75" Hail · No reroof',
              "$674,800",
              {
                placeholderLabel: PLACEHOLDER_METRICS.contractor_close_rate.label,
                templateId: "contractor_close_rate",
                unitHint: PLACEHOLDER_METRICS.contractor_close_rate.unit,
              },
            ],
          },
          {
            rowKey: "inwood-rd",
            cells: [
              "14201 Inwood Rd · North Dallas",
              "84,000 sq ft",
              "22 yrs · Mod-Bit",
              '2.25" Hail · No reroof',
              "$1,180,000",
              {
                placeholderLabel: PLACEHOLDER_METRICS.contractor_close_rate.label,
                templateId: "contractor_close_rate",
                unitHint: PLACEHOLDER_METRICS.contractor_close_rate.unit,
              },
            ],
          },
          {
            rowKey: "valwood-pkwy",
            cells: [
              "1685 Valwood Pkwy · Carrollton",
              "68,400 sq ft",
              "20 yrs · TPO",
              "20-yr window · No reroof",
              "$957,000 est.",
              {
                placeholderLabel: PLACEHOLDER_METRICS.contractor_close_rate.label,
                templateId: "contractor_close_rate",
                unitHint: PLACEHOLDER_METRICS.contractor_close_rate.unit,
              },
            ],
          },
          {
            rowKey: "riverside-dr",
            cells: [
              "3201 Riverside Dr · Irving",
              "124,500 sq ft",
              "18 yrs · TPO",
              "Storm swath · Unreplaced",
              "$1.74M est.",
              {
                placeholderLabel: PLACEHOLDER_METRICS.contractor_close_rate.label,
                templateId: "contractor_close_rate",
                unitHint: PLACEHOLDER_METRICS.contractor_close_rate.unit,
              },
            ],
          },
          {
            rowKey: "airport-fwy",
            cells: [
              "2200 E Airport Fwy · Irving",
              "32,500 sq ft",
              "17 yrs · EPDM",
              '1.50" Hail · No reroof',
              "$455,000",
              {
                placeholderLabel: PLACEHOLDER_METRICS.contractor_close_rate.label,
                templateId: "contractor_close_rate",
                unitHint: PLACEHOLDER_METRICS.contractor_close_rate.unit,
              },
            ],
          },
        ],
        footnote:
          "Note: Table rows above are illustrative DFW sample profiles modeled at Depoii's $14/sq ft UI planning benchmark for workflow demonstration—not formal engineering bids.",
        comparisonImages: [
          {
            src: "/assets/aerials/dcad-4100.jpg",
            alt: "South Dallas commercial distribution facility roof aerial",
            caption: "8600 S Central Expy · Illustrative 48,200 sq ft TPO profile",
          },
          {
            src: "/assets/aerials/dcad-outside.jpg",
            alt: "Stemmons corridor commercial property roof aerial",
            caption: "11411 Stemmons Fwy · Illustrative North Dallas corridor profile",
          },
        ],
      }}
      placeholderKpis={{
        heading: "Metrics pending verified cohort publication",
        intro:
          "Depoii publishes only verified public records and audited figures. County-wide metro splits and contractor conversion benchmarks remain explicitly templated until verified data is published.",
        items: [
          {
            label: PLACEHOLDER_METRICS.dfw_county_breakdown.label,
            templateId: PLACEHOLDER_METRICS.dfw_county_breakdown.id,
            description: PLACEHOLDER_METRICS.dfw_county_breakdown.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.dfw_county_breakdown.unit,
          },
          {
            label: PLACEHOLDER_METRICS.contractor_close_rate.label,
            templateId: PLACEHOLDER_METRICS.contractor_close_rate.id,
            description: PLACEHOLDER_METRICS.contractor_close_rate.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.contractor_close_rate.unit,
          },
          {
            label: PLACEHOLDER_METRICS.contractor_pipeline_roi.label,
            templateId: PLACEHOLDER_METRICS.contractor_pipeline_roi.id,
            description: PLACEHOLDER_METRICS.contractor_pipeline_roi.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.contractor_pipeline_roi.unit,
          },
        ],
      }}
      faqs={{
        heading: "Frequently asked questions about DFW commercial roofing leads",
        intro:
          "Details on building filters, territory exclusivity, and what arrives in your 10-Roof Territory Brief.",
        items: FAQS,
      }}
      relatedLinks={{
        heading: "Explore related territory intelligence",
        intro:
          "Combine crew-fit filtering with storm track overlays, corporate owner tracing, and verified Dallas County dossiers.",
        items: [
          {
            title: "Hail Swath Roof Intelligence",
            description:
              "Overlay National Weather Service hail tracks onto aging commercial roofs with zero post-storm reroof permits.",
            href: "/hail-swath-roof-intelligence",
            ctaLabel: "Explore hail intelligence",
          },
          {
            title: "DFW Storm Exposure Data Study",
            description:
              "Review 100 verified institutional DCAD assets totaling 30,155,466 sq ft of low-slope roof envelope and $437.25M in modeled scope.",
            href: "/research/dfw-commercial-roof-storm-exposure-study",
            ctaLabel: "Read the DFW study",
          },
          {
            title: "Workspace Plans & Territory Locks",
            description:
              "Compare Starter ($249/mo), Growth ($599/mo with 27-day claim lock), and Enterprise ($1,299/mo exclusive lock).",
            href: "/#pricing",
            ctaLabel: "View plans & pricing",
          },
        ],
      }}
      bottomCta={{
        heading: "Get 10 DFW commercial roofs matched to your crew.",
        body: "Send us your target corridors and square-footage band. We deliver your 10-Roof Territory Brief within 24 hours with zero card required.",
      }}
    />
  );
}
