"use client";

import { useRef, useState } from "react";
import { PhoneField, COUNTRY_DIAL, flag } from "@/components/lead/phone-field";
import { useCountry } from "@/components/country/country-context";
import { CardVolumeOptions } from "@/components/lead/card-volume";
import { PrivacyNote } from "@/components/lead/privacy-note";
import { fieldCls, selectCls } from "@/components/lead/styles";
import { submitLead } from "@/components/lead/submit-lead";
import { ATTRIBUTION_FIELDS } from "@/lib/attribution";
import { readFirstTouch } from "@/lib/consent";
import { tr } from "@/lib/dictionaries";
import { ACQUIRERS, HOW_HEARD, type HowHeard } from "@/lib/leads";
import { COMPANY } from "@/lib/legal";
import { LEAD_ENDPOINT } from "@/lib/links";
import { trackLead } from "@/lib/tags";

/* SmartOne lead form. Posts JSON to the Vercel serverless endpoint (no keys
   on the site) and, at the same time, to the team's Telegram group (via
   submitLead → /api/leads) – where every form's leads arrive until a CRM is
   chosen. Either one taking it counts as sent. The field `name` attributes
   and every <option> value are fixed by the endpoint contract – do not rename
   or retype them (note the en-dash in "€4,000–€15,000"). Labels, order and
   styling are ours.

   Three fields now offer more than the endpoint's own form does (its page at
   the endpoint's origin lists them): the providers in "Who processes your
   cards today?", the market's own card-sales bands (the UK's and Spain's
   differ from the endpoint's €4,000/€15,000), and the choices in "How did you
   hear about us?". Telegram gets them as chosen; the endpoint gets only what
   its contract has – see forEndpoint below. */

const ENDPOINT = LEAD_ENDPOINT;

/* What the endpoint's own form offers, exactly as it spells it. Its code is
   not in this repository, so we don't know whether it turns away a value
   outside these lists; nothing outside them is sent. */
const ENDPOINT_ACQUIRERS = ["Bank", "SumUp", "myPOS", "Zettle", "Revolut", "None", "Other"];
const ENDPOINT_VOLUMES = ["Under €4,000", "€4,000–€15,000", "Over €15,000"];

/* The payload for the endpoint: a provider it doesn't list becomes "Other",
   card sales in bands it doesn't have are left out (the field is optional
   there). how_heard is free text there, so it goes as it is. */
function forEndpoint(data: Record<string, string>): Record<string, string> {
  const out = { ...data };
  if (out.current_acquirer && !ENDPOINT_ACQUIRERS.includes(out.current_acquirer)) out.current_acquirer = "Other";
  if (out.monthly_card_volume && !ENDPOINT_VOLUMES.includes(out.monthly_card_volume)) out.monthly_card_volume = "";
  return out;
}

/* The provider names are brands and stay as they are; these three are
   translated. */
const ACQUIRER_LABEL = { Bank: "bank", None: "none", Other: "other" } as const;

/* Active country code → the exact <option value> the endpoint expects. Keep it
   in step with the options below; a value it doesn't recognise is worse than
   an empty one. */
const COUNTRY_BY_CODE: Record<string, string> = {
  mt: "Malta",
  es: "Spain",
  cy: "Cyprus",
  sk: "Slovakia",
  uk: "United Kingdom",
};

// min-height keeps the label box the same height whether it wraps to one or
// two lines, so the inputs in a row never drift out of alignment.
const labelCls = "mb-1.5 flex min-h-[34px] items-end text-[13.5px] font-medium text-ink-2";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

export function LeadForm() {
  const { country: activeCountry, lang } = useCountry();
  /* Only the display text is translated – every <option> value stays exactly
     as the endpoint contract expects it. */
  const t = tr(
    lang,
    {
      choose: "Choose…",
      name: "Your name",
      business: "Business name (optional)",
      email: "Email",
      phone: "Phone (optional)",
      countryL: "Country",
      malta: "Malta",
      spain: "Spain",
      cyprus: "Cyprus",
      slovakia: "Slovakia",
      uk: "United Kingdom",
      other: "Other",
      typeL: "Type of business",
      events: "Festivals & events",
      retail: "Retail",
      cafes: "Café & Restaurants",
      services: "Services",
      mobile: "Mobile / Street",
      acquirerL: "Who processes your cards today? (optional)",
      bank: "Bank",
      none: "None",
      volumeL: "Monthly card sales (optional)",
      messageL: "Anything you'd like to ask? (optional)",
      heardL: "How did you hear about us? (optional)",
      heardGoogle: "Google search",
      heardAi: "ChatGPT or another AI assistant",
      heardSocial: "Facebook or Instagram",
      heardRecommendation: "A recommendation",
      heardPartner: "Our partner in Malta",
      heardOtherL: "Where exactly? (optional)",
      submit: "Contact sales",
      sending: "Sending…",
      reply: "We'll reply within one business day.",
      doneTitle: "Thanks — we got it!",
      doneText: "We'll get back to you within one business day.",
      errorBefore: "Something went wrong — please try again, or email us at ",
      errorAfter: ".",
    },
    {
      choose: "Elige…",
      name: "Tu nombre",
      business: "Nombre del negocio (opcional)",
      email: "Email",
      phone: "Teléfono (opcional)",
      countryL: "País",
      malta: "Malta",
      spain: "España",
      cyprus: "Chipre",
      slovakia: "Eslovaquia",
      uk: "Reino Unido",
      other: "Otro",
      typeL: "Tipo de negocio",
      events: "Festivales y eventos",
      retail: "Retail",
      cafes: "Cafeterías y restaurantes",
      services: "Servicios",
      mobile: "Móvil / Calle",
      acquirerL: "¿Quién procesa tus tarjetas hoy? (opcional)",
      bank: "Banco",
      none: "Ninguno",
      volumeL: "Ventas mensuales con tarjeta (opcional)",
      messageL: "¿Algo que quieras preguntar? (opcional)",
      heardL: "¿Cómo nos conociste? (opcional)",
      heardGoogle: "Búsqueda en Google",
      heardAi: "ChatGPT u otro asistente de IA",
      heardSocial: "Facebook o Instagram",
      heardRecommendation: "Una recomendación",
      heardPartner: "Nuestro socio en Malta",
      heardOtherL: "¿Dónde exactamente? (opcional)",
      submit: "Contactar con ventas",
      sending: "Enviando…",
      reply: "Respondemos en un día hábil.",
      doneTitle: "¡Gracias, lo recibimos!",
      doneText: "Te responderemos en un día hábil.",
      errorBefore: "Algo salió mal. Inténtalo de nuevo o escríbenos a ",
      errorAfter: ".",
    },
    {
      choose: "Оберіть…",
      name: "Ваше ім’я",
      business: "Назва компанії (необов’язково)",
      email: "Електронна пошта",
      phone: "Телефон (необов’язково)",
      countryL: "Країна",
      malta: "Мальта",
      spain: "Іспанія",
      cyprus: "Кіпр",
      slovakia: "Словаччина",
      uk: "Велика Британія",
      other: "Інше",
      typeL: "Тип бізнесу",
      events: "Фестивалі та заходи",
      retail: "Роздрібна торгівля",
      cafes: "Кафе та ресторани",
      services: "Послуги",
      mobile: "Виїзна / вулична торгівля",
      acquirerL: "Хто зараз обробляє ваші платежі карткою? (необов’язково)",
      bank: "Банк",
      none: "Ніхто",
      volumeL: "Продажі карткою за місяць (необов’язково)",
      messageL: "Хочете щось запитати? (необов’язково)",
      heardL: "Як ви про нас дізналися? (необов’язково)",
      heardGoogle: "Пошук у Google",
      heardAi: "ChatGPT або інший ШІ-асистент",
      heardSocial: "Facebook або Instagram",
      heardRecommendation: "Рекомендація",
      heardPartner: "Наш партнер на Мальті",
      heardOtherL: "Де саме? (необов’язково)",
      submit: "Зв’язатися з нами",
      sending: "Надсилаємо…",
      reply: "Відповімо протягом одного робочого дня.",
      doneTitle: "Дякуємо — заявку отримано!",
      doneText: "Ми зв’яжемося з вами протягом одного робочого дня.",
      errorBefore: "Щось пішло не так — спробуйте ще раз або напишіть нам на ",
      errorAfter: ".",
    },
    {
      choose: "Выберите…",
      name: "Ваше имя",
      business: "Название компании (необязательно)",
      email: "Электронная почта",
      phone: "Телефон (необязательно)",
      countryL: "Страна",
      malta: "Мальта",
      spain: "Испания",
      cyprus: "Кипр",
      slovakia: "Словакия",
      uk: "Великобритания",
      other: "Другое",
      typeL: "Тип бизнеса",
      events: "Фестивали и мероприятия",
      retail: "Розничная торговля",
      cafes: "Кафе и рестораны",
      services: "Услуги",
      mobile: "Выездная / уличная торговля",
      acquirerL: "Кто сейчас обрабатывает ваши платежи картой? (необязательно)",
      bank: "Банк",
      none: "Никто",
      volumeL: "Продажи картой за месяц (необязательно)",
      messageL: "Хотите что-то спросить? (необязательно)",
      heardL: "Как вы о нас узнали? (необязательно)",
      heardGoogle: "Поиск в Google",
      heardAi: "ChatGPT или другой ИИ-ассистент",
      heardSocial: "Facebook или Instagram",
      heardRecommendation: "Рекомендация",
      heardPartner: "Наш партнёр на Мальте",
      heardOtherL: "Где именно? (необязательно)",
      submit: "Связаться с нами",
      sending: "Отправляем…",
      reply: "Ответим в течение одного рабочего дня.",
      doneTitle: "Спасибо — заявка получена!",
      doneText: "Мы свяжемся с вами в течение одного рабочего дня.",
      errorBefore: "Что-то пошло не так — попробуйте ещё раз или напишите нам на ",
      errorAfter: ".",
    },
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  /* The site already knows which region the visitor picked, so the form starts
     there instead of asking again – it stays a normal select, so anyone
     ordering from somewhere else just changes it. The values are fixed by the
     lead endpoint's contract, hence the map rather than the country name. */
  const initialCountry = COUNTRY_BY_CODE[activeCountry.code] ?? "";
  const [country, setCountry] = useState(initialCountry);
  /* "Other" opens a line to say where; the lead gets "Other: <that>". */
  const [heard, setHeard] = useState<HowHeard | "">("");
  const [heardOther, setHeardOther] = useState("");
  // our partner is in Malta, so only the Malta site offers it
  const heardOptions = HOW_HEARD.filter((h) => h !== "Our partner in Malta" || activeCountry.code === "mt");
  const heardLabel: Record<HowHeard, string> = {
    "Google search": t.heardGoogle,
    "ChatGPT or another AI assistant": t.heardAi,
    "Facebook or Instagram": t.heardSocial,
    "A recommendation": t.heardRecommendation,
    "Our partner in Malta": t.heardPartner,
    Other: t.other,
  };
  const [phone, setPhone] = useState(
    initialCountry && COUNTRY_DIAL[initialCountry] ? `+${COUNTRY_DIAL[initialCountry]} ` : "",
  );

  // pick a country → prefill the phone dial code (only if phone is empty),
  // so the flag lights up straight away
  const onCountry = (c: string) => {
    setCountry(c);
    if (!phone.trim() && COUNTRY_DIAL[c]) setPhone(`+${COUNTRY_DIAL[c]} `);
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    setStatus("sending");

    /* Fill the hidden attribution fields from first-touch storage now, not on
       mount: Marketing may be switched on or off while the form is open, and
       without it readFirstTouch returns nothing and the fields go empty.
       Walks the full shared list but fills only the fields the form has, so
       the payload stays what the endpoint expects today; when the CRM takes
       the click IDs too, adding their hidden inputs below is all it needs. */
    const saved = readFirstTouch() ?? {};
    ATTRIBUTION_FIELDS.forEach((f) => {
      const el = form.elements.namedItem(f) as HTMLInputElement | null;
      if (el) el.value = saved[f] || "";
    });

    const data: Record<string, string> = {};
    Array.from(form.elements).forEach((el) => {
      const input = el as HTMLInputElement;
      if (input.name) data[input.name] = input.value;
    });
    const detail = heardOther.trim();
    if (heard === "Other" && detail) data.how_heard = `Other: ${detail}`.slice(0, 300);

    const toEndpoint = fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forEndpoint(data)),
    }).then(
      (r) => r.ok,
      () => false,
    );
    // Telegram gets the form's own fields; submitLead adds the campaign tags
    // from first-touch storage itself, all ten of them
    const toTelegram = submitLead("contact", data, data.website);

    void Promise.all([toEndpoint, toTelegram]).then(([endpoint, telegram]) => {
      if (!endpoint && !telegram) {
        setStatus("error");
        return;
      }
      setStatus("done");
      // conversion for GA4 / Ads / Meta – a no-op unless tags were consented to and loaded
      void trackLead(data.email ?? "", data.phone ?? "", "contact");
    });
  };

  if (status === "done") {
    return (
      <div className="anim-tier-in rounded-3xl border border-line bg-white p-10 text-center shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)]">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-tint">
          <svg viewBox="0 0 24 24" className="size-7 stroke-brand" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12.5l5 5L20 6" />
          </svg>
        </span>
        <h2 className="h-display mt-5 text-[28px] leading-tight">{t.doneTitle}</h2>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{t.doneText}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={ENDPOINT}
      method="post"
      noValidate
      onSubmit={onSubmit}
      data-track="form-contact"
      className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.name}>
          <input name="name" required maxLength={200} autoComplete="name" className={fieldCls} />
        </Field>
        <Field label={t.business}>
          <input name="business_name" maxLength={200} autoComplete="organization" className={fieldCls} />
        </Field>
        <Field label={t.email}>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={fieldCls} />
        </Field>
        <Field label={t.phone}>
          <PhoneField value={phone} onChange={setPhone} className={fieldCls} />
        </Field>
        <Field label={t.countryL}>
          <select
            name="country"
            required
            value={country}
            onChange={(e) => onCountry(e.target.value)}
            className={selectCls}
          >
            <option value="" disabled>{t.choose}</option>
            <option value="Malta">{flag("MT")} {t.malta}</option>
            <option value="Spain">{flag("ES")} {t.spain}</option>
            <option value="Cyprus">{flag("CY")} {t.cyprus}</option>
            <option value="Slovakia">{flag("SK")} {t.slovakia}</option>
            <option value="United Kingdom">{flag("GB")} {t.uk}</option>
            <option value="Other">🌐 {t.other}</option>
          </select>
        </Field>
        <Field label={t.typeL}>
          <select name="business_type" required defaultValue="" className={selectCls}>
            <option value="" disabled>{t.choose}</option>
            <option value="Festivals / Events">{t.events}</option>
            <option value="Retail">{t.retail}</option>
            <option value="Cafe / HoReCa">{t.cafes}</option>
            <option value="Services">{t.services}</option>
            <option value="Mobile / Street">{t.mobile}</option>
            <option value="Other">{t.other}</option>
          </select>
        </Field>
        <Field label={t.acquirerL}>
          <select name="current_acquirer" defaultValue="" className={selectCls}>
            <option value="">{t.choose}</option>
            {ACQUIRERS.map((a) => (
              <option key={a} value={a}>
                {a in ACQUIRER_LABEL ? t[ACQUIRER_LABEL[a as keyof typeof ACQUIRER_LABEL]] : a}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.volumeL}>
          <select name="monthly_card_volume" defaultValue="" className={selectCls}>
            <option value="">{t.choose}</option>
            <CardVolumeOptions country={activeCountry} lang={lang} />
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label={t.messageL}>
          <textarea name="message" rows={3} maxLength={2000} className={`${fieldCls} resize-y`} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label={t.heardL}>
          <select
            name="how_heard"
            value={heard}
            onChange={(e) => setHeard(e.target.value as HowHeard | "")}
            className={selectCls}
          >
            <option value="">{t.choose}</option>
            {heardOptions.map((h) => (
              <option key={h} value={h}>
                {heardLabel[h]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {heard === "Other" && (
        <div className="mt-4">
          {/* no name: it travels inside how_heard, see onSubmit */}
          <Field label={t.heardOtherL}>
            <input
              value={heardOther}
              onChange={(e) => setHeardOther(e.target.value)}
              maxLength={200}
              className={fieldCls}
            />
          </Field>
        </div>
      )}

      {/* honeypot – visually hidden, must NOT be display:none, must stay in DOM */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
      />

      {/* attribution – filled in onSubmit above, don't touch */}
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="referrer_first_touch" />

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-70">
          {status === "sending" ? t.sending : t.submit}
        </button>
        <p className="text-[13px] text-ink-3">{t.reply}</p>
      </div>
      <PrivacyNote lang={lang} className="mt-4" />
      {status === "error" && (
        <p className="mt-4 rounded-xl bg-[#fbeaea] px-4 py-3 text-[13.5px] text-[#b4231f]">
          {t.errorBefore}
          <a href={`mailto:${COMPANY.email}`} className="font-semibold underline underline-offset-2">
            {COMPANY.email}
          </a>
          {t.errorAfter}
        </p>
      )}
    </form>
  );
}
