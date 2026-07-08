import Image from "next/image";
import Link from "next/link";

/* Hero photo: a merchant taking a card payment on a SmartOne terminal.
   public/hero.jpg is currently a stock stand-in – drop in the branded
   render with the same filename to swap it. */
function DeviceVisual() {
  return (
    <div className="anim-fade-up anim-d-2 relative mx-auto w-full max-w-130">
      <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
      <div className="relative aspect-[10/9] overflow-hidden rounded-[32px] shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)]">
        <Image
          src="/hero.jpg"
          alt="Merchant taking a contactless card payment on a SmartOne terminal"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        {/* soft vignette so the chips stay readable on any photo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/15 via-transparent to-transparent" />
      </div>
      {/* floating fact chips */}
      <div className="absolute top-7 -left-3 -rotate-3 sm:-left-6">
        <div className="chip-float rounded-full border border-line bg-white px-4 py-2 text-[12px] font-medium text-ink-2 shadow-lg shadow-black/10">
          Fiscal receipt · <span className="font-semibold text-ink">built in</span>
        </div>
      </div>
      <div className="absolute top-1/2 -right-2 rotate-2 sm:-right-5">
        <div className="chip-float-slow rounded-full border border-line bg-white px-4 py-2 text-[12px] font-medium text-ink-2 shadow-lg shadow-black/10">
          Fee €0.24 · <span className="font-semibold text-brand">in plain euros</span>
        </div>
      </div>
      <div className="absolute -bottom-4 left-8 rotate-1">
        <div className="chip-float rounded-full border border-line bg-white px-4 py-2 text-[12px] font-medium text-ink-2 shadow-lg shadow-black/10" style={{ animationDelay: "2s" }}>
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
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
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
