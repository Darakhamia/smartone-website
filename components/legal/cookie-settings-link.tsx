"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

/* "Cookie settings" – reopens the settings panel in CookieNotice from
   anywhere, so a choice can be changed or withdrawn as easily as it was given.
   A button rather than a link: it opens a panel, it does not navigate. */
export function CookieSettingsLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      {children}
    </button>
  );
}
