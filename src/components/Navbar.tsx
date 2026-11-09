"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
              href="#platform"
              prefetch={false}
              className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors"
            >
              Platform
            </Link>
            <Link
              href="#pipeline-finder"
              prefetch={false}
              className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors"
            >
              Territories
            </Link>
            <Link
              href="#pilot"
              prefetch={false}
              className="px-3.5 py-1.5 text-[14px] font-medium text-black/75 hover:text-black rounded-md hover:bg-black/[0.04] transition-colors"
            >
              Pilot Access
            </Link>
          </nav>
        </div>

        {/* Right CTA / Auth */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="#pilot"
            prefetch={false}
            className="px-4 py-2 text-[14px] font-semibold rounded-full text-white bg-neutral-950 hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.98]"
          >
            Claim territory
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
            href="#platform"
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[15px] font-medium text-black py-2"
          >
            Platform
          </Link>
          <Link
            href="#pipeline-finder"
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[15px] font-medium text-black py-2"
          >
            Territories
          </Link>
          <Link
            href="#pilot"
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[15px] font-medium text-black py-2"
          >
            Pilot Access
          </Link>
          <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2">
            <Link
              href="#pilot"
              prefetch={false}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center font-semibold rounded-full text-white bg-neutral-950 hover:bg-neutral-800 block shadow-sm"
            >
              Claim territory
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
