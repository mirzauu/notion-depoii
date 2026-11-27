import React from "react";

export interface PlaceholderMetricProps {
  label: string;
  templateId: string;
  description?: string;
  unitHint?: string;
  variant?: "card" | "table-cell" | "inline";
  tone?: "light" | "dark";
  className?: string;
}

export function PlaceholderMetric({
  label,
  templateId,
  description,
  unitHint,
  variant = "card",
  tone = "light",
  className = "",
}: PlaceholderMetricProps) {
  const ariaLabel = `${label}: Verified metric pending (${unitHint ?? "value pending"})`;

  if (variant === "table-cell") {
    return (
      <span
        data-placeholder="true"
        data-metric-id={templateId}
        aria-label={ariaLabel}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ffdec4] text-[#9a3412] text-[13px] font-semibold whitespace-nowrap ${className}`}
      >
        [VERIFIED_METRIC_PENDING]
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span
        data-placeholder="true"
        data-metric-id={templateId}
        aria-label={ariaLabel}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ffdec4] text-[#9a3412] text-[14px] font-semibold ${className}`}
      >
        [VERIFIED_METRIC_PENDING]
      </span>
    );
  }

  const isDark = tone === "dark";

  return (
    <div
      data-placeholder="true"
      data-metric-id={templateId}
      aria-label={ariaLabel}
      className={`rounded-2xl p-6 border-l-4 border-[#c2410c] flex flex-col justify-between gap-3 ${
        isDark ? "bg-[#1b1b19] text-white" : "bg-[#f5f5f4] text-[#111110]"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className={`text-[14px] font-semibold leading-snug ${
            isDark ? "text-white" : "text-[#111110]"
          }`}
        >
          {label}
        </p>
        <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[13px] font-semibold bg-[#ffdec4] text-[#9a3412]">
          Pending Data
        </span>
      </div>

      <p
        className={`text-[18px] font-bold tracking-tight ${
          isDark ? "text-[#FF9C6D]" : "text-[#c2410c]"
        }`}
      >
        [VERIFIED_METRIC_PENDING]
      </p>

      <div className="space-y-1">
        {description && (
          <p
            className={`text-[14px] leading-relaxed ${
              isDark ? "text-neutral-300" : "text-[#4a4845]"
            }`}
          >
            {description}
          </p>
        )}
        {unitHint && (
          <p
            className={`text-[13px] ${
              isDark ? "text-neutral-400" : "text-[#3a3835]"
            }`}
          >
            Target unit: {unitHint}
          </p>
        )}
      </div>
    </div>
  );
}
