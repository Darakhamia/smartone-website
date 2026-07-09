/* Stylised SmartOne terminals in the brand design language – same family
   as the homepage visuals. Swap for official renders when provided. */

export function Terminal({ compact = false }: { compact?: boolean }) {
  const screenH = compact ? 96 : 128;
  const bodyH = compact ? 232 : 268;
  return (
    <svg viewBox="0 0 220 300" className="mx-auto h-full w-auto" aria-hidden>
      <rect x="40" y={300 - bodyH - 8} width="140" height={bodyH} rx="24" fill="#1d1d1f" />
      <rect x="40" y={300 - bodyH - 8} width="140" height={bodyH} rx="24" fill="url(#tsheen)" />
      {/* printer slot */}
      <rect x="58" y={300 - bodyH + 4} width="104" height="6" rx="3" fill="#0e0e10" />
      {/* screen */}
      <rect x="56" y={300 - bodyH + 20} width="108" height={screenH} rx="12" fill="#0e0e10" />
      <text
        x="110"
        y={300 - bodyH + 20 + screenH / 2 - 2}
        fontSize="22"
        fontWeight="700"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="IBM Plex Mono, monospace"
      >
        €24.60
      </text>
      <text
        x="110"
        y={300 - bodyH + 20 + screenH / 2 + 22}
        fontSize="10"
        textAnchor="middle"
        fill="#a578e8"
        fontFamily="IBM Plex Mono, monospace"
      >
        Approved ✓
      </text>
      {/* contactless waves */}
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d={`M98 ${300 - bodyH + 38} a12 12 0 0 1 24 0`} />
        <path d={`M103 ${300 - bodyH + 38} a7 7 0 0 1 14 0`} />
      </g>
      {/* keypad */}
      <g fill="rgba(255,255,255,0.14)">
        {[0, 1, 2].map((c) =>
          [0, 1, 2].map((r) => (
            <circle
              key={`${c}-${r}`}
              cx={78 + c * 32}
              cy={300 - bodyH + 40 + screenH + r * 24}
              r="7"
            />
          ))
        )}
      </g>
      <defs>
        <linearGradient id="tsheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
