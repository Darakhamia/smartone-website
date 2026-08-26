import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ReceiptText,
  Store,
  Tags,
  CreditCard,
  TrendingUp,
  ArrowRightLeft,
  Zap,
  CalendarCheck,
  BarChart3,
  Signal,
  BatteryFull,
  Package,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { currencyWord, terminalModel, TERMINAL_MODELS, type Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "One device, your kind of business. Festivals, retail, cafés, beauty, mobile vendors and more – SmartOne fits the counter you already run.",
};

type Industry = {
  id: string;
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  scenarios: { title: string; text: string }[];
  device: string;
  scope: string;
  click?: boolean;
};

/* One icon per scenario, keyed by industry id – language-independent, so it
   lives outside the copy. */
const scenarioIcons: Record<string, LucideIcon[]> = {
  events: [Store, ReceiptText, TrendingUp],
  retail: [Tags, CreditCard, TrendingUp],
  cafes: [ArrowRightLeft, Zap, ReceiptText],
  beauty: [CalendarCheck, ReceiptText, BarChart3],
  mobile: [Signal, BatteryFull, Package],
};

/* `fiscal` is not cosmetic: the UK is the one market where the device does not
   issue fiscal receipts and there is no Z-report, so promising either there is
   simply untrue. Only the English copy varies – Spanish renders for Spain
   alone, which is a fiscal market, so its wording is always right. If a
   non-fiscal Spanish-speaking market is ever added, the Spanish strings below
   need the same treatment. */
function copyFor(lang: Lang, device: string, cur: string, fiscal: boolean) {
  const receipt = fiscal ? "fiscal receipt" : "receipt";
  return tr(
    lang,
    {
      eyebrow: "Industries",
      titleA: "One device,",
      titleB: "your kind of business.",
      lead: "It's the same job everywhere – take the payment, print the receipt, know your money. Here's what that looks like at your counter.",
      cardsHeading: "Industries we serve",
      clickCallout: "is a connected ordering solution – orders flow to the register in real time.",
      get: "Get a terminal →",
      sales: "Contact sales",
      spainTitle: "Selling in Spain?",
      spainText: "Get ahead of the Verifactu 2027 deadline with a certified device.",
      spainCta: "Spain & Verifactu →",
      ctaTitle: "Don't see your trade? It still fits.",
      ctaText: "If you take payments across a counter, SmartOne works for you.",
      cards: [
        { img: "/industries/events.jpg", title: "Festivals & events", hook: "Every bar takes cards", href: "#events" },
        { img: "/industries/retail.jpg", title: "Retail", hook: "Ring up, tap, receipt out", href: "#retail" },
        { img: "/industries/cafes.jpg", title: "Cafés & HoReCa", hook: "Orders reach the register", href: "#cafes" },
        { img: "/industries/beauty-salon.jpg", title: "Beauty & wellness", hook: "Book, serve, get paid", href: "#beauty" },
        { img: "/industries/mobile-courier.jpg", title: "Mobile / Street", hook: "No Wi-Fi? No problem", href: "#mobile" },
        { img: "/industries/services-electrician.jpg", title: "Professional services", hook: "Parts and labour, one bill", href: "/contact" },
        { img: "/industries/bakery.jpg", title: "Bakeries", hook: "Fast morning queue", href: "/contact" },
        { img: "/industries/grocery.jpg", title: "Grocery", hook: "Card, contactless and cash", href: "/contact" },
      ],
      industries: [
        {
          id: "events", img: "/industries/events.jpg", alt: "Festival crowd and confetti in front of a lit stage", eyebrow: "", title: "Festivals & events",
          scenarios: [
            { title: "Every stand, one account", text: "Set the menu once in the portal – every bar rings up the same prices." },
            { title: fiscal ? "A fiscal receipt at every bar" : "A receipt at every bar", text: `The printer is built in, so the ${receipt} prints at the bar.` },
            { title: "See the takings live", text: "Revenue by day and by bar in the portal, while the gates are still open." },
          ],
          device: `${device} at every bar`,
          scope: "Ticketing and access control stay with your event platform.",
        },
        {
          id: "retail", img: "/industries/retail.jpg", alt: "Interior of a modern clothing boutique", eyebrow: "", title: "Retail",
          scenarios: [
            { title: "Products priced once", text: "Set prices in the portal, ring up on the register." },
            { title: "Any way they pay", text: "Card, contactless or cash, all on the same screen." },
            { title: "See your best sellers", text: "Revenue, average basket and top categories in the portal." },
          ],
          device: `${device} on the counter`,
          scope: "Stock counts and suppliers stay where you keep them today.",
        },
        {
          id: "cafes", img: "/industries/cafes.jpg", alt: "Barista and a fresh coffee on the café counter", eyebrow: "+ Click", title: "Cafés & HoReCa",
          scenarios: [
            { title: "Orders reach the register", text: "Click sends the order straight to the register." },
            { title: "Fast at the peak", text: "The big screen keeps the morning rush moving." },
            { title: fiscal ? "One fiscal receipt" : "One receipt", text: fiscal ? "Every order closes with a compliant receipt." : "Every order closes with a printed receipt." },
          ],
          device: `${device} + Click`,
          scope: "Table plans beyond Click are on your side.",
          click: true,
        },
        {
          id: "beauty", img: "/industries/beauty-salon.jpg", alt: "Styling chairs and mirrors in a salon", eyebrow: "", title: "Beauty & wellness",
          scenarios: [
            { title: "Service, then payment", text: "Finish the appointment, take payment on the same device." },
            { title: "Receipt every time", text: `A ${receipt} prints for every client.` },
            { title: "Know your week", text: `What you took and what you'll receive, in ${cur}.` },
          ],
          device: `${device} at the chair`,
          scope: "Appointment booking stays in your current scheduler.",
        },
        {
          id: "mobile", img: "/industries/mobile-courier.jpg", alt: "Delivery courier riding through a city street", eyebrow: "", title: "Mobile / Street",
          scenarios: [
            { title: "No Wi-Fi dependency", text: "Built-in SIM keeps you taking cards anywhere." },
            { title: "Lasts the day", text: "One charge covers the shift." },
            { title: "Standalone box", text: "No phone, no laptop, no extra terminal." },
          ],
          device: `${device}, on the move`,
          scope: "Delivery apps stay separate.",
        },
      ] as Industry[],
    },
    {
      eyebrow: "Sectores",
      titleA: "Un dispositivo,",
      titleB: "para tu tipo de negocio.",
      lead: "Es el mismo trabajo en todas partes: cobrar, imprimir el ticket, controlar tu dinero. Así se ve en tu mostrador.",
      cardsHeading: "Sectores a los que servimos",
      clickCallout: "es una solución de pedidos conectada: los pedidos llegan a la caja en tiempo real.",
      get: "Solicita tu terminal →",
      sales: "Contactar con ventas",
      spainTitle: "¿Vendes en España?",
      spainText: "Adelántate al plazo de Verifactu 2027 con un dispositivo certificado.",
      spainCta: "España y Verifactu →",
      ctaTitle: "¿No ves tu sector? También encaja.",
      ctaText: "Si cobras en un mostrador, SmartOne funciona para ti.",
      cards: [
        { img: "/industries/events.jpg", title: "Festivales y eventos", hook: "Todas las barras cobran con tarjeta", href: "#events" },
        { img: "/industries/retail.jpg", title: "Retail", hook: "Cobra, tap, ticket fuera", href: "#retail" },
        { img: "/industries/cafes.jpg", title: "Cafeterías y HoReCa", hook: "Los pedidos llegan a la caja", href: "#cafes" },
        { img: "/industries/beauty-salon.jpg", title: "Belleza y bienestar", hook: "Reserva, atiende, cobra", href: "#beauty" },
        { img: "/industries/mobile-courier.jpg", title: "Móvil / Calle", hook: "¿Sin Wi-Fi? Sin problema", href: "#mobile" },
        { img: "/industries/services-electrician.jpg", title: "Servicios profesionales", hook: "Piezas y mano de obra, una factura", href: "/contact" },
        { img: "/industries/bakery.jpg", title: "Panaderías", hook: "Cola de la mañana, rápida", href: "/contact" },
        { img: "/industries/grocery.jpg", title: "Alimentación", hook: "Tarjeta, contactless y efectivo", href: "/contact" },
      ],
      industries: [
        {
          id: "events", img: "/industries/events.jpg", alt: "Público de un festival con confeti frente a un escenario iluminado", eyebrow: "", title: "Festivales y eventos",
          scenarios: [
            { title: "Cada barra, una sola cuenta", text: "Configura la carta una vez en el portal y todas las barras cobran los mismos precios." },
            { title: "Un ticket fiscal en cada barra", text: "La impresora va integrada: el ticket sale en la propia barra." },
            { title: "Mira la recaudación en directo", text: "Ingresos por día y por barra en el portal, con el recinto abierto." },
          ],
          device: `${device} en cada barra`,
          scope: "Pagos y tickets fiscales en cada barra del recinto. La venta de entradas y el control de accesos se quedan en tu plataforma de eventos.",
        },
        {
          id: "retail", img: "/industries/retail.jpg", alt: "Interior de una tienda de ropa moderna", eyebrow: "", title: "Retail",
          scenarios: [
            { title: "Precios una sola vez", text: "Configura precios en el portal y cobra en la caja." },
            { title: "Como quieran pagar", text: "Tarjeta, contactless o efectivo, todo en la misma pantalla." },
            { title: "Mira tus más vendidos", text: "Ingresos, cesta media y categorías top en el portal." },
          ],
          device: `${device} en el mostrador`,
          scope: "Pagos, tickets fiscales y un catálogo de productos. El inventario y los proveedores se quedan donde los tienes hoy.",
        },
        {
          id: "cafes", img: "/industries/cafes.jpg", alt: "Barista y un café recién hecho en el mostrador de la cafetería", eyebrow: "+ Click", title: "Cafeterías y HoReCa",
          scenarios: [
            { title: "Los pedidos llegan a la caja", text: "SmartOne Click toma el pedido y lo envía directo a la caja, un solo catálogo, sin volver a teclear." },
            { title: "Rápido en la hora punta", text: "La pantalla grande mantiene el ritmo en la hora punta de la mañana." },
            { title: "Un ticket fiscal", text: "Cada pedido cierra con un ticket conforme desde la impresora integrada." },
          ],
          device: `${device} + Click`,
          scope: "Pagos, tickets fiscales y la solución de pedidos Click. La gestión de mesas más allá de Click corre de tu parte.",
          click: true,
        },
        {
          id: "beauty", img: "/industries/beauty-salon.jpg", alt: "Sillones y espejos en un salón de belleza", eyebrow: "", title: "Belleza y bienestar",
          scenarios: [
            { title: "Servicio y luego pago", text: "Termina la cita y cobra en el mismo dispositivo, tarjeta o contactless." },
            { title: "Ticket siempre", text: "Un ticket fiscal conforme se imprime para cada cliente, automáticamente." },
            { title: "Controla tu semana", text: `Lo que cobraste y lo que vas a recibir, en ${cur}.` },
          ],
          device: `${device} en el sillón`,
          scope: "Pagos y tickets fiscales. Las reservas de cita se quedan en tu agenda actual.",
        },
        {
          id: "mobile", img: "/industries/mobile-courier.jpg", alt: "Repartidor circulando por una calle de la ciudad", eyebrow: "", title: "Móvil / Calle",
          scenarios: [
            { title: "Sin depender del Wi-Fi", text: "La SIM integrada te permite cobrar en cualquier sitio." },
            { title: "Aguanta el día", text: "Una carga cubre el turno." },
            { title: "Equipo autónomo", text: "Sin móvil, sin portátil, sin terminal extra: todo en un solo dispositivo." },
          ],
          device: `${device}, en movimiento`,
          scope: "Pagos y tickets fiscales en cualquier sitio con cobertura móvil. Las apps de delivery van aparte.",
        },
      ] as Industry[],
    },
  );
}

function IndustrySection({ ind, i, get, sales, clickCallout }: { ind: Industry; i: number; get: string; sales: string; clickCallout: string }) {
  const flip = i % 2 === 1;
  return (
    <section id={ind.id} className={`scroll-mt-24 py-20 ${i % 2 === 1 ? "bg-bg-2" : ""}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className={flip ? "lg:order-2" : ""}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle,rgba(90,25,181,0.1),transparent_70%)]" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-48px_rgba(90,25,181,0.5)]">
                <Image src={ind.img} alt={ind.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className={flip ? "lg:order-1" : ""}>
            <div>
              {ind.eyebrow && <span className="eyebrow">{ind.eyebrow}</span>}
              <h2 className={`h-display text-[clamp(28px,3.4vw,40px)] leading-[1.06] ${ind.eyebrow ? "mt-3" : ""}`}>{ind.title}</h2>
              <div className="mt-6 space-y-4">
                {ind.scenarios.map((s, si) => {
                  const Icon = scenarioIcons[ind.id][si];
                  return (
                  <div key={s.title} className="flex gap-3.5">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-brand-tint">
                      <Icon className="size-5 text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-[16px] font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">{s.text}</p>
                    </div>
                  </div>
                  );
                })}
              </div>

              {ind.click && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-brand-tint p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand font-display text-[13px] font-bold text-white">C</span>
                  <p className="text-[13.5px] leading-relaxed text-ink-2">
                    <b className="font-semibold text-brand">SmartOne Click</b> {clickCallout}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-ink-3">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand" />
                  <b className="font-semibold text-ink-2">{ind.device}</b>
                </span>
              </div>
              <p className="mt-3 max-w-115 text-[13px] leading-relaxed text-ink-3">{ind.scope}</p>

              <div className="mt-6 flex flex-wrap gap-3.5">
                <Link href="/contact" className="btn-primary">{get}</Link>
                <Link href="/contact" className="btn-ghost">{sales}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default async function IndustriesPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  // One device per country: never name a model the visitor's market can't buy.
  const c = copyFor(lang, TERMINAL_MODELS[terminalModel(country)].name, currencyWord(country, lang), country.fiscal);
  return (
    <>
      {/* 1 · hero */}
      <section className="pt-16 pb-14 lg:pt-22">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-170 text-center">
            <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.titleA}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.titleB}</span>
            </h1>
            <p className="lead anim-fade-up anim-d-2 mx-auto mt-5 max-w-130 text-lg leading-relaxed text-ink-2">{c.lead}</p>
          </div>
        </div>
      </section>

      {/* 2 · industry cards grid */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* the cards below are h3; without this the outline jumps h1 → h3 */}
          <h2 className="sr-only">{c.cardsHeading}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 60} className="h-full">
                <Link href={card.href} className="group flex h-full flex-col rounded-3xl bg-bg-2 p-3 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-tint">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                    <Image src={card.img} alt={card.title} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-3.5 px-1.5 font-display text-[16px] font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-0.5 mb-1.5 px-1.5 text-[13px] text-ink-3">{card.hook}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · per-industry sections */}
      {c.industries.map((ind, i) => (
        <IndustrySection key={ind.id} ind={ind} i={i} get={c.get} sales={c.sales} clickCallout={c.clickCallout} />
      ))}

      {/* 5 · Spain / Verifactu routing – only shown in Spain */}
      {country.code === "es" && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <Link href="/es" className="group flex flex-col items-start gap-5 rounded-3xl border border-line bg-white p-8 transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  <span className="text-4xl">🇪🇸</span>
                  <div>
                    <h3 className="font-display text-[20px] font-semibold tracking-tight">{c.spainTitle}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{c.spainText}</p>
                  </div>
                </div>
                <span className="btn-ghost shrink-0 group-hover:text-brand">{c.spainCta}</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* final CTA */}
      <section className="pb-24">
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
