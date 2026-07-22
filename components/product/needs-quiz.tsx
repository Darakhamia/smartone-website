"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, type Country, type Lang } from "@/lib/countries";

/* "What do you need?" quiz. Instead of picking a device model (Malta and most
   markets get one device), it asks a few questions and recommends which
   SmartOne products to switch on: the payment terminal, the fiscal cash
   register, Click for HoReCa and the Merchant Portal. The "till mode" question
   is Malta-only (the register is only sold there). */

const productIcons: Record<string, React.ReactNode> = {
  terminal: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M9.5 6h5M9 14h.01M12 14h.01M15 14h.01M9 17.5h.01M12 17.5h.01M15 17.5h.01" />
    </>
  ),
  cashRegister: <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6m-6 4h4" />,
  click: <path d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />,
  portal: <path d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
  tapToPhone: (
    <>
      <rect x="6" y="2.5" width="9" height="19" rx="2.5" />
      <path d="M17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14" />
    </>
  ),
};

// option icons keyed by question id (questions can be filtered out per country)
const optIcons: Record<string, React.ReactNode[]> = {
  business: [
    <path key="a" d="M3 9l1.2-5h15.6L21 9M4.5 9v10.5h15V9M9.5 19.5v-6h5v6" />,
    <path key="b" d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Zm11 1h2.5a2.5 2.5 0 0 1 0 5H16M8 3v2m3-2v2" />,
    <path key="c" d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  ],
  till: [
    <path key="t0" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 6h6M9 12h6" />,
    <g key="t1">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 9h18M7 21h10M12 17v4" />
    </g>,
  ],
  volume: [
    <path key="f" d="M4 19V5m0 14 5-5 4 3 7-8m0 0h-4m4 0v4" />,
    <path key="g" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  ],
  reports: [
    <path key="h" d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
    <path key="i" d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />,
  ],
};

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      question: "Question",
      of: "of",
      back: "Back",
      startOver: "Start over",
      recBadge: "Your recommendation",
      recTitle: "Your SmartOne setup",
      recLead: "One device runs all of it – here's what we'd switch on for you:",
      alsoSoon: "Coming soon, worth a look:",
      get: "Talk to us →",
      learn: "Learn more",
      questions: [
        {
          id: "business",
          q: "What kind of business do you run?",
          options: [
            { label: "Shop or retail", sub: "Counter sales, products" },
            { label: "Café, bar or restaurant", sub: "Food & drink, tables" },
            { label: "Services or on the move", sub: "Appointments, market, delivery" },
          ],
        },
        {
          id: "till",
          q: "How do you want to run the till?",
          options: [
            { label: "Simple mode – just the till", sub: "Ring up sales and print receipts" },
            { label: "With a web dashboard", sub: "Manage inventory, products and reports online" },
          ],
        },
        {
          id: "volume",
          q: "How much do you take by card?",
          options: [
            { label: "Steady, through the day", sub: "Regular card sales" },
            { label: "Now and then", sub: "Low volume or occasional" },
          ],
        },
        {
          id: "reports",
          q: "Do you want to track payouts, fees and reports?",
          options: [
            { label: "Yes, all in one place", sub: "See the money side clearly" },
            { label: "I just want to get paid", sub: "Keep it simple" },
          ],
        },
      ],
      products: {
        terminal: { name: "Payment terminal", text: "Card, contactless and cash on one device.", href: "/product/terminals" },
        cashRegister: {
          name: "Cash register",
          text: "A certified fiscal till, built into the device.",
          textWeb: "A certified fiscal till with a web dashboard for inventory and reports.",
          href: "/product/cash-register",
        },
        click: { name: "Click", text: "Orders straight to the register – for cafés & restaurants.", href: "/click" },
        portal: { name: "Merchant Portal", text: "Track payments, payouts, fees and reports. Included.", href: "/merchant-portal" },
        tapToPhone: { name: "Tap to Phone", text: "Take card payments on a phone – no extra hardware.", href: "/product/tap-to-phone" },
      },
    },
    {
      question: "Pregunta",
      of: "de",
      back: "Atrás",
      startOver: "Empezar de nuevo",
      recBadge: "Nuestra recomendación",
      recTitle: "Tu configuración SmartOne",
      recLead: "Un dispositivo hace todo esto: esto es lo que activaríamos para ti:",
      alsoSoon: "Muy pronto, échale un ojo:",
      get: "Habla con nosotros →",
      learn: "Más información",
      questions: [
        {
          id: "business",
          q: "¿Qué tipo de negocio tienes?",
          options: [
            { label: "Tienda o retail", sub: "Ventas en mostrador, productos" },
            { label: "Café, bar o restaurante", sub: "Comida y bebida, mesas" },
            { label: "Servicios o en movimiento", sub: "Citas, mercado, reparto" },
          ],
        },
        {
          id: "till",
          q: "¿Cómo quieres llevar la caja?",
          options: [
            { label: "Modo simple – solo la caja", sub: "Cobra ventas e imprime tickets" },
            { label: "Con panel web", sub: "Gestiona inventario, productos e informes online" },
          ],
        },
        {
          id: "volume",
          q: "¿Cuánto cobras con tarjeta?",
          options: [
            { label: "De forma constante, todo el día", sub: "Ventas con tarjeta habituales" },
            { label: "De vez en cuando", sub: "Poco volumen u ocasional" },
          ],
        },
        {
          id: "reports",
          q: "¿Quieres controlar liquidaciones, comisiones e informes?",
          options: [
            { label: "Sí, todo en un sitio", sub: "Ver el dinero con claridad" },
            { label: "Solo quiero cobrar", sub: "Mantenerlo simple" },
          ],
        },
      ],
      products: {
        terminal: { name: "Terminal de pago", text: "Tarjeta, contactless y efectivo en un dispositivo.", href: "/product/terminals" },
        cashRegister: {
          name: "Caja registradora",
          text: "Una caja fiscal certificada, integrada en el dispositivo.",
          textWeb: "Una caja fiscal certificada con panel web para inventario e informes.",
          href: "/product/cash-register",
        },
        click: { name: "Click", text: "Pedidos directos a la caja: para cafeterías y restaurantes.", href: "/click" },
        portal: { name: "Merchant Portal", text: "Controla pagos, liquidaciones, comisiones e informes. Incluido.", href: "/merchant-portal" },
        tapToPhone: { name: "Tap to Phone", text: "Cobra con tarjeta en un móvil, sin hardware adicional.", href: "/product/tap-to-phone" },
      },
    },
  );
}

type Copy = ReturnType<typeof copyFor>;
type Question = Copy["questions"][number];
type ProductKey = keyof Copy["products"];

function recommend(questions: Question[], answers: number[], country: Country): { keys: ProductKey[]; soon: ProductKey[]; webTill: boolean } {
  const byId: Record<string, number> = {};
  questions.forEach((q, i) => {
    byId[q.id] = answers[i];
  });
  const keys: ProductKey[] = ["terminal"];
  if (promotesRegister(country)) keys.push("cashRegister");
  if (byId.business === 1) keys.push("click");
  keys.push("portal");
  const soon: ProductKey[] = byId.volume === 1 ? ["tapToPhone"] : [];
  return { keys, soon, webTill: byId.till === 1 };
}

function ProductRow({ icon, name, text, href, learn, muted = false }: { icon: React.ReactNode; name: string; text: string; href: string; learn: string; muted?: boolean }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-line-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint/40"
    >
      <span className={`relative grid size-11 shrink-0 place-items-center rounded-xl ${muted ? "bg-bg-2 text-ink-3" : "bg-brand-tint text-brand"}`}>
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {icon}
        </svg>
        {!muted && (
          <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-[#0e8a5f] text-white ring-2 ring-white">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold tracking-tight text-ink">{name}</span>
        <span className="block text-[12.5px] leading-snug text-ink-3">{text}</span>
      </span>
      <span className="hidden shrink-0 items-center gap-1 text-[12.5px] font-semibold text-brand sm:inline-flex">
        {learn}
        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
      </span>
    </Link>
  );
}

function HeaderControls({ step, back, reset, backLabel, startLabel }: { step: number; back: () => void; reset: () => void; backLabel: string; startLabel: string }) {
  if (step === 0) return null;
  return (
    <div className="flex items-center gap-3.5">
      <button onClick={back} className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-3 transition-colors hover:text-ink">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m10 4-4 4 4 4" />
        </svg>
        {backLabel}
      </button>
      <button onClick={reset} className="text-[13px] font-medium text-ink-3 transition-colors hover:text-ink">
        {startLabel}
      </button>
    </div>
  );
}

export function NeedsQuiz() {
  const { country, lang } = useCountry();
  const c = copyFor(lang);
  // The "till mode" question is Malta-only (the register is only offered there).
  const questions = c.questions.filter((q) => q.id !== "till" || promotesRegister(country));
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step === questions.length;

  const pick = (opt: number) => setAnswers((a) => [...a, opt]);
  const back = () => setAnswers((a) => a.slice(0, -1));
  const reset = () => setAnswers([]);

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-[0_28px_60px_-30px_rgba(90,25,181,0.35)] sm:p-9">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-[#7b3ce8] to-brand-l" />
      {!done ? (
        <div key={step} className="anim-tier-in">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] font-semibold tracking-wide text-brand">
              {c.question} {step + 1} {c.of} {questions.length}
            </span>
            <HeaderControls step={step} back={back} reset={reset} backLabel={c.back} startLabel={c.startOver} />
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out" style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>

          <h3 className="mt-7 font-display text-[clamp(21px,2.4vw,26px)] font-semibold tracking-tight">{questions[step].q}</h3>

          <div className={`mt-6 grid gap-3 ${questions[step].options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {questions[step].options.map((opt, oi) => (
              <button
                key={opt.label}
                onClick={() => pick(oi)}
                className="group flex flex-col gap-3.5 rounded-2xl border border-line-2 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint hover:shadow-[0_16px_32px_-26px_rgba(90,25,181,0.55)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {optIcons[questions[step].id][oi]}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold tracking-tight text-ink">{opt.label}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-3">{opt.sub}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="anim-tier-in">
          {(() => {
            const r = recommend(questions, answers, country);
            return (
              <>
                <div className="flex items-center justify-between">
                  <span className="anim-badge-pop inline-block rounded-full bg-brand px-3.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                    {c.recBadge}
                  </span>
                  <HeaderControls step={step} back={back} reset={reset} backLabel={c.back} startLabel={c.startOver} />
                </div>
                <h3 className="h-display mt-4 text-[clamp(24px,3vw,32px)] leading-tight">{c.recTitle}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-2">{c.recLead}</p>

                <div className="mt-6 space-y-2.5">
                  {r.keys.map((k) => (
                    <ProductRow
                      key={k}
                      icon={productIcons[k]}
                      name={c.products[k].name}
                      text={k === "cashRegister" && r.webTill ? c.products.cashRegister.textWeb : c.products[k].text}
                      href={c.products[k].href}
                      learn={c.learn}
                    />
                  ))}
                </div>

                {r.soon.length > 0 && (
                  <div className="mt-5">
                    <p className="mb-2 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">{c.alsoSoon}</p>
                    <div className="space-y-2.5">
                      {r.soon.map((k) => (
                        <ProductRow key={k} icon={productIcons[k]} name={c.products[k].name} text={c.products[k].text} href={c.products[k].href} learn={c.learn} muted />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-7">
                  <Link href="/contact" className="btn-primary">{c.get}</Link>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
