import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "One device, your kind of business. Vets, retail, cafés, beauty, mobile vendors and more – SmartOne fits the counter you already run.",
};

/* Grid: the canonical set plus sub-cards. Each links to its deep section
   (or contact for the sub-cards without one yet). Photos are stock
   placeholders until the real merchant shoot – credited in the README. */
const cards = [
  { img: "/industries/vets.jpg", title: "Vets & services", hook: "Consult and meds on one receipt", href: "#vets" },
  { img: "/industries/retail.jpg", title: "Retail", hook: "Ring up, tap, receipt out", href: "#retail" },
  { img: "/industries/cafes.jpg", title: "Cafés & HoReCa", hook: "Orders reach the register", href: "#cafes" },
  { img: "/industries/beauty.jpg", title: "Beauty & wellness", hook: "Book, serve, get paid", href: "#beauty" },
  { img: "/industries/mobile.jpg", title: "Mobile / street", hook: "No Wi-Fi? No problem", href: "#mobile" },
  { img: "/industries/services.jpg", title: "Professional services", hook: "Parts and labour, one bill", href: "/contact" },
  { img: "/industries/bakery.jpg", title: "Bakeries", hook: "Fast morning queue", href: "/contact" },
  { img: "/industries/grocery.jpg", title: "Grocery", hook: "Card, contactless and cash", href: "/contact" },
];

type Industry = {
  id: string;
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  scenarios: { title: string; text: string }[];
  device: string;
  scope: string;
  click?: boolean;
};

const industries: Industry[] = [
  {
    id: "vets",
    img: "/industries/vets.jpg",
    alt: "Vet examining a cat at the clinic counter",
    eyebrow: "Flagship",
    title: "Vets & services",
    scenarios: [
      { title: "One receipt, two lines", text: "Consultation and the medication that goes home – both on a single fiscal receipt." },
      { title: "Reprint on the spot", text: "A client needs the receipt again for insurance? Find it and reprint in seconds." },
      { title: "Close the day clean", text: "Z-report at closing, and your numbers are ready for the accountant." },
    ],
    device: "SmartOne Bank Pro on the counter",
    scope: "Fiscal receipts and card payments on one certified device. Booking or clinical records stay in your existing tools.",
  },
  {
    id: "retail",
    img: "/industries/retail.jpg",
    alt: "Shop owner taking a card payment at the counter",
    eyebrow: "",
    title: "Retail",
    scenarios: [
      { title: "Products priced once", text: "Set your catalogue in the portal, ring up on the register – no re-typing prices." },
      { title: "Any way they pay", text: "Card, contactless or cash, all on the same screen." },
      { title: "See your best sellers", text: "Revenue, average basket and top categories in the portal." },
    ],
    device: "SmartOne Bank Pro on the counter",
    scope: "Payments, fiscal receipts and a product catalogue. Stock counts and suppliers stay where you keep them today.",
  },
  {
    id: "cafes",
    img: "/industries/cafes.jpg",
    alt: "Barista and a fresh coffee on the café counter",
    eyebrow: "+ Click",
    title: "Cafés & HoReCa",
    scenarios: [
      { title: "Orders reach the register", text: "SmartOne Click takes the order and sends it straight to the register – one catalogue, no re-keying." },
      { title: "Fast at the peak", text: "The big screen keeps the morning rush moving." },
      { title: "One fiscal receipt", text: "Every order closes with a compliant receipt from the built-in printer." },
    ],
    device: "SmartOne Bank Pro + Click",
    scope: "Payments, fiscal receipts and the Click ordering solution. Table plans beyond Click are on your side.",
    click: true,
  },
  {
    id: "beauty",
    img: "/industries/beauty.jpg",
    alt: "Beauty professional finishing a treatment",
    eyebrow: "",
    title: "Beauty & wellness",
    scenarios: [
      { title: "Service, then payment", text: "Finish the appointment, take the payment on the same device – card or contactless." },
      { title: "Receipt every time", text: "A compliant fiscal receipt prints for every client, automatically." },
      { title: "Know your week", text: "What you took and what you'll receive, in euros, in the portal." },
    ],
    device: "SmartOne Bank at the chair",
    scope: "Payments and fiscal receipts. Appointment booking stays in your current scheduler.",
  },
  {
    id: "mobile",
    img: "/industries/mobile.jpg",
    alt: "Food truck vendor on a city street",
    eyebrow: "",
    title: "Mobile / street",
    scenarios: [
      { title: "No Wi-Fi dependency", text: "Built-in SIM keeps you taking cards on the street or at the market." },
      { title: "Lasts the day", text: "One charge covers the shift – no scrambling for a socket." },
      { title: "Standalone box", text: "No phone, no laptop, no extra terminal – it's all one device." },
    ],
    device: "SmartOne Bank, on the move",
    scope: "Payments and fiscal receipts anywhere with mobile signal. Delivery apps stay separate.",
  },
];

function IndustrySection({ ind, i }: { ind: Industry; i: number }) {
  const flip = i % 2 === 1;
  return (
    <section
      id={ind.id}
      className={`scroll-mt-24 py-20 ${i % 2 === 1 ? "bg-bg-2" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className={`grid items-center gap-10 lg:grid-cols-2 ${flip ? "" : ""}`}>
          <Reveal className={flip ? "lg:order-2" : ""}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle,rgba(90,25,181,0.1),transparent_70%)]" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-48px_rgba(90,25,181,0.5)]">
                <Image
                  src={ind.img}
                  alt={ind.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className={flip ? "lg:order-1" : ""}>
            <div>
              {ind.eyebrow && <span className="eyebrow">{ind.eyebrow}</span>}
              <h2 className={`h-display text-[clamp(28px,3.4vw,40px)] leading-[1.06] ${ind.eyebrow ? "mt-3" : ""}`}>
                {ind.title}
              </h2>
              <div className="mt-6 space-y-4">
                {ind.scenarios.map((s) => (
                  <div key={s.title} className="flex gap-3.5">
                    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 stroke-brand" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4 12.5l5 5L20 6" />
                    </svg>
                    <div>
                      <h3 className="font-display text-[16px] font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-2">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {ind.click && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-brand-tint p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand font-display text-[13px] font-bold text-white">
                    C
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-ink-2">
                    <b className="font-semibold text-brand">SmartOne Click</b> is
                    a connected ordering solution – orders flow to the register
                    in real time.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-ink-3">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-brand" />
                  <b className="font-semibold text-ink-2">{ind.device}</b>
                </span>
              </div>
              <p className="mt-3 max-w-115 text-[13px] leading-relaxed text-ink-3">
                {ind.scope}
              </p>

              <div className="mt-6 flex flex-wrap gap-3.5">
                <Link href="/contact" className="btn-primary">
                  Get a terminal →
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Contact sales
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function IndustriesPage() {
  return (
    <>
      {/* 1 · hero */}
      <section className="pt-16 pb-14 lg:pt-22">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-170 text-center">
            <span className="anim-fade-up eyebrow">Industries</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              One device,{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
                your kind of business.
              </span>
            </h1>
            <p className="anim-fade-up anim-d-2 mx-auto mt-5 max-w-130 text-lg leading-relaxed text-ink-2">
              It&apos;s the same job everywhere – take the payment, print the
              receipt, know your money. Here&apos;s what that looks like at your
              counter.
            </p>
          </div>
        </div>
      </section>

      {/* 2 · industry cards grid */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 60} className="h-full">
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-3xl bg-bg-2 p-3 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-tint"
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3.5 px-1.5 font-display text-[16px] font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-0.5 mb-1.5 px-1.5 text-[13px] text-ink-3">{c.hook}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · per-industry sections */}
      {industries.map((ind, i) => (
        <IndustrySection key={ind.id} ind={ind} i={i} />
      ))}

      {/* 5 · Spain / Verifactu routing */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Link
              href="/es"
              className="group flex flex-col items-start gap-5 rounded-3xl border border-line bg-white p-8 transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-5">
                <span className="text-4xl">🇪🇸</span>
                <div>
                  <h3 className="font-display text-[20px] font-semibold tracking-tight">
                    Selling in Spain?
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">
                    Get ahead of the Verifactu 2027 deadline with a certified
                    device.
                  </p>
                </div>
              </div>
              <span className="btn-ghost shrink-0 group-hover:text-brand">
                Spain &amp; Verifactu →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* final CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">
                  Don&apos;t see your trade? It still fits.
                </h2>
                <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">
                  If you take payments across a counter, SmartOne works for you.
                </p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">
                    Get a terminal →
                  </Link>
                  <Link href="/contact" className="btn-ghost-dark">
                    Contact sales
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
