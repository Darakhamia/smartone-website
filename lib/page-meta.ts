import { tr } from "./dictionaries";
import { promotesRegister, terminalModel, TERMINAL_MODELS, type Country, type Lang } from "./countries";

/* Title and description of every indexable page, per market and language.

   One URL serves every country, so these are resolved per request from the
   country/language cookies (generateMetadata on each page). A crawler arrives
   without cookies and gets DEFAULT_COUNTRY_CODE (Malta) – that variant matters
   most for search, so it carries Malta's search terms: VAT-approved fiscal cash
   register, card machine, card terminal, POS, fiscal receipt.

   The product rules hold here as they do in the page bodies:
   – the cash register is named only where promotesRegister() is true;
   – the terminal model is the one terminalModel() gives the market.
   Spanish, Ukrainian and Russian are seen only by visitors from Spain, so those
   variants speak about Spain (TPV, datáfono, Verifactu).

   Titles are written whole (title.absolute – the layout's "%s – SmartOne"
   template is not applied) and kept to 50–60 characters; descriptions to
   ~155. They say nothing the pages themselves don't. Draft for review (Nadia,
   SEO/GEO audit of 17.11.2026, points 7 and 9). */

export type PageMeta = { title: string; description: string };

type Ctx = {
  country: Country;
  lang: Lang;
  /** the cash register is promoted here (Malta) */
  register: boolean;
  spain: boolean;
  /** "Malta", "Spain", "Cyprus", "Slovakia", "the UK" */
  where: string;
  /** the one terminal model this market shows */
  device: string;
};

const PAGES = {
  home: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      x.register
        ? {
            title: "VAT-Approved Cash Register & Card Machine, Malta – SmartOne",
            description:
              "A VAT-approved fiscal cash register, card terminal and receipt printer in one device – with the Merchant Portal, clear fees and payouts to your own bank.",
          }
        : x.spain
          ? {
              title: "Verifactu-Ready Card Terminal for Spain – SmartOne",
              description:
                "A payment terminal and business tools in one device, Verifactu-ready for 2027 – with clear fees, not fine print, and payouts to your own bank.",
            }
          : {
              title: `Card ${x.country.code === "uk" ? "Machine" : "Terminal"} for Small Businesses in ${x.where} – SmartOne`,
              description: `A payment terminal and business tools in one device for businesses in ${x.where} – with clear fees, not fine print, and payouts to your own bank.`,
            },
      {
        title: "TPV y datáfono para tu negocio, listo para Verifactu",
        description:
          "Un terminal de pago y herramientas de negocio en un solo equipo, preparado para Verifactu 2027. Comisiones claras, sin letra pequeña, y cobros en tu banco.",
      },
      {
        title: "Платіжний термінал SmartOne, готовий до Verifactu в Іспанії",
        description:
          "Платіжний термінал та інструменти для бізнесу в одному пристрої, готові до Verifactu 2027. Прозорі комісії без дрібного шрифту, виплати у ваш банк.",
      },
      {
        title: "Платёжный терминал в Испании, готовый к Verifactu – SmartOne",
        description:
          "Платёжный терминал и инструменты для бизнеса в одном устройстве, готовые к Verifactu 2027. Прозрачные комиссии без мелкого шрифта, выплаты в ваш банк.",
      },
    ),

  product: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      x.register
        ? {
            title: "POS in Malta: Card Terminal and Fiscal Cash Register in One",
            description:
              "One VAT-approved device: a fiscal cash register, card terminal and receipt printer, with the Merchant Portal behind it. Not just a card machine.",
          }
        : {
            title: `POS and Card Terminal for Businesses in ${x.where} – SmartOne`,
            description: `The ${x.device} payment terminal and the Merchant Portal, plus Click for cafés and restaurants – the complete solution, not just a card machine.`,
          },
      {
        title: "TPV y datáfono SmartOne con Merchant Portal para tu negocio",
        description:
          "El datáfono SmartOne Bank y el Merchant Portal, más Click para cafeterías y restaurantes: la solución completa para tu negocio en España, no solo un datáfono.",
      },
      {
        title: "POS-термінал і Merchant Portal для бізнесу в Іспанії",
        description:
          "Платіжний термінал SmartOne Bank і Merchant Portal, а також Click для кав’ярень і ресторанів – повне рішення для бізнесу в Іспанії, а не лише термінал.",
      },
      {
        title: "POS-терминал и Merchant Portal для бизнеса в Испании",
        description:
          "Платёжный терминал SmartOne Bank и Merchant Portal, а также Click для кафе и ресторанов – полное решение для бизнеса в Испании, а не просто терминал.",
      },
    ),

  terminals: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      x.register
        ? {
            title: "SmartOne Bank Pro S: Dual-Screen Card Machine in Malta",
            description:
              "The SmartOne Bank Pro S card terminal: card, contactless and cash, a second screen facing the customer and the receipt printer built in. 4G and Wi-Fi.",
          }
        : {
            title: `${x.device}: Card Terminal with Printer in ${x.where}`,
            description: `The ${x.device} payment terminal takes card, contactless and cash on one screen, with the receipt printer built in. 4G, Wi-Fi and a battery for the shift.`,
          },
      {
        title: "Datáfono SmartOne Bank: TPV con impresora de tickets",
        description:
          "El datáfono SmartOne Bank cobra con tarjeta, contactless y efectivo en una pantalla táctil de 5″, con la impresora de tickets integrada. 4G y Wi-Fi.",
      },
      {
        title: "SmartOne Bank: платіжний термінал із принтером чеків",
        description:
          "Термінал SmartOne Bank приймає картки, безконтактну оплату й готівку на 5″ сенсорному екрані, з вбудованим принтером чеків. 4G і Wi-Fi.",
      },
      {
        title: "SmartOne Bank: платёжный терминал с принтером чеков",
        description:
          "Терминал SmartOne Bank принимает карты, бесконтактную оплату и наличные на 5″ сенсорном экране, со встроенным принтером чеков. 4G и Wi-Fi.",
      },
    ),

  cashRegister: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      x.register
        ? {
            title: "VAT-Approved Fiscal Cash Register in Malta – SmartOne",
            description:
              "A VAT-approved fiscal cash register built into your card terminal: fiscal receipts, Z-reports and the device's fiscal registration, in one box on the counter.",
          }
        : x.spain
          ? {
              title: "Verifactu 2027 in Spain: a Verifactu-Ready Device – SmartOne",
              description:
                "SmartOne is built for Spain's Verifactu programme ahead of the 2027 deadline. When the rules change, your device is ready – no new hardware needed.",
            }
          : x.country.fiscal
            ? {
                title: `Fiscal Requirements in ${x.where}: a Fiscal-Ready Terminal`,
                description: `Your market doesn't require a fiscal register from you today. When the rules change in ${x.where}, your SmartOne device is ready – no new hardware.`,
              }
            : {
                title: "No Fiscal Register Needed in the UK – SmartOne Terminals",
                description:
                  "The UK doesn't require a fiscal register, so we don't sell you one. You get card payments and the Merchant Portal, ready to go.",
              },
      {
        title: "Verifactu 2027: datáfono y TPV SmartOne preparados a tiempo",
        description:
          "SmartOne está preparado para Verifactu antes del plazo de 2027. Cuando cambien las normas, tu equipo ya está listo: sin hardware nuevo en el mostrador.",
      },
      {
        title: "Verifactu 2027 в Іспанії: термінал, готовий заздалегідь",
        description:
          "SmartOne готовий до Verifactu ще до терміну 2027 року. Коли правила зміняться, ваш пристрій уже готовий – без нового обладнання на прилавку.",
      },
      {
        title: "Verifactu 2027 в Испании: терминал, готовый заранее",
        description:
          "SmartOne готов к Verifactu ещё до срока 2027 года. Когда правила изменятся, ваше устройство уже готово – без нового оборудования на прилавке.",
      },
    ),

  tapToPhone: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "SmartOne Tap to Phone – Contactless Payments on a Phone",
        description:
          "Take contactless card and wallet payments on a phone – no extra hardware, no separate terminal. SmartOne Tap to Phone is in certification, coming soon.",
      },
      {
        title: "SmartOne Tap to Phone: cobra con el móvil, sin datáfono",
        description:
          "Acepta pagos contactless con tarjeta y wallet en un móvil, sin hardware adicional ni terminal aparte. SmartOne Tap to Phone está en certificación.",
      },
      {
        title: "SmartOne Tap to Phone: безконтактна оплата на смартфоні",
        description:
          "Приймайте безконтактну оплату карткою та гаманцями на телефоні – без додаткового обладнання й окремого термінала. Tap to Phone проходить сертифікацію.",
      },
      {
        title: "SmartOne Tap to Phone: бесконтактная оплата на смартфоне",
        description:
          "Принимайте бесконтактную оплату картой и кошельками на телефоне – без дополнительного оборудования и отдельного терминала. Tap to Phone проходит сертификацию.",
      },
    ),

  pricing: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      x.register
        ? {
            title: "Card Machine Fees & Cash Register Price in Malta – SmartOne",
            description:
              "One rate per monthly card-volume band, every fee shown up front. No settlement, minimum or inactivity fees. Buy the terminal or rent it – your call.",
          }
        : x.spain
          ? {
              title: "Card Terminal Pricing in Spain: Clear Rates – SmartOne",
              description:
                "One clear rate for each kind of card, every fee shown up front. No settlement, minimum or inactivity fees. Buy the terminal or rent it – your call.",
            }
          : {
              title: `Card Terminal Fees in ${x.where}: Transparent Rates – SmartOne`,
              description:
                "One rate per monthly card-volume band, every fee shown up front. No settlement, minimum or inactivity fees. Buy the terminal or rent it – your call.",
            },
      {
        title: "Precio del datáfono: tarifas claras por tarjeta – SmartOne",
        description:
          "Una tarifa clara para cada tipo de tarjeta y cada comisión visible desde el principio. Sin comisión de liquidación, mínimos ni inactividad. Compra o alquila.",
      },
      {
        title: "Ціни на платіжний термінал в Іспанії: тарифи – SmartOne",
        description:
          "Зрозумілий тариф для кожного типу картки, усі комісії видно одразу. Без комісії за виплату, мінімальних платежів і плати за неактивність. Купівля чи оренда.",
      },
      {
        title: "Цены на платёжный терминал в Испании: тарифы – SmartOne",
        description:
          "Понятный тариф для каждого типа карты, все комиссии видны сразу. Без комиссии за выплату, минимальных платежей и платы за неактивность. Покупка или аренда.",
      },
    ),

  merchantPortal: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "SmartOne Merchant Portal: Sales, Card Fees and Payouts",
        description: x.register
          ? "Track sales, card payments, cash-register shifts, fees and settlements across every store and terminal – from one secure portal. Included with every terminal."
          : "Track sales, card payments, fees and settlements across every store and terminal – from one secure portal. Included with every SmartOne terminal.",
      },
      {
        title: "SmartOne Merchant Portal: ventas, comisiones y liquidaciones",
        description:
          "Controla ventas, pagos con tarjeta, comisiones y liquidaciones de cada tienda y terminal desde un único portal seguro. Incluido con cada terminal SmartOne.",
      },
      {
        title: "SmartOne Merchant Portal: продажі, комісії та виплати",
        description:
          "Відстежуйте продажі, оплату карткою, комісії та зарахування коштів у всіх магазинах і терміналах – з одного захищеного порталу. Входить у кожен термінал.",
      },
      {
        title: "SmartOne Merchant Portal: продажи, комиссии и выплаты",
        description:
          "Отслеживайте продажи, оплату картой, комиссии и зачисление средств по всем магазинам и терминалам – с одного защищённого портала. Входит в каждый терминал.",
      },
    ),

  industries: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "Card Terminal & POS for Retail, Cafés and Salons – SmartOne",
        description:
          "One device, your kind of business: festivals and events, retail, cafés and HoReCa, beauty and wellness, mobile and street vendors.",
      },
      {
        title: "TPV y datáfono para tiendas, cafeterías y salones – SmartOne",
        description:
          "Un dispositivo para tu tipo de negocio: festivales y eventos, retail, cafeterías y HoReCa, belleza y bienestar, venta ambulante y en la calle.",
      },
      {
        title: "Термінал для магазинів, кав’ярень і салонів краси – SmartOne",
        description:
          "Один пристрій для вашого бізнесу: фестивалі та заходи, роздрібна торгівля, кав’ярні та HoReCa, краса та здоров’я, торгівля на виїзді й на вулиці.",
      },
      {
        title: "Терминал для магазинов, кафе и салонов красоты – SmartOne",
        description:
          "Одно устройство для вашего бизнеса: фестивали и мероприятия, розничная торговля, кафе и HoReCa, красота и здоровье, торговля на выезде и на улице.",
      },
    ),

  click: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "SmartOne Click – Restaurant POS and Kitchen Display System",
        description:
          "SmartOne Click runs your restaurant from one platform: menus, staff, tables, orders, POS, kitchen display, multiple locations and business analytics.",
      },
      {
        title: "SmartOne Click: TPV para restaurantes y pantalla de cocina",
        description:
          "SmartOne Click gestiona tu restaurante desde una sola plataforma: cartas, personal, mesas, pedidos, TPV, pantalla de cocina, varios locales y analítica.",
      },
      {
        title: "SmartOne Click: POS для ресторанів і кухонний екран",
        description:
          "SmartOne Click – керування рестораном з однієї платформи: меню, персонал, столи, замовлення, POS, кухонний екран, кілька закладів і аналітика.",
      },
      {
        title: "SmartOne Click: POS для ресторанов и кухонный экран",
        description:
          "SmartOne Click – управление рестораном с одной платформы: меню, персонал, столы, заказы, POS, кухонный экран, несколько заведений и аналитика.",
      },
    ),

  spain: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "Verifactu 2027 in Spain: Be Ready Ahead of Time – SmartOne",
        description:
          "SmartOne is Verifactu-ready for Spain's 2027 deadline – a fiscal device with card payments in one box. Talk to us and be ready ahead of time.",
      },
      {
        title: "Verifactu 2027: prepara tu negocio a tiempo con SmartOne",
        description:
          "SmartOne está preparado para el plazo de Verifactu 2027 en España: un dispositivo fiscal con pagos con tarjeta en un solo equipo. Habla con nosotros.",
      },
      {
        title: "Verifactu 2027 в Іспанії: підготуйтеся заздалегідь",
        description:
          "SmartOne готовий до Verifactu ще до терміну 2027 року в Іспанії – фіскальний пристрій і оплата карткою в одному корпусі. Зв’яжіться з нами.",
      },
      {
        title: "Verifactu 2027 в Испании: подготовьтесь заранее со SmartOne",
        description:
          "SmartOne готов к Verifactu ещё до срока 2027 года в Испании – фискальное устройство и оплата картой в одном корпусе. Свяжитесь с нами.",
      },
    ),

  about: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "About SmartOne – Payment Technology for Small Businesses",
        description:
          "SmartOne is a European fintech company for small businesses: 200,000+ SmartOne terminals deployed worldwide and SmartOne projects in 15 countries.",
      },
      {
        title: "Sobre SmartOne: tecnología de pago para pequeños negocios",
        description:
          "SmartOne es una empresa fintech europea para pymes: más de 200.000 terminales SmartOne instalados en el mundo y proyectos SmartOne en 15 países.",
      },
      {
        title: "Про SmartOne – платіжні технології для малого бізнесу",
        description:
          "SmartOne – європейська фінтех-компанія для малого бізнесу: понад 200\u00a0000 терміналів SmartOne у світі та проєкти SmartOne у 15 країнах.",
      },
      {
        title: "О SmartOne – платёжные технологии для малого бизнеса",
        description:
          "SmartOne – европейская финтех-компания для малого бизнеса: более 200\u00a0000 терминалов SmartOne в мире и проекты SmartOne в 15 странах.",
      },
    ),

  contact: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      x.register
        ? {
            title: "Contact SmartOne – Card Terminal & Cash Register in Malta",
            description:
              "Ask for your exact rate or order a card terminal with a VAT-approved cash register in Malta. Tell us about your business – we reply within one business day.",
          }
        : {
            title: `Contact SmartOne – Get a Card Terminal and Rate in ${x.where}`,
            description: `Ask for your exact rate or order a SmartOne terminal in ${x.where}. Tell us about your business – we reply within one business day.`,
          },
      {
        title: "Contacta con SmartOne: pide tu datáfono o tu tarifa exacta",
        description:
          "Pide tu tarifa exacta o solicita tu datáfono SmartOne en España. Cuéntanos sobre tu negocio y te respondemos en un día hábil.",
      },
      {
        title: "Зв’яжіться зі SmartOne: термінал і точний тариф в Іспанії",
        description:
          "Дізнайтеся свій точний тариф або замовте термінал SmartOne в Іспанії. Розкажіть про свій бізнес – ми відповімо протягом одного робочого дня.",
      },
      {
        title: "Свяжитесь со SmartOne: терминал и точный тариф в Испании",
        description:
          "Узнайте свой точный тариф или закажите терминал SmartOne в Испании. Расскажите о своём бизнесе – мы ответим в течение одного рабочего дня.",
      },
    ),

  cookies: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "Cookie Policy – Which Cookies the SmartOne Website Uses",
        description:
          "Which cookies the SmartOne website stores, what each one is for and how long it lasts. Analytics and advertising cookies are used only if you agree.",
      },
      {
        title: "Política de cookies: qué cookies usa la web de SmartOne",
        description:
          "Qué cookies guarda la web de SmartOne, para qué sirve cada una y cuánto dura. Las de analítica y publicidad solo se usan si das tu consentimiento.",
      },
      {
        title: "Політика щодо cookie – які cookie використовує SmartOne",
        description:
          "Які файли cookie зберігає сайт SmartOne, навіщо кожен із них і скільки він діє. Аналітичні й рекламні cookie – лише з вашої згоди.",
      },
      {
        title: "Политика cookie: какие файлы cookie использует сайт SmartOne",
        description:
          "Какие файлы cookie сохраняет сайт SmartOne, зачем нужен каждый из них и сколько он действует. Аналитические и рекламные cookie – только с вашего согласия.",
      },
    ),

  privacy: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "Privacy Policy – How SmartOne Handles Your Personal Data",
        description:
          "What personal data SmartOne collects through this website, why, who we share it with, and your rights under the GDPR and Malta's Data Protection Act.",
      },
      {
        title: "Política de privacidad: cómo trata SmartOne tus datos",
        description:
          "Qué datos personales recoge SmartOne en esta web, para qué, con quién los compartimos y tus derechos según el RGPD y la ley maltesa de protección de datos.",
      },
      {
        title: "Політика конфіденційності – як SmartOne обробляє ваші дані",
        description:
          "Які персональні дані SmartOne збирає через цей сайт, навіщо, з ким ними ділиться та які права ви маєте за GDPR і законом Мальти про захист даних.",
      },
      {
        title: "Конфиденциальность: как SmartOne обрабатывает ваши данные",
        description:
          "Какие персональные данные SmartOne собирает через этот сайт, зачем, кому их передаёт и какие права у вас есть по GDPR и закону Мальты о защите данных.",
      },
    ),

  imprint: (x: Ctx): PageMeta =>
    tr(
      x.lang,
      {
        title: "Legal Notice – SmartOne Company, Registration & VAT Details",
        description:
          "Who operates this website: SmartOne POS Europe Limited, registered in Malta – registration and VAT numbers, registered office, contact and payment partner.",
      },
      {
        title: "Aviso legal: datos de la empresa SmartOne, registro e IVA",
        description:
          "Quién gestiona esta web: SmartOne POS Europe Limited, registrada en Malta. Número de registro, NIF-IVA, domicilio social, contacto y socio de pagos.",
      },
      {
        title: "Юридична інформація: компанія SmartOne, реєстрація та ПДВ",
        description:
          "Хто керує сайтом: SmartOne POS Europe Limited, Мальта. Реєстраційний номер і номер ПДВ, юридична адреса, контакти й платіжний партнер.",
      },
      {
        title: "Юридическая информация: компания SmartOne, регистрация и НДС",
        description:
          "Кто управляет сайтом: SmartOne POS Europe Limited, Мальта. Регистрационный номер и номер НДС, юридический адрес, контакты и платёжный партнёр.",
      },
    ),
};

export type PageKey = keyof typeof PAGES;

export function pageMeta(page: PageKey, country: Country, lang: Lang): PageMeta {
  return PAGES[page]({
    country,
    lang,
    register: promotesRegister(country),
    spain: country.code === "es",
    where: country.code === "uk" ? "the UK" : country.name,
    device: TERMINAL_MODELS[terminalModel(country)].name,
  });
}
