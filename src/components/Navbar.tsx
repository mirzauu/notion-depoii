"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { DemoModal } from "./DemoModal";
import { TrialDemoModal } from "./TrialDemoModal";

const SOLUTIONS_LINKS = [
  {
    href: "/dfw-commercial-roofing-leads",
    label: "DFW Commercial Roofing Leads",
    detail: "Filter 70,000+ buildings by size & roof age",
  },
  {
    href: "/hail-swath-roof-intelligence",
    label: "Hail Swath Roof Intelligence",
    detail: "NWS storm tracks paired with unpermitted roofs",
  },
  {
    href: "/commercial-property-owner-lookup",
    label: "Commercial Property Owner Lookup",
    detail: "Trace DCAD/TAD LLCs to operating entities",
  },
  {
    href: "/permit-history-commercial-roofs",
    label: "Permit History for Commercial Roofs",
    detail: "20-year install timelines across Dallas & Irving",
  },
];

const RESEARCH_LINKS = [
  {
    href: "/research/dfw-commercial-roof-storm-exposure-study",
    label: "DFW Storm Exposure Study",
    detail: "100 verified DCAD assets ($437.25M modeled scope)",
  },
  {
    href: "/case-studies/dfw-commercial-roofing-territory-brief",
    label: "DFW Territory Brief Case Study",
    detail: "Illustrative property workflows & outcome slots",
  },
];

function dispatchModalEvent(eventName: "open-trial" | "open-demo", source: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName, { detail: { source } }));
  }
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"solutions" | "research" | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== "undefined") {
        if (window.location.hash === "#trial") {
          window.history.replaceState(null, "", window.location.pathname || "/");
          dispatchModalEvent("open-trial", "url_hash");
        } else if (window.location.hash === "#demo") {
          window.history.replaceState(null, "", window.location.pathname || "/");
          dispatchModalEvent("open-demo", "url_hash");
        }
      }
    };
    const handleOpenDemo = () => setDemoModalOpen(true);
    const handleOpenTrial = () => setTrialModalOpen(true);

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const trialTarget = target?.closest('a[href="#trial"]');
      if (trialTarget) {
        e.preventDefault();
        dispatchModalEvent("open-trial", "anchor_link");
        return;
      }
      const demoTarget = target?.closest('a[href="#demo"]');
      if (demoTarget) {
        e.preventDefault();
        dispatchModalEvent("open-demo", "anchor_link");
        return;
      }
      if (navContainerRef.current && target && !navContainerRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("open-demo", handleOpenDemo);
    window.addEventListener("open-trial", handleOpenTrial);
    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("open-demo", handleOpenDemo);
      window.removeEventListener("open-trial", handleOpenTrial);
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full pointer-events-none px-5 sm:px-8">
        <div
          ref={navContainerRef}
          className={`max-w-[1240px] mx-auto pointer-events-auto bg-white/95 backdrop-blur-md rounded-b-[20px] px-4 sm:px-7 h-16 sm:h-[68px] flex items-center justify-between transition-[box-shadow,background-color] duration-200 ${
            scrolled
              ? "bg-white shadow-[0_10px_32px_rgba(0,0,0,0.08)]"
              : "bg-white/95 shadow-[0_6px_24px_rgba(0,0,0,0.05)]"
          }`}
        >
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              prefetch={false}
              onClick={() => setOpenDropdown(null)}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <DepoiiMark className="w-7 h-7 text-[#111110] transition-transform duration-150 group-hover:scale-105" />
              <span className="font-bold text-[1.35rem] tracking-tight text-[#111110]">
                Depoii
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 whitespace-nowrap" aria-label="Primary navigation">
              <Link
                href="/#platform"
                prefetch={false}
                onClick={() => setOpenDropdown(null)}
                className="px-3 py-1.5 text-[14px] font-medium text-[#4a4845] hover:text-[#111110] rounded-full hover:bg-[#f5f5f4] transition-colors duration-150"
              >
                Target Matcher
              </Link>

              {/* Solutions Dropdown — always rendered in DOM for SSR crawlability */}
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={openDropdown === "solutions"}
                  aria-controls="nav-solutions-menu"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "solutions" ? null : "solutions")
                  }
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-[14px] font-medium rounded-full transition-colors duration-150 cursor-pointer ${
                    openDropdown === "solutions" ||
                    SOLUTIONS_LINKS.some((item) => pathname === item.href)
                      ? "text-[#111110] bg-[#f5f5f4]"
                      : "text-[#4a4845] hover:text-[#111110] hover:bg-[#f5f5f4]"
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      openDropdown === "solutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id="nav-solutions-menu"
                  className={
                    openDropdown === "solutions"
                      ? "block absolute left-0 top-full mt-2 w-[320px] rounded-2xl bg-white shadow-[0_18px_48px_rgba(0,0,0,0.12)] border border-neutral-200 p-2 z-50 whitespace-normal"
                      : "hidden"
                  }
                >
                  {SOLUTIONS_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`block rounded-xl px-3.5 py-2.5 transition-colors ${
                        pathname === item.href
                          ? "bg-[#f5f5f4] text-[#111110]"
                          : "hover:bg-[#f5f5f4] text-[#111110]"
                      }`}
                    >
                      <span className="block text-[14px] font-semibold text-[#111110]">
                        {item.label}
                      </span>
                      <span className="block text-[13px] text-[#4a4845] mt-0.5">
                        {item.detail}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Research Dropdown — always rendered in DOM for SSR crawlability */}
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={openDropdown === "research"}
                  aria-controls="nav-research-menu"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "research" ? null : "research")
                  }
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-[14px] font-medium rounded-full transition-colors duration-150 cursor-pointer ${
                    openDropdown === "research" ||
                    RESEARCH_LINKS.some((item) => pathname === item.href)
                      ? "text-[#111110] bg-[#f5f5f4]"
                      : "text-[#4a4845] hover:text-[#111110] hover:bg-[#f5f5f4]"
                  }`}
                >
                  <span>Research</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      openDropdown === "research" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id="nav-research-menu"
                  className={
                    openDropdown === "research"
                      ? "block absolute left-0 top-full mt-2 w-[320px] rounded-2xl bg-white shadow-[0_18px_48px_rgba(0,0,0,0.12)] border border-neutral-200 p-2 z-50 whitespace-normal"
                      : "hidden"
                  }
                >
                  {RESEARCH_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`block rounded-xl px-3.5 py-2.5 transition-colors ${
                        pathname === item.href
                          ? "bg-[#f5f5f4] text-[#111110]"
                          : "hover:bg-[#f5f5f4] text-[#111110]"
                      }`}
                    >
                      <span className="block text-[14px] font-semibold text-[#111110]">
                        {item.label}
                      </span>
                      <span className="block text-[13px] text-[#4a4845] mt-0.5">
                        {item.detail}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/#pipeline-finder"
                prefetch={false}
                onClick={() => setOpenDropdown(null)}
                className="px-3 py-1.5 text-[14px] font-medium text-[#4a4845] hover:text-[#111110] rounded-full hover:bg-[#f5f5f4] transition-colors duration-150"
              >
                DFW Roofs
              </Link>
              <Link
                href="/#pricing"
                prefetch={false}
                onClick={() => setOpenDropdown(null)}
                className="px-3 py-1.5 text-[14px] font-medium text-[#4a4845] hover:text-[#111110] rounded-full hover:bg-[#f5f5f4] transition-colors duration-150"
              >
                Pricing
              </Link>
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            <button
              type="button"
              onClick={() => dispatchModalEvent("open-demo", "navbar_desktop")}
              className="px-4 py-2 text-[14px] font-medium text-[#111110] bg-[#f5f5f4] hover:bg-[#e7e5e4] rounded-full transition-colors duration-150 cursor-pointer"
            >
              Book walkthrough
            </button>

            <button
              type="button"
              onClick={() => dispatchModalEvent("open-trial", "navbar_desktop")}
              className="px-4 py-2 text-[14px] font-semibold rounded-full text-white bg-[#111110] hover:bg-[#2b2a28] transition-[transform,background-color] duration-150 active:scale-[0.98] cursor-pointer"
            >
              Get 10-Roof Brief
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111110] hover:bg-[#f5f5f4] rounded-full transition-colors duration-150"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pointer-events-auto max-w-[1240px] mx-auto mt-2 bg-white rounded-2xl shadow-xl px-5 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <p className="text-[13px] font-semibold text-[#4a4845] mb-1">Product</p>
              <Link
                href="/#platform"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[15px] font-medium text-[#111110] py-1.5"
              >
                Target Matcher
              </Link>
              <Link
                href="/#ai-engine"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[15px] font-medium text-[#111110] py-1.5"
              >
                How It Picks
              </Link>
              <Link
                href="/#pipeline-finder"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[15px] font-medium text-[#111110] py-1.5"
              >
                DFW Roofs
              </Link>
              <Link
                href="/#pricing"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[15px] font-medium text-[#111110] py-1.5"
              >
                Pricing
              </Link>
            </div>

            <div>
              <p className="text-[13px] font-semibold text-[#4a4845] mb-1">Solutions</p>
              {SOLUTIONS_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[15px] font-medium text-[#111110] py-1.5"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div>
              <p className="text-[13px] font-semibold text-[#4a4845] mb-1">Research</p>
              {RESEARCH_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[15px] font-medium text-[#111110] py-1.5"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  dispatchModalEvent("open-demo", "navbar_mobile");
                }}
                className="w-full py-2.5 text-center font-medium rounded-full text-[#111110] bg-[#f5f4f1] hover:bg-[#ebe9e4] transition-colors duration-150 cursor-pointer"
              >
                Book walkthrough
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  dispatchModalEvent("open-trial", "navbar_mobile");
                }}
                className="w-full py-2.5 text-center font-semibold rounded-full text-white bg-[#111110] hover:bg-[#2b2a28] transition-colors duration-150 cursor-pointer"
              >
                Get 10-Roof Brief
              </button>
            </div>
          </div>
        )}
      </header>

      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
      <TrialDemoModal isOpen={trialModalOpen} onClose={() => setTrialModalOpen(false)} />
    </>
  );
}
