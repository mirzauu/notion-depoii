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

const PAGE_PATH = "/commercial-property-owner-lookup";
const PAGE_TITLE = "Commercial Property Owner Lookup for DFW Roofs";
const PAGE_DESCRIPTION =
  "Trace commercial building LLCs on DCAD and TAD appraisal rolls to Texas corporate operating entities and facility roles across 70,000+ DFW roofs.";

const FAQS = [
  {
    question: "Which public appraisal and corporate sources does Depoii use in DFW?",
    answer:
      "Depoii indexes Dallas Central Appraisal District (DCAD) and Tarrant Appraisal District (TAD) commercial building rolls alongside Texas Corporate Entity Ownership Records so estimators see both the parcel owner of record and corporate trail.",
  },
  {
    question: "How do entity trails help estimators skip generic parcel mailings?",
    answer:
      "Most commercial properties are held inside single-purpose LLCs or LPs whose tax-mailing addresses point to out-of-state holding offices. Tracing the entity trail to the operating company and target decision role (such as VP of Asset Management or Director of Facilities) keeps outreach focused.",
  },
  {
    question: "Does Depoii support multi-building REIT and industrial portfolios?",
    answer:
      "Yes. In verified Sector 1 and Sector 4 DCAD dossiers, institutional owners such as Sandy Lake Road Dev Co, Lit Hw1 Lp, and Prologis appear across multiple high-square-footage assets, allowing reps to spot portfolio-level roof exposure.",
  },
  {
    question: "How are owner trails delivered in the 10-Roof Territory Brief?",
    answer:
      "Within 24 hours of submitting your target DFW corridors and square-footage band, you receive 10 matched commercial buildings with unmasked DCAD/TAD owner records, operating entity context, and storm/permit citations.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  imagePath: "/assets/aerials/dcad-outside.jpg",
  imageAlt: "Stemmons corridor commercial property linked to DCAD corporate ownership trail",
});

export default function CommercialPropertyOwnerLookupPage() {
  const breadcrumbId = "https://www.depoii.com/commercial-property-owner-lookup#breadcrumb";
  const jsonLd = composeJsonLdGraph([
    buildWebPageJsonLd({
      path: PAGE_PATH,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      breadcrumbId,
    }),
    buildServiceJsonLd({
      path: PAGE_PATH,
      name: "DFW Commercial Property Owner & Entity Lookup",
      description: PAGE_DESCRIPTION,
      serviceType: "Commercial Property Ownership Intelligence",
      areaServed: "Dallas-Fort Worth, Texas",
    }),
    buildBreadcrumbListJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Commercial Property Owner Lookup", path: PAGE_PATH },
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
        { label: "Commercial Property Owner Lookup" },
      ]}
      hero={{
        h1: "Commercial property owner lookup beyond LLC shells.",
        subtitle:
          "Connect Dallas CAD and Tarrant CAD commercial tax rolls to Texas corporate entity records so your reps reach facility directors instead of dead-end holding LLCs.",
        trustNote: `10 unmasked DFW owner-entity roofs delivered ${PLATFORM_FACTS.territoryBriefOffer.deliverySla.toLowerCase()} · DCAD, TAD & TX Corporate Records.`,
        imageSrc: "/assets/aerials/dcad-outside.jpg",
        imageAlt: "Commercial industrial building along Stemmons corridor in Dallas",
        imageCaption: "11411 Stemmons Fwy · DCAD Ownership Trail",
      }}
      verifiedMetrics={{
        heading: "Public appraisal and corporate registry coverage",
        intro:
          "Ownership intelligence is built directly from county appraisal district filings and Texas corporate entity trails.",
        items: [
          {
            value: "DCAD & TAD",
            label: "Certified commercial building rolls",
            source: "Dallas Central Appraisal District & Tarrant Appraisal District",
          },
          {
            value: "TX Corporate",
            label: "Texas corporate entity ownership trails",
            source: "Public entity filings linked to holding LLCs & LPs",
          },
          {
            value: PLATFORM_FACTS.coverageScale,
            label: "Indexed DFW commercial roofs",
            source: "Each building tied to county account & owner of record",
          },
          {
            value: "10 roofs",
            label: "Unmasked owner-entity brief in 24 hours",
            source: "Prepared for your target DFW corridors, no card required",
          },
        ],
      }}
      workflow={{
        heading: "From county parcel ID to the operating decision-maker",
        intro:
          "Appraisal records list the legal titleholder, not always the local team managing roof CapEx. Depoii maps the trail clearly.",
        pillars: [
          {
            id: "dcad-tad-link",
            title: "Deterministic DCAD & TAD account linking",
            summary:
              "Every Dallas County asset resolves directly to its certified DCAD commercial account record (AcctDetailCom.aspx?ID=) with zero guesswork.",
            imageSrc: "/assets/aerials/dcad-outside.jpg",
            imageAlt: "Stemmons corridor building linked to DCAD",
            imageCaption: "Stemmons Corridor · Certified CAD Roll",
            readoutTitle: "Appraisal Record Link",
            readout: [
              { label: "County Rolls", value: "DCAD & TAD Certified Commercial" },
              { label: "Account Resolution", value: "Direct parcel & account ID" },
              { label: "Tax-Mailing Guardrail", value: "Separates owner ZIP vs site" },
              { label: "Verification", value: "Deterministic CAD link", accent: true },
            ],
          },
          {
            id: "llc-entity-trail",
            title: "Trace holding LLCs to operating portfolios",
            summary:
              "Connect single-asset LLCs and LPs to Texas corporate ownership filings and multi-property industrial or REIT portfolios.",
            imageSrc: "/assets/aerials/dcad-16850.jpg",
            imageAlt: "Industrial distribution hub in Denton",
            imageCaption: "Denton Logistics Terminal · Corporate Trail",
            readoutTitle: "Corporate Entity Trail",
            readout: [
              { label: "Registry Source", value: "Texas Corporate Entity Records" },
              { label: "Portfolio Visibility", value: "Multi-site owner grouping" },
              { label: "Target Roles", value: "VP Asset Mgmt / Facilities Dir." },
              { label: "Brief Format", value: "Unmasked 10-Roof Walk-Sheet", accent: true },
            ],
          },
          {
            id: "decision-context",
            title: "Pair ownership with roof age and storm proof",
            summary:
              "Give your account executives a reason to call: exact square footage, last reroof permit year, and nearby NWS hail severity.",
            imageSrc: "/assets/aerials/dcad-2501.jpg",
            imageAlt: "Valwood commercial property roof aerial",
            imageCaption: "Valwood Portfolio · Owner + Roof Context",
            readoutTitle: "Outreach Context Bundle",
            readout: [
              { label: "Roof Scope Model", value: `$${PLATFORM_FACTS.uiBenchmarkRatePerSqFt}/sq ft benchmark` },
              { label: "Permit Check", value: "Dallas & Irving commercial logs" },
              { label: "Weather Proof", value: "NWS hail reports attached" },
              { label: "Exclusivity", value: PLATFORM_FACTS.territoryCap, accent: true },
            ],
          },
        ],
      }}
      evidenceTable={{
        heading: "Sample DFW entity trails and target decision roles",
        intro:
          "Illustrative examples from Depoii's workspace showing how tax-roll classifications map to operating entities and facility decision roles.",
        badgeText: "Illustrative DFW Entity Trails",
        columns: [
          "Sample Property",
          "Tax Roll Classification",
          "Sample Operating Entity Trail",
          "Target Decision Role",
          "Resolution KPI",
        ],
        rows: [
          {
            rowKey: "central-owner",
            cells: [
              "8600 S Central Expy · Dallas",
              "Regional Logistics Group",
              "Trinity Inwood Holdings LLC -> Inwood Partners Corp",
              "VP of Asset Management",
              {
                placeholderLabel: PLACEHOLDER_METRICS.llc_entity_resolution_rate.label,
                templateId: "llc_entity_resolution_rate",
                unitHint: PLACEHOLDER_METRICS.llc_entity_resolution_rate.unit,
              },
            ],
          },
          {
            rowKey: "inwood-owner",
            cells: [
              "14201 Inwood Rd · Dallas",
              "Industrial Holdings LP",
              "Apex Industrial Holdings LP -> On-site Plant Ops",
              "Director of Facilities & CapEx",
              {
                placeholderLabel: PLACEHOLDER_METRICS.llc_entity_resolution_rate.label,
                templateId: "llc_entity_resolution_rate",
                unitHint: PLACEHOLDER_METRICS.llc_entity_resolution_rate.unit,
              },
            ],
          },
          {
            rowKey: "sovereign-owner",
            cells: [
              "7505 Sovereign Row · Dallas",
              "Institutional Portfolio",
              "Sovereign Industrial Trust -> Lone Star Portfolio",
              "Regional Director of Operations",
              {
                placeholderLabel: PLACEHOLDER_METRICS.llc_entity_resolution_rate.label,
                templateId: "llc_entity_resolution_rate",
                unitHint: PLACEHOLDER_METRICS.llc_entity_resolution_rate.unit,
              },
            ],
          },
          {
            rowKey: "airport-owner",
            cells: [
              "2200 E Airport Fwy · Irving",
              "Local Asset Manager",
              "Airport Freeway Commercial LLC -> Local Management",
              "Senior Property Manager",
              {
                placeholderLabel: PLACEHOLDER_METRICS.llc_entity_resolution_rate.label,
                templateId: "llc_entity_resolution_rate",
                unitHint: PLACEHOLDER_METRICS.llc_entity_resolution_rate.unit,
              },
            ],
          },
        ],
        footnote:
          "Entity trails above are illustrative DFW sample profiles matching Depoii's interactive workspace demo. Verified institutional DCAD owners of record appear in the Sector 1 & Sector 4 dossiers.",
        comparisonImages: [
          {
            src: "/assets/aerials/dcad-4100.jpg",
            alt: "South Dallas commercial building linked to ownership trail",
            caption: "8600 S Central Expy · Asset management entity workflow",
          },
          {
            src: "/assets/aerials/dcad-12221.jpg",
            alt: "North Dallas commercial asset with storm and ownership trail",
            caption: "North Dallas Corridor · Portfolio owner & storm overlay",
          },
        ],
      }}
      placeholderKpis={{
        heading: "Resolution and sync benchmarks pending publication",
        intro:
          "Entity-match percentages, direct-dial coverage rates, and CAD roll sync cadence remain templated until formally audited across all 70,000+ buildings.",
        items: [
          {
            label: PLACEHOLDER_METRICS.llc_entity_resolution_rate.label,
            templateId: PLACEHOLDER_METRICS.llc_entity_resolution_rate.id,
            description: PLACEHOLDER_METRICS.llc_entity_resolution_rate.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.llc_entity_resolution_rate.unit,
          },
          {
            label: PLACEHOLDER_METRICS.owner_contact_match_rate.label,
            templateId: PLACEHOLDER_METRICS.owner_contact_match_rate.id,
            description: PLACEHOLDER_METRICS.owner_contact_match_rate.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.owner_contact_match_rate.unit,
          },
          {
            label: PLACEHOLDER_METRICS.cad_roll_sync_cadence.label,
            templateId: PLACEHOLDER_METRICS.cad_roll_sync_cadence.id,
            description: PLACEHOLDER_METRICS.cad_roll_sync_cadence.scopeDescription,
            unitHint: PLACEHOLDER_METRICS.cad_roll_sync_cadence.unit,
          },
        ],
      }}
      faqs={{
        heading: "Frequently asked questions about owner lookup",
        intro: "How Depoii maps DFW commercial parcels to operating corporate entities.",
        items: FAQS,
      }}
      relatedLinks={{
        heading: "Connect ownership lookup to leads and permit history",
        intro:
          "Pair verified corporate trails with roof-age timelines and territory brief workflows.",
        items: [
          {
            title: "DFW Commercial Roofing Leads",
            description:
              "Filter 70,000+ DFW buildings by square footage, roof system, and timing triggers.",
            href: "/dfw-commercial-roofing-leads",
            ctaLabel: "Explore lead filtering",
          },
          {
            title: "Permit History for Commercial Roofs",
            description:
              "Check 20-year Dallas and Irving permit logs before picking up the phone.",
            href: "/permit-history-commercial-roofs",
            ctaLabel: "Check permit history",
          },
          {
            title: "DFW Territory Brief Case Study",
            description:
              "Walk through 4 illustrative property scenarios and contractor outcome templates.",
            href: "/case-studies/dfw-commercial-roofing-territory-brief",
            ctaLabel: "View case study template",
          },
        ],
      }}
      bottomCta={{
        heading: "Get 10 unmasked DFW property owners in your corridor.",
        body: "Tell us your target DFW submarkets and square-footage range. We will send 10 matched roofs with owner trails within 24 hours.",
      }}
    />
  );
}
