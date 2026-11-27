import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-8">
      {/* The board's bottom ledge */}
      <div className="tray mx-2 md:mx-4" aria-hidden>
        <TrayMarker />
      </div>
      <div className="container flex flex-col items-center gap-5 py-9 text-sm text-ink-2 md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/images/app-icon-128.webp" alt="" width={26} height={26} className="size-[26px] rounded-[7px]" />
          <span className="font-bold text-ink">GymLedger</span>
          <span className="text-ink-3">Workout tracker for iPhone</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-semibold">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <a href="mailto:support@getgymledger.com" className="transition-colors hover:text-ink">
            Contact
          </a>
        </nav>

        <p className="text-xs text-ink-3">© 2026 Rohit Saluja, Jaipur, India</p>
      </div>
    </footer>
  );
}

/** A red dry-erase marker lying on the tray, its cap pulled off beside it. */
function TrayMarker() {
  return (
    <svg
      viewBox="0 0 200 34"
      className="absolute bottom-[calc(100%-7px)] right-[9%] w-[150px] drop-shadow-[0_4px_4px_rgb(40_46_56/0.35)] md:right-[14%] md:w-[190px]"
    >
      {/* barrel */}
      <rect x="2" y="9" width="112" height="22" rx="5" fill="#f4f4f2" />
      <rect x="2" y="9" width="112" height="6" rx="3" fill="#ffffff" opacity="0.8" />
      <rect x="2" y="25" width="112" height="6" rx="3" fill="#000" opacity="0.08" />
      <rect x="30" y="13" width="46" height="14" rx="2" className="fill-red" />
      <rect x="84" y="9" width="8" height="22" className="fill-red" opacity="0.85" />
      {/* collar and chisel tip */}
      <path d="M114 11 L126 14 L126 26 L114 29 Z" fill="#d9dcdf" />
      <path d="M126 15 L136 18 L136 23 L126 25 Z" className="fill-red" />
      {/* cap, pulled off and lying beside it */}
      <rect x="148" y="7" width="48" height="24" rx="6" className="fill-red" />
      <rect x="148" y="7" width="48" height="7" rx="3.5" fill="#fff" opacity="0.28" />
      <rect x="152" y="3" width="30" height="6" rx="2" className="fill-red" />
    </svg>
  );
}
