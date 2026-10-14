import { readFirstTouch } from "@/lib/consent";

/* The one list of source tags the site, the CRM and the Merchant Portal share,
   so a registration or an enquiry can be traced back to the click that
   brought the visitor in. Read from the landing URL once, on the first page
   of the visit (components/lead/attribution.tsx), and passed on under these
   exact names – as hidden fields with the enquiry form, as query parameters
   on links into the portal. The CRM form and the portal must use the same
   names; add to the list here, never under a second spelling elsewhere.

   gclid / wbraid / gbraid are Google Ads click IDs (wbraid and gbraid replace
   gclid for iOS app and web-to-app traffic); fbclid is Meta's. They let a
   lead be uploaded back to the ad network as an offline conversion later. */
export const URL_TAGS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "wbraid",
  "gbraid",
  "fbclid",
] as const;

/** Every field the first-touch record carries on: the URL tags plus where the visitor came from. */
export const ATTRIBUTION_FIELDS = [...URL_TAGS, "referrer_first_touch"] as const;

/* Add the visitor's first-touch tags to a link that leaves the site for one of
   our own apps (the Merchant Portal). Only with Marketing consent – the same
   gate as the record itself, which readFirstTouch enforces – and only the
   tags that have a value, so a visitor who came in directly adds nothing but
   referrer_first_touch=direct. Called at the moment of the click, not at
   render: consent may arrive after the link was drawn. */
export function withAttribution(href: string): string {
  const saved = readFirstTouch();
  if (!saved) return href;
  const url = new URL(href);
  for (const f of ATTRIBUTION_FIELDS) {
    if (saved[f]) url.searchParams.set(f, saved[f]);
  }
  return url.toString();
}
