import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { DayWalk } from "@/components/product/day-walk";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import type { CountryCode, Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Cash register",
  description:
    "A certified fiscal cash register built into the device you already use to take payments. Fiscal receipts, Z-reports and certification market by market – from €400.",
};

const whatIcons = [
  <path key="0" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6m-6 4h4" />,
  <path key="1" d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
  <path key="2" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />,
];

function copyFor(lang: Lang, fiscal: boolean, c$: string) {
  return tr(
    lang,
    {
      eyebrow: "Payments & Fiscal · Cash register",
      h1a: fiscal ? "A certified cash register," : "No fiscal register needed here.",
      h1b: fiscal ? "built in." : "",
      sub: fiscal
        ? "The fiscal till lives inside the same device you use to take payments. Certified receipts, Z-reports, and one box on the counter instead of two."
        : "Your market doesn't require a fiscal register – so we don't sell you one. You get card payments and the Merchant Portal, ready to go.",
      get: "Get a terminal →",
      seePricing: "See pricing",
      // what it is
      whatEyebrow: "What it is",
      whatTitle: "A fiscal till, not an add-on.",
      whatSub: "A cash register that records every sale the way the tax office expects – certified, numbered, reconciled.",
      what: [
        { title: "Fiscal receipts", text: "Certified, numbered receipts your customers and the tax office accept – printed on the spot." },
        { title: "Z-reports", text: "Close the day in one tap. The till is reconciled and the report is filed – nothing to tally by hand." },
        { title: "Certified market by market", text: "Registered and approved for the country you trade in – we name what's live and what's dated." },
      ],
      // price anchor
      priceEyebrow: "What a full setup costs",
      priceTitle: "A full setup worth €800–1,200. Yours for €400.",
      priceSub: "A cash register, a payment terminal and a printer add up fast as three separate boxes. We build all three into one certified device – so you pay once.",
      standaloneLabel: "Register + terminal + printer",
      standaloneRange: `${c$}800–1,200`,
      standaloneNote: "Three separate boxes, each with its own contract, crowding your counter.",
      oursLabel: "SmartOne, all in one",
      oursPrice: `${c$}400`,
      oursNote: "The certified register, the payment terminal and the printer in a single device. One box, one price.",
      // cashbox story
      cashEyebrow: "Cashbox",
      cashTitle: "Start with the register alone.",
      cashText:
        "SmartOne Cashbox, the on-device fiscal register, is certified on its own – you can start Cashbox-only and add card payments later. Upgrading is a KYC/KYB check, not new hardware.",
      cashReceipts: "41 receipts · closed 19:04",
      // day
      dayEyebrow: "A day with the register",
      dayTitle: "From the first sale to the accountant.",
      // compliance
      complianceEyebrow: "Compliance",
      complianceTitle: "Certified market by market.",
      complianceSub: "We name what's live and what's dated – nothing else.",
      compliance: {
        mt: { title: "Malta – live today", text: "Certified fiscal device, merchants on the counter now." },
        es: { title: "Spain – Verifactu-ready for 2027", text: "Built for the Verifactu programme, ahead of the deadline." },
        cy: { title: "Cyprus – fiscal receipts supported", text: "Card payments and compliant receipts on one certified device." },
        sk: { title: "Slovakia – fiscal-ready", text: "A payment terminal ready for local fiscal requirements." },
        uk: { title: "United Kingdom – no fiscal register", text: "No fiscal register is required. Take card payments and run your business from the Merchant Portal." },
      } as Record<CountryCode, { title: string; text: string }>,
      spainTitle: (isEs: boolean) => (isEs ? "Verifactu, explained" : "Selling in Spain? Verifactu 2027"),
      spainText: (isEs: boolean) => (isEs ? "What changes in 2027 and how the device keeps you compliant." : "Getting ready ahead of the deadline? Start here."),
      // cta
      ctaTitle: fiscal ? "One box on the counter. Fully certified." : "Card payments, ready in days.",
      ctaText: "Live in four business days or less.",
      sales: "Contact sales",
      // no-fiscal helpers
      seeTerminals: "See the terminals",
      seePortal: "Explore the Merchant Portal",
    },
    {
      eyebrow: "Pagos y fiscal · Caja registradora",
      h1a: fiscal ? "Una caja registradora certificada," : "Aquí no hace falta caja fiscal.",
      h1b: fiscal ? "integrada." : "",
      sub: fiscal
        ? "La caja fiscal vive dentro del mismo dispositivo con el que cobras. Tickets certificados, informes Z y una sola caja en el mostrador en lugar de dos."
        : "Tu mercado no exige una caja fiscal, así que no te la vendemos. Tienes pagos con tarjeta y el Merchant Portal, listos para usar.",
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      whatEyebrow: "Qué es",
      whatTitle: "Una caja fiscal, no un añadido.",
      whatSub: "Una caja registradora que registra cada venta como espera Hacienda: certificada, numerada, cuadrada.",
      what: [
        { title: "Tickets fiscales", text: "Tickets certificados y numerados que aceptan tus clientes y Hacienda, impresos al momento." },
        { title: "Informes Z", text: "Cierra el día en un tap. La caja queda cuadrada y el informe presentado, sin cuadrar a mano." },
        { title: "Certificado por mercado", text: "Registrado y aprobado para el país en el que operas: decimos qué está activo y qué tiene fecha." },
      ],
      priceEyebrow: "Lo que cuesta un montaje completo",
      priceTitle: "Un montaje completo que vale 800-1.200 €. El tuyo por 400 €.",
      priceSub: "Una caja registradora, un terminal de pago y una impresora suman rápido como tres cajas separadas. Nosotros integramos los tres en un dispositivo certificado, así que pagas una vez.",
      standaloneLabel: "Caja + terminal + impresora",
      standaloneRange: `${c$}800-1.200`,
      standaloneNote: "Tres cajas separadas, cada una con su contrato, ocupando tu mostrador.",
      oursLabel: "SmartOne, todo en uno",
      oursPrice: `${c$}400`,
      oursNote: "La caja certificada, el terminal de pago y la impresora en un solo dispositivo. Una caja, un precio.",
      cashEyebrow: "Cashbox",
      cashTitle: "Empieza solo con la caja.",
      cashText:
        "SmartOne Cashbox, la caja registradora fiscal del dispositivo, está certificada por sí sola: puedes empezar solo con Cashbox y añadir pagos con tarjeta después. Ampliar es una verificación KYC/KYB, no hardware nuevo.",
      cashReceipts: "41 tickets · cerrado 19:04",
      dayEyebrow: "Un día con la caja",
      dayTitle: "De la primera venta al contable.",
      complianceEyebrow: "Cumplimiento",
      complianceTitle: "Certificado mercado a mercado.",
      complianceSub: "Decimos qué está activo y qué tiene fecha, nada más.",
      compliance: {
        mt: { title: "Malta – activo hoy", text: "Dispositivo fiscal certificado, con comercios operando ya." },
        es: { title: "España – preparado para Verifactu 2027", text: "Diseñado para el programa Verifactu, antes del plazo." },
        cy: { title: "Chipre – tickets fiscales soportados", text: "Pagos con tarjeta y tickets conformes en un dispositivo certificado." },
        sk: { title: "Eslovaquia – preparado para la normativa fiscal", text: "Un terminal de pago listo para los requisitos fiscales locales." },
        uk: { title: "Reino Unido – sin caja fiscal", text: "No se requiere caja fiscal. Cobra con tarjeta y gestiona tu negocio desde el Merchant Portal." },
      } as Record<CountryCode, { title: string; text: string }>,
      spainTitle: (isEs: boolean) => (isEs ? "Verifactu, explicado" : "¿Vendes en España? Verifactu 2027"),
      spainText: (isEs: boolean) => (isEs ? "Qué cambia en 2027 y cómo el dispositivo te mantiene en regla." : "¿Te preparas antes del plazo? Empieza aquí."),
      ctaTitle: fiscal ? "Una caja en el mostrador. Totalmente certificada." : "Pagos con tarjeta, listos en días.",
      ctaText: "Operativo en cuatro días hábiles o menos.",
      sales: "Contactar con ventas",
      seeTerminals: "Ver los terminales",
      seePortal: "Descubre el Merchant Portal",
    },
  );
}

export default async function CashRegisterPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const { fiscal } = country;
  const c = copyFor(lang, fiscal, country.currencySymbol);
  const isEs = country.code === "es";

  return (
    <>
      {/* 1 · hero */}
      <section className="overflow-x-clip pt-16 pb-18 lg:pt-22">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(34px,4.6vw,58px)] leading-[1.05]">
              {c.h1a}{" "}
              {c.h1b && (
                <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
              )}
            </h1>
            <p className="anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">{c.get}</Link>
              {fiscal ? (
                <Link href="/pricing" className="btn-ghost">{c.seePricing}</Link>
              ) : (
                <Link href="/product/terminals" className="btn-ghost">{c.seeTerminals}</Link>
              )}
            </div>
          </div>
          <div className="anim-fade-up anim-d-2 relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.14),transparent_70%)]" />
            {/* stylised fiscal receipt */}
            <div className="relative grid h-80 place-items-center overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-tint via-bg-2 to-bg-2 shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)]">
              <div className="receipt-bottom chip-float w-52 rounded-t-2xl border border-line bg-white p-5 font-mono text-[12px] shadow-lg shadow-black/5">
                <div className="text-[14px] font-semibold text-ink">SmartOne</div>
                <div className="text-ink-3">FISCAL RECEIPT #0421</div>
                <div className="my-2.5 border-t border-dashed border-line-2" />
                <div className="flex justify-between text-ink-2"><span>{tr(lang, "Sale", "Venta")}</span><span>{country.currencySymbol}24.60</span></div>
                <div className="flex justify-between text-ink-2"><span>VAT</span><span>{country.currencySymbol}3.75</span></div>
                <div className="my-2.5 border-t border-dashed border-line-2" />
                <div className="text-[10.5px] text-ink-3">VAT · Z-REPORT · CERTIFIED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {fiscal ? (
        <>
          {/* 2 · what it is */}
          <section className="bg-bg-2 py-24">
            <div className="mx-auto max-w-6xl px-6">
              <SectionHead eyebrow={c.whatEyebrow} title={c.whatTitle} sub={c.whatSub} />
              <div className="mt-11 grid gap-4 md:grid-cols-3">
                {c.what.map((w, i) => (
                  <Reveal key={w.title} delay={i * 100} className="h-full">
                    <div className="h-full rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
                      <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                        <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          {whatIcons[i]}
                        </svg>
                      </span>
                      <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight">{w.title}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{w.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 3 · price anchor */}
          <section className="py-24">
            <div className="mx-auto max-w-6xl px-6">
              <SectionHead eyebrow={c.priceEyebrow} title={c.priceTitle} sub={c.priceSub} />
              <div className="mt-11 grid items-stretch gap-4 md:grid-cols-2">
                <Reveal className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-bg-2 p-8">
                    <span className="text-[13px] font-semibold tracking-wide text-ink-3 uppercase">{c.standaloneLabel}</span>
                    <div className="mt-4 font-display text-[clamp(34px,5vw,52px)] font-semibold tracking-tight text-ink-3 line-through decoration-ink-3/40">
                      {c.standaloneRange}
                    </div>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink-3">{c.standaloneNote}</p>
                  </div>
                </Reveal>
                <Reveal delay={100} className="h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-d p-8 text-white shadow-[0_28px_56px_-28px_rgba(90,25,181,0.75)]">
                    <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)]" />
                    <span className="text-[13px] font-semibold tracking-wide text-white/80 uppercase">{c.oursLabel}</span>
                    <div className="mt-4 font-display text-[clamp(40px,6vw,64px)] font-semibold tracking-tight">{c.oursPrice}</div>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-white/80">{c.oursNote}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 4 · cashbox story */}
          <section className="bg-bg-2 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <Reveal className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-8">
                  <span className="eyebrow">{c.cashEyebrow}</span>
                  <h3 className="h-display mt-4 text-[26px] leading-tight">{c.cashTitle}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.cashText}</p>
                  <div className="mt-6">
                    <div className="rounded-2xl bg-bg-2 p-4 font-mono text-[12.5px]">
                      <div className="flex justify-between text-ink-2">
                        <span>Z-report #218</span>
                        <span className="font-semibold text-ink">{country.currencySymbol}1,240.00</span>
                      </div>
                      <div className="mt-1 text-[11px] text-ink-3">{c.cashReceipts}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 5 · a day with the register */}
          <section className="py-24">
            <div className="mx-auto max-w-6xl px-6">
              <SectionHead eyebrow={c.dayEyebrow} title={c.dayTitle} />
              <Reveal>
                <DayWalk />
              </Reveal>
            </div>
          </section>
        </>
      ) : (
        /* non-fiscal (UK): a single explainer + routes onward */
        <section className="bg-bg-2 py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <span className="text-4xl">{country.flag}</span>
              <h2 className="h-display mt-4 text-[clamp(26px,3.4vw,40px)] leading-[1.08]">{c.compliance[country.code].title}</h2>
              <p className="mx-auto mt-4 max-w-135 text-lg leading-relaxed text-ink-2">{c.compliance[country.code].text}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <Link href="/product/terminals" className="btn-primary">{c.seeTerminals}</Link>
                <Link href="/merchant-portal" className="btn-ghost">{c.seePortal}</Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 6 · compliance – hidden for Malta (live today; no market-by-market reassurance needed) */}
      {country.code !== "mt" && (
        <section className={`${fiscal ? "bg-bg-2" : ""} py-24`}>
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead eyebrow={c.complianceEyebrow} title={c.complianceTitle} sub={c.complianceSub} />
            <div className="mx-auto mt-10 grid max-w-185 gap-4 sm:grid-cols-2">
              <Reveal className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="mt-4 font-display text-[20px] font-semibold tracking-tight">{c.compliance[country.code].title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{c.compliance[country.code].text}</p>
                </div>
              </Reveal>
              <Reveal delay={100} className="h-full">
                <Link href="/es" className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                  <span className="text-3xl">{isEs ? "📋" : "🇪🇸"}</span>
                  <h3 className="mt-4 flex items-center justify-between font-display text-[20px] font-semibold tracking-tight">
                    {c.spainTitle(isEs)}
                    <span className="text-brand transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{c.spainText(isEs)}</p>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* 7 · CTA */}
      <section className={`${!fiscal || country.code === "mt" ? "bg-bg-2" : ""} py-24`}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">{c.ctaTitle}</h2>
                <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">{c.ctaText}</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">{c.get}</Link>
                  <Link href="/contact" className="btn-ghost-dark">{c.sales}</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
