import Image from "next/image";

/* A real product screenshot in a light browser frame – used for both the
   Merchant Portal and the Click back office and POS.

   width/height are the screenshot's own pixel dimensions. They are only a
   ratio hint for next/image, but they have to match the file or the browser
   reserves the wrong space and the page jumps as the image loads. The two
   apps ship shots at different ratios, hence the props. */
export function AppShot({
  src,
  alt,
  width = 1920,
  height = 1200,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_80px_-40px_rgba(29,29,31,0.4)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-bg-2/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
        <span className="size-2.5 rounded-full bg-line-2" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="h-auto w-full"
      />
    </div>
  );
}
