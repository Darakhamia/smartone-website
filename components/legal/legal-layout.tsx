/* Simple prose layout for legal pages (Imprint, Privacy, Cookies).
   A section renders paragraphs, a key/value list, or both – the Legal Notice
   is mostly labelled details, the policies are mostly prose. */
export type LegalSection = {
  h: string;
  p?: string[];
  rows?: { k: string; v: string }[];
};

export function LegalLayout({
  title,
  updated,
  intro,
  sections,
  footnote,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
  footnote?: string;
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
              {s.rows && (
                <dl className="mt-3.5 divide-y divide-line rounded-2xl border border-line">
                  {s.rows.map((row) => (
                    <div
                      key={row.k}
                      className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-4 sm:px-5"
                    >
                      <dt className="text-[13.5px] font-medium text-ink-3">{row.k}</dt>
                      <dd className="text-[15px] leading-relaxed break-words text-ink">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {s.p && (
                <div className="mt-2.5 space-y-2.5 text-[15px] leading-relaxed text-ink-2">
                  {s.p.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {footnote && (
          <p className="mt-10 border-t border-line pt-5 text-[13px] leading-relaxed text-ink-3">{footnote}</p>
        )}
      </div>
    </section>
  );
}
