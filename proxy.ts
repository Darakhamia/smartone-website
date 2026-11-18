import { NextResponse, type NextRequest } from "next/server";
import { MARKET_HEADER, marketForPath } from "@/lib/countries";

/* Market pages (/malta/*) render as their market whatever so_country says –
   see marketForPath() in lib/countries.ts. Server components can't see the
   path, so the market goes to them as a request header. Nothing is written to
   the visitor: no cookie, no redirect, and the matcher keeps every other page
   (and the static files) out of here.

   On these paths the header is always set from the path, never passed
   through from the browser. Elsewhere a browser that sends it itself only
   changes what that browser is shown – leads take their market from the page
   path (app/api/leads/route.ts), not from this header. */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const market = marketForPath(request.nextUrl.pathname);
  if (market) headers.set(MARKET_HEADER, market);
  else headers.delete(MARKET_HEADER);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/malta/:path*"],
};
