"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Globe, Rocket, Heart } from "lucide-react";

const stories = [
  {
    company: "Cursor",
    href: "#bento-features",
    portrait: "/assets/testimonial-cursor.png",
    logo: "/assets/testimonial-cursor-logo.svg",
    quote:
      "Using the most AI-native tools like Notion is an important competitive advantage for us to stay small while doing a lot.",
    name: "Michael Truell",
    title: "Co-founder & CEO",
  },
  {
    company: "Faire",
    href: "#bento-features",
    portrait: "/assets/testimonial-faire.png",
    logo: "/assets/testimonial-faire-logo.svg",
    quote:
      "Notion’s thoughtful design speeds up collaboration and decisions so we can deliver impact to our customers faster.",
    name: "Renee Solorzano",
    title: "Sr. Director of Product Design",
  },
  {
    company: "Ramp",
    href: "#bento-features",
    portrait: "/assets/testimonial-ramp.png",
    logo: "/assets/testimonial-ramp-logo.svg",
    quote:
      "Notion Custom Agents help our team go beyond doing work with AI to building AI tools that do the work for them.",
    name: "Ben Levick",
    title: "Head of Operations & Internal AI",
  },
];

const stats = [
  {
    icon: Trophy,
    text: "G2’s #1 knowledge base for 3 consecutive years",
  },
  {
    icon: Globe,
    text: "100M users in over 50 countries",
  },
  {
    icon: Rocket,
    text: "Over 50% of YC companies",
  },
  {
    icon: Heart,
    text: "1.4M+ community members",
  },
  {
    icon: Globe,
    text: "62% of Fortune 100 use Notion",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-black/[0.04]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 text-left">
          <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold text-[#191918] tracking-[-0.03em] leading-[1.1]">
            Trusted by teams that ship.
          </h2>
        </div>

        {/* 3 Customer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <Link
              key={idx}
              href={story.href}
              prefetch={false}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-black flex flex-col justify-between p-6 sm:p-8 text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
            >
              {/* Background Portrait */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={story.portrait}
                  alt={story.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                {/* Legibility Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              </div>

              {/* White Company Logo Top */}
              <div className="relative z-10 h-7 w-24">
                <Image
                  src={story.logo}
                  alt={story.company}
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Quote & Attribution Bottom */}
              <div className="relative z-10 mt-auto">
                <blockquote className="text-[17px] sm:text-[19px] font-medium leading-snug mb-5 text-white/95">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-[15px] text-white">
                    {story.name}
                  </div>
                  <div className="text-[13px] text-white/70">
                    {story.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Marquee Strip */}
        <div className="mt-16 sm:mt-20 overflow-hidden relative py-4 border-y border-black/[0.06]">
          <div className="flex w-max animate-marquee-infinite items-center gap-12 sm:gap-16">
            {[...stats, ...stats, ...stats].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-[#615d59] text-[14px] sm:text-[15px] font-medium whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 text-black/60 shrink-0" />
                  <span>{stat.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
