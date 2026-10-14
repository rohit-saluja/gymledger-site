import fs from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

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

function render(body: string) {
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
        const external = /^https?:\/\//.test(href) && !href.startsWith("https://www.getgymledger.com");
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
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

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const { html, headings } = render(body);
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
    html,
    headings,
    faqs: extractFaqs(body),
  };
}

export function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
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

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
