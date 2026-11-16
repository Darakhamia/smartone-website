import type { Lang } from "./countries";

/* Pick the copy for the active language: English, Spanish, Ukrainian,
   Russian – every call gives all four, so no page can fall back to another
   language unnoticed. Ukrainian and Russian are offered in Spain only
   (lib/countries.ts). Product names (SmartOne …, Merchant Portal, Click,
   Verifactu, T+1) are never translated. */
export function tr<T>(lang: Lang, en: T, es: T, uk: T, ru: T): T {
  return { en, es, uk, ru }[lang];
}

/* Lightweight UI dictionary for the persistent chrome (nav, footer) and the
   country picker. Marketing page bodies remain in English until localised
   copy is provided – this covers the surfaces that are always on screen and
   the language toggle itself. Product names (SmartOne …) are never
   translated. */

export type Dict = {
  nav: {
    product: string;
    pricing: string;
    industries: string;
    about: string;
    cases: string;
    getStarted: string;
    region: string;
    language: string;
  };
  welcome: {
    kicker: string;
    heading: string;
    lead: string;
    choose: string;
    chooseSub: string;
    change: string;
    included: string;
    noFiscal: string;
    fiscal: string;
    verifactu: string;
    language: string;
    languageSub: string;
  };
  footer: {
    tagline: string;
    product: string;
    industries: string;
    company: string;
  };
};

export const DICT: Record<Lang, Dict> = {
  en: {
    nav: {
      product: "Product",
      pricing: "Pricing",
      industries: "Industries",
      about: "About",
      cases: "Case studies",
      getStarted: "Get started →",
      region: "Region",
      language: "Language",
    },
    welcome: {
      kicker: "Welcome to SmartOne",
      heading: "Payments and business tools in one connected ecosystem.",
      lead: "Choose your country to see the products, pricing and compliance that apply where you trade.",
      choose: "Choose your country",
      chooseSub: "You can change this anytime from the top of the site.",
      change: "You can change this anytime.",
      included: "What's included",
      noFiscal: "Card payments · Merchant Portal · business tools",
      fiscal: "Card payments · fiscal receipts · Merchant Portal",
      verifactu: "Verifactu-ready for the 2027 deadline",
      language: "Choose your language",
      languageSub: "Which language should we open the site in?",
    },
    footer: {
      tagline:
        "SmartOne provides connected payment and business solutions for modern merchants.",
      product: "Product",
      industries: "Industries",
      company: "Company",
    },
  },
  es: {
    nav: {
      product: "Producto",
      pricing: "Precios",
      industries: "Sectores",
      about: "Nosotros",
      cases: "Casos de éxito",
      getStarted: "Empezar →",
      region: "Región",
      language: "Idioma",
    },
    welcome: {
      kicker: "Bienvenido a SmartOne",
      heading: "Pagos y herramientas de negocio en un único ecosistema conectado.",
      lead: "Elige tu país para ver los productos, los precios y el cumplimiento que aplican donde operas.",
      choose: "Elige tu país",
      chooseSub: "Puedes cambiarlo cuando quieras desde la parte superior del sitio.",
      change: "Puedes cambiarlo cuando quieras.",
      included: "Qué incluye",
      noFiscal: "Pagos con tarjeta · Portal del comercio · herramientas de negocio",
      fiscal: "Pagos con tarjeta · tickets fiscales · Portal del comercio",
      verifactu: "Preparado para Verifactu antes del plazo de 2027",
      language: "Elige tu idioma",
      languageSub: "¿En qué idioma abrimos el sitio?",
    },
    footer: {
      tagline:
        "SmartOne ofrece soluciones conectadas de pago y de negocio para comercios modernos.",
      product: "Producto",
      industries: "Sectores",
      company: "Empresa",
    },
  },
  uk: {
    nav: {
      product: "Продукт",
      pricing: "Ціни",
      industries: "Галузі",
      about: "Про нас",
      cases: "Кейси",
      getStarted: "Почати →",
      region: "Регіон",
      language: "Мова",
    },
    welcome: {
      kicker: "Вітаємо в SmartOne",
      heading: "Платежі та інструменти для бізнесу в одній зв’язаній екосистемі.",
      lead: "Оберіть свою країну, щоб побачити продукти, ціни та вимоги, що діють там, де ви працюєте.",
      choose: "Оберіть свою країну",
      chooseSub: "Змінити її можна будь-коли у верхній частині сайту.",
      change: "Змінити можна будь-коли.",
      included: "Що входить",
      noFiscal: "Оплата карткою · Merchant Portal · інструменти для бізнесу",
      fiscal: "Оплата карткою · фіскальні чеки · Merchant Portal",
      verifactu: "Готовий до Verifactu до терміну 2027 року",
      language: "Оберіть мову",
      languageSub: "Якою мовою відкрити сайт?",
    },
    footer: {
      tagline: "SmartOne пропонує зв’язані платіжні та бізнес-рішення для сучасних підприємців.",
      product: "Продукт",
      industries: "Галузі",
      company: "Компанія",
    },
  },
  ru: {
    nav: {
      product: "Продукт",
      pricing: "Цены",
      industries: "Отрасли",
      about: "О нас",
      cases: "Кейсы",
      getStarted: "Начать →",
      region: "Регион",
      language: "Язык",
    },
    welcome: {
      kicker: "Добро пожаловать в SmartOne",
      heading: "Платежи и инструменты для бизнеса в одной связанной экосистеме.",
      lead: "Выберите свою страну, чтобы увидеть продукты, цены и требования, которые действуют там, где вы работаете.",
      choose: "Выберите свою страну",
      chooseSub: "Изменить её можно в любой момент в верхней части сайта.",
      change: "Изменить можно в любой момент.",
      included: "Что входит",
      noFiscal: "Оплата картой · Merchant Portal · инструменты для бизнеса",
      fiscal: "Оплата картой · фискальные чеки · Merchant Portal",
      verifactu: "Готов к Verifactu до срока 2027 года",
      language: "Выберите язык",
      languageSub: "На каком языке открыть сайт?",
    },
    footer: {
      tagline: "SmartOne предлагает связанные платёжные и бизнес-решения для современных предпринимателей.",
      product: "Продукт",
      industries: "Отрасли",
      company: "Компания",
    },
  },
};
