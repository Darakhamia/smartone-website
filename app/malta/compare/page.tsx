import Image from "next/image";
import Link from "next/link";
import { TalkToUs } from "@/components/lead/talk-to-us";
import {
  BUY,
  Crumbs,
  DEVICE,
  JsonLd,
  LOWEST_RATE,
  RENT,
  TERMS,
  breadcrumbLd,
  eur,
  landingMetadata,
  rateLine,
  yearOfFees,
} from "@/components/malta/shared";
import { ORG_ID } from "@/components/seo/jsonld";
import { SITE_URL } from "@/lib/site";

/* /malta/compare – the comparison page for brand searches (Nadia's prototype
   v13 of 12.11.2026, approved by Alex 16.11). Copy is the prototype's, word for
   word: change only what has been agreed. Malta only, so English only.

   The SmartOne rows of the first-year table are worked out from lib/pricing.ts
   (as components/home/first-year.tsx describes); the competitors' figures are
   the prototype's, from their Malta websites on 5 November 2026. */

const PATH = "/malta/compare";
const TITLE = "More than a card reader | SmartOne Malta compare";
const DESCRIPTION =
  "A card reader cannot issue a fiscal receipt in Malta. Compare the first-year cost of SmartOne against myPOS and SumUp plus a register.";

export const metadata = landingMetadata(PATH, TITLE, DESCRIPTION);

// The worked example: one counter, €3,000 a month in cards, €15 average sale.
const MONTHLY = 3000;
const AVERAGE = 15;
const rent = yearOfFees("rent", MONTHLY, AVERAGE);
const buy = yearOfFees("buy", MONTHLY, AVERAGE);
const rentDevice = Number(RENT) * 12;
const buyDevice = Number(BUY);

type Row = {
  name: string;
  sub?: string;
  total: string;
  fees: string;
  feesNote: string;
  device: string;
  deviceNote?: string;
  register: string;
  registerNote?: string;
  ours?: boolean;
};

const ROWS: Row[] = [
  {
    name: "SmartOne, rent",
    total: eur(rent.fees + rentDevice),
    fees: eur(rent.fees),
    feesNote: rateLine(rent.rate),
    device: eur(rentDevice),
    deviceNote: `${eur(RENT)} a month, 1-year minimum`,
    register: "Included",
    ours: true,
  },
  {
    name: "SmartOne, buy",
    total: eur(buy.fees + buyDevice),
    fees: eur(buy.fees),
    feesNote: rateLine(buy.rate),
    device: eur(buyDevice),
    deviceNote: "no minimum term",
    register: "Included",
    ours: true,
  },
  {
    name: "myPOS Go 2",
    sub: "+ a separate fiscal cash register",
    total: "€1,447–1,847",
    fees: "€608",
    feesNote: "1.69%, no monthly plan",
    device: "€39",
    register: "€800–1,200",
    registerNote: "second supplier, second contract",
  },
  {
    name: "SumUp Solo Lite",
    sub: "+ a separate fiscal cash register",
    total: "€1,629–2,029",
    fees: "€812",
    feesNote: "1.29% on the €29 monthly plan",
    device: "€17",
    deviceNote: "promotional price, list €34; does not print",
    register: "€800–1,200",
    registerNote: "second supplier, second contract",
  },
];

const INDUSTRIES = [
  { img: "events", alt: "A stall at a festival", title: "Festivals & events" },
  { img: "retail", alt: "A shop counter", title: "Retail" },
  { img: "cafes", alt: "A cafe counter", title: "Cafés & HoReCa" },
  { img: "services-electrician", alt: "A tradesperson at work", title: "Professional services" },
  { img: "mobile-courier", alt: "A courier on the street", title: "Mobile / Street" },
  { img: "bakery", alt: "A bakery counter", title: "Bakeries" },
  { img: "beauty-salon", alt: "A salon chair", title: "Beauty & wellness" },
  { img: "grocery", alt: "A grocery aisle", title: "Grocery" },
];

const ICON = "size-[26px] shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6]";

const shield = (
  <>
    <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 8.5-4.1-.9-7-4.3-7-8.5V6l7-3z" />
    <path d="M9 12.2l2.1 2.1L15 10.4" />
  </>
);

const CERTS = [
  {
    icon: shield,
    title: "PCI Secure Software Standard",
    text: "Our payment software is validated to version 1.2 of the standard and listed by the PCI Security Standards Council.",
    ref: "Payment Core 2.1.0 · ref. 23-50.01492.001",
  },
  {
    icon: (
      <>
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
        <path d="M8.2 10.5V7.8a3.8 3.8 0 017.6 0v2.7" />
        <path d="M12 14v2.4" />
      </>
    ),
    title: "PCI PTS 6.x",
    text: "The terminal hardware is approved under PIN Transaction Security — the standard for how a device keeps a PIN safe.",
  },
  {
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
        <path d="M3 10h18" />
        <path d="M7 14.5h3.5" />
      </>
    ),
    title: "EMV Level 1 and 2",
    text: "Chip, contactless and magnetic stripe are handled to EMV Level 1 and 2, with Visa, Mastercard and the other major schemes.",
  },
  {
    icon: (
      <>
        <path d="M4 7.5l8-4 8 4-8 4-8-4z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 16.5l8 4 8-4" />
      </>
    ),
    title: "Encrypted on the way out",
    text: "The PIN is encrypted on the device, and traffic to the processing host uses DUKPT and AES-128.",
  },
];

const PAGE = "compare";
const sectionHead = "grid max-w-190 gap-3";
const h2 = "h-display text-[clamp(26px,3.4vw,37px)] leading-[1.12]";
const lead = "lead text-[17px] leading-relaxed text-ink-2 max-[480px]:text-[16px]";

export default function MaltaCompare() {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${PATH}#webpage`,
        url: `${SITE_URL}${PATH}`,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-MT",
        publisher: { "@id": ORG_ID },
      },
      breadcrumbLd(PATH, "Compare"),
    ],
  };

  return (
    <>
      <JsonLd data={ld} />

      {/* 1 · promise, price anchors, CTA */}
      <section className="pt-6 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <Crumbs current="Compare" className="mb-4 max-[480px]:hidden" />
          <div className="mb-6 grid gap-3.5">
            <span className="eyebrow max-[480px]:text-[12px] max-[480px]:tracking-[0.06em]">Comparing card payment providers in Malta</span>
            <h1 className="h-display text-[clamp(34px,4.6vw,48px)] leading-[1.08]">
              <span className="block">More than a card reader.</span>{" "}
              <span className="block">A VAT&#8209;approved fiscal cash register too.</span>
            </h1>
          </div>

          <div className="grid items-start gap-7 md:grid-cols-[minmax(0,1fr)_230px] md:gap-11">
            <div className="grid min-w-0 gap-5.5">
              <p className={lead}>
                A reader from SumUp or myPOS takes the card. In Malta it cannot issue the fiscal receipt — that is a second device and a second contract. SmartOne is one approved device that does both.
              </p>

              <ul className="order-2 grid rounded-2xl border border-line bg-bg-2 px-4 py-1 md:order-none md:grid-cols-3 md:gap-3 md:border-0 md:bg-transparent md:p-0">
                {[
                  {
                    tag: "What you never pay",
                    value: <>€0</>,
                    text: <>No setup fee, no inactivity fee, no monthly minimum.</>,
                  },
                  {
                    tag: "Your rate",
                    value: (
                      <>
                        <span className="font-sans text-[13px] font-medium tracking-normal text-ink-2">From</span>
                        {LOWEST_RATE}%<Plus>+ {eur(TERMS.fixed)}</Plus>
                      </>
                    ),
                    text: (
                      <>
                        Per card payment, by monthly card volume.{" "}
                        <Link href="/pricing" className="text-brand underline underline-offset-2">See all rates.</Link>
                      </>
                    ),
                  },
                  {
                    tag: "The device",
                    value: (
                      <>
                        {eur(BUY)}
                        <Plus>+ VAT</Plus>
                      </>
                    ),
                    text: <>To buy, with no minimum term. Or {eur(RENT)} a month to rent.</>,
                  },
                ].map((a) => (
                  <li
                    key={a.tag}
                    className="grid min-w-0 grid-cols-[132px_minmax(0,1fr)] items-start gap-x-3.5 border-line py-3.5 not-first:border-t md:grid-cols-1 md:content-start md:gap-2.5 md:rounded-2xl md:border md:bg-bg-2 md:p-4.5 md:pb-5 md:not-first:border-t"
                  >
                    <span className="hidden justify-self-start rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold tracking-[0.09em] text-brand uppercase md:inline-block">
                      {a.tag}
                    </span>
                    <b className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5 font-mono text-[21px] leading-[1.1] font-bold tracking-[-0.045em] md:text-[30px]">
                      {a.value}
                    </b>
                    <p className="text-[14.5px] leading-normal text-ink-2">{a.text}</p>
                  </li>
                ))}
              </ul>

              <div className="order-1 grid gap-3 md:order-none">
                <div className="flex flex-wrap items-center gap-3">
                  <TalkToUs location="hero" page={PAGE} className="btn-primary max-md:w-full">
                    Talk to us →
                  </TalkToUs>
                  <a href="#first-year" className="btn-ghost max-md:w-full">See what the first year costs</a>
                </div>
                <p className="text-[14.5px] leading-relaxed text-ink-2">
                  Leave your number. Our partner in Malta calls you back, checks that your shop qualifies and helps you register.
                </p>
              </div>
            </div>

            <figure className="relative mx-auto aspect-[321/900] h-auto w-[110px] md:w-full md:max-w-[160px]">
              {/* front.webp is square with the upright device in its middle third – the narrow box crops to it */}
              <Image
                src={`${DEVICE.dir}/front.webp`}
                alt={`${DEVICE.name}: a card terminal with a built-in receipt printer`}
                fill
                priority
                sizes="(max-width: 768px) 110px, 160px"
                className="object-cover drop-shadow-[0_22px_28px_rgba(29,29,31,0.2)]"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* proof band */}
      <section aria-label="Approval" className="pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <ul className="grid gap-4.5 rounded-[22px] bg-brand px-5.5 py-5.5 text-white md:grid-cols-3 md:gap-5.5 md:px-6.5 md:py-6">
            {[
              {
                icon: shield,
                big: "VAT-approved",
                text: <>Fiscal cash register in Malta. Government Gazette No.&nbsp;21,373, Notice 46, 10 January 2025.</>,
              },
              {
                icon: (
                  <>
                    <rect x="6" y="3" width="12" height="18" rx="2.4" />
                    <path d="M9 7h6" />
                    <path d="M9 11h6" />
                    <path d="M9 15h3" />
                  </>
                ),
                big: "200,000+",
                text: <>SmartOne terminals deployed worldwide.</>,
              },
              {
                icon: (
                  <>
                    <circle cx="12" cy="12" r="8.6" />
                    <path d="M3.4 12h17.2" />
                    <path d="M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6s-1.2 6.2-3.5 8.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4z" />
                  </>
                ),
                big: "15",
                text: <>countries with SmartOne projects running.</>,
              },
            ].map((p) => (
              <li
                key={p.big}
                className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-3.5 border-white/30 not-first:border-t not-first:pt-4.5 md:not-first:border-t-0 md:not-first:border-l md:not-first:pt-0 md:not-first:pl-5.5"
              >
                <svg viewBox="0 0 24 24" className={`${ICON} mt-0.5 opacity-90`} aria-hidden>
                  {p.icon}
                </svg>
                <div>
                  <b className="mb-1 block font-mono text-[25px] leading-[1.1] font-bold tracking-[-0.04em]">{p.big}</b>
                  <span className="block text-[14.5px] leading-snug opacity-90">{p.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2 · the first year */}
      <section id="first-year" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${sectionHead} mb-8`}>
            <span className="eyebrow">Worked example</span>
            <h2 className={h2}>What your first year really costs</h2>
            <p className={lead}>
              One counter, card sales of €3,000 a month, €15 average sale. The same shop, four ways, each on the cheapest plan that provider offers at this volume. All prices exclude VAT.
            </p>
          </div>

          {/* Scrolls sideways on a phone, inside its own frame, with the setup column pinned. */}
          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[800px] table-fixed border-collapse text-left text-[15px] md:min-w-0">
              <caption className="sr-only">First-year cost of four setups in Malta</caption>
              <colgroup>
                <col className="w-[128px] md:w-[25%]" />
                <col className="w-[168px] md:w-[16%]" />
                <col className="md:w-[19%]" />
                <col className="md:w-[20%]" />
                <col className="md:w-[20%]" />
              </colgroup>
              <thead>
                <tr className="text-[13px] font-semibold">
                  <th scope="col" className="sticky left-0 z-[1] border-b border-line bg-bg-2 px-4.5 py-4 text-ink-2 md:static">Setup</th>
                  <th scope="col" className="border-b border-line bg-brand px-4.5 py-4 text-white">First year</th>
                  <th scope="col" className="border-b border-line bg-bg-2 px-4.5 py-4 text-ink-2">Card fees</th>
                  <th scope="col" className="border-b border-line bg-bg-2 px-4.5 py-4 text-ink-2">Device</th>
                  <th scope="col" className="border-b border-line bg-bg-2 px-4.5 py-4 text-ink-2">Fiscal cash register</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => {
                  const cell = `border-line px-4.5 py-4 align-top [tr:not(:last-child)>&]:border-b ${r.ours ? "bg-[#f8f4fd]" : ""}`;
                  return (
                    <tr key={r.name}>
                      <th
                        scope="row"
                        className={`${cell} sticky left-0 z-[1] font-semibold text-ink shadow-[1px_0_0_var(--color-line)] md:static md:shadow-none ${
                          r.ours ? "bg-brand-tint! shadow-[inset_3px_0_0_var(--color-brand),1px_0_0_var(--color-line)] md:shadow-[inset_3px_0_0_var(--color-brand)]" : "bg-white"
                        }`}
                      >
                        {r.name}
                        {r.sub && <span className="mt-0.5 block text-[13px] leading-snug font-normal text-ink-2">{r.sub}</span>}
                      </th>
                      <td className={`${cell} font-mono text-[17.5px] leading-tight font-bold tracking-[-0.03em] whitespace-nowrap md:whitespace-normal ${r.ours ? "bg-brand-tint!" : ""}`}>
                        {r.total}
                      </td>
                      <td className={`${cell} tabular-nums`}>
                        {r.fees}
                        <span className="mt-0.5 block text-[13px] leading-snug text-ink-2">{r.feesNote}</span>
                      </td>
                      <td className={`${cell} tabular-nums`}>
                        {r.device}
                        {r.deviceNote && <span className="mt-0.5 block text-[13px] leading-snug text-ink-2">{r.deviceNote}</span>}
                      </td>
                      <td className={`${cell} tabular-nums`}>
                        {r.ours ? <span className="font-semibold text-brand">{r.register}</span> : r.register}
                        {r.registerNote && <span className="mt-0.5 block text-[13px] leading-snug text-ink-2">{r.registerNote}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4.5 grid max-w-[78ch] gap-2.5 text-[14px] text-ink-2">
            <p>Competitor prices from their Malta websites, checked on 5 November 2026.</p>
            <p>
              <b className="font-semibold text-ink">Closed for the winter?</b> If you buy the device, a month without sales costs you nothing. If you rent, only the {eur(RENT)} rent continues. No setup, inactivity or minimum fees either way.
            </p>
          </div>

          <div className="mt-6.5 flex flex-wrap items-center gap-3">
            <TalkToUs location="first_year" page={PAGE} className="btn-primary">
              Talk to us →
            </TalkToUs>
            <span className="text-[15px] text-ink-2">Tell us your card volume and average sale — we&rsquo;ll run this table on your figures.</span>
          </div>
        </div>
      </section>

      {/* 3 · switching */}
      <section id="switching" className="bg-bg-2 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${sectionHead} mb-8`}>
            <span className="eyebrow">Switching</span>
            <h2 className={h2}>Three steps, and one device on the counter instead of four</h2>
            <p className={lead}>
              A card reader, a phone, a fiscal register and a printer become one approved device — on one contract, with one bill and one number to call.
            </p>
          </div>

          <ol className="grid gap-4.5 md:grid-cols-3">
            {[
              {
                title: "Leave your number",
                text: <>One form: name, phone, email, what kind of business you run and your monthly card volume.</>,
              },
              {
                title: "Our partner in Malta calls you back",
                text: (
                  <>
                    A person, not a support chat, checks that your shop qualifies, quotes your rate band and registers you.{" "}
                    <Link href="/malta/fiscal-cash-register#what-is-an-exo-number" className="text-brand underline underline-offset-2">No EXO number</Link>, no software supplier certificate, no auditor report — the device itself is approved.
                  </>
                ),
              },
              {
                title: "The device arrives, fiscally registered",
                text: (
                  <>
                    Usually 4 working days from registration to your first fiscal receipt. On the EXO route the official timeline alone is about 3 weeks (MTCA: 15 + 3 + 2 + 1 days), and you still need a card terminal on top.
                  </>
                ),
              },
            ].map((s, i) => (
              <li
                key={s.title}
                className="grid min-w-0 grid-cols-[28px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-2xl border border-line bg-white p-5.5 md:row-span-3 md:grid-cols-1 md:grid-rows-subgrid md:content-start md:items-start"
              >
                <span className="grid size-7 place-items-center rounded-full bg-brand text-[12.5px] font-bold text-white" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em]">{s.title}</h3>
                <p className="col-span-full text-[14.5px] leading-relaxed text-ink-2">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-4.5 grid justify-items-start gap-4 rounded-2xl border border-line bg-white p-5.5">
            <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold tracking-[0.09em] text-brand uppercase">Included with every device</span>
            <ul className="grid w-full gap-x-5.5 gap-y-3 md:grid-cols-3">
              {[
                <><b className="font-semibold">One contract</b>, one supplier, one bill</>,
                <><b className="font-semibold">VAT-approved</b> fiscal cash register</>,
                <><b className="font-semibold">Your own bank</b>, next working day</>,
                <><b className="font-semibold">No EXO number</b>, certificate or auditor report</>,
                <><b className="font-semibold">No minimum term</b> if you buy</>,
                <><b className="font-semibold">Cash too</b> — it is a cash register</>,
                <>Visa, Mastercard, contactless, Apple Pay and Google Pay</>,
                <><b className="font-semibold">Our partner in Malta</b>, by phone</>,
                <>Works <b className="font-semibold">online</b></>,
              ].map((item, i) => (
                <li
                  key={i}
                  className="relative pl-6.5 text-[14.5px] leading-snug before:absolute before:top-[0.42em] before:left-[3px] before:h-1.5 before:w-[11px] before:-rotate-45 before:border-b-2 before:border-l-2 before:border-brand"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 · industries */}
      <section id="industries" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${sectionHead} mb-8`}>
            <span className="eyebrow">Built for your kind of business</span>
            <h2 className={h2}>Solutions tailored to your industry.</h2>
          </div>

          <ul className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {INDUSTRIES.map((ind) => (
              <li key={ind.img} className="grid min-w-0 shrink-0 basis-[62%] snap-start md:basis-auto">
                <Link href="/industries" className="block h-full rounded-[22px] bg-bg-2 p-3 transition-colors hover:bg-brand-tint">
                  <span className="relative block aspect-square overflow-hidden rounded-2xl bg-line">
                    <Image src={`/industries/${ind.img}.jpg`} alt={ind.alt} fill sizes="(max-width: 768px) 62vw, 250px" className="object-cover" />
                  </span>
                  <h3 className="px-1.5 pt-3 pb-1 font-display text-[16px] font-semibold tracking-[-0.02em]">{ind.title}</h3>
                </Link>
              </li>
            ))}
          </ul>

          <p className={`${lead} mt-5.5`}>…and many more businesses. If you take payments, SmartOne fits your counter.</p>
        </div>
      </section>

      {/* 5 · security */}
      <section id="security" className="bg-bg-2 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`${sectionHead} mb-8`}>
            <span className="eyebrow">Security</span>
            <h2 className={h2}>Certified to the card industry&rsquo;s own standards</h2>
            <p className={lead}>Not our own badge. Each one is issued by an outside assessor and published in a register anyone can search.</p>
          </div>

          <ul className="grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((c) => (
              <li
                key={c.title}
                className="grid min-w-0 grid-cols-[26px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-2xl border border-line bg-white px-4.5 py-4 sm:row-span-4 sm:grid-cols-1 sm:grid-rows-subgrid sm:content-start sm:items-start sm:p-5"
              >
                <svg viewBox="0 0 24 24" className={`${ICON} text-brand`} aria-hidden>
                  {c.icon}
                </svg>
                <h3 className="font-display text-[16.5px] font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="col-span-full text-[15px] leading-normal text-ink-2">{c.text}</p>
                {c.ref ? <p className="col-span-full font-mono text-[12.5px] font-medium text-ink-2">{c.ref}</p> : <span className="hidden sm:block" />}
              </li>
            ))}
          </ul>

          <p className="mt-4.5 max-w-[74ch] text-[14.5px] text-ink-2">
            Payouts are processed by a licensed EU acquirer and land in the bank account you already have — there is no wallet in between.
          </p>
        </div>
      </section>

      {/* final */}
      <section id="final" className="pt-2 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid justify-items-center gap-4.5 rounded-[22px] bg-brand px-5.5 py-9 text-center text-white md:px-10 md:py-12">
            <h2 className={h2}>Bring your own numbers.</h2>
            <p className="lead max-w-[62ch] text-[17px] leading-relaxed text-white/90">
              Tell us your card volume and your average sale. We&rsquo;ll run the same table on your figures, and say so if your current setup comes out cheaper.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <TalkToUs location="final" page={PAGE} className="btn-light">
                Talk to us →
              </TalkToUs>
              <Link href="/pricing" className="btn-ghost-dark">See all rates</Link>
            </div>
            <p className="max-w-[70ch] text-[14px] text-white/80">
              Device {eur(BUY)} + VAT to buy, or {eur(RENT)} a month to rent · No setup, inactivity or minimum fees · Payout to your own bank next working day
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Plus({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[7px] bg-brand-tint px-2 py-0.5 font-mono text-[13px] leading-[1.4] font-semibold tracking-normal text-brand">{children}</span>
  );
}
