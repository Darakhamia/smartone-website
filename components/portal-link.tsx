"use client";

import { useCountry } from "@/components/country/country-context";
import { withAttribution } from "@/lib/attribution";
import { MERCHANT_PORTAL_URLS } from "@/lib/links";

/* A link into the Merchant Portal: straight to the portal of the country the
   visitor is browsing (not the bare "Choose your location" screen), in a new
   tab, carrying their first-touch campaign tags so the portal can store them
   with the account it creates.

   The tags are added as the link is pressed rather than when it is drawn:
   Marketing consent – the only case in which there are tags to add – may be
   given after the page rendered, and the server render must not depend on
   the browser's storage. pointerdown covers mouse, touch and middle-click,
   click covers the keyboard; doing it twice is harmless. */
export function PortalLink({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const { country } = useCountry();
  const href = MERCHANT_PORTAL_URLS[country.code];
  const tag = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = withAttribution(href);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={tag}
      onClick={(e) => {
        tag(e);
        onClick?.();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
