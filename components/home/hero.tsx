import Link from "next/link";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, type Lang } from "@/lib/countries";

/* Hero photo: a rotating set of merchants taking a card payment on a SmartOne
   terminal, set in a frosted-glass frame over soft violet light.

   No floating labels over the photo: the pill-shaped chips that used to sit
   here read as buttons, so people tried to work out what they did instead of
   looking at the product. The facts they carried are already made properly by
   the trust line directly below and by the sections further down.

   The frame is real glass, not a painted-on effect: the blurred violet shapes
   sit behind it and the panel's backdrop-blur frosts them. That needs colour
   behind it to be visible at all, which is why the shapes come first.

   The drop shadow is neutral, not violet. A tinted shadow over white reads as
   a dirty smudge rather than depth. */
function DeviceVisual({ lang }: { lang: Lang }) {
  const alt = tr(
    lang,
    "Merchant taking a contactless card payment on a SmartOne terminal",
    "Comerciante aceptando un pago contactless en un terminal SmartOne",
  );
  /* From xl up the photo reaches past the grid so it can be large, but the
     margin is computed to always leave a 64px gutter to the viewport edge – it
     never runs into it. Below xl the container is narrower than its max, so the
     same formula would over-shrink the photo; there it just fills its grid
     column. 1104px is the container's content width: max-w-6xl minus the px-6
     padding on both sides. */
  return (
    <div className="anim-fade-up anim-d-2 relative xl:mr-[max(-220px,calc((1104px-100vw)/2+64px))]">
      {/* the light the glass frosts */}
      <div className="pointer-events-none absolute -top-14 -right-8 size-56 rounded-full bg-[radial-gradient(circle,rgba(122,60,232,0.5),transparent_70%)] blur-2xl sm:size-72" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 size-48 rounded-full bg-[radial-gradient(circle,rgba(168,108,245,0.42),transparent_70%)] blur-2xl sm:size-64" />
      <div className="pointer-events-none absolute top-1/3 -left-6 size-28 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.32),transparent_70%)] blur-xl sm:size-36" />

      <div className="relative rounded-[36px] border border-white/70 bg-white/35 p-2 shadow-[0_36px_80px_-44px_rgba(17,17,20,0.5)] backdrop-blur-2xl sm:p-2.5">
        <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] lg:aspect-[16/10.5]">
          <HeroCarousel
            images={["/hero/market.webp", "/hero/foodtruck.webp", "/hero/florist.webp"]}
            alt={alt}
          />
        </div>
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
          {/* The two halves of the headline arrive separately, then the lead,
              then the buttons. Staggering it makes the sentence land the way it
              reads instead of the whole block appearing at once. The gradient
              phrase stays one span: splitting it per word would give each word
              its own gradient rather than one sweep across the phrase. */}
          <h1 className="h-display text-[clamp(40px,5.6vw,72px)] leading-[1.03]">
            <span className="anim-focus-in inline-block">{c.titleA}</span>{" "}
            <span className="anim-focus-in anim-d-1 inline-block bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
              {c.titleB}
            </span>
          </h1>
          <p className="lead anim-focus-in anim-d-2 mt-6 mb-9 max-w-130 text-[clamp(17px,1.4vw,20px)] leading-relaxed text-ink-2">
            {c.sub}
          </p>
          <div className="anim-focus-in anim-d-3 flex flex-wrap items-center gap-3.5">
            <Link href="/contact" className="btn-primary">
              {c.cta1}
            </Link>
            <Link href="/pricing" className="btn-ghost">
              {c.cta2}
            </Link>
          </div>
        </div>
        <DeviceVisual lang={lang} />
      </div>
    </section>
  );
}
