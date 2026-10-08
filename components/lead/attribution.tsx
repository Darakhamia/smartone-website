"use client";

import { useEffect, useRef } from "react";
import { CONSENT_EVENT, FIRST_TOUCH_KEY, hasMarketingConsent, readFirstTouch } from "@/lib/consent";

/* First-touch attribution: remember where the visitor came from (UTM tags +
   referrer) so a later enquiry can be credited to the right channel.

   Nothing is written unless the visitor switches on the Marketing category.
   This is marketing measurement, not something the site needs to run, so
   ePrivacy Art. 5(3) wants consent rather than notice – and it treats local
   storage the same way it treats a cookie. Switching Marketing off deletes the
   entry (clearCategory in lib/consent.ts), and readFirstTouch drops it after
   the 90 days /cookies states.

   The tags are read into a ref on first render and held in memory until
   consent arrives. Keeping them in a variable for the life of the page is not
   storage on the visitor's device, so it needs no consent – and it has to work
   this way, because the visitor may navigate away from the landing URL, losing
   the query string, before answering the notice.

   Idempotent: writes once, then never again while the entry is live. */
export function LeadAttribution() {
  const firstTouch = useRef<string | null>(null);

  useEffect(() => {
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
      if (!hasMarketingConsent() || readFirstTouch()) return;
      try {
        if (firstTouch.current) localStorage.setItem(FIRST_TOUCH_KEY, firstTouch.current);
      } catch {
        /* localStorage unavailable – nothing to do */
      }
    };

    write();
    window.addEventListener(CONSENT_EVENT, write);
    return () => window.removeEventListener(CONSENT_EVENT, write);
  }, []);

  return null;
}
