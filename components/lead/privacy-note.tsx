"use client";

import Link from "next/link";
import { CookieSettingsLink } from "@/components/legal/cookie-settings-link";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

/* GDPR Art. 13 notice at the point of collection, the same under every form
   on the site. No consent checkbox: answering the enquiry rests on Art.
   6(1)(b)/(f), and the hashed email and phone for ad matching rest on the
   Marketing choice already made in Cookie settings – a checkbox here would
   misdescribe both. */
export function PrivacyNote({ lang, className }: { lang: Lang; className?: string }) {
  const t = tr(
    lang,
    {
      before: "We use your details to answer your enquiry. If you have agreed to marketing cookies, your email address and phone number are also sent to Google and Meta in a scrambled form so we can see which advertisement brought you to us — see our ",
      privacy: "Privacy Policy",
      and: " and ",
      settings: "Cookie settings",
      after: ".",
    },
    {
      before: "Usamos tus datos para responder a tu consulta. Si has aceptado las cookies de marketing, tu email y tu número de teléfono también se envían a Google y a Meta de forma codificada, para que podamos ver qué anuncio te trajo hasta nosotros. Consulta nuestra ",
      privacy: "Política de privacidad",
      and: " y la ",
      settings: "Configuración de cookies",
      after: ".",
    },
  );
  return (
    <p className={`text-[12.5px] leading-relaxed text-ink-3 ${className ?? ""}`}>
      {t.before}
      <Link href="/privacy" className="underline underline-offset-2 transition-colors hover:text-ink-2">
        {t.privacy}
      </Link>
      {t.and}
      <CookieSettingsLink className="underline underline-offset-2 transition-colors hover:text-ink-2">
        {t.settings}
      </CookieSettingsLink>
      {t.after}
    </p>
  );
}
