import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = { title: "Cookie Policy" };

/* Template cookie policy. Keep in sync with the cookies actually set – today
   only functional cookies (so_country, so_lang, so_cookie_notice). If
   analytics/marketing cookies are added, update this and switch the notice to
   a consent banner with opt-in. */
export default async function CookiesPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Cookie Policy",
      updated: "Last updated: [TODO: date]",
      intro:
        "Cookies are small files a site stores in your browser. We keep our use of them to a minimum – only what's needed to run the site and remember your preferences.",
      sections: [
        {
          h: "The cookies we use",
          p: [
            "so_country – functional. Remembers the country you selected so we show the right products, pricing and compliance. Expires after about 1 year.",
            "so_lang – functional. Remembers your chosen language. Expires after about 1 year.",
            "so_cookie_notice – functional. Remembers that you've seen this notice so we don't show it again. Expires after about 1 year.",
          ],
        },
        {
          h: "What we don't use",
          p: [
            "We do not use advertising cookies, and we do not run analytics or cross-site tracking cookies. If that changes, we'll update this page and ask for your consent first.",
          ],
        },
        {
          h: "Third-party content",
          p: [
            "If we display third-party content such as Trustpilot reviews, that provider may set its own cookies when the content loads. We only enable such content where appropriate and describe it here. [TODO: confirm active third-party embeds].",
          ],
        },
        {
          h: "Managing cookies",
          p: [
            "You can delete or block cookies in your browser settings. Because ours are functional, blocking them may mean the site forgets your country and language.",
          ],
        },
        {
          h: "Contact",
          p: ["Questions about cookies? Write to us at [TODO: contact email]. See also our Privacy Policy."],
        },
      ],
    },
    {
      title: "Política de cookies",
      updated: "Última actualización: [TODO: fecha]",
      intro:
        "Las cookies son pequeños archivos que un sitio guarda en tu navegador. Reducimos su uso al mínimo: solo lo necesario para que el sitio funcione y recordar tus preferencias.",
      sections: [
        {
          h: "Las cookies que usamos",
          p: [
            "so_country – funcional. Recuerda el país que elegiste para mostrarte los productos, precios y cumplimiento correctos. Caduca al cabo de un año aproximadamente.",
            "so_lang – funcional. Recuerda el idioma que elegiste. Caduca al cabo de un año aproximadamente.",
            "so_cookie_notice – funcional. Recuerda que ya viste este aviso para no mostrártelo de nuevo. Caduca al cabo de un año aproximadamente.",
          ],
        },
        {
          h: "Lo que no usamos",
          p: [
            "No usamos cookies de publicidad ni ejecutamos cookies de analítica o de rastreo entre sitios. Si esto cambia, actualizaremos esta página y te pediremos consentimiento primero.",
          ],
        },
        {
          h: "Contenido de terceros",
          p: [
            "Si mostramos contenido de terceros como reseñas de Trustpilot, ese proveedor puede instalar sus propias cookies al cargarse el contenido. Solo activamos ese contenido cuando corresponde y lo describimos aquí. [TODO: confirmar embeds de terceros activos].",
          ],
        },
        {
          h: "Gestionar las cookies",
          p: [
            "Puedes eliminar o bloquear las cookies en la configuración de tu navegador. Como las nuestras son funcionales, bloquearlas puede hacer que el sitio olvide tu país e idioma.",
          ],
        },
        {
          h: "Contacto",
          p: ["¿Dudas sobre las cookies? Escríbenos a [TODO: email de contacto]. Consulta también nuestra Política de privacidad."],
        },
      ],
    },
  );
  return <LegalLayout title={c.title} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
