import { Reveal } from "@/components/reveal";
import { GetStarted } from "@/components/home/get-started";

/* "What your first year really costs" (homepage task §10, Malta only). The
   figures are the task's, word for word, for a shop taking €3,000 a month in
   cards at a €15 average sale – 2,400 sales a year:
   - SmartOne card fees are Malta's lowest band in lib/pricing.ts (1.65% rent,
     1.90% buy) plus the €0.02 fixed fee per sale: €594 + €48 = €642 rent,
     €684 + €48 = €732 buy. The device is €30 × 12 rented, €400 bought.
   - The card reader is a leading provider's published Malta pricing on its
     €29/month plan (1.29%), October 2026: €464 + €348 = €812, plus €34 for
     the reader. Its name stays off the page.
   - The separate fiscal cash register, €800–1,200, is the figure the Pricing
     page uses (components/pricing/plan-picker.tsx). Mark gave ~€1,500 on the
     01.10 call – if he confirms another figure, change it here (the last cell
     and the total: €812 + €34 + the register) and on Pricing together.
   If Malta's rates or device prices change in lib/pricing.ts, this table
   has to change with them. */

const rows = [
  { name: "SmartOne (rent)", total: "€1,002", fees: "€642", device: "€360", deviceNote: "€30/month, 1-year minimum", register: "Included", ours: true },
  { name: "SmartOne (buy)", total: "€1,132", fees: "€732", device: "€400", deviceNote: "no minimum term", register: "Included", ours: true },
  { name: "Card reader + separate fiscal cash register", total: "€1,646–2,046", fees: "€812", device: "€34", deviceNote: "", register: "€800–1,200", ours: false },
];

export function FirstYear() {
  return (
    <section id="first-year" className="scroll-mt-20 bg-gradient-to-b from-white to-[#fbf9fe] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <h2 className="h-display text-[clamp(30px,4vw,48px)] leading-[1.06]">What your first year really costs.</h2>
            <p className="lead mt-4 text-lg leading-relaxed text-ink-2">
              A shop taking €3,000 a month in cards, €15 average sale. All prices excl. VAT.
            </p>
          </div>
        </Reveal>

        {/* Below md the table becomes one card per setup: five columns don't
            fit a phone, and a sideways-scrolling table hides all but one. */}
        <div className="mt-10 grid gap-3 md:hidden">
          {rows.map((r) => (
            <div key={r.name} className={`rounded-3xl border p-5 ${r.ours ? "border-brand/20 bg-brand-tint/45" : "border-line bg-white"}`}>
              <div className="flex items-baseline justify-between gap-4">
                <span className={`font-semibold ${r.ours ? "text-ink" : "text-ink-2"}`}>{r.name}</span>
                <span className={`font-display text-[22px] font-semibold tracking-tight whitespace-nowrap ${r.ours ? "text-brand" : "text-ink"}`}>{r.total}</span>
              </div>
              <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-[14px]">
                <div className="flex justify-between gap-4"><dt className="text-ink-3">Card fees</dt><dd className="text-ink-2">{r.fees}</dd></div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-3">Device</dt>
                  <dd className="text-right text-ink-2">{r.device}{r.deviceNote && <span className="block text-[12.5px] text-ink-3">{r.deviceNote}</span>}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-3">Fiscal cash register</dt>
                  <dd className={r.ours ? "font-semibold text-[#0e6b4a]" : "text-ink-2"}>{r.register}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <Reveal className="hidden md:block">
          <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-white shadow-[0_40px_80px_-60px_rgba(17,17,20,0.35)]">
            <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line text-[13px] font-semibold text-ink-3">
                  <th scope="col" className="w-[30%] px-6 py-4 font-semibold">
                    <span className="sr-only">Setup</span>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">Total</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Card fees</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Device</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Fiscal cash register</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className={`border-b border-line last:border-0 ${r.ours ? "bg-brand-tint/45" : ""}`}>
                    <th scope="row" className={`px-6 py-5 align-top font-semibold ${r.ours ? "text-ink" : "text-ink-2"}`}>{r.name}</th>
                    <td className={`px-6 py-5 align-top font-display text-[20px] font-semibold tracking-tight whitespace-nowrap ${r.ours ? "text-brand" : "text-ink"}`}>{r.total}</td>
                    <td className="px-6 py-5 align-top whitespace-nowrap text-ink-2">{r.fees}</td>
                    <td className="px-6 py-5 align-top text-ink-2">
                      <span className="whitespace-nowrap">{r.device}</span>
                      {r.deviceNote && <span className="block text-[13px] text-ink-3">{r.deviceNote}</span>}
                    </td>
                    <td className={`px-6 py-5 align-top whitespace-nowrap ${r.ours ? "font-semibold text-[#0e6b4a]" : "text-ink-2"}`}>{r.register}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="mt-8 max-w-180 space-y-3 text-[15px] leading-relaxed text-ink-2">
          <p className="lead">
            At this volume our card fees are lower too, and the cash register is already inside the device. If you buy, you pay less than a card reader plus a cash register every year, not just the first one. SmartOne rates for card sales under €4,000 a month: 1.90% + €0.02 (buy), 1.65% + €0.02 (rent).
          </p>
          <p className="lead">Closed for the winter? If you buy the device, a month without sales costs you nothing. If you rent, only the €30 rent continues.</p>
          <p className="lead text-[13px] text-ink-3">
            Card reader: published Malta pricing of a leading provider, with its €29/month plan (1.29%), October 2026. Without the plan, card fees would be €990.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <GetStarted location="first-year" className="btn-primary" />
          <p className="text-[13.5px] text-ink-3">No setup, inactivity or minimum fees.</p>
        </div>
      </div>
    </section>
  );
}
