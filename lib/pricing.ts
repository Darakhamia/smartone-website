/* Commercial terms per market: volume bands, per-transaction rates and what the
   device costs. Pure data – safe to import from both server and client.

   These are prices, not copy, so they are keyed by country and never by
   language. Spanish happens to be offered only in Spain today, so keying on the
   language would work by accident and would hand Spain's rates to the next
   market that adds Spanish.

   A market with no entry here uses DEFAULT_TERMS. Change commercial terms here
   and nowhere else – the /pricing cards and the "Buy or rent" FAQ answer both
   read from this file. */

import type { Country, CountryCode } from "@/lib/countries";

export type PlanMode = "buy" | "rent";

/** One entry per volume band, lowest band first. */
type PerBand = [string, string, string];

export type Terms = {
  /** The two thresholds between the three bands, formatted for display. */
  bands: [string, string];
  /** Per-transaction rate on domestic cards, by band. */
  rates: Record<PlanMode, PerBand>;
  /** Device cost by band: a one-off to buy, per month to rent. */
  price: Record<PlanMode, PerBand>;
};

const flat = (v: string): PerBand => [v, v, v];

const DEFAULT_TERMS: Terms = {
  bands: ["4,000", "15,000"],
  rates: { buy: ["1.90", "1.20", "0.90"], rent: ["1.65", "1.00", "0.85"] },
  price: { buy: flat("400"), rent: flat("30") },
};

const TERMS: Partial<Record<CountryCode, Terms>> = {
  es: {
    bands: ["4,000", "15,000"],
    rates: { buy: ["1.20", "1.00", "0.80"], rent: ["1.00", "0.90", "0.70"] },
    price: { buy: flat("130"), rent: flat("20") },
  },
  uk: {
    /* The UK prices differently from the other markets: the rate follows the
       volume band alone, so buying or renting changes what the device costs and
       not what a transaction costs. Renting is also the side that scales – the
       monthly fee falls with volume and is nothing in the top band. */
    bands: ["5,000", "20,000"],
    rates: { buy: ["1.10", "1.00", "0.90"], rent: ["1.10", "1.00", "0.90"] },
    price: { buy: flat("150"), rent: ["15", "10", "0"] },
  },
};

export function termsFor(country: Country): Terms {
  return TERMS[country.code] ?? DEFAULT_TERMS;
}

/** Whether renting buys a lower per-transaction rate than owning the device.
    True in most markets, false in the UK – the "Buy or rent" FAQ answer says
    which in words, so it has to ask rather than assume. */
export function rentUndercutsBuy(terms: Terms): boolean {
  return terms.rates.rent.some((rate, i) => Number(rate) < Number(terms.rates.buy[i]));
}
