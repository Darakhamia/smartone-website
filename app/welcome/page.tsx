"use client";

import { useRouter } from "next/navigation";
import { useCountry } from "@/components/country/country-context";
import { Flag } from "@/components/country/flag";
import { COUNTRIES, type CountryCode } from "@/lib/countries";
import { DICT } from "@/lib/dictionaries";
import { LogoMark, Logo } from "@/components/logo";

/* Country picker splash. Left: light branded welcome. Right: a clean grid
   of flag + name tiles. Choosing a country sets the cookie (via context)
   and enters the site – the proxy gate then never sends you back here. */

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

      {/* right · country grid */}
      <main className="flex items-center px-6 py-12 sm:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-lg">
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
                <span className="min-w-0 font-display text-[15px] font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
