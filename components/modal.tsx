"use client";

import { X } from "lucide-react";

/* A native <dialog>, opened with showModal() on its ref: that traps focus,
   Escape closes it, and a click on the dimmed backdrop lands on the dialog
   itself, which closes it too. It inherits text styles from wherever it sits
   in the page (a centred white section, say), so it sets its own. */
export function Modal({
  ref,
  titleId,
  onClose,
  children,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
  titleId: string;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto max-h-[calc(100dvh-32px)] w-[min(560px,calc(100vw-32px))] overflow-y-auto rounded-3xl bg-white p-0 text-left text-base font-normal text-ink shadow-[0_40px_80px_-30px_rgba(18,7,34,0.5)] backdrop:bg-night/55 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-ink-3 transition-colors hover:bg-bg-2 hover:text-ink"
        >
          <X className="size-5" strokeWidth={2} aria-hidden />
        </button>
        {children}
      </div>
    </dialog>
  );
}
