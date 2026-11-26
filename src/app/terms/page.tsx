import Link from "next/link";
import { DepoiiMark } from "@/components/DepoiiLogo";

export default function TermsPage() {
  return (
    <main className="min-h-[100svh] bg-white text-[#111110]">
      <div className="max-w-[820px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-10">
          <DepoiiMark className="w-7 h-7 text-[#111110]" />
          <span className="font-bold text-[1.3rem] tracking-tight">Depoii</span>
        </Link>

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
  );
}
