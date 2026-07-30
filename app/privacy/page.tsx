import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { COMPANY, emiPartner, IDPC } from "@/lib/legal";

export const metadata: Metadata = { title: "Privacy Policy" };

/* Privacy policy. It describes what the site actually does – keep the two in
   step whenever data handling changes:
   - the contact form (components/lead/lead-form.tsx) posts to an external
     endpoint, so that processor is named in "Who we share it with";
   - first-touch attribution (components/lead/attribution.tsx) writes UTM tags
     and the referrer to localStorage only after the visitor accepts the cookie
     notice, so it is described here as resting on consent, not on legitimate
     interest — change one and the other has to change too;
   - the three functional cookies are listed in full in /cookies;
   - the licensed payment partner differs by market, so it comes from
     emiPartner() rather than being written into the copy.
   A policy that describes processing the site doesn't do is as much of a
   compliance problem as one that omits processing it does. */
export default async function PrivacyPage() {
  const country = await getActiveCountry();
  const emi = emiPartner(country);
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Privacy Policy",
      updated: "Last updated: 29 July 2026",
      intro:
        "This policy explains what personal data SmartOne collects, why, and the rights you have under the EU General Data Protection Regulation (GDPR) and the Maltese Data Protection Act (Cap. 586).",
      sections: [
        {
          h: "1. Who we are",
          p: [
            `This website is operated by ${COMPANY.name} (company registration no. ${COMPANY.registrationNumber}), a private limited liability company registered in Malta, with registered office at ${COMPANY.address}. We are the controller of the personal data described here.`,
            `For any privacy question, or to exercise your rights, write to ${COMPANY.email}.`,
          ],
        },
        {
          h: "2. Scope",
          p: [
            "This policy covers this website and the enquiries you send us through it. It does not cover the payment services themselves: those are provided by our regulated partner, which handles the related data under its own terms and its own regulatory obligations.",
          ],
        },
        {
          h: "3. What we collect",
          p: [
            "When you contact us or request a terminal, we collect the details you provide: your name, business name, email address, phone number, country, the type and size of your business, your current card processor and how you heard about us (all of these except name, email and country are optional), and the message you send.",
            "If you accept the cookie notice, we store in your browser's local storage which campaign tag or referring site brought you here (so_first_touch). If you later send us an enquiry, it is submitted with the form so we know which channel it came from. It contains no name or contact details and is not shared with advertising networks. Decline the notice and nothing is stored.",
            "When you browse the site, we store three functional cookies: your country, your language, and the fact that you have seen the cookie notice. We do not run advertising, analytics or cross-site tracking.",
            "Our servers keep short-lived technical logs (IP address, request time, page requested, browser type) to keep the site running and secure.",
          ],
        },
        {
          h: "4. Why we use it and our legal basis",
          p: [
            "To respond to your enquiry and to set up your account and device — processing necessary to take steps at your request and to perform a contract (GDPR Art. 6(1)(b)). This covers your name, business name, email, phone and message.",
            "To qualify and price our offer to you — your business type, monthly card-sales band and current processor, all optional — on the basis of our legitimate interest in preparing a suitable commercial proposal (GDPR Art. 6(1)(f)). You can object to this at any time.",
            "To understand which channels our enquiries come from — your consent, given by accepting the cookie notice (GDPR Art. 6(1)(a)). You can withdraw it at any time by clearing your browser storage for this site, and nothing is stored unless you accept.",
            "To run the functional cookies that remember your country, language and that you have answered the cookie notice — our legitimate interest in a working site (GDPR Art. 6(1)(f)).",
            "To keep the site available and secure and to meet our legal, tax and accounting obligations — our legitimate interest in the security of our systems (GDPR Art. 6(1)(f)) and compliance with a legal obligation (GDPR Art. 6(1)(c)).",
          ],
        },
        {
          h: "5. Who we share it with",
          p: [
            `Payment, electronic-money and card-acquiring services are provided by ${emi.name}, an authorised electronic-money institution regulated by ${emi.regulator}${emi.passported ? " and passported into the European Union" : ""}. Where those services apply to you we share only what is needed to provide them, and that partner is the party responsible for payment-related regulatory checks, including AML and KYC.`,
            "We use processors who act only on our instructions under a data-processing agreement: our website host, the service that receives and routes the contact form, and our email and CRM providers.",
            "We may share your details with other companies in the SmartOne group in Malta, Spain, Cyprus, Slovakia and the United Kingdom where that is needed to serve you in your market.",
            "We do not sell your personal data, and we do not share it with advertising networks or data brokers.",
          ],
        },
        {
          h: "6. International transfers",
          p: [
            "This website, and the enquiries you send through it, are hosted on servers located in the United States. Your personal data is therefore transferred outside the European Economic Area.",
            "For that transfer, and for any other processor outside the EEA, we rely on either an adequacy decision of the European Commission, where the provider is certified under the EU–US Data Privacy Framework, or the European Commission's Standard Contractual Clauses under GDPR Art. 46, together with a transfer impact assessment and any additional technical and organisational measures required.",
            `You can ask us which safeguard applies to a specific provider by writing to ${COMPANY.email}.`,
          ],
        },
        {
          h: "7. Automated decision-making",
          p: [
            "We do not make decisions about you based solely on automated processing, and we do not profile you. Your enquiry is read and priced by a person; the volume band you select on the site only helps us prepare the conversation.",
          ],
        },
        {
          h: "8. How long we keep it",
          p: [
            "We keep data only as long as needed for the purpose it was collected, then delete or anonymise it.",
            "Sales enquiries that do not become customers: up to 12 months from your last contact with us.",
            "Customer and transaction records: for the duration of the relationship, and afterwards for the statutory retention periods that apply under Maltese law — including approximately 6 years for VAT records (VAT Act, Cap. 406) and up to 9–10 years for tax and accounting records (Income Tax Management Act, Cap. 372; Companies Act, Cap. 386).",
            "Technical server logs: a short period, normally no more than a few weeks.",
          ],
        },
        {
          h: "9. Your rights",
          p: [
            "Under the GDPR you can ask us to give you access to your data, correct it, delete it, or send it to another provider; you can object to processing based on our legitimate interest, ask us to restrict processing, and where we rely on consent you can withdraw it at any time without affecting what we did before.",
            `To exercise any of these, write to ${COMPANY.email}. We respond within one month.`,
            `You also have the right to lodge a complaint with a data protection authority. Our lead authority is the ${IDPC.name}, ${IDPC.address}, tel ${IDPC.phone}, ${IDPC.email}. You can also complain to the authority in the country where you live or work.`,
          ],
        },
        {
          h: "10. Children",
          p: [
            "This site and our products are aimed at businesses, not at children. We do not knowingly collect personal data from anyone under 16. If you believe a child has sent us their details, write to us and we will delete them.",
          ],
        },
        {
          h: "11. Changes",
          p: [
            "We may update this policy as our services change; the date at the top shows the current version. If a change materially affects how we use your data, we will make that clear on this page.",
          ],
        },
      ] as LegalSection[],
    },
    {
      title: "Política de privacidad",
      updated: "Última actualización: 29 de julio de 2026",
      intro:
        "Esta política explica qué datos personales recopila SmartOne, por qué, y los derechos que tienes según el Reglamento General de Protección de Datos (RGPD) de la UE y la Ley de protección de datos de Malta (Cap. 586).",
      sections: [
        {
          h: "1. Quiénes somos",
          p: [
            `Este sitio web está operado por ${COMPANY.name} (número de registro ${COMPANY.registrationNumber}), sociedad de responsabilidad limitada registrada en Malta, con domicilio social en ${COMPANY.address}. Somos el responsable del tratamiento de los datos personales que se describen aquí.`,
            `Para cualquier consulta de privacidad, o para ejercer tus derechos, escribe a ${COMPANY.email}.`,
          ],
        },
        {
          h: "2. Ámbito",
          p: [
            "Esta política cubre este sitio web y las consultas que nos envías a través de él. No cubre los servicios de pago en sí: los presta nuestro socio regulado, que trata los datos correspondientes según sus propias condiciones y sus propias obligaciones regulatorias.",
          ],
        },
        {
          h: "3. Qué recopilamos",
          p: [
            "Cuando nos contactas o solicitas un terminal, recopilamos los datos que facilitas: nombre, nombre del negocio, email, teléfono, país, el tipo y el tamaño de tu negocio, quién procesa tus tarjetas actualmente y cómo nos conociste (todos ellos opcionales salvo el nombre, el email y el país), y el mensaje que envías.",
            "Si aceptas el aviso de cookies, guardamos en el almacenamiento local de tu navegador qué etiqueta de campaña o qué sitio de referencia te trajo hasta aquí (so_first_touch). Si después nos envías una consulta, ese dato se envía con el formulario para saber de qué canal procede. No contiene tu nombre ni tus datos de contacto y no se comparte con redes publicitarias. Si lo rechazas, no se guarda nada.",
            "Cuando navegas por el sitio, guardamos tres cookies funcionales: tu país, tu idioma y el hecho de que ya has visto el aviso de cookies. No usamos publicidad, analítica ni rastreo entre sitios.",
            "Nuestros servidores conservan registros técnicos de corta duración (dirección IP, hora de la petición, página solicitada, tipo de navegador) para mantener el sitio en funcionamiento y seguro.",
          ],
        },
        {
          h: "4. Para qué lo usamos y base legal",
          p: [
            "Para responder a tu consulta y dar de alta tu cuenta y tu dispositivo: tratamiento necesario para atender tu solicitud y ejecutar un contrato (art. 6(1)(b) RGPD). Cubre tu nombre, el nombre del negocio, el email, el teléfono y el mensaje.",
            "Para cualificar y presupuestar nuestra oferta —tipo de negocio, tramo de ventas mensuales con tarjeta y procesador actual, todos opcionales— sobre la base de nuestro interés legítimo en preparar una propuesta comercial adecuada (art. 6(1)(f) RGPD). Puedes oponerte en cualquier momento.",
            "Para saber de qué canales llegan nuestras consultas: tu consentimiento, prestado al aceptar el aviso de cookies (art. 6(1)(a) RGPD). Puedes retirarlo cuando quieras borrando el almacenamiento de este sitio en tu navegador, y no se guarda nada si no lo aceptas.",
            "Para las cookies funcionales que recuerdan tu país, tu idioma y que ya has respondido al aviso de cookies: nuestro interés legítimo en un sitio operativo (art. 6(1)(f) RGPD).",
            "Para mantener el sitio disponible y seguro y cumplir nuestras obligaciones legales, fiscales y contables: nuestro interés legítimo en la seguridad de nuestros sistemas (art. 6(1)(f) RGPD) y el cumplimiento de una obligación legal (art. 6(1)(c) RGPD).",
          ],
        },
        {
          h: "5. Con quién lo compartimos",
          p: [
            `Los servicios de pago, dinero electrónico y adquirencia de tarjetas los presta ${emi.name}, entidad de dinero electrónico autorizada y supervisada por ${emi.regulatorEs}${emi.passported ? ", con pasaporte comunitario en la Unión Europea" : ""}. Cuando esos servicios te apliquen, compartimos solo lo necesario para prestarlos, y ese socio es el responsable de los controles regulatorios relacionados con los pagos, incluidos los de prevención de blanqueo (AML) y conocimiento del cliente (KYC).`,
            "Utilizamos encargados de tratamiento que actúan únicamente conforme a nuestras instrucciones y bajo un acuerdo de tratamiento de datos: nuestro proveedor de hosting, el servicio que recibe y enruta el formulario de contacto, y nuestros proveedores de email y CRM.",
            "Podemos compartir tus datos con otras empresas del grupo SmartOne en Malta, España, Chipre, Eslovaquia y el Reino Unido cuando sea necesario para atenderte en tu mercado.",
            "No vendemos tus datos personales y no los compartimos con redes publicitarias ni con intermediarios de datos.",
          ],
        },
        {
          h: "6. Transferencias internacionales",
          p: [
            "Este sitio web, y las consultas que nos envías a través de él, están alojados en servidores situados en los Estados Unidos. Por tanto, tus datos personales se transfieren fuera del Espacio Económico Europeo.",
            "Para esa transferencia, y para cualquier otro encargado situado fuera del EEE, nos apoyamos o bien en una decisión de adecuación de la Comisión Europea, cuando el proveedor está certificado en el Marco de Privacidad de Datos UE–EE. UU., o bien en las Cláusulas Contractuales Tipo de la Comisión Europea conforme al art. 46 RGPD, junto con una evaluación de impacto de la transferencia y las medidas técnicas y organizativas adicionales que resulten necesarias.",
            `Puedes preguntarnos qué garantía se aplica a un proveedor concreto escribiendo a ${COMPANY.email}.`,
          ],
        },
        {
          h: "7. Decisiones automatizadas",
          p: [
            "No tomamos decisiones sobre ti basadas únicamente en tratamientos automatizados ni elaboramos perfiles. Tu consulta la lee y la presupuesta una persona; el tramo de volumen que eliges en el sitio solo nos ayuda a preparar la conversación.",
          ],
        },
        {
          h: "8. Cuánto tiempo lo conservamos",
          p: [
            "Conservamos los datos solo el tiempo necesario para el fin para el que se recogieron y después los eliminamos o los anonimizamos.",
            "Consultas comerciales que no se convierten en clientes: hasta 12 meses desde tu último contacto con nosotros.",
            "Registros de clientes y de transacciones: durante la relación y, después, durante los plazos de conservación legalmente exigidos en Malta, incluidos aproximadamente 6 años para los registros de IVA (VAT Act, Cap. 406) y hasta 9–10 años para los registros fiscales y contables (Income Tax Management Act, Cap. 372; Companies Act, Cap. 386).",
            "Registros técnicos del servidor: un periodo breve, normalmente no más de unas semanas.",
          ],
        },
        {
          h: "9. Tus derechos",
          p: [
            "Según el RGPD puedes pedirnos acceder a tus datos, rectificarlos, suprimirlos o enviarlos a otro proveedor; puedes oponerte a los tratamientos basados en nuestro interés legítimo, pedir que los limitemos y, cuando nos basemos en el consentimiento, retirarlo en cualquier momento sin que ello afecte a lo ya realizado.",
            `Para ejercer cualquiera de estos derechos, escribe a ${COMPANY.email}. Respondemos en el plazo de un mes.`,
            `También tienes derecho a reclamar ante una autoridad de protección de datos. Nuestra autoridad principal es la Office of the Information and Data Protection Commissioner (IDPC), ${IDPC.address}, tel. ${IDPC.phone}, ${IDPC.email}. En España puedes dirigirte a la Agencia Española de Protección de Datos (AEPD), y en general a la autoridad del país donde vives o trabajas.`,
          ],
        },
        {
          h: "10. Menores",
          p: [
            "Este sitio y nuestros productos están dirigidos a empresas, no a menores. No recopilamos conscientemente datos personales de menores de 16 años. Si crees que un menor nos ha facilitado sus datos, escríbenos y los eliminaremos.",
          ],
        },
        {
          h: "11. Cambios",
          p: [
            "Podemos actualizar esta política a medida que cambien nuestros servicios; la fecha de arriba indica la versión vigente. Si un cambio afecta de forma sustancial al uso de tus datos, lo indicaremos claramente en esta página.",
          ],
        },
      ] as LegalSection[],
    },
  );
  return <LegalLayout title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
