import Link from "next/link";
import { Reveal } from "@/components/reveal";

const jobs = [
  {
    href: "/product",
    title: "Take payments",
    text: "Card, contactless and cash.",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
        <path d="M2.5 10h19M6 15h4" />
      </>
    ),
  },
  {
    href: "/product",
    title: "Stay compliant",
    text: "Fiscal receipts and reports.",
    icon: (
      <path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3Zm3 5h4m-4 4h4" />
    ),
  },
  {
    href: "/product",
    title: "Sell & manage",
    text: "Products, prices and orders.",
    icon: (
      <path d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />
    ),
  },
  {
    href: "/product",
    title: "Know your money",
    text: "Fees and payouts, clearly shown.",
    icon: (
      <path d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
    ),
  },
];

const replaces = [
  {
    label: "POS register",
    icon: <path d="M5 10h14l1 8H4l1-8Zm2 0V6h8l1 4M8.5 14h3" />,
  },
  {
    label: "Card terminal",
    icon: (
      <>
        <rect x="8" y="3" width="8" height="18" rx="2" />
        <path d="M10.5 6.5h3v3h-3zM10.5 14h.01M13.5 14h.01M10.5 17h.01M13.5 17h.01" />
      </>
    ),
  },
  {
    label: "Accountant tool",
    icon: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 15.5h.01M12 15.5h.01M15 15.5h.01" />
      </>
    ),
  },
  {
    label: "Spreadsheet",
    icon: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M4 10h16M4 14.5h16M10.5 5v14" />
      </>
    ),
  },
];

export function Breadth() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">All-in-one device</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Everything your business needs –{" "}
              <span className="text-brand">one device.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              Take payments, stay compliant, sell, and know your money –
              without a four-vendor stack.
            </p>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job, i) => (
            <Reveal key={job.title} delay={i * 90} className="h-full">
              <Link
                href={job.href}
                className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 pb-16 shadow-sm shadow-black/3 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_20px_40px_-28px_rgba(90,25,181,0.4)]"
              >
                <span className="grid size-13 place-items-center rounded-2xl bg-brand-tint transition-colors duration-300 group-hover:bg-brand/15">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6.5 stroke-brand"
                    fill="none"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {job.icon}
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-[20px] font-semibold tracking-tight">
                  {job.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">
                  {job.text}
                </p>
                <span className="absolute right-5 bottom-5 grid size-9 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-1">
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 4 4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-bg-2 px-7 py-5 sm:flex-row sm:items-center">
            <span className="text-[13px] font-semibold tracking-[0.08em] text-brand uppercase">
              Replaces:
            </span>
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-around">
              {replaces.map((r, i) => (
                <div key={r.label} className="flex items-center gap-4">
                  {i > 0 && <span className="hidden h-8 w-px bg-line-2 sm:block" />}
                  <span className="flex items-center gap-2.5 text-[14.5px] font-medium text-ink-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-6 stroke-ink"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {r.icon}
                    </svg>
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 max-w-150 text-[14.5px] leading-relaxed text-ink-2">
            Use the full stack – or just the terminal, or just the register.
            Each works on its own, and grows with you when you&apos;re ready.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
