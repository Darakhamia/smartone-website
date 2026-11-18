"use client";

import { figure } from "@/components/pricing/tariff-plans";
import type { Country, Lang } from "@/lib/countries";
import { tr } from "@/lib/dictionaries";
import { cardVolumeBands, type CardVolumeBand } from "@/lib/leads";

/* The <option>s of "Monthly card sales", in the market's bands
   (cardVolumeBands in lib/leads.ts) and the visitor's language. Each value is
   the English text the lead carries; only the label is translated. */

function label(lang: Lang, c: string, band: CardVolumeBand): string {
  const f = (v: string) => `${c}${figure(lang, v)}`;
  const a = f(band.amount);
  switch (band.kind) {
    case "under":
      return tr(lang, `Under ${a}`, `Menos de ${a}`, `Менше ніж ${a}`, `Менее ${a}`);
    case "upTo":
      return tr(lang, `Up to ${a}`, `Hasta ${a}`, `До ${a}`, `До ${a}`);
    case "over":
      return tr(lang, `Over ${a}`, `Más de ${a}`, `Понад ${a}`, `Более ${a}`);
    case "between":
      return `${a}–${f(band.to)}`;
  }
}

export function CardVolumeOptions({ country, lang }: { country: Country; lang: Lang }) {
  return cardVolumeBands(country).map((band) => (
    <option key={band.value} value={band.value}>
      {label(lang, country.currencySymbol, band)}
    </option>
  ));
}
