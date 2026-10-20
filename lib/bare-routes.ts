/* Pages shown without the site's header, footer and first-visit region
   picker: the full-screen country picker itself, and the team's leads inbox
   (which isn't part of the public site). */
export function isBareRoute(pathname: string): boolean {
  return pathname === "/welcome" || pathname === "/leads" || pathname.startsWith("/leads/");
}
