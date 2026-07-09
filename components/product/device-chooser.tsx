"use client";

import Link from "next/link";
import { useState } from "react";

/* "Which device do I need?" helper – three quick questions producing a
   recommendation. Config depends on fiscalization rules per market
   (e.g. no dual-screen configs in Spain). */

type Q = { q: string; options: string[] };

const questions: Q[] = [
  { q: "Where do you sell?", options: ["At a counter", "On the move"] },
  { q: "How busy is your till?", options: ["Non-stop", "A few sales an hour"] },
  { q: "Your market?", options: ["Malta", "Spain", "Другое / other"] },
];

function recommend(a: string[]): { device: string; note: string } {
  const mobile = a[0] === "On the move";
  const busy = a[1] === "Non-stop";
  const device = mobile ? "SmartOne 5″" : busy ? "SmartOne 6″" : "SmartOne 5″";
  let note = mobile
    ? "Compact and light, with a SIM slot and a battery that lasts the day – no Wi-Fi dependency."
    : busy
      ? "The big screen keeps a busy counter fast, with the receipt printer built in."
      : "Compact on the counter, with everything built in – printer included.";
  if (a[2] === "Spain") {
    note +=
      " For Spain we configure the device to local fiscal rules (no dual-screen configs) – Verifactu-ready for 2027.";
  } else if (a[2] === "Другое / other") {
    note +=
      " Certification is per market – talk to sales and we'll confirm the right setup for your country.";
  }
  return { device, note };
}

export function DeviceChooser() {
  const [answers, setAnswers] = useState<string[]>([]);
  const step = answers.length;
  const done = step === questions.length;

  const pick = (opt: string) => setAnswers((a) => [...a, opt]);
  const reset = () => setAnswers([]);

  return (
    <div className="mx-auto max-w-160 rounded-3xl border border-line bg-white p-8 shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)]">
      {!done ? (
        <div key={step} className="anim-tier-in">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] font-semibold text-brand">
              {step + 1} / {questions.length}
            </span>
            {step > 0 && (
              <button onClick={reset} className="text-[13px] font-medium text-ink-3 hover:text-ink">
                Start over
              </button>
            )}
          </div>
          <h3 className="mt-3 font-display text-[22px] font-semibold tracking-tight">
            {questions[step].q}
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {questions[step].options.map((opt) => (
              <button
                key={opt}
                onClick={() => pick(opt)}
                className="rounded-full px-6 py-3 text-[15px] font-semibold text-ink shadow-[inset_0_0_0_1.5px_var(--color-line-2)] transition-all duration-200 hover:-translate-y-0.5 hover:text-brand hover:shadow-[inset_0_0_0_1.5px_var(--color-brand)]"
              >
                {opt}
              </button>
            ))}
          </div>
          {/* progress */}
          <div className="mt-7 flex gap-1.5">
            {questions.map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${i < step ? "bg-brand" : "bg-line"}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="anim-tier-in">
          <span className="anim-badge-pop inline-block rounded-full bg-brand px-3.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
            Our recommendation
          </span>
          <h3 className="h-display mt-4 text-[36px] leading-none">
            {recommend(answers).device}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            {recommend(answers).note}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <Link href="/contact" className="btn-primary">
              Get a terminal →
            </Link>
            <button onClick={reset} className="btn-ghost">
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
