"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      "At your volume we price individually – and the rate only goes down from here. Tell us about your business and we'll send a personal offer within one business day.",
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

/* Smoothly tween a number towards its target (skipped for users who
   prefer reduced motion). */
function useTween(target: number, ms = 320) {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const from = current.current;
    if (from === target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      current.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);

  return value;
}

/* Benchmark for the "gap calculator" (pricing page only): the merchant's
   CURRENT provider, always "estimated" – effective-rate % may appear on
   this side only, never as our number. */
const PROVIDER_EFFECTIVE_RATE = 1.6;

export function TurnoverCalculator({ compare = false }: { compare?: boolean }) {
  const [index, setIndex] = useState(17); // €4,750 by default – near the tier edge

  const turnover = STOPS[index];
  const tier = tierFor(turnover);
  const pct = (index / (STOPS.length - 1)) * 100;

  // tween the big numbers; the ">€10,000" stop freezes at the last finite value
  const finiteTurnover = turnover === Infinity ? 10000 : turnover;
  const shownTurnover = useTween(finiteTurnover);
  const commissionTarget =
    tier.rate !== null ? (finiteTurnover * tier.rate) / 100 : 0;
  const shownCommission = useTween(commissionTarget);
  const providerCost = (finiteTurnover * PROVIDER_EFFECTIVE_RATE) / 100;
  const shownProviderCost = useTween(providerCost);
  const shownSavings = useTween(Math.max(0, providerCost - commissionTarget));

  const label =
    turnover === Infinity ? ">€10,000" : eur.format(Math.round(shownTurnover));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* left: the slider */}
      <div className="flex flex-col rounded-3xl border border-line bg-white p-8">
        <h2 className="text-sm font-semibold text-ink-2">
          Your card turnover per month
        </h2>
        <div className="h-display mt-3 mb-9 text-[clamp(32px,3vw,42px)] leading-none tabular-nums">
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
        {compare && turnover !== Infinity && (
          <div className="mt-7 rounded-2xl bg-bg-2 p-4">
            <div className="flex items-baseline justify-between font-mono text-[12.5px]">
              <span className="text-ink-3">Your current provider*</span>
              <span className="text-ink-2">est. {PROVIDER_EFFECTIVE_RATE.toFixed(1)}% effective</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between font-mono text-[12.5px]">
              <span className="text-ink-3">Estimated cost</span>
              <b className="font-semibold text-ink tabular-nums">
                ≈ {eurCents.format(shownProviderCost)} / mo
              </b>
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-ink-3">
              *Estimated, based on public EU acquirer benchmarks.
            </p>
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5 text-sm text-ink-3">
          <span>Not sure about your volume?</span>
          <Link href="/contact" className="font-semibold text-ink hover:text-brand">
            Talk to us →
          </Link>
        </div>
      </div>

      {/* right: the plan – ripple wrapper re-mounts on tier change */}
      <div
        key={`ripple-${tier.name}`}
        className="anim-tier-ripple rounded-3xl"
      >
        <div className="h-full rounded-3xl bg-white p-8 shadow-[0_0_0_2px_var(--color-brand),0_24px_48px_-32px_rgba(90,25,181,0.5)]">
          <div key={tier.name} className="anim-tier-in flex h-full flex-col">
            <h2 className="flex items-center justify-between text-sm font-semibold text-ink-2">
              Your plan
              <span className="anim-badge-pop rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
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
                <b className="text-ink tabular-nums">
                  {eurCents.format(shownCommission)}
                </b>{" "}
                commission per month – every fee shown in euros, visible in
                your portal.
              </p>
            )}
            {compare && tier.rate !== null && turnover !== Infinity && (
              <p className="mt-2.5 inline-flex items-baseline gap-1.5 self-start rounded-full bg-brand-tint px-3.5 py-1.5 text-[13.5px] font-semibold text-brand">
                You&apos;d save ≈{" "}
                <span className="tabular-nums">{eurCents.format(shownSavings)}</span> / month
                <span className="font-normal text-brand/70">(estimated*)</span>
              </p>
            )}
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">
              {tier.blurb}
            </p>
            <Link href="/contact" className="btn-primary mt-7 self-start">
              {tier.cta}
            </Link>
            <p className="mt-5 text-[12.5px] leading-relaxed text-ink-3">
              Renting the device? Your rate drops another 0.05 pp. Rates shown
              for 🇲🇹 Malta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
