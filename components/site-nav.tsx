"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case studies" },
];

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 font-display text-[19px] font-bold tracking-tight ${light ? "text-paper" : "text-ink"}`}
    >
      <span className="grid size-8 place-items-center rounded-lg bg-green text-[13px] font-bold text-paper shadow-[0_6px_14px_-6px_rgba(14,138,95,0.8)]">
        S1
      </span>
      SmartOne
    </Link>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
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
            Log in
          </Link>
          <Link href="/contact" className="btn-primary px-5 py-2.5">
            Get started →
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
        <nav className="border-t border-line bg-paper px-6 py-4 lg:hidden">
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
              Log in
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary px-5 py-2.5">
              Get started →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
