"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Search,
  Home,
  Users,
  Building2,
  LayoutGrid,
  Target,
  Mail,
  Phone,
  Settings,
  Sparkles,
  Mic,
  ChevronRight,
  Star,
  Lock,
  ArrowRight,
} from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { getOrCreateVisitorId, logVisitorEvent } from "./VisitorTracker";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const typedAlertSentRef = useRef<string>("");

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsSubmitted(false);
      setEmail("");
      setErrorMsg("");
      typedAlertSentRef.current = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // When user types email and blurs, instantly notify radar
  const handleEmailBlur = () => {
    const trimmed = email.trim();
    if (
      trimmed &&
      trimmed.includes("@") &&
      trimmed.includes(".") &&
      typedAlertSentRef.current !== trimmed
    ) {
      typedAlertSentRef.current = trimmed;
      // 1. High-intent radar visitor alert event
      logVisitorEvent("form_intent", {
        actionDetail: `Typed email in Live Demo modal: ${trimmed}`,
      });
      // 2. Register email in pilot system with partial flag so team gets immediate alert
      const vid = getOrCreateVisitorId();
      fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          visitorId: vid,
          name: "Live Demo Inquirer",
          company: "Commercial Contractor (Typed in Demo Modal)",
          source: "Navbar Live Demo Software Preview Modal",
          isPartial: true,
        }),
      }).catch(() => {});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setErrorMsg("Please enter a valid business email.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");

    const vid = getOrCreateVisitorId();

    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          visitorId: vid,
          name: "Live Demo Inquirer",
          company: "Commercial Contractor (Demo Request)",
          source: "Navbar Live Demo Software Preview Modal",
          isPartial: false,
        }),
      });

      if (!res.ok) {
        console.warn("[DemoModal] Non-200 response:", res.status);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error("[DemoModal] Submit error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden animate-in fade-in duration-200">
      
      {/* ============================================================== */}
      {/* 1. BACKGROUND LAYER: EXACT DEPOII SOFTWARE UI                  */}
      {/* (Visible behind modal with psychological "one step ahead" effect) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 w-full h-full flex bg-[#f7f8fa] text-neutral-900 select-none pointer-events-none">
        
        {/* LEFT ICON RAIL */}
        <div className="w-14 sm:w-16 bg-[#ffffff] border-r border-neutral-200/90 flex flex-col items-center py-4 justify-between shrink-0">
          <div className="flex flex-col items-center space-y-5">
            <div className="p-1.5 rounded-lg hover:bg-neutral-100">
              <DepoiiMark className="w-6 h-6 text-neutral-950" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900">
              <Search className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400">
              <Users className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400">
              <Target className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400">
              <Mail className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400">
              <Phone className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400">
              <Settings className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CENTER MAIN WORKSPACE */}
        <div className="flex-1 flex flex-col p-6 sm:p-10 overflow-hidden bg-[#fafafa]">
          {/* Header Title & Subtitle */}
          <div className="text-left mb-6">
            <h1 className="text-[24px] sm:text-[28px] font-bold text-neutral-950 tracking-tight">
              Next steps for you
            </h1>
            <p className="text-[13px] sm:text-[14px] text-neutral-500 mt-1">
              Explore recommended actions to build on your setup and unlock more value
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-6 border-b border-neutral-200/80 pb-2 mb-6 text-[13.5px]">
            <div className="flex items-center gap-1.5 text-neutral-400 font-medium pb-2">
              <span>Workspace setup</span>
              <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-600 text-[10px] flex items-center justify-center font-bold">
                1
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-950 font-bold border-b-2 border-neutral-950 pb-2 -mb-2.5">
              <span>Recommendations</span>
              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center font-bold">
                2
              </span>
            </div>
          </div>

          {/* Table Header & Rows */}
          <div className="bg-white rounded-xl border border-neutral-200/80 shadow-2xs overflow-hidden mb-8">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-left">
              <div className="col-span-6">TITLE</div>
              <div className="col-span-4">DESCRIPTION</div>
              <div className="col-span-2 text-right">NEXT STEP</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-12 px-5 py-4 border-b border-neutral-100 items-center text-left hover:bg-neutral-50 text-[13px]">
              <div className="col-span-6 font-semibold text-neutral-900 flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                <span>Keep records accurate with real-time enrichment</span>
              </div>
              <div className="col-span-4 text-neutral-500 text-[12.5px]">
                Auto-sync daily municipal permits and dual-pol hail corridors
              </div>
              <div className="col-span-2 text-right font-medium text-neutral-900 flex items-center justify-end gap-1">
                <span>Start</span>
                <span>&gt;</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 px-5 py-4 items-center text-left hover:bg-neutral-50 text-[13px]">
              <div className="col-span-6 font-semibold text-neutral-900 flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                <span>Refresh records automatically with scheduled enrichment</span>
              </div>
              <div className="col-span-4 text-neutral-500 text-[12.5px]">
                Texas Secretary of State corporate cross-referencing
              </div>
              <div className="col-span-2 text-right font-medium text-neutral-900 flex items-center justify-end gap-1">
                <span>Start</span>
                <span>&gt;</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="text-left">
            <h2 className="text-[17px] font-bold text-neutral-950 tracking-tight mb-4">
              Explore ready-made Sales Plays and tutorials to build momentum
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 bg-white rounded-xl border border-neutral-200/80 text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-purple-600 mb-1">
                  Outbound Play
                </div>
                <div className="font-bold text-[13px] text-neutral-900">
                  Build your corridor TAM
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-neutral-200/80 text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                  Targeting
                </div>
                <div className="font-bold text-[13px] text-neutral-900">
                  Score accounts for fit
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-neutral-200/80 text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                  Entity Resolution
                </div>
                <div className="font-bold text-[13px] text-neutral-900">
                  Find decision makers
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-neutral-200/80 text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1">
                  Sequence
                </div>
                <div className="font-bold text-[13px] text-neutral-900">
                  Craft first-touch outreach
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COPILOT DRAWER */}
        <div className="w-72 lg:w-80 bg-white border-l border-neutral-200/90 hidden md:flex flex-col justify-between p-5 text-left">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100 text-[12px] font-medium text-neutral-700">
              <div className="flex items-center gap-1.5">
                <span>New chat</span>
                <span className="text-[10px]">▾</span>
              </div>
              <X className="w-3.5 h-3.5 text-neutral-400" />
            </div>

            <div className="flex flex-col items-center text-center my-6">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
                <Sparkles className="w-5 h-5 text-[#FF9C6D]" />
              </div>
              <h3 className="text-[16px] font-bold text-neutral-950">
                How can Depoii AI help?
              </h3>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                disabled
                placeholder="What can I help you do?"
                className="w-full h-10 pl-3 pr-8 rounded-lg border border-neutral-200 bg-neutral-50 text-[12.5px] placeholder:text-neutral-400"
              />
              <Mic className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3.5" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                <span>Explore prompts</span>
                <span className="text-neutral-500 font-semibold cursor-pointer">View all</span>
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-100 hover:bg-neutral-50 text-[12px] text-neutral-700">
                Build your TAM · Outbound
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-100 hover:bg-neutral-50 text-[12px] text-neutral-700">
                Score accounts for fit · Outbound
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-100 hover:bg-neutral-50 text-[12px] text-neutral-700">
                Find decision makers at target accounts
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. OVERLAY SCRIM / BACKDROP (Slightly dims background)        */}
      {/* ============================================================== */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
        aria-label="Close modal backdrop"
      />

      {/* ============================================================== */}
      {/* 3. FLOATING MODAL CARD: EXACT APOLLO STYLE                     */}
      {/* ============================================================== */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.32)] border border-neutral-200/90 p-7 sm:p-9 max-w-[480px] w-full mx-4 z-10 text-center animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Modal Title in Apollo-like serif styling */}
            <h2 className="text-[28px] sm:text-[34px] font-normal tracking-tight text-neutral-950 font-serif leading-[1.15]">
              See Depoii in action
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-[13.5px] sm:text-[14px] text-neutral-600 font-normal">
              We&apos;d love to show how Depoii can help you win commercial roofs.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-2.5">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="Enter email"
                className="w-full h-10 sm:h-11 px-3.5 rounded-md border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1.5 focus:ring-neutral-950 focus:border-neutral-950 text-[14px] transition"
              />

              {errorMsg && (
                <p className="text-[12px] text-red-600 text-left pl-1">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 sm:h-11 rounded-md bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-[14px] transition flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Get a demo</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Privacy Disclaimer */}
            <p className="mt-4 text-[10.5px] leading-relaxed text-neutral-500">
              By submitting this form, you will receive commercial property intelligence and briefings from Depoii. To learn more, see our{" "}
              <a href="#" className="underline hover:text-neutral-800">
                Privacy Statement
              </a>
              .
            </p>

            {/* Review Trust Row */}
            <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10.5px] font-medium text-neutral-700">
              <div className="flex items-center text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span>4.9/5 based on DFW contractor reviews | Strict exclusivity</span>
            </div>
          </>
        ) : (
          /* ========================================================== */
          /* SUCCESS STATE: DEPOII DESIGN SYSTEM (TASTE-SKILL COMPLIANT) */
          /* ========================================================== */
          <div className="text-center animate-in fade-in zoom-in-95 duration-150">
            {/* Top Depoii Mark & Status Badge */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <DepoiiMark className="w-6 h-6 text-neutral-950 shrink-0" />
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-semibold text-neutral-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9C6D] ring-4 ring-[#FF9C6D]/20 animate-pulse" />
                <span>Corridor Lockout Reserved</span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-[22px] sm:text-[26px] font-bold text-neutral-950 tracking-[-0.03em] leading-[1.15]">
              Walkthrough request confirmed.
            </h2>

            {/* Recipient note with mono badge */}
            <p className="mt-2 text-[13px] sm:text-[13.5px] text-neutral-600 leading-relaxed max-w-sm mx-auto">
              Our team will contact you within 24 hours at{" "}
              <span className="font-mono font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200/90 text-[12px] break-all inline-block mt-0.5">
                {email}
              </span>
            </p>

            {/* Depoii Territory Allocation Spec Box */}
            <div className="mt-4 rounded-xl border border-neutral-200 bg-[#fafaf9] p-3.5 text-left divide-y divide-neutral-200/70 text-[12px]">
              <div className="pb-2 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Bidding Scope</span>
                <span className="font-bold text-neutral-950">Dallas–Fort Worth Metroplex</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Active Coverage</span>
                <span className="font-bold text-neutral-950">70,000+ Monitored Roofs</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Corridor Lockout</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Held for 24 Hours
                </span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Response SLA</span>
                <span className="font-bold text-neutral-950">&lt; 24h via Direct Calendar</span>
              </div>
            </div>

            {/* Preparation Checkpoints */}
            <div className="mt-3.5 p-3 rounded-lg bg-white border border-neutral-200/80 text-left space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                What we prepare for your territory
              </div>
              <div className="text-[11.5px] text-neutral-700 leading-snug flex items-start gap-1.5">
                <span className="text-[#FF9C6D] font-bold mt-0.5">•</span>
                <span>Audit of unpermitted commercial reroofs in your target corridor.</span>
              </div>
              <div className="text-[11.5px] text-neutral-700 leading-snug flex items-start gap-1.5">
                <span className="text-[#FF9C6D] font-bold mt-0.5">•</span>
                <span>Verified building owner contacts &amp; direct-dial facility managers.</span>
              </div>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full h-10 rounded-md bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-[13.5px] transition flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] cursor-pointer"
            >
              <span>Return to overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

