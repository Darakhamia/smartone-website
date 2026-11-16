"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";
import type { Tariffs } from "@/lib/pricing";

/* The plans of a market priced by card type (Spain): Light, with its rates
   by kind of card and the terminal to buy or rent, and Individual for
   larger volumes. The figures come from lib/pricing.ts (tariffsFor) – change
   them there, not here. */

/** A figure from lib/pricing.ts in the language's own notation: 1,20 and 10.000 in Spanish. */
export function figure(lang: Lang, value: string): string {
  if (lang !== "es") return value;
  return value.replace(/,/g, "\u0000").replace(/\./g, ",").replace(/\u0000/g, ".");
}

function copyFor(lang: Lang, c: string, t: Tariffs) {
  const f = (v: string) => figure(lang, v);
  return tr(
    lang,
    {
      light: {
        name: "Light",
        band: `For card sales up to ${c}${f(t.cap)} a month`,
        main: "consumer cards from the EU",
        fixed: `+ ${c}${f(t.fixed)} per transaction`,
        others: [
          { label: "Corporate cards from the EU", rate: t.rates.corporate },
          { label: "Cards from outside the EU", rate: t.rates.foreign },
        ],
        rent: "Rent the terminal",
        rentPrice: `${c}${f(t.price.rent)} / month`,
        buy: "Or buy it",
        buyPrice: `${c}${f(t.price.buy)}`,
        vat: "Prices include VAT.",
        cta: "Get a terminal →",
      },
      individual: {
        name: "Individual",
        band: `For card sales over ${c}${f(t.cap)} a month`,
        main: "Your own rate",
        sub: "Agreed with you for your volume and the cards you take.",
        cta: "Ask for your rate",
      },
      points: ["No minimum term", "Payouts to any EU bank account", "No other fees"],
    },
    {
      light: {
        name: "Light",
        band: `Para ventas con tarjeta de hasta ${c}${f(t.cap)} al mes`,
        main: "tarjetas de consumo de la UE",
        fixed: `+ ${c}${f(t.fixed)} por operación`,
        others: [
          { label: "Tarjetas corporativas de la UE", rate: t.rates.corporate },
          { label: "Tarjetas de fuera de la UE", rate: t.rates.foreign },
        ],
        rent: "Alquila el terminal",
        rentPrice: `${c}${f(t.price.rent)} / mes`,
        buy: "O cómpralo",
        buyPrice: `${c}${f(t.price.buy)}`,
        vat: "Precios con IVA incluido.",
        cta: "Solicita tu terminal →",
      },
      individual: {
        name: "Individual",
        band: `Para ventas con tarjeta de más de ${c}${f(t.cap)} al mes`,
        main: "Tu propia tarifa",
        sub: "Acordada contigo según tu volumen y las tarjetas que cobras.",
        cta: "Consulta tu tarifa",
      },
      points: ["Sin permanencia", "Cobros en cualquier cuenta bancaria de la UE", "Sin otros pagos"],
    },
  );
}

function Points({ items, light }: { items: string[]; light: boolean }) {
  return (
    <ul className="mt-6 grid gap-2.5">
      {items.map((p) => (
        <li key={p} className={`flex items-center gap-2.5 text-[14.5px] ${light ? "text-white/90" : "text-ink-2"}`}>
          <span className={`grid size-5.5 shrink-0 place-items-center rounded-full ${light ? "bg-white/20" : "bg-brand-tint"}`}>
            <Check className={`size-3.5 ${light ? "text-white" : "text-brand"}`} strokeWidth={2.6} aria-hidden />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

export function TariffPlans({ tariffs }: { tariffs: Tariffs }) {
  const { country, lang } = useCountry();
  const c = country.currencySymbol;
  const t = copyFor(lang, c, tariffs);
  const f = (v: string) => figure(lang, v);

  return (
    <div className="mx-auto grid max-w-4xl items-start gap-4 md:grid-cols-2">
      {/* Light – the published plan */}
      <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-[#7b3ce8] to-brand p-7 text-white shadow-[0_30px_60px_-30px_rgba(90,25,181,0.7)] sm:p-8">
        <h3 className="font-display text-[24px] font-semibold tracking-tight">{t.light.name}</h3>
        <p className="mt-1 text-[13.5px] text-white/75">{t.light.band}</p>

        <div className="mt-6">
          <span className="h-display block text-[46px] leading-none tracking-tight">{f(tariffs.rates.consumer)}%</span>
          <span className="mt-2 block text-[14px] font-medium text-white/90">{t.light.main}</span>
          <span className="mt-1 block text-[13px] text-white/70">{t.light.fixed}</span>
        </div>

        <dl className="mt-5 grid gap-2 rounded-2xl bg-white/12 px-4 py-3.5 text-[14px]">
          {t.light.others.map((o) => (
            <div key={o.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-white/80">{o.label}</dt>
              <dd className="shrink-0 font-semibold">
                {f(o.rate)}% + {c}
                {f(tariffs.fixed)}
              </dd>
            </div>
          ))}
        </dl>

        <dl className="mt-3 grid gap-2 rounded-2xl bg-white/12 px-4 py-3.5 text-[14px]">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-white/80">{t.light.rent}</dt>
            <dd className="shrink-0 font-semibold">{t.light.rentPrice}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-white/80">{t.light.buy}</dt>
            <dd className="shrink-0 font-semibold">{t.light.buyPrice}</dd>
          </div>
        </dl>
        <p className="mt-2 px-1 text-[12.5px] text-white/65">{t.light.vat}</p>

        <Points items={t.points} light />

        <Link href="/contact" className="btn-light mt-8 w-full">
          {t.light.cta}
        </Link>
      </div>

      {/* Individual – a rate agreed with the merchant */}
      <div className="relative flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 shadow-black/4 ring-line sm:p-8">
        <h3 className="font-display text-[24px] font-semibold tracking-tight text-ink">{t.individual.name}</h3>
        <p className="mt-1 text-[13.5px] text-ink-3">{t.individual.band}</p>

        <div className="mt-6">
          <span className="h-display block text-[40px] leading-[1.05] tracking-tight text-brand">{t.individual.main}</span>
          <span className="mt-3 block text-[14.5px] leading-relaxed text-ink-2">{t.individual.sub}</span>
        </div>

        <Points items={t.points} light={false} />

        <Link href="/contact" className="btn-ghost mt-8 w-full">
          {t.individual.cta}
        </Link>
      </div>
    </div>
  );
}
