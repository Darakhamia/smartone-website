"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

/* "Cookie settings" – reopens the settings panel in CookieNotice from
   anywhere, so a choice can be changed or withdrawn as easily as it was given.
   A button rather than a link: it opens a panel, it does not navigate.
   Pressed inside a modal <dialog> (the call-back forms), it closes that first:
   a modal sits above everything else on the page, the panel included. */
export function CookieSettingsLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.currentTarget.closest("dialog")?.close();
        window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
      }}
      className={className}
    >
      {children}
    </button>
  );
}
