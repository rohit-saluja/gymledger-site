import Image from "next/image";
import { Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_STORE_URL } from "@/lib/site";

export function AppCta({ heading = "Log every set. Watch the numbers climb." }: { heading?: string }) {
  return (
    <aside
      aria-label="Get GymLedger"
      className="not-prose my-12 flex flex-col items-center gap-5 rounded-3xl border border-border bg-bg-subtle/70 p-6 text-center sm:flex-row sm:p-8 sm:text-left"
    >
      <Image
        src="/images/app-icon-128.webp"
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 shrink-0 rounded-2xl ring-1 ring-border"
      />
      <div className="flex-1">
        <p className="text-lg font-bold tracking-tight text-foreground">{heading}</p>
        <p className="mt-1 text-sm text-fg-secondary">
          GymLedger is a fast, private workout tracker for iPhone: custom splits, a Lock Screen rest timer, and progress charts for every lift.
        </p>
      </div>
      <Button asChild size="md" variant="primary" className="shrink-0">
        <a href={APP_STORE_URL}>
          <Apple className="size-4" />
          Get the app
        </a>
      </Button>
    </aside>
  );
}
