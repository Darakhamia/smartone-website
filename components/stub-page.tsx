import Link from "next/link";

export function StubPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h-display mt-6 text-[clamp(34px,5vw,56px)] leading-[1.05]">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-130 text-lg leading-relaxed text-ink-2">
          {description}
        </p>
        {children}
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Link href="/" className="btn-primary">
            ← Back to home
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
