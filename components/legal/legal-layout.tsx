/* Simple prose layout for legal pages (Imprint, Privacy, Cookies).
   A section renders a key/value list, then its blocks in order – the Legal
   Notice is mostly labelled details, the policies are mostly prose with the
   odd table (cookies, providers), sub-heading or list. A plain string is a
   paragraph. */
export type LegalTable = { head: string[]; rows: string[][] };
export type LegalBlock = string | { sub: string } | { table: LegalTable } | { list: string[] };

export type LegalSection = {
  h: string;
  p?: LegalBlock[];
  rows?: { k: string; v: string }[];
};

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  if ("sub" in block)
    return <h3 className="pt-3 font-display text-[16px] font-semibold tracking-tight text-ink">{block.sub}</h3>;
  if ("list" in block)
    return (
      <ul className="list-disc space-y-1.5 pl-5 marker:text-ink-3">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  /* A real table from sm up; on a phone each row stacks into a card, with the
     column name carried by data-label – four columns do not fit 375px. */
  const { head, rows } = block.table;
  return (
    <table className="w-full border-separate border-spacing-0 text-left text-[14px] max-sm:block">
      <thead className="max-sm:sr-only">
        <tr>
          {head.map((h) => (
            <th key={h} scope="col" className="border-b border-line px-3 py-2 text-[12.5px] font-semibold text-ink-3 first:pl-0">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-sm:block max-sm:space-y-3">
        {rows.map((row) => (
          <tr key={row[0]} className="align-top max-sm:block max-sm:rounded-2xl max-sm:border max-sm:border-line max-sm:px-4 max-sm:py-3">
            {row.map((cell, i) => (
              <td
                key={i}
                data-label={head[i]}
                className={`border-b border-line px-3 py-3 leading-relaxed first:pl-0 max-sm:block max-sm:border-0 max-sm:px-0 max-sm:py-1 ${
                  i === 0
                    ? "font-medium break-words text-ink"
                    : "max-sm:before:block max-sm:before:text-[12px] max-sm:before:font-semibold max-sm:before:text-ink-3 max-sm:before:content-[attr(data-label)]"
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

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
                  {s.p.map((block, i) => (
                    <Block key={i} block={block} />
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
