"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useCountry } from "@/components/country/country-context";
import { DICT } from "@/lib/dictionaries";

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

/* Product mega-menu, mirrored in the footer: hardware, the Merchant Portal
   (manage your finances) and Click for restaurants. */
type MenuItem = { label: string; sub: string; href: string };
type MenuCol = { title: string; href: string; icon: React.ReactNode; items: MenuItem[] };

const productMenu: MenuCol[] = [
  {
    title: "Hardware",
    href: "/product#hardware",
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M9.5 6h5M9 14h.01M12 14h.01M15 14h.01M9 17.5h.01M12 17.5h.01M15 17.5h.01" />
      </>
    ),
    items: [
      { label: "SmartOne Bank Pro", sub: "Busy counters", href: "/product#hardware" },
      { label: "SmartOne Pro S", sub: "Dual-screen checkout", href: "/product#hardware" },
      { label: "SmartOne Bank", sub: "On the move", href: "/product#hardware" },
    ],
  },
  {
    title: "Merchant Portal",
    href: "/product#portal",
    icon: <path d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
    items: [
      { label: "Track payments", sub: "Every transaction", href: "/product#portal" },
      { label: "Payouts & money", sub: "What lands in your bank", href: "/product#portal" },
      { label: "Reports", sub: "Know your numbers", href: "/product#portal" },
    ],
  },
  {
    title: "Click",
    href: "/product#click",
    icon: <path d="M6 3v6a2 2 0 0 0 4 0V3M8 9v12M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />,
    items: [
      { label: "Restaurant ordering", sub: "Orders to the register", href: "/product#click" },
      { label: "Cafés & HoReCa", sub: "Table service", href: "/industries#cafes" },
    ],
  },
];

function MenuIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
      <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </span>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const { lang } = useCountry();
  const t = DICT[lang];

  // The country picker is a full-screen splash – no nav there.
  if (pathname === "/welcome") return null;

  const rest = [
    { href: "/pricing", label: t.nav.pricing },
    { href: "/industries", label: t.nav.industries },
    { href: "/about", label: t.nav.about },
    { href: "/case-studies", label: t.nav.cases },
  ];

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
                <div className="anim-fade-up w-[600px] rounded-2xl border border-line bg-white p-3 shadow-[0_28px_56px_-24px_rgba(29,29,31,0.35)]">
                  <div className="grid grid-cols-3 gap-1">
                    {productMenu.map((col) => (
                      <div key={col.title}>
                        <Link
                          href={col.href}
                          onClick={() => setMenu(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-bg-2"
                        >
                          <MenuIcon>{col.icon}</MenuIcon>
                          <span className="font-display text-[14px] font-semibold tracking-tight text-ink">
                            {col.title}
                          </span>
                        </Link>
                        <ul className="mt-0.5">
                          {col.items.map((it) => (
                            <li key={it.label}>
                              <Link
                                href={it.href}
                                onClick={() => setMenu(false)}
                                className="block rounded-lg px-3 py-1.5 transition-colors hover:bg-bg-2"
                              >
                                <span className="block text-[13px] font-medium text-ink-2">{it.label}</span>
                                <span className="block text-[11.5px] leading-tight text-ink-3">{it.sub}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
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
            {productMenu.map((col) => (
              <Link
                key={col.title}
                href={col.href}
                onClick={() => setOpen(false)}
                className="block py-1.5 text-[14px] font-medium text-ink-2"
              >
                {col.title}
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
