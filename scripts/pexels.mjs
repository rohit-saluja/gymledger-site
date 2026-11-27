#!/usr/bin/env node
// Finds Pexels photos for blog posts, saves them as pre-sized WebP under
// public/blog/<slug>/, and prints what to paste into the post.
//
//   node scripts/pexels.mjs search "<query>" [count]        list candidates (unused, landscape)
//   node scripts/pexels.mjs hero <slug> "<query>" [id]      hero image -> frontmatter lines
//   node scripts/pexels.mjs inline <slug> <name> "<query>" [id]   body image -> Markdown
//
// Pass a photo id as the last argument to take that photo instead of the first
// unused search result. No two posts share a photo: every id taken is appended
// to content/blog/.pexels-used.txt.
//
// The key comes from PEXELS_API_KEY or from .env.local (git-ignored). It is
// never printed. Pexels allows 200 requests an hour.

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const usedFile = join(root, "content/blog/.pexels-used.txt");

function apiKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY;
  const file = join(root, ".env.local");
  if (existsSync(file)) {
    const line = readFileSync(file, "utf8").split("\n").find((l) => l.startsWith("PEXELS_API_KEY="));
    const value = line?.slice("PEXELS_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
    if (value) return value;
  }
  console.error("No Pexels key: set PEXELS_API_KEY or add it to .env.local.");
  process.exit(1);
}

function usedIds() {
  if (!existsSync(usedFile)) return new Set();
  return new Set(readFileSync(usedFile, "utf8").split(/\s+/).filter(Boolean).map((l) => l.split(":")[0]));
}

async function get(path) {
  const res = await fetch(`https://api.pexels.com/v1/${path}`, { headers: { Authorization: apiKey() } });
  const left = res.headers.get("x-ratelimit-remaining");
  if (left !== null && Number(left) < 30) console.error(`Pexels: ${left} requests left.`);
  if (res.status === 429) {
    console.error("Pexels rate limit reached (200 an hour). Wait and try again.");
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`Pexels answered ${res.status} for ${path.split("?")[0]}.`);
    process.exit(1);
  }
  return res.json();
}

async function search(query, count = 8) {
  const data = await get(`search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=40`);
  const used = usedIds();
  return data.photos.filter((p) => !used.has(String(p.id)) && p.width >= 1600).slice(0, count);
}

async function pick(query, id) {
  if (id) return get(`photos/${id}`);
  const [first] = await search(query, 1);
  if (!first) {
    console.error(`No unused landscape photo for "${query}". Try another query.`);
    process.exit(1);
  }
  return first;
}

async function save(photo, slug, name, width) {
  const dir = join(root, "public/blog", slug);
  mkdirSync(dir, { recursive: true });
  const tmp = join(dir, `.${name}.jpg`);
  const res = await fetch(`${photo.src.original}?auto=compress&cs=tinysrgb&w=${width * 1.25}`);
  if (!res.ok) {
    console.error(`Download failed (${res.status}) for photo ${photo.id}.`);
    process.exit(1);
  }
  writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  const out = join(dir, `${name}.webp`);
  execFileSync("cwebp", ["-quiet", "-q", "72", "-resize", String(width), "0", "-metadata", "none", tmp, "-o", out]);
  unlinkSync(tmp);
  appendFileSync(usedFile, `${photo.id}:${slug}\n`);
  return `/blog/${slug}/${name}.webp`;
}

const clean = (s) => (s || "").replace(/"/g, "'").trim();
const altOf = (p) => clean(p.alt) || "Photo from Pexels";

const [cmd, ...args] = process.argv.slice(2);
if (cmd === "search") {
  const [query, count] = args;
  for (const p of await search(query, Number(count) || 8)) {
    console.log(`${p.id}\t${p.width}x${p.height}\t${p.photographer}\t${altOf(p)}\t${p.url}`);
  }
} else if (cmd === "hero") {
  const [slug, query, id] = args;
  const p = await pick(query, id);
  const src = await save(p, slug, "hero", 1600);
  console.log(`image: "${src}"`);
  console.log(`imageAlt: "${altOf(p)}"`);
  console.log(`imageCredit: "${clean(p.photographer)}"`);
  console.log(`imageCreditUrl: "${p.url}"`);
} else if (cmd === "inline") {
  const [slug, name, query, id] = args;
  if (!/^[a-z0-9-]+$/.test(name || "")) {
    console.error("Name must be lowercase letters, digits and dashes, e.g. bench-press.");
    process.exit(1);
  }
  const p = await pick(query, id);
  const src = await save(p, slug, name, 1200);
  console.log(`![${altOf(p)}](${src})`);
  console.log(`*Photo: [${clean(p.photographer)}](${p.url}) on Pexels*`);
} else {
  console.error('Usage: pexels.mjs search "<query>" | hero <slug> "<query>" [id] | inline <slug> <name> "<query>" [id]');
  process.exit(1);
}
