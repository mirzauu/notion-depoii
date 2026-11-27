"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { VisitorTracker } from "./VisitorTracker";
import { Reveal } from "./Reveal";
import { PlaceholderMetric } from "./PlaceholderMetric";

export interface WorkflowPillar {
  id: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  readoutTitle: string;
  readout: { label: string; value: string; accent?: boolean }[];
}

export interface EvidenceCellPlaceholder {
  placeholderLabel: string;
  templateId: string;
  unitHint?: string;
}

export interface LandingPageTemplateProps {
  jsonLd: Record<string, unknown>;
  breadcrumbs: { label: string; href?: string }[];
  hero: {
    h1: string;
    subtitle: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    trustNote: string;
    imageSrc: string;
    imageAlt: string;
    imageCaption: string;
  };
  verifiedMetrics: {
    heading: string;
    intro: string;
    items: { value: string; label: string; source: string }[];
  };
  workflow: {
    heading: string;
    intro: string;
    pillars: WorkflowPillar[];
  };
  evidenceTable: {
    heading: string;
    intro: string;
    badgeText: string;
    columns: string[];
    rows: {
      rowKey: string;
      cells: (string | EvidenceCellPlaceholder)[];
    }[];
    footnote: string;
    comparisonImages: {
      src: string;
      alt: string;
      caption: string;
    }[];
  };
  placeholderKpis: {
    heading: string;
    intro: string;
    items: {
      label: string;
      templateId: string;
      description: string;
      unitHint: string;
    }[];
  };
  faqs: {
    heading: string;
    intro: string;
    items: { question: string; answer: string }[];
  };
  relatedLinks: {
    heading: string;
    intro: string;
    items: {
      title: string;
      description: string;
      href: string;
      ctaLabel: string;
    }[];
  };
  bottomCta: {
    heading: string;
    body: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
}

function triggerModal(eventName: "open-trial" | "open-demo", source: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName, { detail: { source } }));
  }
}

export function LandingPageTemplate({
  jsonLd,
  breadcrumbs,
  hero,
  verifiedMetrics,
  workflow,
  evidenceTable,
  placeholderKpis,
  faqs,
  relatedLinks,
  bottomCta,
}: LandingPageTemplateProps) {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const activePillar = workflow.pillars[activePillarIndex] ?? workflow.pillars[0];

  const primaryLabel = hero.primaryCtaLabel ?? "Get My 10-Roof Territory Brief";
  const secondaryLabel = hero.secondaryCtaLabel ?? "Book walkthrough";

  return (
    <div className="min-h-[100svh] bg-white text-[#111110]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VisitorTracker />
      <Navbar />

      <main>
        {/* Band 1: Hero */}
        <section className="bg-[#f5f5f4] py-16 sm:py-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-[14px] text-[#4a4845]">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((crumb, idx) => (
                  <li key={crumb.label} className="inline-flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true">/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-[#111110] transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-[#111110]">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 text-left">
                <h1 className="text-[34px] sm:text-[48px] lg:text-[56px] font-bold tracking-[-0.035em] leading-[1.08] text-[#111110]">
                  {hero.h1}
                </h1>
                <p className="mt-5 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55] max-w-2xl">
                  {hero.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => triggerModal("open-trial", "landing_hero")}
                    className="h-12 px-7 rounded-full bg-[#111110] hover:bg-[#2b2a28] text-white font-semibold text-[16px] transition-[transform,background-color] duration-150 active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{primaryLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerModal("open-demo", "landing_hero")}
                    className="h-12 px-6 rounded-full bg-white hover:bg-[#eaeae7] text-[#111110] font-semibold text-[16px] transition-colors duration-150 cursor-pointer"
                  >
                    {secondaryLabel}
                  </button>
                </div>

                <p className="mt-4 text-[14px] text-[#3a3835]">{hero.trustNote}</p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-neutral-200">
                  <Image
                    src={hero.imageSrc}
                    alt={hero.imageAlt}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                    {hero.imageCaption}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 2: Verified DFW Scale & Provenance Strip */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[780px] text-left mb-10 sm:mb-12">
                <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                  {verifiedMetrics.heading}
                </h2>
                <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                  {verifiedMetrics.intro}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {verifiedMetrics.items.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#f5f5f4] rounded-2xl p-6 flex flex-col justify-between gap-3"
                >
                  <p className="text-[28px] sm:text-[34px] font-bold tabular-nums tracking-tight text-[#111110]">
                    {item.value}
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-[16px] font-semibold text-[#111110] leading-snug">
                      {item.label}
                    </p>
                    <p className="text-[14px] text-[#4a4845] leading-relaxed">{item.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 3: Interactive Workflow Breakdown */}
        <section className="bg-[#f5f5f4] py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-[780px] text-left mb-12 sm:mb-14">
                <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                  {workflow.heading}
                </h2>
                <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                  {workflow.intro}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between gap-4">
                {workflow.pillars.map((pillar, idx) => {
                  const isSelected = idx === activePillarIndex;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setActivePillarIndex(idx)}
                      className={`w-full text-left rounded-2xl p-6 sm:p-7 transition-colors duration-200 cursor-pointer border-l-4 ${
                        isSelected
                          ? "bg-white border-[#c2410c]"
                          : "bg-[#eaeae7] border-transparent hover:bg-white/75"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-[20px] sm:text-[22px] font-bold text-[#111110] tracking-tight leading-snug">
                            {pillar.title}
                          </h3>
                          <p className="mt-2.5 text-[16px] text-[#4a4845] leading-[1.55]">
                            {pillar.summary}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 text-[13px] font-semibold px-2.5 py-1 rounded-full ${
                            isSelected
                              ? "bg-[#ffdec4] text-[#9a3412]"
                              : "bg-white/70 text-[#4a4845]"
                          }`}
                        >
                          {isSelected ? "Active" : "Inspect"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {activePillar && (
                <div className="lg:col-span-6 flex">
                  <div
                    data-ui
                    className="w-full rounded-2xl bg-white border border-neutral-200 p-5 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-100 mb-6">
                        <Image
                          src={activePillar.imageSrc}
                          alt={activePillar.imageAlt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                          {activePillar.imageCaption}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[16px] font-bold text-[#111110]">
                          {activePillar.readoutTitle}
                        </p>
                        <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#14532d] text-[13px] font-semibold">
                          Verified Signals
                        </span>
                      </div>

                      <div className="space-y-3 text-[15px]">
                        {activePillar.readout.map((row) => (
                          <div
                            key={row.label}
                            className="flex items-center justify-between gap-4 py-2.5 px-3.5 rounded-lg bg-[#f5f5f4]"
                          >
                            <span className="text-[#4a4845]">{row.label}</span>
                            <span
                              className={`font-semibold text-right ${
                                row.accent ? "text-[#9a3412]" : "text-[#111110]"
                              }`}
                            >
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Band 4: Sample Property / Evidence Table + Aerial Comparison Strip */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="max-w-[780px]">
                <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                  {evidenceTable.heading}
                </h2>
                <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                  {evidenceTable.intro}
                </p>
              </div>
              <span className="self-start md:self-auto shrink-0 px-3 py-1.5 rounded-full bg-[#ffdec4] text-[#9a3412] text-[13px] font-semibold">
                {evidenceTable.badgeText}
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f4] border-b border-neutral-200">
                    {evidenceTable.columns.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="px-4 py-3.5 text-[14px] font-semibold text-[#111110] whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {evidenceTable.rows.map((row) => (
                    <tr key={row.rowKey} className="hover:bg-[#fafaf9] transition-colors">
                      {row.cells.map((cell, cellIdx) => (
                        <td
                          key={`${row.rowKey}-${cellIdx}`}
                          className={`px-4 py-3.5 text-[14px] text-[#111110] align-top ${
                            cellIdx === 0 ? "font-semibold" : "tabular-nums text-[#3a3835]"
                          }`}
                        >
                          {typeof cell === "string" ? (
                            cell
                          ) : (
                            <PlaceholderMetric
                              variant="table-cell"
                              label={cell.placeholderLabel}
                              templateId={cell.templateId}
                              unitHint={cell.unitHint}
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[14px] text-[#4a4845] leading-relaxed">
              {evidenceTable.footnote}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {evidenceTable.comparisonImages.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#111110]/85 text-white text-[13px] font-medium">
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 5: Transparent Benchmark & Placeholder KPI Slots */}
        <section className="bg-[#f5f5f4] py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10 sm:mb-12">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                {placeholderKpis.heading}
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                {placeholderKpis.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {placeholderKpis.items.map((item) => (
                <PlaceholderMetric
                  key={item.templateId}
                  variant="card"
                  tone="light"
                  label={item.label}
                  templateId={item.templateId}
                  description={item.description}
                  unitHint={item.unitHint}
                  className="bg-white"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Band 6: FAQ Accordion */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10 sm:mb-12">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                {faqs.heading}
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                {faqs.intro}
              </p>
            </div>

            <div className="max-w-[840px] space-y-3">
              {faqs.items.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.question} className="bg-[#f5f5f4] rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111110] leading-snug">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-[#4a4845] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-[16px] text-[#4a4845] leading-[1.55]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Band 7: Contextual Internal Cross-Links */}
        <section className="bg-[#f5f5f4] py-16 sm:py-24">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="max-w-[780px] text-left mb-10">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] leading-[1.12] text-[#111110]">
                {relatedLinks.heading}
              </h2>
              <p className="mt-4 text-[16px] sm:text-[18px] text-[#4a4845] leading-[1.55]">
                {relatedLinks.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedLinks.items.map((item) => (
                <div
                  key={item.href}
                  className="bg-white rounded-2xl p-6 flex flex-col justify-between gap-5"
                >
                  <div>
                    <h3 className="text-[20px] font-bold text-[#111110] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] text-[#4a4845] leading-[1.55]">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#c2410c] hover:text-[#9a3412] transition-colors"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 8: Dark Bottom CTA */}
        <section className="bg-white pt-16 sm:pt-20 pb-4">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="rounded-2xl bg-[#111110] text-white p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-[-0.025em] leading-[1.15]">
                  {bottomCta.heading}
                </h2>
                <p className="mt-3 text-[16px] text-neutral-300 leading-[1.55]">
                  {bottomCta.body}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => triggerModal("open-trial", "landing_bottom_cta")}
                  className="h-12 px-7 rounded-full bg-white text-[#111110] hover:bg-[#f5f5f4] font-semibold text-[15px] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{bottomCta.primaryCtaLabel ?? primaryLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => triggerModal("open-demo", "landing_bottom_cta")}
                  className="h-12 px-6 rounded-full bg-[#c2410c] hover:bg-[#9a3412] text-white font-semibold text-[15px] transition-colors cursor-pointer"
                >
                  {bottomCta.secondaryCtaLabel ?? secondaryLabel}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
