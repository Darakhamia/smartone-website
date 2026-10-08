import { NONE, clearCategory, hasMarketingConsent, type Consent } from "@/lib/consent";

/* Google Tag Manager, loaded on consent and never before it.

   Consent Mode runs in its basic form: the container script itself is not
   requested until the visitor has switched on Analytics or Marketing, so a
   visitor who has not answered – or who declined – sends nothing to Google or
   Meta, not even the request for gtm.js. /privacy says exactly that ("nothing
   is loaded before you answer the cookie notice"); keep it true.

   GTM_ENABLED is the switch. It lives in code rather than in a build
   variable so that changing it is the same commit-and-deploy on any host.
   Set to false, nothing here ever loads, consent or not – the quick way to
   take every tag off the site if one misbehaves.

   Inside the container, every tag still has to require its category: GA4 on
   analytics_storage; Google Ads and Enhanced Conversions on ad_storage /
   ad_user_data; the Meta pixel, which ignores Google's consent signals, on
   the so_consent event's consent_marketing value. Granting is per category
   only – Analytics never grants an ad_* signal.

   The answer goes in as a default of "denied" followed by an update, not as
   a default alone. The container carries its own all-denied default on
   Consent Initialization, which runs after this queue is read; an update
   outranks any default whatever the order, so the visitor's choice holds. */
const GTM_ENABLED = true;
const GTM_ID = "GTM-KX26FGG5";

type Granted = "granted" | "denied";

function dataLayer(): unknown[] {
  const w = window as Window & { dataLayer?: unknown[] };
  return (w.dataLayer ??= []);
}

/* gtag() as Google defines it. Consent commands are recognised only as an
   Arguments object, not an array – hence `arguments` rather than rest params. */
const gtag: (...args: unknown[]) => void = function () {
  // eslint-disable-next-line prefer-rest-params
  dataLayer().push(arguments);
};

function signals(c: Consent): Record<string, Granted> {
  const ads: Granted = c.marketing ? "granted" : "denied";
  return {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

let loaded = false;

/** Bring the page in line with an answer: wipe what switched-off categories stored, then load or update tags. */
export function applyConsent(next: Consent, prev: Consent | null) {
  if (!next.analytics) clearCategory("analytics");
  if (!next.marketing) clearCategory("marketing");
  if (!GTM_ENABLED) return;

  const state = { event: "so_consent", consent_analytics: next.analytics, consent_marketing: next.marketing };

  if (loaded) {
    /* Withdrawal: the tags are already running in this page, and the Meta
       pixel does not listen to Google's consent update. A reload is the one
       certain way to stop them – the fresh page loads the container again
       only if a category is still on. */
    if ((prev?.analytics && !next.analytics) || (prev?.marketing && !next.marketing)) {
      location.reload();
      return;
    }
    gtag("consent", "update", signals(next));
    dataLayer().push(state);
    return;
  }

  if (!next.analytics && !next.marketing) return;
  gtag("consent", "default", signals(NONE));
  gtag("consent", "update", signals(next));
  dataLayer().push(state);
  dataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(s);
  loaded = true;
}

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/* A sent enquiry, for GA4 and the Ads / Meta conversions.

   With Marketing on, the email address and phone number go with it – but only
   as SHA-256 hashes made here in the browser, as /cookies describes ("that
   code – not your email address or number – is sent"). Never the plain
   values: if the browser cannot hash (crypto.subtle needs HTTPS), the event
   goes without them. Google and Meta normalise phone numbers differently
   (E.164 with "+" vs digits only), so each gets its own hash. */
export async function trackLead(email: string, phone: string) {
  if (!loaded) return;
  const event: Record<string, unknown> = { event: "generate_lead" };

  if (hasMarketingConsent() && globalThis.crypto?.subtle) {
    const em = await sha256(email.trim().toLowerCase());
    const digits = phone.replace(/\D/g, "");
    // the phone field starts as a bare dial code ("+356 "); that is not a number
    const hasPhone = digits.length >= 8;
    event.user_data = {
      sha256_email_address: em,
      ...(hasPhone && { sha256_phone_number: await sha256(`+${digits}`) }),
    };
    event.meta_user_data = { em, ...(hasPhone && { ph: await sha256(digits) }) };
  }

  dataLayer().push(event);
}
