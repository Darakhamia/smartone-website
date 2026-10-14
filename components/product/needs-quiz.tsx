"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCountry } from "@/components/country/country-context";
import { LogoMark } from "@/components/logo";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, SHOWCASE_DEVICE, type Country, type Lang } from "@/lib/countries";

/* "What do you need?" quiz. Instead of picking a device model (Malta and most
   markets get one device), it asks a few questions and recommends which
   SmartOne products to switch on: the payment terminal, the fiscal cash
   register, Click for HoReCa and the Merchant Portal. The "till mode" question
   is Malta-only (the register is only sold there).

   Every answer is a picture: the business question shows the kind of place,
   the others show the product the answer leads to. The steps along the top
   carry the answers given so far, and pressing one goes back to it. Picking
   an answer moves straight on; the choice stays marked if you come back. */

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

const businessPhotos = ["/industries/retail.jpg", "/industries/cafes.jpg", "/industries/mobile-courier.jpg"];

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      startOver: "Start over",
      recBadge: "Your recommendation",
      recTitle: "Your SmartOne setup",
      soon: "Coming soon:",
      get: "Talk to us →",
      bank: "Your bank",
      questions: [
        {
          id: "business",
          step: "Business",
          q: "What kind of business do you run?",
          options: [
            { label: "Shop or retail", short: "Shop or retail", sub: "Counter sales, products" },
            { label: "Café, bar or restaurant", short: "Café, bar or restaurant", sub: "Food & drink, tables" },
            { label: "Services or on the move", short: "Services or on the move", sub: "Appointments, market, delivery" },
          ],
        },
        {
          id: "till",
          step: "Till",
          q: "How do you want to run the till?",
          options: [
            { label: "Simple mode – just the till", short: "Simple mode", sub: "Ring up sales and print receipts" },
            { label: "With a web dashboard", short: "Web dashboard", sub: "Manage inventory, products and reports online" },
          ],
        },
        {
          id: "volume",
          step: "Card sales",
          q: "How much do you take by card?",
          options: [
            { label: "Steady, through the day", short: "Steady", sub: "Regular card sales" },
            { label: "Now and then", short: "Now and then", sub: "Low volume or occasional" },
          ],
        },
        {
          id: "reports",
          step: "Reports",
          q: "Do you want to track payouts, fees and reports?",
          options: [
            { label: "Yes, all in one place", short: "All in one place", sub: "See the money side clearly" },
            { label: "I just want to get paid", short: "Just get paid", sub: "Keep it simple" },
          ],
        },
      ],
      products: {
        terminal: { name: "Payment terminal", short: "Card, contactless and cash", href: "/product/terminals" },
        cashRegister: { name: "Cash register", short: "VAT-approved fiscal till", shortWeb: "VAT-approved, with a web dashboard", href: "/product/cash-register" },
        click: { name: "Click", short: "Orders straight to the register", href: "/click" },
        portal: { name: "Merchant Portal", short: "Included", href: "/merchant-portal" },
        tapToPhone: { name: "Tap to Phone", short: "", href: "/product/tap-to-phone" },
      },
    },
    {
      startOver: "Empezar de nuevo",
      recBadge: "Nuestra recomendación",
      recTitle: "Tu configuración SmartOne",
      soon: "Muy pronto:",
      get: "Habla con nosotros →",
      bank: "Tu banco",
      questions: [
        {
          id: "business",
          step: "Negocio",
          q: "¿Qué tipo de negocio tienes?",
          options: [
            { label: "Tienda o retail", short: "Tienda o retail", sub: "Ventas en mostrador, productos" },
            { label: "Café, bar o restaurante", short: "Café, bar o restaurante", sub: "Comida y bebida, mesas" },
            { label: "Servicios o en movimiento", short: "Servicios o en movimiento", sub: "Citas, mercado, reparto" },
          ],
        },
        {
          id: "till",
          step: "Caja",
          q: "¿Cómo quieres llevar la caja?",
          options: [
            { label: "Modo simple – solo la caja", short: "Modo simple", sub: "Cobra ventas e imprime tickets" },
            { label: "Con panel web", short: "Panel web", sub: "Gestiona inventario, productos e informes online" },
          ],
        },
        {
          id: "volume",
          step: "Tarjeta",
          q: "¿Cuánto cobras con tarjeta?",
          options: [
            { label: "De forma constante, todo el día", short: "Constante", sub: "Ventas con tarjeta habituales" },
            { label: "De vez en cuando", short: "De vez en cuando", sub: "Poco volumen u ocasional" },
          ],
        },
        {
          id: "reports",
          step: "Informes",
          q: "¿Quieres controlar liquidaciones, comisiones e informes?",
          options: [
            { label: "Sí, todo en un sitio", short: "Todo en un sitio", sub: "Ver el dinero con claridad" },
            { label: "Solo quiero cobrar", short: "Solo cobrar", sub: "Mantenerlo simple" },
          ],
        },
      ],
      products: {
        terminal: { name: "Terminal de pago", short: "Tarjeta, contactless y efectivo", href: "/product/terminals" },
        cashRegister: { name: "Caja registradora", short: "Caja fiscal aprobada", shortWeb: "Aprobada, con panel web", href: "/product/cash-register" },
        click: { name: "Click", short: "Pedidos directos a la caja", href: "/click" },
        portal: { name: "Merchant Portal", short: "Incluido", href: "/merchant-portal" },
        tapToPhone: { name: "Tap to Phone", short: "", href: "/product/tap-to-phone" },
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

/* The selected mark sits inside the card – a ring drawn over it and a tick in
   the corner – so choosing never moves or resizes anything. */
function Selected() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 z-10 rounded-3xl shadow-[inset_0_0_0_3px_var(--color-brand-l)]" />
      <span className="absolute top-4 right-4 z-10 grid size-7 place-items-center rounded-full bg-brand">
        <Check className="size-4 text-white" strokeWidth={3.2} aria-hidden />
      </span>
    </>
  );
}

function Bars({ heights }: { heights: number[] }) {
  return (
    <span className="flex h-28 items-end gap-2.5" aria-hidden>
      {heights.map((h, i) => (
        <span key={i} className="w-6 rounded-t-md bg-gradient-to-t from-brand to-brand-l" style={{ height: `${h}%`, opacity: h ? 1 : 0.15 }} />
      ))}
    </span>
  );
}

/* What each answer shows, by question and option. */
function OptionVisual({ id, index, bank }: { id: string; index: number; bank: string }) {
  if (id === "till" && index === 0) {
    return (
      <span className="relative size-[230px] translate-y-6">
        <Image src={SHOWCASE_DEVICE} alt="" fill sizes="230px" className="object-contain drop-shadow-[0_24px_28px_rgba(42,12,92,0.35)]" />
      </span>
    );
  }
  if ((id === "till" && index === 1) || (id === "reports" && index === 0)) {
    return (
      <span className="flex h-[78%] w-[82%] flex-col self-end overflow-hidden rounded-t-[14px] bg-white shadow-[0_-10px_40px_-18px_rgba(42,12,92,0.45)]">
        <span className="flex gap-1.5 border-b border-line px-3 py-2">
          <span className="size-2 rounded-full bg-line-2" />
          <span className="size-2 rounded-full bg-line-2" />
          <span className="size-2 rounded-full bg-line-2" />
        </span>
        <span className="relative flex-1">
          <Image
            src={id === "till" ? "/portal/dashboard.webp" : "/portal/transactions.webp"}
            alt=""
            fill
            sizes="400px"
            className="object-cover object-left-top"
          />
        </span>
      </span>
    );
  }
  if (id === "volume") return <Bars heights={index === 0 ? [45, 60, 52, 78, 70, 88, 96] : [0, 30, 0, 0, 42, 0, 18]} />;
  // reports, "just get paid": the money goes to their bank, nothing else
  return (
    <span className="flex w-[78%] items-center gap-3" aria-hidden>
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand">
        <LogoMark className="size-6 text-white" />
      </span>
      <span className="h-0.5 flex-1" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-brand-l) 0 6px, transparent 6px 12px)" }} />
      <span className="flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-3 text-[13px] font-semibold">
        <svg viewBox="0 0 24 24" className="size-[18px] stroke-ink" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />
        </svg>
        {bank}
      </span>
    </span>
  );
}

export function NeedsQuiz() {
  const { country, lang } = useCountry();
  const c = copyFor(lang);
  // The "till mode" question is Malta-only (the register is only offered there).
  const questions = c.questions.filter((q) => q.id !== "till" || promotesRegister(country));
  // answers outlive going back, so a revisited question shows what was picked
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const done = step === questions.length;

  const pick = (opt: number) => {
    setAnswers((a) => [...a.slice(0, step), opt]);
    setStep((s) => s + 1);
  };
  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  const stepper = (
    <ol className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[22px] bg-white p-1.5 shadow-[0_0_0_1px_var(--color-line)]">
      {questions.map((q, i) => {
        const answered = i < step;
        const current = i === step;
        const label = answered ? q.options[answers[i]].short : q.step;
        return (
          <li key={q.id}>
            {answered ? (
              <button
                type="button"
                onClick={() => setStep(i)}
                className="flex items-center gap-2 rounded-full py-2 pr-4 pl-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-bg-2"
              >
                <span className="grid size-5.5 place-items-center rounded-full bg-[#0e8a5f]">
                  <Check className="size-3 text-white" strokeWidth={3.4} aria-hidden />
                </span>
                {label}
              </button>
            ) : (
              <span
                aria-current={current ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full py-2 pr-4 pl-2 text-[13.5px] ${current ? "bg-brand font-semibold text-white" : "font-medium text-ink-3"}`}
              >
                <span className={`grid size-5.5 place-items-center rounded-full text-[12px] ${current ? "bg-white/20" : "bg-bg-2"}`}>{i + 1}</span>
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );

  if (done) {
    const r = recommend(questions, answers, country);
    return (
      <div>
        {stepper}
        <div key="result" className="anim-tier-in mx-auto mt-8 flex max-w-5xl flex-wrap gap-2.5 rounded-[28px] bg-white p-2.5 shadow-[0_0_0_1px_var(--color-line),0_40px_80px_-56px_rgba(90,25,181,0.45)]">
          <div className="flex min-w-0 flex-[1_1_340px] flex-col items-start rounded-[20px] bg-gradient-to-br from-brand-tint to-[#e6d9fb] p-7">
            <span className="anim-badge-pop inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold tracking-[0.08em] text-[#0e6b4a] uppercase">
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
              {c.recBadge}
            </span>
            <h3 className="h-display mt-4 text-[clamp(26px,3vw,32px)] leading-tight">{c.recTitle}</h3>
            <span className="relative my-2 size-[240px] self-center">
              <Image src={SHOWCASE_DEVICE} alt="" fill sizes="240px" className="object-contain drop-shadow-[0_24px_28px_rgba(42,12,92,0.35)]" />
            </span>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/contact" className="btn-primary">{c.get}</Link>
              <button type="button" onClick={reset} className="py-1 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink">
                {c.startOver}
              </button>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3 p-2 sm:p-4">
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {r.keys.map((k) => {
                const p = c.products[k];
                const short = k === "cashRegister" && r.webTill ? c.products.cashRegister.shortWeb : p.short;
                return (
                  <Link
                    key={k}
                    href={p.href}
                    className="group flex flex-col justify-between gap-5 rounded-[18px] border border-line-2 p-5 transition-colors hover:border-brand hover:bg-brand-tint/40"
                  >
                    <span className="flex items-start justify-between">
                      <span className="relative grid size-11.5 place-items-center rounded-[13px] bg-brand-tint text-brand">
                        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          {productIcons[k]}
                        </svg>
                        <span className="absolute -top-1.5 -right-1.5 grid size-4.5 place-items-center rounded-full bg-[#0e8a5f] ring-2 ring-white">
                          <Check className="size-2.5 text-white" strokeWidth={3.6} aria-hidden />
                        </span>
                      </span>
                      <ArrowRight className="size-4.5 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" strokeWidth={2} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[17px] font-semibold tracking-tight">{p.name}</span>
                      <span className="mt-0.5 block text-[13.5px] text-ink-3">{short}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            {r.soon.map((k) => (
              <Link
                key={k}
                href={c.products[k].href}
                className="flex items-center gap-2.5 rounded-[14px] bg-bg-2 px-4 py-3 text-[14px] transition-colors hover:bg-brand-tint/60"
              >
                <svg viewBox="0 0 24 24" className="size-[19px] text-ink-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {productIcons[k]}
                </svg>
                <span className="text-ink-3">{c.soon}</span>
                <span className="font-semibold">{c.products[k].name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const question = questions[step];
  const photos = question.id === "business";

  return (
    <div>
      {stepper}
      <div key={step} className="anim-tier-in">
        <h3 className="mt-9 text-center font-display text-[clamp(22px,2.4vw,28px)] font-semibold tracking-tight">{question.q}</h3>
        <div className={`mx-auto mt-7 grid gap-4 sm:gap-5 ${photos ? "sm:grid-cols-3" : "max-w-4xl sm:grid-cols-2"}`}>
          {question.options.map((opt, oi) => {
            const selected = answers[step] === oi;
            return photos ? (
              <button
                key={opt.label}
                type="button"
                aria-pressed={selected}
                onClick={() => pick(oi)}
                className="group relative h-[220px] overflow-hidden rounded-3xl bg-night text-left text-white shadow-[0_30px_60px_-44px_rgba(17,17,20,0.6)] sm:h-[340px]"
              >
                <Image src={businessPhotos[oi]} alt="" fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-gradient-to-b from-night/0 from-35% to-night/90" />
                <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[inset_0_0_0_3px_var(--color-brand-l)] transition-opacity group-hover:opacity-100" />
                <span className={`absolute top-4 left-4 rounded-full px-2.5 py-1 font-mono text-[12px] font-semibold tracking-[0.06em] ${selected ? "bg-brand text-white" : "bg-white/90 text-ink"}`}>
                  0{oi + 1}
                </span>
                {selected && <Selected />}
                <span className="absolute inset-x-5 bottom-5">
                  <span className="block text-[20px] font-semibold tracking-tight">{opt.label}</span>
                  <span className="mt-1 block text-[14px] text-white/80">{opt.sub}</span>
                </span>
              </button>
            ) : (
              <button
                key={opt.label}
                type="button"
                aria-pressed={selected}
                onClick={() => pick(oi)}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white text-left shadow-[0_0_0_1px_var(--color-line),0_30px_60px_-48px_rgba(17,17,20,0.5)]"
              >
                <span className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 shadow-[inset_0_0_0_3px_var(--color-brand-l)] transition-opacity group-hover:opacity-100" />
                {selected && <Selected />}
                <span className="flex h-[190px] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-tint to-[#e9defb] sm:h-[230px]">
                  <OptionVisual id={question.id} index={oi} bank={c.bank} />
                </span>
                <span className="px-5.5 py-5">
                  <span className="block text-[18px] font-semibold tracking-tight">{opt.label}</span>
                  <span className="mt-1 block text-[14px] text-ink-2">{opt.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
        {step > 0 && (
          <div className="mt-6 text-center">
            <button type="button" onClick={reset} className="py-1 text-[13.5px] font-medium text-ink-3 transition-colors hover:text-ink">
              {c.startOver}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
