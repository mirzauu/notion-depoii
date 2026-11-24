"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback?: (response: { credential: string }) => void;
            login_uri?: string;
            ux_mode?: "popup" | "redirect";
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: "signin" | "signup" | "use";
          }) => void;
          prompt: (notification?: (notification: {
            isNotDisplayed: () => boolean;
            isSkippedMoment: () => boolean;
            getNotDisplayedReason: () => string;
            getSkippedReason: () => string;
          }) => void) => void;
          cancel: () => void;
        };
      };
    };
  }
}

export function GoogleOneTap() {
  const initializedRef = useRef(false);

  useEffect(() => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "775409232328-mm8u7hhf83j5k2p9qdpgqkujnsoqgaic.apps.googleusercontent.com";

    if (!clientId) return;

    const scriptId = "google-jssdk-one-tap";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const setupOneTap = () => {
      if (initializedRef.current || !window.google?.accounts?.id) return;
      initializedRef.current = true;

      // Determine the app endpoint (local dev vs production)
      const isLocal =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
      const appOrigin = isLocal ? "http://localhost:3000" : "https://app.depoii.com";
      const loginUri = `${appOrigin}/api/auth/google/one-tap`;

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          login_uri: loginUri,
          ux_mode: "redirect",
          auto_select: false,
          cancel_on_tap_outside: false,
          context: "signin",
        });

        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.debug("[one-tap] not displayed:", notification.getNotDisplayedReason());
          } else if (notification.isSkippedMoment()) {
            console.debug("[one-tap] skipped:", notification.getSkippedReason());
          }
        });
      } catch (err) {
        console.warn("[one-tap] init error:", err);
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = setupOneTap;
      document.head.appendChild(script);
    } else if (window.google?.accounts?.id) {
      setupOneTap();
    } else {
      script.addEventListener("load", setupOneTap);
    }

    return () => {
      try {
        window.google?.accounts?.id?.cancel();
      } catch {}
    };
  }, []);

  return null;
}
