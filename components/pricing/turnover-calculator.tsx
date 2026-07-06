"use client";

import Link from "next/link";
import { useState } from "react";

/* Interactive pricing by monthly card turnover (adapted from the 21st.dev
   "PricingSlider" pattern). Tiers:
     ≤ €5,000/mo  → Starter
     ≤ €10,000/mo → Growth
     > €10,000/mo → custom quote, talk to sales.
   TODO: rates below are placeholders – confirm the real per-tier pricing. */

const STOPS: number[] = [
  ...Array.from({ length: 39 }, (_, i) => 500 + i * 250), // €500 … €10,000
  Infinity, // ">€10,000"
];

type Tier = {
  name: string;
  rate: number | null; // % of turnover; null = custom
  blurb: string;
  cta: string;
};

function tierFor(turnover: number): Tier {
  if (turnover <= 5000) {
    return {
      name: "Starter",
      rate: 1.1,
      blurb:
        "Everything included: certified device, fiscal register, receipt printer and the merchant portal. No monthly software fee.",
      cta: "Get a terminal →",
    };
  }
  if (turnover <= 10000) {
    return {
      name: "Growth",
      rate: 0.9,
      blurb:
        "Same full stack, lower rate – your commission drops as your turnover grows. Everything stays included.",
      cta: "Get a terminal →",
    };
  }
  return {
    name: "Custom",
    rate: null,
    blurb:
      "At your volume we price individually – and the rate only goes down from here. Tell us about your business and we'll send a personal offer within one working day.",
    cta: "Contact sales →",
  };
}

const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const eurCents = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function TurnoverCalculator() {
  const [index, setIndex] = useState(17); // €4,750 by default – near the tier edge

  const turnover = STOPS[index];
  const tier = tierFor(turnover);
  const pct = (index / (STOPS.length - 1)) * 100;
  const label = turnover === Infinity ? ">€10,000" : eur.format(turnover);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* left: the slider */}
      <div className="flex flex-col rounded-3xl border border-line bg-white p-8">
        <h2 className="text-sm font-semibold text-ink-2">
          Your card turnover per month
        </h2>
        <div className="h-display mt-3 mb-9 text-[clamp(32px,3vw,42px)] leading-none">
          {label}
          <span className="ml-2 align-middle text-[15px] font-normal tracking-normal text-ink-3">
            / month
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-label="Monthly card turnover"
          className="range-brand"
          style={{
            background: `linear-gradient(to right, var(--color-brand) 0%, var(--color-brand) ${pct}%, var(--color-line) ${pct}%, var(--color-line) 100%)`,
          }}
        />
        <div className="mt-3 flex justify-between text-[12px] text-ink-3">
          <span>€500</span>
          <span>€5,000</span>
          <span>&gt;€10,000</span>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5 text-sm text-ink-3">
          <span>Not sure about your volume?</span>
          <Link href="/contact" className="font-semibold text-ink hover:text-brand">
            Talk to us →
          </Link>
        </div>
      </div>

      {/* right: the plan */}
      <div className="rounded-3xl bg-white p-8 shadow-[0_0_0_2px_var(--color-brand),0_24px_48px_-32px_rgba(90,25,181,0.5)]">
        <h2 className="flex items-center justify-between text-sm font-semibold text-ink-2">
          Your plan
          <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
            {tier.name}
          </span>
        </h2>
        <div className="h-display mt-3 text-[clamp(32px,3vw,42px)] leading-none">
          {tier.rate === null ? (
            "Let's talk"
          ) : (
            <>
              {tier.rate.toFixed(2)}%
              <span className="ml-2 align-middle text-[15px] font-normal tracking-normal text-ink-3">
                + €0.02 / transaction
              </span>
            </>
          )}
        </div>
        {tier.rate !== null && turnover !== Infinity && (
          <p className="mt-4 text-[14.5px] text-ink-2">
            ≈{" "}
            <b className="text-ink">
              {eurCents.format((turnover * tier.rate) / 100)}
            </b>{" "}
            commission per month – every fee in plain euros, visible in your
            portal.
          </p>
        )}
        <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">{tier.blurb}</p>
        <Link href="/contact" className="btn-primary mt-7">
          {tier.cta}
        </Link>
        <p className="mt-5 text-[12.5px] leading-relaxed text-ink-3">
          Renting the device? Your rate drops another 0.05 pp. Rates shown for
          🇲🇹 Malta.
        </p>
      </div>
    </div>
  );
}
