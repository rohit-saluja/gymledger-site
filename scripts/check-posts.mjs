#!/usr/bin/env node
// Checks blog posts against docs/blog-writing-brief.md.
//   node scripts/check-posts.mjs            every post
//   node scripts/check-posts.mjs <slug>...  just these
// Exit code 1 when any post has an error. Warnings don't fail.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "content/blog");
const all = readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : all;
const CATEGORIES = ["Progressive Overload", "Programs & Splits", "Recovery", "Nutrition", "Beginners", "Body Weight", "Apps & Tools", "Equipment"];
const BANNED = [/\bdelve/i, /\bembark/i, /\bjourney\b/i, /\bunlock/i, /game[- ]changer/i, /in today's fast-paced/i, /it's important to note/i, /whether you're a beginner or/i, /\btapestry\b/i, /\btestament to\b/i, /\bseamless(ly)?\b/i, /\belevate\b/i, /\bnavigat(e|ing) the\b/i, /\brealm\b/i, /\blifetime (purchase|plan|unlock)\b/i, /\bbuy once\b/i];
const NOT_CLAIMS = [/GymLedger[^.\n]{0,80}\b(apple watch|android|supersets?|plate calculator|1rm|one-rep max estimate|RPE|RIR|notes? field|barcode|photo of your (meal|food)|AI coach)/i];

let failed = false;
for (const slug of slugs) {
  const errors = [], warnings = [];
  const file = join(dir, `${slug}.md`);
  if (!existsSync(file)) { console.log(`✗ ${slug}: no such post`); failed = true; continue; }
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) { console.log(`✗ ${slug}: missing frontmatter`); failed = true; continue; }
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"(.*)"\s*$/);
    if (kv) fm[kv[1]] = kv[2]; else if (line.trim()) errors.push(`frontmatter line not a double-quoted string: ${line}`);
  }
  const body = m[2];
  for (const k of ["title", "h1", "description", "keyword", "keywords", "category", "date", "image", "imageAlt", "imageCredit", "imageCreditUrl"]) if (!fm[k]) errors.push(`missing ${k}`);
  if (fm.title && fm.title.length > 60) errors.push(`title ${fm.title.length} chars (max 60)`);
  if (fm.description && (fm.description.length < 120 || fm.description.length > 165)) warnings.push(`description ${fm.description.length} chars (aim 140-160)`);
  if (fm.category && !CATEGORIES.includes(fm.category)) errors.push(`category "${fm.category}" not in list`);
  if (fm.date && !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) errors.push("date not YYYY-MM-DD");
  if (fm.image && !existsSync(join(root, "public", fm.image))) errors.push(`hero image missing on disk: ${fm.image}`);
  if (/^# /m.test(body)) errors.push("body has an H1");
  const text = body.replace(/!\[[^\]]*\]\([^)]+\)/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`>#|]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < 2100) errors.push(`${words} words (min 2,100)`);
  const kw = (fm.keyword || "").toLowerCase();
  const first100 = text.split(/\s+/).slice(0, 100).join(" ").toLowerCase();
  if (kw && !first100.includes(kw)) warnings.push(`primary keyword not in first 100 words`);
  const h2s = [...body.matchAll(/^## (.+)$/gm)].map((x) => x[1]);
  if (kw && !h2s.some((h) => h.toLowerCase().includes(kw))) warnings.push("primary keyword not in any ## heading");
  const kwCount = kw ? text.toLowerCase().split(kw).length - 1 : 0;
  if (kw && (kwCount < 3 || kwCount > 12)) warnings.push(`primary keyword used ${kwCount} times (aim 4-8)`);
  const faq = body.split(/^## Frequently asked questions\s*$/im)[1];
  if (!faq) errors.push("no '## Frequently asked questions' section");
  else {
    const qs = faq.split(/^## /m)[0].split(/^### /m).slice(1);
    if (qs.length < 4 || qs.length > 6) errors.push(`${qs.length} FAQ questions (need 4-6)`);
    for (const q of qs) if (/^\s*[-*\d]+[.)]?\s/m.test(q.split("\n").slice(1).join("\n"))) errors.push(`FAQ answer has a list: ${q.split("\n")[0]}`);
  }
  if (/^## Conclusion/im.test(body)) errors.push("has a Conclusion heading");
  const imgs = [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((x) => x[1]);
  if (imgs.length < 2) warnings.push(`${imgs.length} body images (aim 2+)`);
  for (const src of imgs) if (src.startsWith("/") && !existsSync(join(root, "public", src))) errors.push(`body image missing on disk: ${src}`);
  // Links only: skip images (`![..](..)`) and file paths like /blog/<slug>/hero.webp.
  const links = [...body.matchAll(/(?<!!)\[[^\]]*\]\((\/blog\/[^)#\s]+)/g)]
    .map((x) => x[1].replace(/^\/blog\//, "").replace(/\/$/, ""))
    .filter((l) => !/\.[a-z0-9]+$/i.test(l));
  for (const l of links) if (!all.includes(l)) errors.push(`internal link to a post that doesn't exist: /blog/${l}`);
  if (new Set(links).size < 3) warnings.push(`${new Set(links).size} distinct internal blog links (aim 3+)`);
  for (const re of BANNED) { const hit = body.match(re); if (hit) warnings.push(`banned/AI phrase: "${hit[0]}"`); }
  const claimText = body.replace(/^#{2,4} .*$/gm, ""); // questions in headings are not claims
  for (const re of NOT_CLAIMS) { const hit = claimText.match(re); if (hit) errors.push(`possible false app claim: "${hit[0]}"`); }
  const dashes = (body.match(/—/g) || []).length;
  if (dashes > 8) warnings.push(`${dashes} em dashes (keep under 8)`);
  const ok = errors.length === 0;
  if (!ok) failed = true;
  console.log(`${ok ? "✓" : "✗"} ${slug} (${words} words, ${fm.date || "no date"})`);
  for (const e of errors) console.log(`    error: ${e}`);
  for (const w of warnings) console.log(`    warn:  ${w}`);
}
process.exit(failed ? 1 : 0);
