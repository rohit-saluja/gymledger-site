import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "GymLedger Privacy Policy — what data we collect, why, how we protect it, and the rights you have over it.",
  openGraph: {
    title: "Privacy Policy · GymLedger",
    description:
      "GymLedger Privacy Policy — what data we collect, why, how we protect it, and the rights you have over it.",
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container py-16 md:py-20">
      <article className="prose-doc">
        <h1>Privacy Policy</h1>

        <p>
          <em>Effective date: 21 April 2026 · Last updated: 21 April 2026</em>
        </p>

        <p>
          This Privacy Policy describes how <strong>GymLedger</strong> ("GymLedger", "we", "us", or "our") collects, uses, discloses, and safeguards your information when you use our mobile application (the "App") and related services (together, the "Service").
        </p>

        <p>
          GymLedger is operated by <strong>Rohit Saluja</strong>, an independent developer based in India.
        </p>

        <p>
          By downloading, accessing, or using the Service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our practices, please do not use the Service.
        </p>

        <h2 id="at-a-glance">At a glance</h2>
        <ul>
          <li>We collect only what the App needs to function — your account, your workouts, and your subscription status.</li>
          <li>We <strong>do not</strong> sell your personal information.</li>
          <li>We <strong>do not</strong> use your data for advertising and we <strong>do not</strong> track you across other apps or websites.</li>
          <li>You can request a copy of your data, correct it, or delete your account at any time.</li>
          <li>The Service is not directed to children under 13.</li>
        </ul>

        <h2 id="table-of-contents">Table of contents</h2>
        <ol>
          <li><a href="#information-we-collect">Information we collect</a></li>
          <li><a href="#how-we-use-your-information">How we use your information</a></li>
          <li><a href="#legal-bases-for-processing">Legal bases for processing (EEA / UK)</a></li>
          <li><a href="#how-we-share-your-information">How we share your information</a></li>
          <li><a href="#third-party-service-providers">Third-party service providers</a></li>
          <li><a href="#data-retention">Data retention</a></li>
          <li><a href="#data-security">Data security</a></li>
          <li><a href="#international-data-transfers">International data transfers</a></li>
          <li><a href="#your-privacy-rights">Your privacy rights (incl. in-app account deletion)</a></li>
          <li><a href="#childrens-privacy">Children's privacy</a></li>
          <li><a href="#app-store-privacy-information">App Store privacy information</a></li>
          <li><a href="#tracking-and-do-not-track">Tracking and "Do Not Track"</a></li>
          <li><a href="#changes-to-this-privacy-policy">Changes to this Privacy Policy</a></li>
          <li><a href="#contact-us">Contact us</a></li>
        </ol>

        <h2 id="information-we-collect">1. Information we collect</h2>
        <p>
          We limit collection to what is strictly necessary to run the Service. The categories below align with the data-type categories used by Apple in the App Store Privacy Nutrition Labels.
        </p>

        <h3>1.1 Contact information</h3>
        <ul>
          <li><strong>Email address</strong> — used to create and authenticate your account, deliver critical service messages, and respond to support requests.</li>
        </ul>

        <h3>1.2 User identifiers</h3>
        <ul>
          <li><strong>Account identifier</strong> — a unique internal ID assigned when you create your account.</li>
          <li><strong>Sign-in provider ID</strong> — if you sign in with Google, we receive a Google-issued user ID and your display name. If you sign in with Apple, we receive an Apple-issued user identifier and, on first sign-in only, your name and email (which may be a private relay address you choose to share via Apple).</li>
        </ul>

        <h3>1.3 User content</h3>
        <ul>
          <li><strong>Workout data</strong> — exercises, sets, reps, weights, notes, and workout templates you create.</li>
          <li><strong>Body metrics</strong> — body-weight entries and, where you choose to log them, related measurements.</li>
        </ul>

        <h3>1.4 Purchases</h3>
        <ul>
          <li><strong>Subscription status</strong> — whether you hold an active GymLedger Pro subscription, received from Apple via RevenueCat. We do <strong>not</strong> receive or store your payment card details; all payments are processed by Apple.</li>
        </ul>

        <h3>1.5 Diagnostics</h3>
        <ul>
          <li><strong>Crash and performance data</strong> — if the App crashes or encounters an error, our error-monitoring service may receive anonymized diagnostic information (stack traces, device model, OS version, App version). This data is not linked to your identity.</li>
        </ul>

        <h3>1.6 What we do not collect</h3>
        <p>GymLedger does <strong>not</strong> collect:</p>
        <ul>
          <li>Precise or approximate location</li>
          <li>Contacts, photos, camera, or microphone</li>
          <li>Health data from Apple Health or HealthKit</li>
          <li>Browsing or search history</li>
          <li>Advertising identifiers (IDFA) or any identifiers used for cross-app tracking</li>
          <li>Financial information other than subscription status (no card numbers, no bank details)</li>
        </ul>

        <h2 id="how-we-use-your-information">2. How we use your information</h2>
        <p>We use the information we collect solely to provide, maintain, and improve the Service:</p>
        <ul>
          <li><strong>Provide the Service</strong> — create and authenticate your account, sync your workouts across devices, and deliver app functionality.</li>
          <li><strong>Subscription management</strong> — verify your entitlement to GymLedger Pro features.</li>
          <li><strong>Customer support</strong> — respond to questions, feedback, and reported issues.</li>
          <li><strong>Security and fraud prevention</strong> — detect, investigate, and prevent unauthorized access, abuse, or misuse of the Service.</li>
          <li><strong>Service improvements</strong> — diagnose crashes and performance issues so we can fix bugs.</li>
          <li><strong>Legal compliance</strong> — comply with applicable laws, regulations, legal processes, and enforceable governmental requests.</li>
        </ul>
        <p>
          We will not use your personal information for materially different, unrelated, or incompatible purposes without providing you notice.
        </p>

        <h2 id="legal-bases-for-processing">3. Legal bases for processing (EEA / UK)</h2>
        <p>
          If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, the legal bases on which we rely to process your personal data are:
        </p>
        <ul>
          <li><strong>Performance of a contract</strong> — to provide the Service you signed up for.</li>
          <li><strong>Legitimate interests</strong> — to secure, maintain, and improve the Service (balanced against your rights and freedoms).</li>
          <li><strong>Legal obligation</strong> — where required by applicable law.</li>
          <li><strong>Consent</strong> — where we rely on consent, you may withdraw it at any time.</li>
        </ul>

        <h2 id="how-we-share-your-information">4. How we share your information</h2>
        <p>
          We <strong>do not</strong> sell your personal information, and we <strong>do not</strong> share it with third parties for their own marketing purposes. We disclose information only in the limited circumstances below:
        </p>
        <ul>
          <li><strong>Service providers</strong> — the infrastructure vendors listed in Section 5, who process data on our behalf under contractual confidentiality obligations.</li>
          <li><strong>Legal and safety</strong> — when we believe in good faith that disclosure is required by law, court order, or is necessary to protect the rights, property, or safety of GymLedger, our users, or the public.</li>
          <li><strong>Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via in-app notice or email before your information becomes subject to a different privacy policy.</li>
          <li><strong>With your consent</strong> — where you have explicitly directed us to share information.</li>
        </ul>

        <h2 id="third-party-service-providers">5. Third-party service providers</h2>
        <p>GymLedger uses the following processors to operate the Service. Each provider is bound by its own privacy policy, which we encourage you to review:</p>
        <ul>
          <li><strong>Supabase, Inc.</strong> — Hosts our database and manages authentication. Stores your account information and workout data. <a href="https://supabase.com/privacy">Privacy policy</a>.</li>
          <li><strong>Google LLC (Google Sign-In)</strong> — Used only when you choose Google as your sign-in method. Google returns your email address, display name, and a unique user ID. <a href="https://policies.google.com/privacy">Privacy policy</a>.</li>
          <li><strong>Apple Inc. (Sign in with Apple)</strong> — Used only when you choose Apple as your sign-in method. Apple returns an Apple-issued user identifier and, on first sign-in, your name and email (you may choose to hide your real email behind Apple's Private Relay). <a href="https://www.apple.com/legal/privacy/">Privacy policy</a>.</li>
          <li><strong>RevenueCat, Inc.</strong> — Processes subscription entitlements and receives a user identifier and your App Store purchase events. <a href="https://www.revenuecat.com/privacy">Privacy policy</a>.</li>
          <li><strong>Apple Inc. (App Store)</strong> — Processes all payments and delivers the App. We never receive or store your payment details. <a href="https://www.apple.com/legal/privacy/">Privacy policy</a>.</li>
          <li><strong>Sentry (Functional Software, Inc.)</strong> — Receives anonymized crash reports and diagnostic data used strictly to fix bugs. <a href="https://sentry.io/privacy/">Privacy policy</a>.</li>
        </ul>

        <h2 id="data-retention">6. Data retention</h2>
        <ul>
          <li><strong>Account and workout data</strong> — retained for as long as your account remains active.</li>
          <li><strong>Diagnostic data</strong> — retained for up to 90 days, then permanently deleted or irreversibly anonymized.</li>
          <li><strong>Deleted accounts</strong> — upon account deletion, all personal data is permanently removed from our production systems within <strong>30 days</strong>. Limited, anonymized records may be kept where required for legal, accounting, or security purposes.</li>
          <li><strong>Backups</strong> — deleted data may persist in encrypted backups for up to 90 days before being overwritten in the normal course of backup rotation.</li>
        </ul>

        <h2 id="data-security">7. Data security</h2>
        <p>We implement administrative, technical, and physical safeguards designed to protect your information, including:</p>
        <ul>
          <li>Encryption in transit (TLS 1.2+).</li>
          <li>Encryption at rest for data stored in our database.</li>
          <li>Access controls limiting internal access to personal data on a need-to-know basis.</li>
          <li>Periodic review of our security posture and third-party processors.</li>
        </ul>
        <p>
          No method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security. You are responsible for keeping your sign-in credentials confidential.
        </p>

        <h2 id="international-data-transfers">8. International data transfers</h2>
        <p>
          GymLedger is operated from India. The providers listed in Section 5 may store and process your information in the United States, the European Union, or other countries where they or their sub-processors operate.
        </p>
        <p>
          Where personal data of EEA, UK, or Swiss residents is transferred outside those regions, we rely on the European Commission's Standard Contractual Clauses or other lawful transfer mechanisms adopted by our providers.
        </p>

        <h2 id="your-privacy-rights">9. Your privacy rights</h2>
        <p>Depending on where you live, you may have the following rights regarding your personal information:</p>
        <ul>
          <li><strong>Access</strong> — obtain a copy of the personal information we hold about you.</li>
          <li><strong>Correction</strong> — request that inaccurate or incomplete information be corrected.</li>
          <li><strong>Deletion</strong> — request that we delete your personal information.</li>
          <li><strong>Portability</strong> — receive your information in a structured, commonly used, machine-readable format.</li>
          <li><strong>Objection / restriction</strong> — object to, or request restriction of, certain processing activities.</li>
          <li><strong>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time.</li>
          <li><strong>Complaint</strong> — lodge a complaint with your local data protection authority.</li>
        </ul>
        <p><strong>Region-specific rights:</strong></p>
        <ul>
          <li><strong>European Economic Area / United Kingdom</strong> — rights under the GDPR / UK GDPR as described above.</li>
          <li><strong>California (CCPA / CPRA)</strong> — right to know, delete, correct, and opt out of the "sale" or "sharing" of personal information. We do not sell or share personal information as defined by the CCPA.</li>
          <li><strong>India (DPDP Act, 2023)</strong> — rights to access, correction, erasure, and grievance redressal.</li>
        </ul>
        <p>
          To exercise any of these rights, email us at the address in Section 14. We will verify your request and respond within the timeframes required by applicable law (typically within 30 days).
        </p>

        <h3>9.1 In-app account and data deletion</h3>
        <p>
          You can permanently delete your GymLedger account and all associated data directly from inside the App, without contacting us. From the App, go to <strong>Settings → Account → Delete Account</strong> and confirm. Deletion takes effect immediately in the App and is reflected on our servers within 30 days; encrypted backups roll over within 90 days. This complies with App Store Review Guideline 5.1.1(v).
        </p>
        <p>
          If you cannot access the App, you may also email us from the address tied to your account using the subject line <strong>"Delete My Account"</strong> and we will process the request manually.
        </p>

        <h2 id="childrens-privacy">10. Children's privacy</h2>
        <p>
          GymLedger is rated <strong>4+</strong> on the App Store and is intended for users aged 13 and older (or 16 and older in the European Economic Area, or the minimum age of digital consent in your jurisdiction, whichever is higher). The Service is not directed to children under that age, and we do not knowingly collect personal information from them.
        </p>
        <p>
          If you are a parent or guardian and believe your child has provided us with personal information, please contact us using Section 14 and we will delete it.
        </p>

        <h2 id="app-store-privacy-information">11. App Store privacy information</h2>
        <p>
          In addition to this Privacy Policy, Apple requires us to disclose our data-collection practices on the App Store through Privacy Nutrition Labels. The labels shown on GymLedger's App Store page summarize the categories described in Section 1. In case of any inconsistency, this Privacy Policy governs.
        </p>
        <p>
          Our Privacy Nutrition Label declares the following data is collected and <strong>linked to your identity</strong>:
        </p>
        <ul>
          <li>Contact Info — email address (for account and support)</li>
          <li>Identifiers — account / sign-in provider user ID</li>
          <li>User Content — workout entries, body-weight entries, notes</li>
          <li>Purchases — subscription status</li>
        </ul>
        <p>
          The following data is collected but <strong>not linked to your identity</strong>:
        </p>
        <ul>
          <li>Diagnostics — anonymized crash logs and performance data</li>
        </ul>
        <p>
          GymLedger does <strong>not</strong> use any data for tracking purposes as defined by Apple's App Tracking Transparency framework.
        </p>

        <h3>11.1 Permissions the App may request</h3>
        <p>
          GymLedger requests only the system permissions strictly required for features you choose to use:
        </p>
        <ul>
          <li><strong>Notifications</strong> — used solely to deliver rest-timer alerts and optional workout reminders. You may decline at the system prompt or revoke later in iOS <strong>Settings → Notifications → GymLedger</strong>. The App functions without notifications enabled.</li>
        </ul>
        <p>
          GymLedger does <strong>not</strong> request access to camera, microphone, contacts, photos, location, HealthKit, motion, or any tracking-related permission.
        </p>

        <h2 id="tracking-and-do-not-track">12. Tracking and "Do Not Track"</h2>
        <p>
          GymLedger does not engage in cross-site or cross-app tracking. We do not integrate advertising SDKs, third-party analytics that fingerprint users, or any feature covered by Apple's App Tracking Transparency (ATT) framework. Because we do not perform tracking, we do not need to prompt you with an ATT permission request.
        </p>

        <h2 id="changes-to-this-privacy-policy">13. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make a material change, we will:
        </p>
        <ul>
          <li>Update the "Last updated" date at the top of this page.</li>
          <li>Provide prominent notice in the App or by email (if we have your email on file) before the change takes effect.</li>
        </ul>
        <p>Your continued use of the Service after an update constitutes your acceptance of the revised Privacy Policy.</p>

        <h2 id="contact-us">14. Contact us</h2>
        <p>If you have any questions, concerns, or requests about this Privacy Policy or our handling of your personal information, please contact us:</p>
        <ul>
          <li><strong>Email (general / privacy requests):</strong> <a href="mailto:support@getgymledger.com">support@getgymledger.com</a></li>
          <li><strong>Website:</strong> <a href="https://getgymledger.com">getgymledger.com</a></li>
          <li><strong>Developer:</strong> Rohit Saluja</li>
          <li><strong>Location:</strong> India</li>
        </ul>
        <p>We aim to respond to all privacy inquiries within 7 business days and to formal rights requests within the timeframes required by applicable law.</p>
      </article>
    </div>
  );
}
