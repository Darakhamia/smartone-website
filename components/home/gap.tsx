import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import { GapCards, type GapModal } from "@/components/home/gap-interactive";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister } from "@/lib/countries";

export async function Gap() {
  const lang = await getActiveLang();
  const country = await getActiveCountry();
  const register = promotesRegister(country);
  const c = tr(
    lang,
    {
      eyebrow: "Why no one else does this",
      title: "Two gaps your current provider won't close.",
      titleOne: "The gap your current provider won't close.",
      gaps: [
        {
          tag: "Durable gap",
          title: "A cash register, built in",
          text: "A certified fiscal cash register, not a card reader bolted onto your tablet – with per-market certification competitors don't have.",
          kind: "cashbox" as const,
        },
        {
          tag: "Incentive gap",
          title: "Clear fees, not fine print",
          text: "The rate you signed up for is the rate you pay. No commission hiding inside a monthly statement – competitors could show it, their margin depends on not showing it.",
          kind: "portal" as const,
        },
      ],
      modal: {
        tap: "See it in the app",
        close: "Close",
        cashbox: {
          badge: "Simple mode",
          dept: ["Drinks", "Food", "Bakery", "Other"],
          items: [["2× Coffee", "€5.00"], ["1× Croissant", "€2.40"]],
          total: "Total",
          charge: "Charge",
          caption: "The built-in Cashbox: departments, items and a fiscal receipt – right on the terminal.",
        },
        portal: {
          frame: "Portal · Money",
          cardSales: "Card sales today",
          receive: "You'll receive",
          commission: "Commission",
          caption: "The rate you signed up for is the rate you pay – every fee visible in the Merchant Portal.",
        },
      } as GapModal,
    },
    {
      eyebrow: "Por qué nadie más hace esto",
      title: "Dos carencias que tu proveedor actual no va a cerrar.",
      titleOne: "La carencia que tu proveedor actual no va a cerrar.",
      gaps: [
        {
          tag: "Carencia de producto",
          title: "Una caja registradora integrada",
          text: "Una caja registradora fiscal certificada, no un lector de tarjetas pegado a tu tablet, con certificación por país que la competencia no tiene.",
          kind: "cashbox" as const,
        },
        {
          tag: "Carencia de incentivos",
          title: "Comisiones claras, sin letra pequeña",
          text: "La tarifa que firmaste es la que pagas. Sin comisiones escondidas en un extracto mensual: la competencia podría mostrarlas, pero su margen depende de no hacerlo.",
          kind: "portal" as const,
        },
      ],
      modal: {
        tap: "Verlo en la app",
        close: "Cerrar",
        cashbox: {
          badge: "Modo simple",
          dept: ["Bebidas", "Comida", "Panadería", "Otros"],
          items: [["2× Café", "€5.00"], ["1× Croissant", "€2.40"]],
          total: "Total",
          charge: "Cobrar",
          caption: "El Cashbox integrado: departamentos, artículos y ticket fiscal, en el propio terminal.",
        },
        portal: {
          frame: "Portal · Dinero",
          cardSales: "Ventas con tarjeta hoy",
          receive: "Recibirás",
          commission: "Comisión",
          caption: "La tarifa que firmaste es la que pagas: cada comisión visible en el Merchant Portal.",
        },
      } as GapModal,
    },
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-tint via-white to-bg-2 py-24 text-ink">
      <div className="pointer-events-none absolute -top-40 -left-20 size-140 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute right-0 -bottom-24 size-120 rounded-full bg-[radial-gradient(circle,rgba(124,60,232,0.1),transparent_65%)]" />
      <LogoMark className="pointer-events-none absolute -right-24 -bottom-28 size-110 rotate-12 text-brand/[0.05]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">{register ? c.title : c.titleOne}</h2>
          </div>
        </Reveal>
        <GapCards cards={register ? c.gaps : c.gaps.filter((g) => g.kind === "portal")} modal={c.modal} />
      </div>
    </section>
  );
}
