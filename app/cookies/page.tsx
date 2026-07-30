import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = { title: "Cookie Policy" };

/* Keep this in sync with what the site actually stores. Today that is three
   functional cookies (so_country, so_lang, so_cookie_notice) plus one
   localStorage entry (so_first_touch, components/lead/attribution.tsx) –
   ePrivacy Art. 5(3) covers local storage the same way it covers cookies, so
   it is listed here too, and it is written only after the visitor accepts.

   There is no third-party content on any page, hence no "third-party content"
   section: nothing external is embedded, so nothing external sets a cookie.
   Adding any embed – a review widget, analytics, a video – means bringing that
   section back, gating the embed behind consent, and adding its origins to the
   CSP in next.config.ts. All three have to move together, or the statements
   below stop being true. */
export default async function CookiesPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Cookie Policy",
      updated: "Last updated: 29 July 2026",
      intro:
        "Cookies are small files a site stores in your browser. We keep our use of them to a minimum — only what's needed to run the site and remember your preferences.",
      sections: [
        {
          h: "The cookies we use",
          p: [
            "All of these are first-party and functional. They are needed for the site to work as you expect, so no consent is required for them.",
          ],
          rows: [
            {
              k: "so_country",
              v: "Remembers the country you selected, so we show the right products, pricing and compliance information. Expires after about 1 year.",
            },
            { k: "so_lang", v: "Remembers your chosen language. Expires after about 1 year." },
            {
              k: "so_cookie_notice",
              v: "Remembers that you've seen this notice so we don't show it again. Expires after about 1 year.",
            },
          ],
        },
        {
          h: "Local storage — only if you agree",
          p: [
            "One entry, so_first_touch, records which campaign tag or referring site brought you to us. If you later send us an enquiry it travels with the form, so we know which channel it came from.",
            "This one is not needed to run the site, so we ask first: it is written only after you accept the cookie notice. Decline, and nothing is stored. It holds no name and no contact details, it is first-party, and it is never shared with advertising networks. You can clear it at any time in your browser settings, along with the cookies.",
          ],
        },
        {
          h: "What we don't use",
          p: [
            "We do not use advertising cookies, and we do not run analytics or cross-site tracking. No third party sets a cookie from our pages.",
            "If that ever changes, we will update this page and ask for your consent first, before any such cookie or tag is loaded.",
          ],
        },
        {
          h: "Managing cookies",
          p: [
            "You can delete or block cookies and local storage in your browser settings. Because ours are functional, blocking them mainly means the site forgets your country and language and shows the cookie notice again.",
          ],
        },
        {
          h: "Contact",
          p: [`Questions about cookies? Write to us at ${COMPANY.email}. See also our Privacy Policy.`],
        },
      ] as LegalSection[],
    },
    {
      title: "Política de cookies",
      updated: "Última actualización: 29 de julio de 2026",
      intro:
        "Las cookies son pequeños archivos que un sitio guarda en tu navegador. Reducimos su uso al mínimo: solo lo necesario para que el sitio funcione y recordar tus preferencias.",
      sections: [
        {
          h: "Las cookies que usamos",
          p: [
            "Todas son propias y funcionales. Son necesarias para que el sitio funcione como esperas, así que no requieren consentimiento.",
          ],
          rows: [
            {
              k: "so_country",
              v: "Recuerda el país que elegiste, para mostrarte los productos, los precios y la información de cumplimiento correctos. Caduca al cabo de un año aproximadamente.",
            },
            { k: "so_lang", v: "Recuerda el idioma que elegiste. Caduca al cabo de un año aproximadamente." },
            {
              k: "so_cookie_notice",
              v: "Recuerda que ya viste este aviso para no mostrártelo de nuevo. Caduca al cabo de un año aproximadamente.",
            },
          ],
        },
        {
          h: "Almacenamiento local: solo si lo aceptas",
          p: [
            "Una entrada, so_first_touch, registra qué etiqueta de campaña o qué sitio de referencia te trajo hasta nosotros. Si después nos envías una consulta, viaja con el formulario para saber de qué canal procede.",
            "Esta no es necesaria para que el sitio funcione, así que te lo preguntamos antes: solo se guarda después de que aceptes el aviso de cookies. Si lo rechazas, no se guarda nada. No contiene tu nombre ni tus datos de contacto, es propia y nunca se comparte con redes publicitarias. Puedes borrarla cuando quieras desde la configuración de tu navegador, junto con las cookies.",
          ],
        },
        {
          h: "Lo que no usamos",
          p: [
            "No usamos cookies de publicidad ni ejecutamos analítica o rastreo entre sitios. Ningún tercero instala cookies desde nuestras páginas.",
            "Si esto cambia alguna vez, actualizaremos esta página y te pediremos consentimiento antes de cargar cualquier cookie o etiqueta de ese tipo.",
          ],
        },
        {
          h: "Gestionar las cookies",
          p: [
            "Puedes eliminar o bloquear las cookies y el almacenamiento local en la configuración de tu navegador. Como las nuestras son funcionales, bloquearlas hará sobre todo que el sitio olvide tu país y tu idioma y que vuelva a mostrarse el aviso de cookies.",
          ],
        },
        {
          h: "Contacto",
          p: [`¿Dudas sobre las cookies? Escríbenos a ${COMPANY.email}. Consulta también nuestra Política de privacidad.`],
        },
      ] as LegalSection[],
    },
  );
  return <LegalLayout title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
