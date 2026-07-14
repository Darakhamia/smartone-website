"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useCountry } from "@/components/country/country-context";
import { DICT, tr } from "@/lib/dictionaries";
import { MERCHANT_PORTAL_URL } from "@/lib/links";
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

/* Full-width Product mega-menu, mirrored in the footer. Three groups:
   – Payments & Fiscal: the card reader (terminals), the certified cash
     register and Tap to Phone (coming soon);
   – Merchant Portal: what it is, plus a log-in;
   – HoReCa: Click, the restaurant ordering system. */
type MegaItem = { label: string; sub: string; href: string; icon: React.ReactNode };

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
const paymentsIcon = (
  <>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19M6 15h4" />
  </>
);
const payoutsIcon = <path d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />;
const reportsIcon = <path d="M4 20V10M9 20V4M14 20v-7M19 20V8" />;
const clickIcon = <path d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />;

type MegaCol = { title: string; desc: string; items: MegaItem[] };

function productMenu(lang: Lang): MegaCol[] {
  return [
    {
      title: tr(lang, "Payments & Fiscal", "Pagos y fiscal"),
      desc: tr(lang, "Take payment and stay compliant on one device.", "Cobra y cumple la normativa en un solo dispositivo."),
      items: [
        { label: tr(lang, "Card reader", "Datáfono"), sub: tr(lang, "Bank Pro & Pro S terminals", "Terminales Bank Pro y Pro S"), href: "/product/terminals", icon: cardReaderIcon },
        { label: tr(lang, "Cash register", "Caja registradora"), sub: tr(lang, "Certified fiscal till", "Caja fiscal certificada"), href: "/product/cash-register", icon: cashRegisterIcon },
        { label: "Tap to Phone", sub: tr(lang, "Coming soon", "Muy pronto"), href: "/product/tap-to-phone", icon: tapToPhoneIcon },
      ],
    },
    {
      title: "Retail",
      desc: tr(lang, "Manage the money side of your business.", "Gestiona la parte financiera de tu negocio."),
      items: [
        { label: tr(lang, "Track payments", "Sigue tus pagos"), sub: tr(lang, "Every transaction", "Cada operación"), href: "/merchant-portal", icon: paymentsIcon },
        { label: tr(lang, "Payouts & money", "Dinero y liquidaciones"), sub: tr(lang, "What lands in your bank", "Lo que llega a tu banco"), href: "/merchant-portal", icon: payoutsIcon },
        { label: tr(lang, "Reports", "Informes"), sub: tr(lang, "Know your numbers", "Conoce tus cifras"), href: "/merchant-portal", icon: reportsIcon },
      ],
    },
    {
      title: "HoReCa",
      desc: tr(lang, "For cafés, bars and restaurants.", "Para cafeterías, bares y restaurantes."),
      items: [
        { label: "Click", sub: tr(lang, "Restaurant ordering, to the register", "Pedidos de restaurante, a la caja"), href: "/click", icon: clickIcon },
      ],
    },
  ];
}

function ColHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="px-2.5">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-brand uppercase">{title}</p>
      <p className="mt-1 text-[12.5px] leading-snug text-ink-3">{desc}</p>
    </div>
  );
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
  const pm = productMenu(lang);

  // The country picker is a full-screen splash – no nav there.
  if (pathname === "/welcome") return null;

  const rest = [
    { href: "/pricing", label: t.nav.pricing },
    { href: "/industries", label: t.nav.industries },
    { href: "/about", label: t.nav.about },
  ];

  // flat list of product destinations for the mobile menu
  const mobileProduct = [
    ...pm[0].items.map((i) => ({ href: i.href, label: i.label })),
    { href: "/merchant-portal", label: "Retail" },
    ...pm[2].items.map((i) => ({ href: i.href, label: i.label })),
  ];

  const closeMenu = () => setMenu(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-7 px-6">
        <Brand />
        <nav className="hidden items-center gap-6 lg:flex">
          {/* Product · full-width mega-menu */}
          <div
            className="relative flex h-16 items-center"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <Link
              href="/product"
              onClick={closeMenu}
              className="flex items-center gap-1 text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink"
              aria-expanded={menu}
            >
              {t.nav.product}
              <svg viewBox="0 0 16 16" className={`size-3.5 stroke-ink-3 transition-transform duration-200 ${menu ? "rotate-180" : ""}`} fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m4 6 4 4 4-4" />
              </svg>
            </Link>
            {menu && (
              <div className="fixed inset-x-0 top-16 z-50 border-b border-line bg-white shadow-[0_28px_56px_-24px_rgba(29,29,31,0.35)]">
                <div className="anim-fade-up mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-3">
                  {pm.map((col, ci) => (
                    <div key={col.title} className={ci > 0 ? "md:border-l md:border-line md:pl-8" : ""}>
                      <ColHeader title={col.title} desc={col.desc} />
                      <div className="mt-3 space-y-0.5">
                        {col.items.map((it) => (
                          <MegaLink key={it.label} it={it} onClick={closeMenu} />
                        ))}
                      </div>
                    </div>
                  ))}
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
          <a
            href={MERCHANT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            {t.nav.login}
          </a>
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
            {mobileProduct.map((it) =>
              it.href.startsWith("http") ? (
                <a
                  key={it.href + it.label}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-[14px] font-medium text-ink-2"
                >
                  {it.label}
                </a>
              ) : (
                <Link
                  key={it.href + it.label}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-[14px] font-medium text-ink-2"
                >
                  {it.label}
                </Link>
              ),
            )}
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
            <a href={MERCHANT_PORTAL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="text-[15px] font-medium text-ink-2">
              {t.nav.login}
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary px-5 py-2.5">
              {t.nav.getStarted}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
