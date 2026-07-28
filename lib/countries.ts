/* Country / region model. Pure data – safe to import from both server and
   client. The chosen country lives in the `so_country` cookie; language in
   `so_lang`. Content across the site adapts to the country's capabilities
   (fiscal register, Verifactu, currency) rather than being one-size-fits-all. */

export type CountryCode = "mt" | "es" | "cy" | "sk" | "uk";
export type Lang = "en" | "es";

export interface Country {
  code: CountryCode;
  /** English display name */
  name: string;
  /** Native name, shown as a subtle secondary label in the picker */
  nativeName?: string;
  flag: string; // emoji
  currency: "EUR" | "GBP";
  currencySymbol: "€" | "£";
  /** Supported languages, first entry is the default for that country */
  languages: Lang[];
  /** Has an on-device fiscal register (Cashbox) requirement/offering */
  fiscal: boolean;
  /** Spain-specific Verifactu programme */
  verifactu: boolean;
  /** Short line shown under the country in the picker */
  tagline: string;
  /** Optional badge, e.g. "Live" or "Verifactu 2027" */
  badge?: string;
}

export const COUNTRIES: Country[] = [
  {
    code: "mt",
    name: "Malta",
    flag: "🇲🇹",
    currency: "EUR",
    currencySymbol: "€",
    languages: ["en"],
    fiscal: true,
    verifactu: false,
    tagline: "Certified fiscal device — live today.",
    badge: "Live",
  },
  {
    code: "es",
    name: "Spain",
    nativeName: "España",
    flag: "🇪🇸",
    currency: "EUR",
    currencySymbol: "€",
    languages: ["en", "es"],
    fiscal: true,
    verifactu: true,
    tagline: "Verifactu-ready ahead of the 2027 deadline.",
    badge: "Verifactu 2027",
  },
  {
    code: "cy",
    name: "Cyprus",
    nativeName: "Κύπρος",
    flag: "🇨🇾",
    currency: "EUR",
    currencySymbol: "€",
    languages: ["en"],
    fiscal: true,
    verifactu: false,
    tagline: "Card payments and fiscal receipts on one device.",
  },
  {
    code: "sk",
    name: "Slovakia",
    nativeName: "Slovensko",
    flag: "🇸🇰",
    currency: "EUR",
    currencySymbol: "€",
    languages: ["en"],
    fiscal: true,
    verifactu: false,
    tagline: "A fiscal-ready payment terminal for your counter.",
  },
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    languages: ["en"],
    fiscal: false,
    verifactu: false,
    tagline: "Card payments and business tools — no fiscal register.",
  },
];

export const DEFAULT_COUNTRY_CODE: CountryCode = "mt";

export const COUNTRY_MAP: Record<CountryCode, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
) as Record<CountryCode, Country>;

export const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  es: "Español",
};

export function isCountryCode(v: string | undefined | null): v is CountryCode {
  return !!v && v in COUNTRY_MAP;
}

export function isLang(v: string | undefined | null): v is Lang {
  return v === "en" || v === "es";
}

export function getCountry(code: string | undefined | null): Country {
  return isCountryCode(code) ? COUNTRY_MAP[code] : COUNTRY_MAP[DEFAULT_COUNTRY_CODE];
}

/** Whether the fiscal cash register is offered/promoted for this country.
    Today that's Malta only – the certified device is live there. Other fiscal
    markets (e.g. Spain's Verifactu) keep their compliance messaging, but the
    cash register itself is not sold there yet, so it's kept out of the UI. */
export function promotesRegister(country: Country): boolean {
  return country.code === "mt";
}

export type TerminalModel = "bank-pro" | "bank-pro-s";

/** IRONCLAD PRODUCT RULE (business, do not change without explicit sign-off):
 *  – Malta shows ONLY the SmartOne Bank Pro S (dual-screen). Nothing else.
 *  – EVERY other country shows ONLY the SmartOne Bank Pro.
 *  This governs the device on /product/terminals (its photos, name and specs)
 *  and the register device shown on Malta's cash-register page. One device per
 *  country, always – never mix the two models on a single market. */
export function terminalModel(country: Country): TerminalModel {
  return country.code === "mt" ? "bank-pro-s" : "bank-pro";
}

/* `dir` is versioned: replacing a photo in place keeps its URL, so browsers and
   the Next image cache (4h, must-revalidate) keep serving the old file. When a
   model's shots are re-shot, drop them in a new /vN folder and bump the path
   here — that changes the URL and every cache misses. Query-string busting is
   not an option: next/image rejects a src with a query. */
export const TERMINAL_MODELS: Record<TerminalModel, { name: string; dir: string; dual: boolean }> = {
  "bank-pro": { name: "SmartOne Bank Pro", dir: "/pos/bank-pro", dual: false },
  "bank-pro-s": { name: "SmartOne Bank Pro S", dir: "/pos/bank-pro-s/v2", dual: true },
};

export const COUNTRY_COOKIE = "so_country";
export const LANG_COOKIE = "so_lang";
