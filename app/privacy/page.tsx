import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { COMPANY, emiPartner, IDPC } from "@/lib/legal";

export const metadata: Metadata = { title: "Privacy Policy" };

/* Privacy policy. It describes what the site actually does – keep the two in
   step whenever data handling changes. The English is wording agreed with
   counsel; change it only with sign-off.
   - the contact form (components/lead/lead-form.tsx) posts to an external
     endpoint, so that processor is named in "Who we share it with";
   - first-touch attribution (components/lead/attribution.tsx) writes UTM tags
     and the referrer to localStorage only with the Marketing category, so it
     is described here as resting on consent, not on legitimate interest —
     change one and the other has to change too;
   - Google and Meta load only on consent and never before an answer
     (lib/tags.ts), and every provider they bring is in the section 5 table;
   - every cookie is listed in full in /cookies;
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
      updated: "Last updated: 8 October 2026",
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
            "If you agree to the Marketing category, we store in your browser's local storage which campaign tag or referring site brought you here (so_first_touch). If you later send us an enquiry, it is submitted with the form so we know which channel it came from. It contains no name or contact details and is not shared with advertising networks. If you do not, nothing is stored.",
            "When you browse the site, we use necessary cookies that remember your country, your language and your cookie choice, and one that protects our enquiry form against automated abuse.",
            "If you agree to it, we also use analytics and advertising technologies from Google and Meta. What they do and who receives the data is in section 5; each cookie is listed in our Cookie Policy. Nothing in those two categories operates unless you agree, and nothing is loaded before you answer the cookie notice.",
            "Our servers keep short-lived technical logs (IP address, request time, page requested, browser type) to keep the site running and secure.",
          ],
        },
        {
          h: "4. Why we use it and our legal basis",
          p: [
            "To respond to your enquiry and to set up your account and device — processing necessary to take steps at your request and to perform a contract (GDPR Art. 6(1)(b)). This covers your name, business name, email, phone and message.",
            "To qualify and price our offer to you — your business type, monthly card-sales band and current processor, all optional — on the basis of our legitimate interest in preparing a suitable commercial proposal (GDPR Art. 6(1)(f)). You can object to this at any time.",
            "To understand which channels our enquiries come from, to measure how the site is used, to see combined statistics across the devices of a signed-in Google user, and to match an enquiry to the advertisement that produced it — your consent, given through our cookie notice (GDPR Art. 6(1)(a)). None of this happens unless you agree, and you can withdraw your consent at any time from Cookie settings at the bottom of every page, which also deletes what was stored in your browser.",
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
            {
              table: {
                head: ["Provider", "What it does", "Who and in what role"],
                rows: [
                  [
                    "Google Tag Manager",
                    "Loads and manages the tags below. Sets no cookies of its own.",
                    "Google Ireland Limited, as our processor",
                  ],
                  [
                    "Google Analytics 4, incl. Google Signals",
                    "Visit statistics, and combined statistics across devices of a signed-in Google user.",
                    "Google Ireland Limited, as our processor. The account data Google draws on is Google's own",
                  ],
                  [
                    "Google Ads conversion measurement",
                    "Attributing an enquiry to the campaign that produced it.",
                    "Google Ireland Limited, as an independent controller: Google also uses this data for its own purposes",
                  ],
                  [
                    "Google Enhanced Conversions",
                    "Matching an enquiry to an advertisement using a scrambled form of your email and phone.",
                    "Google Ireland Limited, as our processor for this service specifically",
                  ],
                  [
                    "HubSpot (enquiry form and CRM)",
                    "Receiving your enquiry, storing it, and letting us answer you.",
                    "HubSpot, Inc., Two Canal Park, Cambridge, MA 02141, USA, as our processor under its data processing agreement",
                  ],
                  [
                    "Meta pixel, incl. Advanced Matching",
                    "The same, for Facebook and Instagram.",
                    "Meta Platforms Ireland Limited. Joint controllers with us for collecting and sending the event; Meta is its own controller afterwards",
                  ],
                ],
              },
            },
            "Where we and Meta are joint controllers, we have the arrangement that Article 26 of the GDPR requires, and this is the substance of it: we decide which events on this site are sent and we are responsible for asking for your agreement and for the information on this page; Meta is responsible for what it does with the data once it has it. You may bring a request about your rights to either of us. If you bring it to us, we will answer for our part and pass the rest to Meta within seven days; we cannot answer on Meta's behalf.",
            "We do not sell your personal data, and we do not share it with data brokers. Apart from the providers named above, we do not share it with advertising networks.",
          ],
        },
        {
          h: "6. International transfers",
          p: [
            "This website, and the enquiries you send through it, are hosted on servers located in the United States. Your personal data is therefore transferred outside the European Economic Area.",
            "For that transfer, for the analytics and advertising providers named in section 5, and for any other provider outside the EEA, we rely on one of the following. If you agree to analytics or advertising cookies, data about your visit — including your IP address — is received by Google and Meta and may be processed by their group companies in the United States.",
            {
              list: [
                "an adequacy decision of the European Commission (GDPR Art. 45), where the receiving company is certified under the EU–US Data Privacy Framework. The United Kingdom is likewise covered by an adequacy decision.",
                "for data reaching Meta from the United Kingdom, the Data Privacy Framework does not apply, and the Standard Contractual Clauses below are used instead.",
                "the European Commission's Standard Contractual Clauses (GDPR Art. 46), together with a transfer impact assessment and any additional technical and organisational measures required, where no adequacy decision applies — including if the EU–US Data Privacy Framework ceases to apply to a recipient.",
              ],
            },
            `You can ask us which safeguard applies to a specific provider by writing to ${COMPANY.email}.`,
          ],
        },
        {
          h: "7. Automated decision-making",
          p: [
            "We do not make decisions about you based solely on automated processing, and we do not build profiles of you for our own decisions: your enquiry is read and answered by a person. If you agree to analytics or advertising, Google and Meta use the data they receive for their own advertising purposes, which include profiling by them and, where Google Signals applies, linking your visit to your Google account across devices. The volume band you select on the site only helps us prepare the conversation.",
          ],
        },
        {
          h: "8. How long we keep it",
          p: [
            "We keep data only as long as needed for the purpose it was collected, then delete or anonymise it.",
            "Enquiries from people who do not become customers: 24 months from your last contact with us, after which they are deleted from our CRM. Analytics data held in Google Analytics: 14 months. Advertising identifiers in your browser: as set out in the Cookie Policy, the longest being 90 days. Data held by Google and Meta for their own purposes is kept by them under their own policies, which we do not control.",
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
      updated: "Última actualización: 8 de octubre de 2026",
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
            "Si aceptas la categoría Marketing, guardamos en el almacenamiento local de tu navegador qué etiqueta de campaña o qué sitio de referencia te trajo hasta aquí (so_first_touch). Si después nos envías una consulta, ese dato se envía con el formulario para saber de qué canal procede. No contiene tu nombre ni tus datos de contacto y no se comparte con redes publicitarias. Si no la aceptas, no se guarda nada.",
            "Cuando navegas por el sitio, usamos cookies necesarias que recuerdan tu país, tu idioma y tu elección sobre las cookies, y una que protege nuestro formulario de consultas frente a abusos automatizados.",
            "Si lo aceptas, también usamos tecnologías de analítica y publicidad de Google y Meta. Qué hacen y quién recibe los datos se explica en el apartado 5; cada cookie figura en nuestra Política de cookies. Nada de esas dos categorías funciona si no lo aceptas, y no se carga nada antes de que respondas al aviso de cookies.",
            "Nuestros servidores conservan registros técnicos de corta duración (dirección IP, hora de la petición, página solicitada, tipo de navegador) para mantener el sitio en funcionamiento y seguro.",
          ],
        },
        {
          h: "4. Para qué lo usamos y base legal",
          p: [
            "Para responder a tu consulta y dar de alta tu cuenta y tu dispositivo: tratamiento necesario para atender tu solicitud y ejecutar un contrato (art. 6(1)(b) RGPD). Cubre tu nombre, el nombre del negocio, el email, el teléfono y el mensaje.",
            "Para cualificar y presupuestar nuestra oferta —tipo de negocio, tramo de ventas mensuales con tarjeta y procesador actual, todos opcionales— sobre la base de nuestro interés legítimo en preparar una propuesta comercial adecuada (art. 6(1)(f) RGPD). Puedes oponerte en cualquier momento.",
            "Para saber de qué canales llegan nuestras consultas, medir cómo se usa el sitio, ver estadísticas combinadas entre los dispositivos de un usuario que ha iniciado sesión en Google y asociar una consulta al anuncio que la generó: tu consentimiento, prestado a través de nuestro aviso de cookies (art. 6(1)(a) RGPD). Nada de esto ocurre si no lo aceptas, y puedes retirar tu consentimiento en cualquier momento desde «Configuración de cookies», al pie de cada página, lo que también borra lo que se haya guardado en tu navegador.",
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
            {
              table: {
                head: ["Proveedor", "Qué hace", "Quién y en qué calidad"],
                rows: [
                  [
                    "Google Tag Manager",
                    "Carga y gestiona las etiquetas siguientes. No instala cookies propias.",
                    "Google Ireland Limited, como encargado del tratamiento",
                  ],
                  [
                    "Google Analytics 4, incl. Google Signals",
                    "Estadísticas de visitas y estadísticas combinadas entre los dispositivos de un usuario que ha iniciado sesión en Google.",
                    "Google Ireland Limited, como encargado del tratamiento. Los datos de la cuenta que utiliza Google son de Google",
                  ],
                  [
                    "Medición de conversiones de Google Ads",
                    "Atribuir una consulta a la campaña que la generó.",
                    "Google Ireland Limited, como responsable independiente: Google también usa estos datos para sus propios fines",
                  ],
                  [
                    "Conversiones mejoradas de Google (Enhanced Conversions)",
                    "Asociar una consulta a un anuncio mediante una forma codificada de tu email y tu teléfono.",
                    "Google Ireland Limited, como encargado del tratamiento para este servicio en concreto",
                  ],
                  [
                    "HubSpot (formulario de consultas y CRM)",
                    "Recibir tu consulta, conservarla y permitirnos responderte.",
                    "HubSpot, Inc., Two Canal Park, Cambridge, MA 02141, EE. UU., como encargado del tratamiento conforme a su acuerdo de tratamiento de datos",
                  ],
                  [
                    "Píxel de Meta, incl. Advanced Matching",
                    "Lo mismo, para Facebook e Instagram.",
                    "Meta Platforms Ireland Limited. Corresponsables con nosotros de la recogida y el envío del evento; Meta es responsable por su cuenta a partir de ahí",
                  ],
                ],
              },
            },
            "Cuando Meta y nosotros somos corresponsables, tenemos el acuerdo que exige el artículo 26 del RGPD, y este es su contenido esencial: decidimos qué eventos de este sitio se envían y somos responsables de pedir tu consentimiento y de la información de esta página; Meta es responsable de lo que hace con los datos una vez que los tiene. Puedes dirigir una solicitud sobre tus derechos a cualquiera de los dos. Si nos la diriges a nosotros, responderemos por nuestra parte y trasladaremos el resto a Meta en un plazo de siete días; no podemos responder en nombre de Meta.",
            "No vendemos tus datos personales y no los compartimos con intermediarios de datos. Aparte de los proveedores indicados arriba, no los compartimos con redes publicitarias.",
          ],
        },
        {
          h: "6. Transferencias internacionales",
          p: [
            "Este sitio web, y las consultas que nos envías a través de él, están alojados en servidores situados en los Estados Unidos. Por tanto, tus datos personales se transfieren fuera del Espacio Económico Europeo.",
            "Para esa transferencia, para los proveedores de analítica y publicidad indicados en el apartado 5 y para cualquier otro proveedor situado fuera del EEE, nos apoyamos en una de las siguientes garantías. Si aceptas las cookies de analítica o de publicidad, Google y Meta reciben datos sobre tu visita —incluida tu dirección IP—, que pueden ser tratados por sociedades de sus grupos en los Estados Unidos.",
            {
              list: [
                "una decisión de adecuación de la Comisión Europea (art. 45 RGPD), cuando la empresa receptora está certificada en el Marco de Privacidad de Datos UE–EE. UU. El Reino Unido también está cubierto por una decisión de adecuación.",
                "para los datos que llegan a Meta desde el Reino Unido, el Marco de Privacidad de Datos no se aplica, y en su lugar se utilizan las Cláusulas Contractuales Tipo indicadas a continuación.",
                "las Cláusulas Contractuales Tipo de la Comisión Europea (art. 46 RGPD), junto con una evaluación de impacto de la transferencia y las medidas técnicas y organizativas adicionales que resulten necesarias, cuando no se aplique ninguna decisión de adecuación, incluido el caso de que el Marco de Privacidad de Datos UE–EE. UU. deje de aplicarse a un destinatario.",
              ],
            },
            `Puedes preguntarnos qué garantía se aplica a un proveedor concreto escribiendo a ${COMPANY.email}.`,
          ],
        },
        {
          h: "7. Decisiones automatizadas",
          p: [
            "No tomamos decisiones sobre ti basadas únicamente en tratamientos automatizados ni elaboramos perfiles tuyos para nuestras propias decisiones: tu consulta la lee y la responde una persona. Si aceptas la analítica o la publicidad, Google y Meta usan los datos que reciben para sus propios fines publicitarios, que incluyen la elaboración de perfiles por su parte y, cuando se aplica Google Signals, la vinculación de tu visita con tu cuenta de Google en distintos dispositivos. El tramo de volumen que eliges en el sitio solo nos ayuda a preparar la conversación.",
          ],
        },
        {
          h: "8. Cuánto tiempo lo conservamos",
          p: [
            "Conservamos los datos solo el tiempo necesario para el fin para el que se recogieron y después los eliminamos o los anonimizamos.",
            "Consultas de personas que no se convierten en clientes: 24 meses desde tu último contacto con nosotros; después se eliminan de nuestro CRM. Datos de analítica conservados en Google Analytics: 14 meses. Identificadores publicitarios en tu navegador: según se indica en la Política de cookies, el más largo de 90 días. Los datos que Google y Meta conservan para sus propios fines los conservan ellos según sus propias políticas, que no controlamos.",
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
