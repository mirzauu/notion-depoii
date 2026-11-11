"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { DemoModal } from "./DemoModal";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#demo") {
        setDemoModalOpen(true);
        window.history.replaceState(null, "", " ");
      }
    };
    const handleOpenDemo = () => setDemoModalOpen(true);

    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("open-demo", handleOpenDemo);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("open-demo", handleOpenDemo);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 bg-white/95 backdrop-blur-md ${
          isScrolled ? "border-b border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.03)]" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Depoii Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" prefetch={false} className="flex items-center gap-2.5 group">
              <DepoiiMark className="w-7 h-7 text-neutral-950 transition-transform group-hover:scale-105" />
              <span className="font-bold text-[1.35rem] tracking-tight text-neutral-950">
                Depoii
              </span>
            </Link>

            {/* Desktop Nav Items - Clean single-page anchors */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="#intelligence"
                prefetch={false}
                className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors"
              >
                Intelligence
              </Link>
              <Link
                href="#platform"
                prefetch={false}
                className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors"
              >
                Dossier
              </Link>
              <Link
                href="#pipeline-finder"
                prefetch={false}
                className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors"
              >
                Flagged Roofs
              </Link>
              <Link
                href="#faq"
                prefetch={false}
                className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors"
              >
                FAQ
              </Link>
              <button
                type="button"
                onClick={() => setDemoModalOpen(true)}
                className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors cursor-pointer"
              >
                Demo
              </button>
            </nav>
          </div>

          {/* Right CTA / Auth */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="px-3.5 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Get a demo
            </button>
            <Link
              href="#pilot"
              prefetch={false}
              className="px-4 py-2 text-[14px] font-semibold rounded-full text-white bg-neutral-950 hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.98]"
            >
              See your corridor →
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-black/80 hover:text-black rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-black/[0.08] px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
            <Link
              href="#intelligence"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              Intelligence
            </Link>
            <Link
              href="#platform"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              Dossier
            </Link>
            <Link
              href="#pipeline-finder"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              Flagged Roofs
            </Link>
            <Link
              href="#faq"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-black py-2"
            >
              FAQ
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
                className="w-full py-2.5 text-center font-medium rounded-full text-neutral-900 border border-neutral-300 hover:bg-neutral-50 block shadow-2xs"
              >
                Get a demo
              </button>
              <Link
                href="#pilot"
                prefetch={false}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center font-semibold rounded-full text-white bg-neutral-950 hover:bg-neutral-800 block shadow-sm"
              >
                See your corridor →
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Full-Screen Software Preview + Floating Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
}
