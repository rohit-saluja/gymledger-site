# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Lifters who train in a gym several times a week and want to keep getting stronger: from beginners following their first split to intermediates running push/pull/legs or upper/lower. They read this site on their phone or laptop while deciding which workout app to use, or while looking up a training question (progressive overload, rest times, recovery, protein). The job: pick a tracker that keeps up with them between sets and tells them what to train next.

## Product Purpose

getgymledger.com sells the GymLedger iPhone app and earns search traffic through training guides. Success is a visitor tapping through to the App Store, or a reader of a guide recognising the app as the tool that does what the guide describes.

## Positioning

One iPhone app for the whole training loop: log sets, see which muscles have recovered, and hit a daily protein target. Workout logging is the core; recovery and meals feed it. The recovery body map that colours each muscle fresh, recovering or fatigued and suggests today's best workout is the mechanism a plain workout log does not have.

## Operating Context

- The app is used in the gym between sets, one-handed, often in poor light; the rest timer keeps running on the Lock Screen and Dynamic Island.
- The site is a static Next.js export served from Cloudflare (Workers static assets) on www.getgymledger.com, deployed with `npm run deploy` (wrangler) from the owner's Mac.
- The blog (content/blog/*.md) is the main acquisition channel. Google and Bing search consoles are verified by meta tags in app/layout.tsx.

## Capabilities and Constraints

Source of truth for app claims: ~/projects/bodybuilding-metric/fastlane/metadata/en-US/description.txt (GymLedger 2.0).

- Dashboard: today's workout (next in rotation, or pick another) with one-tap start; month at a glance; weekly volume; today's protein against target.
- Custom workout templates: exercises, sets and rep ranges; any split (push/pull/legs, upper/lower, full body, custom); custom exercises.
- Fast set, rep and weight logging; rest timer with haptics that keeps counting on the Lock Screen and in the Dynamic Island.
- Recovery tab: body map colours every muscle fresh / recovering / fatigued, suggests the workout that fits best today; share your training week as a card.
- Diet tab: type a meal in plain words ("2 eggs and toast"); AI (OpenAI) estimates calories, protein, carbs and fat. Daily protein target set from body weight.
- Progress: per-exercise strength charts, body-weight chart.
- kg or lbs. Syncs across the user's iPhones. Sign in with Apple, Google or email. 12 languages. iPhone only.
- Pricing: subscription required. Monthly US$2.99 with a 3-day free trial for new subscribers; Yearly US$29.99 with a 7-day free trial. Local prices shown in the App Store. There is no Lifetime plan any more.
- Do not claim: Apple Watch, Android, social feed, AI coaching, RPE/RIR fields, supersets, plate calculator, 1RM estimates, data import/export, notes field.
- App Store id 6762124792.

## Brand Commitments

- Name: GymLedger (App Store name "GymLedger - Workout Tracker"). App icon at public/images/app-icon.png.
- The app's red is kept on the site. Everything else about the site's look is open to reinvention.
- Voice: direct, practical, coach-to-lifter. No hype, no fake urgency.

## Evidence on Hand

- Real app screenshots of GymLedger 2.0 (captured 2026-11-20, 1206×2622): dashboard, workout session, recovery map, diet, progress, workout editor. Source: ~/projects/bodybuilding-metric/appstore-screenshots/public/screenshots/apple/iphone/en/.
- Prices above may be shown.
- No App Store rating, review count, download or user numbers are to be shown. No testimonials, press or customer logos exist; none may be invented.

## Product Principles

1. Show the app doing the job; real screenshots beat adjectives.
2. Training comes first; recovery and food exist to make the next session better.
3. Never claim a feature the App Store description does not list.
4. Respect the reader's time, on the site as in the gym.
