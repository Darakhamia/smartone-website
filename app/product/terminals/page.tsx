import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { TerminalGallery, type Shot } from "@/components/product/terminal-gallery";
import { RegisterFaq } from "@/components/product/register-faq";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, terminalModel, TERMINAL_MODELS, type Lang, type TerminalModel } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Terminals",
  description:
    "The SmartOne payment terminal: card, contactless and cash on one device, with the receipt printer built in. Not just a card machine.",
};

const factIcons = [
  <path key="0" d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6" />,
  <path key="1" d="M2 9a14 14 0 0 1 20 0M5.5 12.5a9 9 0 0 1 13 0M9 16a4.5 4.5 0 0 1 6 0M12 19h.01" />,
  <path key="2" d="M8 2.5h8v19H8zM10.5 5.5h3M12 18.5h.01" />,
];

const featIcons = [
  <>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19M6 15h4" />
  </>,
  <path key="p" d="M3 9h14v8H3zM17 11h3v4h-3M6 11.5v3m3-3v3m3-3v3" />,
  <path key="s" d="M9 3H5a2 2 0 0 0-2 2v3m6-5h10a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h4m6 0h4a2 2 0 0 0 2-2v-3M12 8v8m-3-5h6" />,
];

// icons for the spec highlight tiles (display, processor, battery, network, printer, security)
const highlightIcons = [
  <>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M10.5 5.5h3M11 18.5h2" />
  </>,
  <>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 2v2m3-2v2m3-2v2M9 20v2m3-2v2m3-2v2M2 9h2m-2 3h2m-2 3h2M20 9h2m-2 3h2m-2 3h2" />
  </>,
  <>
    <rect x="2" y="7" width="18" height="10" rx="2" />
    <path d="M22 10.5v3M5.5 10v4m3-4v4m3-4v4" />
  </>,
  <path key="n" d="M2 9a14 14 0 0 1 20 0M5.5 12.5a9 9 0 0 1 13 0M9 16a4.5 4.5 0 0 1 6 0M12 19h.01" />,
  <path key="pr" d="M6 9V3h12v6M6 14h12v7H6v-7ZM6 18H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M9 17h6" />,
  <path key="se" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />,
];

function copyFor(lang: Lang, model: TerminalModel) {
  const info = TERMINAL_MODELS[model];
  const { dual, dir, name } = info;
  /* Spain's SmartOne Bank is the 5″ model: its screen, battery and size
     differ, the rest of the spec sheet (Bank Pro / Bank, 16.11.2026) is the
     same as the Bank Pro's. */
  const five = model === "bank";
  // Angle set: the dual-screen model swaps the "other side" for the shot that
  // shows the customer-facing display.
  const shots: Shot[] = dual
    ? [
        { src: `${dir}/front.webp`, alt: `${name} terminal, front view`, label: tr(lang, "Front", "Frente", "Спереду", "Спереди") },
        { src: `${dir}/angle-r.webp`, alt: `${name} terminal, three-quarter view`, label: tr(lang, "Angle", "Ángulo", "Під кутом", "Под углом") },
        { src: `${dir}/dual.webp`, alt: `${name} customer-facing second screen`, label: tr(lang, "Second screen", "Segunda pantalla", "Другий екран", "Второй экран") },
        { src: `${dir}/back.webp`, alt: `${name} terminal, rear view`, label: tr(lang, "Back", "Detrás", "Ззаду", "Сзади") },
      ]
    : [
        { src: `${dir}/front.webp`, alt: `${name} terminal, front view showing the till screen`, label: tr(lang, "Front", "Frente", "Спереду", "Спереди") },
        { src: `${dir}/angle-r.webp`, alt: `${name} terminal, three-quarter view`, label: tr(lang, "Angle", "Ángulo", "Під кутом", "Под углом") },
        { src: `${dir}/angle-l.webp`, alt: `${name} terminal, opposite three-quarter view`, label: tr(lang, "Side", "Lateral", "Збоку", "Сбоку") },
        { src: `${dir}/back.webp`, alt: `${name} terminal, rear view with the built-in printer`, label: tr(lang, "Back", "Detrás", "Ззаду", "Сзади") },
      ];

  return tr(
    lang,
    {
      shots,
      heroSrc: `${dir}/hero.webp`,
      deviceName: name,
      eyebrow: "Payments · The terminal",
      h1a: "One tap.",
      h1b: "Card, contactless, cash.",
      sub: dual
        ? `The ${name} takes every kind of payment – a screen for you and one facing the customer, with the receipt printer built in. Not just a card machine.`
        : `The ${name} takes every kind of payment on one screen – with the receipt printer built in. Not just a card machine.`,
      heroAlt: `The ${name} payment terminal`,
      get: "Get a terminal →",
      seePricing: "See pricing",
      lineEyebrow: "Every angle",
      lineTitle: "One device. Every side.",
      lineSub: "Spin around it: it prints, it lasts, it connects – wherever your counter is.",
      deviceFor: dual ? "The dual-screen terminal" : "The all-in-one terminal",
      deviceText: dual
        ? "Two screens – one for you, one facing the customer – for a clear, transparent checkout. Card, contactless and cash, with the receipt printer built in."
        : five
          ? "The 5″ touchscreen keeps a queue moving – ring up, tap, receipt out. Card, contactless and cash, no second box on the counter."
          : "The big 6″ screen keeps a queue moving – ring up, tap, receipt out. Card, contactless and cash, no second box on the counter.",
      facts: ["Battery lasts the shift", "SIM + Wi-Fi", "Receipt printer built in"],
      featEyebrow: "Inside the device",
      featTitle: "Everything built in.",
      featSub: "No phone, no laptop, no extra box – the terminal works standalone.",
      feats: [
        { title: "Payment app", text: "Cards, contactless and cash on one screen. The amount, the tap, the confirmation – done." },
        { title: "Receipt printer", text: "The printer is in the device – hand over a receipt without a second box on the counter." },
        { title: "Always connected", text: "SIM and Wi-Fi, with a battery that lasts the shift. It works where your counter is." },
      ],
      ctaTitle: "Ready to take your first tap?",
      ctaText: "Live in four business days or less.",
      sales: "Contact sales",
      specEyebrow: "Full specifications",
      specTitle: "The numbers, in full.",
      specSub: `Everything inside the ${name} – the display, the processor, the battery, the printer and the security.`,
      dualNote: dual
        ? { title: "Two screens", text: "A second, customer-facing display shows the amount and confirmation – a transparent checkout, where local law needs it." }
        : null,
      highlights: [
        { value: five ? "5″" : "6″ HD", label: "Touchscreen display" },
        { value: "Octa-core", label: "Kun T11 · 2.0 GHz" },
        { value: five ? "2500 mAh" : "3000 mAh", label: "All-day battery" },
        { value: "4G · Wi-Fi", label: "Always connected" },
        { value: "Built-in printer", label: "2″ · 58 mm thermal" },
        { value: "PCI PTS 6.x", label: "Certified secure" },
      ],
      specGroups: [
        {
          group: "Display",
          items: (dual
            ? [["Screen", "6″ HD capacitive · 1440×720"], ["Second screen", "Customer-facing display"], ["Touch", "Multi-touch, safety glass"]]
            : [["Screen", five ? "5″ TFT · 854×480" : "6″ HD capacitive · 1440×720"], ["Touch", "Multi-touch, safety glass"]]) as [string, string][],
        },
        {
          group: "Performance",
          items: [["Processor", "Kun T11 · octa-core · 2.0 GHz"], ["Memory", "2 GB RAM · 16 GB storage"], ["Expandable", "microSD up to 64 GB"], ["Operating system", "Android 9.0"]],
        },
        {
          group: "Power & connectivity",
          items: [["Battery", five ? "Li-Ion 2500 mAh (3000 optional)" : "Li-Ion 3000 mAh (5000 optional)"], ["Mobile", "4G LTE · 3G · 2G"], ["Wireless", "Wi-Fi · Bluetooth · GPS"]],
        },
        {
          group: "Payments & printing",
          items: [["Card acceptance", "Magstripe · Chip & PIN · EMV L1/2 · Contactless"], ["Printer", "Built-in 2″ thermal · 58 mm"], ["Camera & scanner", "5 MP + 2 MP · 2D/3D scanner"]],
        },
        {
          group: "Compliance & build",
          items: [["Security", "PCI PTS 6.x"], ["Certifications", "RoHS · CE · FCC"], ["Dimensions", five ? "202 × 80 mm · 395 g" : "225 × 82 mm"]],
        },
      ] as { group: string; items: [string, string][] }[],
    },
    {
      shots,
      heroSrc: `${dir}/hero.webp`,
      deviceName: name,
      eyebrow: "Pagos · El terminal",
      h1a: "Un tap.",
      h1b: "Tarjeta, contactless, efectivo.",
      sub: dual
        ? `El ${name} acepta todo tipo de pago: una pantalla para ti y otra hacia el cliente, con la impresora de tickets integrada. No solo un datáfono.`
        : `El ${name} acepta todo tipo de pago en una sola pantalla, con la impresora de tickets integrada. No solo un datáfono.`,
      heroAlt: `El terminal de pago ${name}`,
      get: "Solicita tu terminal →",
      seePricing: "Ver precios",
      lineEyebrow: "Cada ángulo",
      lineTitle: "Un dispositivo. Todos los lados.",
      lineSub: "Gíralo: imprime, dura y se conecta, donde esté tu mostrador.",
      deviceFor: dual ? "El terminal de doble pantalla" : "El terminal todo en uno",
      deviceText: dual
        ? "Dos pantallas: una para ti y otra hacia el cliente, para un cobro claro y transparente. Tarjeta, contactless y efectivo, con la impresora de tickets integrada."
        : five
          ? "La pantalla táctil de 5″ mantiene la cola en movimiento: cobra, tap, ticket fuera. Tarjeta, contactless y efectivo, sin una segunda caja en el mostrador."
          : "La pantalla grande de 6″ mantiene la cola en movimiento: cobra, tap, ticket fuera. Tarjeta, contactless y efectivo, sin una segunda caja en el mostrador.",
      facts: ["La batería aguanta el turno", "SIM + Wi-Fi", "Impresora de tickets integrada"],
      featEyebrow: "Dentro del dispositivo",
      featTitle: "Todo integrado.",
      featSub: "Sin móvil, sin portátil, sin caja extra: el terminal funciona por sí solo.",
      feats: [
        { title: "App de pago", text: "Tarjetas, contactless y efectivo en una pantalla. El importe, el tap, la confirmación, listo." },
        { title: "Impresora de tickets", text: "La impresora está en el dispositivo: entrega el ticket sin una segunda caja en el mostrador." },
        { title: "Siempre conectado", text: "SIM y Wi-Fi, con una batería que aguanta el turno. Funciona donde esté tu mostrador." },
      ],
      ctaTitle: "¿Listo para tu primer tap?",
      ctaText: "Operativo en cuatro días hábiles o menos.",
      sales: "Contactar con ventas",
      specEyebrow: "Ficha técnica",
      specTitle: "Los números, al completo.",
      specSub: `Todo lo que hay dentro del ${name}: la pantalla, el procesador, la batería, la impresora y la seguridad.`,
      dualNote: dual
        ? { title: "Dos pantallas", text: "Una segunda pantalla hacia el cliente muestra el importe y la confirmación: un cobro transparente, donde lo exija la ley local." }
        : null,
      highlights: [
        { value: five ? "5″" : "6″ HD", label: "Pantalla táctil" },
        { value: "Octa-core", label: "Kun T11 · 2.0 GHz" },
        { value: five ? "2500 mAh" : "3000 mAh", label: "Batería para todo el día" },
        { value: "4G · Wi-Fi", label: "Siempre conectado" },
        { value: "Impresora integrada", label: "Térmica 2″ · 58 mm" },
        { value: "PCI PTS 6.x", label: "Seguridad certificada" },
      ],
      specGroups: [
        {
          group: "Pantalla",
          items: (dual
            ? [["Pantalla", "6″ HD capacitiva · 1440×720"], ["Segunda pantalla", "Hacia el cliente"], ["Táctil", "Multitáctil, cristal de seguridad"]]
            : [["Pantalla", five ? "5″ TFT · 854×480" : "6″ HD capacitiva · 1440×720"], ["Táctil", "Multitáctil, cristal de seguridad"]]) as [string, string][],
        },
        {
          group: "Rendimiento",
          items: [["Procesador", "Kun T11 · octa-core · 2.0 GHz"], ["Memoria", "2 GB RAM · 16 GB almacenamiento"], ["Ampliable", "microSD hasta 64 GB"], ["Sistema operativo", "Android 9.0"]],
        },
        {
          group: "Energía y conexión",
          items: [["Batería", five ? "Li-Ion 2500 mAh (3000 opc.)" : "Li-Ion 3000 mAh (5000 opc.)"], ["Móvil", "4G LTE · 3G · 2G"], ["Inalámbrico", "Wi-Fi · Bluetooth · GPS"]],
        },
        {
          group: "Pagos e impresión",
          items: [["Tarjetas", "Banda · Chip y PIN · EMV N1/2 · Contactless"], ["Impresora", "Térmica 2″ integrada · 58 mm"], ["Cámara y escáner", "5 MP + 2 MP · escáner 2D/3D"]],
        },
        {
          group: "Cumplimiento y construcción",
          items: [["Seguridad", "PCI PTS 6.x"], ["Certificaciones", "RoHS · CE · FCC"], ["Dimensiones", five ? "202 × 80 mm · 395 g" : "225 × 82 mm"]],
        },
      ] as { group: string; items: [string, string][] }[],
    },
    {
      shots,
      heroSrc: `${dir}/hero.webp`,
      deviceName: name,
      eyebrow: "Платежі · Термінал",
      h1a: "Один дотик.",
      h1b: "Картка, безконтактна оплата, готівка.",
      sub: dual
        ? `${name} приймає будь-які платежі – один екран для вас, другий для клієнта, із вбудованим принтером чеків. Не просто термінал для карток.`
        : `${name} приймає будь-які платежі на одному екрані – із вбудованим принтером чеків. Не просто термінал для карток.`,
      heroAlt: `Платіжний термінал ${name}`,
      get: "Замовити термінал →",
      seePricing: "Переглянути ціни",
      lineEyebrow: "Кожен ракурс",
      lineTitle: "Один пристрій. З усіх боків.",
      lineSub: "Покрутіть його: він друкує, довго тримає заряд і завжди на зв’язку – хоч би де стояв ваш прилавок.",
      deviceFor: dual ? "Термінал із двома екранами" : "Термінал «все в одному»",
      deviceText: dual
        ? "Два екрани – один для вас, другий для клієнта – для зрозумілого й прозорого розрахунку. Картка, безконтактна оплата й готівка, із вбудованим принтером чеків."
        : five
          ? "Із сенсорним екраном 5″ черга не затримується – пробили суму, приклали картку, чек готовий. Картка, безконтактна оплата й готівка – без другого пристрою на прилавку."
          : "З великим екраном 6″ черга не затримується – пробили суму, приклали картку, чек готовий. Картка, безконтактна оплата й готівка – без другого пристрою на прилавку.",
      facts: ["Батарея на всю зміну", "SIM + Wi-Fi", "Вбудований принтер чеків"],
      featEyebrow: "Усередині пристрою",
      featTitle: "Усе вбудовано.",
      featSub: "Без телефону, ноутбука чи додаткового пристрою – термінал працює самостійно.",
      feats: [
        { title: "Платіжний застосунок", text: "Картки, безконтактна оплата й готівка на одному екрані. Сума, дотик, підтвердження – готово." },
        { title: "Принтер чеків", text: "Принтер вбудовано в термінал – видавайте чек без додаткового пристрою на прилавку." },
        { title: "Завжди на зв’язку", text: "SIM і Wi-Fi, а батареї вистачає на всю зміну. Працює там, де ваш прилавок." },
      ],
      ctaTitle: "Готові прийняти перший платіж?",
      ctaText: "Запуск за чотири робочі дні або швидше.",
      sales: "Зв’язатися з нами",
      specEyebrow: "Технічні характеристики",
      specTitle: "Усі характеристики в цифрах.",
      specSub: `Усе, що всередині ${name}, – екран, процесор, батарея, принтер і безпека.`,
      dualNote: dual
        ? { title: "Два екрани", text: "Другий екран, повернутий до клієнта, показує суму й підтвердження – прозорий розрахунок там, де цього вимагає місцеве законодавство." }
        : null,
      highlights: [
        { value: five ? "5″" : "6″ HD", label: "Сенсорний екран" },
        { value: "8 ядер", label: "Kun T11 · 2.0 ГГц" },
        { value: five ? "2500 мА·год" : "3000 мА·год", label: "Батарея на весь день" },
        { value: "4G · Wi-Fi", label: "Завжди на зв’язку" },
        { value: "Вбудований принтер", label: "Термодрук 2″ · 58 мм" },
        { value: "PCI PTS 6.x", label: "Сертифікована безпека" },
      ],
      specGroups: [
        {
          group: "Екран",
          items: (dual
            ? [["Екран", "6″ HD ємнісний · 1440×720"], ["Другий екран", "Повернутий до клієнта"], ["Сенсор", "Мультитач, захисне скло"]]
            : [["Екран", five ? "5″ TFT · 854×480" : "6″ HD ємнісний · 1440×720"], ["Сенсор", "Мультитач, захисне скло"]]) as [string, string][],
        },
        {
          group: "Продуктивність",
          items: [["Процесор", "Kun T11 · 8 ядер · 2.0 ГГц"], ["Пам’ять", "2 ГБ RAM · 16 ГБ вбудованої пам’яті"], ["Розширення", "microSD до 64 ГБ"], ["Операційна система", "Android 9.0"]],
        },
        {
          group: "Живлення та зв’язок",
          items: [["Батарея", five ? "Li-Ion 2500 мА·год (опційно 3000)" : "Li-Ion 3000 мА·год (опційно 5000)"], ["Мобільний зв’язок", "4G LTE · 3G · 2G"], ["Бездротові модулі", "Wi-Fi · Bluetooth · GPS"]],
        },
        {
          group: "Оплата та друк",
          items: [["Приймання карток", "Магнітна смуга · Чип і PIN · EMV L1/2 · Безконтактна оплата"], ["Принтер", "Вбудований термопринтер 2″ · 58 мм"], ["Камера і сканер", "5 Мп + 2 Мп · сканер 2D/3D"]],
        },
        {
          group: "Сертифікація та корпус",
          items: [["Безпека", "PCI PTS 6.x"], ["Сертифікати", "RoHS · CE · FCC"], ["Розміри", five ? "202 × 80 мм · 395 г" : "225 × 82 мм"]],
        },
      ] as { group: string; items: [string, string][] }[],
    },
    {
      shots,
      heroSrc: `${dir}/hero.webp`,
      deviceName: name,
      eyebrow: "Платежи · Терминал",
      h1a: "Одно касание.",
      h1b: "Карта, бесконтактная оплата, наличные.",
      sub: dual
        ? `${name} принимает любые платежи – один экран для вас, другой для клиента, со встроенным принтером чеков. Не просто терминал для карт.`
        : `${name} принимает любые платежи на одном экране – со встроенным принтером чеков. Не просто терминал для карт.`,
      heroAlt: `Платёжный терминал ${name}`,
      get: "Заказать терминал →",
      seePricing: "Посмотреть цены",
      lineEyebrow: "Каждый ракурс",
      lineTitle: "Одно устройство. Со всех сторон.",
      lineSub: "Покрутите его: он печатает, долго держит заряд и всегда на связи – где бы ни стоял ваш прилавок.",
      deviceFor: dual ? "Терминал с двумя экранами" : "Терминал «всё в одном»",
      deviceText: dual
        ? "Два экрана – один для вас, другой для клиента – для понятного и прозрачного расчёта. Карта, бесконтактная оплата и наличные, со встроенным принтером чеков."
        : five
          ? "С сенсорным экраном 5″ очередь не задерживается – пробили сумму, приложили карту, чек готов. Карта, бесконтактная оплата и наличные – без второго устройства на прилавке."
          : "С большим экраном 6″ очередь не задерживается – пробили сумму, приложили карту, чек готов. Карта, бесконтактная оплата и наличные – без второго устройства на прилавке.",
      facts: ["Батарея на всю смену", "SIM + Wi-Fi", "Встроенный принтер чеков"],
      featEyebrow: "Внутри устройства",
      featTitle: "Всё встроено.",
      featSub: "Без телефона, ноутбука и дополнительных устройств – терминал работает автономно.",
      feats: [
        { title: "Платёжное приложение", text: "Карты, бесконтактная оплата и наличные на одном экране. Сумма, касание, подтверждение – готово." },
        { title: "Принтер чеков", text: "Принтер встроен в терминал – выдавайте чек без дополнительного устройства на прилавке." },
        { title: "Всегда на связи", text: "SIM и Wi-Fi, а батареи хватает на всю смену. Работает там, где ваш прилавок." },
      ],
      ctaTitle: "Готовы принять первый платёж?",
      ctaText: "Запуск за четыре рабочих дня или быстрее.",
      sales: "Связаться с нами",
      specEyebrow: "Технические характеристики",
      specTitle: "Все характеристики в цифрах.",
      specSub: `Всё, что внутри ${name}, – экран, процессор, батарея, принтер и безопасность.`,
      dualNote: dual
        ? { title: "Два экрана", text: "Второй экран, обращённый к клиенту, показывает сумму и подтверждение – прозрачный расчёт там, где этого требует местное законодательство." }
        : null,
      highlights: [
        { value: five ? "5″" : "6″ HD", label: "Сенсорный экран" },
        { value: "8 ядер", label: "Kun T11 · 2.0 ГГц" },
        { value: five ? "2500 мА·ч" : "3000 мА·ч", label: "Батарея на весь день" },
        { value: "4G · Wi-Fi", label: "Всегда на связи" },
        { value: "Встроенный принтер", label: "Термопечать 2″ · 58 мм" },
        { value: "PCI PTS 6.x", label: "Сертифицированная безопасность" },
      ],
      specGroups: [
        {
          group: "Экран",
          items: (dual
            ? [["Экран", "6″ HD ёмкостный · 1440×720"], ["Второй экран", "Обращён к клиенту"], ["Сенсор", "Мультитач, защитное стекло"]]
            : [["Экран", five ? "5″ TFT · 854×480" : "6″ HD ёмкостный · 1440×720"], ["Сенсор", "Мультитач, защитное стекло"]]) as [string, string][],
        },
        {
          group: "Производительность",
          items: [["Процессор", "Kun T11 · 8 ядер · 2.0 ГГц"], ["Память", "2 ГБ RAM · 16 ГБ встроенной памяти"], ["Расширение", "microSD до 64 ГБ"], ["Операционная система", "Android 9.0"]],
        },
        {
          group: "Питание и связь",
          items: [["Батарея", five ? "Li-Ion 2500 мА·ч (опционально 3000)" : "Li-Ion 3000 мА·ч (опционально 5000)"], ["Мобильная связь", "4G LTE · 3G · 2G"], ["Беспроводные модули", "Wi-Fi · Bluetooth · GPS"]],
        },
        {
          group: "Оплата и печать",
          items: [["Приём карт", "Магнитная полоса · Чип и PIN · EMV L1/2 · Бесконтактная оплата"], ["Принтер", "Встроенный термопринтер 2″ · 58 мм"], ["Камера и сканер", "5 Мп + 2 Мп · сканер 2D/3D"]],
        },
        {
          group: "Сертификация и корпус",
          items: [["Безопасность", "PCI PTS 6.x"], ["Сертификаты", "RoHS · CE · FCC"], ["Размеры", five ? "202 × 80 мм · 395 г" : "225 × 82 мм"]],
        },
      ] as { group: string; items: [string, string][] }[],
    },
  );
}

export default async function TerminalsPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  // One device per country, always: Malta = Bank Pro S, Spain = Bank, everyone else = Bank Pro.
  const c = copyFor(lang, terminalModel(country));
  // In Malta the terminal is the cash register, so it answers the buying questions too.
  const register = promotesRegister(country);

  return (
    <>
      {/* 1 · hero */}
      <section className="overflow-x-clip pt-16 pb-18 lg:pt-22">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-brand uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              {c.eyebrow}
            </span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-5 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="lead anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">{c.get}</Link>
              <Link href="/pricing" className="btn-ghost">{c.seePricing}</Link>
            </div>
            <div className="anim-fade-up anim-d-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-line pt-6">
              {c.facts.slice(0, 3).map((f) => (
                <span key={f} className="flex items-center gap-2 text-[13.5px] font-medium text-ink-2">
                  <Check className="size-4 text-brand" strokeWidth={2.4} aria-hidden />
                  {f}
                </span>
              ))}
            </div>
          </div>
          {/* Stage: light and airy like the rest of the site, with a soft lilac
              halo behind the device and a faint reflection so it still has depth. */}
          <div className="anim-fade-up anim-d-2 relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[56px] bg-[radial-gradient(circle,rgba(90,25,181,0.10),transparent_70%)] blur-xl" />
            {/* the hero shot is a wide, lying composition – a square stage on
                phones leaves a lot of dead space above and below it */}
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[36px] bg-[linear-gradient(155deg,#faf6ff_0%,#ffffff_45%,#f0e8fd_100%)] ring-1 ring-brand/10 shadow-[0_40px_90px_-55px_rgba(90,25,181,0.5)] sm:aspect-[5/4]">
              {/* soft halo behind the device */}
              <div className="pointer-events-none absolute top-[38%] left-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(165,120,232,0.28),transparent_66%)] blur-2xl" />
              {/* subtle floor line */}
              <div className="pointer-events-none absolute right-0 bottom-[22%] left-0 h-px bg-gradient-to-r from-transparent via-brand/12 to-transparent" />

              <div className="relative h-[92%] w-[88%]">
                <div className="chip-float absolute inset-0">
                  <Image
                    src={c.heroSrc}
                    alt={c.heroAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 620px"
                    className="object-contain drop-shadow-[0_26px_38px_rgba(45,20,90,0.28)]"
                  />
                </div>
                {/* mirrored reflection, faded out downwards */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-[86%] h-1/2 scale-y-[-1] opacity-20 blur-[1px]"
                  style={{ maskImage: "linear-gradient(to top, transparent 12%, black 92%)", WebkitMaskImage: "linear-gradient(to top, transparent 12%, black 92%)" }}
                  aria-hidden
                >
                  <Image src={c.heroSrc} alt="" fill sizes="620px" className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · every angle – the gallery */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.lineEyebrow} title={c.lineTitle} sub={c.lineSub} />
          <div className="mt-11 grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <TerminalGallery shots={c.shots} />
            </Reveal>
            <Reveal delay={100}>
              <div>
                <span className="text-[12.5px] font-semibold tracking-wide text-brand uppercase">{c.deviceFor}</span>
                <h3 className="h-display mt-2 text-[clamp(26px,3vw,34px)] leading-tight">{c.deviceName}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{c.deviceText}</p>
                <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                  {c.facts.map((label, i) => (
                    <span key={label} className="flex items-center gap-3 text-[14.5px] font-medium text-ink-2">
                      <svg viewBox="0 0 24 24" className="size-5.5 shrink-0 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {factIcons[i]}
                      </svg>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 · inside the device */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.featEyebrow} title={c.featTitle} sub={c.featSub} />
          <div className="mt-11 grid gap-4 md:grid-cols-3">
            {c.feats.map((f, i) => (
              <Reveal key={f.title} delay={i * 100} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-white p-7">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                    <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {featIcons[i]}
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · full specifications */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.specEyebrow} title={c.specTitle} sub={c.specSub} />

          {/* spec highlights – the at-a-glance scan */}
          <div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.highlights.map((h, i) => (
              <Reveal key={h.value} delay={(i % 3) * 80} className="h-full">
                <div className="flex h-full items-center gap-4 rounded-2xl bg-bg-2 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm shadow-black/4">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {highlightIcons[i]}
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-[18px] font-semibold tracking-tight text-ink">{h.value}</div>
                    <div className="text-[12.5px] leading-tight text-ink-3">{h.label}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* dual-screen callout – Malta / Bank Pro S only */}
          {c.dualNote && (
            <Reveal>
              <div className="mt-4 flex items-start gap-3.5 rounded-2xl bg-brand-tint p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="12" height="13" rx="2" />
                    <rect x="14" y="9" width="7" height="10" rx="1.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-tight text-ink">{c.dualNote.title}</p>
                  <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-2">{c.dualNote.text}</p>
                </div>
              </div>
            </Reveal>
          )}

          {/* detailed spec sheet – grouped, tech-spec style */}
          <Reveal>
            <div className="mt-12 border-t border-line">
              {c.specGroups.map((g) => (
                <div key={g.group} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[200px_1fr] sm:gap-10">
                  <h4 className="font-display text-[16px] font-semibold tracking-tight text-ink">{g.group}</h4>
                  <dl>
                    {g.items.map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line/70 py-2.5 last:border-0 last:pb-0">
                        <dt className="text-[13.5px] text-ink-2">{k}</dt>
                        <dd className="text-right font-mono text-[13px] text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* questions and answers (Malta) – with their FAQPage JSON-LD */}
      {register && <RegisterFaq lang={lang} country={country} ids={["oneDevice", "cost", "payout", "start"]} className="bg-bg-2" />}

      {/* 5 · CTA (closer) – white after the bg-2 FAQ */}
      <section className={`${register ? "" : "bg-bg-2"} py-24`}>
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
