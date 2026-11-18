import type { Metadata } from "next";
import Link from "next/link";
import { COUNTRY_MAP, TERMINAL_MODELS, terminalModel } from "@/lib/countries";
import { termsFor, type PlanMode } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

/* Pieces shared by the Malta landing pages (/malta/*). They are written for
   Malta alone – English only, Malta's terms and device – whatever country the
   visitor chose; proxy.ts makes the nav, footer and form Malta's too. */

export const MALTA = COUNTRY_MAP.mt;
export const TERMS = termsFor(MALTA);
/** The one device Malta shows (AGENTS.md: the Bank Pro S, nothing else). */
export const DEVICE = TERMINAL_MODELS[terminalModel(MALTA)];

/** Rates and prices in the form the pages print them: "1.90%", "€400". */
export const pct = (rate: string) => `${rate}%`;
export const eur = (amount: number | string) =>
  `€${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(Number(amount))}`;
/** "1.90% + €0.02" */
export const rateLine = (rate: string) => `${pct(rate)} + ${eur(TERMS.fixed)}`;

export const BUY = TERMS.price.buy[0];
export const RENT = TERMS.price.rent[0];
/** The lowest rate Malta charges (top band, rented) and the highest (first band, bought). */
const allRates = [...TERMS.rates.buy, ...TERMS.rates.rent].map(Number);
export const LOWEST_RATE = TERMS.rates.rent[2];
export const RATE_MIN = Math.min(...allRates).toFixed(2);
export const RATE_MAX = Math.max(...allRates).toFixed(2);

/** The band (0, 1, 2) a monthly card volume falls in. */
export function bandFor(monthly: number): 0 | 1 | 2 {
  const [low, high] = TERMS.bands.map((b) => Number(b.replace(/,/g, "")));
  return monthly < low ? 0 : monthly <= high ? 1 : 2;
}

/** A year of card fees on SmartOne at a monthly volume and average sale. */
export function yearOfFees(mode: PlanMode, monthly: number, averageSale: number) {
  const rate = TERMS.rates[mode][bandFor(monthly)];
  const sales = (monthly * 12) / averageSale;
  return { rate, fees: Math.round((monthly * 12 * Number(rate)) / 100 + sales * Number(TERMS.fixed)) };
}

/** Title as given (no " – SmartOne" from the layout's template), canonical and en-MT. */
export function landingMetadata(path: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { "en-MT": url } },
  };
}

export function JsonLd({ data }: { data: unknown }) {
  // "<" escaped so no string in the data can close the script tag
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function breadcrumbLd(path: string, name: string) {
  /* Malta has no page of its own, so the visible "Malta" crumb is plain text
     and the structured trail goes Home › this page. */
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

export function Crumbs({ current, className = "" }: { current: string; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] text-ink-3 ${className}`}>
      <Link href="/" className="transition-colors hover:text-ink">Home</Link> › <span>Malta</span> ›{" "}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
