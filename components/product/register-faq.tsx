import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { tr } from "@/lib/dictionaries";
import type { Country, Lang } from "@/lib/countries";
import { termsFor } from "@/lib/pricing";

/* Questions and answers on the product pages, for the market where the cash
   register is live (Malta – gate on promotesRegister() before rendering).
   Each answer opens with the direct answer and its figure, so it can be
   quoted as it stands. Native <details>, as on the homepage's "Got doubts?":
   every answer is in the server HTML, and the FAQPage JSON-LD below is built
   from the very same strings, for exactly the questions shown – the markup
   can't drift from the page. Prices and rates come from lib/pricing.ts.

   /product/cash-register shows all six; /product/terminals shows the last
   four (in Malta the terminal is the register, so those two pages answer the
   same buying questions). */

export type RegisterFaqId = "approved" | "exo" | "oneDevice" | "cost" | "payout" | "start";

export const ALL_REGISTER_FAQS: RegisterFaqId[] = ["approved", "exo", "oneDevice", "cost", "payout", "start"];

/** A figure in the language's own notation (1,90 in Spanish, Ukrainian and
    Russian). Mirrors figure() in components/pricing/tariff-plans.tsx, which
    is a client module and so can't be called from here. */
function fig(lang: Lang, value: string): string {
  return lang === "en" ? value : value.replace(/\./g, ",");
}

/** The approval, in the words the homepage and the first answer use. */
export function approvalFact(lang: Lang) {
  return tr(
    lang,
    {
      claim: "SmartOne is a VAT-approved fiscal cash register",
      source: "approved by the Commissioner for Tax and Customs — Government Gazette No. 21,373, Notice 46, 10 January 2025",
    },
    {
      claim: "SmartOne es una caja registradora fiscal aprobada a efectos del IVA",
      source: "aprobada por el Commissioner for Tax and Customs — Government Gazette n.º 21.373, aviso 46, 10 de enero de 2025",
    },
    {
      claim: "SmartOne – фіскальний касовий апарат, затверджений для цілей ПДВ",
      source: "затверджений Commissioner for Tax and Customs — Government Gazette № 21 373, повідомлення 46, 10 січня 2025 р.",
    },
    {
      claim: "SmartOne – фискальный кассовый аппарат, утверждённый для целей НДС",
      source: "утверждён Commissioner for Tax and Customs — Government Gazette № 21 373, уведомление 46, 10 января 2025 г.",
    },
  );
}

function faqsFor(lang: Lang, country: Country): Record<RegisterFaqId, { q: string; a: string }> & { title: string } {
  const t = termsFor(country);
  const c = country.currencySymbol;
  const f = (v: string) => fig(lang, v);
  const rates = (mode: "buy" | "rent") => t.rates[mode].map((r) => `${f(r)}%`).join(" / ");
  const fx = `${c}${f(t.fixed)}`;
  const buy = `${c}${f(t.price.buy[0])}`;
  const rent = `${c}${f(t.price.rent[0])}`;
  return tr(
    lang,
    {
      title: "Frequently asked questions",
      approved: {
        q: "Is SmartOne an approved fiscal cash register in Malta?",
        a: "Yes. SmartOne is a VAT-approved fiscal cash register, approved by the Commissioner for Tax and Customs in Government Gazette No. 21,373, Notice 46, on 10 January 2025. Fiscal receipts and Z-reports are built in, and fiscal registration of the device is part of your setup.",
      },
      exo: {
        q: "Do I need an EXO number?",
        a: "No. SmartOne is a fiscally approved cash register, so you don't need an EXO number, a software supplier certificate or an EXO audit. The EXO route is for computerised POS systems that are not approved fiscal cash registers.",
      },
      oneDevice: {
        q: "Do I need a separate card terminal and receipt printer?",
        a: "No. One SmartOne device is the fiscal cash register, the card terminal and the receipt printer. It takes card, contactless and cash, and the Merchant Portal is included. One box on the counter and one price, instead of three separate boxes with a contract each.",
      },
      cost: {
        q: "How much does SmartOne cost in Malta?",
        a: `Buy the device for ${buy} + VAT with no minimum term, or rent it for ${rent} + VAT a month on a one-year term. Card fees depend on your monthly card volume: ${rates("buy")} + ${fx} when you buy, ${rates("rent")} + ${fx} when you rent. Rates are for domestic cards. No setup, settlement, inactivity or minimum fees.`,
      },
      payout: {
        q: "When do I get paid, and to which bank account?",
        a: "Next business day (T+1), into the bank account you already have. Payments are processed by a licensed EU acquirer, so there is no new account to open. The Merchant Portal shows every settlement net of commission, with the fee you actually paid.",
      },
      start: {
        q: "How long does it take to start trading?",
        a: "Usually four business days or less once the details are agreed with our partner in Malta, including fiscal registration of the device. Send a request and our partner in Malta calls you back to set things up.",
      },
    },
    {
      title: "Preguntas frecuentes",
      approved: {
        q: "¿SmartOne es una caja registradora fiscal aprobada en Malta?",
        a: "Sí. SmartOne es una caja registradora fiscal aprobada a efectos del IVA por el Commissioner for Tax and Customs en la Government Gazette n.º 21.373, aviso 46, del 10 de enero de 2025. Los tickets fiscales y los informes Z vienen integrados, y la registración fiscal del dispositivo forma parte del alta.",
      },
      exo: {
        q: "¿Necesito un número EXO?",
        a: "No. SmartOne es una caja registradora fiscal aprobada, así que no necesitas un número EXO, un certificado del proveedor de software ni una auditoría EXO. La vía EXO es para sistemas TPV informatizados que no son cajas registradoras fiscales aprobadas.",
      },
      oneDevice: {
        q: "¿Necesito un terminal de pago y una impresora de tickets aparte?",
        a: "No. Un solo dispositivo SmartOne es la caja registradora fiscal, el terminal de pago y la impresora de tickets. Acepta tarjeta, contactless y efectivo, y el Merchant Portal está incluido. Una caja en el mostrador y un precio, en lugar de tres cajas separadas, cada una con su contrato.",
      },
      cost: {
        q: "¿Cuánto cuesta SmartOne en Malta?",
        a: `Compra el dispositivo por ${buy} + IVA sin permanencia, o alquílalo por ${rent} + IVA al mes con permanencia de un año. Las comisiones dependen de tu volumen mensual con tarjeta: ${rates("buy")} + ${fx} si compras, ${rates("rent")} + ${fx} si alquilas. Tarifas para tarjetas nacionales. Sin cuotas de alta, por liquidación, por inactividad ni mínimos.`,
      },
      payout: {
        q: "¿Cuándo cobro y en qué cuenta bancaria?",
        a: "Al día hábil siguiente (T+1), en la cuenta bancaria que ya tienes. Los pagos los procesa un adquirente autorizado en la UE, así que no hay que abrir una cuenta nueva. El Merchant Portal muestra cada liquidación neta de comisión, con la comisión que realmente pagaste.",
      },
      start: {
        q: "¿Cuánto se tarda en empezar a operar?",
        a: "Normalmente cuatro días hábiles o menos desde que acuerdas los detalles con nuestro socio en Malta, incluida la registración fiscal del dispositivo. Envía una solicitud y nuestro socio en Malta te llama para dejarlo todo listo.",
      },
    },
    {
      title: "Поширені запитання",
      approved: {
        q: "Чи є SmartOne затвердженим фіскальним касовим апаратом на Мальті?",
        a: "Так. SmartOne – фіскальний касовий апарат, затверджений для цілей ПДВ Commissioner for Tax and Customs у Government Gazette № 21 373, повідомлення 46, від 10 січня 2025 р. Фіскальні чеки та Z-звіти вбудовані, а фіскальна реєстрація пристрою входить у підключення.",
      },
      exo: {
        q: "Чи потрібен мені номер EXO?",
        a: "Ні. SmartOne – затверджений фіскальний касовий апарат, тож вам не потрібні номер EXO, сертифікат постачальника програмного забезпечення чи аудит EXO. Шлях EXO – для комп’ютеризованих POS-систем, які не є затвердженими фіскальними касовими апаратами.",
      },
      oneDevice: {
        q: "Чи потрібні мені окремий платіжний термінал і принтер чеків?",
        a: "Ні. Один пристрій SmartOne – це фіскальний касовий апарат, платіжний термінал і принтер чеків. Він приймає картки, безконтактні платежі й готівку, а Merchant Portal входить у вартість. Один пристрій на прилавку й одна ціна замість трьох окремих пристроїв, кожен зі своїм договором.",
      },
      cost: {
        q: "Скільки коштує SmartOne на Мальті?",
        a: `Купіть пристрій за ${buy} + ПДВ без мінімального терміну або орендуйте за ${rent} + ПДВ на місяць із договором на один рік. Комісії залежать від ваших продажів карткою за місяць: ${rates("buy")} + ${fx} при купівлі, ${rates("rent")} + ${fx} при оренді. Ставки – для карток, випущених у країні. Без плати за підключення, зарахування, неактивність і без мінімумів.`,
      },
      payout: {
        q: "Коли я отримаю гроші і на який рахунок?",
        a: "Наступного робочого дня (T+1), на банківський рахунок, який у вас уже є. Платежі обробляє ліцензований еквайр у ЄС, тож відкривати новий рахунок не потрібно. Merchant Portal показує кожне зарахування за вирахуванням комісії – з тією комісією, яку ви фактично сплатили.",
      },
      start: {
        q: "Скільки часу потрібно, щоб почати роботу?",
        a: "Зазвичай чотири робочі дні або менше після того, як ви погодите деталі з нашим партнером на Мальті, включно з фіскальною реєстрацією пристрою. Надішліть запит, і наш партнер на Мальті передзвонить вам, щоб усе налаштувати.",
      },
    },
    {
      title: "Частые вопросы",
      approved: {
        q: "Является ли SmartOne утверждённым фискальным кассовым аппаратом на Мальте?",
        a: "Да. SmartOne – фискальный кассовый аппарат, утверждённый для целей НДС Commissioner for Tax and Customs в Government Gazette № 21 373, уведомление 46, от 10 января 2025 г. Фискальные чеки и Z-отчёты встроены, а фискальная регистрация устройства входит в подключение.",
      },
      exo: {
        q: "Нужен ли мне номер EXO?",
        a: "Нет. SmartOne – утверждённый фискальный кассовый аппарат, поэтому вам не нужны номер EXO, сертификат поставщика программного обеспечения или аудит EXO. Путь EXO – для компьютеризированных POS-систем, которые не являются утверждёнными фискальными кассовыми аппаратами.",
      },
      oneDevice: {
        q: "Нужны ли мне отдельный платёжный терминал и принтер чеков?",
        a: "Нет. Одно устройство SmartOne – это фискальный кассовый аппарат, платёжный терминал и принтер чеков. Оно принимает карты, бесконтактные платежи и наличные, а Merchant Portal входит в стоимость. Одно устройство на прилавке и одна цена вместо трёх отдельных устройств, каждое со своим договором.",
      },
      cost: {
        q: "Сколько стоит SmartOne на Мальте?",
        a: `Купите устройство за ${buy} + НДС без минимального срока или арендуйте за ${rent} + НДС в месяц с договором на один год. Комиссии зависят от вашего оборота по картам за месяц: ${rates("buy")} + ${fx} при покупке, ${rates("rent")} + ${fx} при аренде. Ставки – для карт, выпущенных в стране. Без платы за подключение, зачисление, неактивность и без минимумов.`,
      },
      payout: {
        q: "Когда я получу деньги и на какой счёт?",
        a: "На следующий рабочий день (T+1), на банковский счёт, который у вас уже есть. Платежи обрабатывает лицензированный эквайер в ЕС, поэтому открывать новый счёт не нужно. Merchant Portal показывает каждое зачисление за вычетом комиссии – с той комиссией, которую вы фактически заплатили.",
      },
      start: {
        q: "Сколько времени нужно, чтобы начать работу?",
        a: "Обычно четыре рабочих дня или меньше после того, как вы согласуете детали с нашим партнёром на Мальте, включая фискальную регистрацию устройства. Отправьте заявку, и наш партнёр на Мальте перезвонит вам, чтобы всё настроить.",
      },
    },
  );
}

export function RegisterFaq({
  lang,
  country,
  ids,
  className = "",
}: {
  lang: Lang;
  country: Country;
  ids: RegisterFaqId[];
  className?: string;
}) {
  const all = faqsFor(lang, country);
  const faqs = ids.map((id) => all[id]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className={`py-24 ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <SectionHead eyebrow="FAQ" title={all.title} />
        <Reveal>
          <div className="divide-y divide-line overflow-hidden rounded-3xl bg-white shadow-sm shadow-black/3">
            {faqs.map(({ q, a }, i) => (
              <details key={q} open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[16.5px] font-semibold tracking-tight transition-colors hover:text-brand sm:px-7 [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-tint text-brand transition-transform duration-300 group-open:rotate-45">
                    <Plus className="size-4" strokeWidth={2.2} aria-hidden />
                  </span>
                </summary>
                <p className="-mt-1 px-6 pb-6 text-[15px] leading-relaxed text-ink-2 sm:px-7">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
