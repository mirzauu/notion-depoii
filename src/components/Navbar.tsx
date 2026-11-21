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
      {/* Outer container: allows background image to show on left & right of hanging header */}
      <header className="sticky top-0 z-50 w-full pointer-events-none px-3 sm:px-6 lg:px-8">
        {/* Floating hanging island header exactly like Clay */}
        <div
          className={`max-w-[1240px] mx-auto pointer-events-auto bg-white/95 backdrop-blur-md rounded-b-[20px] sm:rounded-b-[24px] border-b border-x px-4 sm:px-7 h-16 sm:h-[68px] flex items-center justify-between transition-all duration-200 ${
            scrolled
              ? "bg-white border-neutral-300 shadow-[0_12px_40px_rgba(0,0,0,0.09)]"
              : "bg-white border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          }`}
        >
          
          {/* Left: Logo & Nav items */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" prefetch={false} className="flex items-center gap-2.5 group shrink-0">
              <DepoiiMark className="w-7 h-7 text-neutral-950 transition-transform group-hover:scale-105" />
              <span className="font-bold text-[1.35rem] tracking-tight text-neutral-950">
                Depoii
              </span>
            </Link>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="#platform"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-md hover:bg-neutral-100/70 transition-colors"
              >
                Workspace
              </Link>
              <Link
                href="#ai-engine"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-md hover:bg-neutral-100/70 transition-colors"
              >
                AI Engine
              </Link>
              <Link
                href="#pipeline-finder"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-md hover:bg-neutral-100/70 transition-colors"
              >
                Live Pipeline
              </Link>
              <Link
                href="#pricing"
                prefetch={false}
                className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-md hover:bg-neutral-100/70 transition-colors"
              >
                Pricing
              </Link>
            </nav>
          </div>

          {/* Right: Get a demo, Start free trial */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Get a demo (Light gray pill) */}
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="px-4 py-2 text-[13.5px] font-medium text-neutral-900 bg-[#f4f5f6] hover:bg-[#eaecee] border border-neutral-200/70 rounded-full transition-all cursor-pointer shadow-2xs"
            >
              Get a demo
            </button>

            {/* Start free trial (Black pill) */}
            <button
              type="button"
              onClick={() => setTrialModalOpen(true)}
              className="px-4 py-2 text-[13.5px] font-semibold rounded-full text-white bg-neutral-950 hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Start free trial
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-800 hover:text-black rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pointer-events-auto max-w-[1240px] mx-auto mt-2 bg-white rounded-2xl border border-neutral-200 shadow-xl px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <Link
              href="#platform"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              Workspace
            </Link>
            <Link
              href="#ai-engine"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              AI Engine
            </Link>
            <Link
              href="#pipeline-finder"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              Live Pipeline
            </Link>
            <Link
              href="#pricing"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              Pricing
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setDemoModalOpen(true);
              }}
              className="w-full text-left text-[15px] font-medium text-black py-2 cursor-pointer"
            >
              Demo Preview
            </button>
            <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDemoModalOpen(true);
                }}
                className="w-full py-2.5 text-center font-medium rounded-full text-neutral-900 bg-[#f4f5f6] hover:bg-[#eaecee] border border-neutral-200/70 block shadow-2xs cursor-pointer"
              >
                Get a demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTrialModalOpen(true);
                }}
                className="w-full py-2.5 text-center font-semibold rounded-full text-white bg-neutral-950 hover:bg-neutral-800 block shadow-sm cursor-pointer"
              >
                Start free trial
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Clay-style Get a Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />

      {/* Software Preview Trial Demo Modal (Exact Live Software UI in background + Email Box) */}
      <TrialDemoModal isOpen={trialModalOpen} onClose={() => setTrialModalOpen(false)} />
    </>
  );
}
