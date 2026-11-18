import Image from "next/image";
import Link from "next/link";
import { TalkToUs } from "@/components/lead/talk-to-us";
import { StickyTalk } from "@/components/malta/sticky-talk";
import {
  BUY,
  Crumbs,
  DEVICE,
  JsonLd,
  RATE_MAX,
  RATE_MIN,
  RENT,
  TERMS,
  breadcrumbLd,
  eur,
  landingMetadata,
  rateLine,
} from "@/components/malta/shared";
import { SITE_URL } from "@/lib/site";

/* /malta/fiscal-cash-register – the landing page for EXO-number and fiscal
   cash register searches, and the Final URL of the Google Ads groups Fiscal
   Compliance EXO and Fiscal Compliance Research (Nadia's prototype v5 of
   09.11.2026, with the 05.11 review in it). Copy is the prototype's, word for
   word: change only what has been agreed. Malta only, so English only.

   The Z-report is described on the device only: reports in the portal are
   not confirmed yet (to confirm with Alexey; once they are, the prototype's
   "appears in the portal" goes back in). */

const PATH = "/malta/fiscal-cash-register";
const TITLE = "Fiscal Cash Register Malta: No EXO Number Needed | SmartOne";
const DESCRIPTION =
  "VAT-approved fiscal cash register, card terminal and printer in one device. No EXO number or auditor certificate. Usually live in 4 working days.";
/** When the page's content last changed – JSON-LD only, there is no visible date. */
const DATE_MODIFIED = "2026-11-18";
const PAGE = "fiscal-cash-register";

export const metadata = landingMetadata(PATH, TITLE, DESCRIPTION);

/* Visible FAQ and FAQPage markup come from this one list, so they can't drift apart. */
const FAQ: Array<[question: string, answer: string]> = [
  [
    "Do I need an EXO number with SmartOne?",
    "No. SmartOne is an approved fiscal cash register, so its receipts are fiscal without an EXO number. You don't need a software supplier certificate or an auditor certificate either. Fiscal registration of the device is part of your setup.",
  ],
  [
    "Is SmartOne approved by MTCA?",
    "Yes. SmartOne was approved as a fiscal cash register by the Commissioner for Tax and Customs under regulation 13(1)(b) of the Thirteenth Schedule to the VAT Act. The approval was published in the Malta Government Gazette No. 21,373, Notice 46, on 10 January 2025.",
  ],
  [
    "What is an EXO number?",
    "A temporary exemption number issued by MTCA that lets a business use a computerised POS system as a cash register. Printed on the receipt, it makes the receipt fiscal.",
  ],
  [
    "How long does it take to get an EXO number?",
    "The official timeline is about 21 days from application: 15 days of vetting, 3 of assessment, 2 for approval and 1 for delivery. Before you apply, you need a software supplier certificate and an auditor certificate. With SmartOne there's no application: you usually print your first fiscal receipt within four working days of registration.",
  ],
  [
    "Which businesses in Malta must issue fiscal receipts?",
    "VAT-registered businesses supplying goods or services in Malta must issue fiscal receipts, unless the supply is exempt. You can issue them from an approved fiscal cash register, a POS with an EXO number, or a fiscal receipt book. Your accountant can confirm what applies to your business.",
  ],
  [
    "How much does a fiscal cash register cost in Malta?",
    `SmartOne costs ${eur(BUY)} + VAT to buy, with no minimum term, or ${eur(RENT)} + VAT a month to rent, with a one-year minimum term. The price includes the fiscal cash register, card terminal, receipt printer and merchant portal. Card payments carry a per-transaction fee of ${RATE_MIN}% to ${RATE_MAX}% + ${eur(TERMS.fixed)}, depending on your monthly card volume and whether you buy or rent.`,
  ],
  [
    "I already use a POS with an EXO number. Can I switch to SmartOne?",
    "Yes. SmartOne replaces your POS, receipt printer and card terminal with one approved device. Leave a request and our partner in Malta calls you back to plan the switch.",
  ],
  [
    "Can I take cash as well as cards?",
    "Yes. Cash, card and contactless all go through the same register and appear on the same Z-report.",
  ],
  [
    "Do I need to open a new bank account?",
    "No. Card payouts go to the bank account you already have, next working day, through a licensed EU acquirer.",
  ],
];

const COMPARE: Array<{ row: string; exo: string; printer: string; us: string; muted?: boolean }> = [
  { row: "On your counter", exo: "Computer or tablet, receipt printer, card terminal", printer: "Computer or tablet, fiscal printer, card terminal", us: "One device" },
  {
    row: "Before your first fiscal receipt",
    exo: "Software supplier certificate, auditor certificate, application to MTCA",
    printer: "Buy and register the fiscal printer",
    us: "Fiscal registration is part of setup",
  },
  {
    row: "How long it takes",
    exo: "About 3 weeks on the official timeline, after you have both certificates",
    printer: "Depends on the printer supplier",
    us: "Usually 4 working days from registration",
  },
  {
    row: "Card payments",
    exo: "Separate terminal and acquiring contract",
    printer: "Separate terminal and acquiring contract",
    us: "Built in. Payout to your own bank next working day",
    muted: true,
  },
];

const FEATURES = [
  { k: "FISCAL RECEIPT", title: "Numbered and printed on the spot", text: "Every sale gets a numbered fiscal receipt." },
  { k: "Z-REPORT", title: "Close the day in one tap", text: "Close the day with a Z-report on the device." },
  {
    k: "CASH + CARD",
    title: "Cash and card in one fiscal shift",
    text: "Two in three in-store payments in Malta are made in cash, the highest share in the euro area (ECB, 2024). SmartOne records cash and card on the same register.",
  },
  { k: "PAYOUT T+1", title: "Money to the bank you already use", text: "No new account. Card payouts arrive next working day through a licensed EU acquirer." },
  { k: "LOCAL SUPPORT", title: "A call back from Malta", text: "Our partner on the island calls back everyone who leaves a request. No chatbot queue." },
  {
    k: "CASHBOX",
    title: "Just need the register?",
    text: "Start with the fiscal register alone and add card payments later, after a quick check of your business. No new hardware.",
  },
];

const h2 = "h-display text-[clamp(26px,3.4vw,37px)] leading-[1.12]";
const lead = "lead text-[17px] leading-relaxed text-ink-2";
const sectionHead = "mb-9 grid max-w-180 gap-3";
const small = "block text-[14px] leading-snug text-ink-2";

export default function MaltaFiscalCashRegister() {
  const url = `${SITE_URL}${PATH}`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Fiscal Cash Register Malta: No EXO Number Needed",
        description: DESCRIPTION,
        inLanguage: "en-MT",
        dateModified: DATE_MODIFIED,
      },
      breadcrumbLd(PATH, "Fiscal cash register"),
      {
        "@type": "Product",
        name: DEVICE.name,
        description:
          "VAT-approved fiscal cash register, card terminal and receipt printer in one device, approved in Malta (Government Gazette No. 21,373, Notice 46, 10 January 2025).",
        image: `${SITE_URL}${DEVICE.dir}/hero.webp`,
        brand: { "@type": "Brand", name: "SmartOne" },
        offers: {
          "@type": "Offer",
          price: BUY,
          priceCurrency: "EUR",
          priceSpecification: { "@type": "UnitPriceSpecification", price: BUY, priceCurrency: "EUR", valueAddedTaxIncluded: false },
          availability: "https://schema.org/InStock",
          areaServed: "MT",
          url: `${SITE_URL}/pricing`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />

      {/* hero */}
      <section className="overflow-x-clip pt-8 pb-18">
        <div className="mx-auto max-w-6xl px-6">
          <Crumbs current="Fiscal cash register" className="mb-4.5" />
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:gap-14">
            <div className="grid min-w-0 gap-5.5">
              <span className="eyebrow">Fiscal receipts in Malta</span>
              <h1 className="h-display text-[clamp(34px,5vw,54px)] leading-[1.08]">A VAT-approved fiscal cash register for Malta. No EXO number needed.</h1>
              <p className={lead}>
                SmartOne is a fiscal cash register, card terminal and receipt printer in one device, approved by the Malta Tax and Customs Administration. You skip the EXO application, the software supplier certificate and the auditor certificate. Fiscal registration of the device is part of your setup.
              </p>
              <div id="hero-cta" className="flex flex-wrap items-center gap-3">
                <TalkToUs location="hero" page={PAGE} className="btn-primary">
                  Talk to us →
                </TalkToUs>
              </div>
              <p className="text-[14px] text-ink-2">Leave your number. Our partner in Malta calls you back and helps you register.</p>
              <ul className="mt-1 flex flex-wrap gap-2.5">
                <li className="rounded-full bg-bg-2 px-3 py-1.5 text-[14px]">
                  <b className="font-semibold text-brand">Usually 4 working days</b> from registration to first receipt
                </li>
                <li className="rounded-full bg-bg-2 px-3 py-1.5 text-[14px]">
                  <b className="font-semibold text-brand">{eur(BUY)} + VAT</b> device + a fee per card payment
                </li>
                <li className="rounded-full bg-bg-2 px-3 py-1.5 text-[14px]">Card, contactless and cash</li>
              </ul>
              <p className="flex max-w-[60ch] items-start gap-2.5 border-t border-line pt-3.5 text-[14px] text-ink-2">
                <span className="mt-px grid size-5 flex-none place-items-center rounded-full bg-brand text-[11px] font-bold text-white" aria-hidden>
                  ✓
                </span>
                Approved fiscal cash register: Malta Government Gazette No. 21,373, Notice 46, 10 January 2025.
              </p>
            </div>
            <ReceiptStage />
          </div>
        </div>
      </section>

      {/* what is an EXO number */}
      <section id="what-is-an-exo-number" className="scroll-mt-20 border-t border-line py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className={sectionHead}>
            <span className="eyebrow">The short answer</span>
            <h2 className={h2}>What is an EXO number in Malta?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <p className="border-l-[3px] border-brand pl-5 text-[19px] leading-normal">
              An EXO number is a temporary exemption number issued by the Malta Tax and Customs Administration (MTCA). It lets a VAT-registered business use a computerised POS system as a cash register. Printed on the receipt, it makes that receipt fiscal. You apply with a software supplier certificate and an auditor certificate.
            </p>
            <div className="grid content-start gap-3.5 text-[16px] leading-relaxed text-ink-2">
              <p>
                Maltese VAT law gives three ways to issue a fiscal receipt: an approved fiscal cash register, a computerised POS with an EXO number, or a fiscal receipt book. The EXO route exists for businesses that want to run their own POS software.
              </p>
              <p>
                <strong className="text-ink">Do you need an EXO number with a fiscal cash register?</strong> No. An approved fiscal cash register makes your receipts fiscal on its own. SmartOne is that register, with a{" "}
                <Link href="/product/terminals" className="text-brand underline underline-offset-2">card terminal</Link> and receipt printer built in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* comparison */}
      <section id="compare" className="bg-bg-2 py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className={sectionHead}>
            <span className="eyebrow">Your options</span>
            <h2 className={h2}>EXO number vs fiscal printer vs fiscal cash register</h2>
            <p className={lead}>Three ways to issue fiscal receipts from a till in Malta. Two of them need a separate card terminal and a second contract.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[680px] border-collapse text-left text-[15px]">
              <caption className="sr-only">Comparison of ways to issue fiscal receipts in Malta</caption>
              <thead>
                <tr className="text-[13px] font-semibold">
                  <th scope="col" className="w-[22%] border-b border-line bg-bg-2 px-4.5 py-4">
                    <span className="sr-only">Compared</span>
                  </th>
                  <th scope="col" className="border-b border-line bg-bg-2 px-4.5 py-4 text-ink-2">POS software + EXO number</th>
                  <th scope="col" className="border-b border-line bg-bg-2 px-4.5 py-4 text-ink-2">POS software + fiscal printer</th>
                  <th scope="col" className="border-b border-line bg-brand px-4.5 py-4 text-white">SmartOne fiscal cash register</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => {
                  const cell = "border-line px-4.5 py-4 align-top [tr:not(:last-child)>&]:border-b";
                  return (
                    <tr key={r.row}>
                      <th scope="row" className={`${cell} font-semibold text-ink`}>{r.row}</th>
                      <td className={`${cell} ${r.muted ? "text-ink-2" : ""}`}>{r.exo}</td>
                      <td className={`${cell} ${r.muted ? "text-ink-2" : ""}`}>{r.printer}</td>
                      <td className={`${cell} bg-brand-tint font-medium`}>{r.us}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* routes */}
      <section id="how-to-get-an-exo-number" className="scroll-mt-20 py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className={sectionHead}>
            <span className="eyebrow">How it works</span>
            <h2 className={h2}>How to get an EXO number in Malta, and how to skip it</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Route
              title="The EXO route"
              duration="about 21 days after you apply"
              steps={[
                <>Get a certificate from your POS software supplier.</>,
                <>
                  Get an auditor certificate for the system.<small className={small}>An independent auditor checks that the POS meets MTCA requirements.</small>
                </>,
                <>
                  Apply online to MTCA.
                  <small className={small}>
                    Attach both certificates, a copy of the fiscal receipt and a copy of the pre-bill. Email applications aren&apos;t accepted since 10 February 2025.
                  </small>
                </>,
                <>
                  Wait for the EXO number.<small className={small}>Official timeline: vetting 15 days, assessment 3, approval 2, delivery 1.</small>
                </>,
              ]}
            >
              <p className="border-t border-line pt-3.5 text-[14px] text-ink-2">Until the EXO number is printed on your receipts, receipts from the POS aren&apos;t fiscal.</p>
            </Route>
            <Route
              ours
              title="The SmartOne route"
              duration="Usually 4 working days"
              steps={[
                <>
                  Leave your number.<small className={small}>Our partner in Malta calls you back and helps you register.</small>
                </>,
                <>
                  A person reviews your account.<small className={small}>No automated approvals.</small>
                </>,
                <>
                  Our partner in Malta hands over the device.<small className={small}>Fiscal registration of the device is part of your setup.</small>
                </>,
                <>
                  Print your first fiscal receipt.<small className={small}>Card, contactless or cash.</small>
                </>,
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <TalkToUs location="routes" page={PAGE} className="btn-primary">
                  Talk to us →
                </TalkToUs>
              </div>
            </Route>
          </div>
        </div>
      </section>

      {/* features */}
      <section id="device" className="bg-bg-2 py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className={sectionHead}>
            <span className="eyebrow">One device on the counter</span>
            <h2 className={h2}>What the fiscal cash register does every day</h2>
          </div>
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.k} className="grid content-start gap-2">
                <div className="font-mono text-[12.5px] font-semibold tracking-[0.04em] text-brand">{f.k}</div>
                <h3 className="font-display text-[17.5px] font-semibold tracking-[-0.01em]">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* mid CTA */}
      <section id="get-started" className="bg-brand-tint py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-5 px-6">
          <div className="grid min-w-0 max-w-140 gap-1.5">
            <h2 className="h-display text-[clamp(21px,2.6vw,28px)] leading-[1.15]">Skip the EXO paperwork. Start with a VAT-approved register.</h2>
            <p className="text-ink-2">Leave your number. Our partner in Malta calls you back, helps you register, and you&apos;re usually live within four working days.</p>
          </div>
          <TalkToUs location="mid" page={PAGE} className="btn-primary">
            Talk to us →
          </TalkToUs>
        </div>
      </section>

      {/* price */}
      <section id="price" className="py-18">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="grid min-w-0 gap-4">
            <span className="eyebrow">What it costs</span>
            <h2 className="h-display text-[clamp(20px,2.4vw,26px)] leading-[1.2]">How much is a fiscal cash register in Malta with SmartOne?</h2>
            <div className="font-display text-[clamp(42px,6vw,58px)] leading-none font-extrabold tracking-[-0.03em]">
              {eur(BUY)} <small className="text-[16px] font-medium tracking-normal text-ink-2">+ VAT to buy, no minimum term</small>
            </div>
            <div className="text-[17px] font-semibold">
              or {eur(RENT)} + VAT / month to rent <small className="text-[15px] font-medium text-ink-2">· one-year minimum term</small>
            </div>
            <p className={lead}>
              The VAT-approved cash register, card terminal, printer and merchant portal are all included. A separate fiscal cash register costs €800–1,200 on its own.
            </p>
            <div className="grid gap-2 rounded-2xl border border-line bg-white px-4.5 py-4">
              <div className="text-[13px] font-semibold text-ink-2">Plus a fee on every card payment, set by your monthly card volume</div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-4 text-[12.5px] font-semibold text-ink-2">
                <span>Monthly card volume</span>
                <b className="min-w-[7.2em] text-right font-semibold">Buy</b>
                <b className="min-w-[7.2em] text-right font-semibold">Rent</b>
              </div>
              {[`Under €${TERMS.bands[0]}`, `€${TERMS.bands[0]} – €${TERMS.bands[1]}`, `Over €${TERMS.bands[1]}`].map((band, i) => (
                <div
                  key={band}
                  className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-4 border-t border-line pt-2 text-[15px] max-[400px]:gap-x-2.5 max-[400px]:text-[14px]"
                >
                  <span>{band}</span>
                  <b className="min-w-[7.2em] text-right font-semibold whitespace-nowrap tabular-nums max-[400px]:min-w-0">{rateLine(TERMS.rates.buy[i])}</b>
                  <b className="min-w-[7.2em] text-right font-semibold whitespace-nowrap tabular-nums max-[400px]:min-w-0">{rateLine(TERMS.rates.rent[i])}</b>
                </div>
              ))}
              <p className="text-[13px] text-ink-2">
                Per transaction, domestic cards. Corporate and international cards have their own rate, confirmed for your business. Cash sales carry no card fee. You see the exact fee in euros on every payout.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/pricing" className="btn-ghost">See full pricing</Link>
              <Link href="/malta/compare" className="btn-ghost">Compare the first year</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Minimum fee" },
              { label: "Inactivity fee" },
              { label: "Settlement fee" },
              { label: "Rate mark-ups", note: "The rate you agreed at signing is the rate you pay." },
            ].map((z) => (
              <div key={z.label} className="rounded-2xl border border-line bg-white p-4">
                <b className="block text-[24px] font-bold text-brand tabular-nums">€0</b>
                <span className="text-[14px] text-ink-2">{z.label}</span>
                {z.note && <small className="mt-1.5 block text-[12.5px] leading-snug text-ink-2">{z.note}</small>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ – in the markup, not loaded by script */}
      <section id="faq" className="bg-bg-2 py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className={sectionHead}>
            <span className="eyebrow">Questions</span>
            <h2 className={h2}>EXO numbers and fiscal cash registers in Malta: FAQ</h2>
          </div>
          <div className="max-w-200 border-t border-line">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group border-b border-line">
                <summary className="relative cursor-pointer list-none py-5 pr-10 font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <span
                    className="absolute top-4 right-1.5 text-[22px] leading-none font-normal text-brand transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="max-w-[65ch] pb-5.5 text-ink-2">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* final */}
      <section id="final" className="bg-brand py-18 text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6">
          <h2 className={`${h2} max-w-[18ch]`}>Your first fiscal receipt, usually four working days from now.</h2>
          <p className="max-w-[55ch] text-white/85">
            Leave your number today. Our partner in Malta calls you back and helps you register, then brings the device. Fiscal registration is part of your setup.
          </p>
          <div className="flex flex-wrap gap-3">
            <TalkToUs location="final" page={PAGE} className="btn-light">
              Talk to us →
            </TalkToUs>
          </div>
          <p className="text-[14px] text-white/85">
            Device {eur(BUY)} + VAT, plus a fee on each card payment shown in euros · No minimum or inactivity fees · Payout to your own bank next working day
          </p>
        </div>
      </section>

      {/* sources */}
      <section id="sources" className="border-t border-line py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 font-display text-[16px] font-semibold">Sources</h2>
          <ul className="grid max-w-[80ch] list-disc gap-1.5 pl-4.5 text-[14px] text-ink-2">
            <li>Malta Government Gazette No. 21,373, 10 January 2025, Government Notice 46: approval of the SmartOne fiscal cash register.</li>
            <li>
              <a href="https://www.servizz.gov.mt/en/Services/web-04190" className="text-brand underline underline-offset-2">
                servizz.gov.mt: VAT EXO number, fiscal systems
              </a>{" "}
              (documents and timeline).
            </li>
            <li>
              <a
                href="https://mtca.gov.mt/news-results-page/2025/02/03/new-application-form-for-vat-exo-number-(point-of-sale)"
                className="text-brand underline underline-offset-2"
              >
                MTCA: New application form for VAT EXO number (Point of Sale)
              </a>
              , 3 February 2025.
            </li>
            <li>
              <a href="https://www.ecb.europa.eu/stats/ecb_surveys/space/html/ecb.space2024~19d46f0f17.en.html" className="text-brand underline underline-offset-2">
                ECB: Study on the payment attitudes of consumers in the euro area (SPACE) 2024
              </a>
              : cash was used in 67% of point-of-sale payments in Malta, against 52% in the euro area.
            </li>
            <li>
              <Link href="/pricing" className="text-brand underline underline-offset-2">SmartOne pricing</Link>.
            </li>
          </ul>
        </div>
      </section>

      <StickyTalk after="hero-cta" until="final" page={PAGE} />
    </>
  );
}

function Route({
  title,
  duration,
  steps,
  ours = false,
  children,
}: {
  title: string;
  duration: string;
  steps: React.ReactNode[];
  ours?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid content-start gap-4.5 rounded-[18px] border bg-white p-6 sm:p-7 ${ours ? "border-brand shadow-[inset_0_0_0_1px_var(--color-brand)]" : "border-line"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-display text-[18px] font-semibold tracking-[-0.01em]">{title}</h3>
        <span className={`text-[14px] tabular-nums ${ours ? "font-semibold text-brand" : "text-ink-2"}`}>{duration}</span>
      </div>
      <ol className="grid gap-3.5">
        {steps.map((step, i) => (
          <li key={i} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3">
            <span
              className={`grid size-7 place-items-center rounded-full text-[12.5px] font-semibold ${ours ? "bg-brand text-white" : "bg-bg-2 text-ink-2"}`}
              aria-hidden
            >
              {i + 1}
            </span>
            <div>{step}</div>
          </li>
        ))}
      </ol>
      {children}
    </div>
  );
}

/* The device with a sample fiscal receipt beside it, as in the prototype –
   with Malta's Bank Pro S in place of the prototype's render. */
function ReceiptStage() {
  return (
    <div
      className="relative mx-auto h-[480px] w-full max-w-[440px] rounded-[32px] bg-[radial-gradient(120%_90%_at_70%_35%,var(--color-brand-tint)_0%,var(--color-bg-2)_70%)] sm:h-[580px]">
      <div className="absolute right-[4%] bottom-[26px] z-[2] aspect-[321/900] h-[420px] sm:h-[530px]">
        {/* front.webp is square with the upright device in its middle third – the narrow box crops to it */}
        <Image
          src={`${DEVICE.dir}/front.webp`}
          alt={`${DEVICE.name}: fiscal cash register, card terminal and receipt printer in one device`}
          fill
          priority
          sizes="190px"
          className="object-cover drop-shadow-[0_28px_34px_rgba(40,20,80,0.32)]"
        />
      </div>
      <div
        aria-hidden
        className="absolute top-[96px] left-2 z-[1] w-[170px] max-w-[48%] -rotate-[5deg] bg-[#fffdf8] px-3 pt-4 pb-8 font-mono text-[9.5px] leading-normal text-[#26252b] shadow-[0_1px_0_#cfcbd8,0_18px_40px_-18px_rgba(40,20,80,0.35)] [mask:radial-gradient(circle_6px_at_50%_100%,transparent_98%,#000)_0_0/14px_100%_repeat-x] sm:top-[118px] sm:left-3.5 sm:w-[196px] sm:px-4 sm:pt-5 sm:pb-9 sm:text-[11.5px]"
      >
        <div className="pointer-events-none absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] font-sans text-[30px] leading-none font-bold tracking-[0.12em] text-[rgba(90,25,181,0.10)]">
          SAMPLE
        </div>
        <div className="text-center text-[11px] font-semibold sm:text-[13px]">YOUR SHOP LTD</div>
        <div className="text-center">Tower Road, Sliema</div>
        <div className="text-center">VAT MT 0000 0000</div>
        <hr className="my-2.5 border-0 border-t border-dashed border-[#cfcbd8]" />
        <Row l="Receipt" r="No. 000218" />
        <Row l="05.10.2026" r="11:42" />
        <hr className="my-2.5 border-0 border-t border-dashed border-[#cfcbd8]" />
        <Row l="Greeting card" r="3.50" />
        <Row l="Gift wrap" r="1.50" />
        <hr className="my-2.5 border-0 border-t border-dashed border-[#cfcbd8]" />
        <Row l="TOTAL EUR" r="5.00" big />
        <Row l="VAT 18% incl." r="0.76" />
        <Row l="Card · contactless" r="5.00" />
      </div>
      <span
        aria-hidden
        className="absolute top-[56px] left-[22px] z-[3] -rotate-[5deg] rounded-full border border-brand bg-white px-2.5 py-0.5 text-[12px] font-semibold whitespace-nowrap text-brand max-[420px]:hidden sm:top-[72px]"
      >
        No EXO number
      </span>
      <span
        aria-hidden
        className="absolute bottom-10 left-[6%] z-[3] rounded-full border border-brand bg-white px-2.5 py-0.5 text-[12px] font-semibold whitespace-nowrap text-brand max-[420px]:hidden"
      >
        Printed by SmartOne
      </span>
    </div>
  );
}

function Row({ l, r, big = false }: { l: string; r: string; big?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 ${big ? "text-[11px] font-semibold sm:text-[13px]" : ""}`}>
      <span>{l}</span>
      <span>{r}</span>
    </div>
  );
}
