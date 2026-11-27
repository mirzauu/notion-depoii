import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VisitorTracker } from "@/components/VisitorTracker";
import { PlaceholderMetric } from "@/components/PlaceholderMetric";
import { ModalActionButtons } from "@/components/ModalActionButtons";
import {
  COMBINED_SECTOR1_SECTOR4_TOTALS,
  PLACEHOLDER_METRICS,
  PLATFORM_FACTS,
  SECTOR_1_DOSSIER,
  SECTOR_4_DOSSIER,
} from "@/lib/dfw-data";
import {
  buildArticleJsonLd,
  buildBreadcrumbListJsonLd,
  buildDatasetJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  composeJsonLdGraph,
} from "@/lib/seo";

const PAGE_PATH = "/research/dfw-commercial-roof-storm-exposure-study";
const PAGE_TITLE = "DFW Commercial Roof Storm Exposure Study (100 DCAD Assets)";
const PAGE_DESCRIPTION =
  "Original Dallas County commercial roof storm exposure analysis of 100 verified DCAD Sector 1 and Sector 4 assets totaling 30,155,466 sq ft roof envelope and $437.25M modeled scope.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: "article",
  publishedTime: "2026-10-15T00:00:00Z",
  modifiedTime: "2026-11-26T00:00:00Z",
  imagePath: "/assets/aerials/dcad-12221.jpg",
  imageAlt: "North Dallas commercial warehouse roof corridor analyzed in DCAD storm study",
});

function formatInt(n: number): string {
  return n.toLocaleString("en-US");
}

function formatUsd(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function DfwStormExposureStudyPage() {
  const breadcrumbId =
    "https://www.depoii.com/research/dfw-commercial-roof-storm-exposure-study#breadcrumb";
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
      headline:
        "DFW Commercial Roof Storm Exposure Study: 100 Verified Institutional Assets ($437.25M Unpermitted Pipeline)",
      description: PAGE_DESCRIPTION,
      datePublished: "2026-10-15T00:00:00Z",
      dateModified: "2026-11-26T00:00:00Z",
      imagePath: "/assets/aerials/dcad-12221.jpg",
      keywords: [
        "DFW commercial roofing storm exposure",
        "DCAD Sector 1 commercial roof dossier",
        "DCAD Sector 4 commercial roof dossier",
        "Texas Insurance Code 542A.003",
      ],
    }),
    buildDatasetJsonLd({
      path: PAGE_PATH,
      name: "Dallas County Sector 1 & Sector 4 Top-50 Commercial Roof Storm Exposure Dataset",
      description:
        "100 ranked Dallas Central Appraisal District (DCAD) commercial and multifamily institutional properties exposed to 1.50\"–4.50\" convective hail with 0 post-storm municipal reroof permits found.",
      spatialCoverage: "Dallas County, Texas (Sector 1 & Sector 4 Corridors)",
      temporalCoverage: "2024-05-28/2026-10",
      variableMeasured: [
        "Gross Building Area (sq ft)",
        "Estimated Low-Slope Roof Footprint (sq ft)",
        "MESH Hail Size (inches)",
        "Municipal Roofing Permit Status",
      ],
    }),
    buildBreadcrumbListJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Research", path: PAGE_PATH },
        { name: "DFW Storm Exposure Study", path: PAGE_PATH },
      ],
      PAGE_PATH
    ),
  ]);

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
                <li className="font-medium text-[#111110]">DFW Commercial Roof Storm Exposure Study</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 text-left">
                <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-0.035em] leading-[1.08] text-[#111110]">
                  DFW commercial roof storm exposure study.
                </h1>
                <p className="mt-5 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55] max-w-2xl">
                  Audit of 100 verified Dallas County (DCAD) institutional assets across Sector 1 and Sector 4: 30,155,466 sq ft of low-slope roof envelope, $437.25M in modeled replacement scope, and zero post-storm reroof permits found.
                </p>

                <div className="mt-6 rounded-2xl bg-white p-5 border-l-4 border-[#c2410c]">
                  <p className="text-[14px] font-semibold text-[#111110]">
                    Scope &amp; Benchmark Disclosure
                  </p>
                  <p className="mt-1.5 text-[14px] text-[#4a4845] leading-relaxed">
                    This study covers the Top 50 ranked assets each from DCAD Sector 1 and Sector 4 (100 assets total)—not the full 70,000+ DFW metro inventory. Dossier scope totals use DCAD&apos;s $14.50/sq ft model, whereas Depoii&apos;s interactive workspace uses a $14.00/sq ft planning benchmark.
                  </p>
                </div>

                <div className="mt-8">
                  <ModalActionButtons source="research_study_hero" />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-neutral-200">
                  <Image
                    src="/assets/aerials/dcad-12221.jpg"
                    alt="North Dallas commercial roof corridor analyzed in DCAD study"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                    DCAD Sector 1 &amp; Sector 4 Audit · 100 Assets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Findings Summary */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10 sm:mb-12">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                Key findings across 100 verified DCAD assets
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                Every asset in both rosters intersected documented NWS / MESH severe convective hail cores with zero municipal reroof permits recorded post-storm.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-[#f5f5f4] rounded-2xl p-6 space-y-2">
                <p className="text-[28px] sm:text-[34px] font-bold tabular-nums text-[#111110]">
                  {COMBINED_SECTOR1_SECTOR4_TOTALS.totalAssets}
                </p>
                <p className="text-[16px] font-semibold text-[#111110]">Verified Ranked Assets</p>
                <p className="text-[14px] text-[#4a4845]">
                  50 Sector 1 + 50 Sector 4 DCAD 2026 Certified Roll properties
                </p>
              </div>
              <div className="bg-[#f5f5f4] rounded-2xl p-6 space-y-2">
                <p className="text-[28px] sm:text-[34px] font-bold tabular-nums text-[#111110]">
                  30.16M sq ft
                </p>
                <p className="text-[16px] font-semibold text-[#111110]">Low-Slope Roof Envelope</p>
                <p className="text-[14px] text-[#4a4845]">
                  Exact sum: {formatInt(COMBINED_SECTOR1_SECTOR4_TOTALS.totalRoofEnvelopeSqFt)} sq ft
                </p>
              </div>
              <div className="bg-[#f5f5f4] rounded-2xl p-6 space-y-2">
                <p className="text-[28px] sm:text-[34px] font-bold tabular-nums text-[#111110]">
                  {COMBINED_SECTOR1_SECTOR4_TOTALS.combinedPipelineShort}
                </p>
                <p className="text-[16px] font-semibold text-[#111110]">Modeled Reroof Scope</p>
                <p className="text-[14px] text-[#4a4845]">
                  {COMBINED_SECTOR1_SECTOR4_TOTALS.combinedPipelineFormatted} ($360.39M ex-Rank 7)
                </p>
              </div>
              <div className="bg-[#f5f5f4] rounded-2xl p-6 space-y-2">
                <p className="text-[28px] sm:text-[34px] font-bold tabular-nums text-[#c2410c]">
                  0 permits
                </p>
                <p className="text-[16px] font-semibold text-[#111110]">Post-Storm Reroofs Found</p>
                <p className="text-[14px] text-[#4a4845]">
                  100/100 marked NO_POST_STORM_ROOF_PERMIT_FOUND
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#f5f5f4] rounded-2xl p-7 space-y-4">
                <h3 className="text-[22px] font-bold text-[#111110]">
                  Sector 1: Northwest Corridor &amp; Central Core
                </h3>
                <p className="text-[15px] text-[#4a4845] leading-relaxed">
                  Farmers Branch, Addison, Carrollton, Irving, Coppell &amp; North Dallas ({SECTOR_1_DOSSIER.snapshotLabel} snapshot).
                </p>
                <dl className="grid grid-cols-2 gap-4 text-[14px]">
                  <div>
                    <dt className="text-[#4a4845]">Combined Pipeline</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatUsd(SECTOR_1_DOSSIER.combinedPipelineUsd, 2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Avg Contract Size</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatUsd(SECTOR_1_DOSSIER.avgContractSizeUsd, 2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Roof Envelope</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatInt(SECTOR_1_DOSSIER.roofFootprintSqFt)} sq ft
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Verified Gross Sq Ft</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatInt(SECTOR_1_DOSSIER.verifiedJsonGrossSqFt)} sq ft (MD header: 17,842,190)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Storm Events</dt>
                    <dd className="font-bold text-[#111110]">
                      2026-06-02 (2.0&quot; · 41), 05-23 (1.5&quot; · 6), 04-28 (4.5&quot; · 3)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Year Built / Score</dt>
                    <dd className="font-bold text-[#111110]">
                      1920–2012 · Score 43–99 (0.6 J)
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-[#f5f5f4] rounded-2xl p-7 space-y-4">
                <h3 className="text-[22px] font-bold text-[#111110]">
                  Sector 4: East &amp; Northeast Corridor
                </h3>
                <p className="text-[15px] text-[#4a4845] leading-relaxed">
                  Garland, Mesquite, Richardson, Rowlett &amp; Sunnyvale market segment (2024-05-28 convective core).
                </p>
                <dl className="grid grid-cols-2 gap-4 text-[14px]">
                  <div>
                    <dt className="text-[#4a4845]">Combined Pipeline</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatUsd(SECTOR_4_DOSSIER.combinedPipelineUsd, 2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Avg Contract Size</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatUsd(SECTOR_4_DOSSIER.avgContractSizeUsd, 2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Roof Envelope</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatInt(SECTOR_4_DOSSIER.roofFootprintSqFt)} sq ft
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Verified Gross Sq Ft</dt>
                    <dd className="font-bold text-[#111110] tabular-nums">
                      {formatInt(SECTOR_4_DOSSIER.verifiedJsonGrossSqFt)} sq ft
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Storm Event</dt>
                    <dd className="font-bold text-[#111110]">
                      2024-05-28 (1.75&quot; · 50 assets)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#4a4845]">Year Built / Score</dt>
                    <dd className="font-bold text-[#111110]">
                      1933–2025 · Score 84–96 (0.68 J)
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* City-by-City Distribution Tables */}
        <section className="bg-[#f5f5f4] py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-14">
            <div className="max-w-[780px] text-left">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                City-by-city distribution across Sector 1 &amp; Sector 4
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                Exact row-summed city totals verified from the 50-asset DCAD Sector 1 and Sector 4 datasets.
              </p>
            </div>

            {/* Sector 1 City Table */}
            <div>
              <h3 className="text-[22px] font-bold text-[#111110] mb-4">
                Sector 1 City Breakdown (50 Assets)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#eaeae7] border-b border-neutral-200">
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">City</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Assets</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Gross Sq Ft</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Est. Roof Footprint</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Row Est. Replacement Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {SECTOR_1_DOSSIER.cityBreakdown.map((row) => (
                      <tr key={row.city}>
                        <td className="px-4 py-3 text-[14px] font-semibold">{row.city}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{row.assetCount}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{formatInt(row.grossBuildingSqFt)}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{formatInt(row.roofFootprintSqFt)}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{formatUsd(row.sumRowReplacementUsd)}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#f5f5f4] font-bold">
                      <td className="px-4 py-3 text-[14px]">Total (Row Sum)</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">50</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">19,945,706</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">9,377,345</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">$135,971,505</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[14px] text-[#4a4845]">
                Unrounded model formula (9,377,345 sq ft × $14.50/sq ft) equals $135,971,502.50 ($2.50 rounding delta vs. integer row strings).
              </p>
            </div>

            {/* Sector 4 City Table */}
            <div>
              <h3 className="text-[22px] font-bold text-[#111110] mb-4">
                Sector 4 City Breakdown (50 Assets)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#eaeae7] border-b border-neutral-200">
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">City</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Assets</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Gross Sq Ft</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Est. Roof Footprint</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Row Est. Replacement Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {SECTOR_4_DOSSIER.cityBreakdown.map((row) => (
                      <tr key={row.city}>
                        <td className="px-4 py-3 text-[14px] font-semibold">{row.city}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{row.assetCount}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{formatInt(row.grossBuildingSqFt)}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{formatInt(row.roofFootprintSqFt)}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">{formatUsd(row.sumRowReplacementUsd)}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#f5f5f4] font-bold">
                      <td className="px-4 py-3 text-[14px]">Total (Row Sum)</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">50</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">20,195,927</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">20,778,121</td>
                      <td className="px-4 py-3 text-[14px] tabular-nums">$301,282,759</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[14px] text-[#4a4845]">
                Unrounded model formula (20,778,121 sq ft × $14.50/sq ft) equals $301,282,754.50. Sunnyvale appears in the Sector 4 corridor header but recorded 0 ranked assets in the Top 50.
              </p>
            </div>

            {/* Verified Sample Assets Table */}
            <div>
              <h3 className="text-[22px] font-bold text-[#111110] mb-4">
                Representative Verified DCAD Assets (With Public Appraisal Links)
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#eaeae7] border-b border-neutral-200">
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Address &amp; City</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Sector / Rank</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Roof Sq Ft</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Owner of Record</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">Est. Value</th>
                      <th scope="col" className="px-4 py-3.5 text-[14px] font-semibold">CAD Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {[
                      ...SECTOR_1_DOSSIER.topVerifiedSampleAssets.map((a) => ({
                        ...a,
                        sector: "Sector 1",
                      })),
                      ...SECTOR_4_DOSSIER.topVerifiedSampleAssets.map((a) => ({
                        ...a,
                        sector: "Sector 4",
                      })),
                    ].map((asset) => (
                      <tr key={`${asset.sector}-${asset.rank}-${asset.address}`}>
                        <td className="px-4 py-3 text-[14px] font-semibold">
                          {asset.address}, {asset.city}
                        </td>
                        <td className="px-4 py-3 text-[14px]">
                          {asset.sector} · #{asset.rank}
                        </td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">
                          {formatInt(asset.roofFootprintSqFt)} sq ft
                        </td>
                        <td className="px-4 py-3 text-[14px]">{asset.ownerName}</td>
                        <td className="px-4 py-3 text-[14px] tabular-nums">
                          {formatUsd(asset.estReplacementUsd)}
                        </td>
                        <td className="px-4 py-3 text-[14px]">
                          <a
                            href={asset.cadRecordUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-[#c2410c] hover:text-[#9a3412]"
                          >
                            <span>DCAD</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200">
                <Image
                  src="/assets/aerials/dcad-2501.jpg"
                  alt="Northwest Dallas industrial corridor roof aerial"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                  Sector 1 Northwest Corridor
                </div>
              </div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200">
                <Image
                  src="/assets/aerials/dcad-16850.jpg"
                  alt="DFW logistics warehouse roof envelope"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                  Low-Slope Roof Envelope Audit
                </div>
              </div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200">
                <Image
                  src="/assets/aerials/exact-roof-split-hd.jpg"
                  alt="Side-by-side roof inspection verification"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                  Permit &amp; Storm Cross-Check
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology & Data Anomaly Disclosures */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10 sm:mb-12">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                Methodology, deterministic linking &amp; data disclosures
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                Every asset in both dossiers was cross-checked row-by-row against source JSON exports to document exact figures and surface source data anomalies transparently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#f5f5f4] rounded-2xl p-6 space-y-2.5">
                <h3 className="text-[20px] font-bold text-[#111110]">
                  Deterministic CAD &amp; Permit Matching
                </h3>
                <p className="text-[15px] text-[#4a4845] leading-relaxed">
                  Every asset resolves directly to DCAD commercial account URLs (AcctDetailCom.aspx?ID=) with zero heuristic scraping. Municipal permit checks enforce exact Street Number, Directional Prefix (N/S/E/W), and Street Name matching.
                </p>
              </div>

              <div className="bg-[#f5f5f4] rounded-2xl p-6 space-y-2.5">
                <h3 className="text-[20px] font-bold text-[#111110]">
                  Severe Hail &amp; Texas Statutory Timing
                </h3>
                <p className="text-[15px] text-[#4a4845] leading-relaxed">
                  Sector 1 assets sustained 1.5&quot;–4.5&quot; hail at 0.6 J kinetic energy; Sector 4 assets sustained 1.75&quot; hail on 2024-05-28 at 0.68 J. Under Texas Insurance Code § 542A.003, policyholders face a typical 12–24 month storm notice window.
                </p>
              </div>

              <div className="bg-[#f5f5f4] rounded-2xl p-6 border-l-4 border-[#c2410c] space-y-2.5">
                <h3 className="text-[20px] font-bold text-[#111110]">
                  Sector 1 Gross Area Header Audit Note
                </h3>
                <p className="text-[15px] text-[#4a4845] leading-relaxed">
                  {SECTOR_1_DOSSIER.grossSqFtDiscrepancyNote} Additionally, {SECTOR_1_DOSSIER.methodologyCaveat}
                </p>
              </div>

              <div className="bg-[#f5f5f4] rounded-2xl p-6 border-l-4 border-[#c2410c] space-y-2.5">
                <h3 className="text-[20px] font-bold text-[#111110]">
                  Sector 4 Rank 7 &amp; Asset Mix Disclosure
                </h3>
                <p className="text-[15px] text-[#4a4845] leading-relaxed">
                  {SECTOR_4_DOSSIER.methodologyCaveat}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Metro-Wide Metrics Pending Full Roll Publication */}
        <section className="bg-[#f5f5f4] py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                Metro-wide metrics pending full roll publication
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                Figures beyond the 100-asset Sector 1 and Sector 4 dossiers—including the 4-county split across all {PLATFORM_FACTS.coverageScale} DFW roofs—remain explicitly templated until verified.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlaceholderMetric
                variant="card"
                tone="light"
                label={PLACEHOLDER_METRICS.dfw_county_breakdown.label}
                templateId={PLACEHOLDER_METRICS.dfw_county_breakdown.id}
                description={PLACEHOLDER_METRICS.dfw_county_breakdown.scopeDescription}
                unitHint={PLACEHOLDER_METRICS.dfw_county_breakdown.unit}
                className="bg-white"
              />
              <PlaceholderMetric
                variant="card"
                tone="light"
                label={PLACEHOLDER_METRICS.dfw_permit_lag_benchmark.label}
                templateId={PLACEHOLDER_METRICS.dfw_permit_lag_benchmark.id}
                description={PLACEHOLDER_METRICS.dfw_permit_lag_benchmark.scopeDescription}
                unitHint={PLACEHOLDER_METRICS.dfw_permit_lag_benchmark.unit}
                className="bg-white"
              />
            </div>
          </div>
        </section>

        {/* Cross-Links & Bottom CTA */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-12">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.03em] text-[#111110] mb-6">
                Explore Depoii commercial workflows
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
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
                    title: "Permit History Commercial Roofs",
                    href: "/permit-history-commercial-roofs",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="bg-[#f5f5f4] hover:bg-[#eaeae7] rounded-2xl p-5 flex items-center justify-between gap-3 transition-colors"
                  >
                    <span className="text-[15px] font-semibold text-[#111110]">{link.title}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#c2410c]" />
                  </Link>
                ))}
              </div>
              <div className="mt-5">
                <Link
                  href="/case-studies/dfw-commercial-roofing-territory-brief"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#c2410c] hover:text-[#9a3412]"
                >
                  <span>Read the DFW Territory Brief Case Study Template</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-[#111110] text-white p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-[-0.025em] leading-[1.15]">
                  Pull unpermitted storm-exposed roofs for your corridor.
                </h2>
                <p className="mt-3 text-[16px] text-neutral-300 leading-[1.55]">
                  Request a 10-Roof Territory Brief within 24 hours—scoped to your crew&apos;s square-footage band and capped at 2 contractors per territory.
                </p>
              </div>
              <ModalActionButtons source="research_study_bottom_cta" tone="dark" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
