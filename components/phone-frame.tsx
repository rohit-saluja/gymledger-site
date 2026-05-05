import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function PhoneFrame({ src, alt, priority = false, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1206/2622] w-full max-w-[280px] overflow-hidden rounded-[2.4rem] border border-border-strong bg-bg-subtle p-1 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)]",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-bg/90 ring-1 ring-border-subtle"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[2.05rem] bg-bg">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 70vw, 280px"
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
