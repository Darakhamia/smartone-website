"use client";

import Image from "next/image";
import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import { terminalModel, TERMINAL_MODELS, type Country, type Lang } from "@/lib/countries";

const STEP_MS = 4500;

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      step: "Step",
      rcpt: "FISCAL RECEIPT #0421",
      sale: "Sale",
      fee: "Fee",
      rcptFoot: "VAT · Z-REPORT · T+1",
      closed: "41 receipts · closed 19:04",
      split: "Card 79% · Cash 21%",
      reports: "Receipts & reports",
      steps: [
        { title: "Take a payment", text: "Card, contactless or cash – one tap on one device." },
        { title: "The fiscal receipt prints", text: "Certified, numbered, from the built-in printer." },
        { title: "Close the day", text: "Z-report in one tap – the till is reconciled." },
        { title: "See the money", text: "What you sold and what you'll receive – every fee shown in euros." },
        { title: "Hand it to your accountant", text: "Receipts and reports in one place, nothing to collect." },
      ],
    },
    {
      step: "Paso",
      rcpt: "TICKET FISCAL #0421",
      sale: "Venta",
      fee: "Comisión",
      rcptFoot: "IVA · INFORME Z · T+1",
      closed: "41 tickets · cerrado 19:04",
      split: "Tarjeta 79% · Efectivo 21%",
      reports: "Tickets e informes",
      steps: [
        { title: "Cobra", text: "Tarjeta, contactless o efectivo: un tap en un solo dispositivo." },
        { title: "Se imprime el ticket fiscal", text: "Certificado y numerado, desde la impresora integrada." },
        { title: "Cierra el día", text: "Informe Z en un tap: la caja queda cuadrada." },
        { title: "Mira el dinero", text: "Lo que vendiste y lo que vas a recibir, con cada comisión en euros." },
        { title: "Pásaselo a tu contable", text: "Tickets e informes en un solo sitio, nada que recopilar." },
      ],
    },
  );
}

type Copy = ReturnType<typeof copyFor>;

/* The real device photo for the visitor's market (Malta gets the dual-screen
   Bank Pro S, every other country the Bank Pro). */
function PayScene({ country }: { country: Country }) {
  const { dir, name } = TERMINAL_MODELS[terminalModel(country)];
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <div className="relative aspect-square w-52">
        <div className="pointer-events-none absolute bottom-[14%] left-1/2 h-6 w-1/2 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(29,29,31,0.16),transparent_70%)] blur-md" />
        <Image src={`${dir}/hero.webp`} alt={`${name} payment terminal`} fill sizes="208px" className="object-contain" />
      </div>
    </div>
  );
}

function ReceiptScene({ c }: { c: Copy }) {
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <div className="receipt-bottom w-44 rounded-t-xl border border-line bg-white p-4 font-mono text-[11px] shadow-lg shadow-black/5">
        <div className="font-semibold text-ink">SmartOne</div>
        <div className="text-ink-3">{c.rcpt}</div>
        <div className="my-2 border-t border-dashed border-line-2" />
        <div className="flex justify-between text-ink-2"><span>{c.sale}</span><span>€24.60</span></div>
        <div className="flex justify-between text-brand"><span>{c.fee}</span><span>€0.24</span></div>
        <div className="my-2 border-t border-dashed border-line-2" />
        <div className="text-ink-3">{c.rcptFoot}</div>
      </div>
    </div>
  );
}

function CloseScene({ c }: { c: Copy }) {
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <div className="w-56 rounded-2xl bg-white p-5 shadow-lg shadow-black/5 ring-1 ring-line">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[12px] text-ink-2">Z-report #218</span>
          <span className="h-display text-[20px]">€1,240.00</span>
        </div>
        <div className="mt-1 font-mono text-[11px] text-ink-3">{c.closed}</div>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-line">
          <span className="w-[79%] bg-brand" />
        </div>
        <div className="mt-2 font-mono text-[10.5px] text-ink-3">{c.split}</div>
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

function AccountantScene({ c }: { c: Copy }) {
  return (
    <div className="grid w-full max-w-70 place-items-center">
      <div className="relative">
        {[2, 1, 0].map((k) => (
          <div key={k} className="absolute rounded-xl border border-line bg-white shadow-sm" style={{ width: 176, height: 108, top: k * -8, left: k * 8, zIndex: 3 - k, opacity: 1 - k * 0.15 }} />
        ))}
        <div className="relative z-10 h-27 w-44 rounded-xl border border-line bg-white p-4 shadow-lg shadow-black/5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-tint">
              <svg viewBox="0 0 24 24" className="size-4 stroke-brand" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v13H4zM4 9h16" /></svg>
            </span>
            <span className="font-mono text-[11px] text-ink-2">{c.reports}</span>
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

export function DayWalk() {
  const { country, lang } = useCountry();
  const c = copyFor(lang);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scenes = [<PayScene key="0" country={country} />, <ReceiptScene key="1" c={c} />, <CloseScene key="2" c={c} />, <MoneyScene key="3" />, <AccountantScene key="4" c={c} />];
  const advance = () => setActive((a) => (a + 1) % c.steps.length);
  const pick = (i: number) => setActive(i);

  return (
    <div className="mt-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative">
        <div className="absolute top-5 right-6 left-6 hidden h-0.5 bg-line sm:block" />
        <div className="relative grid grid-cols-2 gap-y-6 sm:flex sm:justify-between">
          {c.steps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <button key={s.title} onClick={() => pick(i)} aria-pressed={isActive} className="group flex flex-col items-center gap-2.5 text-center sm:flex-1">
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
                <span className={`max-w-32 text-[13px] leading-tight font-semibold transition-colors duration-300 ${isActive ? "text-ink" : "text-ink-3"}`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-tint via-white to-bg-2 ring-1 ring-line">
        <div className="grid items-center gap-6 p-8 sm:grid-cols-[1fr_1.1fr] sm:p-10">
          <div key={`scene-${active}`} className="anim-tier-in flex justify-center">{scenes[active]}</div>
          <div key={`copy-${active}`} className="anim-tier-in text-center sm:text-left">
            <span className="font-mono text-[12px] font-semibold text-brand">
              {c.step} {active + 1} / {c.steps.length}
            </span>
            <h3 className="h-display mt-2 text-[clamp(22px,2.4vw,30px)] leading-tight">{c.steps[active].title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{c.steps[active].text}</p>
            <div className="mx-auto mt-5 h-1 max-w-56 overflow-hidden rounded-full bg-line sm:mx-0">
              <span
                key={active}
                className="step-progress block h-full bg-brand"
                style={{ ["--step-duration" as string]: `${STEP_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                onAnimationEnd={advance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
