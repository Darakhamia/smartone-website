"use client";

import { useEffect, useRef } from "react";
import { CONSENT_EVENT, hasConsent } from "@/lib/consent";

/* First-touch attribution: remember where the visitor came from (UTM tags +
   referrer) so a later enquiry can be credited to the right channel.

   Nothing is written until the visitor accepts the cookie notice. This is
   marketing measurement, not something the site needs to run, so ePrivacy
   Art. 5(3) wants consent rather than notice – and it treats local storage the
   same way it treats a cookie.

   The tags are read into a ref on first render and held in memory until
   consent arrives. Keeping them in a variable for the life of the page is not
   storage on the visitor's device, so it needs no consent – and it has to work
   this way, because the visitor may navigate away from the landing URL, losing
   the query string, before pressing the button.

   Idempotent: writes once, then never again. */
export function LeadAttribution() {
  const firstTouch = useRef<string | null>(null);

  useEffect(() => {
    const KEY = "so_first_touch";

    // Capture the landing URL's tags now; persist them only once allowed.
    if (firstTouch.current === null) {
      const p = new URLSearchParams(location.search);
      firstTouch.current = JSON.stringify({
        utm_source: p.get("utm_source") || "",
        utm_medium: p.get("utm_medium") || "",
        utm_campaign: p.get("utm_campaign") || "",
        referrer_first_touch: document.referrer || "direct",
        ts: new Date().toISOString(),
      });
    }

    const write = () => {
      try {
        if (localStorage.getItem(KEY)) return;
        if (firstTouch.current) localStorage.setItem(KEY, firstTouch.current);
      } catch {
        /* localStorage unavailable – nothing to do */
      }
    };

    if (hasConsent()) {
      write();
      return;
    }

    window.addEventListener(CONSENT_EVENT, write);
    return () => window.removeEventListener(CONSENT_EVENT, write);
  }, []);

  return null;
}
