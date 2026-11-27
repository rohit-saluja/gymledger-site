"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneFrame, screenSrc, type Screen } from "@/components/phone-frame";
import { ArrowLeft, Loop } from "@/components/board/marks";
import { cn } from "@/lib/utils";

type Note = { text: string; y: number };
type Day = { word: string; screen: Screen; alt: string; notes: [Note, Note] };

// The rotation the board cycles through. Screens are real GymLedger 2.0
// captures; the notes point at what is on them.
const DAYS: Day[] = [
  {
    word: "Pull",
    screen: "home",
    alt: "GymLedger dashboard: today's workout is Pull, with weekly stats and today's protein against a 135 g target",
    notes: [
      { text: "next in your rotation", y: 17 },
      { text: "today's protein vs. target", y: 64 },
    ],
  },
  {
    word: "Legs",
    screen: "edit-workout",
    alt: "Editing the Legs workout in GymLedger: squat 5 by 5, Romanian deadlift 4 by 8, leg press 4 by 10",
    notes: [
      { text: "your sets, your reps", y: 34 },
      { text: "add any exercise", y: 69 },
    ],
  },
  {
    word: "Push",
    screen: "session",
    alt: "A Push session in GymLedger: bench press and overhead press sets done, incline bench press in progress",
    notes: [
      { text: "13 of 21 sets done", y: 19 },
      { text: "tap a set when it's done", y: 37 },
    ],
  },
];

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";

/** clip-path that shows the word only to the left of `x` px. */
const clipAt = (x: number, width: number) => `inset(-25% ${Math.max(0, width - x)}px -25% -6%)`;

export function WhiteboardHero({ children }: { children: React.ReactNode }) {
  const [day, setDay] = useState(0);
  const [ghost, setGhost] = useState<string | null>("Push"); // yesterday, half wiped
  const [announce, setAnnounce] = useState("");
  const wordRef = useRef<HTMLSpanElement>(null);
  const eraserRef = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);
  const justDragged = useRef(false);
  const drag = useRef<{ startX: number; lastX: number; lastT: number; v: number; moved: boolean; width: number } | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const width = () => wordRef.current?.getBoundingClientRect().width ?? 0;

  /** Put the eraser and the word back at rest. */
  const settle = useCallback((animate: boolean) => {
    const word = wordRef.current;
    const eraser = eraserRef.current;
    if (!word || !eraser) return;
    const w = width();
    if (animate && !reduced.current) {
      eraser.animate([{ transform: eraser.style.transform || "none" }, { transform: "translateX(0) rotate(0deg)" }], { duration: 220, easing: EASE_OUT });
      word.animate([{ clipPath: word.style.clipPath || clipAt(w, w) }, { clipPath: clipAt(w + 40, w) }], { duration: 220, easing: EASE_OUT });
    }
    eraser.style.transform = "";
    word.style.clipPath = "";
  }, []);

  /** Finish wiping from wherever the eraser is, then write the next day in. */
  const commit = useCallback(
    (target?: number) => {
      const word = wordRef.current;
      const eraser = eraserRef.current;
      if (!word || !eraser || busy.current) return;
      busy.current = true;
      const w = width();
      const next = target ?? (day + 1) % DAYS.length;
      const finish = () => {
        setGhost(DAYS[day].word);
        setDay(next);
        setAnnounce(`Showing the ${DAYS[next].word} day`);
        eraser.style.transform = "";
        word.style.clipPath = "";
        if (!reduced.current) {
          // The new word writes itself in, and the eraser drops back onto the board.
          requestAnimationFrame(() => {
            word.animate([{ clipPath: clipAt(0, w) }, { clipPath: clipAt(w + 40, w) }], { duration: 760, easing: EASE_OUT });
            eraser.animate(
              [
                { opacity: 0, transform: "translateY(-10px) rotate(-4deg)" },
                { opacity: 1, transform: "translateY(0) rotate(0deg)" },
              ],
              { duration: 320, delay: 380, easing: EASE_OUT, fill: "backwards" }
            );
          });
        }
        window.setTimeout(() => (busy.current = false), reduced.current ? 0 : 760);
      };
      if (reduced.current) return finish();

      // Eraser travels from its current spot to past the word's left edge.
      const from = eraser.style.transform || "translateX(0) rotate(0deg)";
      const startClip = word.style.clipPath || clipAt(w + 40, w);
      const travel = -(w + eraser.offsetWidth * 0.6);
      const remaining = drag.current ? 260 : 620;
      const easing = drag.current ? EASE_OUT : EASE_IN_OUT;
      eraser.animate([{ transform: from }, { transform: `translateX(${travel}px) rotate(-3deg)` }], { duration: remaining, easing, fill: "forwards" });
      const anim = word.animate([{ clipPath: startClip }, { clipPath: clipAt(0, w) }], { duration: remaining, easing, fill: "forwards" });
      anim.onfinish = () => {
        eraser.getAnimations().forEach((a) => a.cancel());
        word.getAnimations().forEach((a) => a.cancel());
        finish();
      };
    },
    [day]
  );

  // Dragging: the eraser follows the pointer to the left; the word is wiped
  // up to the eraser's leading edge. Released past halfway, or flicked, it commits.
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (busy.current || e.button !== 0 || drag.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false, width: width() };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    const word = wordRef.current;
    const eraser = eraserRef.current;
    if (!d || !word || !eraser) return;
    let dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    // Friction to the right of the resting spot, free travel to the left.
    if (dx > 0) dx = dx * 0.25;
    const min = -(d.width + eraser.offsetWidth * 0.6);
    if (dx < min) dx = min + (dx - min) * 0.2;
    const now = performance.now();
    d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT);
    d.lastX = e.clientX;
    d.lastT = now;
    eraser.style.transform = `translateX(${dx}px) rotate(${Math.max(-4, dx / 60)}deg)`;
    // The eraser's leading edge sits about 12px into the word's right end at rest.
    word.style.clipPath = clipAt(d.width + 12 + dx, d.width);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!d.moved) {
      drag.current = null;
      return; // a plain press: handled by onClick
    }
    justDragged.current = true; // the click that follows this pointerup is not a press
    const dx = e.clientX - d.startX;
    const progress = -dx / d.width;
    if (progress > 0.45 || d.v < -0.5) {
      commit();
    } else {
      settle(true);
    }
    drag.current = null;
  };

  const onClick = (e: React.MouseEvent) => {
    // Keyboard and plain clicks wipe the whole word in one stroke.
    e.preventDefault();
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    commit();
  };

  const current = DAYS[day];
  const nextWord = DAYS[(day + 1) % DAYS.length].word;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="board-sheen" aria-hidden />
      <div className="container relative grid gap-y-12 pb-10 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:gap-x-8 lg:pb-24 lg:pt-12">
        <div className="lg:col-span-7">
          <p className="marker -rotate-2 text-[2rem] text-ink md:text-[2.5rem]" aria-hidden>
            Today:
          </p>

          <div className="relative mt-4 flex flex-col items-start sm:inline-flex sm:flex-row sm:items-end md:mt-6">
            {ghost && (
              <span aria-hidden className="ghost-writing marker absolute left-[0.12em] top-[0.12em] text-[clamp(5.5rem,14vw,12.5rem)] uppercase">
                {ghost}
              </span>
            )}
            <span
              ref={wordRef}
              aria-hidden
              className="marker relative block whitespace-nowrap pr-[0.04em] text-[clamp(7.5rem,18vw,16rem)] uppercase leading-[0.86] text-red"
            >
              {current.word}
            </span>
            <button
              ref={eraserRef}
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                drag.current = null;
                settle(true);
              }}
              onClick={onClick}
              aria-label={`Wipe the board and show the ${nextWord} day`}
              className="group relative -mt-2 mr-2 shrink-0 self-end sm:self-auto sm:mb-[0.6em] sm:ml-1 sm:mr-0 sm:mt-0 touch-none select-none rounded-[7px] focus-visible:outline-offset-4 md:ml-2"
              style={{ cursor: "grab" }}
            >
              <Eraser />
              <span className="note pointer-events-none absolute right-0 top-full mt-2 w-max text-[0.9375rem] text-blue md:left-1/2 md:right-auto md:-translate-x-1/2 md:text-[1.0625rem]">
                drag to wipe
              </span>
            </button>
          </div>

          <div className="mt-5 flex items-center gap-1" role="group" aria-label="Pick a day">
            {DAYS.map((d, i) => (
              <button
                key={d.word}
                type="button"
                aria-pressed={i === day}
                onClick={() => i !== day && commit(i)}
                className={cn(
                  "note press relative px-3 py-1 text-[1.375rem] transition-colors",
                  i === day ? "text-ink" : "text-ink-3 hover:text-ink"
                )}
              >
                {d.word}
                {i === day && <Loop className="pointer-events-none absolute -inset-x-1 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+8px)] text-red" />}
              </button>
            ))}
          </div>

          <div className="mt-10 max-w-[38rem]">{children}</div>
        </div>

        <div className="relative lg:col-span-5 lg:pt-6">
          <div className="relative mx-auto w-[min(76vw,300px)] rotate-[2.5deg] lg:ml-4 lg:mr-auto xl:w-[312px]">
            <PhoneFrame magnets={["red", "black"]}>
              {DAYS.map((d, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={d.screen}
                  {...screenSrc(d.screen)}
                  sizes="(max-width: 1024px) 76vw, 312px"
                  alt={i === day ? d.alt : ""}
                  aria-hidden={i !== day}
                  width={640}
                  height={1391}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-300 ease-out",
                    i === day ? "opacity-100 blur-0" : "opacity-0 blur-[3px]"
                  )}
                />
              ))}
            </PhoneFrame>

            {/* The coach's notes, pointing at the screen */}
            {current.notes.map((n) => (
              <p
                key={`${current.word}-${n.text}`}
                className="note absolute left-[calc(100%+0.75rem)] hidden w-44 -translate-y-1/2 animate-in fade-in text-[1.1875rem] leading-tight text-blue duration-500 xl:block"
                style={{ top: `${n.y}%` }}
              >
                <ArrowLeft className="absolute -left-[3.25rem] top-1/2 w-14 -translate-y-[70%]" />
                {n.text}
              </p>
            ))}
          </div>
          <p key={current.word} className="note mt-6 animate-in fade-in text-center text-[1.1875rem] text-blue duration-500 xl:hidden">
            {current.notes[0].text}
          </p>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </section>
  );
}

/** A magnetic whiteboard eraser: felt pad, dark handle, a label. */
function Eraser() {
  return (
    <span className="block w-[4.25rem] md:w-[6.5rem]" aria-hidden>
      <svg viewBox="0 0 104 46" className="block w-full drop-shadow-[0_6px_8px_rgb(40_46_56/0.28)] transition-transform duration-150 ease-out group-active:scale-[0.97]">
        <defs>
          <linearGradient id="eraser-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b3e44" />
            <stop offset="1" stopColor="#1d1f23" />
          </linearGradient>
        </defs>
        {/* felt */}
        <rect x="3" y="30" width="98" height="13" rx="3" fill="#8d9298" />
        <path d="M6 34h92M6 38h92" stroke="#7c8187" strokeWidth="1" />
        {/* handle */}
        <path d="M2 30 C 2 14, 10 6, 22 6 H 82 C 94 6, 102 14, 102 30 Z" fill="url(#eraser-top)" />
        <path d="M14 13 H 90" stroke="rgb(255 255 255 / 0.18)" strokeWidth="2" strokeLinecap="round" />
        <rect x="34" y="16" width="36" height="9" rx="2" className="fill-red" />
      </svg>
    </span>
  );
}
