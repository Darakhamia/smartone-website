import { TrustpilotBadge } from "@/components/trustpilot";

const facts = [
  {
    label: "Certified across Europe",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />,
  },
  {
    label: "Money to your own bank, T+1",
    icon: <path d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />,
  },
  {
    label: "Live in ≤4 working days",
    icon: <path d="M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  },
];

export function TrustLine() {
  return (
    <section className="border-y border-line bg-bg-2/60 py-5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-sm text-ink-2">
          {facts.map((f) => (
            <span key={f.label} className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="size-4.5 stroke-brand"
                fill="none"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {f.icon}
              </svg>
              {f.label}
            </span>
          ))}
          <TrustpilotBadge />
        </div>
      </div>
    </section>
  );
}
