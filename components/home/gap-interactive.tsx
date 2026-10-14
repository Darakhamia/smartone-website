"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCountry } from "@/components/country/country-context";

/* "See it in the app" under each gap: opens a preview of the product the gap
   is about – the built-in cash register, or the Merchant Portal money screen.
   The register preview is a real screenshot of the app's catalogue, shown as
   a bare screen: the register runs on the terminal, so no phone around it.
   The other demo screens are held back until we have euro-denominated ones:
   the originals priced in dollars, and their totals didn't reconcile. */

const cashboxShot = "/cashbox/catalogue.webp";

export type GapKind = "cashbox" | "portal";
export type GapModal = {
  tap: string;
  close: string;
  cashbox: { caption: string; alt: string };
  portal: { frame: string; cardSales: string; receive: string; commission: string; caption: string };
};

function CashboxScreen({ m }: { m: GapModal }) {
  return (
    <div className="mx-auto w-full max-w-[236px]">
      <div className="relative aspect-[1/2] overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        <Image src={cashboxShot} alt={m.cashbox.alt} fill sizes="236px" className="object-cover" />
      </div>
    </div>
  );
}

function PortalScreen({ m, c$ }: { m: GapModal; c$: string }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-ink-3 uppercase">{m.portal.frame}</span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-bg-2 p-4">
            <div className="text-[10.5px] font-semibold tracking-wide text-ink-3 uppercase">{m.portal.cardSales}</div>
            <div className="h-display mt-1.5 text-[22px]">{c$}980.00</div>
          </div>
          <div className="rounded-xl bg-brand-tint p-4">
            <div className="text-[10.5px] font-semibold tracking-wide text-brand uppercase">{m.portal.receive}</div>
            <div className="h-display mt-1.5 text-[22px] text-brand">{c$}970.40</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-line px-3.5 py-2.5 font-mono text-[12px]">
          <span className="text-ink-3">{m.portal.commission}</span>
          <span className="font-semibold text-brand">−{c$}9.60 · 0.98%</span>
        </div>
      </div>
    </div>
  );
}

export function SeeInApp({ kind, modal }: { kind: GapKind; modal: GapModal }) {
  const { country } = useCountry();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-5 inline-flex items-center gap-1.5 py-1 text-[14.5px] font-semibold text-brand"
      >
        {modal.tap}
        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-night/50 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="anim-tier-in relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              aria-label={modal.close}
              className="absolute -top-3 -right-3 z-10 grid size-9 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {kind === "cashbox" ? <CashboxScreen m={modal} /> : <PortalScreen m={modal} c$={country.currencySymbol} />}
            <p className="mx-auto mt-4 max-w-xs text-center text-[13px] leading-relaxed text-white/85">
              {kind === "cashbox" ? modal.cashbox.caption : modal.portal.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
