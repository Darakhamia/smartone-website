import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = { title: "Privacy Policy" };

/* Template privacy policy – the [TODO] placeholders (legal entity, address,
   contact, supervisory authority) must be filled in and the whole document
   reviewed by a qualified adviser before it is relied on. */
export default async function PrivacyPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Privacy Policy",
      updated: "Last updated: [TODO: date]",
      intro:
        "This policy explains what personal data SmartOne collects, why, and the rights you have under the EU General Data Protection Regulation (GDPR). It is a template and is being finalised.",
      sections: [
        {
          h: "Who we are",
          p: [
            "SmartOne is operated by [TODO: legal entity name], [TODO: registered address]. For any privacy question you can reach us at [TODO: contact email].",
            "Where required, our data protection contact is [TODO: DPO / privacy contact].",
          ],
        },
        {
          h: "What we collect",
          p: [
            "When you contact us or request a terminal, we collect the details you provide: your name, business name, email, phone number, country and the message you send.",
            "When you browse the site, we store a small number of functional cookies (your country, language and that you have seen the cookie notice). We do not run advertising or analytics trackers.",
          ],
        },
        {
          h: "Why we use it and our legal basis",
          p: [
            "We use your contact details to respond to your enquiry and to set up your account and device – this is processing necessary to take steps at your request and to perform a contract (GDPR Art. 6(1)(b)).",
            "We use functional cookies to make the site work and remember your preferences, on the basis of our legitimate interest in providing a working site (GDPR Art. 6(1)(f)).",
          ],
        },
        {
          h: "Sharing",
          p: [
            "Payment and settlement services may be provided by authorised financial partners; where that applies we share only what is needed to provide the service. We do not sell your personal data.",
            "We may use processors (for example hosting and email providers) who act on our instructions under a data-processing agreement.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "We keep enquiry and customer data only as long as needed for the purpose it was collected and to meet legal, tax and accounting obligations, then delete or anonymise it. [TODO: confirm retention periods].",
          ],
        },
        {
          h: "Your rights",
          p: [
            "Under the GDPR you can ask to access, correct, delete or port your data, and to object to or restrict certain processing. To exercise any of these, contact us at [TODO: contact email].",
            "You also have the right to complain to your data protection authority – in Malta, the Information and Data Protection Commissioner (IDPC); in Spain, the Agencia Española de Protección de Datos (AEPD); or your local authority.",
          ],
        },
        {
          h: "Changes",
          p: ["We may update this policy; the date above shows the latest version."],
        },
      ],
    },
    {
      title: "Política de privacidad",
      updated: "Última actualización: [TODO: fecha]",
      intro:
        "Esta política explica qué datos personales recopila SmartOne, por qué, y los derechos que tienes según el Reglamento General de Protección de Datos (RGPD) de la UE. Es una plantilla en proceso de finalización.",
      sections: [
        {
          h: "Quiénes somos",
          p: [
            "SmartOne está operado por [TODO: razón social], [TODO: domicilio social]. Para cualquier consulta de privacidad puedes escribirnos a [TODO: email de contacto].",
            "Cuando corresponda, nuestro contacto de protección de datos es [TODO: DPO / contacto de privacidad].",
          ],
        },
        {
          h: "Qué recopilamos",
          p: [
            "Cuando nos contactas o solicitas un terminal, recopilamos los datos que facilitas: nombre, nombre del negocio, email, teléfono, país y el mensaje que envías.",
            "Cuando navegas por el sitio, guardamos unas pocas cookies funcionales (tu país, idioma y que has visto el aviso de cookies). No usamos rastreadores de publicidad ni de analítica.",
          ],
        },
        {
          h: "Para qué lo usamos y base legal",
          p: [
            "Usamos tus datos de contacto para responder a tu consulta y para dar de alta tu cuenta y dispositivo: es un tratamiento necesario para atender tu solicitud y ejecutar un contrato (art. 6(1)(b) RGPD).",
            "Usamos cookies funcionales para que el sitio funcione y recordar tus preferencias, sobre la base de nuestro interés legítimo en ofrecer un sitio operativo (art. 6(1)(f) RGPD).",
          ],
        },
        {
          h: "Con quién lo compartimos",
          p: [
            "Los servicios de pago y liquidación pueden ser prestados por socios financieros autorizados; en ese caso compartimos solo lo necesario para prestar el servicio. No vendemos tus datos personales.",
            "Podemos usar encargados de tratamiento (por ejemplo, proveedores de hosting y de email) que actúan según nuestras instrucciones bajo un acuerdo de tratamiento de datos.",
          ],
        },
        {
          h: "Cuánto tiempo lo conservamos",
          p: [
            "Conservamos los datos de consultas y de clientes solo el tiempo necesario para el fin para el que se recogieron y para cumplir obligaciones legales, fiscales y contables, y luego los eliminamos o anonimizamos. [TODO: confirmar plazos de conservación].",
          ],
        },
        {
          h: "Tus derechos",
          p: [
            "Según el RGPD puedes solicitar acceder, rectificar, suprimir o portar tus datos, y oponerte o limitar ciertos tratamientos. Para ejercerlos, escríbenos a [TODO: email de contacto].",
            "También tienes derecho a reclamar ante tu autoridad de protección de datos: en Malta, el Information and Data Protection Commissioner (IDPC); en España, la Agencia Española de Protección de Datos (AEPD); o tu autoridad local.",
          ],
        },
        {
          h: "Cambios",
          p: ["Podemos actualizar esta política; la fecha de arriba indica la última versión."],
        },
      ],
    },
  );
  return <LegalLayout title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
