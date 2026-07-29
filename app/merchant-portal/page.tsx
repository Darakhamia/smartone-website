import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Landmark,
  TrendingUp,
  CreditCard,
  ShoppingBasket,
  Percent,
  Wallet,
  Filter,
  RotateCcw,
  Download,
  AlertCircle,
  Fingerprint,
  Route,
  CalendarRange,
  Clock,
  BarChart3,
  Database,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { PortalShot } from "@/components/product/portal-shot";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { MERCHANT_PORTAL_URL } from "@/lib/links";
import { promotesRegister, type Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Merchant Portal",
  description:
    "Track sales, card payments, fees and settlements across every store and terminal – from one secure portal. Included with every SmartOne terminal.",
};

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      // 1 · hero
      eyebrow: "SmartOne Merchant Portal",
      h1a: "Your entire business,",
      h1b: "in one clear view.",
      sub: "Track sales, card payments, cash-register shifts, fees and settlements across every store and terminal — from one secure portal.",
      login: "Log in to Merchant Portal →",
      get: "Get SmartOne",
      included: "Included with every SmartOne terminal.",
      shotDashboard: "The Merchant Portal dashboard: revenue, average check, card versus cash and top sellers",

      // 2 · overview
      ovEyebrow: "One portal. The whole operation.",
      ovTitle: "From the first sale to the money in your bank.",
      ovSub: "SmartOne Merchant Portal brings daily sales, transaction data, fiscal reporting and payouts together, so you always know what happened and what happens next.",
      overview: [
        { title: "See the day at a glance", text: "Revenue, average check, payment mix and top-selling products in one dashboard." },
        { title: "Trace every payment", text: "Find sales and refunds, check their status and open complete transaction details." },
        { title: "Manage fiscal operations", text: "Review shifts, receipts and Z-reports across every store and terminal." },
        { title: "Understand every payout", text: "See gross volume, fees and the net amount being settled to your bank." },
      ],

      // 3 · dashboard
      dashEyebrow: "Business overview",
      dashTitle: "Know how your business is performing — without building a report.",
      dashSub: "See revenue, average check, card versus cash, sales throughout the day and your top-selling products. Choose any date range and get a clear overview of the entire business.",
      dash: [
        { title: "Sales performance", text: "Follow revenue and transaction trends throughout the day." },
        { title: "Payment breakdown", text: "See exactly how much was paid by card and by cash." },
        { title: "Products and categories", text: "Understand what generates the most revenue." },
      ],

      // 4 · analytics
      anEyebrow: "Payment analytics",
      anTitle: "See what you sold, what you paid and what reaches your bank.",
      anSub: "Gross card volume, processing fees, net amount and settlement dates are shown side by side. No spreadsheets, no manual calculations and no surprises.",
      an: [
        { title: "Gross payment volume", text: "See the complete value of processed card payments." },
        { title: "Processing fees", text: "Understand exactly how much was deducted in fees." },
        { title: "Net amount to merchant", text: "See the amount expected to reach your bank account." },
      ],
      shotAnalytics: "Payment analytics in the Merchant Portal: gross volume, fees and net amount",

      // 5 · transaction log
      logEyebrow: "Transaction log",
      logTitle: "Every transaction, easy to find and easy to explain.",
      logSub: "Search by amount or RRN, filter by status or terminal, and review sales and refunds across any date range.",
      logNote: "Approved, pending, refunded or failed — the complete transaction history is always available and ready to export.",
      log: [
        { title: "Search by amount or RRN", text: "Find a specific payment without manually checking long lists." },
        { title: "Filter by status and terminal", text: "Review only the transactions relevant to a particular location, device or result." },
        { title: "Review sales and refunds", text: "See the complete payment lifecycle in one place." },
        { title: "Export transaction data", text: "Download transaction information whenever finance or operations needs it." },
      ],
      shotLog: "The transaction log in the Merchant Portal, with search, status and terminal filters",

      // 6 · details
      detEyebrow: "Complete payment details",
      detTitle: "When something goes wrong, you can see why.",
      detSub: "Open any payment to see its status, timestamps, card details, response code, routing information and the exact reason it failed.",
      detNote: "Give your support team the information they need without searching through different systems.",
      det: [
        { title: "Response codes and failure reasons", text: "See why a payment was declined or failed." },
        { title: "Terminal and transaction identifiers", text: "Find the exact device and transaction reference connected to the payment." },
        { title: "Provider and acquiring information", text: "Review how the transaction was processed and routed." },
        { title: "Card and payment type", text: "See the payment method and available card information." },
      ],
      shotDetails: "Transaction details in the Merchant Portal, showing the response code and failure reason",

      // 7 · cash register (Malta only)
      regEyebrow: "Fiscal operations",
      regTitle: "Every shift, receipt and Z-report in one place.",
      regSub: "Review fiscal shifts by store and device, check turnover and operation counts, and find the exact record you need without contacting the location.",
      reg: [
        { title: "Filter by store, terminal and date", text: "Quickly narrow down the information you need." },
        { title: "Review opening and closing times", text: "See when every fiscal shift started and ended." },
        { title: "See turnover and operation counts", text: "Understand the activity recorded during each shift." },
        { title: "Export fiscal data", text: "Prepare fiscal information for finance, accounting or internal review." },
      ],
      shotShifts: "Fiscal shifts by store and terminal in the Merchant Portal",

      // 8 · z-reports (Malta only)
      zEyebrow: "Z-reports",
      zTitle: "Close the day without chasing paperwork.",
      zSub: "Open a complete Z-report directly from the Portal, including sales, refunds, cash collection, deposits, payment methods, net sales and VAT.",
      zNote: "The report stays linked to its store, device and fiscal shift, so it is always easy to find later.",
      shotZ: "A Z-report opened in the Merchant Portal",

      // 9 · daily operations
      dayEyebrow: "Built for daily operations",
      dayTitle: "Less time searching. More time running the business.",
      day: [
        { title: "One source of truth", text: "Sales, card payments, cash operations and settlements use the same business data." },
        { title: "Find anything quickly", text: "Search and filter information by date, amount, store, terminal, status or transaction reference." },
        { title: "Ready for reporting", text: "Export payment and fiscal data whenever it is needed by finance or operations." },
        { title: "Built for every location", text: "Review activity across different stores and terminals from the same account." },
      ],

      // 10 · CTA
      ctaA: "Your terminal handles the sale.",
      ctaB: "The Portal handles everything around it.",
      ctaText: "Manage payments, fiscal operations and settlements from one clear workspace connected to your SmartOne terminals.",
      ctaGet: "Get started →",
      ctaLogin: "Log in to Merchant Portal",
    },
    {
      eyebrow: "SmartOne Merchant Portal",
      h1a: "Todo tu negocio,",
      h1b: "en una vista clara.",
      sub: "Controla ventas, pagos con tarjeta, turnos de caja, comisiones y liquidaciones de cada tienda y terminal, desde un único portal seguro.",
      login: "Entrar al Merchant Portal →",
      get: "Consigue SmartOne",
      included: "Incluido con cada terminal SmartOne.",
      shotDashboard: "El panel del Merchant Portal: ingresos, ticket medio, tarjeta frente a efectivo y más vendidos",

      ovEyebrow: "Un portal. Toda la operación.",
      ovTitle: "De la primera venta al dinero en tu banco.",
      ovSub: "El Merchant Portal de SmartOne reúne ventas diarias, datos de operaciones, informes fiscales y liquidaciones, para que siempre sepas qué pasó y qué viene después.",
      overview: [
        { title: "El día de un vistazo", text: "Ingresos, ticket medio, mezcla de pagos y productos más vendidos en un panel." },
        { title: "Rastrea cada pago", text: "Encuentra ventas y devoluciones, revisa su estado y abre el detalle completo." },
        { title: "Gestiona lo fiscal", text: "Revisa turnos, tickets e informes Z de cada tienda y terminal." },
        { title: "Entiende cada liquidación", text: "Mira el volumen bruto, las comisiones y el neto que se abona a tu banco." },
      ],

      dashEyebrow: "Visión del negocio",
      dashTitle: "Sabe cómo va tu negocio, sin montar un informe.",
      dashSub: "Mira ingresos, ticket medio, tarjeta frente a efectivo, las ventas a lo largo del día y tus productos más vendidos. Elige cualquier rango de fechas y obtén una visión clara de todo el negocio.",
      dash: [
        { title: "Rendimiento de ventas", text: "Sigue la evolución de ingresos y operaciones durante el día." },
        { title: "Desglose de pagos", text: "Mira exactamente cuánto se pagó con tarjeta y cuánto en efectivo." },
        { title: "Productos y categorías", text: "Entiende qué genera más ingresos." },
      ],

      anEyebrow: "Analítica de pagos",
      anTitle: "Mira lo que vendiste, lo que pagaste y lo que llega a tu banco.",
      anSub: "Volumen bruto con tarjeta, comisiones de procesamiento, importe neto y fechas de liquidación, uno al lado del otro. Sin hojas de cálculo, sin cálculos manuales y sin sorpresas.",
      an: [
        { title: "Volumen bruto de pagos", text: "Mira el valor completo de los pagos con tarjeta procesados." },
        { title: "Comisiones de procesamiento", text: "Entiende exactamente cuánto se descontó en comisiones." },
        { title: "Neto para el comercio", text: "Mira el importe que se espera que llegue a tu cuenta bancaria." },
      ],
      shotAnalytics: "Analítica de pagos en el Merchant Portal: volumen bruto, comisiones e importe neto",

      logEyebrow: "Registro de operaciones",
      logTitle: "Cada operación, fácil de encontrar y de explicar.",
      logSub: "Busca por importe o RRN, filtra por estado o terminal y revisa ventas y devoluciones en cualquier rango de fechas.",
      logNote: "Aprobada, pendiente, devuelta o fallida: el historial completo siempre está disponible y listo para exportar.",
      log: [
        { title: "Busca por importe o RRN", text: "Encuentra un pago concreto sin revisar listas larguísimas a mano." },
        { title: "Filtra por estado y terminal", text: "Revisa solo las operaciones de una ubicación, dispositivo o resultado concreto." },
        { title: "Revisa ventas y devoluciones", text: "Ve el ciclo completo del pago en un solo sitio." },
        { title: "Exporta los datos", text: "Descarga la información de operaciones cuando finanzas u operaciones la necesiten." },
      ],
      shotLog: "El registro de operaciones del Merchant Portal, con búsqueda y filtros por estado y terminal",

      detEyebrow: "Detalle completo del pago",
      detTitle: "Cuando algo sale mal, puedes ver por qué.",
      detSub: "Abre cualquier pago para ver su estado, marcas de tiempo, datos de la tarjeta, código de respuesta, información de enrutado y el motivo exacto del fallo.",
      detNote: "Dale a tu equipo de soporte la información que necesita sin rebuscar en varios sistemas.",
      det: [
        { title: "Códigos de respuesta y motivos de fallo", text: "Mira por qué se rechazó o falló un pago." },
        { title: "Identificadores de terminal y operación", text: "Encuentra el dispositivo y la referencia exactos del pago." },
        { title: "Proveedor y adquirencia", text: "Revisa cómo se procesó y enrutó la operación." },
        { title: "Tarjeta y tipo de pago", text: "Mira el método de pago y los datos de tarjeta disponibles." },
      ],
      shotDetails: "Detalle de una operación en el Merchant Portal, con el código de respuesta y el motivo del fallo",

      regEyebrow: "Operaciones fiscales",
      regTitle: "Cada turno, ticket e informe Z en un solo sitio.",
      regSub: "Revisa los turnos fiscales por tienda y dispositivo, comprueba la facturación y el número de operaciones, y encuentra el registro exacto sin llamar a la tienda.",
      reg: [
        { title: "Filtra por tienda, terminal y fecha", text: "Acota rápidamente la información que necesitas." },
        { title: "Revisa aperturas y cierres", text: "Mira cuándo empezó y terminó cada turno fiscal." },
        { title: "Facturación y operaciones", text: "Entiende la actividad registrada en cada turno." },
        { title: "Exporta los datos fiscales", text: "Prepara la información fiscal para finanzas, contabilidad o revisión interna." },
      ],
      shotShifts: "Turnos fiscales por tienda y terminal en el Merchant Portal",

      zEyebrow: "Informes Z",
      zTitle: "Cierra el día sin perseguir papeles.",
      zSub: "Abre un informe Z completo directamente desde el Portal, con ventas, devoluciones, recogida de efectivo, depósitos, métodos de pago, ventas netas e IVA.",
      zNote: "El informe queda vinculado a su tienda, dispositivo y turno fiscal, así que siempre es fácil encontrarlo después.",
      shotZ: "Un informe Z abierto en el Merchant Portal",

      dayEyebrow: "Hecho para el día a día",
      dayTitle: "Menos tiempo buscando. Más tiempo llevando el negocio.",
      day: [
        { title: "Una sola fuente de verdad", text: "Ventas, pagos con tarjeta, operaciones de efectivo y liquidaciones usan los mismos datos." },
        { title: "Encuentra cualquier cosa rápido", text: "Busca y filtra por fecha, importe, tienda, terminal, estado o referencia de operación." },
        { title: "Listo para informar", text: "Exporta datos de pagos y fiscales cuando finanzas u operaciones lo necesiten." },
        { title: "Pensado para varias tiendas", text: "Revisa la actividad de distintas tiendas y terminales desde la misma cuenta." },
      ],

      ctaA: "Tu terminal se encarga de la venta.",
      ctaB: "El Portal, de todo lo demás.",
      ctaText: "Gestiona pagos, operaciones fiscales y liquidaciones desde un espacio de trabajo claro, conectado a tus terminales SmartOne.",
      ctaGet: "Empezar →",
      ctaLogin: "Entrar al Merchant Portal",
    },
  );
}

/* A titled bullet with an icon, used under every screenshot section. */
function Points({ items, icons }: { items: { title: string; text: string }[]; icons: LucideIcon[] }) {
  // One column: these sit in the narrow half of a split layout, so two columns
  // would wrap the titles and leave an orphan on odd counts.
  return (
    <div className="mt-8 grid gap-5">
      {items.map((p, i) => {
        const Icon = icons[i];
        return (
          <div key={p.title} className="flex gap-3.5">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-brand-tint">
              <Icon className="size-5 text-brand" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-[15.5px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{p.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function MerchantPortalPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const register = promotesRegister(country);
  const c = copyFor(lang);

  // The fiscal sections describe the cash register, which is promoted only
  // where it is live (Malta today).
  const overview = c.overview.filter((_, i) => register || i !== 2);

  return (
    <>
      {/* 1 · hero */}
      <section className="relative overflow-x-clip pt-16 pb-20 lg:pt-24">
        <div className="pointer-events-none absolute -top-40 right-[-10%] size-150 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.09),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-brand uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              {c.eyebrow}
            </span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-5 text-[clamp(34px,4.6vw,58px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="anim-fade-up anim-d-2 mt-5 max-w-125 text-[17px] leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 mt-8 flex flex-wrap items-center gap-3.5">
              <a href={MERCHANT_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {c.login}
              </a>
              <Link href="/contact" className="btn-ghost">{c.get}</Link>
            </div>
            <p className="anim-fade-up anim-d-3 mt-4 text-[13.5px] text-ink-3">{c.included}</p>
          </div>
          <Reveal>
            <PortalShot src="/portal/dashboard.webp" alt={c.shotDashboard} priority />
          </Reveal>
        </div>
      </section>

      {/* 2 · overview */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.ovEyebrow} title={c.ovTitle} sub={c.ovSub} />
          <div className={`mt-11 grid gap-4 sm:grid-cols-2 ${register ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {overview.map((o, i) => (
              <Reveal key={o.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-white p-6">
                  <h3 className="font-display text-[16.5px] font-semibold tracking-tight">{o.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{o.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · dashboard */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionHead eyebrow={c.dashEyebrow} title={c.dashTitle} sub={c.dashSub} />
              <Reveal delay={90}>
                <Points items={c.dash} icons={[TrendingUp, CreditCard, ShoppingBasket]} />
              </Reveal>
            </div>
            <Reveal delay={60}>
              <PortalShot src="/portal/dashboard.webp" alt={c.shotDashboard} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 · payment analytics – screenshot leads */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal className="lg:order-1">
              <PortalShot src="/portal/analytics.webp" alt={c.shotAnalytics} />
            </Reveal>
            <div className="lg:order-2">
              <SectionHead eyebrow={c.anEyebrow} title={c.anTitle} sub={c.anSub} />
              <Reveal delay={90}>
                <Points items={c.an} icons={[Wallet, Percent, Landmark]} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · transaction log */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionHead eyebrow={c.logEyebrow} title={c.logTitle} sub={c.logSub} />
              <p className="mt-3 text-[15px] leading-relaxed text-ink-3">{c.logNote}</p>
              <Reveal delay={90}>
                <Points items={c.log} icons={[Search, Filter, RotateCcw, Download]} />
              </Reveal>
            </div>
            <Reveal delay={60}>
              <PortalShot src="/portal/transactions.webp" alt={c.shotLog} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 · transaction details – screenshot leads */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal className="lg:order-1">
              <PortalShot src="/portal/details.webp" alt={c.shotDetails} />
            </Reveal>
            <div className="lg:order-2">
              <SectionHead eyebrow={c.detEyebrow} title={c.detTitle} sub={c.detSub} />
              <p className="mt-3 text-[15px] leading-relaxed text-ink-3">{c.detNote}</p>
              <Reveal delay={90}>
                <Points items={c.det} icons={[AlertCircle, Fingerprint, Route, CreditCard]} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7 + 8 · fiscal operations and Z-reports – only where the register is live */}
      {register && (
        <>
          <section className="py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                <div>
                  <SectionHead eyebrow={c.regEyebrow} title={c.regTitle} sub={c.regSub} />
                  <Reveal delay={90}>
                    <Points items={c.reg} icons={[CalendarRange, Clock, BarChart3, Download]} />
                  </Reveal>
                </div>
                <Reveal delay={60}>
                  <PortalShot src="/portal/shifts.webp" alt={c.shotShifts} />
                </Reveal>
              </div>
            </div>
          </section>

          <section className="bg-brand-tint/50 py-24">
            <div className="mx-auto max-w-6xl px-6">
              <SectionHead eyebrow={c.zEyebrow} title={c.zTitle} sub={c.zSub} center />
              <Reveal>
                <p className="mx-auto mt-3 max-w-135 text-center text-[15px] leading-relaxed text-ink-3">{c.zNote}</p>
              </Reveal>
              <Reveal delay={80}>
                <div className="mx-auto mt-11 max-w-4xl">
                  <PortalShot src="/portal/zreport.webp" alt={c.shotZ} />
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* 9 · daily operations */}
      <section className={`py-24 ${register ? "" : "bg-bg-2"}`}>
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.dayEyebrow} title={c.dayTitle} />
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.day.map((d, i) => {
              const Icon = [Database, Search, Download, MapPin][i];
              return (
                <Reveal key={d.title} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-tint">
                      <Icon className="size-5.5 text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-[16.5px] font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{d.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 · final CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-6 py-16 text-center text-white sm:px-10">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-160 text-[clamp(26px,3.4vw,42px)] leading-[1.08]">
                  {c.ctaA}
                  <br className="hidden sm:block" /> {c.ctaB}
                </h2>
                <p className="mx-auto mt-4 mb-9 max-w-125 text-[16.5px] leading-relaxed text-white/80">{c.ctaText}</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">{c.ctaGet}</Link>
                  <a href={MERCHANT_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
                    {c.ctaLogin}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
