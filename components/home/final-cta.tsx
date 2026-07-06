import Link from "next/link";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-night py-24 text-center text-paper">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,138,95,0.4),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="h-display mx-auto max-w-175 text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold">
          Know what you sold. Know what you&apos;ll receive.
        </h2>
        <p className="mx-auto mt-4 mb-8 max-w-130 text-lg leading-relaxed text-white/70">
          Ready to start? Order your terminal today. Still have questions? Our
          team will walk you through it.
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
    </section>
  );
}
