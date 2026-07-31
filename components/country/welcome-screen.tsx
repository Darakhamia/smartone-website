"use client";

import { useRouter } from "next/navigation";
import { useCountry } from "@/components/country/country-context";
import { CountryPicker } from "@/components/country/country-picker";
import { DICT } from "@/lib/dictionaries";
import { LogoMark, Logo } from "@/components/logo";

/* The region picker's one design, used in both places it can appear: the
   /welcome route, and the first-visit overlay (RegionGate). Two copies of this
   screen would drift, and the overlay is what almost every visitor actually
   sees – it should not be the plainer of the two.

   `onComplete` lets the overlay close itself instead of navigating; without it
   the screen keeps its own routing, so /welcome can stay a server component
   and pass nothing. `onDismiss` adds the close button, which only makes sense
   for the overlay – there is nothing to dismiss on a route. */
export function WelcomeScreen({
  onComplete,
  onDismiss,
}: {
  onComplete?: () => void;
  onDismiss?: () => void;
}) {
  const router = useRouter();
  const { lang } = useCountry();
  const t = DICT[lang];
  const closeLabel = lang === "es" ? "Cerrar" : "Close";

  const destination = () => {
    const from = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("from") : null;
    return from && from.startsWith("/") ? from : "/";
  };

  const done = onComplete ?? (() => router.push(destination()));

  return (
    <div className="relative min-h-[100svh] bg-white lg:grid lg:grid-cols-[1.05fr_1fr]">
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label={closeLabel}
          className="absolute top-4 right-4 z-20 grid size-10 place-items-center rounded-full border border-line bg-white/80 text-ink-2 backdrop-blur transition-colors hover:text-ink sm:top-6 sm:right-6"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}

      {/* left · brand (light) */}
      <aside className="relative overflow-hidden bg-gradient-to-br from-brand-tint via-white to-bg-2 px-6 py-12 sm:px-10 lg:flex lg:flex-col lg:justify-between lg:py-14">
        <div className="pointer-events-none absolute -top-28 -left-24 size-96 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.16),transparent_65%)]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-[radial-gradient(circle,rgba(124,60,232,0.12),transparent_70%)]" />
        <LogoMark className="pointer-events-none absolute -right-8 -bottom-10 h-72 w-72 text-brand/[0.06]" />

        <div className="relative">
          <Logo className="h-6 w-auto text-brand" />
        </div>

        <div className="relative mt-12 max-w-lg lg:mt-0">
          <h1 className="anim-fade-up h-display text-[clamp(28px,4vw,44px)] leading-[1.08] text-ink">{t.welcome.heading}</h1>
          <p className="lead anim-fade-up anim-d-1 mt-4 max-w-md text-[16px] leading-relaxed text-ink-2">{t.welcome.lead}</p>
        </div>

        <div className="relative mt-10 hidden text-[12.5px] text-ink-3 lg:block">
          © {new Date().getFullYear()} SmartOne · Across Europe
        </div>
      </aside>

      {/* right · country grid or language step */}
      <main className="flex items-center px-6 py-12 sm:px-10 lg:py-14">
        <CountryPicker onComplete={done} />
      </main>
    </div>
  );
}
