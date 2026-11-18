import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { COMPANY, emiPartner } from "@/lib/legal";

export const metadata: Metadata = { title: "Legal Notice", ...pageSeo("/imprint") };

/* Legal Notice / Imprint. Required by the Malta e-Commerce Act (Cap. 426,
   implementing Dir. 2000/31 Art. 5) and the Companies Act (Cap. 386 s.82):
   the operator's identity, address, registration number, VAT number and a
   direct contact have to be easily, directly and permanently accessible –
   hence the footer link on every page. Every value comes from lib/legal.ts,
   including the licensed payment partner, which differs by market: UK
   merchants are served by the FCA-authorised company, not the EEA one. */
export default async function ImprintPage() {
  const country = await getActiveCountry();
  const emi = emiPartner(country);
  /* lib/legal.ts names the regulator in English and Spanish only; these are the
     Ukrainian and Russian forms (genitive), split by market the same way. */
  const regulatorUkRu =
    country.code === "uk"
      ? {
          uk: "Financial Conduct Authority (реєстраційний номер фірми 942777)",
          ru: "Financial Conduct Authority (регистрационный номер фирмы 942777)",
        }
      : { uk: "Болгарського народного банку", ru: "Болгарского народного банка" };
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Legal Notice",
      updated: "Last updated: 29 July 2026",
      intro:
        "Information about the company operating this website, published in line with the Malta e-Commerce Act (Cap. 426) and the Companies Act (Cap. 386).",
      sections: [
        {
          h: "Publisher",
          rows: [
            { k: "Company name", v: COMPANY.name },
            { k: "Legal form", v: "Private limited liability company registered in Malta (Companies Act, Cap. 386)" },
            { k: "Registration number", v: `${COMPANY.registrationNumber} (Malta Business Registry)` },
            { k: "Registered office", v: COMPANY.address },
            { k: "VAT identification number", v: COMPANY.vat },
            { k: "Email", v: COMPANY.email },
          ],
        },
        {
          h: "What this website is",
          p: [
            "This site presents SmartOne's payment and point-of-sale products and lets you get in touch with our sales team. It is informational: nothing on it is an offer, a binding quote or financial advice, and the rates, availability and features shown can differ by country and by the commercial terms actually agreed.",
            `${COMPANY.name} is part of the SmartOne group, which operates in Malta, Spain, Cyprus, Slovakia and the United Kingdom.`,
          ],
        },
        {
          h: "Payments — regulated partner",
          p: [
            `Payment, electronic-money and card-acquiring services are provided by ${emi.name}, an authorised electronic-money institution regulated by ${emi.regulator}${emi.passported ? " and passported into the European Union" : ""}.`,
            `${COMPANY.name} is a technology provider. It is not itself a licensed payment institution or electronic-money institution, and its own activity is not subject to authorisation; the regulated payment activity is carried out by the partner named above, which is also responsible for the related regulatory checks, including AML and KYC.`,
          ],
        },
        {
          h: "Governing law",
          p: [
            "This website and this notice are governed by the laws of Malta, and the courts of Malta have jurisdiction over any dispute arising from them. If you are a consumer, this does not deprive you of the protection of the mandatory rules of the country where you live.",
          ],
        },
        {
          h: "Contact",
          p: [
            `For any question about this website, the company or our products, write to ${COMPANY.email} or use the contact form. See our Privacy Policy for how we handle the details you send us.`,
          ],
        },
      ] as LegalSection[],
    },
    {
      title: "Aviso legal",
      updated: "Última actualización: 29 de julio de 2026",
      intro:
        "Información sobre la empresa que opera este sitio web, publicada conforme a la Malta e-Commerce Act (Cap. 426) y la Companies Act (Cap. 386).",
      sections: [
        {
          h: "Titular",
          rows: [
            { k: "Razón social", v: COMPANY.name },
            { k: "Forma jurídica", v: "Sociedad de responsabilidad limitada registrada en Malta (Companies Act, Cap. 386)" },
            { k: "Número de registro", v: `${COMPANY.registrationNumber} (Malta Business Registry)` },
            { k: "Domicilio social", v: COMPANY.address },
            { k: "Número de identificación a efectos de IVA", v: COMPANY.vat },
            { k: "Email", v: COMPANY.email },
          ],
        },
        {
          h: "Qué es este sitio web",
          p: [
            "Este sitio presenta los productos de pago y de punto de venta de SmartOne y te permite ponerte en contacto con nuestro equipo comercial. Es informativo: nada de lo que contiene constituye una oferta, un presupuesto vinculante ni asesoramiento financiero, y las tarifas, la disponibilidad y las funciones mostradas pueden variar según el país y según las condiciones comerciales efectivamente acordadas.",
            `${COMPANY.name} forma parte del grupo SmartOne, que opera en Malta, España, Chipre, Eslovaquia y el Reino Unido.`,
          ],
        },
        {
          h: "Pagos: socio regulado",
          p: [
            `Los servicios de pago, dinero electrónico y adquirencia de tarjetas los presta ${emi.name}, entidad de dinero electrónico autorizada y supervisada por ${emi.regulatorEs}${emi.passported ? ", con pasaporte comunitario en la Unión Europea" : ""}.`,
            `${COMPANY.name} es un proveedor tecnológico. No es una entidad de pago ni una entidad de dinero electrónico autorizada, y su propia actividad no está sujeta a autorización; la actividad de pago regulada la realiza el socio indicado arriba, que también es responsable de los controles regulatorios asociados, incluidos los de prevención de blanqueo (AML) y conocimiento del cliente (KYC).`,
          ],
        },
        {
          h: "Legislación aplicable",
          p: [
            "Este sitio web y este aviso se rigen por la legislación de Malta, y los tribunales de Malta son competentes para cualquier controversia derivada de ellos. Si eres consumidor, esto no te priva de la protección que te otorgan las normas imperativas del país donde resides.",
          ],
        },
        {
          h: "Contacto",
          p: [
            `Para cualquier consulta sobre este sitio web, la empresa o nuestros productos, escribe a ${COMPANY.email} o usa el formulario de contacto. Consulta nuestra Política de privacidad para saber cómo tratamos los datos que nos envías.`,
          ],
        },
      ] as LegalSection[],
    },
    {
      title: "Правова інформація",
      updated: "Останнє оновлення: 29 липня 2026 р.",
      intro:
        "Інформація про компанію, яка є оператором цього вебсайту, опублікована відповідно до Malta e-Commerce Act (Cap. 426) і Companies Act (Cap. 386).",
      sections: [
        {
          h: "Власник сайту",
          rows: [
            { k: "Назва компанії", v: COMPANY.name },
            { k: "Організаційно-правова форма", v: "Приватна компанія з обмеженою відповідальністю, зареєстрована на Мальті (Companies Act, Cap. 386)" },
            { k: "Реєстраційний номер", v: `${COMPANY.registrationNumber} (Malta Business Registry)` },
            { k: "Зареєстрований офіс", v: COMPANY.address },
            { k: "Ідентифікаційний номер платника ПДВ", v: COMPANY.vat },
            { k: "Електронна пошта", v: COMPANY.email },
          ],
        },
        {
          h: "Що являє собою цей вебсайт",
          p: [
            "Цей сайт представляє платіжні та POS-продукти SmartOne і дає змогу зв’язатися з нашим відділом продажу. Він має інформаційний характер: ніщо на ньому не є офертою, обов’язковим розрахунком вартості чи фінансовою порадою, а показані ставки, доступність і функції можуть відрізнятися залежно від країни та фактично погоджених комерційних умов.",
            `${COMPANY.name} входить до групи SmartOne, яка працює на Мальті, в Іспанії, на Кіпрі, у Словаччині та Сполученому Королівстві.`,
          ],
        },
        {
          h: "Платежі — регульований партнер",
          p: [
            `Платіжні послуги, послуги електронних грошей і карткового еквайрингу надає ${emi.name}, ліцензована установа електронних грошей під наглядом ${regulatorUkRu.uk}${emi.passported ? ", яка має європейський паспорт для діяльності в Європейському Союзі" : ""}.`,
            `${COMPANY.name} є постачальником технологій. Компанія сама не є ліцензованою платіжною установою чи установою електронних грошей, і її власна діяльність не підлягає ліцензуванню; регульовану платіжну діяльність здійснює зазначений вище партнер, який також відповідає за пов’язані з нею регуляторні перевірки, зокрема AML і KYC.`,
          ],
        },
        {
          h: "Застосовне право",
          p: [
            "Цей вебсайт і ця правова інформація регулюються законодавством Мальти, а суди Мальти мають юрисдикцію щодо будь-яких спорів, що з них виникають. Якщо ви споживач, це не позбавляє вас захисту імперативних норм країни, де ви проживаєте.",
          ],
        },
        {
          h: "Контакти",
          p: [
            `З будь-яких питань щодо цього вебсайту, компанії чи наших продуктів пишіть на ${COMPANY.email} або скористайтеся контактною формою. Дивіться нашу Політику конфіденційності, щоб дізнатися, як ми обробляємо дані, які ви нам надсилаєте.`,
          ],
        },
      ] as LegalSection[],
    },
    {
      title: "Правовая информация",
      updated: "Последнее обновление: 29 июля 2026 г.",
      intro:
        "Информация о компании, которая является оператором этого веб-сайта, опубликованная в соответствии с Malta e-Commerce Act (Cap. 426) и Companies Act (Cap. 386).",
      sections: [
        {
          h: "Владелец сайта",
          rows: [
            { k: "Название компании", v: COMPANY.name },
            { k: "Организационно-правовая форма", v: "Частная компания с ограниченной ответственностью, зарегистрированная на Мальте (Companies Act, Cap. 386)" },
            { k: "Регистрационный номер", v: `${COMPANY.registrationNumber} (Malta Business Registry)` },
            { k: "Зарегистрированный офис", v: COMPANY.address },
            { k: "Идентификационный номер плательщика НДС", v: COMPANY.vat },
            { k: "Электронная почта", v: COMPANY.email },
          ],
        },
        {
          h: "Что представляет собой этот веб-сайт",
          p: [
            "Этот сайт представляет платёжные и POS-продукты SmartOne и позволяет связаться с нашим отделом продаж. Он носит информационный характер: ничто на нём не является офертой, обязывающим расчётом стоимости или финансовой консультацией, а указанные ставки, доступность и функции могут различаться в зависимости от страны и фактически согласованных коммерческих условий.",
            `${COMPANY.name} входит в группу SmartOne, которая работает на Мальте, в Испании, на Кипре, в Словакии и Соединённом Королевстве.`,
          ],
        },
        {
          h: "Платежи — регулируемый партнёр",
          p: [
            `Платёжные услуги, услуги электронных денег и карточного эквайринга предоставляет ${emi.name}, лицензированное учреждение электронных денег под надзором ${regulatorUkRu.ru}${emi.passported ? ", которое имеет европейский паспорт для деятельности в Европейском союзе" : ""}.`,
            `${COMPANY.name} является поставщиком технологий. Компания сама не является лицензированным платёжным учреждением или учреждением электронных денег, и её собственная деятельность не подлежит лицензированию; регулируемую платёжную деятельность осуществляет указанный выше партнёр, который также отвечает за связанные с ней регуляторные проверки, включая AML и KYC.`,
          ],
        },
        {
          h: "Применимое право",
          p: [
            "Этот веб-сайт и эта правовая информация регулируются законодательством Мальты, и суды Мальты обладают юрисдикцией в отношении любых споров, возникающих в связи с ними. Если вы потребитель, это не лишает вас защиты императивных норм страны, в которой вы проживаете.",
          ],
        },
        {
          h: "Контакты",
          p: [
            `По любым вопросам об этом веб-сайте, компании или наших продуктах пишите на ${COMPANY.email} или воспользуйтесь контактной формой. Как мы обрабатываем данные, которые вы нам отправляете, см. в нашей Политике конфиденциальности.`,
          ],
        },
      ] as LegalSection[],
    },
  );
  return <LegalLayout title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
