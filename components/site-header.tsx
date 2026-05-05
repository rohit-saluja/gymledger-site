import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="GymLedger home">
          <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-surface ring-1 ring-border">
            <Image
              src="/images/app-icon.png"
              alt=""
              width={32}
              height={32}
              priority
              className="h-7 w-7 object-cover"
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            GymLedger
          </span>
        </Link>

        <div className="flex items-center gap-1.5 md:gap-4">
          <nav aria-label="Primary" className="hidden items-center gap-5 text-sm md:flex">
            <Link href="/support" className="text-fg-secondary transition-colors hover:text-foreground">
              Support
            </Link>
            <Link href="/privacy" className="text-fg-secondary transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-fg-secondary transition-colors hover:text-foreground">
              Terms
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
