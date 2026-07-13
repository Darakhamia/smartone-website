"use client";

import { useRouter } from "next/navigation";
import { useCountry } from "@/components/country/country-context";
import { COUNTRIES, type Country, type CountryCode } from "@/lib/countries";
import { DICT } from "@/lib/dictionaries";
import { LogoMark, Logo } from "@/components/logo";

/* Country picker splash. Left: branded welcome. Right: the country list.
   Choosing a country sets the cookie (via context) and enters the site –
   the proxy gate then never sends you back here. */

function CountryRow({
  country,
  t,
  onPick,
}: {
  country: Country;
  t: (typeof DICT)["en"];
  onPick: (code: CountryCode) => void;
}) {
  const included = country.fiscal ? t.welcome.fiscal : t.welcome.noFiscal;
  return (
    <button
      onClick={() => onPick(country.code)}
      className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint hover:shadow-[0_18px_36px_-28px_rgba(90,25,181,0.55)] sm:p-5"
    >
      <span className="text-[34px] leading-none sm:text-[38px]" aria-hidden>
        {country.flag}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
            {country.name}
          </span>
          {country.nativeName && (
            <span className="text-[13px] text-ink-3">{country.nativeName}</span>
          )}
          {country.badge && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-[10.5px] font-semibold tracking-wide text-white uppercase">
              {country.badge}
            </span>
          )}
        </span>
        <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-2">
          {country.tagline}
        </span>
        <span className="mt-1.5 block font-mono text-[11px] tracking-wide text-ink-3 uppercase">
          {included}
        </span>
      </span>
      <svg
        viewBox="0 0 24 24"
        className="size-5 shrink-0 stroke-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:stroke-brand"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </button>
  );
}

export default function WelcomePage() {
  const router = useRouter();
  const { setCountry, lang } = useCountry();
  const t = DICT[lang];

  const pick = (code: CountryCode) => {
    setCountry(code);
    const from =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("from")
        : null;
    router.push(from && from.startsWith("/") ? from : "/");
  };

  return (
    <div className="lg:grid lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr]">
      {/* left · brand */}
      <aside className="relative overflow-hidden bg-gradient-to-br from-night-2 to-night px-6 py-12 text-white sm:px-10 lg:flex lg:flex-col lg:justify-between lg:py-14">
        <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.55),transparent_65%)]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-[radial-gradient(circle,rgba(124,60,232,0.35),transparent_70%)]" />
        <LogoMark className="pointer-events-none absolute -right-8 -bottom-10 h-72 w-72 text-white/[0.05]" />

        <div className="relative">
          <Logo className="h-6 w-auto text-white" />
        </div>

        <div className="relative mt-12 max-w-lg lg:mt-0">
          <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-medium text-white/80 ring-1 ring-white/15">
            {t.welcome.kicker}
          </span>
          <h1 className="anim-fade-up anim-d-1 h-display mt-5 text-[clamp(28px,4vw,44px)] leading-[1.08] text-white">
            {t.welcome.heading}
          </h1>
          <p className="anim-fade-up anim-d-2 mt-4 max-w-md text-[16px] leading-relaxed text-white/70">
            {t.welcome.lead}
          </p>
          <div className="anim-fade-up anim-d-3 mt-7 flex flex-wrap gap-2">
            {["Card payments", "Fiscal receipts", "Merchant Portal", "Payouts T+1"].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-white/8 px-3 py-1.5 text-[12.5px] font-medium text-white/75 ring-1 ring-white/10"
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative mt-10 hidden text-[12.5px] text-white/45 lg:block">
          © {new Date().getFullYear()} SmartOne · Across Europe
        </div>
      </aside>

      {/* right · country list */}
      <main className="flex items-center px-6 py-12 sm:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-lg">
          <span className="eyebrow">{t.nav.region}</span>
          <h2 className="h-display mt-3 text-[clamp(24px,3vw,32px)] leading-tight">
            {t.welcome.choose}
          </h2>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-2">
            {t.welcome.chooseSub}
          </p>

          <div className="mt-7 space-y-3">
            {COUNTRIES.map((c) => (
              <CountryRow key={c.code} country={c} t={t} onPick={pick} />
            ))}
          </div>

          <p className="mt-6 text-center text-[12.5px] text-ink-3">
            {t.welcome.change}
          </p>
        </div>
      </main>
    </div>
  );
}
