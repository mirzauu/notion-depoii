"use client";

import { useEffect, useRef } from "react";

const VID_KEY = "depoii_vid";
const VISIT_COUNT_KEY = "depoii_visit_count";
const FIRST_SEEN_KEY = "depoii_first_seen";
const SESSION_PING_KEY = "depoii_session_pinged";

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

export function logVisitorEvent(
  eventType: "visit" | "dwell" | "interaction" | "form_intent",
  extra: { actionDetail?: string; dwellSeconds?: number } = {}
) {
  if (typeof window === "undefined") return;
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

export function VisitorTracker() {
  const dwellReportedRef = useRef<{ [seconds: number]: boolean }>({});
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check & increment visit count if new session
    const isSessionPinged = sessionStorage.getItem(SESSION_PING_KEY);
    let visitCount = Number(localStorage.getItem(VISIT_COUNT_KEY) || "0");

    if (!isSessionPinged) {
      visitCount += 1;
      localStorage.setItem(VISIT_COUNT_KEY, String(visitCount));
      sessionStorage.setItem(SESSION_PING_KEY, "1");

      // Send Visit / Re-visit event
      logVisitorEvent("visit");
    }

    // 2. Continuous dwell time tracker: 45s, 2m (120s), 5m (300s)
    const dwellCheckInterval = setInterval(() => {
      const elapsedSecs = Math.floor((Date.now() - startTimeRef.current) / 1000);

      const milestones = [45, 120, 300];
      for (const m of milestones) {
        if (elapsedSecs >= m && !dwellReportedRef.current[m]) {
          dwellReportedRef.current[m] = true;
          logVisitorEvent("dwell", { dwellSeconds: m });
        }
      }
    }, 5000);

    // 3. User departure dwell logging
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const elapsedSecs = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (elapsedSecs >= 60 && !dwellReportedRef.current[elapsedSecs]) {
          dwellReportedRef.current[elapsedSecs] = true;
          logVisitorEvent("dwell", { dwellSeconds: elapsedSecs });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(dwellCheckInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
