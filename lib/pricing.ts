/* Commercial terms per market: volume bands, per-transaction rates and what the
   device costs. Pure data – safe to import from both server and client.

   These are prices, not copy, so they are keyed by country and never by
   language. Spanish happens to be offered only in Spain today, so keying on the
   language would work by accident and would hand Spain's rates to the next
   market that adds Spanish.

   A market with no entry here uses DEFAULT_TERMS. Spain is priced differently
   and has its own model, Tariffs, below. Change commercial terms here and
   nowhere else – the /pricing cards, the "Buy or rent" FAQ answer and the fee
   example on the homepage all read from this file. */

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
  /** Fixed fee per transaction, on top of the rate. */
  fixed: string;
};

const flat = (v: string): PerBand => [v, v, v];

const DEFAULT_TERMS: Terms = {
  bands: ["4,000", "15,000"],
  rates: { buy: ["1.90", "1.20", "0.90"], rent: ["1.65", "1.00", "0.85"] },
  price: { buy: flat("400"), rent: flat("30") },
  fixed: "0.02",
};

const TERMS: Partial<Record<CountryCode, Terms>> = {
  uk: {
    /* The UK prices differently from the other markets: the rate follows the
       volume band alone, so buying or renting changes what the device costs and
       not what a transaction costs. Renting is also the side that scales – the
       monthly fee falls with volume and is nothing in the top band. */
    bands: ["5,000", "20,000"],
    rates: { buy: ["1.10", "1.00", "0.90"], rent: ["1.10", "1.00", "0.90"] },
    price: { buy: flat("150"), rent: ["15", "10", "0"] },
    fixed: "0.02",
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

/* Spain (from 16.11.2026) has no volume bands. One published plan, Light,
   covers card sales up to a cap and is priced by the kind of card – a
   consumer card from the EU, a corporate card from the EU, a card from
   outside it – with the same rate whether the terminal is bought or rented.
   Above the cap is the Individual plan, a rate agreed with the merchant.
   Both have no minimum term, pay out to any EU bank account and carry no
   other fees. */
export type Tariffs = {
  /** Monthly card sales the Light plan covers, formatted for display. */
  cap: string;
  /** Light's rate per card transaction, by kind of card. */
  rates: { consumer: string; corporate: string; foreign: string };
  /** Fixed fee per transaction, on every kind of card. */
  fixed: string;
  /** The terminal, VAT included: a one-off to buy, per month to rent. */
  price: Record<PlanMode, string>;
};

const TARIFFS: Partial<Record<CountryCode, Tariffs>> = {
  es: {
    cap: "10,000",
    rates: { consumer: "1.20", corporate: "2.30", foreign: "2.60" },
    fixed: "0.02",
    price: { buy: "169", rent: "20" },
  },
};

/** The market's plans when it is priced by card type (Spain), else null. */
export function tariffsFor(country: Country): Tariffs | null {
  return TARIFFS[country.code] ?? null;
}

/* The fee and the payout on the 24.60 sale the homepage shows as its example:
   the top band's rate where rates go by volume (0.90% + 0.02 in Malta), the
   Light rate on a consumer card in Spain. Worked out here so the example
   never quotes a rate the market doesn't charge. */
export function exampleSale(country: Country): { fee: string; receive: string } {
  const sale = 24.6;
  const tariffs = tariffsFor(country);
  const rate = Number(tariffs ? tariffs.rates.consumer : termsFor(country).rates.buy[2]);
  // in cents: a rate in percent times the sale in euros, plus the 2-cent fixed fee
  const fee = Math.round(sale * rate + 2) / 100;
  return { fee: fee.toFixed(2), receive: (sale - fee).toFixed(2) };
}

/* SmartOne Click where its price is published on the site: the software
   subscription with every module, and the counter set – a terminal, receipt
   printer and cash drawer – as a one-off, VAT included. /click shows its
   pricing section only for a market listed here.

   None for now: the team asked (16.11.2026) not to publish Click's price on
   the site yet. Spain's offer of 13.11 has it at €50 a month and €400 for the
   counter set – to publish it, add
     es: { monthly: "50", counterSet: "400" },
   the section's copy is already there in all four languages. */
export type ClickPrices = { monthly: string; counterSet: string };

const CLICK_PRICES: Partial<Record<CountryCode, ClickPrices>> = {};

export function clickPricesFor(country: Country): ClickPrices | null {
  return CLICK_PRICES[country.code] ?? null;
}
