"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import {
  ALL,
  CONSENT_EVENT,
  NONE,
  OPEN_SETTINGS_EVENT,
  migrateLegacyCookies,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/consent";
import { applyConsent } from "@/lib/tags";

/* The cookie notice and the Cookie settings panel. The wording is the legal
   text agreed for /cookies and /privacy – change it only together with them.

   The notice stays until it is answered: there is no close button, and
   scrolling or navigating is not an answer. Decline and Accept are the same
   size and the same colour – an accent-filled Accept beside a plain-text
   Decline is the pattern EDPB guidance and the 2023 Cookie Banner Taskforce
   report single out – and the settings panel has a Reject all beside Accept
   all for the same reason. Any "Cookie settings" link on the site reopens the
   panel (CookieSettingsLink), so the answer can be changed as easily as it was
   given. See lib/consent.ts for what is stored and lib/tags.ts for what loads. */
export function CookieNotice() {
  const { lang } = useCountry();
  // undefined until read on the client; null = not answered yet
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState<Consent>(NONE);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    migrateLegacyCookies();
    const saved = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only: the answer lives in a cookie
    setConsent(saved);
    if (saved) applyConsent(saved, null);

    const open = () => {
      setDraft(readConsent() ?? NONE);
      setPanelOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (panelOpen && !d.open) d.showModal();
    if (!panelOpen && d.open) d.close();
  }, [panelOpen]);

  const save = (next: Consent) => {
    const prev = readConsent();
    writeConsent(next);
    applyConsent(next, prev);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
    setConsent(next);
    setPanelOpen(false);
  };

  const openPanel = () => {
    setDraft(consent ?? NONE);
    setPanelOpen(true);
  };

  if (consent === undefined) return null;

  const c = tr(
    lang,
    {
      title: "Cookies and similar technologies",
      body: [
        "Necessary cookies keep this site working and remember the country and language you choose.",
        "With your agreement we also use analytics and advertising technologies from Google and Meta: to see how the site is used, to note which campaign or site brought you here, and to measure which advertisements lead to enquiries. If you are signed in to a Google account and allow ad personalisation in your Google settings, Google may connect your visit to that account across your devices. If you send us an enquiry, your email address and phone number are also passed to Google and Meta in a scrambled form, so that the enquiry can be matched to the advertisement that produced it.",
        "Google and Meta may process this data outside the European Economic Area, including in the United States. Some identifiers last up to two years.",
        "You can change or withdraw your choice at any time from Cookie settings at the bottom of every page.",
      ],
      cookiePolicy: "Cookie Policy",
      privacyPolicy: "Privacy Policy",
      decline: "Decline",
      accept: "Accept",
      settings: "Cookie settings",
      intro:
        "Necessary cookies cannot be switched off — without them the site does not work. The other two categories stay off until you switch them on. Switching a category off deletes what it stored from this browser.",
      necessary: "Necessary",
      necessaryText:
        "always on. Keep the site working, remember the country and language you choose, and record your cookie choice.",
      analytics: "Analytics",
      analyticsText:
        "off unless you switch it on. Google Analytics 4, including Google Signals. Lets us see how many people visit, which pages they read and where they stop, and — where you are signed in to Google and allow ad personalisation there — how the same person uses the site across devices.",
      marketing: "Marketing",
      marketingText:
        "off unless you switch it on. Google Ads, the Meta pixel, and the record of which campaign or site brought you here. Lets us measure which advertisement led to an enquiry. Includes passing your email address and phone number to Google and Meta in scrambled form when you send us an enquiry. Google and Meta also use this data for their own purposes.",
      rejectAll: "Reject all",
      saveChoices: "Save my choices",
      acceptAll: "Accept all",
    },
    {
      title: "Cookies y tecnologías similares",
      body: [
        "Las cookies necesarias hacen que este sitio funcione y recuerdan el país y el idioma que eliges.",
        "Con tu consentimiento, también usamos tecnologías de analítica y publicidad de Google y Meta: para ver cómo se usa el sitio, para anotar qué campaña o sitio te trajo hasta aquí y para medir qué anuncios generan consultas. Si has iniciado sesión en una cuenta de Google y permites la personalización de anuncios en tu configuración de Google, Google puede vincular tu visita a esa cuenta en todos tus dispositivos. Si nos envías una consulta, tu email y tu número de teléfono también se transmiten a Google y a Meta de forma codificada, para poder asociar la consulta al anuncio que la generó.",
        "Google y Meta pueden tratar estos datos fuera del Espacio Económico Europeo, incluso en los Estados Unidos. Algunos identificadores duran hasta dos años.",
        "Puedes cambiar o retirar tu elección en cualquier momento desde «Configuración de cookies», al pie de cada página.",
      ],
      cookiePolicy: "Política de cookies",
      privacyPolicy: "Política de privacidad",
      decline: "Rechazar",
      accept: "Aceptar",
      settings: "Configuración de cookies",
      intro:
        "Las cookies necesarias no se pueden desactivar: sin ellas el sitio no funciona. Las otras dos categorías permanecen desactivadas hasta que las actives. Al desactivar una categoría, se borra de este navegador lo que haya guardado.",
      necessary: "Necesarias",
      necessaryText:
        "siempre activas. Hacen que el sitio funcione, recuerdan el país y el idioma que eliges y registran tu elección sobre las cookies.",
      analytics: "Analítica",
      analyticsText:
        "desactivada salvo que la actives. Google Analytics 4, incluido Google Signals. Nos permite ver cuántas personas nos visitan, qué páginas leen y dónde lo dejan y —si has iniciado sesión en Google y allí permites la personalización de anuncios— cómo usa el sitio una misma persona en distintos dispositivos.",
      marketing: "Marketing",
      marketingText:
        "desactivado salvo que lo actives. Google Ads, el píxel de Meta y el registro de qué campaña o sitio te trajo hasta aquí. Nos permite medir qué anuncio generó una consulta. Incluye la transmisión de tu email y tu teléfono a Google y a Meta de forma codificada cuando nos envías una consulta. Google y Meta también usan estos datos para sus propios fines.",
      rejectAll: "Rechazar todo",
      saveChoices: "Guardar mi elección",
      acceptAll: "Aceptar todo",
    },
  );

  const btn = "btn-ghost px-5 py-2.5 text-[14px]";

  return (
    <>
      {consent === null && (
        <div role="region" aria-labelledby="cookie-notice-title" className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-4">
          {/* On a phone the text is longer than the screen: it scrolls, the
              choices stay pinned below it so none of them is ever out of view. */}
          <div className="mx-auto flex max-h-[80dvh] max-w-3xl flex-col rounded-2xl border border-line bg-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)]">
            <div className="min-h-0 overflow-y-auto px-5 pt-5 sm:px-6 sm:pt-6">
              <h2 id="cookie-notice-title" className="font-display text-[16px] font-semibold tracking-tight text-ink">
                {c.title}
              </h2>
              <div className="mt-2 space-y-2 text-[13px] leading-relaxed text-ink-2">
                {c.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 px-5 pt-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-6">
              <p className="text-[13px] text-ink-3">
                <Link href="/cookies" className="font-semibold text-brand underline-offset-2 hover:underline">
                  {c.cookiePolicy}
                </Link>
                {" · "}
                <Link href="/privacy" className="font-semibold text-brand underline-offset-2 hover:underline">
                  {c.privacyPolicy}
                </Link>
              </p>
              <div className="grid grid-cols-2 items-center gap-2.5 sm:flex">
                <button onClick={() => save(NONE)} className={btn}>
                  {c.decline}
                </button>
                <button onClick={() => save(ALL)} className={btn}>
                  {c.accept}
                </button>
                <button
                  onClick={openPanel}
                  className="col-span-2 py-1.5 text-[13.5px] font-semibold text-brand underline-offset-2 hover:underline sm:px-2"
                >
                  {c.settings}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Native <dialog>: showModal() gives the focus trap, Escape and the
          return of focus for free. Escape closes the panel without answering –
          an unanswered notice simply stays on screen. */}
      <dialog
        ref={dialogRef}
        onClose={() => setPanelOpen(false)}
        aria-labelledby="cookie-settings-title"
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl bg-white text-ink shadow-[0_32px_64px_-24px_rgba(0,0,0,0.45)] max-h-[calc(100dvh-2rem)] flex-col backdrop:bg-night/50 open:flex"
      >
        <div className="min-h-0 overflow-y-auto px-5 pt-5 sm:px-7 sm:pt-7">
          <h2 id="cookie-settings-title" className="font-display text-[20px] font-semibold tracking-tight">
            {c.settings}
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{c.intro}</p>

          <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
            <Category name={c.necessary} text={c.necessaryText} checked disabled />
            <Category
              name={c.analytics}
              text={c.analyticsText}
              checked={draft.analytics}
              onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
            />
            <Category
              name={c.marketing}
              text={c.marketingText}
              checked={draft.marketing}
              onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
            />
          </ul>
        </div>

        <div className="grid shrink-0 gap-2.5 px-5 pt-4 pb-5 sm:grid-cols-3 sm:px-7 sm:pt-6 sm:pb-7">
          <button onClick={() => save(NONE)} className={btn}>
            {c.rejectAll}
          </button>
          <button onClick={() => save(draft)} className={btn}>
            {c.saveChoices}
          </button>
          <button onClick={() => save(ALL)} className={btn}>
            {c.acceptAll}
          </button>
        </div>
      </dialog>
    </>
  );
}

function Category({
  name,
  text,
  checked,
  disabled,
  onChange,
}: {
  name: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start gap-4 p-4">
      <p className="flex-1 text-[13.5px] leading-relaxed text-ink-2">
        <strong className="font-semibold text-ink">{name}</strong> — {text}
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={name}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-0.5 h-6 w-10 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${
          checked ? "bg-brand" : "bg-line-2"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </button>
    </li>
  );
}
