"use client";

import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { Flag } from "@/components/country/flag";
import { COUNTRIES, LANG_NAMES, getCountry, type Country, type CountryCode, type Lang } from "@/lib/countries";
import { DICT } from "@/lib/dictionaries";

/* The country / language picker, decoupled from any page chrome so it can be
   used both full-screen on /welcome and inside the first-visit overlay
   (RegionGate). It sets the country/language cookies via context, then calls
   onComplete so the caller can navigate or refresh. */
export function CountryPicker({ onComplete }: { onComplete?: () => void }) {
  const { enter, lang } = useCountry();
  const t = DICT[lang];
  const [selected, setSelected] = useState<Country | null>(null);

  const pick = (code: CountryCode) => {
    const c = getCountry(code);
    if (c.languages.length > 1) {
      setSelected(c);
      return;
    }
    enter(code, c.languages[0]);
    onComplete?.();
  };

  const chooseLang = (l: Lang) => {
    if (!selected) return;
    enter(selected.code, l);
    onComplete?.();
  };

  if (selected) {
    return (
      <div key="lang" className="anim-tier-in mx-auto w-full max-w-lg">
        <button
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-3 transition-colors hover:text-ink"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m10 4-4 4 4 4" />
          </svg>
          {t.welcome.choose}
        </button>

        <div className="mt-6 flex items-center gap-3.5">
          <Flag code={selected.code} className="h-9 w-13" />
          <div>
            <div className="font-display text-[22px] font-semibold tracking-tight text-ink">{selected.name}</div>
            {selected.nativeName && <div className="text-[13.5px] text-ink-3">{selected.nativeName}</div>}
          </div>
        </div>

        <h2 className="h-display mt-8 text-[clamp(22px,2.6vw,28px)] leading-tight">{t.welcome.language}</h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{t.welcome.languageSub}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {selected.languages.map((l) => (
            <button
              key={l}
              onClick={() => chooseLang(l)}
              className="group flex items-center justify-between rounded-2xl border border-line bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint"
            >
              <span>
                <span className="block font-display text-[16px] font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
                  {LANG_NAMES[l]}
                </span>
                <span className="mt-0.5 block text-[12.5px] tracking-wide text-ink-3 uppercase">{l}</span>
              </span>
              <svg viewBox="0 0 24 24" className="size-5 stroke-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:stroke-brand" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div key="countries" className="mx-auto w-full max-w-lg">
      <span className="eyebrow">{t.nav.region}</span>
      <h2 className="h-display mt-3 text-[clamp(24px,3vw,32px)] leading-tight">{t.welcome.choose}</h2>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-2">{t.welcome.chooseSub}</p>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            onClick={() => pick(c.code)}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint hover:shadow-[0_16px_32px_-26px_rgba(90,25,181,0.55)]"
          >
            <Flag code={c.code} className="h-7 w-10" />
            <span className="min-w-0 flex-1 font-display text-[15px] font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
              {c.name}
            </span>
            {c.languages.length > 1 && (
              <span className="shrink-0 rounded-full bg-bg-2 px-2 py-0.5 font-mono text-[10px] tracking-wide text-ink-3 uppercase">
                {c.languages.join(" · ")}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
