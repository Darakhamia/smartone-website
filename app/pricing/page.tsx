import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PlanPicker } from "@/components/pricing/plan-picker";
import { Faq } from "@/components/pricing/faq";
import { PricingFaqJsonLd, ProductJsonLd } from "@/components/seo/jsonld";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister } from "@/lib/countries";
import { tariffsFor } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent rates. No hidden fees. One rate per band, every fee shown up front. Buy the terminal or rent it – your call.",
  ...pageSeo("/pricing"),
};

export default async function PricingPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const register = promotesRegister(country);
  // Spain is priced by card type, not by volume band (lib/pricing.ts)
  const byCard = tariffsFor(country) !== null;
  const c = tr(
    lang,
    {
      eyebrow: "Pricing",
      ratesHeading: byCard ? "Plans and rates" : "Rates by monthly card volume",
      titleA: "Transparent rates.",
      titleB: "No hidden fees.",
      lead: byCard
        ? "One clear rate for each kind of card, every fee shown up front. Buy the terminal or rent it – your call."
        : "One rate per band, every fee shown up front. Buy the terminal or rent it – your call.",
      included: register ? "Cash register, printer and portal included" : "Receipt printer and portal included",
      footnote: byCard ? "" : "Rates shown are for domestic cards.",
      footnote2: "Paid to your own bank, T+1.",
      smallprint: byCard
        ? "Device prices are indicative and confirmed for your country."
        : "Corporate and international cards have their own clear rate, confirmed for your business. Device prices are indicative and confirmed for your country.",
      honestEyebrow: "The honest bit",
      honestTitle: "What you'll never pay.",
      honestSub: "What you agreed at signing is exactly what you pay – nothing added, nothing hidden.",
      neverPay: [
        { label: "Rate mark-ups", desc: "The rate you agreed at signing is the rate you pay – never more." },
        { label: "Settlement fee", desc: "No cut taken when your money is paid out to you." },
        { label: "Minimum fee", desc: "Low-turnover month? We never add a minimum charge." },
        { label: "Inactivity fee", desc: "Quiet month with no sales? You pay nothing extra." },
      ],
      ctaTitle: "Get your exact rate.",
      ctaText: "Not sure about your volume? Talk to us and we'll work it out together.",
      cta1: "Get a terminal →",
      cta2: "Contact sales",
    },
    {
      eyebrow: "Precios",
      ratesHeading: byCard ? "Planes y tarifas" : "Tarifas por volumen mensual con tarjeta",
      titleA: "Tarifas transparentes.",
      titleB: "Sin comisiones ocultas.",
      lead: byCard
        ? "Una tarifa clara para cada tipo de tarjeta, cada comisión visible desde el principio. Compra el terminal o alquílalo, tú decides."
        : "Una tarifa por tramo, cada comisión visible desde el principio. Compra el terminal o alquílalo, tú decides.",
      included: register ? "Caja registradora, impresora y portal incluidos" : "Impresora de tickets y portal incluidos",
      footnote: byCard ? "" : "Tarifas para tarjetas nacionales.",
      footnote2: "Abonado a tu propio banco, T+1.",
      smallprint: byCard
        ? "Los precios del dispositivo son orientativos y se confirman para tu país."
        : "Las tarjetas corporativas e internacionales tienen su propia tarifa clara, confirmada para tu negocio. Los precios del dispositivo son orientativos y se confirman para tu país.",
      honestEyebrow: "La parte honesta",
      honestTitle: "Lo que nunca pagarás.",
      honestSub: "Lo que acordaste al firmar es exactamente lo que pagas: nada añadido, nada oculto.",
      neverPay: [
        { label: "Recargos sobre la tarifa", desc: "La tarifa que acordaste al firmar es la que pagas, nunca más." },
        { label: "Comisión por liquidación", desc: "No nos quedamos con nada cuando te abonan tu dinero." },
        { label: "Comisión mínima", desc: "¿Mes de poca facturación? Nunca añadimos un mínimo." },
        { label: "Comisión por inactividad", desc: "¿Mes tranquilo sin ventas? No pagas nada extra." },
      ],
      ctaTitle: "Consigue tu tarifa exacta.",
      ctaText: "¿No sabes tu volumen? Habla con nosotros y lo calculamos juntos.",
      cta1: "Solicita tu terminal →",
      cta2: "Contactar con ventas",
    },
    {
      eyebrow: "Ціни",
      ratesHeading: byCard ? "Тарифи та ставки" : "Ставки залежно від продажів карткою за місяць",
      titleA: "Прозорі ставки.",
      titleB: "Жодних прихованих комісій.",
      lead: byCard
        ? "Одна зрозуміла ставка для кожного типу картки, усі комісії видно одразу. Купіть термінал або орендуйте – вирішувати вам."
        : "Одна ставка для кожного діапазону, усі комісії видно одразу. Купіть термінал або орендуйте – вирішувати вам.",
      included: register ? "Касовий апарат, принтер і портал включено" : "Принтер чеків і портал включено",
      footnote: byCard ? "" : "Ставки вказано для карток, випущених у вашій країні.",
      footnote2: "Виплата на ваш власний банківський рахунок, T+1.",
      smallprint: byCard
        ? "Ціни на пристрої орієнтовні й підтверджуються для вашої країни."
        : "Для корпоративних і міжнародних карток діє окрема зрозуміла ставка, яку підтверджують для вашого бізнесу. Ціни на пристрої орієнтовні й підтверджуються для вашої країни.",
      honestEyebrow: "Чесно про головне",
      honestTitle: "За що ви ніколи не платитимете.",
      honestSub: "Ви платите рівно те, про що домовилися під час підписання, – нічого зайвого, нічого прихованого.",
      neverPay: [
        { label: "Надбавки до ставки", desc: "Ви платите ставку, погоджену під час підписання, – і ніколи більше." },
        { label: "Комісія за зарахування коштів", desc: "Ми нічого не утримуємо, коли виплачуємо вам ваші гроші." },
        { label: "Мінімальна комісія", desc: "Місяць із невеликим оборотом? Ми ніколи не додаємо мінімальний платіж." },
        { label: "Комісія за неактивність", desc: "Тихий місяць без продажів? Ви нічого не доплачуєте." },
      ],
      ctaTitle: "Дізнайтеся свою точну ставку.",
      ctaText: "Не впевнені щодо свого обороту? Зв’яжіться з нами, і ми все розрахуємо разом.",
      cta1: "Замовити термінал →",
      cta2: "Зв’язатися з нами",
    },
    {
      eyebrow: "Цены",
      ratesHeading: byCard ? "Тарифы и ставки" : "Ставки в зависимости от продаж картой за месяц",
      titleA: "Прозрачные ставки.",
      titleB: "Никаких скрытых комиссий.",
      lead: byCard
        ? "Одна понятная ставка для каждого типа карты, все комиссии видны сразу. Купите терминал или арендуйте – решать вам."
        : "Одна ставка для каждого диапазона, все комиссии видны сразу. Купите терминал или арендуйте – решать вам.",
      included: register ? "Кассовый аппарат, принтер и портал включены" : "Принтер чеков и портал включены",
      footnote: byCard ? "" : "Ставки указаны для карт, выпущенных в вашей стране.",
      footnote2: "Выплата на ваш собственный банковский счёт, T+1.",
      smallprint: byCard
        ? "Цены на устройства ориентировочные и подтверждаются для вашей страны."
        : "Для корпоративных и международных карт действует отдельная понятная ставка, подтверждённая для вашего бизнеса. Цены на устройства ориентировочные и подтверждаются для вашей страны.",
      honestEyebrow: "Честно о главном",
      honestTitle: "За что вы никогда не будете платить.",
      honestSub: "Вы платите ровно то, о чём договорились при подписании, – ничего лишнего, ничего скрытого.",
      neverPay: [
        { label: "Надбавки к ставке", desc: "Вы платите ставку, согласованную при подписании, – и никогда больше." },
        { label: "Комиссия за зачисление средств", desc: "Мы ничего не удерживаем, когда выплачиваем вам ваши деньги." },
        { label: "Минимальная комиссия", desc: "Месяц с небольшим оборотом? Мы никогда не добавляем минимальный платёж." },
        { label: "Комиссия за неактивность", desc: "Тихий месяц без продаж? Вы ничего не доплачиваете." },
      ],
      ctaTitle: "Узнайте свою точную ставку.",
      ctaText: "Не уверены в своём обороте? Свяжитесь с нами, и мы всё рассчитаем вместе.",
      cta1: "Заказать терминал →",
      cta2: "Связаться с нами",
    },
  );

  return (
    <>
      {/* 1 · hero */}
      <section className="pt-16 pb-10 lg:pt-22">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-170 text-center">
            <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.titleA}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
                {c.titleB}
              </span>
            </h1>
            <p className="anim-fade-up anim-d-2 mx-auto mt-5 max-w-125 text-lg leading-relaxed text-ink-2">
              {c.lead}
            </p>
          </div>
        </div>
      </section>

      {/* 2 · plan picker */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-6">
          {/* The rate cards are h3, and the page heading is h1 – without this the
              outline skips a level. Hidden visually because the section reads
              fine without it; screen readers and search engines need it. */}
          <h2 className="sr-only">{c.ratesHeading}</h2>
          <Reveal>
            <PlanPicker />
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[12.5px] leading-relaxed text-ink-3">
              {[c.footnote, c.included].filter(Boolean).join(" ")} · {c.footnote2}
            </p>
            {/* Legal qualifiers, set smaller so they don't compete with the
                headline terms above – but not on a phone, where 11px is below
                what anyone reads comfortably and this is the sentence that
                tells them their card rate may differ. */}
            <p className="mx-auto mt-2 max-w-2xl text-center text-[12.5px] leading-relaxed text-ink-3/75 sm:text-[11px]">
              {c.smallprint}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 · what you'll never pay */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-165 text-center">
            <Reveal>
              <span className="eyebrow">{c.honestEyebrow}</span>
              <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,42px)] leading-[1.06]">{c.honestTitle}</h2>
              <p className="mx-auto mt-4 max-w-135 text-lg leading-relaxed text-ink-2">{c.honestSub}</p>
            </Reveal>
          </div>
          {/* Each fee is priced at zero rather than crossed out: the amount says
              "you never pay this" more plainly than a strikethrough or an X. */}
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.neverPay.map((n, i) => (
              <Reveal key={n.label} delay={i * 80} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-white p-6">
                  <span className="inline-flex items-baseline rounded-xl bg-brand-tint px-3 py-1.5 font-display text-[22px] font-semibold tracking-tight text-brand">
                    {country.currencySymbol}0
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight text-ink">{n.label}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{n.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · honest FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <PricingFaqJsonLd />
          <ProductJsonLd country={country} />
          <Faq />
        </div>
      </section>

      {/* 5 · final CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">{c.ctaTitle}</h2>
                <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">{c.ctaText}</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">
                    {c.cta1}
                  </Link>
                  <Link href="/contact" className="btn-ghost-dark">
                    {c.cta2}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
