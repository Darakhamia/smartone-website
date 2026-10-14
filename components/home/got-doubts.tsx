import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";

/* "Got doubts?" (homepage task §12, Malta only): the questions Maltese
   merchants actually ask, the EXO one first after the receipt – Chris says it
   is the most common. Native <details>, so it opens and closes without
   script and every answer is in the page for search engines; the first one
   starts open, as the task asks. */

const faqs: [question: string, answer: string][] = [
  ["Is the receipt legal for VAT in Malta?", "Yes. SmartOne is a VAT-approved fiscal cash register, approved by the MTCA, and it prints the fiscal receipt for card and cash sales alike."],
  ["Do I need an EXO audit?", "No. SmartOne is approved by the MTCA as a fiscal cash register, so you don't need an EXO number, a software certificate or an auditor's report."],
  ["Who is SmartOne, and who holds my money?", "SmartOne is the device and the portal. Payments are processed by a licensed EU acquirer, and your payouts go to your own bank account. Our local partner in Malta calls you back when you get in touch."],
  ["Do I need a new bank account?", "No. Money goes to the account you already have, the next working day."],
  ["Is there a contract?", "Buy the device: no minimum term. Rent it: one year, €30 + VAT a month."],
  ["Can my money get stuck?", "Payouts go to your own bank, not to a wallet you have to move money out of. Your account is reviewed by a person, not an algorithm, and if something needs checking, a person contacts you."],
  ["What about a quiet winter?", "If you bought the device, a month without sales costs you nothing: no monthly fee, no inactivity fee, no minimum. If you rent, only the €30 + VAT rent continues."],
];

export function GotDoubts() {
  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <h2 className="h-display text-[clamp(30px,4vw,48px)] leading-[1.06]">Got doubts?</h2>
        </Reveal>
        <div className="divide-y divide-line overflow-hidden rounded-3xl bg-white shadow-sm shadow-black/3">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[16.5px] font-semibold tracking-tight transition-colors hover:text-brand sm:px-7 [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-tint text-brand transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" strokeWidth={2.2} aria-hidden />
                </span>
              </summary>
              <p className="lead -mt-1 px-6 pb-6 text-[15px] leading-relaxed text-ink-2 sm:px-7">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
