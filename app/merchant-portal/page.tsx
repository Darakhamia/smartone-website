import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta-server";
import { pageSeo } from "@/lib/seo";
import Link from "next/link";
import {
  LayoutDashboard,
  Activity,
  ReceiptText,
  Search,
  Landmark,
  TrendingUp,
  CreditCard,
  ShoppingBasket,
  Percent,
  Wallet,
  Filter,
  RotateCcw,
  Download,
  AlertCircle,
  Fingerprint,
  Route,
  CalendarRange,
  Clock,
  BarChart3,
  Database,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { AppShot } from "@/components/product/app-shot";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, type Lang } from "@/lib/countries";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("merchantPortal")), ...pageSeo("/merchant-portal") };
}

function copyFor(lang: Lang, register: boolean) {
  return tr(
    lang,
    {
      // 1 · hero
      eyebrow: "SmartOne Merchant Portal",
      h1a: "Your entire business,",
      h1b: "in one clear view.",
      sub: register
        ? "Track sales, card payments, cash-register shifts, fees and settlements across every store and terminal — from one secure portal."
        : "Track sales, card payments, fees and settlements across every store and terminal — from one secure portal.",
      get: "Get SmartOne",
      included: "Included with every SmartOne terminal.",
      shotDashboard: "The Merchant Portal dashboard: revenue, average check, card versus cash and top sellers",

      // 2 · overview
      ovEyebrow: "One portal. The whole operation.",
      ovTitle: "From the first sale to the money in your bank.",
      ovSub: register
        ? "Daily sales, transactions, fiscal reporting and payouts — in one place."
        : "Daily sales, transactions and payouts — in one place.",
      overview: [
        { title: "See the day at a glance", text: "Revenue, average check, payment mix and top-selling products in one dashboard." },
        { title: "Trace every payment", text: "Find sales and refunds, check their status and open complete transaction details." },
        { title: "Manage fiscal operations", text: "Review shifts, receipts and Z-reports across every store and terminal." },
        { title: "Understand every payout", text: "See gross volume, fees and the net amount being settled to your bank." },
      ],

      // 3 · dashboard
      dashEyebrow: "Business overview",
      dashTitle: "Your numbers, without building a report.",
      dashSub: "Pick any date range and see the whole business.",
      dash: [
        { title: "Sales performance", text: "Follow revenue and transaction trends throughout the day." },
        { title: "Payment breakdown", text: "See exactly how much was paid by card and by cash." },
        { title: "Products and categories", text: "Understand what generates the most revenue." },
      ],

      // 4 · analytics
      anEyebrow: "Payment analytics",
      anTitle: "What you sold, what you paid, what lands.",
      anSub: "Gross volume, fees and net amount, side by side.",
      an: [
        { title: "Gross payment volume", text: "See the complete value of processed card payments." },
        { title: "Processing fees", text: "Understand exactly how much was deducted in fees." },
        { title: "Net amount to merchant", text: "See the amount expected to reach your bank account." },
      ],
      shotAnalytics: "Payment analytics in the Merchant Portal: gross volume, fees and net amount",

      // 5 · transaction log
      logEyebrow: "Transaction log",
      logTitle: "Every transaction, easy to find.",
      logSub: "Search, filter and review sales and refunds across any date range.",
      log: [
        { title: "Search by amount or RRN", text: "Find a specific payment without manually checking long lists." },
        { title: "Filter by status and terminal", text: "Review only the transactions relevant to a particular location, device or result." },
        { title: "Review sales and refunds", text: "See the complete payment lifecycle in one place." },
        { title: "Export transaction data", text: "Download transaction information whenever finance or operations needs it." },
      ],
      shotLog: "The transaction log in the Merchant Portal, with search, status and terminal filters",

      // 6 · details
      detEyebrow: "Complete payment details",
      detTitle: "When something goes wrong, you can see why.",
      detSub: "Open any payment for its status, card, response code and routing.",
      det: [
        { title: "Response codes and failure reasons", text: "See why a payment was declined or failed." },
        { title: "Terminal and transaction identifiers", text: "Find the exact device and transaction reference connected to the payment." },
        { title: "Provider and acquiring information", text: "Review how the transaction was processed and routed." },
        { title: "Card and payment type", text: "See the payment method and available card information." },
      ],
      shotDetails: "Transaction details in the Merchant Portal, showing the response code and failure reason",

      // 7 · cash register (Malta only)
      regEyebrow: "Fiscal operations",
      regTitle: "Every shift, receipt and Z-report in one place.",
      regSub: "Filter by store and device, and find the record you need.",
      reg: [
        { title: "Filter by store, terminal and date", text: "Quickly narrow down the information you need." },
        { title: "Review opening and closing times", text: "See when every fiscal shift started and ended." },
        { title: "See turnover and operation counts", text: "Understand the activity recorded during each shift." },
        { title: "Export fiscal data", text: "Prepare fiscal information for finance, accounting or internal review." },
      ],
      shotShifts: "Fiscal shifts by store and terminal in the Merchant Portal",

      // 8 · z-reports (Malta only)
      zEyebrow: "Z-reports",
      zTitle: "Close the day without chasing paperwork.",
      zSub: "A full Z-report from the Portal — sales, refunds, cash and VAT.",
      shotZ: "A Z-report opened in the Merchant Portal",

      // 9 · daily operations
      dayEyebrow: "Built for daily operations",
      dayTitle: "Less time searching. More time running the business.",
      day: [
        { title: "One source of truth", text: "Sales, card payments, cash operations and settlements use the same business data." },
        { title: "Find anything quickly", text: "Search and filter information by date, amount, store, terminal, status or transaction reference." },
        { title: "Ready for reporting", text: register ? "Export payment and fiscal data whenever it is needed by finance or operations." : "Export payment data whenever it is needed by finance or operations." },
        { title: "Built for every location", text: "Review activity across different stores and terminals from the same account." },
      ],

      // 10 · CTA
      ctaA: "Your terminal handles the sale.",
      ctaB: "The Portal handles everything around it.",
      ctaText: register
        ? "Manage payments, fiscal operations and settlements from one clear workspace connected to your SmartOne terminals."
        : "Manage payments and settlements from one clear workspace connected to your SmartOne terminals.",
      ctaGet: "Talk to us →",
    },
    {
      eyebrow: "SmartOne Merchant Portal",
      h1a: "Todo tu negocio,",
      h1b: "en una vista clara.",
      sub: register
        ? "Controla ventas, pagos con tarjeta, turnos de caja, comisiones y liquidaciones de cada tienda y terminal, desde un único portal seguro."
        : "Controla ventas, pagos con tarjeta, comisiones y liquidaciones de cada tienda y terminal, desde un único portal seguro.",
      get: "Consigue SmartOne",
      included: "Incluido con cada terminal SmartOne.",
      shotDashboard: "El panel del Merchant Portal: ingresos, ticket medio, tarjeta frente a efectivo y más vendidos",

      ovEyebrow: "Un portal. Toda la operación.",
      ovTitle: "De la primera venta al dinero en tu banco.",
      ovSub: register
        ? "Ventas diarias, operaciones, informes fiscales y liquidaciones, en un solo sitio."
        : "Ventas diarias, operaciones y liquidaciones, en un solo sitio.",
      overview: [
        { title: "El día de un vistazo", text: "Ingresos, ticket medio, mezcla de pagos y productos más vendidos en un panel." },
        { title: "Rastrea cada pago", text: "Encuentra ventas y devoluciones, revisa su estado y abre el detalle completo." },
        { title: "Gestiona lo fiscal", text: "Revisa turnos, tickets e informes Z de cada tienda y terminal." },
        { title: "Entiende cada liquidación", text: "Mira el volumen bruto, las comisiones y el neto que se abona a tu banco." },
      ],

      dashEyebrow: "Visión del negocio",
      dashTitle: "Tus cifras, sin montar un informe.",
      dashSub: "Elige cualquier rango de fechas y ve todo el negocio.",
      dash: [
        { title: "Rendimiento de ventas", text: "Sigue la evolución de ingresos y operaciones durante el día." },
        { title: "Desglose de pagos", text: "Mira exactamente cuánto se pagó con tarjeta y cuánto en efectivo." },
        { title: "Productos y categorías", text: "Entiende qué genera más ingresos." },
      ],

      anEyebrow: "Analítica de pagos",
      anTitle: "Lo que vendiste, lo que pagaste, lo que llega.",
      anSub: "Volumen bruto, comisiones e importe neto, uno al lado del otro.",
      an: [
        { title: "Volumen bruto de pagos", text: "Mira el valor completo de los pagos con tarjeta procesados." },
        { title: "Comisiones de procesamiento", text: "Entiende exactamente cuánto se descontó en comisiones." },
        { title: "Neto para el comercio", text: "Mira el importe que se espera que llegue a tu cuenta bancaria." },
      ],
      shotAnalytics: "Analítica de pagos en el Merchant Portal: volumen bruto, comisiones e importe neto",

      logEyebrow: "Registro de operaciones",
      logTitle: "Cada operación, fácil de encontrar.",
      logSub: "Busca, filtra y revisa ventas y devoluciones en cualquier rango de fechas.",
      log: [
        { title: "Busca por importe o RRN", text: "Encuentra un pago concreto sin revisar listas larguísimas a mano." },
        { title: "Filtra por estado y terminal", text: "Revisa solo las operaciones de una ubicación, dispositivo o resultado concreto." },
        { title: "Revisa ventas y devoluciones", text: "Ve el ciclo completo del pago en un solo sitio." },
        { title: "Exporta los datos", text: "Descarga la información de operaciones cuando finanzas u operaciones la necesiten." },
      ],
      shotLog: "El registro de operaciones del Merchant Portal, con búsqueda y filtros por estado y terminal",

      detEyebrow: "Detalle completo del pago",
      detTitle: "Cuando algo sale mal, puedes ver por qué.",
      detSub: "Abre cualquier pago: estado, tarjeta, código de respuesta y enrutado.",
      det: [
        { title: "Códigos de respuesta y motivos de fallo", text: "Mira por qué se rechazó o falló un pago." },
        { title: "Identificadores de terminal y operación", text: "Encuentra el dispositivo y la referencia exactos del pago." },
        { title: "Proveedor y adquirencia", text: "Revisa cómo se procesó y enrutó la operación." },
        { title: "Tarjeta y tipo de pago", text: "Mira el método de pago y los datos de tarjeta disponibles." },
      ],
      shotDetails: "Detalle de una operación en el Merchant Portal, con el código de respuesta y el motivo del fallo",

      regEyebrow: "Operaciones fiscales",
      regTitle: "Cada turno, ticket e informe Z en un solo sitio.",
      regSub: "Filtra por tienda y dispositivo, y encuentra el registro que necesitas.",
      reg: [
        { title: "Filtra por tienda, terminal y fecha", text: "Acota rápidamente la información que necesitas." },
        { title: "Revisa aperturas y cierres", text: "Mira cuándo empezó y terminó cada turno fiscal." },
        { title: "Facturación y operaciones", text: "Entiende la actividad registrada en cada turno." },
        { title: "Exporta los datos fiscales", text: "Prepara la información fiscal para finanzas, contabilidad o revisión interna." },
      ],
      shotShifts: "Turnos fiscales por tienda y terminal en el Merchant Portal",

      zEyebrow: "Informes Z",
      zTitle: "Cierra el día sin perseguir papeles.",
      zSub: "Un informe Z completo desde el Portal: ventas, devoluciones, efectivo e IVA.",
      shotZ: "Un informe Z abierto en el Merchant Portal",

      dayEyebrow: "Hecho para el día a día",
      dayTitle: "Menos tiempo buscando. Más tiempo llevando el negocio.",
      day: [
        { title: "Una sola fuente de verdad", text: "Ventas, pagos con tarjeta, operaciones de efectivo y liquidaciones usan los mismos datos." },
        { title: "Encuentra cualquier cosa rápido", text: "Busca y filtra por fecha, importe, tienda, terminal, estado o referencia de operación." },
        { title: "Listo para informar", text: register ? "Exporta datos de pagos y fiscales cuando finanzas u operaciones lo necesiten." : "Exporta datos de pagos cuando finanzas u operaciones lo necesiten." },
        { title: "Pensado para varias tiendas", text: "Revisa la actividad de distintas tiendas y terminales desde la misma cuenta." },
      ],

      ctaA: "Tu terminal se encarga de la venta.",
      ctaB: "El Portal, de todo lo demás.",
      ctaText: register
        ? "Gestiona pagos, operaciones fiscales y liquidaciones desde un espacio de trabajo claro, conectado a tus terminales SmartOne."
        : "Gestiona pagos y liquidaciones desde un espacio de trabajo claro, conectado a tus terminales SmartOne.",
      ctaGet: "Habla con nosotros →",
    },
    {
      eyebrow: "SmartOne Merchant Portal",
      h1a: "Весь ваш бізнес,",
      h1b: "як на долоні.",
      sub: register
        ? "Відстежуйте продажі, оплату карткою, касові зміни, комісії та зарахування коштів у всіх магазинах і на всіх терміналах — з одного захищеного порталу."
        : "Відстежуйте продажі, оплату карткою, комісії та зарахування коштів у всіх магазинах і на всіх терміналах — з одного захищеного порталу.",
      get: "Замовити SmartOne",
      included: "Входить у вартість кожного термінала SmartOne.",
      shotDashboard: "Панель Merchant Portal: виручка, середній чек, картки й готівка, хіти продажів",

      ovEyebrow: "Один портал. Усі процеси.",
      ovTitle: "Від першого продажу до грошей на вашому рахунку.",
      ovSub: register
        ? "Щоденні продажі, транзакції, фіскальна звітність і виплати — в одному місці."
        : "Щоденні продажі, транзакції та виплати — в одному місці.",
      overview: [
        { title: "Увесь день одним поглядом", text: "Виручка, середній чек, структура платежів і хіти продажів на одній панелі." },
        { title: "Відстежуйте кожен платіж", text: "Знаходьте продажі й повернення, перевіряйте їхній статус і відкривайте повні дані транзакції." },
        { title: "Керуйте фіскальними операціями", text: "Переглядайте зміни, чеки та Z-звіти всіх магазинів і терміналів." },
        { title: "Розумійте кожну виплату", text: "Дивіться валовий обсяг, комісії та чисту суму, яку зараховують на ваш банківський рахунок." },
      ],

      dashEyebrow: "Огляд бізнесу",
      dashTitle: "Усі ваші цифри без складання звітів.",
      dashSub: "Оберіть будь-який період – і весь бізнес перед вами.",
      dash: [
        { title: "Результати продажів", text: "Стежте за динамікою виручки й транзакцій протягом дня." },
        { title: "Структура платежів", text: "Дивіться, скільки саме оплатили карткою, а скільки – готівкою." },
        { title: "Товари та категорії", text: "Розумійте, що приносить найбільше виручки." },
      ],

      anEyebrow: "Аналітика платежів",
      anTitle: "Що ви продали, що сплатили, що надійде.",
      anSub: "Валовий обсяг, комісії та чиста сума на одному екрані.",
      an: [
        { title: "Валовий обсяг платежів", text: "Дивіться повну суму оброблених платежів карткою." },
        { title: "Комісії за обробку", text: "Точно знайте, скільки було утримано комісій." },
        { title: "Чиста сума до зарахування", text: "Дивіться суму, яка має надійти на ваш банківський рахунок." },
      ],
      shotAnalytics: "Аналітика платежів у Merchant Portal: валовий обсяг, комісії та чиста сума",

      logEyebrow: "Журнал транзакцій",
      logTitle: "Кожну транзакцію легко знайти.",
      logSub: "Шукайте, фільтруйте й переглядайте продажі та повернення за будь-який період.",
      log: [
        { title: "Пошук за сумою або RRN", text: "Знаходьте потрібний платіж, не переглядаючи вручну довгі списки." },
        { title: "Фільтр за статусом і терміналом", text: "Переглядайте лише транзакції, що стосуються конкретної точки, пристрою чи результату." },
        { title: "Перегляд продажів і повернень", text: "Відстежуйте весь життєвий цикл платежу в одному місці." },
        { title: "Експорт даних транзакцій", text: "Завантажуйте дані транзакцій, коли вони потрібні фінансовому чи операційному відділу." },
      ],
      shotLog: "Журнал транзакцій у Merchant Portal із пошуком і фільтрами за статусом і терміналом",

      detEyebrow: "Повні дані платежу",
      detTitle: "Коли щось іде не так, ви бачите причину.",
      detSub: "Відкрийте будь-який платіж: статус, картка, код відповіді та маршрутизація.",
      det: [
        { title: "Коди відповіді та причини відмов", text: "Дізнавайтеся, чому платіж відхилено або чому він не пройшов." },
        { title: "Ідентифікатори термінала й транзакції", text: "Знаходьте саме той пристрій і номер транзакції, з якими пов’язаний платіж." },
        { title: "Провайдер і еквайринг", text: "Перевіряйте, як транзакцію обробили та куди її спрямували." },
        { title: "Картка та спосіб оплати", text: "Дивіться спосіб оплати й доступні дані картки." },
      ],
      shotDetails: "Дані транзакції в Merchant Portal із кодом відповіді та причиною відмови",

      regEyebrow: "Фіскальні операції",
      regTitle: "Усі зміни, чеки та Z-звіти в одному місці.",
      regSub: "Фільтруйте за магазином і пристроєм та знаходьте потрібний запис.",
      reg: [
        { title: "Фільтр за магазином, терміналом і датою", text: "Швидко звужуйте пошук до потрібної інформації." },
        { title: "Час відкриття та закриття", text: "Дивіться, коли почалася й завершилася кожна фіскальна зміна." },
        { title: "Оборот і кількість операцій", text: "Дивіться, яку активність зафіксовано протягом кожної зміни." },
        { title: "Експорт фіскальних даних", text: "Готуйте фіскальні дані для фінансового відділу, бухгалтерії чи внутрішньої перевірки." },
      ],
      shotShifts: "Фіскальні зміни за магазинами й терміналами в Merchant Portal",

      zEyebrow: "Z-звіти",
      zTitle: "Закривайте день без паперової тяганини.",
      zSub: "Повний Z-звіт прямо з Порталу — продажі, повернення, готівка та ПДВ.",
      shotZ: "Z-звіт, відкритий у Merchant Portal",

      dayEyebrow: "Створено для щоденної роботи",
      dayTitle: "Менше часу на пошуки. Більше – на ведення бізнесу.",
      day: [
        { title: "Єдине джерело даних", text: "Продажі, оплата карткою, готівкові операції та зарахування коштів спираються на одні й ті самі дані." },
        { title: "Знаходьте все швидко", text: "Шукайте й фільтруйте інформацію за датою, сумою, магазином, терміналом, статусом або номером транзакції." },
        { title: "Готово до звітності", text: register ? "Експортуйте платіжні та фіскальні дані, коли вони потрібні фінансовому чи операційному відділу." : "Експортуйте платіжні дані, коли вони потрібні фінансовому чи операційному відділу." },
        { title: "Для всіх ваших точок", text: "Переглядайте активність різних магазинів і терміналів з одного акаунта." },
      ],

      ctaA: "Ваш термінал проводить продаж.",
      ctaB: "Портал бере на себе все інше.",
      ctaText: register
        ? "Керуйте платежами, фіскальними операціями та зарахуванням коштів з одного зрозумілого робочого простору, підключеного до ваших терміналів SmartOne."
        : "Керуйте платежами та зарахуванням коштів з одного зрозумілого робочого простору, підключеного до ваших терміналів SmartOne.",
      ctaGet: "Зв’яжіться з нами →",
    },
    {
      eyebrow: "SmartOne Merchant Portal",
      h1a: "Весь ваш бизнес,",
      h1b: "как на ладони.",
      sub: register
        ? "Отслеживайте продажи, оплату картой, кассовые смены, комиссии и зачисление средств по всем магазинам и терминалам — с одного защищённого портала."
        : "Отслеживайте продажи, оплату картой, комиссии и зачисление средств по всем магазинам и терминалам — с одного защищённого портала.",
      get: "Заказать SmartOne",
      included: "Входит в стоимость каждого терминала SmartOne.",
      shotDashboard: "Панель Merchant Portal: выручка, средний чек, карты и наличные, хиты продаж",

      ovEyebrow: "Один портал. Все процессы.",
      ovTitle: "От первой продажи до денег на вашем счёте.",
      ovSub: register
        ? "Ежедневные продажи, транзакции, фискальная отчётность и выплаты — в одном месте."
        : "Ежедневные продажи, транзакции и выплаты — в одном месте.",
      overview: [
        { title: "Весь день одним взглядом", text: "Выручка, средний чек, структура платежей и хиты продаж на одной панели." },
        { title: "Отслеживайте каждый платёж", text: "Находите продажи и возвраты, проверяйте их статус и открывайте полные данные транзакции." },
        { title: "Управляйте фискальными операциями", text: "Просматривайте смены, чеки и Z-отчёты по всем магазинам и терминалам." },
        { title: "Понимайте каждую выплату", text: "Смотрите валовой объём, комиссии и чистую сумму, которая зачисляется на ваш банковский счёт." },
      ],

      dashEyebrow: "Обзор бизнеса",
      dashTitle: "Все ваши цифры без составления отчётов.",
      dashSub: "Выберите любой период – и весь бизнес перед вами.",
      dash: [
        { title: "Результаты продаж", text: "Следите за динамикой выручки и транзакций в течение дня." },
        { title: "Структура платежей", text: "Смотрите, сколько именно оплатили картой, а сколько – наличными." },
        { title: "Товары и категории", text: "Понимайте, что приносит больше всего выручки." },
      ],

      anEyebrow: "Аналитика платежей",
      anTitle: "Что вы продали, что заплатили, что поступит.",
      anSub: "Валовой объём, комиссии и чистая сумма на одном экране.",
      an: [
        { title: "Валовой объём платежей", text: "Смотрите полную сумму обработанных платежей картой." },
        { title: "Комиссии за обработку", text: "Точно знайте, сколько было удержано комиссий." },
        { title: "Чистая сумма к зачислению", text: "Смотрите сумму, которая должна поступить на ваш банковский счёт." },
      ],
      shotAnalytics: "Аналитика платежей в Merchant Portal: валовой объём, комиссии и чистая сумма",

      logEyebrow: "Журнал транзакций",
      logTitle: "Каждую транзакцию легко найти.",
      logSub: "Ищите, фильтруйте и просматривайте продажи и возвраты за любой период.",
      log: [
        { title: "Поиск по сумме или RRN", text: "Находите нужный платёж, не просматривая вручную длинные списки." },
        { title: "Фильтр по статусу и терминалу", text: "Просматривайте только транзакции, относящиеся к конкретной точке, устройству или результату." },
        { title: "Просмотр продаж и возвратов", text: "Отслеживайте весь жизненный цикл платежа в одном месте." },
        { title: "Экспорт данных транзакций", text: "Скачивайте данные транзакций, когда они нужны финансовому или операционному отделу." },
      ],
      shotLog: "Журнал транзакций в Merchant Portal с поиском и фильтрами по статусу и терминалу",

      detEyebrow: "Полные данные платежа",
      detTitle: "Когда что-то идёт не так, вы видите причину.",
      detSub: "Откройте любой платёж: статус, карта, код ответа и маршрутизация.",
      det: [
        { title: "Коды ответа и причины отказов", text: "Узнавайте, почему платёж отклонён или почему он не прошёл." },
        { title: "Идентификаторы терминала и транзакции", text: "Находите именно то устройство и номер транзакции, с которыми связан платёж." },
        { title: "Провайдер и эквайринг", text: "Проверяйте, как транзакцию обработали и куда её направили." },
        { title: "Карта и способ оплаты", text: "Смотрите способ оплаты и доступные данные карты." },
      ],
      shotDetails: "Данные транзакции в Merchant Portal с кодом ответа и причиной отказа",

      regEyebrow: "Фискальные операции",
      regTitle: "Все смены, чеки и Z-отчёты в одном месте.",
      regSub: "Фильтруйте по магазину и устройству и находите нужную запись.",
      reg: [
        { title: "Фильтр по магазину, терминалу и дате", text: "Быстро сужайте поиск до нужной информации." },
        { title: "Время открытия и закрытия", text: "Смотрите, когда началась и закончилась каждая фискальная смена." },
        { title: "Оборот и количество операций", text: "Смотрите, какая активность зафиксирована в течение каждой смены." },
        { title: "Экспорт фискальных данных", text: "Готовьте фискальные данные для финансового отдела, бухгалтерии или внутренней проверки." },
      ],
      shotShifts: "Фискальные смены по магазинам и терминалам в Merchant Portal",

      zEyebrow: "Z-отчёты",
      zTitle: "Закрывайте день без бумажной волокиты.",
      zSub: "Полный Z-отчёт прямо из Портала — продажи, возвраты, наличные и НДС.",
      shotZ: "Z-отчёт, открытый в Merchant Portal",

      dayEyebrow: "Создан для ежедневной работы",
      dayTitle: "Меньше времени на поиски. Больше – на ведение бизнеса.",
      day: [
        { title: "Единый источник данных", text: "Продажи, оплата картой, операции с наличными и зачисление средств опираются на одни и те же данные." },
        { title: "Находите всё быстро", text: "Ищите и фильтруйте информацию по дате, сумме, магазину, терминалу, статусу или номеру транзакции." },
        { title: "Готово к отчётности", text: register ? "Экспортируйте платёжные и фискальные данные, когда они нужны финансовому или операционному отделу." : "Экспортируйте платёжные данные, когда они нужны финансовому или операционному отделу." },
        { title: "Для всех ваших точек", text: "Просматривайте активность разных магазинов и терминалов из одного аккаунта." },
      ],

      ctaA: "Ваш терминал проводит продажу.",
      ctaB: "Портал берёт на себя всё остальное.",
      ctaText: register
        ? "Управляйте платежами, фискальными операциями и зачислением средств из одного понятного рабочего пространства, подключённого к вашим терминалам SmartOne."
        : "Управляйте платежами и зачислением средств из одного понятного рабочего пространства, подключённого к вашим терминалам SmartOne.",
      ctaGet: "Свяжитесь с нами →",
    },
  );
}

/* A titled bullet with an icon, used under every screenshot section. */
function Points({ items, icons }: { items: { title: string; text: string }[]; icons: LucideIcon[] }) {
  // One column: these sit in the narrow half of a split layout, so two columns
  // would wrap the titles and leave an orphan on odd counts.
  return (
    <div className="mt-8 grid gap-5">
      {items.map((p, i) => {
        const Icon = icons[i];
        return (
          <div key={p.title} className="flex gap-3.5">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-brand-tint">
              <Icon className="size-5 text-brand" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-[15.5px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{p.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function MerchantPortalPage() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const register = promotesRegister(country);
  const c = copyFor(lang, register);

  // The fiscal sections describe the cash register, which is promoted only
  // where it is live (Malta today). Icons ride along so the two stay in step.
  const overviewIcons: LucideIcon[] = [LayoutDashboard, Activity, ReceiptText, Landmark];
  const overview = c.overview
    .map((o, i) => ({ ...o, icon: overviewIcons[i] }))
    .filter((_, i) => register || i !== 2);

  return (
    <>
      {/* 1 · hero */}
      <section className="relative overflow-x-clip pt-16 pb-20 lg:pt-24">
        <div className="pointer-events-none absolute -top-40 right-[-10%] size-150 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.09),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <span className="anim-fade-up inline-flex items-center gap-2 rounded-full bg-brand-tint px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-brand uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              {c.eyebrow}
            </span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-5 text-[clamp(34px,4.6vw,58px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="anim-fade-up anim-d-2 mt-5 max-w-125 text-[17px] leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 mt-8 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">{c.get}</Link>
            </div>
            <p className="anim-fade-up anim-d-3 mt-4 text-[13.5px] text-ink-3">{c.included}</p>
          </div>
          <Reveal>
            <AppShot src="/portal/dashboard.webp" alt={c.shotDashboard} priority />
          </Reveal>
        </div>
      </section>

      {/* 2 · overview */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.ovEyebrow} title={c.ovTitle} sub={c.ovSub} />
          <div className={`mt-11 grid gap-4 sm:grid-cols-2 ${register ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {overview.map((o, i) => {
              const Icon = o.icon;
              return (
                <Reveal key={o.title} delay={i * 80} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-white p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-tint">
                      <Icon className="size-5.5 text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-[16.5px] font-semibold tracking-tight">{o.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{o.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 · dashboard */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionHead eyebrow={c.dashEyebrow} title={c.dashTitle} sub={c.dashSub} />
              <Reveal delay={90}>
                <Points items={c.dash} icons={[TrendingUp, CreditCard, ShoppingBasket]} />
              </Reveal>
            </div>
            <Reveal delay={60}>
              <AppShot src="/portal/dashboard.webp" alt={c.shotDashboard} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 · payment analytics – screenshot leads */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal className="lg:order-1">
              <AppShot src="/portal/analytics.webp" alt={c.shotAnalytics} />
            </Reveal>
            <div className="lg:order-2">
              <SectionHead eyebrow={c.anEyebrow} title={c.anTitle} sub={c.anSub} />
              <Reveal delay={90}>
                <Points items={c.an} icons={[Wallet, Percent, Landmark]} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · transaction log */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionHead eyebrow={c.logEyebrow} title={c.logTitle} sub={c.logSub} />
              <Reveal delay={90}>
                <Points items={c.log} icons={[Search, Filter, RotateCcw, Download]} />
              </Reveal>
            </div>
            <Reveal delay={60}>
              <AppShot src="/portal/transactions.webp" alt={c.shotLog} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 · transaction details – screenshot leads */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal className="lg:order-1">
              <AppShot src="/portal/details.webp" alt={c.shotDetails} />
            </Reveal>
            <div className="lg:order-2">
              <SectionHead eyebrow={c.detEyebrow} title={c.detTitle} sub={c.detSub} />
              <Reveal delay={90}>
                <Points items={c.det} icons={[AlertCircle, Fingerprint, Route, CreditCard]} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7 + 8 · fiscal operations and Z-reports – only where the register is live */}
      {register && (
        <>
          <section className="py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                <div>
                  <SectionHead eyebrow={c.regEyebrow} title={c.regTitle} sub={c.regSub} />
                  <Reveal delay={90}>
                    <Points items={c.reg} icons={[CalendarRange, Clock, BarChart3, Download]} />
                  </Reveal>
                </div>
                <Reveal delay={60}>
                  <AppShot src="/portal/shifts.webp" alt={c.shotShifts} />
                </Reveal>
              </div>
            </div>
          </section>

          <section className="bg-brand-tint/50 py-24">
            <div className="mx-auto max-w-6xl px-6">
              <SectionHead eyebrow={c.zEyebrow} title={c.zTitle} sub={c.zSub} center />
              <Reveal delay={80}>
                <div className="mx-auto mt-11 max-w-4xl">
                  <AppShot src="/portal/zreport.webp" alt={c.shotZ} />
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* 9 · daily operations */}
      <section className={`py-24 ${register ? "" : "bg-bg-2"}`}>
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.dayEyebrow} title={c.dayTitle} />
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.day.map((d, i) => {
              const Icon = [Database, Search, Download, MapPin][i];
              return (
                <Reveal key={d.title} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-tint">
                      <Icon className="size-5.5 text-brand" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-[16.5px] font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{d.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 · final CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-6 py-16 text-center text-white sm:px-10">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-160 text-[clamp(26px,3.4vw,42px)] leading-[1.08]">
                  {c.ctaA}
                  <br className="hidden sm:block" /> {c.ctaB}
                </h2>
                <p className="mx-auto mt-4 mb-9 max-w-125 text-[16.5px] leading-relaxed text-white/80">{c.ctaText}</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">{c.ctaGet}</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
