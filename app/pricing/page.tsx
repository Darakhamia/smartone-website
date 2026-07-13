import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PlanPicker } from "@/components/pricing/plan-picker";
import { Faq } from "@/components/pricing/faq";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent rates. No hidden fees. One rate per band, every fee shown up front. Buy the terminal or rent it – your call.",
};

export default async function PricingPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Pricing",
      titleA: "Transparent rates.",
      titleB: "No hidden fees.",
      lead: "One rate per band, every fee shown up front. Buy the terminal or rent it – your call.",
      included: country.fiscal ? "Cash register, printer and portal included" : "Receipt printer and portal included",
      footnote:
        "The rate shown is for domestic cards – corporate and international cards have their own clear rate, confirmed for your business.",
      footnote2: "paid out to your own bank next business day (T+1). Device prices are indicative and confirmed for your country.",
      honestEyebrow: "The honest bit",
      honestTitle: "What you'll never pay.",
      honestSub: "What you agreed at signing is exactly what you pay – nothing added, nothing hidden.",
      neverPay: [
        { label: "Rate mark-ups", desc: "The rate you agreed at signing is the rate you pay – never more." },
        { label: "Settlement fee", desc: "No cut taken when your money is paid out to you." },
        { label: "Minimum fee", desc: "Low-turnover month? We never add a minimum charge." },
        { label: "Inactivity fee", desc: "Quiet month with no sales? You pay nothing extra." },
      ],
      ctaTitle: "Get your exact rate.",
      ctaText: "Not sure about your volume? Talk to us and we'll work it out together.",
      cta1: "Get a terminal →",
      cta2: "Contact sales",
    },
    {
      eyebrow: "Precios",
      titleA: "Tarifas transparentes.",
      titleB: "Sin comisiones ocultas.",
      lead: "Una tarifa por tramo, cada comisión visible desde el principio. Compra el terminal o alquílalo, tú decides.",
      included: country.fiscal ? "Caja registradora, impresora y portal incluidos" : "Impresora de tickets y portal incluidos",
      footnote:
        "La tarifa mostrada es para tarjetas nacionales; las tarjetas corporativas e internacionales tienen su propia tarifa clara, confirmada para tu negocio.",
      footnote2: "abonado a tu propio banco el día hábil siguiente (T+1). Los precios del dispositivo son orientativos y se confirman para tu país.",
      honestEyebrow: "La parte honesta",
      honestTitle: "Lo que nunca pagarás.",
      honestSub: "Lo que acordaste al firmar es exactamente lo que pagas: nada añadido, nada oculto.",
      neverPay: [
        { label: "Recargos sobre la tarifa", desc: "La tarifa que acordaste al firmar es la que pagas, nunca más." },
        { label: "Comisión por liquidación", desc: "No nos quedamos con nada cuando te abonan tu dinero." },
        { label: "Comisión mínima", desc: "¿Mes de poca facturación? Nunca añadimos un mínimo." },
        { label: "Comisión por inactividad", desc: "¿Mes tranquilo sin ventas? No pagas nada extra." },
      ],
      ctaTitle: "Consigue tu tarifa exacta.",
      ctaText: "¿No sabes tu volumen? Habla con nosotros y lo calculamos juntos.",
      cta1: "Solicita tu terminal →",
      cta2: "Contactar con ventas",
    },
  );

  return (
    <>
      {/* 1 · hero */}
      <section className="pt-16 pb-10 lg:pt-22">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-170 text-center">
            <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.titleA}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
                {c.titleB}
              </span>
            </h1>
            <p className="anim-fade-up anim-d-2 mx-auto mt-5 max-w-125 text-lg leading-relaxed text-ink-2">
              {c.lead}
            </p>
          </div>
        </div>
      </section>

      {/* 2 · plan picker */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <PlanPicker />
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[12.5px] leading-relaxed text-ink-3">
              {c.footnote} {c.included} · {c.footnote2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 · what you'll never pay */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-165 text-center">
            <Reveal>
              <span className="eyebrow">{c.honestEyebrow}</span>
              <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,42px)] leading-[1.06]">{c.honestTitle}</h2>
              <p className="mx-auto mt-4 max-w-135 text-lg leading-relaxed text-ink-2">{c.honestSub}</p>
            </Reveal>
          </div>
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.neverPay.map((n, i) => (
              <Reveal key={n.label} delay={i * 80} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-white p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-tint">
                    <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 5l14 14M19 5 5 19" />
                    </svg>
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight line-through decoration-line-2 decoration-2">
                    {n.label}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{n.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · honest FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Faq />
        </div>
      </section>

      {/* 5 · final CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">{c.ctaTitle}</h2>
                <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">{c.ctaText}</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">
                    {c.cta1}
                  </Link>
                  <Link href="/contact" className="btn-ghost-dark">
                    {c.cta2}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
