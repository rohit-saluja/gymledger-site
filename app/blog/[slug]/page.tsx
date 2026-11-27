import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { formatDate, getAllPosts, getPost, getPostSlugs, imageSize } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/blog/json-ld";
import { AppCta } from "@/components/blog/app-cta";
import { AppStoreButton } from "@/components/app-store-button";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: { absolute: post.title },
    description: post.description,
    keywords: [post.keyword, ...post.keywords],
    alternates: { canonical: url },
    authors: [{ name: "Rohit Saluja" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      siteName: SITE_NAME,
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.category,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const hero = post.image ? imageSize(post.image) : null;

  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.h1,
      description: post.description,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: post.image ? [`${SITE_URL}${post.image}`, `${url}/opengraph-image`] : `${url}/opengraph-image`,
      datePublished: post.date,
      dateModified: post.updated,
      wordCount: post.wordCount,
      articleSection: post.category,
      keywords: [post.keyword, ...post.keywords].join(", "),
      inLanguage: "en",
      author: { "@type": "Person", name: "Rohit Saluja", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/app-icon.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.h1, item: url },
      ],
    },
  ];
  if (post.faqs.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <div className="container py-8 md:py-12">
      <JsonLd data={schema} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl text-sm text-ink-3">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-ink">Home</Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="size-3.5" />
          </li>
          <li>
            <Link href="/blog" className="hover:text-ink">Blog</Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="size-3.5" />
          </li>
          <li aria-current="page" className="line-clamp-1 text-ink-2">{post.category}</li>
        </ol>
      </nav>

      <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
        <article className="min-w-0">
          <header className="max-w-3xl">
            <h1 className="text-balance text-[2.125rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink md:text-[3.25rem]">
              {post.h1}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-2 md:text-xl">{post.description}</p>
            <p className="mt-6 text-sm text-ink-3">
              By <span className="font-semibold text-ink-2">Rohit Saluja</span> in {post.category}, updated{" "}
              <time dateTime={post.updated}>{formatDate(post.updated)}</time>, {post.readingMinutes} min read
            </p>
          </header>

          <div className="sheet mt-10 max-w-3xl px-5 pb-10 pt-5 sm:px-8 md:px-12 md:pb-14 md:pt-8">
            <span aria-hidden className="magnet" style={{ top: -13, left: 40 }} />
            <span aria-hidden className="magnet magnet--black" style={{ top: -13, right: 40 }} />

            {post.image && (
              <figure className="-mx-2 sm:-mx-4 md:-mx-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.imageAlt ?? ""}
                  width={hero?.width ?? 1600}
                  height={hero?.height ?? 1000}
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-full rounded-[3px]"
                />
                {post.imageCredit && (
                  <figcaption className="mt-2.5 px-2 text-sm text-ink-3 sm:px-4 md:px-6">
                    Photo:{" "}
                    {post.imageCreditUrl ? (
                      <a href={post.imageCreditUrl} target="_blank" rel="noopener" className="underline decoration-ink-3/40 underline-offset-4 hover:text-ink">
                        {post.imageCredit}
                      </a>
                    ) : (
                      post.imageCredit
                    )}{" "}
                    on Pexels
                  </figcaption>
                )}
              </figure>
            )}

            {post.headings.length > 2 && (
              <details className="mt-8 rounded-md bg-board px-5 py-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-semibold text-ink">In this guide</summary>
                <ol className="mt-3 space-y-2 text-sm">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-ink-2 hover:text-ink">{h.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div className="prose-blog mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

            <AppCta />
          </div>
        </article>

        {post.headings.length > 2 && (
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6">
              <p className="marker text-[1.75rem] text-ink">In this guide</p>
              <ol className="mt-4 space-y-2.5 border-l-2 border-ink/15 pl-4 text-sm">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-ink-2 transition-colors hover:text-ink">{h.text}</a>
                  </li>
                ))}
              </ol>
              <AppStoreButton size="sm" className="mt-8" />
            </nav>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto mt-20 max-w-6xl">
          <h2 id="related-heading" className="marker text-[2.75rem] text-ink">Keep reading.</h2>
          <ul className="mt-8 grid gap-7 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="sheet press group flex h-full flex-col p-3 pb-5">
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt="" width={1600} height={1000} loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-[3px] object-cover" />
                  )}
                  <span className="mt-4 block px-2 font-bold leading-snug text-ink group-hover:underline group-hover:decoration-red/60 group-hover:decoration-2 group-hover:underline-offset-4">
                    {p.h1}
                  </span>
                  <span className="mt-auto px-2 pt-3 text-sm text-ink-3">
                    {p.category}, {p.readingMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
