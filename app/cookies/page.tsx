import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = { title: "Cookie Policy" };

/* Legal text agreed with counsel – the English is final wording, so change it
   only with sign-off. Keep it in sync with what the site actually stores and
   loads, because each line here is a promise the code has to keep:
   - names and lifetimes of our own cookies: lib/consent.ts (so_cookie_consent,
     12 months) and lib/countries.ts (so_country, so_lang, 6 months, written
     only on an actual choice – components/country/country-context.tsx);
   - so_first_touch only with Marketing, 90 days, removed when Marketing goes
     off: components/lead/attribution.tsx and clearCategory in lib/consent.ts;
   - nothing from Google or Meta before an answer, and only the categories
     agreed to: lib/tags.ts;
   - the hashed email and phone: trackLead in lib/tags.ts.
   Adding any other third-party script or embed means a row here, a consent
   category for it, and its origins in the CSP in next.config.ts – all three. */
export default async function CookiesPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Cookie Policy",
      updated: "Last updated: 8 October 2026",
      intro:
        "Cookies are small files a site stores in your browser. Some are needed to run the site and remember your preferences. Others, for analytics and advertising, are used only if you agree.",
      sections: [
        {
          h: "The cookies we use",
          p: [
            { sub: "Necessary — no consent required" },
            {
              table: {
                head: ["Cookie", "Purpose", "Set by", "Expires"],
                rows: [
                  [
                    "so_country",
                    "Remembers the country you selected, so we show the products, pricing and compliance information that apply where you trade. Set only when you choose a country.",
                    "SmartOne",
                    "6 months",
                  ],
                  [
                    "so_lang",
                    "Remembers the language you selected. Set only when you choose a language.",
                    "SmartOne",
                    "6 months",
                  ],
                  [
                    "so_cookie_consent",
                    "Records which categories you agreed to, the date and time, and the version of this notice.",
                    "SmartOne",
                    "12 months",
                  ],
                  [
                    "__cf_bm",
                    "Protects our enquiry form against automated abuse. Set by Cloudflare when the form loads, on behalf of HubSpot, which provides the form.",
                    "HubSpot / Cloudflare",
                    "30 minutes",
                  ],
                ],
              },
            },
            { sub: "Analytics — only with your agreement" },
            {
              table: {
                head: ["Cookie", "Purpose", "Set by", "Expires"],
                rows: [
                  [
                    "_ga",
                    "Distinguishes one visitor from another so that visit statistics are not counted twice.",
                    "Google, as our processor",
                    "2 years, renewed on each visit",
                  ],
                  [
                    "_ga_SBS327285V",
                    "Keeps the session state for our Google Analytics 4 property.",
                    "Google, as our processor",
                    "2 years, renewed on each visit",
                  ],
                ],
              },
            },
            "The analytics data held in Google Analytics is deleted after 14 months.",
            "Our enquiry form does not track you. The form is provided by HubSpot. We load the form itself, but not HubSpot's visitor-tracking script, so HubSpot sets no analytics cookie on this site and does not follow you across pages.",
            { sub: "Marketing — only with your agreement" },
            {
              table: {
                head: ["Cookie", "Purpose", "Set by", "Expires"],
                rows: [
                  [
                    "_gcl_au",
                    "Stores an advertising click identifier so that an enquiry can be attributed to the campaign that produced it.",
                    "Google, as a controller for its own purposes",
                    "90 days",
                  ],
                  [
                    "_gcl_aw, _gcl_dc, _gcl_gs and the _gcl_ls entry",
                    "Set when you arrive from a Google advertisement, for the same purpose.",
                    "Google, as a controller for its own purposes",
                    "90 days",
                  ],
                  [
                    "_fbp",
                    "Identifies this browser to Meta so that an enquiry can be attributed to an advertisement.",
                    "Meta — jointly with us for collecting and sending the event, and as its own controller afterwards",
                    "90 days",
                  ],
                  [
                    "_fbc",
                    "Set when you arrive from a Meta advertisement, storing the click identifier.",
                    "Meta, on the same basis",
                    "90 days",
                  ],
                ],
              },
            },
          ],
        },
        {
          h: "Local storage — only if you agree",
          p: [
            "One entry, so_first_touch, records which campaign tag or referring site brought you to us. If you later send us an enquiry it travels with the form, so we know which channel it came from.",
            "This one is not needed to run the site, so we ask first. It holds no name and no contact details, it is first-party, and it is never shared with advertising networks. You can clear it at any time in your browser settings, along with the cookies.",
            "It is written only if you agree to the Marketing category, and it is removed when you switch that category off. It is kept for 90 days, and you can clear it at any time in your browser settings or from Cookie settings.",
          ],
        },
        {
          h: "Cross-device statistics (Google Signals)",
          p: [
            "If you agree to analytics, and you are signed in to a Google account that has ad personalisation switched on in its own Google settings, Google connects this visit to that account. That lets us see combined statistics for a person who uses our site on a phone and then on a computer. We see only totals — we are never shown who you are, your account, or your name. You can switch it off at any time in your Google account settings at myadcenter.google.com. Switching off the Analytics category here also stops it.",
          ],
        },
        {
          h: "Matching your enquiry to an advertisement",
          p: [
            "If you agree to marketing and then send us an enquiry, your email address and telephone number are converted in your browser into a fixed-length code using a one-way function, and that code — not your email address or number — is sent to Google and to Meta. They compare it with codes they hold for their own users, so that the enquiry can be credited to the advertisement that produced it. The code cannot be turned back into your email address or number by us, by Google or by Meta. If you decline marketing, nothing is sent.",
          ],
        },
        {
          h: "Changing or withdrawing your choice",
          p: [
            "Open Cookie settings at the bottom of any page. Switching a category off stops any further use and deletes what it stored from this browser. Withdrawal does not undo what was done while your agreement was in place. Cookies that Google and Meta set on their own domains cannot be deleted by us — you can manage those at myadcenter.google.com and in your Facebook or Instagram ad preferences.",
          ],
        },
        {
          h: "Managing cookies",
          p: [
            "You can delete or block cookies and local storage in your browser settings, or change your choice at any time from Cookie settings at the bottom of every page. Blocking the necessary cookies mainly means the site forgets your country and language and shows the cookie notice again.",
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
      updated: "Última actualización: 8 de octubre de 2026",
      intro:
        "Las cookies son pequeños archivos que un sitio guarda en tu navegador. Algunas son necesarias para que el sitio funcione y para recordar tus preferencias. Otras, de analítica y publicidad, solo se usan si lo aceptas.",
      sections: [
        {
          h: "Las cookies que usamos",
          p: [
            { sub: "Necesarias: no requieren consentimiento" },
            {
              table: {
                head: ["Cookie", "Finalidad", "Instalada por", "Caducidad"],
                rows: [
                  [
                    "so_country",
                    "Recuerda el país que elegiste, para mostrarte los productos, los precios y la información de cumplimiento que se aplican donde operas. Solo se instala cuando eliges un país.",
                    "SmartOne",
                    "6 meses",
                  ],
                  [
                    "so_lang",
                    "Recuerda el idioma que elegiste. Solo se instala cuando eliges un idioma.",
                    "SmartOne",
                    "6 meses",
                  ],
                  [
                    "so_cookie_consent",
                    "Registra qué categorías aceptaste, la fecha y la hora, y la versión de este aviso.",
                    "SmartOne",
                    "12 meses",
                  ],
                  [
                    "__cf_bm",
                    "Protege nuestro formulario de consultas frente a abusos automatizados. La instala Cloudflare cuando se carga el formulario, por cuenta de HubSpot, que proporciona el formulario.",
                    "HubSpot / Cloudflare",
                    "30 minutos",
                  ],
                ],
              },
            },
            { sub: "Analítica: solo con tu consentimiento" },
            {
              table: {
                head: ["Cookie", "Finalidad", "Instalada por", "Caducidad"],
                rows: [
                  [
                    "_ga",
                    "Distingue a un visitante de otro para que las estadísticas de visitas no se cuenten dos veces.",
                    "Google, como encargado del tratamiento",
                    "2 años, se renueva en cada visita",
                  ],
                  [
                    "_ga_SBS327285V",
                    "Mantiene el estado de la sesión de nuestra propiedad de Google Analytics 4.",
                    "Google, como encargado del tratamiento",
                    "2 años, se renueva en cada visita",
                  ],
                ],
              },
            },
            "Los datos de analítica que se conservan en Google Analytics se eliminan a los 14 meses.",
            "Nuestro formulario de consultas no te rastrea. El formulario lo proporciona HubSpot. Cargamos el formulario, pero no el script de seguimiento de visitantes de HubSpot, así que HubSpot no instala ninguna cookie de analítica en este sitio ni te sigue de una página a otra.",
            { sub: "Marketing: solo con tu consentimiento" },
            {
              table: {
                head: ["Cookie", "Finalidad", "Instalada por", "Caducidad"],
                rows: [
                  [
                    "_gcl_au",
                    "Guarda un identificador de clic publicitario para poder atribuir una consulta a la campaña que la generó.",
                    "Google, como responsable para sus propios fines",
                    "90 días",
                  ],
                  [
                    "_gcl_aw, _gcl_dc, _gcl_gs y la entrada _gcl_ls",
                    "Se instalan cuando llegas desde un anuncio de Google, con la misma finalidad.",
                    "Google, como responsable para sus propios fines",
                    "90 días",
                  ],
                  [
                    "_fbp",
                    "Identifica este navegador ante Meta para poder atribuir una consulta a un anuncio.",
                    "Meta: corresponsable con nosotros de la recogida y el envío del evento, y responsable por su cuenta a partir de ahí",
                    "90 días",
                  ],
                  [
                    "_fbc",
                    "Se instala cuando llegas desde un anuncio de Meta y guarda el identificador de clic.",
                    "Meta, sobre la misma base",
                    "90 días",
                  ],
                ],
              },
            },
          ],
        },
        {
          h: "Almacenamiento local: solo si lo aceptas",
          p: [
            "Una entrada, so_first_touch, registra qué etiqueta de campaña o qué sitio de referencia te trajo hasta nosotros. Si después nos envías una consulta, viaja con el formulario para saber de qué canal procede.",
            "Esta no es necesaria para que el sitio funcione, así que te lo preguntamos antes. No contiene tu nombre ni tus datos de contacto, es propia y nunca se comparte con redes publicitarias. Puedes borrarla cuando quieras desde la configuración de tu navegador, junto con las cookies.",
            "Solo se guarda si aceptas la categoría Marketing, y se elimina cuando desactivas esa categoría. Se conserva durante 90 días, y puedes borrarla en cualquier momento desde la configuración de tu navegador o desde «Configuración de cookies».",
          ],
        },
        {
          h: "Estadísticas entre dispositivos (Google Signals)",
          p: [
            "Si aceptas la analítica y has iniciado sesión en una cuenta de Google que tiene activada la personalización de anuncios en su propia configuración de Google, Google vincula esta visita a esa cuenta. Eso nos permite ver estadísticas combinadas de una persona que usa nuestro sitio en un teléfono y después en un ordenador. Solo vemos totales: nunca se nos muestra quién eres, tu cuenta ni tu nombre. Puedes desactivarlo en cualquier momento en la configuración de tu cuenta de Google, en myadcenter.google.com. Desactivar aquí la categoría Analítica también lo detiene.",
          ],
        },
        {
          h: "Asociar tu consulta a un anuncio",
          p: [
            "Si aceptas el marketing y después nos envías una consulta, tu email y tu número de teléfono se convierten en tu navegador en un código de longitud fija mediante una función unidireccional, y ese código —no tu email ni tu número— se envía a Google y a Meta. Ellos lo comparan con los códigos que tienen de sus propios usuarios, para que la consulta pueda atribuirse al anuncio que la generó. Ni nosotros, ni Google, ni Meta podemos volver a convertir ese código en tu email o tu número. Si rechazas el marketing, no se envía nada.",
          ],
        },
        {
          h: "Cambiar o retirar tu elección",
          p: [
            "Abre «Configuración de cookies» al pie de cualquier página. Al desactivar una categoría se detiene cualquier uso posterior y se borra de este navegador lo que haya guardado. La retirada no deshace lo que se hizo mientras tu consentimiento estaba vigente. Las cookies que Google y Meta instalan en sus propios dominios no podemos borrarlas nosotros: puedes gestionarlas en myadcenter.google.com y en tus preferencias de anuncios de Facebook o Instagram.",
          ],
        },
        {
          h: "Gestionar las cookies",
          p: [
            "Puedes eliminar o bloquear las cookies y el almacenamiento local en la configuración de tu navegador, o cambiar tu elección en cualquier momento desde «Configuración de cookies», al pie de cada página. Bloquear las cookies necesarias hará sobre todo que el sitio olvide tu país y tu idioma y que vuelva a mostrarse el aviso de cookies.",
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
