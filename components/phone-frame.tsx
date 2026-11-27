import { cn } from "@/lib/utils";

/** The six GymLedger 2.0 screenshots in public/app/ (captured 20 Nov 2026, 1206×2622). */
export type Screen = "home" | "session" | "recovery" | "diet" | "progress" | "edit-workout";

export function screenSrc(screen: Screen) {
  return {
    src: `/app/${screen}.webp`,
    srcSet: `/app/${screen}.webp 640w, /app/${screen}@1.5x.webp 960w`,
  };
}

interface PhoneFrameProps {
  screen?: Screen;
  alt?: string;
  priority?: boolean;
  className?: string;
  /** CSS `sizes` for the screenshot. */
  sizes?: string;
  /** Magnets holding the phone to the board. */
  magnets?: ("red" | "black" | "blue")[];
  children?: React.ReactNode;
}

/**
 * A black iPhone with a Dynamic Island. Corners and bezel are proportional,
 * so it stays true at any width. Pass `screen` for a screenshot or children
 * for a custom screen.
 */
export function PhoneFrame({ screen, alt = "", priority = false, className, sizes = "(max-width: 768px) 70vw, 320px", magnets, children }: PhoneFrameProps) {
  return (
    <div className={cn("relative mx-auto w-full", className)}>
      {magnets?.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className={cn("magnet", m === "black" && "magnet--black", m === "blue" && "magnet--blue")}
          style={{ top: "-2.2%", [i === 0 ? "left" : "right"]: "8%" }}
        />
      ))}
      <div
        className="relative aspect-[1206/2622] w-full rounded-[15%/6.9%] bg-[#1c1d20] p-[3.4%] shadow-[0_1px_0_rgb(255_255_255/0.14)_inset,0_0_0_1.5px_#3a3c41_inset,0_2px_4px_rgb(40_46_56/0.18),0_28px_56px_-18px_rgb(40_46_56/0.55)]"
      >
        {/* Side buttons */}
        <span aria-hidden className="absolute -left-[1.2%] top-[17%] h-[5%] w-[1.2%] rounded-l-sm bg-[#2b2d31]" />
        <span aria-hidden className="absolute -left-[1.2%] top-[25%] h-[8%] w-[1.2%] rounded-l-sm bg-[#2b2d31]" />
        <span aria-hidden className="absolute -right-[1.2%] top-[22%] h-[11%] w-[1.2%] rounded-r-sm bg-[#2b2d31]" />
        <div className="relative h-full w-full overflow-hidden rounded-[11.8%/5.4%] bg-black">
          {screen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...screenSrc(screen)}
              sizes={sizes}
              alt={alt}
              width={640}
              height={1391}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            children
          )}
          {/* Dynamic Island */}
          <span aria-hidden className="absolute left-1/2 top-[1.55%] h-[4.1%] w-[29%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
