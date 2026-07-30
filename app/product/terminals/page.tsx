import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { TerminalGallery, type Shot } from "@/components/product/terminal-gallery";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { terminalModel, TERMINAL_MODELS, type Lang, type TerminalModel } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Terminals",
  description:
    "The SmartOne payment terminal: card, contactless and cash on one device, with the receipt printer built in. Not just a card machine.",
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

function copyFor(lang: Lang, model: TerminalModel) {
  const info = TERMINAL_MODELS[model];
  const { dual, dir, name } = info;
  // Angle set: the dual-screen model swaps the "other side" for the shot that
  // shows the customer-facing display.
  const shots: Shot[] = dual
    ? [
        { src: `${dir}/front.webp`, alt: `${name} terminal, front view`, label: tr(lang, "Front", "Frente") },
        { src: `${dir}/angle-r.webp`, alt: `${name} terminal, three-quarter view`, label: tr(lang, "Angle", "Ángulo") },
        { src: `${dir}/dual.webp`, alt: `${name} customer-facing second screen`, label: tr(lang, "Second screen", "Segunda pantalla") },
        { src: `${dir}/back.webp`, alt: `${name} terminal, rear view`, label: tr(lang, "Back", "Detrás") },
      ]
    : [
        { src: `${dir}/front.webp`, alt: `${name} terminal, front view showing the till screen`, label: tr(lang, "Front", "Frente") },
        { src: `${dir}/angle-r.webp`, alt: `${name} terminal, three-quarter view`, label: tr(lang, "Angle", "Ángulo") },
        { src: `${dir}/angle-l.webp`, alt: `${name} terminal, opposite three-quarter view`, label: tr(lang, "Side", "Lateral") },
        { src: `${dir}/back.webp`, alt: `${name} terminal, rear view with the built-in printer`, label: tr(lang, "Back", "Detrás") },
      ];

  return tr(
    lang,
    {
      shots,
      heroSrc: `${dir}/hero.webp`,
      deviceName: name,
      eyebrow: "Payments · The terminal",
      h1a: "One tap.",
      h1b: "Card, contactless, cash.",
      sub: dual
        ? `The ${name} takes every kind of payment – a screen for you and one facing the customer, with the receipt printer built in. Not just a card machine.`
        : `The ${name} takes every kind of payment on one screen – with the receipt printer built in. Not just a card machine.`,
      heroAlt: `The ${name} payment terminal`,
      get: "Get a terminal →",
      seePricing: "See pricing",
      lineEyebrow: "Every angle",
      lineTitle: "One device. Every side.",
      lineSub: "Spin around it: it prints, it lasts, it connects – wherever your counter is.",
      deviceFor: dual ? "The dual-screen terminal" : "The all-in-one terminal",
      deviceText: dual
        ? "Two screens – one for you, one facing the customer – for a clear, transparent checkout. Card, contactless and cash, with the receipt printer built in."
        : "The big 6″ screen keeps a queue moving – ring up, tap, receipt out. Card, contactless and cash, no second box on the counter.",
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
      specSub: `Everything inside the ${name} – the display, the processor, the battery, the printer and the security.`,
      dualNote: dual
        ? { title: "Two screens", text: "A second, customer-facing display shows the amount and confirmation – a transparent checkout, where local law needs it." }
        : null,
      highlights: [
        { value: "6″ HD", label: "Touchscreen display" },
        { value: "Octa-core", label: "Kun T11 · 2.0 GHz" },
        { value: "3000 mAh", label: "All-day battery" },
        { value: "4G · Wi-Fi", label: "Always connected" },
        { value: "Built-in printer", label: "2″ · 58 mm thermal" },
        { value: "PCI PTS 6.x", label: "Certified secure" },
      ],
      specGroups: [
        {
          group: "Display",
          items: (dual
            ? [["Screen", "6″ HD capacitive · 1440×720"], ["Second screen", "Customer-facing display"], ["Touch", "Multi-touch, safety glass"]]
            : [["Screen", "6″ HD capacitive · 1440×720"], ["Touch", "Multi-touch, safety glass"]]) as [string, string][],
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
      shots,
      heroSrc: `${dir}/hero.webp`,
      deviceName: name,
      eyebrow: "Pagos · El terminal",
      h1a: "Un tap.",
      h1b: "Tarjeta, contactless, efectivo.",
      sub: dual
        ? `El ${name} acepta todo tipo de pago: una pantalla para ti y otra hacia el cliente, con la impresora de tickets integrada. No solo un datáfono.`
        : `El ${name} acepta todo tipo de pago en una sola pantalla, con la impresora de tickets integrada. No solo un datáfono.`,
      heroAlt: `El terminal de pago ${name}`,
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      lineEyebrow: "Cada ángulo",
      lineTitle: "Un dispositivo. Todos los lados.",
      lineSub: "Gíralo: imprime, dura y se conecta, donde esté tu mostrador.",
      deviceFor: dual ? "El terminal de doble pantalla" : "El terminal todo en uno",
      deviceText: dual
        ? "Dos pantallas: una para ti y otra hacia el cliente, para un cobro claro y transparente. Tarjeta, contactless y efectivo, con la impresora de tickets integrada."
        : "La pantalla grande de 6″ mantiene la cola en movimiento: cobra, tap, ticket fuera. Tarjeta, contactless y efectivo, sin una segunda caja en el mostrador.",
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
      specSub: `Todo lo que hay dentro del ${name}: la pantalla, el procesador, la batería, la impresora y la seguridad.`,
      dualNote: dual
        ? { title: "Dos pantallas", text: "Una segunda pantalla hacia el cliente muestra el importe y la confirmación: un cobro transparente, donde lo exija la ley local." }
        : null,
      highlights: [
        { value: "6″ HD", label: "Pantalla táctil" },
        { value: "Octa-core", label: "Kun T11 · 2.0 GHz" },
        { value: "3000 mAh", label: "Batería para todo el día" },
        { value: "4G · Wi-Fi", label: "Siempre conectado" },
        { value: "Impresora integrada", label: "Térmica 2″ · 58 mm" },
        { value: "PCI PTS 6.x", label: "Seguridad certificada" },
      ],
      specGroups: [
        {
          group: "Pantalla",
          items: (dual
            ? [["Pantalla", "6″ HD capacitiva · 1440×720"], ["Segunda pantalla", "Hacia el cliente"], ["Táctil", "Multitáctil, cristal de seguridad"]]
            : [["Pantalla", "6″ HD capacitiva · 1440×720"], ["Táctil", "Multitáctil, cristal de seguridad"]]) as [string, string][],
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
  // One device per country, always: Malta = Bank Pro S, everyone else = Bank Pro.
  const c = copyFor(lang, terminalModel(country));

  return (
    <>
      {/* 1 · hero */}
      <section className="overflow-x-clip pt-16 pb-18 lg:pt-22">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-brand uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              {c.eyebrow}
            </span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-5 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="lead anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">{c.get}</Link>
              <Link href="/pricing" className="btn-ghost">{c.seePricing}</Link>
            </div>
            <div className="anim-fade-up anim-d-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-line pt-6">
              {c.facts.slice(0, 3).map((f) => (
                <span key={f} className="flex items-center gap-2 text-[13.5px] font-medium text-ink-2">
                  <Check className="size-4 text-brand" strokeWidth={2.4} aria-hidden />
                  {f}
                </span>
              ))}
            </div>
          </div>
          {/* Stage: light and airy like the rest of the site, with a soft lilac
              halo behind the device and a faint reflection so it still has depth. */}
          <div className="anim-fade-up anim-d-2 relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[56px] bg-[radial-gradient(circle,rgba(90,25,181,0.10),transparent_70%)] blur-xl" />
            {/* the hero shot is a wide, lying composition – a square stage on
                phones leaves a lot of dead space above and below it */}
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[36px] bg-[linear-gradient(155deg,#faf6ff_0%,#ffffff_45%,#f0e8fd_100%)] ring-1 ring-brand/10 shadow-[0_40px_90px_-55px_rgba(90,25,181,0.5)] sm:aspect-[5/4]">
              {/* soft halo behind the device */}
              <div className="pointer-events-none absolute top-[38%] left-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(165,120,232,0.28),transparent_66%)] blur-2xl" />
              {/* subtle floor line */}
              <div className="pointer-events-none absolute right-0 bottom-[22%] left-0 h-px bg-gradient-to-r from-transparent via-brand/12 to-transparent" />

              <div className="relative h-[92%] w-[88%]">
                <div className="chip-float absolute inset-0">
                  <Image
                    src={c.heroSrc}
                    alt={c.heroAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 620px"
                    className="object-contain drop-shadow-[0_26px_38px_rgba(45,20,90,0.28)]"
                  />
                </div>
                {/* mirrored reflection, faded out downwards */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-[86%] h-1/2 scale-y-[-1] opacity-20 blur-[1px]"
                  style={{ maskImage: "linear-gradient(to top, transparent 12%, black 92%)", WebkitMaskImage: "linear-gradient(to top, transparent 12%, black 92%)" }}
                  aria-hidden
                >
                  <Image src={c.heroSrc} alt="" fill sizes="620px" className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · every angle – the gallery */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.lineEyebrow} title={c.lineTitle} sub={c.lineSub} />
          <div className="mt-11 grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <TerminalGallery shots={c.shots} />
            </Reveal>
            <Reveal delay={100}>
              <div>
                <span className="text-[12.5px] font-semibold tracking-wide text-brand uppercase">{c.deviceFor}</span>
                <h3 className="h-display mt-2 text-[clamp(26px,3vw,34px)] leading-tight">{c.deviceName}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{c.deviceText}</p>
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
            </Reveal>
          </div>
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

      {/* 4 · full specifications */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.specEyebrow} title={c.specTitle} sub={c.specSub} />

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

          {/* dual-screen callout – Malta / Bank Pro S only */}
          {c.dualNote && (
            <Reveal>
              <div className="mt-4 flex items-start gap-3.5 rounded-2xl bg-brand-tint p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="12" height="13" rx="2" />
                    <rect x="14" y="9" width="7" height="10" rx="1.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-tight text-ink">{c.dualNote.title}</p>
                  <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-2">{c.dualNote.text}</p>
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

      {/* 5 · CTA (closer) */}
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
