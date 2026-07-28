"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, type Lang } from "@/lib/countries";

/* Buy / Rent plan picker – a segmented toggle over three volume-based tiers.
   NOTE: rates and device prices below follow the agreed reference figures –
   change them in one place here if commercial terms change. */

type Mode = "buy" | "rent";

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      modes: { buy: "Buy terminal", rent: "Rent terminal" },
      device: {
        buy: { label: "Buy terminal", price: "400", suffix: "+ VAT", term: "No minimum term" },
        rent: { label: "Rent terminal", price: "30", suffix: "+ VAT / month", term: "1-year minimum term" },
      },
      tiers: [
        { name: "Getting Started", band: "under {c}4,000 / month" },
        { name: "Up & Running", band: "{c}4,000 – {c}15,000 / month" },
        { name: "Flying", band: "over {c}15,000 / month" },
      ],
      popular: "Most popular",
      bestFor: "Best for",
      perTx: "per card transaction",
      fixed: "fixed fee per transaction",
      cta: "Get a terminal →",
      anchor1: "A certified cash register, terminal and printer in one device.",
      anchor2: "Bought separately: {c}800–1,200.",
      speak: "Speak to us about your rate",
    },
    {
      modes: { buy: "Compra el terminal", rent: "Alquila el terminal" },
      device: {
        buy: { label: "Compra", price: "400", suffix: "+ IVA", term: "Sin permanencia" },
        rent: { label: "Alquiler", price: "30", suffix: "+ IVA / mes", term: "Permanencia de 1 año" },
      },
      tiers: [
        { name: "Para empezar", band: "menos de {c}4,000 / mes" },
        { name: "En marcha", band: "{c}4,000 – {c}15,000 / mes" },
        { name: "Despegando", band: "más de {c}15,000 / mes" },
      ],
      popular: "Más popular",
      bestFor: "Ideal para",
      perTx: "por operación con tarjeta",
      fixed: "de comisión fija por operación",
      cta: "Solicita tu terminal →",
      anchor1: "Caja registradora certificada, terminal e impresora en un solo equipo.",
      anchor2: "Por separado: {c}800-1.200.",
      speak: "Consulta tu tarifa",
    },
  );
}

/* Renting carries the lower per-transaction rate (you pay a monthly fee and
   commit to a year); buying is a one-off device cost with no minimum term but
   a slightly higher rate. Keep this in step with the "Buy or rent" FAQ answer
   and its JSON-LD copy. */
const RATES: Record<Mode, [string, string, string]> = {
  buy: ["1.90", "1.20", "0.90"],
  rent: ["1.65", "1.00", "0.85"],
};

export function PlanPicker() {
  const { country, lang } = useCountry();
  const c = country.currencySymbol;
  const t = copyFor(lang);
  const [mode, setMode] = useState<Mode>("buy");
  const d = t.device[mode];

  return (
    <div>
      {/* segmented toggle */}
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-bg-2 p-1">
        {(["buy", "rent"] as Mode[]).map((m) => {
          const active = m === mode;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={active}
              className={`rounded-full px-6 py-2.5 text-[14.5px] font-semibold transition-colors ${
                active ? "bg-brand text-white shadow-sm shadow-brand/30" : "text-ink-2 hover:text-ink"
              }`}
            >
              {t.modes[m]}
            </button>
          );
        })}
      </div>

      {/* cards – re-mount on toggle for a soft transition */}
      <div key={mode} className="anim-tier-in mt-10 grid items-start gap-4 md:grid-cols-3">
        {t.tiers.map((tier, i) => {
          const popular = i === 1;
          const first = i === 0;
          const band = tier.band.replaceAll("{c}", c);
          const rate = RATES[mode][i];
          return (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl p-7 ${
                popular
                  ? "bg-gradient-to-br from-[#7b3ce8] to-brand text-white shadow-[0_30px_60px_-30px_rgba(90,25,181,0.7)] md:-mt-3 md:pt-9"
                  : "bg-white shadow-sm shadow-black/4 ring-1 " + (first ? "ring-brand/60" : "ring-line")
              }`}
            >
              {/* Badge sits inside the card, top right, in lilac – purple on
                  purple reads as washed out. */}
              {popular && (
                <span className="absolute top-5 right-5 rounded-full bg-brand-l px-3 py-1 text-[10.5px] font-bold tracking-wide text-brand-d uppercase">
                  {t.popular}
                </span>
              )}

              <h3 className={`font-display text-[22px] font-semibold tracking-tight ${popular ? "text-white" : "text-ink"}`}>
                {tier.name}
              </h3>
              <p className={`mt-1 text-[13.5px] ${popular ? "text-white/75" : "text-ink-3"}`}>
                {t.bestFor} <b className={popular ? "font-semibold text-white" : "font-semibold text-ink-2"}>{band}</b>
              </p>

              {/* device cost */}
              <div className={`mt-5 flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] ${popular ? "bg-white/15" : "bg-bg-2"}`}>
                <span className={popular ? "text-white/80" : "text-ink-2"}>{d.label}</span>
                <span className={`font-semibold ${popular ? "text-white" : "text-ink"}`}>
                  {c}
                  {d.price} {d.suffix}
                </span>
              </div>

              {/* rate – the qualifier sits on its own line so it reads as a
                  label for the number rather than getting lost beside it */}
              <div className="mt-6">
                <span className={`h-display block text-[46px] leading-none tracking-tight ${popular ? "text-white" : first ? "text-brand" : "text-brand-l"}`}>
                  {rate}%
                </span>
                <span className={`mt-2 block text-[14px] font-medium ${popular ? "text-white/90" : "text-ink-2"}`}>
                  {t.perTx}
                </span>
              </div>
              <p className={`mt-1.5 text-[13px] ${popular ? "text-white/70" : "text-ink-3"}`}>
                + {c}0.02 {t.fixed}
              </p>

              {/* term */}
              <span className={`mt-4 inline-flex w-fit rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold ${popular ? "bg-brand-l text-brand-d" : "bg-bg-2 text-ink-2"}`}>
                {d.term}
              </span>

              <Link href="/contact" className={`mt-7 w-full ${popular ? "btn-light" : "btn-ghost"}`}>
                {t.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {promotesRegister(country) && (
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3.5 rounded-2xl bg-brand-tint px-5 py-4 text-left sm:items-center">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
            <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 10h14l1 8H4l1-8Zm2 0V6h8l1 4M8.5 14h3" />
            </svg>
          </span>
          <p className="text-[13.5px] leading-relaxed text-ink-2">
            <b className="font-semibold text-ink">{t.anchor1.replaceAll("{c}", c)}</b> {t.anchor2.replaceAll("{c}", c)}
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/contact" className="btn-ghost">
          {t.speak}
        </Link>
      </div>
    </div>
  );
}
