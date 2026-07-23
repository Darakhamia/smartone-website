"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* Interactive "gaps" cards: click a card to preview the product it describes –
   the built-in Cashbox on the terminal, and the Merchant Portal money screen.
   The Cashbox preview is a phone-framed carousel of real screenshots from the
   cash-register app (public/cashbox/1–5.webp): open shift, catalogue, cart,
   payment and a fiscal receipt. */

const cashboxShots = ["/cashbox/1.webp", "/cashbox/2.webp", "/cashbox/3.webp", "/cashbox/4.webp", "/cashbox/5.webp"];

type GapCard = { tag: string; title: string; text: string; kind: "cashbox" | "portal" };
export type GapModal = {
  tap: string;
  close: string;
  cashbox: { caption: string; alt: string };
  portal: { frame: string; cardSales: string; receive: string; commission: string; caption: string };
};

const gapIcons: Record<GapCard["kind"], React.ReactNode> = {
  cashbox: <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />,
  portal: <path d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />,
};

function CashboxScreen({ m }: { m: GapModal }) {
  const [i, setI] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % cashboxShots.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[236px]">
      {/* real screenshots from the cash-register app, in a phone frame */}
      <div className="rounded-[34px] bg-[#111113] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="relative aspect-[1/2] overflow-hidden rounded-[26px] bg-[#0e0e10]" role="group" aria-label={m.cashbox.alt}>
          {cashboxShots.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="236px"
              className={`object-cover transition-opacity duration-500 ease-in-out ${idx === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-3.5 flex justify-center gap-1.5">
        {cashboxShots.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`${idx + 1} / ${cashboxShots.length}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/35 hover:bg-white/55"}`}
          />
        ))}
      </div>
    </div>
  );
}

function PortalScreen({ m }: { m: GapModal }) {
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
            <div className="h-display mt-1.5 text-[22px]">€980.00</div>
          </div>
          <div className="rounded-xl bg-brand-tint p-4">
            <div className="text-[10.5px] font-semibold tracking-wide text-brand uppercase">{m.portal.receive}</div>
            <div className="h-display mt-1.5 text-[22px] text-brand">€970.40</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-line px-3.5 py-2.5 font-mono text-[12px]">
          <span className="text-ink-3">{m.portal.commission}</span>
          <span className="font-semibold text-brand">−€9.60 · 0.98%</span>
        </div>
      </div>
    </div>
  );
}

export function GapCards({ cards, modal }: { cards: GapCard[]; modal: GapModal }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className={`mt-11 grid gap-4 ${cards.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-xl"}`}>
        {cards.map((g, i) => (
          <button
            key={g.tag}
            onClick={() => setOpen(i)}
            className="group h-full rounded-3xl border border-line bg-white p-8 text-left shadow-sm shadow-black/3 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-tint/50 hover:shadow-[0_20px_40px_-28px_rgba(90,25,181,0.4)]"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-tint transition-colors duration-300 group-hover:bg-brand/15">
                <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {gapIcons[g.kind]}
                </svg>
              </span>
              <span className="rounded-full bg-brand-tint px-3.5 py-1 text-[11px] font-semibold tracking-wide text-brand uppercase">{g.tag}</span>
            </div>
            <h3 className="mt-6 font-display text-[22px] font-semibold tracking-tight">{g.title}</h3>
            <p className="mt-2.5 leading-relaxed text-ink-2">{g.text}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
              {modal.tap}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-night/50 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div className="anim-tier-in relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              aria-label={modal.close}
              className="absolute -top-3 -right-3 z-10 grid size-9 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {cards[open].kind === "cashbox" ? <CashboxScreen m={modal} /> : <PortalScreen m={modal} />}
            <p className="mx-auto mt-4 max-w-xs text-center text-[13px] leading-relaxed text-white/85">
              {cards[open].kind === "cashbox" ? modal.cashbox.caption : modal.portal.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
