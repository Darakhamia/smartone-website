import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { DayWalk } from "@/components/product/day-walk";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, terminalModel, TERMINAL_MODELS, type CountryCode, type Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Cash register",
  description:
    "A certified fiscal cash register built into the device you already use to take payments. Fiscal receipts, Z-reports and certification for the market you trade in.",
};

const whatIcons = [
  <path key="0" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6m-6 4h4" />,
  <path key="1" d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
  <path key="2" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />,
];

function copyFor(lang: Lang, register: boolean, fiscal: boolean, c$: string, countryName: string, device: string) {
  return tr(
    lang,
    {
      eyebrow: register ? "Payments & Fiscal · Cash register" : "Payments · Fiscal readiness",
      h1a: register ? "A certified cash register," : fiscal ? "Fiscal-ready when your market is." : "No fiscal register needed here.",
      h1b: register ? "built in." : "",
      sub: register
        ? "The fiscal till lives inside the same device you use to take payments. Certified receipts, Z-reports, and one box on the counter instead of two."
        : fiscal
          ? "Your market doesn't require a certified register from you today. When the rules change, your SmartOne device is ready – no new hardware, no second box on the counter."
          : "Your market doesn't require a fiscal register – so we don't sell you one. You get card payments and the Merchant Portal, ready to go.",
      heroAlt: register ? `The ${device} dual-screen register` : `The ${device} payment terminal`,
      get: "Get a terminal →",
      seePricing: "See pricing",
      // what it is
      whatEyebrow: "What it is",
      whatTitle: "A fiscal till, not an add-on.",
      whatSub: "A cash register that records every sale the way the tax office expects – certified, numbered, reconciled.",
      what: [
        { title: "Fiscal receipts", text: "Certified, numbered receipts your customers and the tax office accept – printed on the spot." },
        { title: "Z-reports", text: "Close the day in one tap. The till is reconciled and the report is filed – nothing to tally by hand." },
        { title: `Certified for ${countryName}`, text: "Registered and approved for the market you trade in – fiscal registration of the device is part of your setup." },
      ],
      // price anchor
      priceEyebrow: "What a full setup costs",
      priceTitle: `A full setup worth ${c$}800–1,200. Yours for ${c$}400.`,
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
      ctaTitle: register ? "One box on the counter. Fully certified." : fiscal ? "Payments now, fiscal-ready for later." : "Card payments, ready in days.",
      ctaText: "Live in four business days or less.",
      sales: "Contact sales",
      // no-fiscal helpers
      seeTerminals: "See the terminals",
      seePortal: "Explore the Merchant Portal",
    },
    {
      eyebrow: register ? "Pagos y fiscal · Caja registradora" : "Pagos · Preparación fiscal",
      h1a: register ? "Una caja registradora certificada," : fiscal ? "Listo para lo fiscal cuando toque." : "Aquí no hace falta caja fiscal.",
      h1b: register ? "integrada." : "",
      sub: register
        ? "La caja fiscal vive dentro del mismo dispositivo con el que cobras. Tickets certificados, informes Z y una sola caja en el mostrador en lugar de dos."
        : fiscal
          ? "Tu mercado no te exige hoy una caja fiscal certificada. Cuando cambien las normas, tu dispositivo SmartOne está listo, sin comprar hardware nuevo ni una segunda caja en el mostrador."
          : "Tu mercado no exige una caja fiscal, así que no te la vendemos. Tienes pagos con tarjeta y el Merchant Portal, listos para usar.",
      heroAlt: register ? `El registro de doble pantalla ${device}` : `El terminal de pago ${device}`,
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      whatEyebrow: "Qué es",
      whatTitle: "Una caja fiscal, no un añadido.",
      whatSub: "Una caja registradora que registra cada venta como espera Hacienda: certificada, numerada, cuadrada.",
      what: [
        { title: "Tickets fiscales", text: "Tickets certificados y numerados que aceptan tus clientes y Hacienda, impresos al momento." },
        { title: "Informes Z", text: "Cierra el día en un tap. La caja queda cuadrada y el informe presentado, sin cuadrar a mano." },
        { title: `Certificado para ${countryName}`, text: "Registrado y aprobado para el mercado en el que operas: la registración fiscal del dispositivo forma parte del alta." },
      ],
      priceEyebrow: "Lo que cuesta un montaje completo",
      priceTitle: `Un montaje completo que vale ${c$}800-1.200. El tuyo por ${c$}400.`,
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
      ctaTitle: register ? "Una caja en el mostrador. Totalmente certificada." : fiscal ? "Cobra ahora, listo para lo fiscal cuando toque." : "Pagos con tarjeta, listos en días.",
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
  // The cash register is promoted only where it's live (Malta today). Other
  // fiscal markets get a compliance-readiness page; non-fiscal a short explainer.
  const register = promotesRegister(country);
  // Spanish is only offered in Spain, so its native name is the right label there.
  const countryName = lang === "es" ? (country.nativeName ?? country.name) : country.name;
  const c = copyFor(lang, register, fiscal, country.currencySymbol, countryName, TERMINAL_MODELS[terminalModel(country)].name);
  const isEs = country.code === "es";
  // Fiscal-compliance block: only fiscal markets not yet live (not Malta / UK).
  // The Verifactu card is Spain-only.
  const showCompliance = fiscal && country.code !== "mt";

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
              {register ? (
                <Link href="/pricing" className="btn-ghost">{c.seePricing}</Link>
              ) : (
                <Link href="/product/terminals" className="btn-ghost">{c.seeTerminals}</Link>
              )}
            </div>
          </div>
          <div className="anim-fade-up anim-d-2 relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
            <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[32px] bg-gradient-to-b from-white to-brand-tint/50 ring-1 ring-line/60 sm:aspect-[5/4]">
              <div className="pointer-events-none absolute bottom-[14%] left-1/2 h-8 w-1/2 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(29,29,31,0.16),transparent_70%)] blur-md" />
              <div className="chip-float relative h-[88%] w-[64%]">
                <Image
                  src={`${TERMINAL_MODELS[terminalModel(country)].dir}/hero.webp`}
                  alt={c.heroAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {register ? (
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
      ) : !fiscal ? (
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
      ) : null}

      {/* 6 · compliance – only for fiscal markets not yet live (not Malta / UK); Verifactu card Spain-only */}
      {showCompliance && (
        <section className="bg-bg-2 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead eyebrow={c.complianceEyebrow} title={c.complianceTitle} sub={c.complianceSub} />
            <div className={`mx-auto mt-10 grid gap-4 ${isEs ? "max-w-185 sm:grid-cols-2" : "max-w-md"}`}>
              <Reveal className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="mt-4 font-display text-[20px] font-semibold tracking-tight">{c.compliance[country.code].title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{c.compliance[country.code].text}</p>
                </div>
              </Reveal>
              {isEs && (
                <Reveal delay={100} className="h-full">
                  <Link href="/es" className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                    <span className="text-3xl">📋</span>
                    <h3 className="mt-4 flex items-center justify-between font-display text-[20px] font-semibold tracking-tight">
                      {c.spainTitle(true)}
                      <span className="text-brand transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{c.spainText(true)}</p>
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7 · CTA */}
      <section className={`${showCompliance ? "" : "bg-bg-2"} py-24`}>
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
