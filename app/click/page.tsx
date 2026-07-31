import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutGrid,
  Monitor,
  BarChart3,
  ChefHat,
  Receipt,
  Users,
  MapPin,
  Tags,
  Coins,
  SlidersHorizontal,
  ImageIcon,
  LayoutList,
  UtensilsCrossed,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { AppShot } from "@/components/product/app-shot";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Click",
  description:
    "SmartOne Click is a restaurant management platform: back office, POS, kitchen display, staff, multi-location and analytics in one connected system.",
};

/* Every screenshot on this page is a real capture of the Click back office and
   POS, not a redrawn mock. They are 1960×1004 – the ratio is passed to AppShot
   so the browser reserves the right space and the page doesn't jump.

   The page is deliberately register-neutral. The cash register is promoted
   only where it is live (promotesRegister() in lib/countries.ts), and Click is
   sold in every market, so the copy talks about orders, kitchen and analytics
   and never claims a fiscal register the visitor's country can't buy. */
const SHOT = { width: 1960, height: 1004 };

type Feature = { title: string; text: string };

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      /* hero */
      eyebrow: "SmartOne Click",
      h1a: "Run your restaurant",
      h1b: "from a single platform.",
      sub: "Manage menus, staff, tables, orders, kitchens and business analytics from one connected ecosystem built for modern restaurants.",
      get: "Get started →",
      demo: "Book a demo",

      /* 1 · everything */
      allEyebrow: "One platform",
      allTitle: "Everything your restaurant needs.",
      allSub:
        "SmartOne Click combines business management, POS operations, kitchen workflow and analytics into one connected platform.",
      pillars: [
        { title: "Business management", text: "Menus, pricing, staff and locations in one back office." },
        { title: "POS", text: "Floor plan, tables and orders on the counter." },
        { title: "Kitchen display", text: "Orders reach the pass the moment they are taken." },
        { title: "Analytics", text: "Revenue, checks and staff performance in one view." },
      ] as Feature[],

      /* 2 · analytics */
      anEyebrow: "Business analytics",
      anTitle: "Know how your business performs.",
      anSub:
        "Monitor revenue, average check, employees, locations and operational metrics from one dashboard.",
      anPoints: ["Revenue", "Orders", "Average check", "Employees"],
      anShot: "The Click back office analytics dashboard",

      /* 3 · menu */
      menuEyebrow: "Menu management",
      menuTitle: "Build your menu once.",
      menuSub:
        "Create products, categories, modifiers and pricing once. Every POS stays synchronised automatically.",
      menuPoints: ["Categories", "Products", "Pricing", "Modifiers", "Images"],
      menuShot: "The assortment screen, with menu categories and products",

      /* 4 · multi-location */
      placesEyebrow: "Multi-location",
      placesTitle: "Manage every location.",
      placesSub: "Operate one café or hundreds of restaurants from the same back office.",
      placesShot: "The places screen, listing restaurant locations",

      /* 5 · setup */
      setupEyebrow: "Guided setup",
      setupTitle: "Launch faster.",
      setupSub:
        "Guided onboarding helps configure menus, locations, staff and pricing before opening day.",
      setupShot: "The guided launch setup checklist",

      /* 6 · transition */
      runEyebrow: "On the floor",
      runTitle: "Run your restaurant.",
      runSub: "The back office sets it up. The POS runs the service.",

      /* 7 · floor */
      floorEyebrow: "Restaurant floor",
      floorTitle: "See every table in real time.",
      floorSub:
        "Track occupied tables, waiter assignments and open orders with an interactive floor plan.",
      floorPoints: ["Live tables", "Multiple halls", "Waiter assignment", "Instant access"],
      floorShot: "The interactive restaurant floor plan with live table status",

      /* 8 · orders */
      ordersEyebrow: "Orders",
      ordersTitle: "Every order under control.",
      ordersSub: "Every order has its own status, waiter, table and payment progress.",
      ordersShot: "The tickets screen, listing open and completed orders",

      /* 9 · kitchen */
      kitchenEyebrow: "Kitchen display",
      kitchenTitle: "Kitchen stays synchronised.",
      kitchenSub: "Orders reach the kitchen instantly, reducing mistakes and improving service speed.",
      kitchenShot: "The kitchen desk, showing orders sent from the floor",

      /* 10 · shift */
      shiftEyebrow: "Shift management",
      shiftTitle: "From opening to closing.",
      shiftSub: "Track turnover, payment methods, discounts, tips and shift performance.",
      shiftShot: "The work shift report, with turnover by payment method",

      /* 11 · ecosystem */
      ecoEyebrow: "One ecosystem",
      ecoTitle: "Every SmartOne product works together.",
      ecoSub: "Click is not a separate system bolted on. It is one layer of the same platform.",
      /* The back office is part of Click, not a product next to it – listing
         them as separate links in the chain said the opposite. */
      ecoChain: [
        { name: "Merchant Portal", text: "Your money, settlements and fees" },
        { name: "SmartOne Click", text: "Back office, floor, orders, kitchen and analytics" },
        { name: "SmartOne terminal", text: "Takes the payment at the table" },
      ],

      /* final CTA */
      ctaTitle: "Ready to simplify restaurant operations?",
      ctaText: "Everything your restaurant needs – from the first setup to the final report.",
    },
    {
      eyebrow: "SmartOne Click",
      h1a: "Gestiona tu restaurante",
      h1b: "desde una sola plataforma.",
      sub: "Gestiona cartas, personal, mesas, pedidos, cocina y analítica de negocio desde un ecosistema conectado, hecho para restaurantes modernos.",
      get: "Empezar →",
      demo: "Reservar una demo",

      allEyebrow: "Una plataforma",
      allTitle: "Todo lo que tu restaurante necesita.",
      allSub:
        "SmartOne Click reúne la gestión del negocio, la operativa del TPV, el flujo de cocina y la analítica en una sola plataforma conectada.",
      pillars: [
        { title: "Gestión del negocio", text: "Cartas, precios, personal y locales en un back office." },
        { title: "TPV", text: "Plano de sala, mesas y pedidos en el mostrador." },
        { title: "Pantalla de cocina", text: "Los pedidos llegan al pase en el momento en que se toman." },
        { title: "Analítica", text: "Ingresos, tickets y rendimiento del personal en una vista." },
      ] as Feature[],

      anEyebrow: "Analítica de negocio",
      anTitle: "Conoce cómo va tu negocio.",
      anSub:
        "Controla ingresos, ticket medio, empleados, locales y métricas operativas desde un único panel.",
      anPoints: ["Ingresos", "Pedidos", "Ticket medio", "Empleados"],
      anShot: "El panel de analítica del back office de Click",

      menuEyebrow: "Gestión de la carta",
      menuTitle: "Crea tu carta una vez.",
      menuSub:
        "Crea productos, categorías, modificadores y precios una sola vez. Cada TPV se sincroniza automáticamente.",
      menuPoints: ["Categorías", "Productos", "Precios", "Modificadores", "Imágenes"],
      menuShot: "La pantalla de surtido, con categorías y productos de la carta",

      placesEyebrow: "Multi-local",
      placesTitle: "Gestiona todos tus locales.",
      placesSub: "Opera una cafetería o cientos de restaurantes desde el mismo back office.",
      placesShot: "La pantalla de locales, con la lista de restaurantes",

      setupEyebrow: "Puesta en marcha guiada",
      setupTitle: "Arranca antes.",
      setupSub:
        "El onboarding guiado te ayuda a configurar cartas, locales, personal y precios antes de abrir.",
      setupShot: "La lista de puesta en marcha guiada",

      runEyebrow: "En la sala",
      runTitle: "Lleva tu restaurante.",
      runSub: "El back office lo configura. El TPV lleva el servicio.",

      floorEyebrow: "Sala del restaurante",
      floorTitle: "Ve cada mesa en tiempo real.",
      floorSub:
        "Controla mesas ocupadas, camareros asignados y pedidos abiertos con un plano de sala interactivo.",
      floorPoints: ["Mesas en vivo", "Varias salas", "Camarero asignado", "Acceso inmediato"],
      floorShot: "El plano interactivo de la sala con el estado de las mesas en vivo",

      ordersEyebrow: "Pedidos",
      ordersTitle: "Cada pedido bajo control.",
      ordersSub: "Cada pedido tiene su estado, su camarero, su mesa y su progreso de cobro.",
      ordersShot: "La pantalla de tickets, con pedidos abiertos y cerrados",

      kitchenEyebrow: "Pantalla de cocina",
      kitchenTitle: "La cocina va sincronizada.",
      kitchenSub: "Los pedidos llegan a cocina al instante, con menos errores y más velocidad de servicio.",
      kitchenShot: "La pantalla de cocina, con los pedidos enviados desde la sala",

      shiftEyebrow: "Gestión de turnos",
      shiftTitle: "De la apertura al cierre.",
      shiftSub: "Controla la facturación, los métodos de pago, los descuentos, las propinas y el turno.",
      shiftShot: "El informe de turno, con la facturación por método de pago",

      ecoEyebrow: "Un ecosistema",
      ecoTitle: "Todos los productos SmartOne funcionan juntos.",
      ecoSub: "Click no es un sistema aparte añadido encima. Es una capa más de la misma plataforma.",
      ecoChain: [
        { name: "Portal del comercio", text: "Tu dinero, liquidaciones y comisiones" },
        { name: "SmartOne Click", text: "Back office, sala, pedidos, cocina y analítica" },
        { name: "Terminal SmartOne", text: "Cobra en la mesa" },
      ],

      ctaTitle: "¿Listo para simplificar la operativa de tu restaurante?",
      ctaText: "Todo lo que tu restaurante necesita, desde la primera configuración hasta el informe final.",
    },
  );
}

const pillarIcons: LucideIcon[] = [LayoutGrid, Monitor, ChefHat, BarChart3];
const anIcons: LucideIcon[] = [Coins, Receipt, Coins, Users];
const menuIcons: LucideIcon[] = [LayoutList, UtensilsCrossed, Tags, SlidersHorizontal, ImageIcon];
const floorIcons: LucideIcon[] = [LayoutGrid, MapPin, Users, Clock];

/* A labelled row of facts under a section's copy. Kept small on purpose – the
   screenshot is the argument, these are just the handles. */
function Points({ items, icons }: { items: string[]; icons: LucideIcon[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
      {items.map((p, i) => {
        const Icon = icons[i % icons.length];
        return (
          <li key={p} className="inline-flex items-center gap-2 text-[14.5px] text-ink-2">
            <Icon className="size-4.5 text-brand" strokeWidth={1.75} aria-hidden />
            {p}
          </li>
        );
      })}
    </ul>
  );
}

/* One story beat: copy on one side, a real screenshot on the other. `flip`
   puts the image first on desktop so consecutive sections alternate. */
function Beat({
  eyebrow,
  title,
  sub,
  src,
  alt,
  flip = false,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  src: string;
  alt: string;
  flip?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h-display mt-4 text-[clamp(26px,3.2vw,40px)] leading-[1.07]">{title}</h2>
        <p className="lead mt-4 text-[16.5px] leading-relaxed text-ink-2">{sub}</p>
        {children}
      </div>
      <Reveal className={flip ? "lg:order-1" : ""}>
        <AppShot src={src} alt={alt} width={SHOT.width} height={SHOT.height} />
      </Reveal>
    </div>
  );
}

export default async function ClickPage() {
  const lang = await getActiveLang();
  const c = copyFor(lang);

  return (
    <>
      {/* hero – dark, with the floor plan as the headline visual */}
      <section className="relative overflow-hidden bg-gradient-to-br from-night-2 to-night py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute -top-20 -right-20 size-96 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.55),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 size-80 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.35),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-160 text-center">
            <span className="anim-fade-up eyebrow eyebrow-dark">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(34px,4.6vw,58px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand-l via-[#c9a6f5] to-white bg-clip-text text-transparent">
                {c.h1b}
              </span>
            </h1>
            {/* text-balance, not the usual pretty: pretty only guarantees the
                last line isn't a single word, which still left "modern
                restaurants." stranded on a short third line. Balance evens all
                three lines instead. Right for a short centred paragraph like
                this one; wrong for long body copy, hence not in .lead. */}
            <p className="anim-fade-up anim-d-2 mx-auto mt-5 max-w-135 text-lg leading-relaxed text-balance text-white/70">
              {c.sub}
            </p>
            <div className="anim-fade-up anim-d-3 mt-8 flex flex-wrap justify-center gap-3.5">
              <Link href="/contact" className="btn-light">{c.get}</Link>
              <Link href="/contact" className="btn-ghost-dark">{c.demo}</Link>
            </div>
          </div>
          {/* Three screens, not one: Click is a platform, and a single
              screenshot argues for a single app. The floor plan leads; the back
              office and the order list sit behind it, angled and dimmed, so
              they read as depth rather than as three things competing.

              They deliberately overhang the container – the section clips them,
              which is the effect – so the hero can never widen the page. Below
              lg the side shots are dropped: at phone width they would be too
              small to read and would only crowd the one that matters. */}
          <div className="anim-fade-up anim-d-3 relative mx-auto mt-14 max-w-3xl">
            <div className="absolute top-12 -left-32 hidden w-[52%] -rotate-6 opacity-70 blur-[0.4px] lg:block" aria-hidden>
              <AppShot src="/click/analytics.webp" alt="" width={SHOT.width} height={SHOT.height} />
            </div>
            <div className="absolute top-16 -right-32 hidden w-[52%] rotate-6 opacity-70 blur-[0.4px] lg:block" aria-hidden>
              <AppShot src="/click/tickets.webp" alt="" width={SHOT.width} height={SHOT.height} />
            </div>
            <div className="relative z-10">
              <AppShot src="/click/floor.webp" alt={c.floorShot} width={SHOT.width} height={SHOT.height} priority />
            </div>
          </div>
        </div>
      </section>

      {/* 1 · everything your restaurant needs */}
      <section className="py-22 lg:py-26">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.allEyebrow} title={c.allTitle} sub={c.allSub} center />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <Reveal key={p.title} delay={i * 90} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-white p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-tint">
                      <Icon className="size-5.5 text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-[17.5px] font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2 · analytics */}
      <section className="bg-bg-2 py-22 lg:py-26">
        <Beat
          eyebrow={c.anEyebrow}
          title={c.anTitle}
          sub={c.anSub}
          src="/click/analytics.webp"
          alt={c.anShot}
        >
          <Points items={c.anPoints} icons={anIcons} />
        </Beat>
      </section>

      {/* 3 · menu management */}
      <section className="py-22 lg:py-26">
        <Beat
          eyebrow={c.menuEyebrow}
          title={c.menuTitle}
          sub={c.menuSub}
          src="/click/assortment.webp"
          alt={c.menuShot}
          flip
        >
          <Points items={c.menuPoints} icons={menuIcons} />
        </Beat>
      </section>

      {/* 4 · multi-location */}
      <section className="bg-bg-2 py-22 lg:py-26">
        <Beat
          eyebrow={c.placesEyebrow}
          title={c.placesTitle}
          sub={c.placesSub}
          src="/click/places.webp"
          alt={c.placesShot}
        />
      </section>

      {/* 5 · guided setup */}
      <section className="py-22 lg:py-26">
        <Beat
          eyebrow={c.setupEyebrow}
          title={c.setupTitle}
          sub={c.setupSub}
          src="/click/setup.webp"
          alt={c.setupShot}
          flip
        />
      </section>

      {/* 6 · transition: back office → the floor */}
      <section className="bg-night py-20 text-white lg:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <span className="eyebrow eyebrow-dark">{c.runEyebrow}</span>
            <h2 className="h-display mx-auto mt-4 max-w-160 text-[clamp(30px,4vw,52px)] leading-[1.05]">
              {c.runTitle}
            </h2>
            <p className="lead mx-auto mt-4 max-w-120 text-[16.5px] leading-relaxed text-white/65">{c.runSub}</p>
          </Reveal>
        </div>
      </section>

      {/* 7 · restaurant floor */}
      <section className="py-22 lg:py-26">
        <Beat
          eyebrow={c.floorEyebrow}
          title={c.floorTitle}
          sub={c.floorSub}
          src="/click/floor.webp"
          alt={c.floorShot}
        >
          <Points items={c.floorPoints} icons={floorIcons} />
        </Beat>
      </section>

      {/* 8 · orders */}
      <section className="bg-bg-2 py-22 lg:py-26">
        <Beat
          eyebrow={c.ordersEyebrow}
          title={c.ordersTitle}
          sub={c.ordersSub}
          src="/click/tickets.webp"
          alt={c.ordersShot}
          flip
        />
      </section>

      {/* 9 · kitchen display */}
      <section className="py-22 lg:py-26">
        <Beat
          eyebrow={c.kitchenEyebrow}
          title={c.kitchenTitle}
          sub={c.kitchenSub}
          src="/click/kitchen.webp"
          alt={c.kitchenShot}
        />
      </section>

      {/* 10 · shift management */}
      <section className="bg-bg-2 py-22 lg:py-26">
        <Beat
          eyebrow={c.shiftEyebrow}
          title={c.shiftTitle}
          sub={c.shiftSub}
          src="/click/shift.webp"
          alt={c.shiftShot}
          flip
        />
      </section>

      {/* 11 · ecosystem */}
      <section className="py-22 lg:py-26">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.ecoEyebrow} title={c.ecoTitle} sub={c.ecoSub} center />
          <div className="mx-auto mt-12 max-w-160">
            {c.ecoChain.map((node, i) => (
              <Reveal key={node.name} delay={i * 90}>
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 sm:gap-5 sm:px-6 sm:py-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-tint font-mono text-[12.5px] font-semibold text-brand">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[16.5px] font-semibold tracking-tight">{node.name}</h3>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-ink-2">{node.text}</p>
                  </div>
                </div>
                {i < c.ecoChain.length - 1 && (
                  <div className="flex justify-center py-2" aria-hidden>
                    <svg viewBox="0 0 24 24" className="size-5 stroke-line-2" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M6 13l6 6 6-6" />
                    </svg>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">
                  {c.ctaTitle}
                </h2>
                <p className="lead mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">
                  {c.ctaText}
                </p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">{c.get}</Link>
                  <Link href="/contact" className="btn-ghost-dark">{c.demo}</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
