import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VisitorTracker } from "@/components/VisitorTracker";
import { PlaceholderMetric } from "@/components/PlaceholderMetric";
import { ModalActionButtons } from "@/components/ModalActionButtons";
import {
  COMBINED_SECTOR1_SECTOR4_TOTALS,
  ILLUSTRATIVE_SAMPLE_PROPERTIES,
  PLACEHOLDER_METRICS,
  PLATFORM_FACTS,
  SECTOR_1_DOSSIER,
  SECTOR_4_DOSSIER,
} from "@/lib/dfw-data";
import {
  buildArticleJsonLd,
  buildBreadcrumbListJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  composeJsonLdGraph,
} from "@/lib/seo";

const PAGE_PATH = "/case-studies/dfw-commercial-roofing-territory-brief";
const PAGE_TITLE = "DFW Commercial Roofing Territory Brief: Workflow & Outcome Template";
const PAGE_DESCRIPTION =
  "How a DFW commercial roofing crew triages illustrative property workflows alongside verified DCAD Sector 1 and Sector 4 opportunity totals and pending outcome metrics.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: "article",
  publishedTime: "2026-10-15T00:00:00Z",
  modifiedTime: "2026-11-26T00:00:00Z",
  imagePath: "/assets/aerials/dcad-4100.jpg",
  imageAlt: "DFW commercial roof territory brief property workflow aerial",
});

const SCENARIO_IMAGES: Record<string, { src: string; alt: string }> = {
  "central-expy": {
    src: "/assets/aerials/dcad-4100.jpg",
    alt: "South Dallas commercial distribution facility roof aerial",
  },
  "inwood-rd": {
    src: "/assets/aerials/dcad-12221.jpg",
    alt: "North Dallas industrial facility roof inside hail track",
  },
  "sovereign-row": {
    src: "/assets/aerials/dcad-2501.jpg",
    alt: "Brookhollow commercial warehouse with active warranty roof",
  },
  "airport-fwy": {
    src: "/assets/aerials/dcad-16850.jpg",
    alt: "Irving commercial flex building roof aerial",
  },
};

export default function DfwTerritoryBriefCaseStudyPage() {
  const breadcrumbId =
    "https://www.depoii.com/case-studies/dfw-commercial-roofing-territory-brief#breadcrumb";
  const jsonLd = composeJsonLdGraph([
    buildWebPageJsonLd({
      path: PAGE_PATH,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      dateModified: "2026-11-26",
      breadcrumbId,
    }),
    buildArticleJsonLd({
      path: PAGE_PATH,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      datePublished: "2026-10-15T00:00:00Z",
      dateModified: "2026-11-26T00:00:00Z",
      imagePath: "/assets/aerials/dcad-4100.jpg",
      keywords: [
        "DFW commercial roofing territory brief",
        "commercial roof estimating workflow",
        "Dallas commercial roofing case study",
      ],
    }),
    buildBreadcrumbListJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Case Studies", path: PAGE_PATH },
        { name: "DFW Territory Brief", path: PAGE_PATH },
      ],
      PAGE_PATH
    ),
  ]);

  const fourScenarios = ILLUSTRATIVE_SAMPLE_PROPERTIES.slice(0, 4);

  return (
    <div className="min-h-[100svh] bg-white text-[#111110]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VisitorTracker />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-[#f5f5f4] py-16 sm:py-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-[14px] text-[#4a4845]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-[#111110] transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-[#111110]">DFW Territory Brief Case Study</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 text-left">
                <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-0.035em] leading-[1.08] text-[#111110]">
                  DFW commercial roofing territory brief workflow.
                </h1>
                <p className="mt-5 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55] max-w-2xl">
                  Structured territory brief template pairing four illustrative DFW property triage scenarios with verified DCAD Sector 1 and Sector 4 corridor benchmarks.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-5 border-l-4 border-[#c2410c]">
                  <p className="text-[14px] font-semibold text-[#111110]">
                    Editorial &amp; Anti-Fabrication Guardrail
                  </p>
                  <p className="mt-1.5 text-[14px] text-[#4a4845] leading-relaxed">
                    This page separates (1) Verified DCAD Sector 1 &amp; Sector 4 corridor context, (2) Illustrative sample property workflows from Depoii&apos;s workspace demo, and (3) Contractor outcome KPIs marked [VERIFIED_METRIC_PENDING] until audited customer results are published.
                  </p>
                </div>

                <div className="mt-8">
                  <ModalActionButtons source="case_study_hero" />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-neutral-200">
                  <Image
                    src="/assets/aerials/dcad-4100.jpg"
                    alt="DFW commercial warehouse roof analyzed in territory brief workflow"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                    10-Roof Territory Brief · 24-Hour Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Four Illustrative Sample Property Scenarios */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="max-w-[780px]">
                <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                  Four illustrative sample property scenarios
                </h2>
                <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                  Each scenario uses illustrative property profiles from Depoii&apos;s interactive workspace ($14/sq ft UI planning benchmark) to demonstrate how estimators prioritize tear-off, restoration, and warranty-safe accounts.
                </p>
              </div>
              <span className="self-start md:self-auto shrink-0 px-3 py-1.5 rounded-full bg-[#ffdec4] text-[#9a3412] text-[13px] font-semibold">
                Illustrative Sample Workflows
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fourScenarios.map((prop) => {
                const img = SCENARIO_IMAGES[prop.id] ?? {
                  src: "/assets/aerials/dcad-2501.jpg",
                  alt: prop.address,
                };
                return (
                  <div key={prop.id} className="bg-[#f5f5f4] rounded-2xl overflow-hidden flex flex-col">
                    <div className="relative aspect-[16/9] w-full bg-neutral-200">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                        Illustrative Sample · {prop.submarket}
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[20px] font-bold text-[#111110] leading-snug">
                            {prop.address}
                          </h3>
                          <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-white text-[#111110] text-[13px] font-semibold tabular-nums">
                            Fit {prop.fitScore}/100
                          </span>
                        </div>
                        <p className="mt-2 text-[15px] text-[#4a4845] leading-relaxed">
                          {prop.statusSummary}
                        </p>
                      </div>

                      <dl className="grid grid-cols-2 gap-3 text-[14px] pt-2">
                        <div className="bg-white rounded-xl p-3">
                          <dt className="text-[#4a4845]">Roof Area &amp; System</dt>
                          <dd className="font-semibold text-[#111110] mt-0.5">
                            {prop.roofAreaSqFt.toLocaleString("en-US")} sq ft · {prop.roofSystem}
                          </dd>
                        </div>
                        <div className="bg-white rounded-xl p-3">
                          <dt className="text-[#4a4845]">Permit &amp; Hail Signal</dt>
                          <dd className="font-semibold text-[#111110] mt-0.5">
                            {prop.permitRecord}
                          </dd>
                        </div>
                        <div className="bg-white rounded-xl p-3">
                          <dt className="text-[#4a4845]">Target Role</dt>
                          <dd className="font-semibold text-[#111110] mt-0.5">
                            {prop.ownerRole}
                          </dd>
                        </div>
                        <div className="bg-white rounded-xl p-3">
                          <dt className="text-[#4a4845]">Planning Benchmark</dt>
                          <dd className="font-semibold text-[#c2410c] mt-0.5 tabular-nums">
                            {prop.estScopeDisplay}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Grounded Territory Benchmark Context */}
        <section className="bg-[#f5f5f4] py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                Grounded territory benchmark context
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                Verified DCAD corridor dossiers confirm why territory-capped outreach matters across Dallas County&apos;s primary commercial corridors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 space-y-2">
                <p className="text-[28px] font-bold tabular-nums text-[#111110]">$135.97M</p>
                <p className="text-[16px] font-semibold text-[#111110]">
                  Sector 1 Northwest Corridor
                </p>
                <p className="text-[14px] text-[#4a4845] leading-relaxed">
                  {SECTOR_1_DOSSIER.rankedAssetCount} verified DCAD assets averaging $2.72M contract size with 0 post-storm permits.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 space-y-2">
                <p className="text-[28px] font-bold tabular-nums text-[#111110]">$301.28M</p>
                <p className="text-[16px] font-semibold text-[#111110]">
                  Sector 4 East &amp; Northeast Corridor
                </p>
                <p className="text-[14px] text-[#4a4845] leading-relaxed">
                  {SECTOR_4_DOSSIER.rankedAssetCount} verified DCAD assets averaging $6.03M ($224.42M across 49 assets excluding Rank 7 anomaly).
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 space-y-2">
                <p className="text-[28px] font-bold tabular-nums text-[#111110]">
                  {PLATFORM_FACTS.territoryCap}
                </p>
                <p className="text-[16px] font-semibold text-[#111110]">
                  Exclusivity &amp; 24-Hour Brief SLA
                </p>
                <p className="text-[14px] text-[#4a4845] leading-relaxed">
                  10-Roof Territory Briefs ship within 24 hours; {COMBINED_SECTOR1_SECTOR4_TOTALS.statutoryNoticeContext}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Contractor Outcome Slots */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                Contractor outcome metrics pending verification
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                Depoii does not fabricate customer close rates, ROI multiples, or response-time claims. These structured slots remain explicitly pending audited cohort publication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                PLACEHOLDER_METRICS.contractor_close_rate,
                PLACEHOLDER_METRICS.contractor_pipeline_roi,
                PLACEHOLDER_METRICS.contractor_response_time,
                PLACEHOLDER_METRICS.owner_contact_match_rate,
              ].map((metric) => (
                <PlaceholderMetric
                  key={metric.id}
                  variant="card"
                  tone="light"
                  label={metric.label}
                  templateId={metric.id}
                  description={metric.scopeDescription}
                  unitHint={metric.unit}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Links & Bottom CTA */}
        <section className="bg-[#f5f5f4] py-16 sm:py-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-12">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.03em] text-[#111110] mb-6">
                Inspect underlying DFW intelligence pages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: "DFW Commercial Roof Storm Exposure Study",
                    href: "/research/dfw-commercial-roof-storm-exposure-study",
                  },
                  {
                    title: "DFW Commercial Roofing Leads",
                    href: "/dfw-commercial-roofing-leads",
                  },
                  {
                    title: "Hail Swath Roof Intelligence",
                    href: "/hail-swath-roof-intelligence",
                  },
                  {
                    title: "Commercial Property Owner Lookup",
                    href: "/commercial-property-owner-lookup",
                  },
                  {
                    title: "Permit History for Commercial Roofs",
                    href: "/permit-history-commercial-roofs",
                  },
                  {
                    title: "Workspace Plans & Territory Locks",
                    href: "/#pricing",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="bg-white hover:bg-[#eaeae7] rounded-2xl p-5 flex items-center justify-between gap-3 transition-colors"
                  >
                    <span className="text-[15px] font-semibold text-[#111110]">{link.title}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#c2410c]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#111110] text-white p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-[-0.025em] leading-[1.15]">
                  Build your custom 10-Roof Territory Brief in 24 hours.
                </h2>
                <p className="mt-3 text-[16px] text-neutral-300 leading-[1.55]">
                  Give us your DFW corridors and square-footage sweet spot. We return 10 qualified commercial roofs with age, hail, permit, and owner trails.
                </p>
              </div>
              <ModalActionButtons source="case_study_bottom_cta" tone="dark" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
