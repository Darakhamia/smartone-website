import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const TRUSTPILOT_PROFILE_URL =
  "https://www.trustpilot.com/review/smartoneglobal.com";

/* A plain link to the real Trustpilot profile – deliberately NOT the TrustBox
   widget. The widget loads a third-party script that sets Trustpilot's own
   cookies, which would make the "no third-party cookies" statement in
   /cookies false and would need consent plus extra CSP origins. If the widget
   is ever wanted, /cookies, the consent flow and the CSP in next.config.ts all
   have to change with it. Ratings are never rendered here – we don't hold the
   numbers, so we don't state them. */

function TrustpilotStar() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-tp" aria-hidden>
      <path d="M12 .8 15 8.2l7.9.6-6 5.2 1.9 7.7L12 17.5l-6.8 4.2L7.1 14l-6-5.2 7.9-.6L12 .8Z" />
    </svg>
  );
}

export async function TrustpilotBadge() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    { reviews: "Read our reviews on" },
    { reviews: "Lee nuestras reseñas en" },
  );
  return (
    <a
      href={TRUSTPILOT_PROFILE_URL}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
    >
      <TrustpilotStar />
      <span>
        {c.reviews} <b className="font-semibold text-ink">Trustpilot</b>
      </span>
    </a>
  );
}
