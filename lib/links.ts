import type { CountryCode } from "@/lib/countries";

/* The live Merchant Portal (an external application). smartoneclub.com itself
   is only a "Choose your location" screen; each market runs its own portal on
   a subdomain, so every "Log in" / "Open the portal" link goes straight to the
   one for the country the visitor is browsing. The subdomains are the ones the
   portal's own picker links to (its front_erp_url per country) – note the UK
   lives on gb., not uk. Render these through <PortalLink>, which also carries
   the visitor's campaign tags across. */
export const MERCHANT_PORTAL_URLS: Record<CountryCode, string> = {
  mt: "https://mt.smartoneclub.com",
  es: "https://es.smartoneclub.com",
  cy: "https://cy.smartoneclub.com",
  sk: "https://sk.smartoneclub.com",
  uk: "https://gb.smartoneclub.com",
};

/* API documentation, hosted on the portal's own domain – which is why the
   footer lists it beside the Merchant Portal rather than under Company. */
export const API_DOCS_URL = "https://docs.smartoneclub.com";

/* Where the contact form posts (a serverless endpoint, so no keys live on the
   site). It is a cross-origin request, so the Content-Security-Policy in
   next.config.ts has to allow this origin in both connect-src (the fetch) and
   form-action (the no-JS <form action> fallback) – a bare 'self' policy
   silently breaks the only data-collection point on the site. Keep the two in
   step: next.config.ts can't import from here (it runs before the TS path
   aliases), so the origin is repeated there with a pointer back to this note. */
export const LEAD_ENDPOINT = "https://smartone-lead-form.vercel.app/api/lead";
