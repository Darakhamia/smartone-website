"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, type Lang } from "@/lib/countries";
import { figure } from "@/components/pricing/tariff-plans";
import { rentUndercutsBuy, tariffsFor, termsFor, type Tariffs } from "@/lib/pricing";

/* FAQ accordion, CSS grid-rows transitions, no animation libraries. */

/* The two answers that describe how prices work, for a market priced by card
   type (Spain) rather than by volume band. Figures from lib/pricing.ts.
   One branch per language (en, es, uk, ru) via tr(); figure() writes each
   number in that language's notation. */
function byCardAnswers(lang: Lang, c: string, t: Tariffs) {
  const f = (v: string) => figure(lang, v);
  const fx = `${c}${f(t.fixed)}`;
  return tr(
    lang,
    {
      buyOrRent: `Your rate is the same either way. Renting the terminal is ${c}${f(t.price.rent)} a month; buying it is ${c}${f(t.price.buy)}, once – both including VAT. Neither has a minimum term.`,
      howDecided: `By the kind of card your customer pays with. Up to ${c}${f(t.cap)} a month in card sales you're on Light: ${f(t.rates.consumer)}% + ${fx} on consumer cards from the EU, ${f(t.rates.corporate)}% + ${fx} on corporate cards from the EU and ${f(t.rates.foreign)}% + ${fx} on cards from outside the EU. Above ${c}${f(t.cap)} a month we agree an Individual rate with you – talk to us and we'll confirm it within one business day.`,
    },
    {
      buyOrRent: `Tu tarifa es la misma en ambos casos. Alquilar el terminal cuesta ${c}${f(t.price.rent)} al mes; comprarlo, ${c}${f(t.price.buy)} una sola vez, IVA incluido en ambos casos. Ninguna de las dos opciones tiene permanencia.`,
      howDecided: `Según el tipo de tarjeta con la que paga tu cliente. Hasta ${c}${f(t.cap)} al mes en ventas con tarjeta tienes la tarifa Light: ${f(t.rates.consumer)}% + ${fx} con tarjetas de consumo de la UE, ${f(t.rates.corporate)}% + ${fx} con tarjetas corporativas de la UE y ${f(t.rates.foreign)}% + ${fx} con tarjetas de fuera de la UE. Por encima de ${c}${f(t.cap)} al mes acordamos contigo una tarifa Individual: habla con nosotros y la confirmamos en un día hábil.`,
    },
    {
      buyOrRent: `Ваша ставка однакова в обох випадках. Оренда термінала коштує ${c}${f(t.price.rent)} на місяць, купівля – ${c}${f(t.price.buy)} одноразово, в обох випадках з ПДВ. Мінімального терміну немає в жодному з варіантів.`,
      howDecided: `Залежно від типу картки, якою платить ваш клієнт. Якщо ваші продажі карткою становлять до ${c}${f(t.cap)} на місяць, діє тариф Light: ${f(t.rates.consumer)}% + ${fx} для особистих карток із ЄС, ${f(t.rates.corporate)}% + ${fx} для корпоративних карток із ЄС і ${f(t.rates.foreign)}% + ${fx} для карток, випущених за межами ЄС. Якщо продажі перевищують ${c}${f(t.cap)} на місяць, ми погоджуємо з вами тариф Individual – зв’яжіться з нами, і ми підтвердимо його протягом одного робочого дня.`,
    },
    {
      buyOrRent: `Ваша ставка одинакова в обоих случаях. Аренда терминала стоит ${c}${f(t.price.rent)} в месяц, покупка – ${c}${f(t.price.buy)} единоразово, в обоих случаях с НДС. Минимального срока нет ни в одном из вариантов.`,
      howDecided: `В зависимости от типа карты, которой платит ваш клиент. Если ваши продажи картой составляют до ${c}${f(t.cap)} в месяц, действует тариф Light: ${f(t.rates.consumer)}% + ${fx} для личных карт из ЕС, ${f(t.rates.corporate)}% + ${fx} для корпоративных карт из ЕС и ${f(t.rates.foreign)}% + ${fx} для карт, выпущенных за пределами ЕС. Если продажи превышают ${c}${f(t.cap)} в месяц, мы согласуем с вами тариф Individual – свяжитесь с нами, и мы подтвердим его в течение одного рабочего дня.`,
    },
  );
}

export function Faq() {
  const { country, lang } = useCountry();
  const register = promotesRegister(country);
  /* Not every market prices renting below buying – in the UK the rate follows
     the volume band alone. Answering "renting is cheaper per transaction"
     everywhere would be untrue there, so ask lib/pricing rather than assume. */
  const rentCheaper = rentUndercutsBuy(termsFor(country));
  /* UK merchants are acquired by the FCA-authorised company, not the EEA one
     (lib/legal.ts emiPartner) – "EU acquirer" would be untrue there. */
  const uk = country.code === "uk";
  const tariffs = tariffsFor(country);
  const byCard = tariffs ? byCardAnswers(lang, country.currencySymbol, tariffs) : null;
  const c = tr(
    lang,
    {
      title: "Frequently asked questions",
      leadA: "Have a question we haven't answered?",
      talk: "Talk to us",
      faqs: [
        { q: "What's included in the price?", a: register ? "Everything: the VAT-approved cash register and payment terminal, plus the Merchant Portal. No separate software subscription, no per-feature charges." : "Everything: the payment terminal and the Merchant Portal. No separate software subscription, no per-feature charges." },
        { q: "Do I need to open a new bank account?", a: `No. Payments are processed by a licensed ${uk ? "UK" : "EU"} acquirer, and your payouts go to the bank account you already have – no new account, nothing to switch.` },
        { q: "When do I get my money?", a: "Next business day (T+1). The portal shows exactly what's confirmed to pay you – net of commission, clearly shown." },
        { q: "Are there any hidden fees?", a: "No. Your commission is shown up front on every settlement in the portal. No setup fees, no monthly minimums, no surprise line items in a PDF statement." },
        { q: "How fast can I start taking payments?", a: register ? "Usually four business days or less from signing up to going live – including fiscal registration of the device for your market." : "Usually four business days or less from signing up to going live." },
        { q: "Buy or rent – which is cheaper?", a: byCard ? byCard.buyOrRent : rentCheaper ? "Renting keeps your upfront cost low with a small monthly fee and a slightly lower transaction rate, on a one-year term. Buying is a one-off device cost with no minimum term. Either way, the same three volume bands apply." : "Your rate is the same either way – it follows your monthly card volume, not how you got the device. Renting is a monthly fee that falls as your volume grows; buying is a one-off device cost with nothing monthly. Either way, the same three volume bands apply." },
        { q: "How is my rate decided?", a: byCard ? byCard.howDecided : "By your monthly card volume – the more you take, the lower the rate. Pick the band that fits on the table above; if you're near an edge or want a tailored quote, talk to us and we'll confirm your rate within one business day." },
      ],
    },
    {
      title: "Preguntas frecuentes",
      leadA: "¿Tienes una pregunta que no hemos respondido?",
      talk: "Habla con nosotros",
      faqs: [
        { q: "¿Qué incluye el precio?", a: register ? "Todo: la caja registradora fiscal aprobada y el terminal de pago, más el Merchant Portal. Sin suscripción de software aparte ni cargos por función." : "Todo: el terminal de pago y el Merchant Portal. Sin suscripción de software aparte ni cargos por función." },
        { q: "¿Necesito abrir una cuenta bancaria nueva?", a: "No. Los pagos los procesa un adquirente autorizado en la UE, y tus cobros llegan a la cuenta bancaria que ya tienes: sin cuenta nueva y sin nada que cambiar." },
        { q: "¿Cuándo recibo mi dinero?", a: "Al día hábil siguiente (T+1). El portal muestra exactamente lo que está confirmado para pagarte, neto de comisión y con total claridad." },
        { q: "¿Hay comisiones ocultas?", a: "No. Tu comisión se muestra por adelantado en cada liquidación en el portal. Sin cuotas de alta, sin mínimos mensuales, sin líneas sorpresa en un PDF." },
        { q: "¿En cuánto tiempo puedo empezar a cobrar?", a: register ? "Normalmente, en cuatro días hábiles o menos, desde el alta hasta estar operativo, incluida la registración fiscal del dispositivo para tu mercado." : "Normalmente, en cuatro días hábiles o menos, desde el alta hasta estar operativo." },
        { q: "¿Comprar o alquilar? ¿Qué sale más barato?", a: byCard ? byCard.buyOrRent : rentCheaper ? "Alquilar mantiene bajo el coste inicial con una pequeña cuota mensual y una tarifa por operación algo más baja, con permanencia de un año. Comprar es un coste único del dispositivo, sin permanencia. En ambos casos aplican los mismos tres tramos por volumen." : "Tu tarifa es la misma en ambos casos: depende de tu volumen mensual con tarjeta, no de cómo conseguiste el dispositivo. El alquiler es una cuota mensual que baja según crece tu volumen; comprar es un coste único, sin cuota mensual. En ambos casos aplican los mismos tres tramos por volumen." },
        { q: "¿Cómo se decide mi tarifa?", a: byCard ? byCard.howDecided : "Según tu volumen mensual con tarjeta: cuanto más cobras, más baja la tarifa. Elige el tramo que encaja en la tabla de arriba; si estás cerca de un límite o quieres una oferta a medida, habla con nosotros y confirmamos tu tarifa en un día hábil." },
      ],
    },
    {
      title: "Поширені запитання",
      leadA: "Маєте запитання, на яке ми не відповіли?",
      talk: "Зв’яжіться з нами",
      faqs: [
        { q: "Що входить у ціну?", a: register ? "Усе: касовий апарат, схвалений податковою, і платіжний термінал, а також Merchant Portal. Жодної окремої підписки на програмне забезпечення, жодної оплати за окремі функції." : "Усе: платіжний термінал і Merchant Portal. Жодної окремої підписки на програмне забезпечення, жодної оплати за окремі функції." },
        { q: "Чи потрібно відкривати новий банківський рахунок?", a: `Ні. Платежі обробляє ліцензований еквайр ${uk ? "у Великій Британії" : "у ЄС"}, а виплати надходять на ваш наявний банківський рахунок – жодного нового рахунку, нічого не потрібно змінювати.` },
        { q: "Коли я отримаю свої гроші?", a: "Наступного робочого дня (T+1). У порталі точно видно, яку суму підтверджено до виплати, – за вирахуванням комісії, яку чітко показано." },
        { q: "Чи є приховані комісії?", a: "Ні. Вашу комісію заздалегідь показано для кожного зарахування коштів у порталі. Жодних платежів за підключення, жодних щомісячних мінімумів, жодних несподіваних рядків у PDF-виписці." },
        { q: "Як швидко я можу почати приймати платежі?", a: register ? "Зазвичай чотири робочі дні або менше від підписання договору до запуску – включно з фіскальною реєстрацією пристрою для вашого ринку." : "Зазвичай чотири робочі дні або менше від підписання договору до запуску." },
        { q: "Купити чи орендувати – що вигідніше?", a: byCard ? byCard.buyOrRent : rentCheaper ? "З орендою стартові витрати низькі: невелика щомісячна плата і трохи нижча ставка за транзакцію, договір на один рік. Купівля – це одноразова оплата пристрою без мінімального терміну. В обох випадках діють ті самі три діапазони обороту." : "Ваша ставка однакова в обох випадках – вона залежить від ваших продажів карткою за місяць, а не від того, як ви отримали пристрій. Оренда – це щомісячна плата, яка знижується зі зростанням обороту; купівля – одноразова оплата пристрою без щомісячних платежів. В обох випадках діють ті самі три діапазони обороту." },
        { q: "Як визначається моя ставка?", a: byCard ? byCard.howDecided : "Залежно від ваших продажів карткою за місяць – що більше ви приймаєте, то нижча ставка. Оберіть відповідний діапазон у таблиці вище; якщо ви близько до межі або хочете індивідуальну пропозицію, зв’яжіться з нами, і ми підтвердимо вашу ставку протягом одного робочого дня." },
      ],
    },
    {
      title: "Частые вопросы",
      leadA: "Есть вопрос, на который мы не ответили?",
      talk: "Свяжитесь с нами",
      faqs: [
        { q: "Что входит в цену?", a: register ? "Всё: кассовый аппарат, одобренный налоговой, и платёжный терминал, а также Merchant Portal. Никакой отдельной подписки на программное обеспечение, никакой платы за отдельные функции." : "Всё: платёжный терминал и Merchant Portal. Никакой отдельной подписки на программное обеспечение, никакой платы за отдельные функции." },
        { q: "Нужно ли открывать новый банковский счёт?", a: `Нет. Платежи обрабатывает лицензированный эквайер ${uk ? "в Великобритании" : "в ЕС"}, а выплаты поступают на ваш текущий банковский счёт – никакого нового счёта, ничего не нужно менять.` },
        { q: "Когда я получу свои деньги?", a: "На следующий рабочий день (T+1). В портале точно видно, какая сумма подтверждена к выплате, – за вычетом комиссии, которая чётко показана." },
        { q: "Есть ли скрытые комиссии?", a: "Нет. Ваша комиссия заранее показана по каждому зачислению средств в портале. Никаких платежей за подключение, никаких ежемесячных минимумов, никаких неожиданных строк в PDF-выписке." },
        { q: "Как быстро я смогу начать принимать платежи?", a: register ? "Обычно четыре рабочих дня или меньше от подписания договора до запуска – включая фискальную регистрацию устройства для вашего рынка." : "Обычно четыре рабочих дня или меньше от подписания договора до запуска." },
        { q: "Купить или арендовать – что выгоднее?", a: byCard ? byCard.buyOrRent : rentCheaper ? "С арендой начальные расходы низкие: небольшая ежемесячная плата и немного более низкая ставка за транзакцию, договор на один год. Покупка – это единоразовая оплата устройства без минимального срока. В обоих случаях действуют те же три диапазона оборота." : "Ваша ставка одинакова в обоих случаях – она зависит от вашего оборота по картам за месяц, а не от того, как вы получили устройство. Аренда – это ежемесячная плата, которая снижается по мере роста оборота; покупка – единоразовая оплата устройства без ежемесячных платежей. В обоих случаях действуют те же три диапазона оборота." },
        { q: "Как определяется моя ставка?", a: byCard ? byCard.howDecided : "В зависимости от вашего оборота по картам за месяц – чем больше вы принимаете, тем ниже ставка. Выберите подходящий диапазон в таблице выше; если вы близки к границе или хотите индивидуальное предложение, свяжитесь с нами, и мы подтвердим вашу ставку в течение одного рабочего дня." },
      ],
    },
  );

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="eyebrow">FAQ</span>
        <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,40px)] leading-[1.06]">{c.title}</h2>
        <p className="mx-auto mt-4 max-w-130 text-[16px] leading-relaxed text-ink-2">
          {c.leadA}{" "}
          <Link href="/contact" className="font-semibold text-brand hover:text-brand-d">
            {c.talk}
          </Link>
          .
        </p>
      </div>
      <div className="mt-10 space-y-3">
        {c.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`rounded-2xl border bg-white transition-colors duration-200 ${isOpen ? "border-brand/40" : "border-line hover:border-line-2"}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-[16px] font-semibold tracking-tight">{f.q}</span>
                <span className={`grid size-7 shrink-0 place-items-center rounded-full bg-bg-2 text-ink-2 transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-tint text-brand" : ""}`}>
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-ink-2">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
