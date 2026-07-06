import Link from "next/link";

/* Placeholder visual until the real photo/video shoot: a stylised SmartOne
   terminal printing a fiscal receipt, with the two-number story floating
   around it. Swap for hero-loop.mp4 + real-person shot when available. */
function DeviceVisual() {
  return (
    <div className="relative mx-auto w-full max-w-115">
      <div className="rounded-3xl border border-line bg-gradient-to-br from-green-tint via-card to-paper-2 px-8 pt-10 pb-8 shadow-[0_40px_80px_-50px_rgba(10,107,74,0.5)]">
        <svg viewBox="0 0 300 400" className="mx-auto w-full max-w-65" aria-hidden>
          {/* receipt sliding out of the device */}
          <g fontFamily="IBM Plex Mono, monospace">
            <rect x="88" y="8" width="124" height="128" rx="4" fill="#fff" stroke="#e7e4d9" />
            <text x="100" y="32" fontSize="11" fontWeight="600" fill="#15211a">SmartOne</text>
            <text x="100" y="50" fontSize="9" fill="#8a948c">FISCAL RECEIPT #0421</text>
            <line x1="100" y1="62" x2="200" y2="62" stroke="#d5d1c2" strokeDasharray="3 3" />
            <text x="100" y="82" fontSize="10" fill="#4b5a51">Sale</text>
            <text x="200" y="82" fontSize="10" fill="#15211a" textAnchor="end">€24.60</text>
            <text x="100" y="100" fontSize="10" fill="#4b5a51">Fee</text>
            <text x="200" y="100" fontSize="10" fill="#0e8a5f" textAnchor="end">€0.24</text>
            <line x1="100" y1="112" x2="200" y2="112" stroke="#d5d1c2" strokeDasharray="3 3" />
            <text x="100" y="130" fontSize="9" fill="#8a948c">VAT · Z-REPORT · T+1</text>
          </g>
          {/* terminal body */}
          <rect x="66" y="136" width="168" height="256" rx="26" fill="#15211a" />
          <rect x="66" y="136" width="168" height="256" rx="26" fill="url(#sheen)" />
          {/* printer slot */}
          <rect x="86" y="148" width="128" height="6" rx="3" fill="#0e1a14" />
          {/* screen */}
          <rect x="86" y="168" width="128" height="112" rx="12" fill="#16261d" />
          <text x="150" y="216" fontSize="26" fontWeight="700" textAnchor="middle" fill="#3ecf8e" fontFamily="IBM Plex Mono, monospace">€24.60</text>
          <text x="150" y="242" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontFamily="IBM Plex Mono, monospace">Approved ✓</text>
          {/* contactless waves */}
          <g stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M136 190 a14 14 0 0 1 28 0" />
            <path d="M142 190 a8 8 0 0 1 16 0" />
          </g>
          {/* keypad */}
          <g fill="rgba(255,255,255,0.14)">
            {[0, 1, 2].map((c) =>
              [0, 1, 2, 3].map((r) => (
                <circle key={`${c}-${r}`} cx={110 + c * 40} cy={308 + r * 24} r="8" />
              ))
            )}
          </g>
          <defs>
            <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
              <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* floating fact chips */}
      <div className="absolute top-8 -left-3 -rotate-3 rounded-xl border border-line bg-card px-3.5 py-2 font-mono text-[11px] text-ink-2 shadow-lg sm:-left-6">
        Fiscal receipt · <span className="font-semibold text-ink">built in</span>
      </div>
      <div className="absolute top-1/2 -right-2 rotate-2 rounded-xl border border-line bg-card px-3.5 py-2 font-mono text-[11px] text-ink-2 shadow-lg sm:-right-5">
        Fee €0.24 · <span className="font-semibold text-green-d">in plain euros</span>
      </div>
      <div className="absolute -bottom-4 left-8 rotate-1 rounded-xl border border-line bg-card px-3.5 py-2 font-mono text-[11px] text-ink-2 shadow-lg">
        T+1 · <span className="font-semibold text-ink">to your own bank</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="overflow-x-clip pt-14 pb-16 lg:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-line bg-card py-1.5 pr-4 pl-2 font-mono text-xs text-ink-2 shadow-sm">
            <span className="rounded-full bg-green-tint px-2.5 py-0.5 text-[11px] font-semibold text-green-d">
              All-in-one
            </span>
            Terminal · fiscal register · receipt printer
          </div>
          <h1 className="h-display text-[clamp(38px,5.4vw,68px)] leading-[1.02]">
            One device to <span className="text-green">run your business.</span>
          </h1>
          <p className="mt-6 mb-8 max-w-135 text-[clamp(16.5px,1.4vw,19px)] leading-relaxed text-ink-2">
            Your card terminal, fiscal register, and receipt printer in one
            certified box — plus a portal that shows the money behind every
            sale, in plain euros. No hidden fees.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link href="/contact" className="btn-primary">
              Get a terminal →
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact sales
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12.5px] text-ink-3">
            <span>Certified across Europe</span>
            <span className="size-1 rounded-full bg-line-2" />
            <span>Every fee in plain euros</span>
            <span className="size-1 rounded-full bg-line-2" />
            <span>≤4 working days to go live</span>
          </div>
        </div>
        <DeviceVisual />
      </div>
    </section>
  );
}
