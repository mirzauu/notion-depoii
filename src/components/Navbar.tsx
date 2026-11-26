"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { DemoModal } from "./DemoModal";
import { TrialDemoModal } from "./TrialDemoModal";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          setTrialModalOpen(true);
          window.history.replaceState(null, "", " ");
        } else if (window.location.hash === "#demo") {
          setDemoModalOpen(true);
          window.history.replaceState(null, "", " ");
        }
      }
    };
    const handleOpenDemo = () => setDemoModalOpen(true);
    const handleOpenTrial = () => setTrialModalOpen(true);

    const handleDocumentClick = (e: MouseEvent) => {
      const trialTarget = (e.target as HTMLElement)?.closest('a[href="#trial"]');
      if (trialTarget) {
        e.preventDefault();
        setTrialModalOpen(true);
        return;
      }
      const demoTarget = (e.target as HTMLElement)?.closest('a[href="#demo"]');
      if (demoTarget) {
        e.preventDefault();
        setDemoModalOpen(true);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("open-demo", handleOpenDemo);
    window.addEventListener("open-trial", handleOpenTrial);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("open-demo", handleOpenDemo);
      window.removeEventListener("open-trial", handleOpenTrial);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full pointer-events-none px-5 sm:px-8">
        <div
          className={`max-w-[1240px] mx-auto pointer-events-auto bg-white/95 backdrop-blur-md rounded-b-[20px] px-4 sm:px-7 h-16 sm:h-[68px] flex items-center justify-between transition-[box-shadow,background-color] duration-200 ${
            scrolled
              ? "bg-white shadow-[0_10px_32px_rgba(0,0,0,0.08)]"
              : "bg-white/95 shadow-[0_6px_24px_rgba(0,0,0,0.05)]"
          }`}
        >
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" prefetch={false} className="flex items-center gap-2.5 group shrink-0">
              <DepoiiMark className="w-7 h-7 text-[#111110] transition-transform duration-150 group-hover:scale-105" />
              <span className="font-bold text-[1.35rem] tracking-tight text-[#111110]">
                Depoii
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 whitespace-nowrap" aria-label="Primary navigation">
              <Link
                href="#platform"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-[#4a4845] hover:text-[#111110] rounded-full hover:bg-[#f5f5f4] transition-colors duration-150"
              >
                Target Matcher
              </Link>
              <Link
                href="#ai-engine"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-[#4a4845] hover:text-[#111110] rounded-full hover:bg-[#f5f5f4] transition-colors duration-150"
              >
                How It Picks
              </Link>
              <Link
                href="#pipeline-finder"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-[#4a4845] hover:text-[#111110] rounded-full hover:bg-[#f5f5f4] transition-colors duration-150"
              >
                DFW Roofs
              </Link>
              <Link
                href="#pricing"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-[#4a4845] hover:text-[#111110] rounded-full hover:bg-[#f5f5f4] transition-colors duration-150"
              >
                Pricing
              </Link>
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="px-4 py-2 text-[14px] font-medium text-[#111110] bg-[#f5f5f4] hover:bg-[#e7e5e4] rounded-full transition-colors duration-150 cursor-pointer"
            >
              Book walkthrough
            </button>

            <button
              type="button"
              onClick={() => setTrialModalOpen(true)}
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
          <div className="lg:hidden pointer-events-auto max-w-[1240px] mx-auto mt-2 bg-white rounded-2xl shadow-xl px-5 py-4 space-y-2">
            <Link
              href="#platform"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-[#111110] py-2"
            >
              Target Matcher
            </Link>
            <Link
              href="#ai-engine"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-[#111110] py-2"
            >
              How It Picks
            </Link>
            <Link
              href="#pipeline-finder"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-[#111110] py-2"
            >
              DFW Roofs
            </Link>
            <Link
              href="#pricing"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-[#111110] py-2"
            >
              Pricing
            </Link>
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDemoModalOpen(true);
                }}
                className="w-full py-2.5 text-center font-medium rounded-full text-[#111110] bg-[#f5f4f1] hover:bg-[#ebe9e4] transition-colors duration-150 cursor-pointer"
              >
                Book walkthrough
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTrialModalOpen(true);
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
