import type { Metadata } from "next";
import Link from "next/link";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Tap to Phone",
  description: "Accept contactless payments on a phone – no extra hardware. SmartOne Tap to Phone is coming soon.",
};

export default async function TapToPhonePage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Payments & Fiscal · Tap to Phone",
      soon: "Coming soon",
      title: "Turn a phone into a card reader.",
      sub: "SmartOne Tap to Phone will let you take contactless card and wallet payments on a phone – no extra hardware, no separate terminal. We're getting it certified market by market.",
      notify: "Talk to us →",
      terminals: "See the terminals today",
      badge: "In certification",
    },
    {
      eyebrow: "Pagos y fiscal · Tap to Phone",
      soon: "Muy pronto",
      title: "Convierte un móvil en un datáfono.",
      sub: "SmartOne Tap to Phone te permitirá aceptar pagos contactless con tarjeta y wallet en un móvil, sin hardware adicional ni terminal aparte. Lo estamos certificando mercado a mercado.",
      notify: "Habla con nosotros →",
      terminals: "Ver los terminales hoy",
      badge: "En certificación",
    },
  );

  return (
    <section className="relative overflow-x-clip py-24 lg:py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-24 left-1/2 -z-10 size-140 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
          <div className="anim-fade-up anim-d-1 mt-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-[12.5px] font-semibold tracking-wide text-brand uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              {c.soon}
            </span>
          </div>
          <h1 className="anim-fade-up anim-d-2 h-display mt-5 text-[clamp(34px,4.8vw,58px)] leading-[1.04]">{c.title}</h1>
          <p className="anim-fade-up anim-d-3 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">{c.sub}</p>
          <div className="anim-fade-up anim-d-4 flex flex-wrap items-center gap-3.5">
            <Link href="/contact" className="btn-primary">{c.notify}</Link>
            <Link href="/product/terminals" className="btn-ghost">{c.terminals}</Link>
          </div>
        </div>

        {/* phone + contactless visual */}
        <div className="anim-fade-up anim-d-2 relative grid h-96 place-items-center">
          <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[radial-gradient(circle,rgba(90,25,181,0.10),transparent_70%)]" />
          <div className="chip-float relative">
            <svg viewBox="0 0 260 300" className="h-80 w-auto" aria-hidden>
              <defs>
                <linearGradient id="psheen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
                  <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              {/* phone body */}
              <rect x="70" y="20" width="120" height="240" rx="26" fill="#1d1d1f" />
              <rect x="70" y="20" width="120" height="240" rx="26" fill="url(#psheen)" />
              <rect x="82" y="40" width="96" height="200" rx="14" fill="#0e0e10" />
              {/* amount on screen */}
              <text x="130" y="118" fontSize="22" fontWeight="700" textAnchor="middle" fill="#ffffff" fontFamily="IBM Plex Mono, monospace">{country.currencySymbol}24.60</text>
              <text x="130" y="142" fontSize="10.5" textAnchor="middle" fill="#a578e8" fontFamily="IBM Plex Mono, monospace">Tap to pay</text>
              {/* contactless waves emanating */}
              <g stroke="#a578e8" fill="none" strokeLinecap="round" strokeWidth="3">
                <path d="M150 180 a26 26 0 0 1 0 40" opacity="0.9" />
                <path d="M162 172 a40 40 0 0 1 0 56" opacity="0.55" />
                <path d="M174 164 a54 54 0 0 1 0 72" opacity="0.3" />
              </g>
              {/* home indicator */}
              <rect x="112" y="246" width="36" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
            </svg>
            {/* floating card */}
            <div className="chip-float-slow absolute -right-8 top-28 w-28 rotate-[8deg] rounded-xl bg-gradient-to-br from-brand to-brand-d p-3 text-white shadow-[0_20px_40px_-16px_rgba(90,25,181,0.7)]">
              <div className="h-4 w-6 rounded-sm bg-white/40" />
              <div className="mt-4 font-mono text-[9px] tracking-widest text-white/80">•••• 6041</div>
            </div>
          </div>
          <span className="absolute bottom-2 rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold text-ink-3 shadow-sm ring-1 ring-line">
            {c.badge}
          </span>
        </div>
      </div>
    </section>
  );
}
