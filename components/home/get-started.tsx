"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Building2, UserRound, X } from "lucide-react";
import { PortalLink } from "@/components/portal-link";

/* "Get started" on the Malta homepage (homepage task, §1, 13.10.2026).
   Companies can't sign themselves up in the portal yet – underwriting sets
   them up – so the button first asks who is starting:
   - self-employed → the Maltese portal's registration page, with the
     visitor's campaign tags on the link (PortalLink);
   - Ltd → the /contact form, for now.

   TODO(crm): the task wants the Ltd answer to open a call-back form in this
   same window (Name, Phone, Company name; source "ltd_callback"), and "Talk
   to us" its own two-field form (source "talk_to_us"), both sending the
   campaign tags as hidden fields. They wait for the CRM those enquiries will
   go to – until it is chosen both lead to /contact, which works today.

   Malta-only, so English-only: Malta has no Spanish. The data-track
   attributes are the ones the task fixes for GTM – keep their values. */
export function GetStarted({ location, className }: { location: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

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

      {/* A native <dialog>: showModal() traps focus, Escape closes it, and
          clicking the dimmed backdrop lands on the dialog itself. */}
      <dialog
        ref={dialog}
        aria-labelledby={`get-started-${location}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[min(560px,calc(100vw-32px))] rounded-3xl bg-white p-0 text-ink shadow-[0_40px_80px_-30px_rgba(18,7,34,0.5)] backdrop:bg-night/55 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-ink-3 transition-colors hover:bg-bg-2 hover:text-ink"
          >
            <X className="size-5" strokeWidth={2} aria-hidden />
          </button>
          <h2 id={`get-started-${location}`} className="h-display pr-10 text-[26px] leading-tight sm:text-[28px]">
            How do you run your business?
          </h2>

          <div className="mt-6 grid gap-3">
            <PortalLink
              path="/auth/registration"
              onClick={close}
              data-track="choice-self-employed"
              className="group flex items-start gap-4 rounded-2xl border border-line-2 p-5 transition-colors hover:border-brand hover:bg-brand-tint/50"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <UserRound className="size-5.5" strokeWidth={1.7} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-semibold tracking-tight">In my own name (self-employed)</span>
                <span className="mt-1 block text-[14px] leading-snug text-ink-2">Create your account and get started online.</span>
              </span>
              {/* the portal opens in a new tab – say so */}
              <ArrowUpRight className="mt-1 size-4.5 shrink-0 text-ink-3 group-hover:text-brand" strokeWidth={2} aria-hidden />
            </PortalLink>

            <Link
              href="/contact"
              onClick={close}
              data-track="choice-ltd"
              className="group flex items-start gap-4 rounded-2xl border border-line-2 p-5 transition-colors hover:border-brand hover:bg-brand-tint/50"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
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
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
