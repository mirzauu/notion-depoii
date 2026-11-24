"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: "signin" | "signup" | "use";
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: () => void;
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
      const targetEndpoint = `${appOrigin}/api/auth/google/one-tap`;

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (!response?.credential) return;

            // Submit via a hidden top-level form POST to avoid third-party cookie blocking
            // and guarantee instant session establishment + 303 redirect into the dashboard
            const form = document.createElement("form");
            form.method = "POST";
            form.action = targetEndpoint;
            form.style.display = "none";

            const credInput = document.createElement("input");
            credInput.type = "hidden";
            credInput.name = "credential";
            credInput.value = response.credential;
            form.appendChild(credInput);

            const nextInput = document.createElement("input");
            nextInput.type = "hidden";
            nextInput.name = "next";
            nextInput.value = "/";
            form.appendChild(nextInput);

            document.body.appendChild(form);
            form.submit();
          },
          auto_select: false,
          cancel_on_tap_outside: false,
          context: "signin",
          use_fedcm_for_prompt: true,
        });

        // Prompt without the deprecated status callback methods to silence the FedCM warning
        window.google.accounts.id.prompt();
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
