import { APP_STORE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The Apple logo, solid, as Apple draws it (Simple Icons path, CC0). */
export function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

/**
 * "Download on the App Store", built the way Apple's badge is: black, the
 * solid Apple logo, a small line over a large one, in the system face.
 * `size="sm"` is the one-line version for the header.
 */
export function AppStoreButton({
  size = "lg",
  className,
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  if (size === "sm") {
    return (
      <a
        href={APP_STORE_URL}
        className={cn(
          "press inline-flex h-10 items-center gap-2 rounded-[10px] bg-ink pl-3.5 pr-4 font-apple text-[0.9375rem] font-semibold text-paper",
          "shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_6px_14px_-8px_rgb(23_24_27/0.6)] hover:bg-ink/90",
          className
        )}
      >
        <AppleLogo className="-mt-0.5 size-[17px]" />
        Download
      </a>
    );
  }
  return (
    <a
      href={APP_STORE_URL}
      aria-label="Download GymLedger on the App Store"
      className={cn(
        "press inline-flex h-14 items-center gap-3 rounded-[13px] bg-ink pl-4 pr-6 font-apple text-paper",
        "shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_10px_22px_-12px_rgb(23_24_27/0.7)] hover:bg-ink/90",
        className
      )}
    >
      <AppleLogo className="-mt-1 size-[30px]" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[0.6875rem] font-medium tracking-[0.01em]">Download on the</span>
        <span className="mt-[3px] text-[1.5rem] font-semibold tracking-[-0.02em]">App Store</span>
      </span>
    </a>
  );
}
