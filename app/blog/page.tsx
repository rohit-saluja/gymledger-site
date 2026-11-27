import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts, type PostMeta } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/blog/json-ld";
import { AppCta } from "@/components/blog/app-cta";
import { Underline } from "@/components/board/marks";

const DESCRIPTION =
  "Practical guides on progressive overload, workout splits, recovery and protein, from the team behind the GymLedger workout tracker.";

export const metadata: Metadata = {
  title: "Lifting Guides: Splits, Overload, Recovery, Protein",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "GymLedger Blog: Lifting Guides",
    description: DESCRIPTION,
    type: "website",
    url: "/blog",
  },
};

function PostSheet({ post, priority = false }: { post: PostMeta; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="sheet press group flex h-full flex-col p-3 pb-5">
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt=""
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[16/10] w-full rounded-[3px] object-cover"
        />
      )}
      <span className="mt-4 block px-2 text-lg font-bold leading-snug tracking-tight text-ink group-hover:underline group-hover:decoration-red/60 group-hover:decoration-2 group-hover:underline-offset-4">
        {post.h1}
      </span>
      <span className="mt-2 line-clamp-2 px-2 text-[0.9375rem] leading-relaxed text-ink-2">{post.description}</span>
      <span className="mt-auto px-2 pt-4 text-sm text-ink-3">
        {post.category}, {post.readingMinutes} min read
      </span>
    </Link>
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="container py-14 md:py-20">
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
            dateModified: p.updated,
          })),
        }}
      />

      <header className="max-w-3xl">
        <h1 className="marker text-[clamp(3rem,7vw,5.5rem)] text-ink">
          Lifting{" "}
          <span className="relative inline-block">
            guides.
            <Underline className="absolute -bottom-2 left-0 h-4 w-full text-red" />
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-2">{DESCRIPTION}</p>
      </header>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="sheet press group mt-14 grid overflow-visible p-3 md:grid-cols-[1.15fr_1fr] md:gap-8 md:p-4"
        >
          <span aria-hidden className="magnet" style={{ top: -13, left: 36 }} />
          <span aria-hidden className="magnet magnet--black" style={{ top: -13, right: 36 }} />
          {featured.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.image} alt="" width={1600} height={1000} fetchPriority="high" decoding="async" className="aspect-[16/10] w-full rounded-[3px] object-cover" />
          )}
          <span className="flex flex-col justify-center px-3 py-6 md:px-2 md:pr-8">
            <span className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-ink group-hover:underline group-hover:decoration-red/60 group-hover:decoration-2 group-hover:underline-offset-4 md:text-[2.125rem]">
              {featured.h1}
            </span>
            <span className="mt-4 text-ink-2">{featured.description}</span>
            <span className="mt-5 text-sm text-ink-3">
              {featured.category}, {featured.readingMinutes} min read, updated <time dateTime={featured.updated}>{formatDate(featured.updated)}</time>
            </span>
          </span>
        </Link>
      )}

      <ul className="mt-12 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <li key={post.slug}>
            <PostSheet post={post} />
          </li>
        ))}
      </ul>

      <div className="mx-auto max-w-3xl">
        <AppCta />
      </div>
    </div>
  );
}
