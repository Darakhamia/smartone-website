"use client";

import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";

const STEP_MS = 5000;

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      fPayments: "Portal · Payments",
      fReceipts: "Portal · Receipts",
      fCatalogue: "Portal · Catalogue",
      fMoney: "Portal · Money",
      processed: "Processed",
      closed: "41 receipts · closed 19:04",
      reprint: "Reprint",
      email: "Email",
      bouquet: "Bouquet · medium",
      order: "Order #47 · table 3",
      toReg: "→ register",
      sold: "Sold",
      receive: "You'll receive",
      commission: "Commission",
      confirmed: "−€9.60 · confirmed to pay",
      jobs: [
        { title: "Follow your payments", text: "Every transaction with its status – confirmed to pay, in euros." },
        { title: "Stay compliant", text: "Fiscal receipts and Z-reports – reprint or email any one." },
        { title: "Sell & manage", text: "Products and prices in one catalogue – orders via Click for HoReCa." },
        { title: "Track your money", text: "What you sold and what's landing in your bank – every fee clear." },
      ],
    },
    {
      fPayments: "Portal · Pagos",
      fReceipts: "Portal · Tickets",
      fCatalogue: "Portal · Catálogo",
      fMoney: "Portal · Dinero",
      processed: "Procesado",
      closed: "41 tickets · cerrado 19:04",
      reprint: "Reimprimir",
      email: "Email",
      bouquet: "Ramo · mediano",
      order: "Pedido #47 · mesa 3",
      toReg: "→ caja",
      sold: "Vendido",
      receive: "Recibirás",
      commission: "Comisión",
      confirmed: "−€9.60 · confirmado a pagar",
      jobs: [
        { title: "Sigue tus pagos", text: "Cada operación con su estado, confirmado a pagar, en euros." },
        { title: "Cumple la normativa", text: "Tickets fiscales e informes Z: reimprime o envía cualquiera por email." },
        { title: "Vende y gestiona", text: "Productos y precios en un catálogo, pedidos con Click para HoReCa." },
        { title: "Controla tu dinero", text: "Lo que vendiste y lo que llega a tu banco, con cada comisión clara." },
      ],
    },
  );
}

type Copy = ReturnType<typeof copyFor>;

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-line bg-white shadow-[0_24px_48px_-32px_rgba(29,29,31,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-ink-3 uppercase">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function StatusPill({ label }: { label: string }) {
  return <span className="rounded-full bg-[#e5f3ec] px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-[#0e8a5f]">{label}</span>;
}

function PaymentsScreen({ c }: { c: Copy }) {
  const rows = [
    ["14:32", "Visa ··6041", "€24.60"],
    ["14:05", "Contactless", "€8.90"],
    ["13:48", "Mastercard ··2270", "€112.00"],
  ];
  return (
    <Frame title={c.fPayments}>
      {/* rows wrap on narrow phones instead of forcing the frame wider */}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r[0]} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-line px-3 py-2.5 sm:px-3.5">
            <div className="flex min-w-0 items-center gap-2.5 font-mono text-[12px]">
              <span className="shrink-0 text-ink-3">{r[0]}</span>
              <span className="truncate text-ink-2">{r[1]}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[12.5px] font-semibold text-ink">{r[2]}</span>
              <StatusPill label={c.processed} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function CompliantScreen({ c }: { c: Copy }) {
  return (
    <Frame title={c.fReceipts}>
      <div className="rounded-xl bg-bg-2 p-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[12.5px] text-ink-2">Z-report #218</span>
          <span className="h-display text-[18px]">€1,240.00</span>
        </div>
        <div className="mt-1 font-mono text-[11px] text-ink-3">{c.closed}</div>
      </div>
      <div className="mt-3 space-y-2">
        {["#0421 · €24.60", "#0420 · €8.90"].map((r) => (
          <div key={r} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-line px-3 py-2.5 sm:px-3.5">
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

function SellScreen({ c }: { c: Copy }) {
  const items = [
    ["Flat white", "€3.20"],
    ["Croissant", "€2.40"],
    [c.bouquet, "€28.00"],
  ];
  return (
    <Frame title={c.fCatalogue}>
      <div className="space-y-2">
        {items.map((it) => (
          <div key={it[0]} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border border-line px-3 py-2.5 sm:px-3.5">
            <span className="text-[13px] text-ink-2">{it[0]}</span>
            <span className="font-mono text-[12.5px] font-semibold text-ink">{it[1]}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-tint px-4 py-3">
        <span className="text-[12.5px] font-medium text-ink-2">{c.order}</span>
        <span className="font-mono text-[11.5px] font-semibold text-brand">{c.toReg}</span>
      </div>
    </Frame>
  );
}

function MoneyScreen({ c }: { c: Copy }) {
  return (
    <Frame title={c.fMoney}>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-bg-2 p-4">
          <div className="text-[10.5px] font-semibold tracking-wide text-ink-3 uppercase">{c.sold}</div>
          <div className="h-display mt-1.5 text-[22px]">€980.00</div>
        </div>
        <div className="rounded-xl bg-brand-tint p-4">
          <div className="text-[10.5px] font-semibold tracking-wide text-brand uppercase">{c.receive}</div>
          <div className="h-display mt-1.5 text-[22px] text-brand">€970.40</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-line px-3.5 py-2.5 font-mono text-[12px]">
        <span className="text-ink-3">{c.commission}</span>
        <span className="font-semibold text-brand">{c.confirmed}</span>
      </div>
    </Frame>
  );
}

const jobIcons = [
  (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19M6 15h4" />
    </>
  ),
  <path key="1" d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3Zm3 5h4m-4 4h4" />,
  <path key="2" d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />,
  <path key="3" d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />,
];

export function PortalPreview() {
  const { lang } = useCountry();
  const c = copyFor(lang);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const screens = [<PaymentsScreen key="0" c={c} />, <CompliantScreen key="1" c={c} />, <SellScreen key="2" c={c} />, <MoneyScreen key="3" c={c} />];
  const advance = () => setActive((a) => (a + 1) % c.jobs.length);
  const pick = (i: number) => setActive(i);

  return (
    <div
      className="mt-11 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="space-y-2.5">
        {c.jobs.map((job, i) => {
          const isActive = i === active;
          return (
            <button
              key={job.title}
              onClick={() => pick(i)}
              aria-pressed={isActive}
              className={`relative flex w-full items-start gap-4 overflow-hidden rounded-2xl p-4 text-left transition-colors duration-300 ${
                isActive ? "bg-white shadow-sm shadow-black/4" : "hover:bg-white/60"
              }`}
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${isActive ? "bg-brand" : "bg-brand-tint"}`}>
                <svg viewBox="0 0 24 24" className={`size-6 transition-colors duration-300 ${isActive ? "stroke-white" : "stroke-brand"}`} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {jobIcons[i]}
                </svg>
              </span>
              <div className="pt-0.5">
                <h3 className={`font-display text-[16px] font-semibold tracking-tight ${isActive ? "text-ink" : "text-ink-2"}`}>{job.title}</h3>
                <p className={`text-[13.5px] leading-relaxed text-ink-2 transition-all duration-300 ${isActive ? "mt-1 max-h-16 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                  {job.text}
                </p>
              </div>
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

      <div className="rounded-3xl bg-gradient-to-br from-brand-tint via-white to-bg-2 p-4 sm:p-8">
        <div key={active} className="anim-tier-in">{screens[active]}</div>
      </div>
    </div>
  );
}
