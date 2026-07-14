"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useCountry } from "@/components/country/country-context";
import { DICT, tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="SmartOne – home"
      className={light ? "text-white" : "text-brand"}
    >
      {/* the mark's rays extend above the cap line, so the box centre sits
          below the letters – nudge up to optically centre the wordmark */}
      <Logo className="h-5.5 w-auto -translate-y-[2px]" />
    </Link>
  );
}

/* Product mega-menu, mirrored in the footer. Three columns by use case:
   – Retail: the card reader (terminals), the certified cash register and
     Tap to Phone (coming soon);
   – Merchant Portal: manage payments, payouts and reports;
   – HoReCa: Click ordering, the dual-screen checkout and the café setups. */
type MegaItem = { label: string; sub: string; href: string; icon: React.ReactNode };
type MegaCol = { title: string; items: MegaItem[] };

const cardReaderIcon = (
  <>
    <rect x="4" y="3" width="16" height="18" rx="2.5" />
    <path d="M8 7h8M8 11h8M8 15h4" />
  </>
);
const cashRegisterIcon = <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6m-6 4h4" />;
const tapToPhoneIcon = (
  <>
    <rect x="6" y="2.5" width="9" height="19" rx="2.5" />
    <path d="M17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14" />
  </>
);
const portalIcon = <path d="M4 20V10M9 20V4M14 20v-7M19 20V8" />;
const reportsIcon = (
  <>
    <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </>
);
const loginIcon = <path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3" />;
const clickIcon = <path d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />;
const dualIcon = (
  <>
    <rect x="3" y="5" width="12" height="13" rx="2" />
    <rect x="14" y="9" width="7" height="10" rx="1.5" />
  </>
);
const cafeIcon = <path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Zm11 1h2.5a2.5 2.5 0 0 1 0 5H16M8 3v2m3-2v2" />;

function productNav(lang: Lang): MegaCol[] {
  return [
    {
      title: "Retail",
      items: [
        { label: tr(lang, "Card reader", "Datáfono"), sub: tr(lang, "Bank & Bank Pro", "Bank y Bank Pro"), href: "/product/terminals", icon: cardReaderIcon },
        { label: tr(lang, "Cash register", "Caja registradora"), sub: tr(lang, "Certified fiscal till", "Caja fiscal certificada"), href: "/product/cash-register", icon: cashRegisterIcon },
        { label: "Tap to Phone", sub: tr(lang, "Coming soon", "Muy pronto"), href: "/product/tap-to-phone", icon: tapToPhoneIcon },
      ],
    },
    {
      title: "Merchant Portal",
      items: [
        { label: tr(lang, "Overview", "Resumen"), sub: tr(lang, "Payments & payouts", "Pagos y liquidaciones"), href: "/merchant-portal", icon: portalIcon },
        { label: tr(lang, "Money & reports", "Dinero e informes"), sub: tr(lang, "Know your numbers", "Conoce tus cifras"), href: "/merchant-portal", icon: reportsIcon },
        { label: tr(lang, "Log in", "Iniciar sesión"), sub: tr(lang, "Open the portal", "Abrir el portal"), href: "/login", icon: loginIcon },
      ],
    },
    {
      title: "HoReCa",
      items: [
        { label: tr(lang, "Click ordering", "Pedidos Click"), sub: tr(lang, "Orders to the register", "Pedidos a la caja"), href: "/click", icon: clickIcon },
        { label: tr(lang, "Dual-screen checkout", "Doble pantalla"), sub: "SmartOne Pro S", href: "/product/terminals", icon: dualIcon },
        { label: tr(lang, "Cafés & restaurants", "Cafeterías y restaurantes"), sub: tr(lang, "See HoReCa setups", "Ver montajes HoReCa"), href: "/industries", icon: cafeIcon },
      ],
    },
  ];
}

function MenuIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </span>
  );
}

function MegaLink({ it, onClick }: { it: MegaItem; onClick: () => void }) {
  return (
    <Link
      href={it.href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-bg-2"
    >
      <MenuIcon>{it.icon}</MenuIcon>
      <span className="min-w-0">
        <span className="block text-[13.5px] font-semibold tracking-tight text-ink">{it.label}</span>
        <span className="block text-[11.5px] leading-tight text-ink-3">{it.sub}</span>
      </span>
    </Link>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const { lang } = useCountry();
  const t = DICT[lang];
  const pm = productNav(lang);

  // The country picker is a full-screen splash – no nav there.
  if (pathname === "/welcome") return null;

  const rest = [
    { href: "/pricing", label: t.nav.pricing },
    { href: "/industries", label: t.nav.industries },
    { href: "/about", label: t.nav.about },
    { href: "/case-studies", label: t.nav.cases },
  ];

  // flattened + de-duplicated by destination for the mobile menu
  const allProduct = Array.from(
    new Map(pm.flatMap((col) => col.items).map((it) => [it.href, it])).values(),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-7 px-6">
        <Brand />
        <nav className="hidden items-center gap-6 lg:flex">
          {/* Product · mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <Link
              href="/product"
              onClick={() => setMenu(false)}
              className="flex items-center gap-1 text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink"
              aria-expanded={menu}
            >
              {t.nav.product}
              <svg viewBox="0 0 16 16" className={`size-3.5 stroke-ink-3 transition-transform duration-200 ${menu ? "rotate-180" : ""}`} fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m4 6 4 4 4-4" />
              </svg>
            </Link>
            {menu && (
              <div className="absolute left-0 top-full z-50 pt-4">
                <div className="anim-fade-up w-[720px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_28px_56px_-24px_rgba(29,29,31,0.35)]">
                  <div className="grid grid-cols-3">
                    {pm.map((col, ci) => (
                      <div key={col.title} className={`p-3 ${ci > 0 ? "border-l border-line" : ""}`}>
                        <p className="px-2.5 pb-1.5 pt-1 text-[11px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
                          {col.title}
                        </p>
                        <div className="space-y-0.5">
                          {col.items.map((it) => (
                            <MegaLink key={it.label} it={it} onClick={() => setMenu(false)} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {rest.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            {t.nav.login}
          </Link>
          <Link href="/contact" className="btn-primary px-5 py-2.5">
            {t.nav.getStarted}
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="ml-auto flex size-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line-2 lg:hidden"
        >
          <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="border-t border-line bg-white px-6 py-4 lg:hidden">
          <Link href="/product" onClick={() => setOpen(false)} className="block py-2.5 text-[15px] font-semibold text-ink">
            {t.nav.product}
          </Link>
          <div className="mb-1 grid gap-0.5 pl-1">
            {allProduct.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="block py-1.5 text-[14px] font-medium text-ink-2"
              >
                {it.label}
              </Link>
            ))}
          </div>
          {rest.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[15px] font-medium text-ink-2"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-4 border-t border-line pt-4">
            <Link href="/login" onClick={() => setOpen(false)} className="text-[15px] font-medium text-ink-2">
              {t.nav.login}
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary px-5 py-2.5">
              {t.nav.getStarted}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
