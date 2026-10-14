import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, getAllPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/blog/json-ld";
import { AppCta } from "@/components/blog/app-cta";

const DESCRIPTION =
  "Practical guides on progressive overload, workout splits, rest times and tracking your lifts, from the team behind the GymLedger workout tracker.";

export const metadata: Metadata = {
  title: "Blog: Lifting Guides & Workout Tracking Tips",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "GymLedger Blog: Lifting Guides & Workout Tracking Tips",
    description: DESCRIPTION,
    type: "website",
    url: "/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="container py-16 md:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} Blog`,
          description: DESCRIPTION,
          url: `${SITE_URL}/blog`,
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.h1,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />

      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">The GymLedger Blog</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          Train smarter. Track everything.
        </h1>
        <p className="mt-4 text-pretty text-fg-secondary md:text-lg">{DESCRIPTION}</p>
      </header>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mx-auto mt-14 block max-w-5xl rounded-3xl border border-border bg-[radial-gradient(80%_120%_at_0%_0%,hsl(var(--brand)/0.14),transparent_60%)] bg-bg-subtle p-8 transition-colors hover:border-border-strong md:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">
            Start here · {featured.category}
          </p>
          <h2 className="mt-3 max-w-3xl text-balance text-2xl font-bold tracking-tight text-foreground md:text-4xl">
            {featured.h1}
          </h2>
          <p className="mt-4 max-w-2xl text-fg-secondary">{featured.description}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            Read the guide
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            <span className="font-normal text-fg-muted">· {featured.readingMinutes} min read</span>
          </p>
        </Link>
      )}

      <ul className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">{post.category}</p>
              <h2 className="mt-3 text-lg font-bold leading-snug tracking-tight text-foreground">{post.h1}</h2>
              <p className="mt-3 line-clamp-3 flex-1 text-sm text-fg-secondary">{post.description}</p>
              <p className="mt-5 text-xs text-fg-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mx-auto max-w-5xl">
        <AppCta />
      </div>
    </div>
  );
}
