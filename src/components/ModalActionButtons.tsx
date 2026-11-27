"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ModalActionButtonsProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  source: string;
  tone?: "light" | "dark";
}

function dispatchModal(eventName: "open-trial" | "open-demo", source: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName, { detail: { source } }));
  }
}

export function ModalActionButtons({
  primaryLabel = "Get My 10-Roof Territory Brief",
  secondaryLabel = "Book walkthrough",
  source,
  tone = "light",
}: ModalActionButtonsProps) {
  const isDark = tone === "dark";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => dispatchModal("open-trial", source)}
        className={`h-12 px-7 rounded-full font-semibold text-[15px] transition-colors inline-flex items-center gap-2 cursor-pointer ${
          isDark
            ? "bg-white text-[#111110] hover:bg-[#f5f5f4]"
            : "bg-[#111110] text-white hover:bg-[#2b2a28]"
        }`}
      >
        <span>{primaryLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => dispatchModal("open-demo", source)}
        className={`h-12 px-6 rounded-full font-semibold text-[15px] transition-colors cursor-pointer ${
          isDark
            ? "bg-[#c2410c] hover:bg-[#9a3412] text-white"
            : "bg-white hover:bg-[#eaeae7] text-[#111110]"
        }`}
      >
        {secondaryLabel}
      </button>
    </div>
  );
}
