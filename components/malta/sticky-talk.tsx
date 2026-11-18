"use client";

import { useEffect, useState } from "react";
import { TalkToUs } from "@/components/lead/talk-to-us";

/* The phone-only "Talk to us" bar of a Malta landing page. It appears once
   the hero's button has scrolled away and steps aside while the final call to
   action is on screen, so there is never a second button next to that one.
   `after` and `until` are element ids. */
export function StickyTalk({ after, until, page }: { after: string; until: string; page: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const start = document.getElementById(after);
    const end = document.getElementById(until);
    if (!start || !end || !("IntersectionObserver" in window)) return;
    let past = false;
    let atEnd = false;
    const update = () => setShow(past && !atEnd);
    const a = new IntersectionObserver(([e]) => {
      // gone off the top, not merely not reached yet
      past = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    const b = new IntersectionObserver(([e]) => {
      atEnd = e.isIntersecting;
      update();
    });
    a.observe(start);
    b.observe(end);
    return () => {
      a.disconnect();
      b.disconnect();
    };
  }, [after, until]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_-12px_rgba(40,20,80,0.25)] transition-transform duration-200 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <TalkToUs location="sticky" page={page} className="btn-primary w-full">
        Talk to us →
      </TalkToUs>
    </div>
  );
}
