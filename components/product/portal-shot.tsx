import Image from "next/image";

/* A real Merchant Portal screenshot in a light browser frame. The shots are
   wide (1920px), so they get a generous stage and soft elevation rather than
   redrawn UI. */
export function PortalShot({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
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
        width={1920}
        height={1200}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="h-auto w-full"
      />
    </div>
  );
}
