import Image from "next/image";
import { AppStoreButton } from "@/components/app-store-button";

export function AppCta({ heading = "Log every set. Watch the numbers climb." }: { heading?: string }) {
  return (
    <aside
      aria-label="Get GymLedger"
      className="not-prose relative my-14 rounded-[6px] border-[3px] border-ink/85 bg-board px-6 py-8 sm:px-9"
    >
      <span aria-hidden className="magnet" style={{ top: -14, right: 28 }} />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image src="/images/app-icon-128.webp" alt="" width={64} height={64} className="size-16 shrink-0 rounded-[16px] shadow-[0_6px_14px_-6px_rgb(40_46_56/0.45)]" />
        <div className="flex-1">
          <p className="marker text-[1.875rem] leading-tight text-ink">{heading}</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
            GymLedger is a workout tracker for iPhone: custom splits, a rest timer on your Lock Screen, a recovery body map and protein tracking in plain words.
          </p>
        </div>
      </div>
      <AppStoreButton className="mt-6" />
    </aside>
  );
}
