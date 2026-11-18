import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta-server";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, terminalModel, TERMINAL_MODELS, type CountryCode, type Lang } from "@/lib/countries";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("product")) };
}

const icons = {
  cardReader: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </>
  ),
  cashRegister: <path key="cr" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6m-6 4h4" />,
  tapToPhone: (
    <>
      <rect x="6" y="2.5" width="9" height="19" rx="2.5" />
      <path d="M17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14" />
    </>
  ),
  portal: <path key="p" d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
  click: <path key="c" d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />,
};

function copyFor(lang: Lang, register: boolean, device: string, c$: string) {
  return tr(
    lang,
    {
      eyebrow: "Product",
      h1a: register ? "One VAT-approved box." : "One device.",
      h1b: "The complete solution.",
      sub: register
        ? "A VAT-approved cash register and payment terminal in one device – the Merchant Portal behind it. Not just a card machine."
        : "A payment terminal and the Merchant Portal in one device. Not just a card machine.",
      get: "Get a terminal →",
      seePricing: "See pricing",
      sales: "Contact sales",
      alt: "SmartOne terminal taking a contactless payment at a flower shop",
      pfEyebrow: register ? "Payments & Fiscal" : "Payments",
      pfTitle: register ? "One device takes the money and keeps you compliant." : "One device takes every kind of payment.",
      toolsEyebrow: "Tools",
      toolsTitle: "The software around the counter.",
      explore: "Explore",
      cards: {
        cardReader: { title: "Card reader", text: `The payment terminal: card, contactless and cash on one screen, with the receipt printer built in. The ${device}.` },
        cashRegister: {
          title: "Cash register",
          text: `Register, terminal and printer in one VAT-approved device – worth ${c$}800–1,200 as three boxes, yours for ${c$}400.`,
        },
        tapToPhone: { title: "Tap to Phone", text: "Take contactless payments on a phone, no extra hardware. In certification – coming soon." },
        portal: { title: "Merchant Portal", text: "Track payments, follow payouts, reprint receipts and know your numbers – one login." },
        click: { title: "Click", text: "Orders for cafés and restaurants, sent straight to the register – one catalogue, one flow." },
      },
      complianceEyebrow: "Compliance",
      complianceTitle: "Compliant market by market.",
      complianceSub: "We name what's live and what's dated – nothing else.",
      compliance: {
        mt: { title: "Malta – live today", text: "VAT-approved fiscal device, merchants on the counter now." },
        es: { title: "Spain – Verifactu-ready for 2027", text: "Built for the Verifactu programme, ahead of the deadline." },
        cy: { title: "Cyprus – fiscal receipts supported", text: "Card payments and compliant receipts on one device." },
        sk: { title: "Slovakia – fiscal-ready", text: "A payment terminal ready for local fiscal requirements." },
        uk: { title: "United Kingdom – no fiscal register", text: "No fiscal register is required. Take card payments and run your business from the Merchant Portal." },
      } as Record<CountryCode, { title: string; text: string }>,
      spainTitle: (isEs: boolean) => (isEs ? "Verifactu, explained" : "Selling in Spain? Verifactu 2027"),
      spainText: (isEs: boolean) => (isEs ? "What changes in 2027 and how the device keeps you compliant." : "Getting ready ahead of the deadline? Start here."),
      ctaTitle: "One box on the counter. Everything behind it.",
      ctaText: "Live in four business days or less.",
    },
    {
      eyebrow: "Producto",
      h1a: register ? "Una caja fiscal aprobada." : "Un dispositivo.",
      h1b: "La solución completa.",
      sub: register
        ? "Una caja registradora fiscal aprobada y terminal de pago en un solo dispositivo, con el Merchant Portal detrás. No solo un datáfono."
        : "Un terminal de pago y el Merchant Portal en un solo dispositivo. No solo un datáfono.",
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      sales: "Contactar con ventas",
      alt: "Terminal SmartOne aceptando un pago contactless en una floristería",
      pfEyebrow: register ? "Pagos y fiscal" : "Pagos",
      pfTitle: register ? "Un dispositivo cobra y te mantiene en regla." : "Un dispositivo acepta todo tipo de pago.",
      toolsEyebrow: "Herramientas",
      toolsTitle: "El software alrededor del mostrador.",
      explore: "Descubrir",
      cards: {
        cardReader: { title: "Datáfono", text: `El terminal de pago: tarjeta, contactless y efectivo en una pantalla, con impresora integrada. El ${device}.` },
        cashRegister: {
          title: "Caja registradora",
          text: `Caja, terminal e impresora en un dispositivo fiscal aprobado: vale ${c$}800-1.200 en tres cajas, la tuya por ${c$}400.`,
        },
        tapToPhone: { title: "Tap to Phone", text: "Acepta pagos contactless en un móvil, sin hardware adicional. En certificación, muy pronto." },
        portal: { title: "Merchant Portal", text: "Controla pagos, sigue liquidaciones, reimprime tickets y conoce tus cifras: un solo acceso." },
        click: { title: "Click", text: "Pedidos para cafeterías y restaurantes, directos a la caja: un catálogo, un flujo." },
      },
      complianceEyebrow: "Cumplimiento",
      complianceTitle: "Cumplimiento mercado a mercado.",
      complianceSub: "Decimos qué está activo y qué tiene fecha, nada más.",
      compliance: {
        mt: { title: "Malta – activo hoy", text: "Dispositivo fiscal aprobado, con comercios operando ya." },
        es: { title: "España – preparado para Verifactu 2027", text: "Diseñado para el programa Verifactu, antes del plazo." },
        cy: { title: "Chipre – tickets fiscales soportados", text: "Pagos con tarjeta y tickets conformes en un solo dispositivo." },
        sk: { title: "Eslovaquia – preparado para la normativa fiscal", text: "Un terminal de pago listo para los requisitos fiscales locales." },
        uk: { title: "Reino Unido – sin caja fiscal", text: "No se requiere caja fiscal. Cobra con tarjeta y gestiona tu negocio desde el Merchant Portal." },
      } as Record<CountryCode, { title: string; text: string }>,
      spainTitle: (isEs: boolean) => (isEs ? "Verifactu, explicado" : "¿Vendes en España? Verifactu 2027"),
      spainText: (isEs: boolean) => (isEs ? "Qué cambia en 2027 y cómo el dispositivo te mantiene en regla." : "¿Te preparas antes del plazo? Empieza aquí."),
      ctaTitle: "Una caja en el mostrador. Todo lo demás detrás.",
      ctaText: "Operativo en cuatro días hábiles o menos.",
    },
    {
      eyebrow: "Продукт",
      h1a: register ? "Один пристрій, схвалений податковою." : "Один пристрій.",
      h1b: "Комплексне рішення.",
      sub: register
        ? "Касовий апарат, схвалений податковою, і платіжний термінал в одному пристрої – а за ними Merchant Portal. Не просто термінал для карток."
        : "Платіжний термінал і Merchant Portal в одному пристрої. Не просто термінал для карток.",
      get: "Замовити термінал →",
      seePricing: "Переглянути ціни",
      sales: "Зв’язатися з нами",
      alt: "Термінал SmartOne приймає безконтактну оплату в квітковій крамниці",
      pfEyebrow: register ? "Платежі та фіскалізація" : "Платежі",
      pfTitle: register ? "Один пристрій приймає оплату й допомагає дотримуватися вимог закону." : "Один пристрій приймає будь-які платежі.",
      toolsEyebrow: "Інструменти",
      toolsTitle: "Програмне забезпечення для вашого прилавка.",
      explore: "Детальніше",
      cards: {
        cardReader: { title: "Термінал для карток", text: `Платіжний термінал: картки, безконтактна оплата й готівка на одному екрані, із вбудованим принтером чеків. Це ${device}.` },
        cashRegister: {
          title: "Касовий апарат",
          text: `Каса, термінал і принтер в одному пристрої, схваленому податковою: як три окремі пристрої – ${c$}800–1 200, для вас – ${c$}400.`,
        },
        tapToPhone: { title: "Tap to Phone", text: "Приймайте безконтактну оплату телефоном, без додаткового обладнання. Проходить сертифікацію – незабаром." },
        portal: { title: "Merchant Portal", text: "Відстежуйте платежі й виплати, повторно друкуйте чеки та тримайте показники під контролем – усе в одному акаунті." },
        click: { title: "Click", text: "Замовлення для кафе й ресторанів одразу надходять на ваш термінал – один каталог, один процес." },
      },
      complianceEyebrow: "Відповідність",
      complianceTitle: "Відповідаємо вимогам кожного ринку.",
      complianceSub: "Говоримо лише про те, що вже працює, і про те, що має чітку дату, – нічого зайвого.",
      compliance: {
        mt: { title: "Мальта – вже працює", text: "Фіскальний пристрій, схвалений податковою, – підприємці вже користуються ним." },
        es: { title: "Іспанія – готові до Verifactu 2027", text: "Розроблено для програми Verifactu – заздалегідь, до кінцевого терміну." },
        cy: { title: "Кіпр – підтримка фіскальних чеків", text: "Оплата карткою й чеки за вимогами закону в одному пристрої." },
        sk: { title: "Словаччина – готові до фіскалізації", text: "Платіжний термінал, готовий до місцевих фіскальних вимог." },
        uk: { title: "Велика Британія – без фіскальної каси", text: "Фіскальна каса не потрібна. Приймайте оплату карткою та керуйте бізнесом через Merchant Portal." },
      } as Record<CountryCode, { title: string; text: string }>,
      spainTitle: (isEs: boolean) => (isEs ? "Verifactu простими словами" : "Продаєте в Іспанії? Verifactu 2027"),
      spainText: (isEs: boolean) => (isEs ? "Що зміниться у 2027 році і як пристрій допоможе вам відповідати вимогам." : "Готуєтеся заздалегідь? Почніть звідси."),
      ctaTitle: "Один пристрій на прилавку. Усе інше – за ним.",
      ctaText: "Запуск за чотири робочі дні або швидше.",
    },
    {
      eyebrow: "Продукт",
      h1a: register ? "Одно устройство, одобренное налоговой." : "Одно устройство.",
      h1b: "Комплексное решение.",
      sub: register
        ? "Кассовый аппарат, одобренный налоговой, и платёжный терминал в одном устройстве – а за ними Merchant Portal. Не просто терминал для карт."
        : "Платёжный терминал и Merchant Portal в одном устройстве. Не просто терминал для карт.",
      get: "Заказать терминал →",
      seePricing: "Посмотреть цены",
      sales: "Связаться с нами",
      alt: "Терминал SmartOne принимает бесконтактную оплату в цветочном магазине",
      pfEyebrow: register ? "Платежи и фискализация" : "Платежи",
      pfTitle: register ? "Одно устройство принимает оплату и помогает соблюдать требования закона." : "Одно устройство принимает любые платежи.",
      toolsEyebrow: "Инструменты",
      toolsTitle: "Программное обеспечение для вашего прилавка.",
      explore: "Подробнее",
      cards: {
        cardReader: { title: "Терминал для карт", text: `Платёжный терминал: карты, бесконтактная оплата и наличные на одном экране, со встроенным принтером чеков. Это ${device}.` },
        cashRegister: {
          title: "Кассовый аппарат",
          text: `Касса, терминал и принтер в одном устройстве, одобренном налоговой: как три отдельных устройства – ${c$}800–1 200, для вас – ${c$}400.`,
        },
        tapToPhone: { title: "Tap to Phone", text: "Принимайте бесконтактную оплату телефоном, без дополнительного оборудования. Проходит сертификацию – скоро." },
        portal: { title: "Merchant Portal", text: "Отслеживайте платежи и выплаты, повторно печатайте чеки и держите показатели под контролем – всё в одном аккаунте." },
        click: { title: "Click", text: "Заказы для кафе и ресторанов сразу поступают на ваш терминал – один каталог, один процесс." },
      },
      complianceEyebrow: "Соответствие",
      complianceTitle: "Соответствуем требованиям каждого рынка.",
      complianceSub: "Говорим только о том, что уже работает, и о том, у чего есть чёткая дата, – ничего лишнего.",
      compliance: {
        mt: { title: "Мальта – уже работает", text: "Фискальное устройство, одобренное налоговой, – предприниматели уже им пользуются." },
        es: { title: "Испания – готовы к Verifactu 2027", text: "Разработано для программы Verifactu – заранее, до наступления срока." },
        cy: { title: "Кипр – поддержка фискальных чеков", text: "Оплата картой и чеки по требованиям закона в одном устройстве." },
        sk: { title: "Словакия – готовы к фискализации", text: "Платёжный терминал, готовый к местным фискальным требованиям." },
        uk: { title: "Великобритания – без фискальной кассы", text: "Фискальная касса не нужна. Принимайте оплату картой и управляйте бизнесом через Merchant Portal." },
      } as Record<CountryCode, { title: string; text: string }>,
      spainTitle: (isEs: boolean) => (isEs ? "Verifactu простыми словами" : "Продаёте в Испании? Verifactu 2027"),
      spainText: (isEs: boolean) => (isEs ? "Что изменится в 2027 году и как устройство поможет вам соответствовать требованиям." : "Готовитесь заранее? Начните отсюда."),
      ctaTitle: "Одно устройство на прилавке. Всё остальное – за ним.",
      ctaText: "Запуск за четыре рабочих дня или быстрее.",
    },
  );
}

function ProductCard({ href, icon, title, text, explore }: { href: string; icon: React.ReactNode; title: string; text: string; explore: string }) {
  return (
    <Link href={href} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1 hover:border-brand/30">
      <span className="grid size-12 place-items-center rounded-xl bg-brand-tint transition-colors duration-300 group-hover:bg-brand">
        <svg viewBox="0 0 24 24" className="size-6 stroke-brand transition-colors duration-300 group-hover:stroke-white" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {icon}
        </svg>
      </span>
      <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-2">{text}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand">
        {explore}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export default async function ProductPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const { fiscal } = country;
  const register = promotesRegister(country);
  const c = copyFor(lang, register, TERMINAL_MODELS[terminalModel(country)].name, country.currencySymbol);
  const isEs = country.code === "es";
  // Fiscal-compliance block: only fiscal markets that aren't already live (so
  // not Malta, and not the non-fiscal UK). The Verifactu card is Spain-only.
  const showCompliance = fiscal && country.code !== "mt";

  return (
    <>
      {/* 1 · hero */}
      <section className="overflow-x-clip pt-16 pb-18 lg:pt-22">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="lead anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">{c.get}</Link>
              <Link href="/pricing" className="btn-ghost">{c.seePricing}</Link>
            </div>
          </div>
          <div className="anim-fade-up anim-d-2 relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
            <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)]">
              <Image src="/hero-florist.jpg" alt={c.alt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Payments & Fiscal */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.pfEyebrow} title={c.pfTitle} />
          <div className={`mt-11 grid gap-4 ${register ? "md:grid-cols-3" : "md:mx-auto md:max-w-3xl md:grid-cols-2"}`}>
            <Reveal className="h-full">
              <ProductCard href="/product/terminals" icon={icons.cardReader} title={c.cards.cardReader.title} text={c.cards.cardReader.text} explore={c.explore} />
            </Reveal>
            {register && (
              <Reveal delay={100} className="h-full">
                <ProductCard href="/product/cash-register" icon={icons.cashRegister} title={c.cards.cashRegister.title} text={c.cards.cashRegister.text} explore={c.explore} />
              </Reveal>
            )}
            <Reveal delay={200} className="h-full">
              <ProductCard href="/product/tap-to-phone" icon={icons.tapToPhone} title={c.cards.tapToPhone.title} text={c.cards.tapToPhone.text} explore={c.explore} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 · Tools */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.toolsEyebrow} title={c.toolsTitle} />
          <div className="mt-11 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <ProductCard href="/merchant-portal" icon={icons.portal} title={c.cards.portal.title} text={c.cards.portal.text} explore={c.explore} />
            </Reveal>
            <Reveal delay={100} className="h-full">
              <ProductCard href="/click" icon={icons.click} title={c.cards.click.title} text={c.cards.click.text} explore={c.explore} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 · compliance – only for fiscal markets that aren't live yet (not Malta / UK) */}
      {showCompliance && (
        <section className="bg-bg-2 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead eyebrow={c.complianceEyebrow} title={c.complianceTitle} sub={c.complianceSub} />
            <div className={`mx-auto mt-10 grid gap-4 ${isEs ? "max-w-185 sm:grid-cols-2" : "max-w-md"}`}>
              <Reveal className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="mt-4 font-display text-[20px] font-semibold tracking-tight">{c.compliance[country.code].title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{c.compliance[country.code].text}</p>
                </div>
              </Reveal>
              {isEs && (
                <Reveal delay={100} className="h-full">
                  <Link href="/es" className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                    <span className="text-3xl">📋</span>
                    <h3 className="mt-4 flex items-center justify-between font-display text-[20px] font-semibold tracking-tight">
                      {c.spainTitle(true)}
                      <span className="text-brand transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{c.spainText(true)}</p>
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5 · final CTA */}
      <section className={`${showCompliance ? "" : "bg-bg-2"} py-24`}>
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
