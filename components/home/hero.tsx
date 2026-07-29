import Link from "next/link";
import { ReceiptText, Tag, Landmark, type LucideIcon } from "lucide-react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, type Lang } from "@/lib/countries";

/* Hero photo: the branded render of a florist taking a card payment on a
   SmartOne terminal (public/hero-florist.jpg). On desktop the photo bleeds
   past the grid to the right edge of the viewport. */
function Chip({
  icon: Icon,
  float,
  delay,
  children,
}: {
  icon: LucideIcon;
  float: "chip-float" | "chip-float-slow";
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${float} inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-3 pl-1.5 text-[11.5px] font-medium text-ink-2 shadow-lg shadow-black/10 sm:gap-2.5 sm:py-2 sm:pr-4.5 sm:pl-2 sm:text-[13.5px]`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <span className="grid size-6 place-items-center rounded-full bg-brand-tint text-brand sm:size-8">
        <Icon className="size-3.5 sm:size-4.5" strokeWidth={1.9} aria-hidden />
      </span>
      <span>{children}</span>
    </div>
  );
}

function DeviceVisual({ register, lang, c$ }: { register: boolean; lang: Lang; c$: string }) {
  const c = tr(
    lang,
    {
      alt: "Merchant taking a contactless card payment on a SmartOne terminal",
      receipt: register ? "Fiscal receipt · " : "Receipt printer · ",
      built: "built in",
      fee: `Fee ${c$}0.24 · `,
      noSurprises: "no surprises",
      bank: "to your own bank",
    },
    {
      alt: "Comerciante aceptando un pago contactless en un terminal SmartOne",
      receipt: register ? "Ticket fiscal · " : "Impresora de tickets · ",
      built: "integrado",
      fee: `Comisión ${c$}0.24 · `,
      noSurprises: "sin sorpresas",
      bank: "a tu propio banco",
    },
  );
  return (
    <div className="anim-fade-up anim-d-2 relative lg:mr-[calc((1104px-100vw)/2)]">
      <div className="pointer-events-none absolute -inset-8 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
      <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)] lg:aspect-[16/10.5] lg:rounded-r-none">
        <HeroCarousel
          images={["/hero/market.webp", "/hero/foodtruck.webp", "/hero/florist.webp"]}
          alt={c.alt}
        />
        {/* soft vignette so the chips stay readable on any photo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/15 via-transparent to-transparent" />
      </div>
      {/* Floating fact chips. On phones the photo is small, so they shrink and
          tuck closer to the edges instead of covering the merchant. */}
      <div className="absolute top-4 -left-1 -rotate-3 sm:top-7 sm:-left-5">
        <Chip icon={ReceiptText} float="chip-float">
          {c.receipt}
          <span className="font-semibold text-ink">{c.built}</span>
        </Chip>
      </div>
      <div className="absolute right-2 bottom-20 rotate-2 sm:right-5 lg:right-8">
        <Chip icon={Tag} float="chip-float-slow">
          {c.fee}
          <span className="font-semibold text-brand">{c.noSurprises}</span>
        </Chip>
      </div>
      <div className="absolute -bottom-3 left-4 rotate-1 sm:left-8">
        <Chip icon={Landmark} float="chip-float" delay="2s">
          T+1 · <span className="font-semibold text-ink">{c.bank}</span>
        </Chip>
      </div>
    </div>
  );
}

export async function Hero() {
  const country = await getActiveCountry();
  const register = promotesRegister(country);
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      titleA: "One device to",
      titleB: "run your business.",
      sub: register
        ? "A certified cash register and payment terminal in one box – with clear fees, not fine print."
        : "A payment terminal and business tools in one box – with clear fees, not fine print.",
      cta1: "Get a terminal →",
      cta2: "See pricing",
    },
    {
      titleA: "Un dispositivo para",
      titleB: "gestionar tu negocio.",
      sub: register
        ? "Una caja registradora certificada y terminal de pago en un solo equipo, con comisiones claras y sin letra pequeña."
        : "Un terminal de pago y herramientas de negocio en un solo equipo, con comisiones claras y sin letra pequeña.",
      cta1: "Solicita tu terminal →",
      cta2: "Ver precios",
    },
  );
  return (
    <section className="relative overflow-x-clip pt-16 pb-18 lg:pt-24">
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-150 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.09),transparent_65%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h1 className="anim-fade-up h-display text-[clamp(40px,5.6vw,72px)] leading-[1.03]">
            {c.titleA}{" "}
            <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
              {c.titleB}
            </span>
          </h1>
          <p className="anim-fade-up anim-d-1 mt-6 mb-9 max-w-130 text-[clamp(17px,1.4vw,20px)] leading-relaxed text-ink-2">
            {c.sub}
          </p>
          <div className="anim-fade-up anim-d-2 flex flex-wrap items-center gap-3.5">
            <Link href="/contact" className="btn-primary">
              {c.cta1}
            </Link>
            <Link href="/pricing" className="btn-ghost">
              {c.cta2}
            </Link>
          </div>
        </div>
        <DeviceVisual register={register} lang={lang} c$={country.currencySymbol} />
      </div>
    </section>
  );
}
