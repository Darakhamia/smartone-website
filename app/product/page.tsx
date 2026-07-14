import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import type { CountryCode, Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Product",
  description:
    "A certified cash register and payment terminal in one device – plus the Merchant Portal behind it. The complete solution, not just a card machine.",
};

const icons = {
  cardReader: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </>
  ),
  cashRegister: <path key="cr" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6m-6 4h4" />,
  tapToPhone: (
    <>
      <rect x="6" y="2.5" width="9" height="19" rx="2.5" />
      <path d="M17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14" />
    </>
  ),
  portal: <path key="p" d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
  click: <path key="c" d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />,
};

function copyFor(lang: Lang, fiscal: boolean) {
  return tr(
    lang,
    {
      eyebrow: "Product",
      h1a: "One certified box.",
      h1b: "The complete solution.",
      sub: fiscal
        ? "A certified cash register and payment terminal in one device – the Merchant Portal behind it. Not just a card machine."
        : "A payment terminal and the Merchant Portal in one device. Not just a card machine.",
      get: "Get a terminal →",
      seePricing: "See pricing",
      sales: "Contact sales",
      alt: "SmartOne terminal taking a contactless payment at a flower shop",
      pfEyebrow: "Payments & Fiscal",
      pfTitle: "One device takes the money and keeps you compliant.",
      toolsEyebrow: "Tools",
      toolsTitle: "The software around the counter.",
      explore: "Explore",
      cards: {
        cardReader: { title: "Card reader", text: "The payment terminal: card, contactless and cash on one screen, printer built in. Bank Pro & the dual-screen Pro S." },
        cashRegister: {
          title: "Cash register",
          text: fiscal
            ? "A certified fiscal till built into the device – worth €1,000–1,500 elsewhere, yours for €399."
            : "No fiscal register is required in your market – see how compliance works where you trade.",
        },
        tapToPhone: { title: "Tap to Phone", text: "Take contactless payments on a phone, no extra hardware. In certification – coming soon." },
        portal: { title: "Merchant Portal", text: "Track payments, follow payouts, reprint receipts and know your numbers – one login." },
        click: { title: "Click", text: "Orders for cafés and restaurants, sent straight to the register – one catalogue, one flow." },
      },
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
      ctaTitle: "One box on the counter. Everything behind it.",
      ctaText: "Live in four business days or less.",
    },
    {
      eyebrow: "Producto",
      h1a: "Una caja certificada.",
      h1b: "La solución completa.",
      sub: fiscal
        ? "Una caja registradora certificada y terminal de pago en un solo dispositivo, con el Merchant Portal detrás. No solo un datáfono."
        : "Un terminal de pago y el Merchant Portal en un solo dispositivo. No solo un datáfono.",
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      sales: "Contactar con ventas",
      alt: "Terminal SmartOne aceptando un pago contactless en una floristería",
      pfEyebrow: "Pagos y fiscal",
      pfTitle: "Un dispositivo cobra y te mantiene en regla.",
      toolsEyebrow: "Herramientas",
      toolsTitle: "El software alrededor del mostrador.",
      explore: "Descubrir",
      cards: {
        cardReader: { title: "Datáfono", text: "El terminal de pago: tarjeta, contactless y efectivo en una pantalla, con impresora integrada. Bank Pro y el Pro S de doble pantalla." },
        cashRegister: {
          title: "Caja registradora",
          text: fiscal
            ? "Una caja fiscal certificada integrada en el dispositivo: vale 1.000-1.500 € en otros sitios, la tuya por 399 €."
            : "En tu mercado no se requiere caja fiscal: mira cómo funciona el cumplimiento donde operas.",
        },
        tapToPhone: { title: "Tap to Phone", text: "Acepta pagos contactless en un móvil, sin hardware adicional. En certificación, muy pronto." },
        portal: { title: "Merchant Portal", text: "Controla pagos, sigue liquidaciones, reimprime tickets y conoce tus cifras: un solo acceso." },
        click: { title: "Click", text: "Pedidos para cafeterías y restaurantes, directos a la caja: un catálogo, un flujo." },
      },
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
      ctaTitle: "Una caja en el mostrador. Todo lo demás detrás.",
      ctaText: "Operativo en cuatro días hábiles o menos.",
    },
  );
}

function ProductCard({ href, icon, title, text, explore }: { href: string; icon: React.ReactNode; title: string; text: string; explore: string }) {
  return (
    <Link href={href} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1 hover:border-brand/30">
      <span className="grid size-12 place-items-center rounded-xl bg-brand-tint transition-colors duration-300 group-hover:bg-brand">
        <svg viewBox="0 0 24 24" className="size-6 stroke-brand transition-colors duration-300 group-hover:stroke-white" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {icon}
        </svg>
      </span>
      <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-2">{text}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand">
        {explore}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export default async function ProductPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const { fiscal } = country;
  const c = copyFor(lang, fiscal);
  const isEs = country.code === "es";

  return (
    <>
      {/* 1 · hero */}
      <section className="overflow-x-clip pt-16 pb-18 lg:pt-22">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">{c.get}</Link>
              <Link href="/pricing" className="btn-ghost">{c.seePricing}</Link>
            </div>
          </div>
          <div className="anim-fade-up anim-d-2 relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
            <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)]">
              <Image src="/hero-florist.jpg" alt={c.alt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Payments & Fiscal */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.pfEyebrow} title={c.pfTitle} />
          <div className="mt-11 grid gap-4 md:grid-cols-3">
            <Reveal className="h-full">
              <ProductCard href="/product/terminals" icon={icons.cardReader} title={c.cards.cardReader.title} text={c.cards.cardReader.text} explore={c.explore} />
            </Reveal>
            <Reveal delay={100} className="h-full">
              <ProductCard href="/product/cash-register" icon={icons.cashRegister} title={c.cards.cashRegister.title} text={c.cards.cashRegister.text} explore={c.explore} />
            </Reveal>
            <Reveal delay={200} className="h-full">
              <ProductCard href="/product/tap-to-phone" icon={icons.tapToPhone} title={c.cards.tapToPhone.title} text={c.cards.tapToPhone.text} explore={c.explore} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 · Tools */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.toolsEyebrow} title={c.toolsTitle} />
          <div className="mt-11 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <ProductCard href="/merchant-portal" icon={icons.portal} title={c.cards.portal.title} text={c.cards.portal.text} explore={c.explore} />
            </Reveal>
            <Reveal delay={100} className="h-full">
              <ProductCard href="/click" icon={icons.click} title={c.cards.click.title} text={c.cards.click.text} explore={c.explore} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 · compliance */}
      <section className="bg-bg-2 py-24">
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

      {/* 5 · final CTA */}
      <section className="py-24">
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
