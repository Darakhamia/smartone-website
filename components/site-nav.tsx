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

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang } = useCountry();
  const t = DICT[lang];

  // The country picker is a full-screen splash – no nav there.
  if (pathname === "/welcome") return null;

  const links = [
    { href: "/product", label: t.nav.product },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/industries", label: t.nav.industries },
    { href: "/about", label: t.nav.about },
    { href: "/case-studies", label: t.nav.cases },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-7 px-6">
        <Brand />
        <nav className="hidden gap-6 lg:flex">
          {links.map((l) => (
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
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </div>
      {open && (
        <nav className="border-t border-line bg-white px-6 py-4 lg:hidden">
          {links.map((l) => (
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
