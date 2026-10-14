# GymLedger blog writing brief

## Output format
One Markdown file per post at `content/blog/<slug>.md`. Exactly this frontmatter (double-quoted single-line strings only, no YAML lists):

---
title: "SEO title, <= 60 characters, contains the primary keyword"
h1: "The on-page H1 (can be longer than title)"
description: "Meta description, 140-160 characters, contains the primary keyword, ends with a reason to click"
keyword: "primary long-tail keyword"
keywords: "secondary one, secondary two, secondary three"
category: "One of: Progressive Overload | Programs & Splits | Recovery | Beginners | Body Weight | Apps & Tools | Equipment"
date: "2026-10-14"
---

Body rules:
- Do NOT include an H1 (`#`) in the body; the page renders `h1`. Use `##` for sections and `###` for subsections.
- Body must be **at least 2,100 words** (check with `wc -w`; frontmatter excluded is fine to ignore since it's small). Pillar post #1 should be 3,000+.
- Primary keyword in the first 100 words, in at least one `##` heading, and naturally 4-8 times total. Secondary keywords used naturally. No keyword stuffing.
- Open with a 2-4 sentence answer-first intro (featured-snippet style), then a short "In this guide" is NOT needed (page builds a TOC from `##` headings).
- Use GFM tables, numbered lists, bullet lists, and **bold** where they help skimming. Include worked numeric examples in BOTH kg and lb where weights appear (kg first).
- End with `## Frequently asked questions` containing 4-6 `###` questions (real People-Also-Ask style), each answered in 40-80 words of plain paragraph text. This section is parsed into FAQ schema, so keep each answer as plain paragraphs (no lists).
- Internal links (relative): link to 2-4 sibling posts where relevant, and mention GymLedger 2-4 times naturally (not salesy). Do not add download buttons; the page template adds the CTA. You may link `/` for the app.
- External links: only to sources you have actually opened with WebFetch/WebSearch and confirmed exist (e.g. PubMed abstracts, official sites). Never invent studies, statistics, quotes, authors, or URLs. If unsure, state the idea without a citation.
- Voice: direct, practical, coach-to-lifter. Short paragraphs (2-4 sentences). No fluff intros ("In today's fast-paced world"), no em-dash overuse, no "delve". Be accurate; this is fitness advice, so avoid medical claims and add a brief "check with a doctor" note only where genuinely relevant (e.g. weight loss, injuries).
- Don't write a "Conclusion" heading; end the main body with a practical "## Putting it into practice" or similar, then the FAQ.

## Sibling posts (use these exact URLs for internal links)
1. /blog/how-to-track-progressive-overload — How to Track Progressive Overload (pillar)
2. /blog/double-progression — Double Progression method
3. /blog/rest-between-sets-compound-vs-isolation — Rest between sets: compound vs isolation
4. /blog/how-to-build-your-own-workout-split — Build your own workout split
5. /blog/missed-a-day-push-pull-legs — Missed a day on push/pull/legs
6. /blog/gym-workout-plan-for-beginners-india — Gym workout plan for beginners in India (12 weeks)
7. /blog/log-dumbbells-per-hand-or-total — Log dumbbells per hand or total?
8. /blog/how-often-to-weigh-yourself — How often to weigh yourself when bulking or cutting
9. /blog/hevy-alternatives-without-social-feed — Hevy alternatives without a social feed
10. /blog/how-to-load-a-barbell-in-kg — How to load a barbell in kg

## GymLedger facts (ONLY claim these; nothing else about the app)
- iPhone-only workout tracker. App Store name "GymLedger - Workout Tracker".
- Custom workout templates: pick exercises, sets and rep ranges; any split (PPL, upper/lower, full body, custom). Custom exercises.
- Home screen shows your last workout and today's pick; start in one tap or choose a different session.
- Fast set / rep / weight logging.
- Rest timer with haptic feedback; keeps counting on the Lock Screen and Dynamic Island; you can skip rest.
- Per-exercise strength progress charts, personal bests; body-weight tracking with charts.
- kg or lbs unit choice.
- Syncs across your iPhones; Sign in with Apple, Google, or email; 12 languages (incl. Hindi).
- Privacy-first: no ads, data not sold/shared; delete account and data from inside the app.
- Pricing: requires purchase to unlock. Monthly subscription with 7-day free trial for new subscribers, or a one-time Lifetime purchase. (Do not quote prices.)
- Do NOT claim: notes field, RPE/RIR, supersets, plate calculator, warm-up set tagging, 1RM estimates, Apple Watch, Android, social features, AI coaching, data import/export, automatic split rotation.
