"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  trackOpenDemo,
  trackOpenTrial,
  trackPageView,
} from "@/lib/analytics";

export function AnalyticsScripts() {
  const pathname = usePathname();
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const onOpenTrial = (event: Event) => {
      const detail = (event as CustomEvent<{ source?: string }>).detail;
      trackOpenTrial(detail?.source ?? "custom_event");
    };

    const onOpenDemo = (event: Event) => {
      const detail = (event as CustomEvent<{ source?: string }>).detail;
      trackOpenDemo(detail?.source ?? "custom_event");
    };

    window.addEventListener("open-trial", onOpenTrial);
    window.addEventListener("open-demo", onOpenDemo);

    return () => {
      window.removeEventListener("open-trial", onOpenTrial);
      window.removeEventListener("open-demo", onOpenDemo);
    };
  }, []);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}
