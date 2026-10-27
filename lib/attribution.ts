/* The one list of source tags the site, the CRM and the Merchant Portal share,
   so a registration or an enquiry can be traced back to the click that
   brought the visitor in. Read from the landing URL once, on the first page
   of the visit (components/lead/attribution.tsx), and passed on under these
   exact names with every enquiry the site's forms send. The CRM and, should
   the site link into it again, the portal must use the same names; add to
   the list here, never under a second spelling elsewhere.

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
