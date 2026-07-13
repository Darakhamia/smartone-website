import type { Lang } from "./countries";

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
    login: string;
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
    disclaimer: string;
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
      login: "Log in",
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
      disclaimer:
        "Product availability may vary by country. Payment services may be provided by authorised financial partners. Settlement times are subject to banking days and the agreed commercial terms.",
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
      login: "Iniciar sesión",
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
      disclaimer:
        "La disponibilidad de los productos puede variar según el país. Los servicios de pago pueden ser prestados por socios financieros autorizados. Los plazos de liquidación dependen de los días bancarios y de las condiciones comerciales acordadas.",
      product: "Producto",
      industries: "Sectores",
      company: "Empresa",
    },
  },
};
