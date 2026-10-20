"use client";

import { useRef } from "react";
import { CallbackForm } from "@/components/lead/callback-form";
import { Modal } from "@/components/modal";

/* "Talk to us" on the Malta homepage (task §1): opens a two-field call-back
   form – Name and Phone – that goes to the team's Telegram group with the
   source talk_to_us. `children` replaces the button text (the "Prefer to talk?"
   line under the final CTA opens the same form). */
export function TalkToUs({
  location,
  className,
  children = "Talk to us",
}: {
  location: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = `talk-to-us-${location}`;
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        data-track="cta-talk-to-us"
        data-location={location}
        className={className}
      >
        {children}
      </button>
      <Modal ref={dialog} titleId={titleId}>
        <h2 id={titleId} className="h-display pr-10 text-[26px] leading-tight sm:text-[28px]">
          Talk to us
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">Leave your name and number and we&apos;ll call you.</p>
        <CallbackForm source="talk_to_us" />
      </Modal>
    </>
  );
}
