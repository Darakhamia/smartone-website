"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/components/country/country-context";

/* Buy / Rent plan picker – a segmented toggle over three volume-based tiers.
   Replaces the turnover slider on the pricing page.
   NOTE: rates and device prices below follow the agreed reference figures –
   change them in one place here if commercial terms change. */

type Mode = "buy" | "rent";

const modes: { id: Mode; label: string }[] = [
  { id: "buy", label: "Buy terminal" },
  { id: "rent", label: "Rent terminal" },
];

const device: Record<Mode, { label: string; price: string; suffix: string; term: string }> = {
  buy: { label: "Buy terminal", price: "399", suffix: "+ VAT", term: "No minimum term" },
  rent: { label: "Rent terminal", price: "30", suffix: "+ VAT / month", term: "1-year minimum term" },
};

const tiers: {
  name: string;
  band: string; // uses {c} as the currency-symbol placeholder
  rate: Record<Mode, string>;
  popular?: boolean;
}[] = [
  { name: "Getting Started", band: "under {c}4,000 / month", rate: { buy: "1.65", rent: "1.90" } },
  { name: "Up & Running", band: "{c}4,000 – {c}15,000 / month", rate: { buy: "1.00", rent: "1.20" }, popular: true },
  { name: "Flying", band: "over {c}15,000 / month", rate: { buy: "0.85", rent: "0.90" } },
];

export function PlanPicker() {
  const { country } = useCountry();
  const c = country.currencySymbol;
  const [mode, setMode] = useState<Mode>("buy");
  const d = device[mode];

  return (
    <div>
      {/* segmented toggle */}
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-bg-2 p-1">
        {modes.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              aria-pressed={active}
              className={`rounded-full px-6 py-2.5 text-[14.5px] font-semibold transition-colors ${
                active ? "bg-brand text-white shadow-sm shadow-brand/30" : "text-ink-2 hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* cards – re-mount on toggle for a soft transition */}
      <div key={mode} className="anim-tier-in mt-10 grid items-start gap-4 md:grid-cols-3">
        {tiers.map((tier, i) => {
          const popular = !!tier.popular;
          const first = i === 0;
          const band = tier.band.replaceAll("{c}", c);
          const rate = tier.rate[mode];
          return (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl p-7 ${
                popular
                  ? "bg-gradient-to-br from-[#7b3ce8] to-brand text-white shadow-[0_30px_60px_-30px_rgba(90,25,181,0.7)] md:-mt-3 md:pt-9"
                  : "bg-white shadow-sm shadow-black/4 ring-1 " + (first ? "ring-brand/60" : "ring-line")
              }`}
            >
              {popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3.5 py-1 text-[11px] font-semibold tracking-wide text-brand uppercase shadow-sm">
                  Most popular
                </span>
              )}

              <h3 className={`font-display text-[22px] font-semibold tracking-tight ${popular ? "text-white" : "text-ink"}`}>
                {tier.name}
              </h3>
              <p className={`mt-1 text-[13.5px] ${popular ? "text-white/75" : "text-ink-3"}`}>
                Best for <b className={popular ? "font-semibold text-white" : "font-semibold text-ink-2"}>{band}</b>
              </p>

              {/* device cost */}
              <div
                className={`mt-5 flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] ${
                  popular ? "bg-white/15" : "bg-bg-2"
                }`}
              >
                <span className={popular ? "text-white/80" : "text-ink-2"}>{d.label}</span>
                <span className={`font-semibold ${popular ? "text-white" : "text-ink"}`}>
                  {c}
                  {d.price} {d.suffix}
                </span>
              </div>

              {/* rate */}
              <div className="mt-6 flex items-end gap-2">
                <span
                  className={`h-display text-[46px] leading-none tracking-tight ${
                    popular ? "text-white" : first ? "text-brand" : "text-brand-l"
                  }`}
                >
                  {rate}%
                </span>
                <span className={`mb-1.5 max-w-24 text-[13px] leading-tight ${popular ? "text-white/75" : "text-ink-3"}`}>
                  per card transaction
                </span>
              </div>
              <p className={`mt-2.5 text-[13px] ${popular ? "text-white/70" : "text-ink-3"}`}>
                + {c}0.02 fixed fee per transaction
              </p>

              {/* term */}
              <span
                className={`mt-4 inline-flex w-fit rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold ${
                  popular ? "bg-white/15 text-white" : "bg-bg-2 text-ink-2"
                }`}
              >
                {d.term}
              </span>

              <Link
                href="/contact"
                className={`mt-7 w-full ${popular ? "btn-light" : "btn-ghost"}`}
              >
                Get a terminal →
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link href="/contact" className="btn-ghost">
          Speak to us about your rate
        </Link>
      </div>
    </div>
  );
}
