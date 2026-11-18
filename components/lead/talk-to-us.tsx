"use client";

import { useId, useRef } from "react";
import { CallbackForm } from "@/components/lead/callback-form";
import { Modal } from "@/components/modal";

/* A button that opens the call-back form (CallbackForm) in a window. Both
   GetStarted (components/home/get-started.tsx) and TalkToUs below are this:
   both read "Talk to us" now (Alex's correction, 15.10.2026) but keep their
   own source and GTM attributes – data-track and data-location as the
   homepage task fixes them, so keep their values. */
export function LeadButton({
  source,
  track,
  location,
  page,
  title,
  intro,
  className,
  children,
}: {
  source: "get_started" | "talk_to_us";
  track: string;
  location: string;
  /** Names the landing page for GTM (data-page), where a campaign needs it. */
  page?: string;
  title: string;
  intro: string;
  className?: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  // unique per button: one location can appear twice (the header's desktop and mobile buttons)
  const titleId = useId();
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        data-track={track}
        data-location={location}
        data-page={page}
        className={className}
      >
        {children}
      </button>
      <Modal ref={dialog} titleId={titleId}>
        <h2 id={titleId} className="h-display pr-10 text-[26px] leading-tight sm:text-[28px]">
          {title}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{intro}</p>
        <CallbackForm source={source} />
      </Modal>
    </>
  );
}

/* "Talk to us" with the source talk_to_us and data-track cta-talk-to-us.
   The Malta homepage no longer uses it – its one button is GetStarted, which
   keeps the old get_started identifiers for GTM. `children` replaces the
   button text. */
export function TalkToUs({
  location,
  page,
  className,
  children = "Talk to us",
}: {
  location: string;
  page?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <LeadButton
      source="talk_to_us"
      track="cta-talk-to-us"
      location={location}
      page={page}
      title="Talk to us"
      intro="Leave your name and number and we'll call you."
      className={className}
    >
      {children}
    </LeadButton>
  );
}
