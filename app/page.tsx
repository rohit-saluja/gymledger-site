import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/app-store-button";
import { PhoneFrame } from "@/components/phone-frame";
import { WhiteboardHero } from "@/components/home/whiteboard-hero";
import { RestTimer } from "@/components/home/rest-timer";
import { WriteOn } from "@/components/board/write-on";
import { ArrowRight, CheckBox, Tick, Underline } from "@/components/board/marks";
import { APP_STORE_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { JsonLd } from "@/components/blog/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ALSO = [
  ["Custom workouts and exercises", "Any split: PPL, upper/lower, full body", "kg or lbs", "Syncs across your iPhones"],
  ["Available in 12 languages, including Hindi", "Sign in with Apple, Google or email", "Your data isn't sold or used for ads", "Delete your account inside the app"],
];

const heading = "marker text-[clamp(2.5rem,5.2vw,4.25rem)] text-ink";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: "GymLedger - Workout Tracker",
            operatingSystem: "iOS",
            applicationCategory: "HealthApplication",
            description:
              "A workout tracker for iPhone: custom splits, fast set logging, a rest timer on the Lock Screen and Dynamic Island, a recovery body map, AI meal logging with a protein target, and progress charts.",
            url: SITE_URL,
            installUrl: APP_STORE_URL,
            downloadUrl: APP_STORE_URL,
            image: `${SITE_URL}/images/app-icon.png`,
            screenshot: ["home", "session", "recovery", "diet", "progress"].map((s) => `${SITE_URL}/app/${s}@1.5x.webp`),
            featureList: [
              "Custom workout templates for any split",
              "Fast set, rep and weight logging",
              "Rest timer on the Lock Screen and in the Dynamic Island",
              "Recovery body map with a daily workout pick",
              "AI meal logging with calories, protein, carbs and fat",
              "Strength and body-weight progress charts",
            ],
            offers: [
              { "@type": "Offer", name: "Monthly", price: "2.99", priceCurrency: "USD" },
              { "@type": "Offer", name: "Yearly", price: "29.99", priceCurrency: "USD" },
            ],
            publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/images/app-icon.png`,
            email: "support@getgymledger.com",
            sameAs: [APP_STORE_URL],
          },
          { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        ]}
      />

      <WhiteboardHero>
        <h1 id="hero-title" className="text-balance text-[clamp(2.125rem,3.6vw,3.25rem)] font-extrabold leading-[1.03] tracking-[-0.025em] text-ink">
          The workout tracker that knows what to train today.
        </h1>
        <p className="mt-4 max-w-[33rem] text-pretty text-lg leading-relaxed text-ink-2 md:text-[1.1875rem]">
          Log sets in a tap, see which muscles have recovered, and keep your protein on target. Built for iPhone.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <AppStoreButton />
          <p className="note text-[1.1875rem] leading-tight text-blue">
            free trial: 3 days monthly,
            <br />7 days yearly
          </p>
        </div>
      </WhiteboardHero>

      {/* Recovery: the body map and a countdown written beside it */}
      <section aria-labelledby="recovery-title" className="relative pb-24 pt-16 md:py-32">
        <span aria-hidden className="ghost-writing marker absolute right-[6%] top-10 hidden -rotate-6 text-[9rem] lg:block">
          5×5
        </span>
        <div className="container grid items-center gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <PhoneFrame
              screen="recovery"
              alt="GymLedger's Recovery tab: a front and back body map with shoulders fatigued, chest recovering and legs fresh, and 'Legs fits best today'"
              magnets={["blue", "red"]}
              className="w-[min(72vw,290px)] -rotate-2"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <WriteOn as="h2" className={heading}>
              <span id="recovery-title">
                Train what&apos;s{" "}
                <span className="relative inline-block">
                  recovered.
                  <Underline className="absolute -bottom-3 left-0 h-4 w-full text-red" />
                </span>
              </span>
            </WriteOn>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-2">
              The Recovery tab colours every muscle fresh, recovering or fatigued from your logged workouts, then suggests the workout that fits best today.
            </p>
            <dl className="mt-9 max-w-md space-y-3 text-[1.25rem] leading-tight sm:text-[1.5rem]">
              <div className="grid grid-cols-[6.75rem_1fr] items-baseline sm:grid-cols-[8.5rem_1fr]">
                <dt className="marker text-ink">Shoulders</dt>
                <dd className="note text-red-ink">fresh tomorrow, in 22 h</dd>
              </div>
              <div className="grid grid-cols-[6.75rem_1fr] items-baseline sm:grid-cols-[8.5rem_1fr]">
                <dt className="marker text-ink">Chest</dt>
                <dd className="note text-ink-2">recovering, give it a day</dd>
              </div>
              <div className="grid grid-cols-[6.75rem_1fr] items-baseline sm:grid-cols-[8.5rem_1fr]">
                <dt className="marker text-ink">Legs</dt>
                <dd className="note flex items-center gap-2 text-green-ink">
                  fresh now, train today <Tick className="w-7 text-green" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Rest timer: the Live Activity counting down */}
      <section aria-labelledby="rest-title" className="relative overflow-hidden pt-20 md:pt-24">
        <div className="container text-center">
          <WriteOn as="h2" className={heading}>
            <span id="rest-title">Rest, then lift.</span>
          </WriteOn>
          <p className="mx-auto mt-6 max-w-[36rem] text-lg leading-relaxed text-ink-2">
            The rest timer buzzes when it&apos;s time, and keeps counting on your Lock Screen and in the Dynamic Island while your phone is in your pocket.
          </p>
          <div className="mt-12">
            <RestTimer />
          </div>
        </div>
      </section>

      {/* Protein: a meal typed in plain words, and the day's tally */}
      <section aria-labelledby="protein-title" className="relative pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="container grid items-center gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <WriteOn as="h2" className={heading}>
              <span id="protein-title">Protein, in plain words.</span>
            </WriteOn>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-2">
              Type what you ate, like &ldquo;2 eggs and toast&rdquo;. AI estimates the calories, protein, carbs and fat. Your daily protein target comes from your body weight.
            </p>

            <div className="mt-10 max-w-xl">
              <p className="note text-[1.5rem] leading-snug text-blue md:text-[1.75rem]">&ldquo;Greek yogurt with berries and granola&rdquo;</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <ArrowRight className="w-16 text-blue" />
                <span className="marker text-[2.5rem] text-ink">410 kcal</span>
                <span className="note flex gap-4 text-[1.375rem] text-ink-2">
                  <span>P 28 g</span>
                  <span>C 52 g</span>
                  <span>F 9 g</span>
                </span>
              </div>
              <ol className="note mt-10 max-w-md text-[1.375rem] leading-snug text-ink" aria-label="Today's meals, an example from the Diet screen">
                <li className="flex justify-between gap-4 border-b-2 border-ink/10 py-1.5"><span>Greek yogurt bowl</span><span className="marker">28 g</span></li>
                <li className="flex justify-between gap-4 border-b-2 border-ink/10 py-1.5"><span>Chicken burrito bowl</span><span className="text-ink-3">+</span></li>
                <li className="flex justify-between gap-4 border-b-[3px] border-ink/70 py-1.5"><span>Whey shake with a banana</span><span className="text-ink-3">+</span></li>
                <li className="flex items-baseline justify-between gap-4 pt-2">
                  <span className="marker text-[1.75rem]">so far</span>
                  <span className="marker text-[clamp(2.75rem,6vw,3.5rem)] text-red">106 g</span>
                </li>
              </ol>
              <p className="note mt-1 max-w-md text-right text-[1.25rem] text-blue">of 135 g, 29 g to go (1.6 g per kg)</p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <PhoneFrame
              screen="diet"
              alt="GymLedger's Diet tab: 1,355 kcal today with 106 g of 135 g protein, and meals like Greek yogurt with berries and granola"
              magnets={["black", "blue"]}
              className="w-[min(72vw,290px)] rotate-[1.5deg]"
            />
          </div>
        </div>
      </section>

      {/* Progress: a PR board with the progress screen held over its corner */}
      <section aria-labelledby="progress-title" className="relative pb-24 md:pb-32">
        <div className="container">
          <WriteOn as="h2" className={heading}>
            <span id="progress-title">Watch the numbers climb.</span>
          </WriteOn>
          <p className="mt-7 max-w-[36rem] text-lg leading-relaxed text-ink-2">
            Strength charts for every exercise and a body-weight chart, so you can spot a stall weeks before it costs you a month.
          </p>

          <div className="relative mt-12 lg:mt-16">
            <div className="max-w-[44rem] rounded-[6px] border-[3px] border-ink/85 px-6 pb-7 pt-5 md:px-10 md:pb-10 md:pt-7 lg:mr-[18rem]">
              <p className="marker text-[2.25rem] uppercase text-red md:text-[2.75rem]">PR board</p>
              <table className="mt-4 w-full text-left">
                <caption className="sr-only">Example numbers from the progress screen</caption>
                <thead>
                  <tr className="plate-label text-[0.8125rem] text-ink-3">
                    <th className="pb-2 font-semibold">Lift</th>
                    <th className="pb-2 font-semibold">Best</th>
                    <th className="hidden pb-2 font-semibold sm:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody className="text-[1.625rem] md:text-[2rem]">
                  <tr className="border-t-2 border-ink/15">
                    <td className="marker py-3 text-ink">Squat</td>
                    <td className="marker py-3 text-ink">122.5 kg</td>
                    <td className="note hidden py-3 text-[1.25rem] text-green-ink sm:table-cell">new PR</td>
                  </tr>
                  <tr className="border-t-2 border-ink/15">
                    <td className="marker py-3 text-ink">Body weight</td>
                    <td className="marker py-3 text-ink">83 kg</td>
                    <td className="note hidden py-3 text-[1.25rem] text-ink-2 sm:table-cell">+1.2 kg</td>
                  </tr>
                  <tr className="border-t-2 border-ink/15">
                    <td className="marker py-3 text-ink">Sessions</td>
                    <td className="marker py-3 text-ink">42</td>
                    <td className="note hidden py-3 text-[1.25rem] text-ink-2 sm:table-cell">since July</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-12 lg:absolute lg:right-6 lg:top-[-4.5rem] lg:mt-0 xl:right-14">
              <PhoneFrame
                screen="progress"
                alt="GymLedger's progress screen: body weight at 83 kg, up 1.2 kg, and a squat chart climbing to 122.5 kg"
                magnets={["red", "black"]}
                className="w-[min(72vw,280px)] rotate-[3deg]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Everything else, as a ticked list */}
      <section aria-labelledby="also-title" className="relative py-24 md:py-28">
        <div className="container">
          <WriteOn as="h2" className={heading}>
            <span id="also-title">Also in the app.</span>
          </WriteOn>
          <div className="mt-10 grid max-w-4xl gap-x-16 gap-y-5 md:grid-cols-2">
            {ALSO.map((col, i) => (
              <ul key={i} className="space-y-5">
                {col.map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <CheckBox className="size-9 shrink-0 text-ink" />
                    <span className="note text-[1.5rem] leading-tight text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Prices, written up large */}
      <section aria-labelledby="price-title" className="relative py-24 md:py-32">
        <span aria-hidden className="ghost-writing marker absolute left-[52%] top-16 hidden rotate-3 text-[11rem] uppercase lg:block">
          Legs
        </span>
        <div className="container">
          <WriteOn as="h2" className={heading}>
            <span id="price-title">What it costs.</span>
          </WriteOn>
          <div className="mt-12 grid max-w-3xl gap-12 sm:grid-cols-2">
            <div>
              <p className="marker text-[clamp(3.5rem,7vw,5.25rem)] text-ink">US$2.99</p>
              <p className="mt-2 text-xl font-semibold text-ink">a month</p>
              <p className="note mt-1 text-[1.375rem] text-blue">3-day free trial</p>
            </div>
            <div>
              <p className="marker text-[clamp(3.5rem,7vw,5.25rem)] text-ink">US$29.99</p>
              <p className="mt-2 text-xl font-semibold text-ink">a year</p>
              <p className="note mt-1 text-[1.375rem] text-blue">7-day free trial</p>
            </div>
          </div>
          <p className="mt-10 max-w-[38rem] text-[0.9375rem] leading-relaxed text-ink-3">
            Prices are in US dollars. The App Store shows your local price before you buy. Free trials are for new subscribers, and you can cancel any time in your App Store settings.
          </p>
          <AppStoreButton className="mt-8" />
        </div>
      </section>

      {/* Guides: printed sheets held up by magnets */}
      {posts.length > 0 && (
        <section aria-labelledby="guides-title" className="relative py-24 md:py-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <WriteOn as="h2" className={heading}>
                <span id="guides-title">Lifting guides.</span>
              </WriteOn>
              <Link href="/blog" className="link-ink mb-2 text-lg">
                All guides
              </Link>
            </div>
            <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {posts.map((post, i) => (
                <li key={post.slug} className={["md:-rotate-1", "md:rotate-[0.8deg] md:translate-y-4", "md:-rotate-[0.5deg]"][i]}>
                  <Link href={`/blog/${post.slug}`} className="sheet press group block h-full p-3 pb-5">
                    <span aria-hidden className={i % 2 ? "magnet magnet--blue" : "magnet"} style={{ top: -10, left: "calc(50% - 15px)" }} />
                    {post.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt="" width={1600} height={1000} loading="lazy" decoding="async" className="aspect-[16/10] w-full rounded-[3px] object-cover" />
                    )}
                    <span className="mt-4 block px-2 text-lg font-bold leading-snug text-ink group-hover:underline group-hover:decoration-red/60 group-hover:decoration-2 group-hover:underline-offset-4">
                      {post.h1}
                    </span>
                    <span className="mt-2 block px-2 text-sm text-ink-3">
                      {post.category}, {post.readingMinutes} min read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* The close */}
      <section aria-labelledby="close-title" className="relative overflow-hidden py-28 md:py-36">
        <span aria-hidden className="ghost-writing marker absolute left-[8%] top-12 hidden -rotate-3 text-[10rem] uppercase md:block">
          Push
        </span>
        <div className="container relative text-center">
          <WriteOn as="h2" className="marker text-[clamp(3rem,8vw,6.5rem)] text-ink">
            <span id="close-title">
              See you at the <span className="text-red">gym.</span>
            </span>
          </WriteOn>
          <p className="mx-auto mt-6 max-w-[30rem] text-lg text-ink-2">
            Open GymLedger and today&apos;s workout is already on top. Free trial for new subscribers.
          </p>
          <div className="mt-9 flex justify-center">
            <AppStoreButton />
          </div>
        </div>
      </section>
    </>
  );
}
