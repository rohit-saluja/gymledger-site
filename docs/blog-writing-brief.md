# GymLedger blog writing brief

Updated 27 November 2026 for GymLedger 2.0. The keyword plan behind the current posts is [docs/seo/2026-11-27-keyword-research/content-plan.md](seo/2026-11-27-keyword-research/content-plan.md).

## Output format
One Markdown file per post at `content/blog/<slug>.md`. Exactly this frontmatter (double-quoted single-line strings only, no YAML lists):

```
---
title: "SEO title, <= 60 characters, contains the primary keyword"
h1: "The on-page H1 (can be longer than title)"
description: "Meta description, 140-160 characters, contains the primary keyword, ends with a reason to click"
keyword: "primary keyword"
keywords: "secondary one, secondary two, secondary three"
category: "One of: Progressive Overload | Programs & Splits | Recovery | Nutrition | Beginners | Body Weight | Apps & Tools | Equipment"
date: "YYYY-MM-DD (publish date; a future date keeps the post unpublished until then)"
updated: "YYYY-MM-DD (last meaningful edit; same as date for a new post)"
image: "/blog/<slug>/hero.webp"
imageAlt: "What the photo shows, in plain words"
imageCredit: "Photographer name"
imageCreditUrl: "https://www.pexels.com/photo/..."
---
```

## Before writing: read what already ranks
1. Open the top-ranking pages for your primary keyword (listed in `docs/seo/2026-11-27-keyword-research/top_urls_by_keyword.txt`): at least two articles and one Reddit thread. Use WebFetch (or the web-fetch agent).
2. Note in a few lines: their tone and voice (how formal, how much humour and what kind, first person or not), their structure, what questions they answer, and what they leave out or get wrong. Your post should match the register readers reward and beat them on the gaps: worked numbers, kg and lb, real schedules, honest trade-offs.
3. Reddit threads show the words lifters actually use and the doubts they have. Use those questions; never copy their text.

## Body rules
- Do NOT include an H1 (`#`) in the body; the page renders `h1`. Use `##` for sections and `###` for subsections.
- Body must be **at least 2,100 words** (check with `wc -w`). Pillars 2,800+.
- Primary keyword in the first 100 words, in at least one `##` heading, and naturally 4-8 times in total. Secondary keywords used naturally. No keyword stuffing.
- Open with a 2-4 sentence answer-first intro (featured-snippet style). The page builds a table of contents from `##` headings.
- Use GFM tables, numbered lists, bullet lists, and **bold** where they help skimming. Worked numeric examples in BOTH kg and lb where weights appear (kg first).
- End with `## Frequently asked questions` containing 4-6 `###` questions (People-Also-Ask style), each answered in 40-80 words of plain paragraph text. This section becomes FAQ schema, so keep answers as plain paragraphs (no lists).
- Internal links (relative, `/blog/<slug>`): follow the link map in the content plan. Link the cluster pillar early, at least two siblings, and one cross-cluster post. Links to scheduled posts are fine; they become live links when the target publishes.
- Mention GymLedger 2-4 times where it genuinely does the job being discussed (not salesy). Do not add download buttons; the page adds the call to action. You may link `/` for the app.
- External links: only to sources you have actually opened and confirmed (PubMed abstracts, position stands, official sites). Never invent studies, statistics, quotes, authors, or URLs. If unsure, state the idea without a citation.
- Don't write a "Conclusion" heading; end the main body with "## Putting it into practice" or similar, then the FAQ.
- Health-adjacent topics (soreness, protein, weight): practical, no medical claims, and one short "check with a doctor" line only where it genuinely applies (injury, kidney disease, eating disorders, medical conditions).

## Voice: sound like a person, not a model
Direct, practical, coach-to-lifter, with dry gym humour where it fits (one or two light lines per section at most, never forced). Short paragraphs (2-4 sentences). Contractions are fine. Concrete over abstract: "add 2.5 kg to the bar" beats "increase the load progressively".

Never: "In today's fast-paced world", "delve", "embark", "journey", "unlock", "game-changer", "it's important to note", "whether you're a beginner or a seasoned lifter", em-dash chains, rule-of-three padding, closing summaries that repeat the post, or headings phrased as clickbait questions.

After the draft, run two passes with the installed skills (Skill tool; if it is not available, read the SKILL.md file and apply it):
1. `copy-editing` (`~/.claude/skills/copy-editing/SKILL.md`) for clarity, flow and keyword placement.
2. `humanizer` (`~/.claude/skills/humanizer/SKILL.md`) to strip AI tells.

## Images (Pexels)
Every post gets a hero image and at least two photos in the body, spread through the post. Run from the repo root:

```
node scripts/pexels.mjs search "<query>" [count]          # look before you pick
node scripts/pexels.mjs hero <slug> "<query>" [photoId]    # prints the four image frontmatter lines
node scripts/pexels.mjs inline <slug> <name> "<query>" [photoId]   # prints the Markdown to paste
```

- Queries are two to five concrete words: "barbell bench press gym", "chalk hands deadlift", "meal prep containers chicken rice". Vary them; no two posts share a photo (the script enforces this).
- Pick photos that show the subject of the section, not generic smiling-in-activewear stock. No brand logo as the subject, no face as the focus of a close-up, no phone screens of other apps.
- Paste inline images on their own line with the credit line directly under them, exactly as the script prints:

  ```
  ![Alt text](/blog/<slug>/<name>.webp)
  *Photo: [Name](https://www.pexels.com/photo/...) on Pexels*
  ```
- Edit the alt text if Pexels' description is vague or wrong.
- Pexels allows 200 requests an hour; if the script reports the limit, wait and rerun.

## Sibling posts (exact URLs for internal links)
Live:
1. /blog/how-to-track-progressive-overload: How to track progressive overload (pillar)
2. /blog/double-progression: Double progression method
3. /blog/rest-between-sets-compound-vs-isolation: How long to rest between sets
4. /blog/how-to-build-your-own-workout-split: Build your own workout split
5. /blog/missed-a-day-push-pull-legs: Missed a day on push/pull/legs
6. /blog/gym-workout-plan-for-beginners-india: Gym workout plan for beginners in India
7. /blog/log-dumbbells-per-hand-or-total: Log dumbbells per hand or total?
8. /blog/how-often-to-weigh-yourself: How often to weigh yourself
9. /blog/hevy-alternatives-without-social-feed: Hevy alternatives without a social feed
10. /blog/how-to-load-a-barbell-in-kg: How much a barbell weighs in kg, and how to load it

Scheduled (link to them freely):
11. /blog/push-pull-legs-routine: Push/pull/legs routine (splits pillar)
12. /blog/how-long-does-it-take-for-muscles-to-recover: Muscle recovery time (recovery pillar)
13. /blog/how-much-protein-to-build-muscle: Protein to build muscle (nutrition pillar)
14. /blog/best-app-to-track-workouts: Best apps to track workouts (tracking pillar)
15. /blog/4-day-workout-split: 4-day workout split
16. /blog/sore-muscles-after-workout: Sore muscles after a workout
17. /blog/3-day-workout-split: 3-day workout split
18. /blog/workout-log-template: How to keep a workout log (template)
19. /blog/how-many-sets-per-muscle-group-per-week: Sets per muscle group per week
20. /blog/bulking-vs-cutting: Bulking vs cutting
21. /blog/5-day-workout-split: 5-day workout split
22. /blog/deload-week: Deload week
23. /blog/progressive-overload-examples: Progressive overload examples
24. /blog/body-recomposition: Body recomposition
25. /blog/rpe-chart: RPE chart
26. /blog/ai-calorie-counter: AI calorie counters

## GymLedger facts (ONLY claim these; nothing else about the app)
Source of truth: ~/projects/bodybuilding-metric/fastlane/metadata/en-US/description.txt.

- iPhone-only workout tracker. App Store name "GymLedger - Workout Tracker".
- Dashboard: today's workout at the top (the next one in your rotation, or tap its name to pick another) and start it in one tap; your month at a glance; weekly volume; today's protein against your daily target.
- Custom workout templates: pick exercises, sets and rep ranges; any split (push/pull/legs, upper/lower, full body, custom). Custom exercises.
- Fast set, rep and weight logging.
- Rest timer with haptic feedback that keeps counting on the Lock Screen and in the Dynamic Island.
- Recovery tab: a body map colours every muscle by how recovered it is after your workouts (fresh, recovering, or still sore/fatigued) and suggests the workout that fits best today. You can share your training week as a card.
- Diet tab: type what you ate in plain words ("2 eggs and toast") and AI estimates calories, protein, carbs and fat. Your daily protein target is set from your body weight (the app uses 1.6 g per kg); the dashboard shows how your week is going.
- Progress: strength charts for every exercise; body-weight tracking with a chart.
- kg or lbs.
- Syncs across your iPhones; Sign in with Apple, Google, or email; 12 languages (including Hindi).
- Privacy: training data is not sold or used for advertising. Meal descriptions are sent to OpenAI only to estimate nutrition. Delete your account and data from inside the app.
- Pricing: subscription required. Monthly US$2.99 with a 3-day free trial for new subscribers, or Yearly US$29.99 with a 7-day free trial. There is NO lifetime purchase any more. Prefer "free trial" over quoting prices; if you quote them, say they are US prices.
- Do NOT claim: notes field, RPE/RIR logging, supersets, plate calculator, warm-up set tagging, 1RM estimates, Apple Watch, Android, social features, AI coaching or AI-generated workouts, photo-based meal logging, barcode scanning, data import/export, automatic deloads.
