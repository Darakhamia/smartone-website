import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COUNTRY_COOKIE } from "@/lib/countries";

/* Country gate. First-time visitors (no country cookie) are sent to the
   /welcome country picker. Once a country is chosen the cookie is set and
   this never redirects again – so browsing the site never throws you back
   to the picker. (In Next.js 16 this file convention is `proxy`, formerly
   `middleware`.) */

const PUBLIC_PATHS = new Set(["/welcome"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already chose a country, or on an allowed public path → carry on.
  if (request.cookies.has(COUNTRY_COOKIE) || PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // No country yet → send to the picker, remembering where they were headed.
  const url = request.nextUrl.clone();
  url.pathname = "/welcome";
  if (pathname && pathname !== "/") url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, API routes and static assets
  // (files with an extension, e.g. .svg/.jpg/.ico, are skipped).
  matcher: ["/((?!api|_next/static|_next/image|.*\\.[\\w]+$).*)"],
};
