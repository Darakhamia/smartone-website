import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Click",
  description:
    "SmartOne Click takes orders for cafés and restaurants and sends them straight to the register – one catalogue, one flow, no re-typing.",
};

const stepIcons = [
  <path key="0" d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />,
  <path key="1" d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2M9 12h6" />,
  <path key="2" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6" />,
];

const featIcons = [
  <path key="0" d="M4 6h16v13H4zM4 10h16M8 15h4" />,
  <path key="1" d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19" />,
  <path key="2" d="M3 7l9 5 9-5-9-5-9 5Zm0 0v10l9 5 9-5V7M12 12v10" />,
];

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      eyebrow: "Click · HoReCa",
      h1a: "Orders straight",
      h1b: "to the register.",
      sub: "SmartOne Click takes orders for cafés and restaurants and sends them to the same register that takes the payment – one catalogue, one flow, no re-typing.",
      get: "Get started →",
      industries: "See HoReCa setups",
      flowEyebrow: "How it works",
      flowTitle: "From table to till, in one flow.",
      flowSub: "The order and the payment share one catalogue, so nothing gets keyed in twice.",
      steps: [
        { title: "Take the order", text: "Staff or guests choose from your catalogue in Click – table by table." },
        { title: "It lands on the register", text: "The order appears on the till instantly – same prices, same items, no re-typing." },
        { title: "Pay & print", text: "Take the payment and print the fiscal receipt from the one device." },
      ],
      demoOrder: "Order #47 · table 3",
      demoReg: "→ register",
      demoItems: "2× latte · 1× croissant",
      demoTotal: "€9.60",
      featEyebrow: "Built for hospitality",
      featTitle: "One catalogue does the work.",
      feats: [
        { title: "One menu, everywhere", text: "Change a price once – Click, the register and the receipt all follow." },
        { title: "Fast at the rush", text: "Orders flow to the till the moment they're placed – no paper tickets to chase." },
        { title: "Fully accounted", text: "Every Click order is a fiscal sale on the register – reconciled with the rest of your day." },
      ],
      ctaTitle: "Serve faster. Reconcile automatically.",
      ctaText: "Live in four business days or less.",
      sales: "Contact sales",
    },
    {
      eyebrow: "Click · HoReCa",
      h1a: "Los pedidos, directos",
      h1b: "a la caja.",
      sub: "SmartOne Click toma los pedidos de cafeterías y restaurantes y los envía a la misma caja que cobra: un catálogo, un flujo, sin volver a teclear.",
      get: "Empezar →",
      industries: "Ver montajes HoReCa",
      flowEyebrow: "Cómo funciona",
      flowTitle: "De la mesa a la caja, en un solo flujo.",
      flowSub: "El pedido y el pago comparten un catálogo, así que nada se teclea dos veces.",
      steps: [
        { title: "Toma el pedido", text: "El personal o los clientes eligen de tu catálogo en Click, mesa a mesa." },
        { title: "Llega a la caja", text: "El pedido aparece en la caja al instante: mismos precios, mismos productos, sin reteclear." },
        { title: "Cobra e imprime", text: "Cobra e imprime el ticket fiscal desde el mismo dispositivo." },
      ],
      demoOrder: "Pedido #47 · mesa 3",
      demoReg: "→ caja",
      demoItems: "2× latte · 1× croissant",
      demoTotal: "€9,60",
      featEyebrow: "Hecho para hostelería",
      featTitle: "Un catálogo hace el trabajo.",
      feats: [
        { title: "Un menú, en todas partes", text: "Cambia un precio una vez: Click, la caja y el ticket lo siguen." },
        { title: "Rápido en hora punta", text: "Los pedidos llegan a la caja en cuanto se hacen, sin comandas de papel que perseguir." },
        { title: "Todo contabilizado", text: "Cada pedido de Click es una venta fiscal en la caja, cuadrada con el resto del día." },
      ],
      ctaTitle: "Sirve más rápido. Cuadra automáticamente.",
      ctaText: "Operativo en cuatro días hábiles o menos.",
      sales: "Contactar con ventas",
    },
  );
}

export default async function ClickPage() {
  const lang = await getActiveLang();
  const c = copyFor(lang);

  return (
    <>
      {/* 1 · hero (dark, matches the Click brand block) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-night-2 to-night py-24 text-white lg:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.55),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 size-80 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.35),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="anim-fade-up eyebrow eyebrow-dark">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand-l via-[#c9a6f5] to-white bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-white/70">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-light">{c.get}</Link>
              <Link href="/industries" className="btn-ghost-dark">{c.industries}</Link>
            </div>
          </div>
          {/* order → register demo */}
          <div className="anim-fade-up anim-d-2">
            <div className="rounded-3xl bg-white/8 p-6 ring-1 ring-white/12 backdrop-blur-sm">
              <div className="rounded-2xl bg-white/8 p-4 font-mono text-[12.5px] ring-1 ring-white/10">
                <div className="flex justify-between">
                  <span className="text-white/70">{c.demoOrder}</span>
                  <span className="font-semibold text-brand-l">{c.demoReg}</span>
                </div>
                <div className="mt-1 text-[11px] text-white/50">{c.demoItems}</div>
              </div>
              <div className="my-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="size-6 stroke-brand-l" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </div>
              <div className="rounded-2xl bg-white p-4 text-ink">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-wide text-ink-3 uppercase">Register</span>
                  <span className="rounded-full bg-[#e5f3ec] px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-[#0e8a5f]">
                    {tr(lang, "Received", "Recibido")}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[13px] text-ink-2">{c.demoItems}</span>
                  <span className="font-mono text-[13px] font-semibold text-ink">{c.demoTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · how it works */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.flowEyebrow} title={c.flowTitle} sub={c.flowSub} />
          <div className="mt-11 grid gap-4 md:grid-cols-3">
            {c.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="h-full">
                <div className="relative h-full rounded-3xl border border-line bg-white p-7">
                  <span className="absolute right-6 top-6 font-mono text-[13px] font-semibold text-ink-3">0{i + 1}</span>
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                    <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {stepIcons[i]}
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · features */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.featEyebrow} title={c.featTitle} />
          <div className="mt-11 grid gap-4 md:grid-cols-3">
            {c.feats.map((f, i) => (
              <Reveal key={f.title} delay={i * 100} className="h-full">
                <div className="h-full rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                    <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {featIcons[i]}
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · CTA */}
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
