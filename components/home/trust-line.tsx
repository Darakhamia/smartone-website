/* Thin trust line. TODO before launch: substantiate the Trustpilot rating
   and device count with real figures. */
export function TrustLine() {
  return (
    <section className="border-y border-line bg-card/60 py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-2">
          <span>Trusted across Europe</span>
          <span className="hidden size-1 rounded-full bg-line-2 sm:block" />
          <span>
            <b className="font-display font-semibold text-ink">4.x</b>{" "}
            <span className="tracking-widest text-green">★★★★</span>
            <span className="tracking-widest text-line-2">★</span> on
            Trustpilot*
          </span>
          <span className="hidden size-1 rounded-full bg-line-2 sm:block" />
          <span>
            <b className="font-display font-semibold text-ink">200,000+</b>{" "}
            devices worldwide*
          </span>
        </div>
      </div>
    </section>
  );
}
