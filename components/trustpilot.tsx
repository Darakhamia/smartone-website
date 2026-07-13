import Script from "next/script";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const TRUSTPILOT_PROFILE_URL =
  "https://ie.trustpilot.com/review/smartoneglobal.com";

/* Official Trustpilot TrustBox (Micro Combo). Needs the Business Unit ID from
   Trustpilot Business → Integrations → TrustBox: set
   NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID at build time (Coolify env var).
   Until it's set we render an honest link to the real profile instead –
   never fabricated numbers. */
const businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID;

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
  if (businessUnitId) {
    return (
      <>
        <div
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="5419b6ffb0d04a076446a9af"
          data-businessunit-id={businessUnitId}
          data-style-height="22px"
          data-style-width="280px"
          data-theme="light"
        >
          <a href={TRUSTPILOT_PROFILE_URL} target="_blank" rel="noopener">
            Trustpilot
          </a>
        </div>
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
        />
      </>
    );
  }
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
