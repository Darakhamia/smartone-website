import Image from "next/image";
import Link from "next/link";

/* Hero photo: a merchant taking a card payment on a SmartOne terminal.
   public/hero.jpg is currently a stock stand-in – drop in the branded
   render with the same filename to swap it. On desktop the photo bleeds
   past the grid to the right edge of the viewport. */
function DeviceVisual() {
  return (
    <div className="anim-fade-up anim-d-2 relative lg:mr-[calc((1104px-100vw)/2)]">
      <div className="pointer-events-none absolute -inset-8 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
      <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)] lg:aspect-[16/10.5] lg:rounded-r-none">
        <Image
          src="/hero.jpg"
          alt="Merchant taking a contactless card payment on a SmartOne terminal"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
        {/* soft vignette so the chips stay readable on any photo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/15 via-transparent to-transparent" />
      </div>
      {/* floating fact chips */}
      <div className="absolute top-7 -left-3 -rotate-3 sm:-left-5">
        <div className="chip-float rounded-full border border-line bg-white px-4 py-2 text-[12.5px] font-medium text-ink-2 shadow-lg shadow-black/10">
          Fiscal receipt · <span className="font-semibold text-ink">built in</span>
        </div>
      </div>
      <div className="absolute right-5 bottom-24 rotate-2 lg:right-8">
        <div className="chip-float-slow rounded-full border border-line bg-white px-4 py-2 text-[12.5px] font-medium text-ink-2 shadow-lg shadow-black/10">
          Fee €0.24 · <span className="font-semibold text-brand">in plain euros</span>
        </div>
      </div>
      <div className="absolute -bottom-4 left-8 rotate-1">
        <div className="chip-float rounded-full border border-line bg-white px-4 py-2 text-[12.5px] font-medium text-ink-2 shadow-lg shadow-black/10" style={{ animationDelay: "2s" }}>
          T+1 · <span className="font-semibold text-ink">to your own bank</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-x-clip pt-16 pb-18 lg:pt-24">
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-150 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.09),transparent_65%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h1 className="anim-fade-up h-display text-[clamp(40px,5.6vw,72px)] leading-[1.03]">
            One device to <span className="text-brand">run your business.</span>
          </h1>
          <p className="anim-fade-up anim-d-1 mt-6 mb-9 max-w-130 text-[clamp(17px,1.4vw,20px)] leading-relaxed text-ink-2">
            Card terminal, fiscal register and receipt printer in one
            certified box – and every fee in plain euros.
          </p>
          <div className="anim-fade-up anim-d-2 flex flex-wrap items-center gap-3.5">
            <Link href="/contact" className="btn-primary">
              Get a terminal →
            </Link>
            <Link href="/pricing" className="btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
        <DeviceVisual />
      </div>
    </section>
  );
}
