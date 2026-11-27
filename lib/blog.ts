import fs from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Reading order for posts published on the same day: pillar first, then its spokes.
const ORDER = [
  "how-to-track-progressive-overload",
  "double-progression",
  "rest-between-sets-compound-vs-isolation",
  "how-to-build-your-own-workout-split",
  "missed-a-day-push-pull-legs",
  "gym-workout-plan-for-beginners-india",
  "log-dumbbells-per-hand-or-total",
  "how-often-to-weigh-yourself",
  "hevy-alternatives-without-social-feed",
  "how-to-load-a-barbell-in-kg",
];

function rank(slug: string) {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
}

/**
 * The publishing clock. A post whose `date` is after today stays out of the
 * build: no page, no listing, no sitemap entry, and links to it render as plain
 * text. The site is a static export, so a scheduled post goes live with the
 * first build on or after its date (see scripts/publish-daily.sh).
 * BLOG_NOW=YYYY-MM-DD overrides the date, e.g. to preview scheduled posts.
 */
export function today() {
  if (process.env.BLOG_NOW) return process.env.BLOG_NOW;
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export interface PostMeta {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  keywords: string[];
  category: string;
  date: string;
  updated: string;
  wordCount: number;
  readingMinutes: number;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
}

export interface Heading {
  id: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Post extends PostMeta {
  html: string;
  headings: Heading[];
  faqs: Faq[];
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter");
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    data[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
  }
  return { data, body: match[2] };
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function plainText(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(markdown: string) {
  return plainText(markdown).split(" ").filter(Boolean).length;
}

function extractFaqs(body: string): Faq[] {
  const section = body.split(/^##\s+Frequently asked questions\s*$/im)[1];
  if (!section) return [];
  const until = section.split(/^##\s+/m)[0];
  return until
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [question, ...rest] = chunk.split(/\r?\n/);
      return { question: question.trim(), answer: plainText(rest.join(" ")) };
    })
    .filter((f) => f.question && f.answer);
}

/** Width and height of a WebP in public/, read from its header (static export has no image optimizer). */
export function imageSize(src: string): { width: number; height: number } | null {
  const file = path.join(PUBLIC_DIR, src.split("?")[0]);
  if (!src.startsWith("/") || !fs.existsSync(file)) return null;
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  return null;
}

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function render(body: string, live: Set<string>) {
  const headings: Heading[] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const text = this.parser.parseInline(tokens);
        let id = slugify(text);
        while (used.has(id)) id += "-x";
        used.add(id);
        if (depth === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        // A link to a post that is scheduled but not live yet stays plain text until it publishes.
        const internal = href.match(/^(?:https:\/\/www\.getgymledger\.com)?\/blog\/([a-z0-9-]+)\/?(#.*)?$/);
        if (internal && !live.has(internal[1])) return text;
        const external = /^https?:\/\//.test(href) && !href.startsWith("https://www.getgymledger.com");
        const t = title ? ` title="${escapeAttr(title)}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
      image({ href, text }: Tokens.Image) {
        const size = imageSize(href);
        const dims = size ? ` width="${size.width}" height="${size.height}"` : "";
        return `<img src="${href}" alt="${escapeAttr(text)}"${dims} loading="lazy" decoding="async">`;
      },
      paragraph({ tokens }: Tokens.Paragraph) {
        // An image on its own line, optionally followed by an italic credit line, becomes a figure.
        if (tokens[0]?.type === "image") {
          const img = this.parser.parseInline([tokens[0]]);
          const caption = this.parser.parseInline(tokens.slice(1)).replace(/^\s*(<br>)?\s*/, "").trim();
          return `<figure>${img}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>\n`;
        }
        return `<p>${this.parser.parseInline(tokens)}</p>\n`;
      },
      table(token: Tokens.Table) {
        const head = token.header
          .map((cell) => `<th${cell.align ? ` style="text-align:${cell.align}"` : ""}>${this.parser.parseInline(cell.tokens)}</th>`)
          .join("");
        const rows = token.rows
          .map(
            (row) =>
              `<tr>${row
                .map((cell) => `<td${cell.align ? ` style="text-align:${cell.align}"` : ""}>${this.parser.parseInline(cell.tokens)}</td>`)
                .join("")}</tr>`
          )
          .join("");
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const html = marked.parse(body, { async: false }) as string;
  return { html, headings };
}

function readRaw(slug: string) {
  return parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8"));
}

function allSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

let liveCache: { day: string; slugs: string[] } | null = null;

/** Slugs of posts that are live today (date on or before today). */
export function getPostSlugs() {
  const day = today();
  if (liveCache?.day === day) return liveCache.slugs;
  const slugs = allSlugs().filter((slug) => (readRaw(slug).data.date || "") <= day);
  liveCache = { day, slugs };
  return slugs;
}

function readPost(slug: string): Post {
  const { data, body } = readRaw(slug);
  const { html, headings } = render(body, new Set(getPostSlugs()));
  const wordCount = countWords(body);
  return {
    slug,
    title: data.title,
    h1: data.h1 || data.title,
    description: data.description,
    keyword: data.keyword,
    keywords: (data.keywords || "").split(",").map((k) => k.trim()).filter(Boolean),
    category: data.category || "Training",
    date: data.date,
    updated: data.updated || data.date,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 230)),
    image: data.image || undefined,
    imageAlt: data.imageAlt || undefined,
    imageCredit: data.imageCredit || undefined,
    imageCreditUrl: data.imageCreditUrl || undefined,
    html,
    headings,
    faqs: extractFaqs(body),
  };
}

export function getPost(slug: string): Post | null {
  if (!getPostSlugs().includes(slug)) return null;
  return readPost(slug);
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { html, headings, faqs, ...meta } = readPost(slug);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : rank(a.slug) - rank(b.slug)));
}

/** Every post including scheduled ones, oldest first. For the publishing schedule only. */
export function getSchedule() {
  return allSlugs()
    .map((slug) => ({ slug, date: readRaw(slug).data.date || "" }))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.slug.localeCompare(b.slug)));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
