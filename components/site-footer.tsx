import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle/70 bg-bg-subtle/40">
      <div className="container flex flex-col items-center gap-6 py-10 text-sm text-fg-secondary md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-md bg-surface ring-1 ring-border">
            <Image src="/images/app-icon.png" alt="" width={28} height={28} className="h-6 w-6 object-cover" />
          </span>
          <span className="font-medium text-foreground">GymLedger</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <a href="mailto:support@getgymledger.com" className="hover:text-foreground transition-colors">Contact</a>
        </nav>

        <p className="text-xs text-fg-muted">© 2026 Rohit Saluja · Jaipur, India</p>
      </div>
    </footer>
  );
}
