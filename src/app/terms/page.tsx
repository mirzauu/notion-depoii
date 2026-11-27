import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  buildBreadcrumbListJsonLd,
  buildOrganizationNode,
  buildPageMetadata,
  buildWebPageJsonLd,
  buildWebSiteNode,
  composeJsonLdGraph,
} from "@/lib/seo";

const PAGE_PATH = "/terms";
const PAGE_TITLE = "Terms of Service";
const PAGE_DESCRIPTION =
  "Terms governing Depoii commercial roofing territory intelligence, planning benchmarks, and Dallas-Fort Worth workspace exclusivity.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

export default function TermsPage() {
  const breadcrumbId = "https://www.depoii.com/terms#breadcrumb";
  const jsonLd = composeJsonLdGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    buildWebPageJsonLd({
      path: PAGE_PATH,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      breadcrumbId,
    }),
    buildBreadcrumbListJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Terms of Service", path: PAGE_PATH },
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
      <Navbar />
      <main>
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h1 className="text-[32px] sm:text-[42px] font-bold tracking-tight leading-[1.1]">
            Terms of Service
          </h1>
          <p className="mt-4 text-[16px] text-[#4a4845] leading-relaxed">
            Depoii provides commercial property lifecycle, weather proximity, and municipal permit intelligence for informational and commercial estimating purposes. Scope dollar figures are planning benchmarks based on public square-footage records and do not constitute formal engineering bids or roof appraisals.
          </p>
          <p className="mt-4 text-[16px] text-[#4a4845] leading-relaxed">
            Territory workspace exclusivity applies per active commercial subscription in Dallas–Fort Worth submarkets as confirmed during onboarding. Contractors remain responsible for on-site roof inspections and outreach compliance.
          </p>
          <p className="mt-4 text-[16px] text-[#4a4845] leading-relaxed">
            Questions about workspace terms or billing can be sent to{" "}
            <a href="mailto:hello@depoii.com" className="font-semibold text-[#111110] underline underline-offset-4">
              hello@depoii.com
            </a>
            .
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#111110] text-white font-semibold text-[14px] hover:bg-[#2b2a28] transition-colors"
            >
              ← Back to Depoii
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
