"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

const STEP_MS = 6000;

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="anim-fade-up mx-auto w-full max-w-105 rounded-2xl border border-line bg-white shadow-[0_24px_48px_-32px_rgba(29,29,31,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-ink-3 uppercase">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-1 font-mono text-[12.5px]">
      <span className="text-ink-3">{label}</span>
      <span className={accent ? "font-semibold text-brand" : "text-ink-2"}>{value}</span>
    </div>
  );
}

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      eyebrow: "From the counter to your accountant",
      title: "Close the day. Know your real numbers.",
      steps: [
        { n: "01", title: "Money & transparency", text: "Know what you'll receive and what you paid – in euros." },
        { n: "02", title: "Reconcile the till", text: "Z-report & receipts in one place; reprint or email any one." },
        { n: "03", title: "Find a transaction", text: "Search by RRN / receipt #, settle a dispute on the spot." },
        { n: "04", title: "See the period", text: "Revenue, average check, card vs cash, top categories." },
      ],
      f: { money: "Portal · Money", receipts: "Portal · Receipts", tx: "Portal · Transactions", analytics: "Portal · Analytics" },
      sold: "Sold",
      receive: "You'll receive",
      cardSales: "Card sales",
      commission: "Commission",
      status: "Status",
      processed: "Processed",
      receiptsN: "41 receipts · closed 19:04",
      reprint: "Reprint",
      email: "Email",
      receiptN: "Receipt #0421",
      approved: "Visa ··6041 · today 14:32 · Approved",
      receipt: "Receipt",
      refund: "Refund",
      details: "Details",
      revenue: "Revenue",
      avg: "Avg check",
      card: "Card",
    },
    {
      eyebrow: "Del mostrador a tu contable",
      title: "Cierra el día. Conoce tus cifras reales.",
      steps: [
        { n: "01", title: "Dinero y transparencia", text: "Mira lo que vas a recibir y lo que pagaste, en euros." },
        { n: "02", title: "Cuadra la caja", text: "Informe Z y tickets en un solo sitio; reimprime o envía cualquiera por email." },
        { n: "03", title: "Encuentra una operación", text: "Busca por RRN o nº de ticket y resuelve una incidencia al momento." },
        { n: "04", title: "Mira el periodo", text: "Ingresos, ticket medio, tarjeta vs efectivo, categorías top." },
      ],
      f: { money: "Portal · Dinero", receipts: "Portal · Tickets", tx: "Portal · Operaciones", analytics: "Portal · Analítica" },
      sold: "Vendido",
      receive: "Recibirás",
      cardSales: "Ventas con tarjeta",
      commission: "Comisión",
      status: "Estado",
      processed: "Procesado",
      receiptsN: "41 tickets · cerrado 19:04",
      reprint: "Reimprimir",
      email: "Email",
      receiptN: "Ticket #0421",
      approved: "Visa ··6041 · hoy 14:32 · Aprobado",
      receipt: "Ticket",
      refund: "Devolución",
      details: "Detalles",
      revenue: "Ingresos",
      avg: "Ticket medio",
      card: "Tarjeta",
    },
  );
}

type Copy = ReturnType<typeof copyFor>;

function MoneyVisual({ c }: { c: Copy }) {
  return (
    <Frame title={c.f.money}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-bg-2 p-4">
          <div className="text-[10.5px] font-semibold tracking-wide text-ink-3 uppercase">{c.sold}</div>
          <div className="h-display mt-1.5 text-[22px]">€1,240.00</div>
        </div>
        <div className="rounded-xl bg-brand-tint p-4">
          <div className="text-[10.5px] font-semibold tracking-wide text-brand uppercase">{c.receive}</div>
          <div className="h-display mt-1.5 text-[22px] text-brand">€970.40</div>
        </div>
      </div>
      <div className="mt-4 border-t border-dashed border-line-2 pt-3">
        <Row label={c.cardSales} value="€980.00" />
        <Row label={c.commission} value="−€9.60" accent />
        <Row label={c.status} value={c.processed} />
      </div>
    </Frame>
  );
}

function TillVisual({ c }: { c: Copy }) {
  return (
    <Frame title={c.f.receipts}>
      <div className="rounded-xl bg-bg-2 p-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[12.5px] text-ink-2">Z-report #218</span>
          <span className="h-display text-[18px]">€1,240.00</span>
        </div>
        <div className="mt-1 font-mono text-[11px] text-ink-3">{c.receiptsN}</div>
      </div>
      <div className="mt-3 space-y-2">
        {["#0421 · €24.60", "#0420 · €8.90", "#0419 · €112.00"].map((r) => (
          <div key={r} className="flex items-center justify-between rounded-lg border border-line px-3.5 py-2.5">
            <span className="font-mono text-[12px] text-ink-2">{r}</span>
            <span className="flex gap-2 text-[11.5px] font-semibold text-brand">
              <span>{c.reprint}</span>
              <span>{c.email}</span>
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function SearchVisual({ c }: { c: Copy }) {
  return (
    <Frame title={c.f.tx}>
      <div className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5">
        <svg viewBox="0 0 24 24" className="size-4 stroke-ink-3" fill="none" strokeWidth="2" strokeLinecap="round">
          <path d="M21 21l-4.3-4.3M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
        </svg>
        <span className="font-mono text-[12.5px] text-ink-2">RRN 704217…</span>
        <span className="ml-auto h-4 w-px animate-pulse bg-brand" />
      </div>
      <div className="mt-3 rounded-xl border-2 border-brand/40 bg-brand-tint/50 p-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[12.5px] text-ink-2">{c.receiptN}</span>
          <span className="h-display text-[18px]">€24.60</span>
        </div>
        <div className="mt-1 font-mono text-[11px] text-ink-3">{c.approved}</div>
        <div className="mt-2.5 flex gap-3 text-[11.5px] font-semibold text-brand">
          <span>{c.receipt}</span>
          <span>{c.refund}</span>
          <span>{c.details}</span>
        </div>
      </div>
    </Frame>
  );
}

function PeriodVisual({ c }: { c: Copy }) {
  const bars = [34, 52, 44, 68, 58, 84, 74];
  return (
    <Frame title={c.f.analytics}>
      <div className="flex h-28 items-end gap-2.5">
        {bars.map((h, i) => (
          <div key={i} className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-brand" : "bg-brand/20"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-dashed border-line-2 pt-3">
        <div>
          <div className="font-mono text-[10.5px] text-ink-3 uppercase">{c.revenue}</div>
          <div className="h-display mt-0.5 text-[16px]">€8,412</div>
        </div>
        <div>
          <div className="font-mono text-[10.5px] text-ink-3 uppercase">{c.avg}</div>
          <div className="h-display mt-0.5 text-[16px]">€23.80</div>
        </div>
        <div>
          <div className="font-mono text-[10.5px] text-ink-3 uppercase">{c.card}</div>
          <div className="h-display mt-0.5 text-[16px]">72%</div>
        </div>
      </div>
    </Frame>
  );
}

export function HowItWorks() {
  const { lang } = useCountry();
  const c = copyFor(lang);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const visuals = [<MoneyVisual key="0" c={c} />, <TillVisual key="1" c={c} />, <SearchVisual key="2" c={c} />, <PeriodVisual key="3" c={c} />];
  const advance = () => setActive((a) => (a + 1) % c.steps.length);
  const pick = (i: number) => setActive(i);

  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
          </div>
        </Reveal>
        <Reveal>
          <div
            className="mt-11 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="order-2 space-y-1.5 lg:order-none">
              {c.steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.n}
                    onClick={() => pick(i)}
                    aria-pressed={isActive}
                    className={`relative w-full overflow-hidden rounded-2xl p-5 pl-6 text-left transition-colors duration-300 ${
                      isActive ? "bg-white shadow-sm shadow-black/4" : "hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className={`font-mono text-[13px] font-semibold ${isActive ? "text-brand" : "text-ink-3"}`}>{s.n}</span>
                      <span className={`font-display text-[17px] font-semibold tracking-tight ${isActive ? "text-ink" : "text-ink-2"}`}>{s.title}</span>
                    </div>
                    <p className={`mt-1.5 pl-8.5 text-[14px] leading-relaxed text-ink-2 transition-all duration-300 ${isActive ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                      {s.text}
                    </p>
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
                        <span
                          key={active}
                          className="step-progress block h-full bg-brand"
                          style={{ ["--step-duration" as string]: `${STEP_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                          onAnimationEnd={advance}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="order-1 lg:order-none">
              <div className="rounded-3xl bg-gradient-to-br from-brand-tint via-white to-bg-2 p-6 sm:p-10">
                <div key={active}>{visuals[active]}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
