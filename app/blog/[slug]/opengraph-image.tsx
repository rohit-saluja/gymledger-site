import { getPost, getPostSlugs } from "@/lib/blog";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "GymLedger blog post";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({ eyebrow: post?.category ?? "GymLedger Blog", title: post?.h1 ?? "GymLedger Blog" });
}
