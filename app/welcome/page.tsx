"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCountry } from "@/components/country/country-context";
import { Flag } from "@/components/country/flag";
import { COUNTRIES, LANG_NAMES, getCountry, type Country, type CountryCode, type Lang } from "@/lib/countries";
import { DICT } from "@/lib/dictionaries";
import { LogoMark, Logo } from "@/components/logo";

/* Country picker splash. Left: light branded welcome. Right: a clean grid
   of flag + name tiles. Countries with more than one language show a second
   step to pick the language. Choosing sets the cookies (via context) and
   enters the site – the proxy gate then never sends you back here. */

export default function WelcomePage() {
  const router = useRouter();
  const { enter, lang } = useCountry();
  const t = DICT[lang];
  const [selected, setSelected] = useState<Country | null>(null);

  const destination = () => {
    const from =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("from")
        : null;
    return from && from.startsWith("/") ? from : "/";
  };

  const pick = (code: CountryCode) => {
    const c = getCountry(code);
    if (c.languages.length > 1) {
      setSelected(c);
      return;
    }
    enter(code, c.languages[0]);
    router.push(destination());
  };

  const chooseLang = (l: Lang) => {
    if (!selected) return;
    enter(selected.code, l);
    router.push(destination());
  };

  return (
    <div className="lg:grid lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr]">
      {/* left · brand (light) */}
      <aside className="relative overflow-hidden bg-gradient-to-br from-brand-tint via-white to-bg-2 px-6 py-12 sm:px-10 lg:flex lg:flex-col lg:justify-between lg:py-14">
        <div className="pointer-events-none absolute -top-28 -left-24 size-96 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.16),transparent_65%)]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-[radial-gradient(circle,rgba(124,60,232,0.12),transparent_70%)]" />
        <LogoMark className="pointer-events-none absolute -right-8 -bottom-10 h-72 w-72 text-brand/[0.06]" />

        <div className="relative">
          <Logo className="h-6 w-auto text-brand" />
        </div>

        <div className="relative mt-12 max-w-lg lg:mt-0">
          <h1 className="anim-fade-up h-display text-[clamp(28px,4vw,44px)] leading-[1.08] text-ink">
            {t.welcome.heading}
          </h1>
          <p className="anim-fade-up anim-d-1 mt-4 max-w-md text-[16px] leading-relaxed text-ink-2">
            {t.welcome.lead}
          </p>
        </div>

        <div className="relative mt-10 hidden text-[12.5px] text-ink-3 lg:block">
          © {new Date().getFullYear()} SmartOne · Across Europe
        </div>
      </aside>

      {/* right · country grid or language step */}
      <main className="flex items-center px-6 py-12 sm:px-10 lg:py-14">
        {selected ? (
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
                <div className="font-display text-[22px] font-semibold tracking-tight text-ink">
                  {selected.name}
                </div>
                {selected.nativeName && (
                  <div className="text-[13.5px] text-ink-3">{selected.nativeName}</div>
                )}
              </div>
            </div>

            <h2 className="h-display mt-8 text-[clamp(22px,2.6vw,28px)] leading-tight">
              {t.welcome.language}
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
              {t.welcome.languageSub}
            </p>

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
                    <span className="mt-0.5 block text-[12.5px] tracking-wide text-ink-3 uppercase">
                      {l}
                    </span>
                  </span>
                  <svg viewBox="0 0 24 24" className="size-5 stroke-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:stroke-brand" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div key="countries" className="mx-auto w-full max-w-lg">
            <span className="eyebrow">{t.nav.region}</span>
            <h2 className="h-display mt-3 text-[clamp(24px,3vw,32px)] leading-tight">
              {t.welcome.choose}
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-2">
              {t.welcome.chooseSub}
            </p>

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
        )}
      </main>
    </div>
  );
}
