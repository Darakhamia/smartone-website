"use client";

import { useEffect } from "react";

/* First-touch attribution: on the very first page load, remember where the
   visitor came from (UTM tags + referrer) in localStorage. Idempotent – only
   writes once. Lives in the root layout so it runs on every page. */
export function LeadAttribution() {
  useEffect(() => {
    const KEY = "so_first_touch";
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    const p = new URLSearchParams(location.search);
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          utm_source: p.get("utm_source") || "",
          utm_medium: p.get("utm_medium") || "",
          utm_campaign: p.get("utm_campaign") || "",
          referrer_first_touch: document.referrer || "direct",
          ts: new Date().toISOString(),
        })
      );
    } catch {
      /* localStorage unavailable – nothing to do */
    }
  }, []);

  return null;
}
