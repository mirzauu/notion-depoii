export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID);
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}

export function trackOpenTrial(source = "unknown"): void {
  trackEvent("open-trial", {
    event_category: "conversion_modal",
    event_label: "10-Roof Territory Brief",
    trigger_source: source,
    page_path: typeof window !== "undefined" ? window.location.pathname : "/",
  });
}

export function trackOpenDemo(source = "unknown"): void {
  trackEvent("open-demo", {
    event_category: "conversion_modal",
    event_label: "DFW Territory Walkthrough",
    trigger_source: source,
    page_path: typeof window !== "undefined" ? window.location.pathname : "/",
  });
}

export function trackGenerateLead(input: {
  leadType: "trial_brief" | "walkthrough_demo";
  source: string;
  territory?: string;
  sizeRange?: string;
}): void {
  trackEvent("generate_lead", {
    lead_type: input.leadType,
    source: input.source,
    territory: input.territory ?? "Dallas-Fort Worth",
    size_range: input.sizeRange ?? "Commercial 25k+ sq ft",
    currency: "USD",
  });
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
}
