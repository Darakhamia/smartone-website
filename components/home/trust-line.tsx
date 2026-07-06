import { TrustpilotBadge } from "@/components/trustpilot";

export function TrustLine() {
  return (
    <section className="border-y border-line bg-bg-2/60 py-5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm text-ink-2">
          <span>Trusted by merchants across Europe</span>
          <span className="hidden size-1 rounded-full bg-line-2 sm:block" />
          <TrustpilotBadge />
        </div>
      </div>
    </section>
  );
}
