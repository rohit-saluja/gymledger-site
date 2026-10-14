import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { formatDate, getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { APP_STORE_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/blog/json-ld";
import { AppCta } from "@/components/blog/app-cta";

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

  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.h1,
      description: post.description,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${url}/opengraph-image`,
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
    <div className="container py-10 md:py-16">
      <JsonLd data={schema} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl text-sm text-fg-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden><ChevronRight className="size-3.5" /></li>
          <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          <li aria-hidden><ChevronRight className="size-3.5" /></li>
          <li aria-current="page" className="line-clamp-1 text-fg-secondary">{post.category}</li>
        </ol>
      </nav>

      <div className="mx-auto mt-8 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0">
          <header className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">{post.category}</p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl md:leading-[1.08]">
              {post.h1}
            </h1>
            <p className="mt-5 text-pretty text-lg text-fg-secondary">{post.description}</p>
            <p className="mt-6 text-sm text-fg-muted">
              By <span className="text-fg-secondary">Rohit Saluja</span> · Updated{" "}
              <time dateTime={post.updated}>{formatDate(post.updated)}</time> · {post.readingMinutes} min read
            </p>
          </header>

          {post.headings.length > 2 && (
            <details className="mt-8 max-w-3xl rounded-2xl border border-border bg-surface p-5 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">In this guide</summary>
              <ol className="mt-3 space-y-2 text-sm">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-fg-secondary hover:text-foreground">{h.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div className="prose-blog mt-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />

          <div className="max-w-3xl">
            <AppCta />
          </div>
        </article>

        {post.headings.length > 2 && (
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-fg-muted">In this guide</p>
              <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-sm">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-fg-secondary transition-colors hover:text-foreground">{h.text}</a>
                  </li>
                ))}
              </ol>
              <a
                href={APP_STORE_URL}
                className="mt-8 inline-flex rounded-full bg-brand-dark px-4 py-2 text-xs font-semibold text-white hover:bg-brand-dark/90"
              >
                Get GymLedger for iPhone
              </a>
            </nav>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto mt-16 max-w-6xl border-t border-border-subtle pt-12">
          <h2 id="related-heading" className="text-2xl font-bold tracking-tight">Keep reading</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-hover"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">{p.category}</p>
                  <p className="mt-3 font-bold leading-snug text-foreground">{p.h1}</p>
                  <p className="mt-auto pt-4 text-xs text-fg-muted">{p.readingMinutes} min read</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
