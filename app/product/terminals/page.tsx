import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { Terminal } from "@/components/product/device-visuals";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Terminals",
  description:
    "The SmartOne payment terminal: card, contactless and cash on one device, with the receipt printer built in. Bank Pro and the dual-screen Pro S.",
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

// icons for the spec highlight tiles (display, processor, battery, network, printer, security)
const highlightIcons = [
  <>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M10.5 5.5h3M11 18.5h2" />
  </>,
  <>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 2v2m3-2v2m3-2v2M9 20v2m3-2v2m3-2v2M2 9h2m-2 3h2m-2 3h2M20 9h2m-2 3h2m-2 3h2" />
  </>,
  <>
    <rect x="2" y="7" width="18" height="10" rx="2" />
    <path d="M22 10.5v3M5.5 10v4m3-4v4m3-4v4" />
  </>,
  <path key="n" d="M2 9a14 14 0 0 1 20 0M5.5 12.5a9 9 0 0 1 13 0M9 16a4.5 4.5 0 0 1 6 0M12 19h.01" />,
  <path key="pr" d="M6 9V3h12v6M6 14h12v7H6v-7ZM6 18H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M9 17h6" />,
  <path key="se" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />,
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
      lineEyebrow: "The lineup",
      lineTitle: "Two models, one platform.",
      lineSub: "Merchant facts, not a spec sheet: it prints, it lasts, it connects – wherever your counter is.",
      lineup: [
        { name: "SmartOne Bank Pro", for: "For the busy counter", text: "The big 6″ screen keeps a queue moving – ring up, tap, receipt out.", dual: false },
        { name: "SmartOne Pro S", for: "Dual-screen checkout", text: "A screen for you and one facing the customer – a smooth, transparent checkout where local law needs it.", dual: true },
      ],
      facts: ["Battery lasts the shift", "SIM + Wi-Fi", "Receipt printer built in"],
      featEyebrow: "Inside the device",
      featTitle: "Everything built in.",
      featSub: "No phone, no laptop, no extra box – the terminal works standalone.",
      feats: [
        { title: "Payment app", text: "Cards, contactless and cash on one screen. The amount, the tap, the confirmation – done." },
        { title: "Receipt printer", text: "The printer is in the device – hand over a receipt without a second box on the counter." },
        { title: "Always connected", text: "SIM and Wi-Fi, with a battery that lasts the shift. It works where your counter is." },
      ],
      ctaTitle: "Ready to take your first tap?",
      ctaText: "Live in four business days or less.",
      sales: "Contact sales",
      specEyebrow: "Full specifications",
      specTitle: "The numbers, in full.",
      specSub: "Bank Pro and Pro S run one platform. The Pro S adds a customer-facing second screen – everything else is identical.",
      highlights: [
        { value: "6″ HD", label: "Touchscreen display" },
        { value: "Octa-core", label: "Kun T11 · 2.0 GHz" },
        { value: "3000 mAh", label: "All-day battery" },
        { value: "4G · Wi-Fi", label: "Always connected" },
        { value: "Built-in printer", label: "2″ · 58 mm thermal" },
        { value: "PCI PTS 6.x", label: "Certified secure" },
      ],
      proSTitle: "SmartOne Pro S",
      proSText: "Same platform, plus a second customer-facing display for a transparent checkout.",
      specGroups: [
        {
          group: "Display",
          items: [["Screen", "6″ HD capacitive · 1440×720"], ["Touch", "Multi-touch, safety glass"]],
        },
        {
          group: "Performance",
          items: [["Processor", "Kun T11 · octa-core · 2.0 GHz"], ["Memory", "2 GB RAM · 16 GB storage"], ["Expandable", "microSD up to 64 GB"], ["Operating system", "Android 9.0"]],
        },
        {
          group: "Power & connectivity",
          items: [["Battery", "Li-Ion 3000 mAh (5000 optional)"], ["Mobile", "4G LTE · 3G · 2G"], ["Wireless", "Wi-Fi · Bluetooth · GPS"]],
        },
        {
          group: "Payments & printing",
          items: [["Card acceptance", "Magstripe · Chip & PIN · EMV L1/2 · Contactless"], ["Printer", "Built-in 2″ thermal · 58 mm"], ["Camera & scanner", "5 MP + 2 MP · 2D/3D scanner"]],
        },
        {
          group: "Compliance & build",
          items: [["Security", "PCI PTS 6.x"], ["Certifications", "RoHS · CE · FCC"], ["Dimensions", "225 × 82 mm"]],
        },
      ] as { group: string; items: [string, string][] }[],
    },
    {
      eyebrow: "Pagos y fiscal · Terminales",
      h1a: "Un tap.",
      h1b: "Tarjeta, contactless, efectivo.",
      sub: "El terminal de pago SmartOne acepta todo tipo de pago en una sola pantalla, con la impresora de tickets integrada. No solo un datáfono.",
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      lineEyebrow: "La gama",
      lineTitle: "Dos modelos, una plataforma.",
      lineSub: "Datos útiles, no una ficha técnica: imprime, dura y se conecta, donde esté tu mostrador.",
      lineup: [
        { name: "SmartOne Bank Pro", for: "Para el mostrador con cola", text: "La pantalla grande de 6″ mantiene la cola en movimiento: cobra, tap, ticket fuera.", dual: false },
        { name: "SmartOne Pro S", for: "Cobro con doble pantalla", text: "Una pantalla para ti y otra hacia el cliente: un cobro fluido y transparente donde lo exija la ley local.", dual: true },
      ],
      facts: ["La batería aguanta el turno", "SIM + Wi-Fi", "Impresora de tickets integrada"],
      featEyebrow: "Dentro del dispositivo",
      featTitle: "Todo integrado.",
      featSub: "Sin móvil, sin portátil, sin caja extra: el terminal funciona por sí solo.",
      feats: [
        { title: "App de pago", text: "Tarjetas, contactless y efectivo en una pantalla. El importe, el tap, la confirmación, listo." },
        { title: "Impresora de tickets", text: "La impresora está en el dispositivo: entrega el ticket sin una segunda caja en el mostrador." },
        { title: "Siempre conectado", text: "SIM y Wi-Fi, con una batería que aguanta el turno. Funciona donde esté tu mostrador." },
      ],
      ctaTitle: "¿Listo para tu primer tap?",
      ctaText: "Operativo en cuatro días hábiles o menos.",
      sales: "Contactar con ventas",
      specEyebrow: "Ficha técnica",
      specTitle: "Los números, al completo.",
      specSub: "Bank Pro y Pro S usan una plataforma. El Pro S añade una segunda pantalla hacia el cliente; todo lo demás es idéntico.",
      highlights: [
        { value: "6″ HD", label: "Pantalla táctil" },
        { value: "Octa-core", label: "Kun T11 · 2.0 GHz" },
        { value: "3000 mAh", label: "Batería para todo el día" },
        { value: "4G · Wi-Fi", label: "Siempre conectado" },
        { value: "Impresora integrada", label: "Térmica 2″ · 58 mm" },
        { value: "PCI PTS 6.x", label: "Seguridad certificada" },
      ],
      proSTitle: "SmartOne Pro S",
      proSText: "La misma plataforma, más una segunda pantalla hacia el cliente para un cobro transparente.",
      specGroups: [
        {
          group: "Pantalla",
          items: [["Pantalla", "6″ HD capacitiva · 1440×720"], ["Táctil", "Multitáctil, cristal de seguridad"]],
        },
        {
          group: "Rendimiento",
          items: [["Procesador", "Kun T11 · octa-core · 2.0 GHz"], ["Memoria", "2 GB RAM · 16 GB almacenamiento"], ["Ampliable", "microSD hasta 64 GB"], ["Sistema operativo", "Android 9.0"]],
        },
        {
          group: "Energía y conexión",
          items: [["Batería", "Li-Ion 3000 mAh (5000 opc.)"], ["Móvil", "4G LTE · 3G · 2G"], ["Inalámbrico", "Wi-Fi · Bluetooth · GPS"]],
        },
        {
          group: "Pagos e impresión",
          items: [["Tarjetas", "Banda · Chip y PIN · EMV N1/2 · Contactless"], ["Impresora", "Térmica 2″ integrada · 58 mm"], ["Cámara y escáner", "5 MP + 2 MP · escáner 2D/3D"]],
        },
        {
          group: "Cumplimiento y construcción",
          items: [["Seguridad", "PCI PTS 6.x"], ["Certificaciones", "RoHS · CE · FCC"], ["Dimensiones", "225 × 82 mm"]],
        },
      ] as { group: string; items: [string, string][] }[],
    },
  );
}

export default async function TerminalsPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const c = copyFor(lang);
  // Malta is offered a single terminal – the dual-screen Pro S.
  const isMalta = country.code === "mt";
  const lineup = isMalta ? c.lineup.filter((d) => d.dual) : c.lineup;
  const lineTitle = isMalta ? tr(lang, "One device. Everything built in.", "Un dispositivo. Todo integrado.") : c.lineTitle;
  const specSub = isMalta ? tr(lang, "The SmartOne Pro S platform, in full.", "La plataforma SmartOne Pro S, al completo.") : c.specSub;

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
          <SectionHead eyebrow={c.lineEyebrow} title={lineTitle} sub={c.lineSub} />

          {lineup.length > 1 ? (
            <>
              <div className="mt-11 grid gap-4 md:grid-cols-2">
                {lineup.map((d, i) => (
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
              </Reveal>
            </>
          ) : (
            /* single device (e.g. Malta) – a proper feature block, not a lone card */
            <Reveal>
              <div className="mt-11 grid items-center gap-8 rounded-3xl bg-white p-6 shadow-sm shadow-black/3 md:grid-cols-2 md:gap-12 md:p-10">
                <div className="grid h-72 place-items-center rounded-2xl bg-gradient-to-br from-brand-tint via-bg-2 to-bg-2 sm:h-80">
                  <Terminal compact={false} dual={lineup[0].dual} />
                </div>
                <div>
                  <span className="text-[12.5px] font-semibold tracking-wide text-brand uppercase">{lineup[0].for}</span>
                  <h3 className="h-display mt-2 text-[clamp(26px,3vw,34px)] leading-tight">{lineup[0].name}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{lineup[0].text}</p>
                  <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                    {c.facts.map((label, i) => (
                      <span key={label} className="flex items-center gap-3 text-[14.5px] font-medium text-ink-2">
                        <svg viewBox="0 0 24 24" className="size-5.5 shrink-0 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          {factIcons[i]}
                        </svg>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
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

      {/* 5 · full specifications */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.specEyebrow} title={c.specTitle} sub={specSub} />

          {/* spec highlights – the at-a-glance scan */}
          <div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.highlights.map((h, i) => (
              <Reveal key={h.value} delay={(i % 3) * 80} className="h-full">
                <div className="flex h-full items-center gap-4 rounded-2xl bg-bg-2 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm shadow-black/4">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {highlightIcons[i]}
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-[18px] font-semibold tracking-tight text-ink">{h.value}</div>
                    <div className="text-[12.5px] leading-tight text-ink-3">{h.label}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pro S difference – only where both models are offered */}
          {!isMalta && (
            <Reveal>
              <div className="mt-4 flex items-start gap-3.5 rounded-2xl bg-brand-tint p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="12" height="13" rx="2" />
                    <rect x="14" y="9" width="7" height="10" rx="1.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-tight text-ink">{c.proSTitle}</p>
                  <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-2">{c.proSText}</p>
                </div>
              </div>
            </Reveal>
          )}

          {/* detailed spec sheet – grouped, tech-spec style */}
          <Reveal>
            <div className="mt-12 border-t border-line">
              {c.specGroups.map((g) => (
                <div key={g.group} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[200px_1fr] sm:gap-10">
                  <h4 className="font-display text-[16px] font-semibold tracking-tight text-ink">{g.group}</h4>
                  <dl>
                    {g.items.map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line/70 py-2.5 last:border-0 last:pb-0">
                        <dt className="text-[13.5px] text-ink-2">{k}</dt>
                        <dd className="text-right font-mono text-[13px] text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 · CTA (closer) */}
      <section className="bg-bg-2 py-24">
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
