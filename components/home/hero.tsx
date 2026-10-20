import Image from "next/image";
import Link from "next/link";
import { Clock, Landmark, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { GetStarted } from "@/components/home/get-started";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { TalkToUs } from "@/components/lead/talk-to-us";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, SHOWCASE_DEVICE, type Country, type Lang } from "@/lib/countries";

/* The hero visual: a merchant photo with the terminal cut out in front of it
   and two small pieces of real product around them – what the device hands
   the customer (a fiscal receipt where the register is sold, a payment
   confirmation elsewhere) and what the Merchant Portal shows the merchant.
   They are drawn as product UI, white cards with figures, not pills: the pill
   chips that once sat here read as buttons. All of it is illustration, so it
   is hidden from screen readers; the photo carries the alt text.

   Below sm the two cards are left out – at phone width they would cover the
   photo – and the terminal shrinks with the frame.

   On desktop the visual takes its height from the window (--hv, 420–560px)
   so the three facts under the hero fit on the first screen of a laptop
   without scrolling; the photo and the terminal scale with it. */
function HeroVisual({ country, lang }: { country: Country; lang: Lang }) {
  const register = promotesRegister(country);
  const c$ = country.currencySymbol;
  const t = tr(
    lang,
    {
      alt: "Merchant taking a contactless card payment on a SmartOne terminal",
      approved: "Payment approved",
      approvedSub: "Contactless · receipt printed",
      today: "Today",
      cardSales: "Card sales",
      bank: "Your bank · tomorrow",
    },
    {
      alt: "Comerciante aceptando un pago contactless en un terminal SmartOne",
      approved: "Pago aprobado",
      approvedSub: "Contactless · ticket impreso",
      today: "Hoy",
      cardSales: "Ventas con tarjeta",
      bank: "Tu banco · mañana",
    },
  );
  // the first photo is the one most visitors see; give each market its own
  const photos =
    country.code === "es"
      ? ["/hero/foodtruck.webp", "/hero/florist.webp", "/hero/market.webp"]
      : ["/hero/florist.webp", "/hero/market.webp", "/hero/foodtruck.webp"];

  return (
    <div className="anim-fade-up anim-d-2 relative h-[380px] sm:h-[520px] lg:h-(--hv) lg:[--hv:clamp(420px,calc(100svh_-_230px),560px)]">
      <div className="pointer-events-none absolute -top-8 -right-10 size-90 rounded-full bg-[radial-gradient(circle,rgba(122,60,232,0.28),transparent_70%)]" />
      <div className="absolute top-0 right-0 h-[320px] w-[92%] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-48px_rgba(17,17,20,0.55)] sm:h-[440px] sm:w-[86%] sm:rounded-[32px] lg:h-[calc(var(--hv)_-_90px)]">
        <HeroCarousel images={photos} alt={t.alt} />
      </div>

      <div aria-hidden className="absolute top-12 left-0 hidden w-[212px] rounded-[15px] bg-white px-4 py-3.5 shadow-[0_24px_48px_-24px_rgba(17,17,20,0.4),0_0_0_1px_rgba(17,17,20,0.04)] sm:block">
        {register ? (
          <div className="font-mono text-[12px] text-ink-2">
            <div className="text-[10.5px] font-semibold tracking-[0.08em] text-ink">FISCAL RECEIPT #0421</div>
            <div className="my-2.5 border-t border-dashed border-line-2" />
            <div className="flex justify-between"><span>Sale</span><span className="text-ink">{c$}24.60</span></div>
            <div className="mt-1 flex justify-between"><span>Paid</span><span className="text-ink">Card</span></div>
            <div className="mt-2.5 mb-2 border-t border-dashed border-line-2" />
            <div className="text-[10px] tracking-[0.06em] text-ink-3">VAT · Z-REPORT · T+1</div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-7.5 place-items-center rounded-full bg-[#e6f4ee]">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="#0e8a5f" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              </span>
              <span className="text-[13px] font-semibold">{t.approved}</span>
            </div>
            <div className="mt-2.5 text-[26px] font-semibold tracking-[-0.02em]">{c$}24.60</div>
            <div className="mt-0.5 text-[12px] text-ink-3">{t.approvedSub}</div>
          </div>
        )}
      </div>

      <div className="absolute -bottom-4 -left-4 size-[200px] sm:-bottom-6 sm:-left-8 sm:size-[300px] lg:size-[calc(var(--hv)_*_0.59)]">
        <Image
          src={SHOWCASE_DEVICE}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 200px, 330px"
          className="object-contain drop-shadow-[0_28px_32px_rgba(17,17,20,0.35)]"
        />
      </div>

      <div aria-hidden className="absolute right-5 bottom-8 hidden w-[262px] rounded-[18px] bg-white px-4.5 py-4 shadow-[0_24px_48px_-24px_rgba(17,17,20,0.45),0_0_0_1px_rgba(17,17,20,0.04)] sm:block">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-3">MERCHANT PORTAL</span>
          <span className="rounded-full bg-brand-tint px-2 py-0.5 text-[11px] font-semibold text-brand">{t.today}</span>
        </div>
        <div className="mt-2.5 text-[12.5px] text-ink-2">{t.cardSales}</div>
        <div className="text-[26px] font-semibold tracking-[-0.02em]">{c$}256.38</div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-brand-l to-brand" />
          <span className="text-[12px] font-semibold text-brand">{t.bank}</span>
        </div>
      </div>
    </div>
  );
}

/* Three facts under the hero, each the market's own: the fiscal approval
   exists only in Malta (MTCA, January 2025) and the local partner is
   Malta's; Spain's fact is Verifactu readiness; elsewhere it is who
   processes the payments. */
function facts(country: Country, lang: Lang): { label: string; icon: LucideIcon }[] {
  const payouts = {
    label: tr(lang, "Payouts to your own bank, next working day", "Cobros en tu propio banco, al siguiente día hábil"),
    icon: Landmark,
  };
  const live = { label: tr(lang, "Live in 4 business days or less", "Operativo en 4 días hábiles o menos"), icon: Clock };
  if (country.code === "mt") {
    return [
      { label: "VAT-approved in Malta", icon: ShieldCheck },
      payouts,
      { label: "A local partner in Malta", icon: MapPin },
    ];
  }
  if (country.code === "es") {
    return [{ label: tr(lang, "Verifactu-ready for 2027", "Preparado para Verifactu 2027"), icon: ShieldCheck }, payouts, live];
  }
  return [{ label: "Payments by a licensed acquirer", icon: ShieldCheck }, payouts, live];
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
        ? "A VAT-approved cash register and payment terminal in one box – with clear fees, not fine print."
        : "A payment terminal and business tools in one box – with clear fees, not fine print.",
      cta1: "Get a terminal →",
      cta2: "See pricing",
    },
    {
      titleA: "Un dispositivo para",
      titleB: "gestionar tu negocio.",
      sub: register
        ? "Una caja registradora fiscal aprobada y terminal de pago en un solo equipo, con comisiones claras y sin letra pequeña."
        : "Un terminal de pago y herramientas de negocio en un solo equipo, con comisiones claras y sin letra pequeña.",
      cta1: "Solicita tu terminal →",
      cta2: "Ver precios",
    },
  );
  // Malta follows the homepage task: Get started asks self-employed or Ltd,
  // Talk to us is the second button. Other markets keep their own two.
  const malta = country.code === "mt";

  return (
    <section className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pt-12">
        <div>
          {/* The two halves of the headline arrive separately, then the lead,
              then the buttons. Staggering it makes the sentence land the way it
              reads instead of the whole block appearing at once. The gradient
              phrase stays one span: splitting it per word would give each word
              its own gradient rather than one sweep across the phrase. */}
          <h1 className="h-display text-[clamp(42px,5.4vw,70px)] leading-[1.02]">
            <span className="anim-focus-in inline-block">{c.titleA}</span>{" "}
            <span className="anim-focus-in anim-d-1 inline-block bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
              {c.titleB}
            </span>
          </h1>
          <p className="lead anim-focus-in anim-d-2 mt-6 max-w-120 text-[clamp(17px,1.4vw,19px)] leading-relaxed text-ink-2">
            {c.sub}
          </p>
          <div className="anim-focus-in anim-d-3 mt-9 flex flex-wrap items-center gap-3.5">
            {malta ? (
              <>
                <GetStarted location="hero" className="btn-primary" />
                <TalkToUs location="hero" className="btn-ghost" />
              </>
            ) : (
              <>
                <Link href="/contact" className="btn-primary">{c.cta1}</Link>
                <Link href="/pricing" className="btn-ghost">{c.cta2}</Link>
              </>
            )}
          </div>
          {malta && (
            <p className="anim-focus-in anim-d-3 mt-4 text-[13.5px] text-ink-3">
              Free to create · usually live in 4 working days from sign-up
            </p>
          )}
        </div>
        <HeroVisual country={country} lang={lang} />
      </div>

      {/* The facts run the full width of the hero – the first under the
          headline, the last ending under the photo's edge – rather than
          bunching up on the left. */}
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-14 lg:pt-10 lg:pb-16">
        <ul className="flex flex-col gap-4 border-t border-line pt-6 sm:grid sm:grid-cols-3 sm:gap-6 lg:flex lg:flex-row lg:justify-between">
          {facts(country, lang).map((f) => (
            <li key={f.label} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-tint">
                <f.icon className="size-5 text-brand" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[15px] font-medium text-ink-2">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
