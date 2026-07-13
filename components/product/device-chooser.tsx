"use client";

import Link from "next/link";
import { useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { Terminal } from "@/components/product/device-visuals";
import type { Country } from "@/lib/countries";

/* "Which device do I need?" helper – two quick questions producing a
   recommendation. The market is already known (chosen at /welcome), so we
   fold it into the result note instead of asking again. */

type Option = { label: string; sub: string; icon: React.ReactNode };
type Q = { q: string; options: Option[] };

const questions: Q[] = [
  {
    q: "Where do you sell?",
    options: [
      { label: "At a counter", sub: "Shop, café, clinic", icon: <path d="M3 9l1.2-5h15.6L21 9M4.5 9v10.5h15V9M9.5 19.5v-6h5v6" /> },
      { label: "On the move", sub: "Market, delivery, table service", icon: <path d="M3 7h11v8H3zM14 10h3.5L21 13v2h-7M7.5 18.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm9 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" /> },
    ],
  },
  {
    q: "How busy is your till?",
    options: [
      { label: "Non-stop", sub: "Queues at peak", icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /> },
      { label: "A few sales an hour", sub: "Steady pace", icon: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> },
    ],
  },
];

function recommend(a: string[], country: Country): { device: string; compact: boolean; note: string; market: string } {
  const mobile = a[0] === "On the move";
  const busy = a[1] === "Non-stop";
  const compact = mobile || !busy;
  const device = compact ? "SmartOne Bank" : "SmartOne Bank Pro";
  const note = mobile
    ? "Compact and light, with a SIM slot and a battery that lasts the day – no Wi-Fi dependency."
    : busy
      ? "The big 6″ screen keeps a busy counter fast, with the receipt printer built in."
      : "Compact on the counter, with everything built in – printer included.";

  let market: string;
  if (country.code === "es") {
    market = "For Spain we configure the device to local fiscal rules (no dual-screen configs) – Verifactu-ready for 2027.";
  } else if (!country.fiscal) {
    market = `No fiscal register is required in ${country.name} – you're set up for card payments and business tools.`;
  } else {
    market = `Certified and configured for ${country.name}, cash register built in.`;
  }
  return { device, compact, note, market };
}

export function DeviceChooser() {
  const { country } = useCountry();
  const [answers, setAnswers] = useState<string[]>([]);
  const step = answers.length;
  const done = step === questions.length;

  const pick = (opt: string) => setAnswers((a) => [...a, opt]);
  const reset = () => setAnswers([]);

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-7 shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)] sm:p-9">
      {!done ? (
        <div key={step} className="anim-tier-in">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] font-semibold tracking-wide text-brand">
              Question {step + 1} of {questions.length}
            </span>
            {step > 0 && (
              <button onClick={reset} className="text-[13px] font-medium text-ink-3 transition-colors hover:text-ink">
                Start over
              </button>
            )}
          </div>

          {/* filling progress bar */}
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="mt-7 font-display text-[clamp(21px,2.4vw,26px)] font-semibold tracking-tight">
            {questions[step].q}
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {questions[step].options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => pick(opt.label)}
                className="group flex items-center gap-3.5 rounded-2xl border border-line-2 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint hover:shadow-[0_16px_32px_-26px_rgba(90,25,181,0.55)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {opt.icon}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold tracking-tight text-ink">{opt.label}</span>
                  <span className="block text-[12.5px] leading-snug text-ink-3">{opt.sub}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="anim-tier-in">
          {(() => {
            const r = recommend(answers, country);
            return (
              <div className="grid items-center gap-7 sm:grid-cols-[0.85fr_1fr]">
                <div className="grid h-52 place-items-center rounded-2xl bg-gradient-to-br from-brand-tint via-bg-2 to-bg-2">
                  <Terminal compact={r.compact} />
                </div>
                <div>
                  <span className="anim-badge-pop inline-block rounded-full bg-brand px-3.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                    Our recommendation
                  </span>
                  <h3 className="h-display mt-4 text-[32px] leading-none">{r.device}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{r.note}</p>
                  <p className="mt-3 rounded-xl bg-bg-2 p-3.5 text-[13px] leading-relaxed text-ink-2">{r.market}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3.5">
                    <Link href="/contact" className="btn-primary">
                      Get a terminal →
                    </Link>
                    <button onClick={reset} className="btn-ghost">
                      Start over
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
