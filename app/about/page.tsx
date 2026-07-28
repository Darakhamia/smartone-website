import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Globe,
  LayoutDashboard,
  Calculator,
  QrCode,
  LineChart,
  Boxes,
  Cloud,
  Layers,
  Store,
  Zap,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister } from "@/lib/countries";

export const metadata: Metadata = {
  title: "About",
  description:
    "SmartOne is a European fintech company helping small and medium-sized businesses accept payments, manage sales and simplify daily operations – enterprise-level technology without enterprise-level complexity.",
};

// order matches c.platform
const platformIcons: LucideIcon[] = [Smartphone, Globe, LayoutDashboard, Calculator, QrCode, LineChart, Boxes, Cloud];
// order matches c.reasons
const reasonIcons: LucideIcon[] = [Layers, Store, Zap, Globe, Rocket];

export default async function AboutPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const register = promotesRegister(country);

  const c = tr(
    lang,
    {
      eyebrow: "About SmartOne",
      titleA: "The operating system",
      titleB: "for small businesses.",
      lead: "SmartOne is a European fintech company helping small and medium-sized businesses simplify the way they accept payments, manage sales and run their daily operations.",
      cta1: "Get a terminal →",
      cta2: "Talk to us",

      storyEyebrow: "Why we exist",
      storyTitle: "Less admin. More business.",
      story: [
        "We believe business owners should spend less time dealing with multiple providers, complex software and disconnected systems – and more time growing their business.",
        "That is why we are building an integrated ecosystem that combines smart payment technology, business management tools and cloud services in one simple platform.",
        "Whether you run a restaurant, retail store, beauty salon or professional service business, SmartOne gives you the tools to accept card payments, manage daily operations and stay connected with your customers.",
      ],

      missionLabel: "Our mission",
      mission: "To give every business access to enterprise-level technology without enterprise-level complexity.",

      platformEyebrow: "One ecosystem",
      platformTitle: "What the platform includes.",
      platformSub: "Payments, operations and the tools around them – built to work together, not bolted on.",
      platform: [
        "Smart Android payment terminals",
        "Payment acquiring across Europe",
        "Merchant Portal for business management",
        register ? "POS and cash register solutions" : "POS solutions",
        "QR ordering and hospitality tools",
        "Business analytics and reporting",
        "Inventory and sales management",
        "Cloud services built for growing businesses",
      ],

      whyEyebrow: "Why businesses choose SmartOne",
      whyTitle: "Built for your counter, not a head office.",
      reasons: [
        { title: "Everything in one ecosystem", text: "Payments, POS, business management and cloud services working together." },
        { title: "Built for SMEs", text: "Designed specifically for small and medium-sized businesses rather than large enterprises." },
        { title: "Fast and simple onboarding", text: "A streamlined digital experience that helps businesses start accepting payments faster." },
        { title: "European infrastructure", text: "Built for the European market with local payment expertise and expanding acquiring capabilities." },
        { title: "A future-ready platform", text: "Continuously evolving with new services that help merchants grow beyond accepting payments." },
      ],

      standardEyebrow: "Where we are",
      standardText:
        "Unlike traditional payment providers, we focus on technology that is simple to use, quick to deploy and built specifically for European SMEs. Today, SmartOne works with partners across Europe, continuously expanding its payment infrastructure and delivering modern fintech solutions that help businesses become more efficient, connected and profitable.",

      ctaTitle: "More than a payment provider.",
      ctaText: "Tell us about your counter and we'll show you exactly what your setup looks like.",
      ctaPricing: "See pricing",
    },
    {
      eyebrow: "Sobre SmartOne",
      titleA: "El sistema operativo",
      titleB: "de los pequeños negocios.",
      lead: "SmartOne es una empresa fintech europea que ayuda a las pymes a simplificar la forma en que cobran, gestionan sus ventas y llevan su día a día.",
      cta1: "Solicita tu terminal →",
      cta2: "Habla con nosotros",

      storyEyebrow: "Por qué existimos",
      storyTitle: "Menos gestión. Más negocio.",
      story: [
        "Creemos que quien dirige un negocio debería dedicar menos tiempo a lidiar con varios proveedores, software complejo y sistemas desconectados, y más tiempo a hacerlo crecer.",
        "Por eso estamos construyendo un ecosistema integrado que combina tecnología de pago inteligente, herramientas de gestión y servicios en la nube en una sola plataforma.",
        "Tanto si tienes un restaurante, una tienda, un salón de belleza o un negocio de servicios profesionales, SmartOne te da las herramientas para cobrar con tarjeta, gestionar el día a día y mantener el contacto con tus clientes.",
      ],

      missionLabel: "Nuestra misión",
      mission: "Dar a cada negocio acceso a tecnología de nivel empresarial, sin la complejidad de una gran empresa.",

      platformEyebrow: "Un solo ecosistema",
      platformTitle: "Qué incluye la plataforma.",
      platformSub: "Cobros, operativa y las herramientas de alrededor: pensadas para funcionar juntas, no añadidas a posteriori.",
      platform: [
        "Terminales de pago Android inteligentes",
        "Adquirencia de pagos en toda Europa",
        "Merchant Portal para gestionar el negocio",
        register ? "Soluciones de TPV y caja registradora" : "Soluciones de TPV",
        "Pedidos por QR y herramientas para hostelería",
        "Analítica e informes de negocio",
        "Gestión de inventario y ventas",
        "Servicios en la nube para negocios en crecimiento",
      ],

      whyEyebrow: "Por qué eligen SmartOne",
      whyTitle: "Hecho para tu mostrador, no para una oficina central.",
      reasons: [
        { title: "Todo en un ecosistema", text: "Cobros, TPV, gestión del negocio y servicios en la nube funcionando juntos." },
        { title: "Pensado para pymes", text: "Diseñado específicamente para pequeñas y medianas empresas, no para grandes corporaciones." },
        { title: "Alta rápida y sencilla", text: "Una experiencia digital ágil que ayuda a los negocios a empezar a cobrar antes." },
        { title: "Infraestructura europea", text: "Construido para el mercado europeo, con conocimiento local de pagos y adquirencia en expansión." },
        { title: "Una plataforma con futuro", text: "En evolución constante, con nuevos servicios para crecer más allá de aceptar pagos." },
      ],

      standardEyebrow: "Dónde estamos",
      standardText:
        "A diferencia de los proveedores de pago tradicionales, nos centramos en tecnología fácil de usar, rápida de implantar y creada específicamente para las pymes europeas. Hoy SmartOne trabaja con partners en toda Europa, ampliando de forma continua su infraestructura de pagos y ofreciendo soluciones fintech modernas que ayudan a los negocios a ser más eficientes, conectados y rentables.",

      ctaTitle: "Más que un proveedor de pagos.",
      ctaText: "Cuéntanos cómo es tu mostrador y te enseñamos exactamente cómo quedaría tu equipo.",
      ctaPricing: "Ver precios",
    },
  );

  const platform = c.platform.map((label, i) => ({ label, icon: platformIcons[i] }));
  const reasons = c.reasons.map((r, i) => ({ ...r, icon: reasonIcons[i] }));

  return (
    <>
      {/* 1 · hero */}
      <section className="relative overflow-x-clip pt-16 pb-20 lg:pt-24">
        <div className="pointer-events-none absolute -top-40 right-[-10%] size-150 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.09),transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-brand uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              {c.eyebrow}
            </span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-5 text-[clamp(38px,5.4vw,66px)] leading-[1.03]">
              {c.titleA}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
                {c.titleB}
              </span>
            </h1>
            <p className="anim-fade-up anim-d-2 mt-6 max-w-135 text-[clamp(17px,1.4vw,20px)] leading-relaxed text-ink-2">
              {c.lead}
            </p>
            <div className="anim-fade-up anim-d-3 mt-9 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">{c.cta1}</Link>
              <Link href="/contact" className="btn-ghost">{c.cta2}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · why we exist */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHead eyebrow={c.storyEyebrow} title={c.storyTitle} />
            <Reveal delay={90}>
              <div className="space-y-5 lg:pt-14">
                {c.story.map((p) => (
                  <p key={p} className="text-[16.5px] leading-relaxed text-ink-2">{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 · mission */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white sm:px-14">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <span className="text-[13px] font-semibold tracking-[0.08em] text-white/70 uppercase">{c.missionLabel}</span>
                <p className="h-display mx-auto mt-4 max-w-3xl text-[clamp(24px,3.2vw,38px)] leading-[1.15] text-white">
                  {c.mission}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 · what the platform includes */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.platformEyebrow} title={c.platformTitle} sub={c.platformSub} center />
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platform.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.label} delay={i * 60} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint">
                      <Icon className="size-6 text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-[15.5px] leading-snug font-semibold tracking-tight">{p.label}</h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 · why businesses choose SmartOne */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.whyEyebrow} title={c.whyTitle} />
          <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.title} delay={i * 70} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-sm shadow-black/3 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_40px_-28px_rgba(90,25,181,0.4)]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint">
                      <Icon className="size-6 text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tight">{r.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{r.text}</p>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={reasons.length * 70} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-3xl bg-gradient-to-br from-brand-tint to-white p-7 ring-1 ring-brand/15">
                <span className="text-[12.5px] font-semibold tracking-[0.08em] text-brand uppercase">{c.standardEyebrow}</span>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{c.standardText}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 · closing CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="rounded-[32px] border border-line bg-white px-8 py-14 text-center">
              <h2 className="h-display mx-auto max-w-160 text-[clamp(26px,3.4vw,40px)] leading-[1.08]">{c.ctaTitle}</h2>
              <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-ink-2">{c.ctaText}</p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Link href="/contact" className="btn-primary">{c.cta1}</Link>
                <Link href="/pricing" className="btn-ghost">{c.ctaPricing}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
