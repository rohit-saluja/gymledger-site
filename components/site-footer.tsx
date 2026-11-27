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
      <div className="tray mx-2 md:mx-4" aria-hidden />
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
