import Link from "next/link";
import {
  Apple,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Dumbbell,
  Moon,
  Scale,
  ShieldCheck,
  Timer,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneFrame } from "@/components/phone-frame";

const SHOTS = [
  { src: "/screenshots/01.png", alt: "GymLedger home", title: "Home", caption: "Your next session, one tap away." },
  { src: "/screenshots/02.png", alt: "Workout logging", title: "Log a set", caption: "Weight, reps, done." },
  { src: "/screenshots/03.png", alt: "Exercise list", title: "Your split", caption: "Every lift, in order." },
  { src: "/screenshots/04.png", alt: "Session complete", title: "Finish strong", caption: "Close the session, keep the streak." },
  { src: "/screenshots/05.png", alt: "Progress chart", title: "Progress", caption: "Watch the numbers climb." },
  { src: "/screenshots/06.png", alt: "PR milestones", title: "Milestones", caption: "Every PR, stamped with a date." },
  { src: "/screenshots/07.png", alt: "Weekly schedule", title: "Weekly plan", caption: "Show up ready." },
  { src: "/screenshots/08.png", alt: "Exercise detail", title: "Exercise", caption: "History and notes, all in one place." },
  { src: "/screenshots/09.png", alt: "Settings", title: "Preferences", caption: "kg · lbs · your rules." },
  { src: "/screenshots/10.png", alt: "Body weight log", title: "Body log", caption: "Track weight, not macros." },
];

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Quick set logging",
    desc: "Tap the weight, tap the reps, move on. No menus, no modals, no friction.",
  },
  {
    icon: Timer,
    title: "Rest timer built-in",
    desc: "Auto-starts the moment a set is done. Haptic tap when it's time to lift again.",
  },
  {
    icon: BarChart3,
    title: "Progress you can see",
    desc: "Personal bests, volume, and monthly gains — all charted, all at a glance.",
  },
  {
    icon: CalendarDays,
    title: "Custom splits",
    desc: "Push/pull/legs, upper/lower, full-body — or build your own. The app adapts.",
  },
  {
    icon: Trophy,
    title: "PR milestones",
    desc: "Every new personal best is stamped with the date you earned it.",
  },
  {
    icon: Scale,
    title: "kg or lbs. Your call.",
    desc: "Switch units any time. Bodyweight tracking supports both too.",
  },
  {
    icon: Moon,
    title: "Dark by default",
    desc: "Designed for gym lighting. Easy on the eyes between sets.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "No ads. No trackers. Your workouts are yours — synced only to your account.",
  },
];

const APP_STORE_URL = "https://apps.apple.com/app/gymledger";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-32 h-[40rem] bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--brand)/0.18),transparent_70%)]"
        />
        <div className="container relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Now on the App Store
            </span>

            <h1 className="mt-6 text-balance text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
              Log every lift.
              <br />
              <em className="not-italic text-brand">Own every gain.</em>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-fg-secondary md:text-lg">
              GymLedger is a workout tracker for lifters who'd rather train than tap.
              Quick to log, ruthless about tracking progress, and dark by default.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="primary">
                <a href={APP_STORE_URL} aria-label="Download GymLedger on the App Store">
                  <Apple className="size-4" />
                  Download for iOS
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="#features">
                  See features
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto mt-14 max-w-md md:mt-20">
            <PhoneFrame src="/screenshots/01.png" alt="GymLedger home screen" priority />
          </div>
        </div>
      </section>

      <section id="screens" aria-labelledby="shots-heading" className="border-t border-border-subtle/60 py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="shots-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
              See it in the gym
            </h2>
            <p className="mt-3 text-fg-secondary">Ten taps from warm-up set to PR. Scroll for a tour.</p>
          </div>

          <div
            role="region"
            aria-label="App screenshots"
            tabIndex={0}
            className="mt-12 -mx-5 overflow-x-auto px-5 pb-6 [scrollbar-width:thin] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
          >
            <div className="flex w-max gap-6 md:gap-8">
              {SHOTS.map((shot) => (
                <figure key={shot.src} className="w-[220px] shrink-0 md:w-[260px]">
                  <PhoneFrame src={shot.src} alt={shot.alt} />
                  <figcaption className="mt-4 text-center text-sm leading-tight">
                    <strong className="block font-semibold text-foreground">{shot.title}</strong>
                    <span className="text-fg-muted">{shot.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <p aria-hidden className="mt-4 flex items-center justify-center gap-2 text-xs text-fg-muted">
            <ArrowRight className="size-3.5" />
            Scroll to see more
          </p>
        </div>
      </section>

      <section id="features" className="border-t border-border-subtle/60 py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Made for the set between the sets
            </h2>
            <p className="mt-3 text-fg-secondary">
              Everything a lifter needs. Nothing a lifter doesn't.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:bg-surface-hover">
                <CardHeader>
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-border bg-bg-subtle text-brand">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle className="mt-3">{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle/60 py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-bg-subtle/60 p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Start the next session the right way
            </h2>
            <p className="mt-3 text-fg-secondary">
              Free to download. Sign in with Apple or Google and you're logging in under a minute.
            </p>
            <div className="mt-7 flex justify-center">
              <Button asChild size="lg" variant="primary">
                <a href={APP_STORE_URL}>
                  <Apple className="size-4" />
                  Download GymLedger
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
