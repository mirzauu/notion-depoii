import Link from "next/link";
import { DepoiiMark } from "@/components/DepoiiLogo";

export default function PrivacyPage() {
  return (
    <main className="min-h-[100svh] bg-white text-[#111110]">
      <div className="max-w-[820px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-10">
          <DepoiiMark className="w-7 h-7 text-[#111110]" />
          <span className="font-bold text-[1.3rem] tracking-tight">Depoii</span>
        </Link>

        <h1 className="text-[32px] sm:text-[42px] font-bold tracking-tight leading-[1.1]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-[16px] text-[#4a4845] leading-relaxed">
          Depoii collects business contact and territory details that you submit when requesting a 10-Roof Territory Brief or product walkthrough. We use that information solely to prepare territory intelligence for your roofing team and respond to your request.
        </p>
        <p className="mt-4 text-[16px] text-[#4a4845] leading-relaxed">
          Property and weather analytics displayed in Depoii are compiled from public municipal building permit archives, county appraisal rolls, and National Weather Service storm records.
        </p>
        <p className="mt-4 text-[16px] text-[#4a4845] leading-relaxed">
          For data deletion or privacy questions, contact{" "}
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
