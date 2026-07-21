"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";

/* FAQ accordion, CSS grid-rows transitions, no animation libraries. */

export function Faq() {
  const { country, lang } = useCountry();
  const fiscal = country.fiscal;
  const c = tr(
    lang,
    {
      title: "Frequently asked questions",
      leadA: "Have a question we haven't answered?",
      talk: "Talk to us",
      faqs: [
        { q: "What's included in the price?", a: fiscal ? "Everything: the certified cash register and payment terminal, plus the Merchant Portal. No separate software subscription, no per-feature charges." : "Everything: the payment terminal and the Merchant Portal. No separate software subscription, no per-feature charges." },
        { q: "Do I need to open a new bank account?", a: "No. Your payouts go to the bank account you already have – we work with a licensed European banking partner, so there's no new interface to learn and no switching cost." },
        { q: "When do I get my money?", a: "Next business day (T+1). The portal shows exactly what's confirmed to pay you – net of commission, clearly shown." },
        { q: "Are there any hidden fees?", a: "No. Your commission is shown up front on every settlement in the portal. No setup fees, no monthly minimums, no surprise line items in a PDF statement." },
        { q: "How fast can I start taking payments?", a: fiscal ? "Four business days or less from signing up to going live – including fiscal registration of the device for your market." : "Four business days or less from signing up to going live." },
        { q: "Buy or rent – which is cheaper?", a: "Renting keeps your upfront cost low with a small monthly fee and a slightly lower transaction rate, on a one-year term. Buying is a one-off device cost with no minimum term. Either way, the same three volume bands apply." },
        { q: "How is my rate decided?", a: "By your monthly card volume – the more you take, the lower the rate. Pick the band that fits on the table above; if you're near an edge or want a tailored quote, talk to us and we'll confirm your rate within one business day." },
      ],
    },
    {
      title: "Preguntas frecuentes",
      leadA: "¿Tienes una pregunta que no hemos respondido?",
      talk: "Habla con nosotros",
      faqs: [
        { q: "¿Qué incluye el precio?", a: fiscal ? "Todo: la caja registradora certificada y el terminal de pago, más el Merchant Portal. Sin suscripción de software aparte ni cargos por función." : "Todo: el terminal de pago y el Merchant Portal. Sin suscripción de software aparte ni cargos por función." },
        { q: "¿Necesito abrir una cuenta bancaria nueva?", a: "No. Tus pagos llegan a la cuenta bancaria que ya tienes: trabajamos con un socio bancario europeo autorizado, así que no hay una interfaz nueva que aprender ni coste de cambio." },
        { q: "¿Cuándo recibo mi dinero?", a: "Al día hábil siguiente (T+1). El portal muestra exactamente lo que está confirmado para pagarte, neto de comisión y con total claridad." },
        { q: "¿Hay comisiones ocultas?", a: "No. Tu comisión se muestra por adelantado en cada liquidación en el portal. Sin cuotas de alta, sin mínimos mensuales, sin líneas sorpresa en un PDF." },
        { q: "¿En cuánto tiempo puedo empezar a cobrar?", a: fiscal ? "En cuatro días hábiles o menos, desde el alta hasta estar operativo, incluida la registración fiscal del dispositivo para tu mercado." : "En cuatro días hábiles o menos, desde el alta hasta estar operativo." },
        { q: "¿Comprar o alquilar? ¿Qué sale más barato?", a: "Alquilar mantiene bajo el coste inicial con una pequeña cuota mensual y una tarifa por operación algo más baja, con permanencia de un año. Comprar es un coste único del dispositivo, sin permanencia. En ambos casos aplican los mismos tres tramos por volumen." },
        { q: "¿Cómo se decide mi tarifa?", a: "Según tu volumen mensual con tarjeta: cuanto más cobras, más baja la tarifa. Elige el tramo que encaja en la tabla de arriba; si estás cerca de un límite o quieres una oferta a medida, habla con nosotros y confirmamos tu tarifa en un día hábil." },
      ],
    },
  );

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="eyebrow">FAQ</span>
        <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,40px)] leading-[1.06]">{c.title}</h2>
        <p className="mx-auto mt-4 max-w-130 text-[16px] leading-relaxed text-ink-2">
          {c.leadA}{" "}
          <Link href="/contact" className="font-semibold text-brand hover:text-brand-d">
            {c.talk}
          </Link>
          .
        </p>
      </div>
      <div className="mt-10 space-y-3">
        {c.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`rounded-2xl border bg-white transition-colors duration-200 ${isOpen ? "border-brand/40" : "border-line hover:border-line-2"}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-[16px] font-semibold tracking-tight">{f.q}</span>
                <span className={`grid size-7 shrink-0 place-items-center rounded-full bg-bg-2 text-ink-2 transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-tint text-brand" : ""}`}>
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-ink-2">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
