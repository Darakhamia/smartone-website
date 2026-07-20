/* Simple prose layout for legal pages (Privacy, Cookies). */
export function LegalLayout({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="h-display text-[clamp(30px,4vw,44px)] leading-tight">{title}</h1>
        <p className="mt-3 text-[13px] text-ink-3">{updated}</p>
        {intro && <p className="mt-6 text-[15.5px] leading-relaxed text-ink-2">{intro}</p>}
        <div className="mt-10 space-y-9">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-[19px] font-semibold tracking-tight text-ink">{s.h}</h2>
              <div className="mt-2.5 space-y-2.5 text-[15px] leading-relaxed text-ink-2">
                {s.p.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
