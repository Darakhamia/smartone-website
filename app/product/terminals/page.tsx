import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { DeviceChooser } from "@/components/product/device-chooser";
import { Terminal } from "@/components/product/device-visuals";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Terminals",
  description:
    "The SmartOne payment terminal: card, contactless and cash on one device, with the receipt printer built in. Bank Pro, Pro S and Bank.",
};

const factIcons = [
  <path key="0" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6" />,
  <path key="1" d="M2 9a14 14 0 0 1 20 0M5.5 12.5a9 9 0 0 1 13 0M9 16a4.5 4.5 0 0 1 6 0M12 19h.01" />,
  <path key="2" d="M8 2.5h8v19H8zM10.5 5.5h3M12 18.5h.01" />,
];

const featIcons = [
  <>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19M6 15h4" />
  </>,
  <path key="p" d="M3 9h14v8H3zM17 11h3v4h-3M6 11.5v3m3-3v3m3-3v3" />,
  <path key="s" d="M9 3H5a2 2 0 0 0-2 2v3m6-5h10a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h4m6 0h4a2 2 0 0 0 2-2v-3M12 8v8m-3-5h6" />,
];

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      eyebrow: "Payments & Fiscal · Terminals",
      h1a: "One tap.",
      h1b: "Card, contactless, cash.",
      sub: "The SmartOne payment terminal takes every kind of payment on one screen – with the receipt printer built in. Not just a card machine.",
      get: "Get a terminal →",
      seePricing: "See pricing",
      chip: "Retail & HoReCa",
      lineEyebrow: "The lineup",
      lineTitle: "Two counter models. One for the move.",
      lineSub: "Merchant facts, not a spec sheet: it prints, it lasts, it connects – wherever your counter is.",
      lineup: [
        { name: "SmartOne Bank Pro", for: "For the busy counter", text: "The big 6″ screen keeps a queue moving – ring up, tap, receipt out.", dual: false },
        { name: "SmartOne Pro S", for: "Dual-screen checkout", text: "A screen for you and one facing the customer – a smooth, transparent checkout where local law needs it.", dual: true },
      ],
      facts: ["Battery lasts the shift", "SIM + Wi-Fi", "Receipt printer built in"],
      alsoAvail: ["Also available:", "SmartOne Bank", "– the compact 5″ model for selling on the move."],
      featEyebrow: "Inside the device",
      featTitle: "Everything built in.",
      featSub: "No phone, no laptop, no extra box – the terminal works standalone.",
      feats: [
        { title: "Payment app", text: "Cards, contactless and cash on one screen. The amount, the tap, the confirmation – done." },
        { title: "Receipt printer", text: "The printer is in the device – hand over a receipt without a second box on the counter." },
        { title: "Always connected", text: "SIM and Wi-Fi, with a battery that lasts the shift. It works where your counter is." },
      ],
      chooserEyebrow: "Which device do I need?",
      chooserTitle: "Answer two questions.",
      ctaTitle: "Ready to take your first tap?",
      ctaText: "Live in four business days or less.",
      sales: "Contact sales",
    },
    {
      eyebrow: "Pagos y fiscal · Terminales",
      h1a: "Un tap.",
      h1b: "Tarjeta, contactless, efectivo.",
      sub: "El terminal de pago SmartOne acepta todo tipo de pago en una sola pantalla, con la impresora de tickets integrada. No solo un datáfono.",
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      chip: "Retail y HoReCa",
      lineEyebrow: "La gama",
      lineTitle: "Dos modelos de mostrador. Uno para moverte.",
      lineSub: "Datos útiles, no una ficha técnica: imprime, dura y se conecta, donde esté tu mostrador.",
      lineup: [
        { name: "SmartOne Bank Pro", for: "Para el mostrador con cola", text: "La pantalla grande de 6″ mantiene la cola en movimiento: cobra, tap, ticket fuera.", dual: false },
        { name: "SmartOne Pro S", for: "Cobro con doble pantalla", text: "Una pantalla para ti y otra hacia el cliente: un cobro fluido y transparente donde lo exija la ley local.", dual: true },
      ],
      facts: ["La batería aguanta el turno", "SIM + Wi-Fi", "Impresora de tickets integrada"],
      alsoAvail: ["También disponible:", "SmartOne Bank", "– el modelo compacto de 5″ para vender en movimiento."],
      featEyebrow: "Dentro del dispositivo",
      featTitle: "Todo integrado.",
      featSub: "Sin móvil, sin portátil, sin caja extra: el terminal funciona por sí solo.",
      feats: [
        { title: "App de pago", text: "Tarjetas, contactless y efectivo en una pantalla. El importe, el tap, la confirmación, listo." },
        { title: "Impresora de tickets", text: "La impresora está en el dispositivo: entrega el ticket sin una segunda caja en el mostrador." },
        { title: "Siempre conectado", text: "SIM y Wi-Fi, con una batería que aguanta el turno. Funciona donde esté tu mostrador." },
      ],
      chooserEyebrow: "¿Qué dispositivo necesito?",
      chooserTitle: "Responde dos preguntas.",
      ctaTitle: "¿Listo para tu primer tap?",
      ctaText: "Operativo en cuatro días hábiles o menos.",
      sales: "Contactar con ventas",
    },
  );
}

export default async function TerminalsPage() {
  const lang = await getActiveLang();
  const c = copyFor(lang);

  return (
    <>
      {/* 1 · hero */}
      <section className="overflow-x-clip pt-16 pb-18 lg:pt-22">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
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
            <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.14),transparent_70%)]" />
            <div className="relative grid h-80 place-items-center overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-tint via-bg-2 to-bg-2 shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)]">
              <div className="chip-float grid h-64 w-full place-items-center py-4">
                <Terminal compact={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · lineup */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.lineEyebrow} title={c.lineTitle} sub={c.lineSub} />
          <div className="mt-11 grid gap-4 md:grid-cols-2">
            {c.lineup.map((d, i) => (
              <Reveal key={d.name} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="grid h-64 place-items-center rounded-2xl bg-gradient-to-br from-brand-tint via-bg-2 to-bg-2 py-6">
                    <Terminal compact={false} dual={d.dual} />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <h3 className="font-display text-[22px] font-semibold tracking-tight">{d.name}</h3>
                    <span className="text-[12.5px] font-semibold text-brand">{d.for}</span>
                  </div>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-white px-7 py-5 shadow-sm shadow-black/3 sm:flex-row sm:items-center sm:justify-around">
              {c.facts.map((label, i) => (
                <span key={label} className="flex items-center gap-2.5 text-[14.5px] font-medium text-ink-2">
                  <svg viewBox="0 0 24 24" className="size-5.5 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {factIcons[i]}
                  </svg>
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-center text-[13px] text-ink-3">
              {c.alsoAvail[0]} <b className="font-semibold text-ink-2">{c.alsoAvail[1]}</b> {c.alsoAvail[2]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 · inside the device */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.featEyebrow} title={c.featTitle} sub={c.featSub} />
          <div className="mt-11 grid gap-4 md:grid-cols-3">
            {c.feats.map((f, i) => (
              <Reveal key={f.title} delay={i * 100} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-white p-7">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                    <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {featIcons[i]}
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · which device chooser */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.chooserEyebrow} title={c.chooserTitle} center />
          <Reveal delay={100}>
            <div className="mt-10">
              <DeviceChooser />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 · CTA */}
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
