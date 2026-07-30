/* Consent for the one thing on this site that needs it.

   The three cookies (country, language, this acknowledgement) are functional
   and need no consent. First-touch attribution is different: recording which
   campaign or referring site brought a visitor here is marketing measurement,
   not something the site needs in order to work, and ePrivacy Art. 5(3) treats
   writing it to local storage exactly as it treats a cookie. So it waits.

   The cookie notice records an answer, not just an acknowledgement – hence the
   two values. Accepting fires CONSENT_EVENT and the attribution component
   writes; declining stores the refusal so the notice stops asking, and nothing
   is ever written. Consent that can only be given and never refused is not
   consent, which is why the notice has both buttons.

   Visitors who acknowledged the earlier, notice-only banner hold the legacy
   value "1". That is deliberately not treated as consent: they were told the
   site remembers their country and language, which is not the same as agreeing
   to attribution. They see the notice once more and answer it. */
export const COOKIE_NOTICE_KEY = "so_cookie_notice";

export const CONSENT_ACCEPTED = "accepted";
export const CONSENT_DECLINED = "declined";

/** Fired on the window when the visitor accepts the cookie notice. */
export const CONSENT_EVENT = "so:consent";

function noticeValue(): string | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_NOTICE_KEY}=`));
  return row ? row.slice(COOKIE_NOTICE_KEY.length + 1) : null;
}

/** The visitor actively accepted. Client-side only. */
export function hasConsent(): boolean {
  return noticeValue() === CONSENT_ACCEPTED;
}

/** The visitor answered the notice either way, so it should stay hidden. */
export function noticeAnswered(): boolean {
  const v = noticeValue();
  return v === CONSENT_ACCEPTED || v === CONSENT_DECLINED;
}
