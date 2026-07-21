"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* A multi-angle device gallery: a big stage that cross-fades between the
   terminal's sides, with a thumbnail rail and arrows to spin around it.
   It idles through the angles on its own and stops the moment you take over
   (and never auto-rotates when the visitor prefers reduced motion). */

export type Shot = { src: string; alt: string; label: string };

export function TerminalGallery({ shots, className = "" }: { shots: Shot[]; className?: string }) {
  const [active, setActive] = useState(0);
  const [taken, setTaken] = useState(false); // visitor has driven it manually
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (taken || paused || reduced.current || shots.length < 2) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % shots.length), 4200);
    return () => window.clearInterval(id);
  }, [taken, paused, shots.length]);

  const go = (i: number) => {
    setTaken(true);
    setActive((i + shots.length) % shots.length);
  };

  return (
    <div className={className}>
      {/* stage */}
      <div
        className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-tint via-bg-2 to-bg-2 shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.14),transparent_62%)]" />

        {/* angle label */}
        <span className="absolute top-5 left-5 z-10 rounded-full border border-line bg-white/85 px-3.5 py-1.5 text-[12px] font-semibold tracking-tight text-ink-2 shadow-sm backdrop-blur-sm">
          {shots[active].label}
        </span>

        {/* cross-fading images */}
        <div className="relative aspect-square sm:aspect-[5/4]">
          {shots.map((s, i) => (
            <div
              key={s.src}
              className={`absolute inset-0 grid place-items-center p-6 transition-all duration-500 ease-out sm:p-10 ${
                i === active ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`}
              aria-hidden={i === active ? undefined : true}
            >
              <div className="chip-float relative h-full w-full">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, 520px"
                  className="object-contain drop-shadow-[0_30px_45px_rgba(29,29,31,0.22)]"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* arrows */}
        {shots.length > 1 && (
          <>
            <GalleryArrow dir="prev" onClick={() => go(active - 1)} />
            <GalleryArrow dir="next" onClick={() => go(active + 1)} />
          </>
        )}
      </div>

      {/* thumbnail rail */}
      {shots.length > 1 && (
        <div className="mt-4 flex justify-center gap-2.5">
          {shots.map((s, i) => (
            <button
              key={s.src}
              onClick={() => go(i)}
              aria-label={s.label}
              aria-current={i === active}
              className={`relative size-16 overflow-hidden rounded-2xl border transition-all duration-200 sm:size-18 ${
                i === active ? "border-brand ring-2 ring-brand/25" : "border-line hover:border-line-2"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-brand-tint/60 to-bg-2" />
              <Image src={s.src} alt="" fill sizes="72px" className="relative object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const prev = dir === "prev";
  return (
    <button
      onClick={onClick}
      aria-label={prev ? "Previous angle" : "Next angle"}
      className={`absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/85 text-ink-2 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 hover:text-brand focus-visible:opacity-100 group-hover:opacity-100 ${
        prev ? "left-4" : "right-4"
      }`}
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={prev ? "m10 3-5 5 5 5" : "m6 3 5 5-5 5"} />
      </svg>
    </button>
  );
}
