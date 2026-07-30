import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { COMPANY, emiPartner } from "@/lib/legal";

export const metadata: Metadata = { title: "Legal Notice" };

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
  );
  return <LegalLayout title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
