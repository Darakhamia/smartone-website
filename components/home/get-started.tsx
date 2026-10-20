"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Building2, UserRound } from "lucide-react";
import { CallbackForm } from "@/components/lead/callback-form";
import { Modal } from "@/components/modal";
import { PortalLink } from "@/components/portal-link";

/* "Get started" on the Malta homepage (homepage task, §1, 13.10.2026).
   Companies can't sign themselves up in the portal yet – underwriting sets
   them up – so the button first asks who is starting:
   - self-employed → the Maltese portal's registration page, with the
     visitor's campaign tags on the link (PortalLink);
   - Ltd → a call-back form in this same window (Name, Phone, Company name),
     sent to the site's inbox with the source ltd_callback.

   Malta-only, so English-only: Malta has no Spanish. The data-track
   attributes are the ones the task fixes for GTM – keep their values. */

const choiceCls =
  "group flex w-full items-start gap-4 rounded-2xl border border-line-2 p-5 text-left transition-colors hover:border-brand hover:bg-brand-tint/50";
const iconCls =
  "grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white";

export function GetStarted({ location, className }: { location: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<"choice" | "ltd">("choice");
  const titleId = `get-started-${location}`;

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        data-track="cta-get-started"
        data-location={location}
        className={className}
      >
        Get started →
      </button>

      {/* back to the question whenever the window closes, however it closes */}
      <Modal ref={dialog} titleId={titleId} onClose={() => setView("choice")}>
        {view === "choice" ? (
          <>
            <h2 id={titleId} className="h-display pr-10 text-[26px] leading-tight sm:text-[28px]">
              How do you run your business?
            </h2>

            <div className="mt-6 grid gap-3">
              <PortalLink
                path="/auth/registration"
                onClick={() => dialog.current?.close()}
                data-track="choice-self-employed"
                className={choiceCls}
              >
                <span className={iconCls}>
                  <UserRound className="size-5.5" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-semibold tracking-tight">In my own name (self-employed)</span>
                  <span className="mt-1 block text-[14px] leading-snug text-ink-2">Create your account and get started online.</span>
                </span>
                {/* the portal opens in a new tab – say so */}
                <ArrowUpRight className="mt-1 size-4.5 shrink-0 text-ink-3 group-hover:text-brand" strokeWidth={2} aria-hidden />
              </PortalLink>

              <button type="button" onClick={() => setView("ltd")} data-track="choice-ltd" className={choiceCls}>
                <span className={iconCls}>
                  <Building2 className="size-5.5" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-semibold tracking-tight">Through a limited company (Ltd)</span>
                  <span className="mt-1 block text-[14px] leading-snug text-ink-2">
                    We set up company accounts together with you. Leave your number and we&apos;ll call you within one working day.
                  </span>
                </span>
                <span className="mt-0.5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden>
                  →
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setView("choice")}
              className="-ml-1 inline-flex items-center gap-1.5 rounded-full px-1 py-1 text-[14px] font-medium text-ink-3 transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
              Back
            </button>
            <h2 id={titleId} className="h-display mt-3 pr-10 text-[26px] leading-tight sm:text-[28px]">
              Through a limited company (Ltd)
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
              We set up company accounts together with you. Leave your number and we&apos;ll call you within one working day.
            </p>
            <CallbackForm source="ltd_callback" />
          </>
        )}
      </Modal>
    </>
  );
}
