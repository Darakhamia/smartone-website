/* Cookie consent: what the visitor agreed to, and everything that follows from
   it – which tags may load, and what has to be wiped when they change their mind.

   Three categories, as the cookie notice and /cookies describe them:
   - Necessary – always on: so_country, so_lang, this record, and HubSpot's
     __cf_bm on the enquiry form. Nothing here asks for them.
   - Analytics – GA4, including Google Signals.
   - Marketing – Google Ads with Enhanced Conversions, the Meta pixel, and the
     first-touch record (so_first_touch).
   Analytics and Marketing are off until switched on. The record is a cookie
   rather than local storage so it reads the same way as the other necessary
   ones, and it holds the version of the notice the visitor answered: bump
   CONSENT_VERSION whenever the notice text changes materially and everyone is
   asked again, rather than being held to an answer they gave to different words.

   Visitors who answered the earlier notice hold so_cookie_notice. That answer
   covered first-touch attribution only, not analytics or advertising, so it is
   not carried over: the old cookie is removed and they are asked afresh. */
import { COUNTRY_COOKIE, LANG_COOKIE, PREF_COOKIE_MAX_AGE } from "@/lib/countries";

export const CONSENT_COOKIE = "so_cookie_consent";
const LEGACY_NOTICE_COOKIE = "so_cookie_notice";

/** The date of the notice text the visitor answered. */
export const CONSENT_VERSION = "2026-10-08";

const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 12 months

export type Consent = { analytics: boolean; marketing: boolean };
export const NONE: Consent = { analytics: false, marketing: false };
export const ALL: Consent = { analytics: true, marketing: true };

/** Fired on the window whenever the visitor saves an answer. detail: Consent */
export const CONSENT_EVENT = "so:consent";

/** Fired by any "Cookie settings" link to reopen the settings panel. */
export const OPEN_SETTINGS_EVENT = "so:cookie-settings";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return row ? row.slice(name.length + 1) : null;
}

/* Expire a cookie on every domain it could have been set on. Ours are
   host-only, but Google sets _ga and _gcl_* on the registrable domain
   (.smartoneglobal.com) and Meta does the same with _fbp, and a cookie is only
   removed by a write that names the same domain and path it was set with. */
function expireCookie(name: string) {
  const labels = location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i++) domains.push(`; domain=.${labels.slice(i).join(".")}`);
  for (const d of domains) document.cookie = `${name}=; path=/; max-age=0${d}`;
}

/** The visitor's current answer, or null if they have not answered this version of the notice. */
export function readConsent(): Consent | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const p = new URLSearchParams(decodeURIComponent(raw));
    if (p.get("v") !== CONSENT_VERSION) return null;
    return { analytics: p.get("a") === "1", marketing: p.get("m") === "1" };
  } catch {
    return null;
  }
}

/** Marketing consent specifically – gates first-touch and the hashed lead data. Client-side only. */
export function hasMarketingConsent(): boolean {
  return readConsent()?.marketing === true;
}

/** Store the answer: categories, when, and against which version of the notice. */
export function writeConsent(c: Consent) {
  const value = new URLSearchParams({
    v: CONSENT_VERSION,
    a: c.analytics ? "1" : "0",
    m: c.marketing ? "1" : "0",
    t: new Date().toISOString(),
  }).toString();
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${CONSENT_MAX_AGE}; samesite=lax`;
}

/* One-off tidy-up for visitors from before this notice: drop the old answer
   and bring so_country / so_lang, which were written for about a year, down
   to the 6 months /cookies now states. Keyed on the old cookie, so it runs
   once per browser rather than renewing those two on every visit. */
export function migrateLegacyCookies() {
  if (readCookie(LEGACY_NOTICE_COOKIE) === null) return;
  for (const name of [COUNTRY_COOKIE, LANG_COOKIE]) {
    const v = readCookie(name);
    if (v !== null) document.cookie = `${name}=${v}; path=/; max-age=${PREF_COOKIE_MAX_AGE}; samesite=lax`;
  }
  expireCookie(LEGACY_NOTICE_COOKIE);
}

/* First-touch attribution (components/lead/attribution.tsx). Local storage
   has no expiry of its own, so the entry carries its write time and is
   dropped once it is older than the 90 days /cookies promises. */
export const FIRST_TOUCH_KEY = "so_first_touch";
const FIRST_TOUCH_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

/** The stored first-touch record, if Marketing is on and it is still within 90 days. */
export function readFirstTouch(): Record<string, string> | null {
  if (!hasMarketingConsent()) return null;
  try {
    const raw = localStorage.getItem(FIRST_TOUCH_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Record<string, string>;
    const at = Date.parse(saved.ts);
    if (!(Date.now() - at < FIRST_TOUCH_MAX_AGE_MS)) {
      localStorage.removeItem(FIRST_TOUCH_KEY);
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

/* What each category leaves in the browser, matched by exact name or prefix
   against both cookies and local storage. _ga_* covers _ga_SBS327285V (the
   GA4 property); _gcl_* covers _gcl_au, _gcl_aw, _gcl_dc and _gcl_gs as
   cookies and the _gcl_ls entry in local storage. Cookies Google and Meta set
   on their own domains are out of our reach – /cookies says so. */
const STORED: Record<keyof Consent, { names: string[]; prefixes: string[] }> = {
  analytics: { names: ["_ga"], prefixes: ["_ga_"] },
  marketing: { names: ["_fbp", "_fbc", FIRST_TOUCH_KEY], prefixes: ["_gcl_"] },
};

/** Delete from this browser everything a category stored. */
export function clearCategory(category: keyof Consent) {
  const { names, prefixes } = STORED[category];
  const matches = (key: string) => names.includes(key) || prefixes.some((p) => key.startsWith(p));
  for (const row of document.cookie.split("; ")) {
    const name = row.split("=")[0];
    if (matches(name)) expireCookie(name);
  }
  try {
    for (const key of Object.keys(localStorage)) if (matches(key)) localStorage.removeItem(key);
  } catch {
    /* localStorage unavailable – nothing stored there to clear */
  }
}
