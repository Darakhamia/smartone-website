"use client";

import { useEffect, useState } from "react";

const STEP_MS = 4500;

/* Small stylised scenes per step – same brand visual language as the
   homepage mockups. */

function PayScene() {
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <svg viewBox="0 0 200 220" className="w-40" aria-hidden>
        <rect x="46" y="20" width="108" height="180" rx="22" fill="#1d1d1f" />
        <rect x="62" y="36" width="76" height="86" rx="10" fill="#0e0e10" />
        <text x="100" y="76" fontSize="18" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="IBM Plex Mono, monospace">€24.60</text>
        <text x="100" y="98" fontSize="8" textAnchor="middle" fill="#a578e8" fontFamily="IBM Plex Mono, monospace">Approved ✓</text>
        <g stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M90 54 a10 10 0 0 1 20 0" />
        </g>
        <g fill="rgba(255,255,255,0.14)">
          {[0, 1, 2].map((c) => [0, 1, 2].map((r) => <circle key={`${c}-${r}`} cx={76 + c * 24} cy={140 + r * 20} r="6" />))}
        </g>
      </svg>
    </div>
  );
}

function ReceiptScene() {
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <div className="receipt-bottom w-44 rounded-t-xl border border-line bg-white p-4 font-mono text-[11px] shadow-lg shadow-black/5">
        <div className="font-semibold text-ink">SmartOne</div>
        <div className="text-ink-3">FISCAL RECEIPT #0421</div>
        <div className="my-2 border-t border-dashed border-line-2" />
        <div className="flex justify-between text-ink-2"><span>Sale</span><span>€24.60</span></div>
        <div className="flex justify-between text-brand"><span>Fee</span><span>€0.24</span></div>
        <div className="my-2 border-t border-dashed border-line-2" />
        <div className="text-ink-3">VAT · Z-REPORT · T+1</div>
      </div>
    </div>
  );
}

function CloseScene() {
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <div className="w-56 rounded-2xl bg-white p-5 shadow-lg shadow-black/5 ring-1 ring-line">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[12px] text-ink-2">Z-report #218</span>
          <span className="h-display text-[20px]">€1,240.00</span>
        </div>
        <div className="mt-1 font-mono text-[11px] text-ink-3">41 receipts · closed 19:04</div>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-line">
          <span className="w-[79%] bg-brand" />
        </div>
        <div className="mt-2 font-mono text-[10.5px] text-ink-3">Card 79% · Cash 21%</div>
      </div>
    </div>
  );
}

function MoneyScene() {
  return (
    <div className="grid w-full max-w-90 place-items-center">
      <div className="flex items-center gap-3 font-display font-semibold tracking-tight">
        <span className="text-[26px] text-ink">€980</span>
        <span className="text-[20px] text-ink-3">−</span>
        <span className="rounded-lg bg-brand-tint px-2 py-1 text-[22px] text-brand">€9.60</span>
        <span className="text-[20px] text-ink-3">=</span>
        <span className="text-[26px] text-brand">€970.40</span>
      </div>
    </div>
  );
}

function AccountantScene() {
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <div className="relative">
        {[2, 1, 0].map((k) => (
          <div
            key={k}
            className="absolute rounded-xl border border-line bg-white shadow-sm"
            style={{ width: 176, height: 108, top: k * -8, left: k * 8, zIndex: 3 - k, opacity: 1 - k * 0.15 }}
          />
        ))}
        <div className="relative z-10 h-27 w-44 rounded-xl border border-line bg-white p-4 shadow-lg shadow-black/5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-tint">
              <svg viewBox="0 0 24 24" className="size-4 stroke-brand" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v13H4zM4 9h16" /></svg>
            </span>
            <span className="font-mono text-[11px] text-ink-2">Receipts &amp; reports</span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-line" />
            <div className="h-1.5 w-3/4 rounded-full bg-line" />
            <div className="h-1.5 w-5/6 rounded-full bg-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  { title: "Take a payment", text: "Card, contactless or cash – one tap on one device.", scene: <PayScene /> },
  { title: "The fiscal receipt prints", text: "Certified, numbered, from the built-in printer.", scene: <ReceiptScene /> },
  { title: "Close the day", text: "Z-report in one tap – the till is reconciled.", scene: <CloseScene /> },
  { title: "See the money", text: "What you sold and what you'll receive – every fee shown in euros.", scene: <MoneyScene /> },
  { title: "Hand it to your accountant", text: "Receipts and reports in one place, nothing to collect.", scene: <AccountantScene /> },
];

export function DayWalk() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearInterval(id);
  }, [paused, cycle]);

  const pick = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* horizontal stepper */}
      <div className="relative">
        {/* base track */}
        <div className="absolute top-5 right-6 left-6 hidden h-0.5 bg-line sm:block" />
        <div className="relative grid grid-cols-2 gap-y-6 sm:flex sm:justify-between">
          {steps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <button
                key={s.title}
                onClick={() => pick(i)}
                aria-pressed={isActive}
                className="group flex flex-col items-center gap-2.5 text-center sm:flex-1"
              >
                <span
                  className={`relative z-10 grid size-10 place-items-center rounded-full font-mono text-[13px] font-semibold transition-all duration-300 ${
                    isActive
                      ? "scale-110 bg-brand text-white shadow-[0_8px_20px_-6px_rgba(90,25,181,0.7)]"
                      : isDone
                        ? "bg-brand text-white"
                        : "bg-white text-ink-3 ring-1 ring-line-2 group-hover:ring-brand/40"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`max-w-32 text-[13px] leading-tight font-semibold transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-3"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* content panel */}
      <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-tint via-white to-bg-2 ring-1 ring-line">
        <div className="grid items-center gap-6 p-8 sm:grid-cols-[1fr_1.1fr] sm:p-10">
          <div key={`scene-${active}`} className="anim-tier-in flex justify-center">
            {steps[active].scene}
          </div>
          <div key={`copy-${active}`} className="anim-tier-in text-center sm:text-left">
            <span className="font-mono text-[12px] font-semibold text-brand">
              Step {active + 1} / {steps.length}
            </span>
            <h3 className="h-display mt-2 text-[clamp(22px,2.4vw,30px)] leading-tight">
              {steps[active].title}
            </h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">
              {steps[active].text}
            </p>
            {/* progress bar for the current step */}
            <div className="mx-auto mt-5 h-1 max-w-56 overflow-hidden rounded-full bg-line sm:mx-0">
              {paused ? (
                <span className="block h-full w-full bg-brand" />
              ) : (
                <span
                  key={`${active}-${cycle}`}
                  className="step-progress block h-full bg-brand"
                  style={{ ["--step-duration" as string]: `${STEP_MS}ms` }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
