import Link from "next/link";

const jobs = [
  {
    href: "/product",
    title: "Take payments",
    text: "Card, contactless and cash on one certified device.",
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
    text: "Fiscal register, receipts and Z-reports — built in.",
    icon: (
      <path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3Zm3 5h4m-4 4h4" />
    ),
  },
  {
    href: "/product",
    title: "Sell & manage",
    text: "Products, prices and categories once — ring up on the register, or take orders via Click.",
    icon: (
      <path d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />
    ),
  },
  {
    href: "/product",
    title: "Know your money",
    text: "Every fee in plain euros — what you sold, and what you'll receive.",
    icon: (
      <path d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
    ),
  },
];

const replaces = ["POS register", "card terminal", "accountant tool", "spreadsheet"];

export function Breadth() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow">One device, as much as you need</span>
          <h2 className="h-display mt-5 text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold">
            Everything your business needs — one device instead of a stack.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Take payments, stay compliant, sell, and know your money — without
            a four-vendor stack.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <Link
              key={job.title}
              href={job.href}
              className="group relative overflow-hidden rounded-2xl bg-night p-6 pb-7 text-paper transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.35),transparent_70%)]" />
              <svg
                viewBox="0 0 24 24"
                className="size-9 stroke-green-l"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {job.icon}
              </svg>
              <h3 className="mt-14 flex items-center justify-between font-display text-[21px] font-semibold tracking-tight">
                {job.title}
                <span className="text-green-l transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">
                {job.text}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-ink-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-ink-2 uppercase">
            Replaces
          </span>
          {replaces.map((item) => (
            <span key={item} className="line-through decoration-line-2 decoration-2">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 max-w-150 text-[14.5px] leading-relaxed text-ink-2">
          Use the full stack — or just the terminal, or just the register. Each
          works on its own, and grows with you when you&apos;re ready.
        </p>
      </div>
    </section>
  );
}
