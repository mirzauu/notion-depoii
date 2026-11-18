"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2
} from "lucide-react";
import { DepoiiMark } from "./DepoiiLogo";
import { getOrCreateVisitorId, logVisitorEvent } from "./VisitorTracker";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsSubmitted(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setErrorMsg("");
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid business email address.");
      return;
    }
    if (!firstName.trim()) {
      setErrorMsg("Please enter your first name.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const visitorId = getOrCreateVisitorId();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          email: email.trim(),
          name: fullName || "Commercial Contractor",
          company: "Commercial Roofing Contractor",
          territory: "Dallas–Fort Worth, TX",
          sizeRange: "Enterprise Commercial / Industrial",
          source: "Clay-Style Get A Demo Form",
          isPartial: false,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed. Please try again.");
      }

      setIsSubmitted(true);
      logVisitorEvent("interaction", {
        actionDetail: `Completed Get A Demo application for ${email.trim()}`,
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f4f3f0] animate-in fade-in duration-200">
      
      {/* Floating Top Close Button */}
      <button
        onClick={onClose}
        aria-label="Close demo modal"
        className="fixed top-5 right-5 sm:top-6 sm:right-8 z-50 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-neutral-300 text-neutral-700 hover:text-neutral-950 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Floating Header matching Navbar style */}
      <header className="sticky top-0 z-40 w-full pointer-events-none px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto pointer-events-auto bg-white rounded-b-[20px] sm:rounded-b-[24px] border-b border-x border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-4 sm:px-7 h-16 sm:h-[68px] flex items-center justify-between">
          {/* Left: Logo & Nav items exactly like Navbar */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" prefetch={false} onClick={onClose} className="flex items-center gap-2.5 group shrink-0">
              <DepoiiMark className="w-7 h-7 text-neutral-950 transition-transform group-hover:scale-105" />
              <span className="font-bold text-[1.35rem] tracking-tight text-neutral-950">
                Depoii
              </span>
            </Link>

            {/* Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="#ai-engine"
                prefetch={false}
                onClick={onClose}
                className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-md hover:bg-neutral-100/70 transition-colors"
              >
                AI Engine
              </Link>
              <Link
                href="#platform"
                prefetch={false}
                onClick={onClose}
                className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-md hover:bg-neutral-100/70 transition-colors"
              >
                Workspace
              </Link>
              <Link
                href="#pipeline-finder"
                prefetch={false}
                onClick={onClose}
                className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 hover:text-neutral-950 rounded-md hover:bg-neutral-100/70 transition-colors"
              >
                Live Pipeline
              </Link>
            </nav>
          </div>

          {/* Right actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[13.5px] font-semibold rounded-full text-white bg-neutral-950 hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
            >
              Back to site
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Form Container */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
        
        {/* THE WHITE FORM CARD */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-neutral-200/80 shadow-[0_12px_45px_rgba(0,0,0,0.04)] p-8 sm:p-14 text-left">
          
          <h1 className="text-[34px] sm:text-[48px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.08]">
            See what Depoii can do
          </h1>

          <p className="mt-4 text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-lg">
            Curious to discover how Depoii can help your company grow faster? Get in touch with our team to learn more.
          </p>

          {/* Success state */}
          {isSubmitted ? (
            <div className="mt-10 p-8 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-950">We received your request!</h3>
              <p className="mt-2 text-neutral-600 text-[14.5px] max-w-md mx-auto">
                A Depoii territory specialist will reach out shortly to prepare a live 15-minute intelligence briefing for your corridor.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full bg-neutral-950 text-white font-semibold text-[13.5px] hover:bg-neutral-800 transition"
              >
                Return to overview
              </button>
            </div>
          ) : (
            /* The Form */
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[13px] font-semibold text-neutral-800 mb-2">
                    First name <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f7f8] hover:bg-[#f3f3f4] focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:outline-none transition-all text-[14.5px] text-neutral-950 placeholder:text-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-neutral-800 mb-2">
                    Last name <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f7f8] hover:bg-[#f3f3f4] focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:outline-none transition-all text-[14.5px] text-neutral-950 placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Row 2: Business Email (Full Width) */}
              <div>
                <label className="block text-[13px] font-semibold text-neutral-800 mb-2">
                  Business email <span className="text-neutral-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f7f8] hover:bg-[#f3f3f4] focus:bg-white border border-neutral-200/90 focus:border-neutral-900 focus:outline-none transition-all text-[14.5px] text-neutral-950 placeholder:text-neutral-400"
                />
              </div>

              {/* Error message */}
              {errorMsg && (
                <p className="text-[13px] font-medium text-rose-600 pt-1">
                  {errorMsg}
                </p>
              )}

              {/* Submit button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white font-semibold text-[14px] transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
