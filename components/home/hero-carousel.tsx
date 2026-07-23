"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* The hero image cross-fades through a few real merchant photos. It pauses for
   visitors who prefer reduced motion (they just see the first frame). */
export function HeroCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduced.current || images.length < 2) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % images.length), 5000);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </>
  );
}
