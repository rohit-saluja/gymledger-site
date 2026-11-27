import Link from "next/link";
import Image from "next/image";
import { AppStoreButton } from "@/components/app-store-button";

const NAV = [
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full rounded-t-[inherit] border-b border-rule/80 bg-board/95 supports-[backdrop-filter]:bg-board/85 supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="container flex h-[68px] items-center justify-between">
        <Link href="/" className="press flex items-center gap-2.5" aria-label="GymLedger home">
          {/* The app icon is held on the board by a small magnet */}
          <span className="relative block">
            <Image
              src="/images/app-icon-128.webp"
              alt=""
              width={34}
              height={34}
              priority
              className="size-[34px] -rotate-3 rounded-[9px] shadow-[0_2px_3px_rgb(40_46_56/0.25),0_6px_12px_-4px_rgb(40_46_56/0.3)]"
            />
            <span aria-hidden className="magnet magnet--black" style={{ ["--m" as string]: "13px", top: -5, left: "calc(50% - 6.5px)" }} />
          </span>
          <span className="text-[1.1875rem] font-extrabold tracking-tight text-ink">GymLedger</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <nav aria-label="Primary" className="flex items-center">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${i > 0 ? "hidden sm:inline-block" : ""} rounded-md px-2.5 py-2 text-[0.9375rem] font-semibold text-ink-2 transition-colors hover:text-ink sm:px-3`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <AppStoreButton size="sm" />
        </div>
      </div>
    </header>
  );
}
