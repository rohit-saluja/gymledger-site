# Keyword research, 27 November 2026 (DataForSEO)

Low-competition keywords for getgymledger.com, checked against Google's top 10, grouped into clusters, and turned into the content plan in [`content-plan.md`](content-plan.md). Market: Google, United States, English.

**Cost: $0.87 of DataForSEO credit** (budget was $3), over 201 API calls. Balance before: $43.76.

## How the data was pulled

| Step | Endpoint | Cost |
| --- | --- | --- |
| Keywords that six competitor sites rank for (hevyapp.com, boostcamp.app, setgraph.app, lyfta.app, fitbod.me, strengthlog.com), volume ≥ 100, difficulty ≤ 30, top 30, exercise-library pages excluded | `dataforseo_labs/google/ranked_keywords` | $0.25 |
| Suggestions for 16 product seeds (progressive overload, workout split, push pull legs, upper lower, muscle recovery, rest day, how much protein, workout log, workout tracker, rest between sets, deload, sore muscles, sets per week, gym routine, protein intake, bulking), same filters | `dataforseo_labs/google/keyword_suggestions` | $0.39 |
| Related ideas for 15 app-shaped seeds | `dataforseo_labs/google/keyword_ideas` | $0.07 |
| Volumes for the existing posts' target keywords and 25 more ideas | `dataforseo_labs/google/keyword_overview` | $0.02 |
| Google top 10 for 129 shortlisted keywords: stored snapshots from September to November 2026 (wider window for 16 with no recent snapshot) | `dataforseo_labs/google/historical_serps` | $0.02 |
| Live Google top 10 for the 13 keywords with no stored snapshot | `serp/google/organic/live/regular` | $0.03 |
| Domain rank (0–100) and estimated US organic traffic for all 363 domains in those top 10s | `backlinks/bulk_ranks`, `dataforseo_labs/google/bulk_traffic_estimation` | $0.09 |

The live SERP API returned only google.com links for all 13 keywords and reported under 100 total results each. Those keywords are marked **no data** and were not used. The same problem was seen in the active-recalling research on 24 November 2026; the stored Labs snapshots are reliable.

## Filters

1. **Traffic and competition:** volume ≥ 100 a month and DataForSEO keyword difficulty ≤ 30 (a few app keywords above 30 were kept because their SERPs are weak).
2. **Product fit:** the keyword maps to something GymLedger does or a lifter using it would ask: logging, progressive overload, splits and programs, sets and rest, recovery and soreness, protein and bulking/cutting, workout apps. Removed: exercise how-tos, cardio and race plans, supplements, injuries, food-by-food protein counts, brand navigation.
3. **SERP check** of each keyword's top 10. A result is **weak** when it is a forum (Reddit, Quora, Facebook, TikTok, Instagram, `/forum/`), a user-generated page (Medium, Pinterest, LinkedIn, Scribd, Canva, Etsy, Amazon listings), or **low authority** (domain rank < 30, or < 5,000 US visits a month on a domain ranked below 60). A **big brand** is a domain ranked ≥ 60 with ≥ 1M US visits a month. YouTube counts as neither.

   | Verdict | Rule |
   | --- | --- |
   | pass | ≥ 4 weak results in the top 10 and ≥ 2 in the top 5 |
   | borderline | ≥ 3 weak in the top 10 and ≤ 2 big brands |
   | drop | everything else (strong SERP or big brands) |

   Only pass and borderline keywords were kept. Keywords whose top 10 is held by big brands or high-authority sites were dropped, e.g. "how often should you weigh yourself" (AHA, Healthline, GoodRx, NIH, WebMD), "how much rest between sets" (PubMed, Healthline), "gym workout plan for beginners" (Planet Fitness, Gold's Gym, Women's Health).

Result: **57 pass, 29 borderline, 29 dropped, 14 no data** out of 129 checked.

## Files

| File | What it holds |
| --- | --- |
| `content-plan.md` | Clusters, the 16 new posts with publish dates, the 10 updated posts, and the internal-link map |
| `serp_analysis.csv` | Every checked keyword: volume, difficulty, snapshot date, weak/big-brand counts, verdict, and the scored top 10 |
| `top_urls_by_keyword.txt` | Top-8 URLs for each primary keyword, used for tone and gap research before writing |
| `keywords_relevant.csv` | 769 product-fit keyword groups with volume, difficulty, topic tag and close variants |
| `keywords_all.csv` | All 3,353 keywords returned |
| `domains.csv` | Rank and US organic traffic for every domain in the checked top 10s |

## Caveats

- Volumes are Google Ads figures; close variants share one number. Treat a cluster total as an upper bound.
- Difficulty is DataForSEO's 0–100 score, not Ahrefs KD.
- Health-adjacent keywords ("sore muscles after workout", "protein how much is too much") pass on the numbers, but hospital pages rank there. Those posts must stay practical, cite primary sources, and avoid medical claims.
- getgymledger.com is a young domain. Low-competition SERPs give it a chance; they do not guarantee rankings.
