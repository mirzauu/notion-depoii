"use client";

import React, { useEffect, useRef, useState } from "react";

const VID_KEY = "depoii_vid";
const VISIT_COUNT_KEY = "depoii_visit_count";
const FIRST_SEEN_KEY = "depoii_first_seen";
const SESSION_PING_KEY = "depoii_session_pinged";
const LOCAL_ACTION_TRAIL_KEY = "depoii_action_trail";

export interface MicroAction {
  id: string;
  timeOffsetSec: number;
  timeFormatted: string; // e.g. "+00:14s"
  timestamp: string;
  category: "click" | "scroll" | "section" | "input" | "copy" | "modal";
  label: string;
  detail?: string;
}

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = localStorage.getItem(VID_KEY);
  if (!vid) {
    vid =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
        : `v_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
    localStorage.setItem(VID_KEY, vid);
    localStorage.setItem(FIRST_SEEN_KEY, new Date().toISOString());
    localStorage.setItem(VISIT_COUNT_KEY, "1");
  }
  return vid;
}

// Global logger accessible from any component for explicit events
export function logVisitorEvent(
  eventType: "visit" | "dwell" | "interaction" | "form_intent",
  extra: { actionDetail?: string; dwellSeconds?: number; actions?: MicroAction[] } = {}
) {
  try {
    const visitorId = getOrCreateVisitorId();
    const visitCount = Number(localStorage.getItem(VISIT_COUNT_KEY) || "1");

    fetch("/api/visitor-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        eventType,
        visitCount,
        path: window.location.pathname + window.location.hash,
        referrer: document.referrer || "Direct",
        screen: `${window.screen.width}x${window.screen.height}`,
        ...extra,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Fail silently
  }
}

function formatOffset(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `+${m > 0 ? `${m}m ` : ""}${s < 10 ? `0${s}` : s}s`;
}

function cleanText(text: string | null | undefined, maxLen = 60): string {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function extractElementLabel(el: HTMLElement | null): { category: "click" | "input"; label: string; detail?: string } | null {
  if (!el) return null;

  // 1. Buttons
  const button = el.closest("button");
  if (button) {
    const aria = button.getAttribute("aria-label");
    const raw = cleanText(button.innerText) || aria || "Button";
    return {
      category: "click",
      label: `Clicked button: "${raw}"`,
      detail: button.className.includes("rounded-full") ? "Pill CTA" : undefined,
    };
  }

  // 2. Links
  const link = el.closest("a");
  if (link) {
    const href = link.getAttribute("href") || "";
    const raw = cleanText(link.innerText) || href || "Link";
    return {
      category: "click",
      label: `Clicked link: "${raw}"`,
      detail: href,
    };
  }

  // 3. Archetype Cards / Selectors in Workspace
  const clickableContainer = el.closest('[data-archetype], [data-tab], [role="button"], .cursor-pointer');
  if (clickableContainer && clickableContainer instanceof HTMLElement) {
    const text = cleanText(clickableContainer.innerText);
    if (text) {
      return {
        category: "click",
        label: `Selected item: "${text.slice(0, 50)}"`,
      };
    }
  }

  // 4. Input clicks
  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    const input = el as HTMLInputElement;
    const name = input.placeholder || input.name || "input";
    return {
      category: "input",
      label: `Focused input: "${name}"`,
    };
  }

  return null;
}

export function VisitorTracker() {
  const startTimeRef = useRef<number>(0);
  const actionBufferRef = useRef<MicroAction[]>([]);
  const scrollMilestonesRef = useRef<{ [percent: number]: boolean }>({});
  const activeSectionRef = useRef<{ name: string; enteredAt: number } | null>(null);
  const [hudOpen, setHudOpen] = useState(false);
  const [hudActions, setHudActions] = useState<MicroAction[]>([]);
  const [hudVisible, setHudVisible] = useState(false);

  // Initialize and enable HUD toggle in dev mode or with ?radar=1 query param
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDev = process.env.NODE_ENV !== "production";
      const hasRadarParam = window.location.search.includes("radar=1");
      setHudVisible(isDev || hasRadarParam);
    }
  }, []);

  const recordAction = (
    category: MicroAction["category"],
    label: string,
    detail?: string
  ) => {
    const now = Date.now();
    const offsetSec = Math.max(0, Math.floor((now - startTimeRef.current) / 1000));
    const action: MicroAction = {
      id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timeOffsetSec: offsetSec,
      timeFormatted: formatOffset(offsetSec),
      timestamp: new Date().toISOString(),
      category,
      label,
      detail,
    };

    actionBufferRef.current.push(action);
    setHudActions((prev) => [...prev.slice(-49), action]);

    // Save trail in session storage for continuity
    try {
      const stored = JSON.parse(sessionStorage.getItem(LOCAL_ACTION_TRAIL_KEY) || "[]");
      sessionStorage.setItem(
        LOCAL_ACTION_TRAIL_KEY,
        JSON.stringify([...stored.slice(-99), action])
      );
    } catch {}

    // Flush immediately for high-value clicks/inputs
    if (
      category === "input" ||
      category === "modal" ||
      label.includes("Start free trial") ||
      label.includes("Get a demo") ||
      label.includes("Claim")
    ) {
      flushActions("interaction", label);
    }
  };

  const flushActions = (
    eventType: "visit" | "dwell" | "interaction" | "form_intent" = "interaction",
    actionDetail?: string
  ) => {
    if (actionBufferRef.current.length === 0) return;
    const actionsToSend = [...actionBufferRef.current];
    actionBufferRef.current = []; // Clear buffer

    const visitorId = getOrCreateVisitorId();
    const visitCount = Number(localStorage.getItem(VISIT_COUNT_KEY) || "1");

    fetch("/api/visitor-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        eventType,
        visitCount,
        path: window.location.pathname + window.location.hash,
        referrer: document.referrer || "Direct",
        screen: `${window.screen.width}x${window.screen.height}`,
        actionDetail: actionDetail || actionsToSend[actionsToSend.length - 1]?.label,
        actions: actionsToSend,
      }),
      keepalive: true,
    }).catch(() => {});
  };

  useEffect(() => {
    startTimeRef.current = Date.now();

    // 1. Initial Visit Ping
    const isSessionPinged = sessionStorage.getItem(SESSION_PING_KEY);
    let visitCount = Number(localStorage.getItem(VISIT_COUNT_KEY) || "0");
    if (!isSessionPinged) {
      visitCount += 1;
      localStorage.setItem(VISIT_COUNT_KEY, String(visitCount));
      sessionStorage.setItem(SESSION_PING_KEY, "1");
      recordAction("section", "Visitor landed on Depoii commercial intelligence");
      flushActions("visit");
    }

    // 2. Global Click Capture (Button, Links, Property Cards, Tabs, Sound waves)
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Don't log clicks on the radar HUD itself
      if (target.closest("#depoii-radar-hud")) return;

      const extracted = extractElementLabel(target);
      if (extracted) {
        recordAction(extracted.category, extracted.label, extracted.detail);
      }
    };

    // 3. Scroll Depth Milestones (25%, 50%, 75%, 90%, 100%)
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const percent = Math.min(100, Math.round((window.scrollY / totalHeight) * 100));

        const milestones = [25, 50, 75, 90, 100];
        for (const m of milestones) {
          if (percent >= m && !scrollMilestonesRef.current[m]) {
            scrollMilestonesRef.current[m] = true;
            recordAction("scroll", `Scrolled to ${m}% depth of landing page`);
          }
        }
      }, 200);
    };

    // 4. Section Visibility & Dwell Tracker
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            const sectionName =
              entry.target.getAttribute("id") ||
              entry.target.getAttribute("aria-label") ||
              entry.target.tagName.toLowerCase();

            const readableName =
              sectionName === "ai-engine"
                ? "AI Engine Section"
                : sectionName === "platform" || sectionName === "workspace"
                ? "Interactive Workspace Demo"
                : sectionName === "pipeline-finder"
                ? "Live Territory Pipeline"
                : sectionName === "hero" || entry.target.tagName === "SECTION"
                ? "Hero Commercial Overview"
                : `Section: ${sectionName}`;

            if (activeSectionRef.current?.name !== readableName) {
              const now = Date.now();
              if (activeSectionRef.current) {
                const spent = Math.round((now - activeSectionRef.current.enteredAt) / 1000);
                if (spent >= 4) {
                  recordAction("section", `Viewed ${activeSectionRef.current.name} for ${spent}s`);
                }
              }
              activeSectionRef.current = { name: readableName, enteredAt: now };
              recordAction("section", `Scrolled into view: ${readableName}`);
            }
          }
        }
      },
      { threshold: [0.35] }
    );

    // Observe key sections
    const trackedSections = document.querySelectorAll("section, [id='ai-engine'], [id='pipeline-finder'], footer");
    trackedSections.forEach((sec) => sectionObserver.observe(sec));

    // 5. Input Typing & Focus Micro-Interactions
    let inputDebounce: NodeJS.Timeout | null = null;
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target || (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA")) return;
      if (target.type === "password") return;

      const val = target.value?.trim() || "";
      if (inputDebounce) clearTimeout(inputDebounce);
      inputDebounce = setTimeout(() => {
        if (val.length >= 3) {
          // Mask middle of email for privacy if present
          let masked = val;
          if (val.includes("@")) {
            const parts = val.split("@");
            masked = `${parts[0].slice(0, 3)}***@${parts[1]}`;
          }
          recordAction("input", `Typed in email field (${val.length} chars)`, masked);
        }
      }, 1200);
    };

    // 6. Text Copy Signal (e.g. copied property address or phone)
    const handleCopy = () => {
      const selection = window.getSelection()?.toString().trim();
      if (selection && selection.length > 2) {
        recordAction("copy", `Copied text from page`, `"${cleanText(selection, 40)}"`);
      }
    };

    // 7. Periodic Batch Flush (every 8 seconds if actions accumulated)
    const flushInterval = setInterval(() => {
      flushActions("dwell");
    }, 8000);

    // 8. Departure Flush (Flush remaining buffer when user leaves/switches tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const totalElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordAction("section", `Left page after ${totalElapsed}s total dwell time`);
        flushActions("dwell", `Session ended: ${totalElapsed}s dwell`);
      }
    };

    // Attach all listeners
    document.addEventListener("click", handleDocumentClick, { capture: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("input", handleInput, { passive: true });
    document.addEventListener("copy", handleCopy);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("input", handleInput);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(flushInterval);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (inputDebounce) clearTimeout(inputDebounce);
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Live Micro-Action HUD (Shows in development or with ?radar=1) */}
      {hudVisible && (
        <aside
          id="depoii-radar-hud"
          aria-label="Live Radar Action Feed"
          className="fixed bottom-4 right-4 z-[999] pointer-events-auto font-sans"
        >
          {!hudOpen ? (
            <button
              onClick={() => setHudOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-950 text-white text-[12px] font-medium shadow-2xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Radar: {hudActions.length} Actions</span>
            </button>
          ) : (
            <div className="w-[340px] max-h-[460px] bg-neutral-950/95 text-white rounded-2xl shadow-2xl border border-neutral-800 backdrop-blur-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
              {/* Header */}
              <div className="p-3.5 border-b border-neutral-800/80 flex items-center justify-between bg-neutral-900/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[12.5px] font-bold text-white tracking-tight">
                    Live Visitor Micro-Actions
                  </span>
                </div>
                <button
                  onClick={() => setHudOpen(false)}
                  className="text-neutral-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-neutral-800 transition"
                >
                  ✕
                </button>
              </div>

              {/* Feed */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 text-[11.5px] font-mono divide-y divide-neutral-900">
                {hudActions.length === 0 ? (
                  <p className="text-neutral-500 italic p-3 text-center">
                    Click anywhere, scroll, or switch tabs to see actions stream live...
                  </p>
                ) : (
                  hudActions
                    .slice()
                    .reverse()
                    .map((act) => (
                      <div key={act.id} className="pt-2 first:pt-0">
                        <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                          <span className="font-semibold text-emerald-400">{act.timeFormatted}</span>
                          <span className="uppercase text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300">
                            {act.category}
                          </span>
                        </div>
                        <p className="text-neutral-100 mt-0.5 leading-snug">{act.label}</p>
                        {act.detail && (
                          <p className="text-neutral-400 text-[10px] truncate mt-0.5">
                            ↳ {act.detail}
                          </p>
                        )}
                      </div>
                    ))
                )}
              </div>

              {/* Footer */}
              <div className="p-2 border-t border-neutral-800/80 bg-neutral-900/40 flex items-center justify-between text-[10.5px] text-neutral-400">
                <span>{hudActions.length} recorded this session</span>
                <a
                  href="/api/visitor-alert"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FF9C6D] hover:underline"
                >
                  View Server Feed ↗
                </a>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
