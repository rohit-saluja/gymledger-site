import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with GymLedger. Common questions, account help, and how to reach us.",
  openGraph: {
    title: "Support · GymLedger",
    description: "Get help with GymLedger. Common questions, account help, and how to reach us.",
    type: "article",
  },
};

export default function SupportPage() {
  return (
    <div className="container py-16 md:py-20">
      <article className="prose-doc">
        <h1>Support</h1>
        <p>Need help? You're in the right place.</p>

        <h2>Contact us</h2>
        <p>
          Email <a href="mailto:support@getgymledger.com">support@getgymledger.com</a>. We read every message and aim to reply within 48 hours, usually sooner.
        </p>

        <h2>Common questions</h2>

        <h3>How do I cancel my subscription?</h3>
        <p>
          All subscription management happens through Apple. On your iPhone, open <strong>Settings → [Your Name] → Subscriptions → GymLedger → Cancel Subscription</strong>.
        </p>

        <h3>How do I restore purchases on a new device?</h3>
        <p>
          Sign in with the same account you used originally, then open <strong>Settings</strong> in GymLedger and tap <strong>Restore Purchases</strong>.
        </p>

        <h3>I lost my workout data — can you recover it?</h3>
        <p>
          Data is tied to your account. Sign in with the same email or Google account you registered with, and your history will sync automatically. If you're still missing data, email us with your account email and we'll investigate.
        </p>

        <h3>How do I delete my account?</h3>
        <p>
          You can delete your account directly inside the app: <strong>Settings → Account → Delete Account</strong>. Your data is removed from our production systems within 30 days.
        </p>
        <p>
          If you can't access the app, email us from the address tied to your account with the subject <strong>"Delete My Account"</strong> and we'll process it manually.
        </p>

        <h3>Is my data private?</h3>
        <p>
          Yes. See our <Link href="/privacy">Privacy Policy</Link> for details.
        </p>

        <h3>Is GymLedger available on Android?</h3>
        <p>Android support is planned. Check back in the app for updates.</p>

        <h2>Feature requests &amp; bug reports</h2>
        <p>
          Email us with as much detail as you can — screenshots help. We prioritize issues that affect the most users.
        </p>
      </article>
    </div>
  );
}
