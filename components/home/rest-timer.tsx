"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Timer } from "lucide-react";
import { PhoneFrame } from "@/components/phone-frame";
import { ArrowDown } from "@/components/board/marks";

// GymLedger's rest-timer Live Activity, as the widget draws it
// (ios-native/RestTimerWidget/RestTimerLiveActivity.swift): a red timer tile,
// the exercise name, "Set 3/4", a red progress bar and a large countdown on
// the Lock Screen; a timer glyph and the red countdown in the Dynamic Island.
// It counts down in real time while on screen and holds at "Rest complete".

const TOTAL = 90;
const POSTER = 84; // 1:24, what a still frame shows

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function RestTimer() {
  const [left, setLeft] = useState(POSTER);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const done = left === 0;
  const label = fmt(left);

  return (
    <div ref={ref} className="relative mx-auto grid max-w-4xl place-items-center pt-4">
      {/* The compact Dynamic Island, enlarged: above the phone on mobile, beside it on desktop */}
      <div className="mb-8 md:absolute md:left-0 md:top-6 md:mb-0 lg:left-6">
        <p className="note mb-2 text-center text-[1.25rem] text-blue md:ml-3 md:text-left">in the Dynamic Island</p>
        <div
          className="mx-auto flex h-[54px] w-[250px] items-center justify-between rounded-full bg-black px-5 shadow-[0_18px_30px_-14px_rgb(23_24_27/0.6)]"
          role="img"
          aria-label={done ? "Dynamic Island: rest complete" : `Dynamic Island: rest timer, ${label} left`}
        >
          {done ? <Check className="size-6 text-red" strokeWidth={3} /> : <Timer className="size-6 text-red" strokeWidth={2.5} />}
          <span className="font-apple text-[1.375rem] font-semibold tabular-nums text-red">{done ? "" : label}</span>
        </div>
      </div>

      {/* The phone hangs from two magnets; its lower half drops behind the board's ledge. */}
      <div className="relative w-[min(82vw,330px)]">
        <span aria-hidden className="magnet" style={{ top: -12, left: "8%" }} />
        <span aria-hidden className="magnet magnet--black" style={{ top: -12, right: "8%" }} />
        <div className="h-[clamp(390px,118vw,430px)] overflow-hidden sm:h-[430px]">
          <PhoneFrame>
            <LockScreen label={label} left={left} done={done} />
          </PhoneFrame>
        </div>
      </div>
      <div className="tray relative z-[3] -mt-2 w-full max-w-[560px]" aria-hidden />

      <p className="note mt-5 text-center text-[1.25rem] leading-tight text-blue md:absolute md:right-0 md:top-[52%] md:mt-0 md:w-40 md:text-left lg:right-6">
        <ArrowDown className="absolute -left-14 -top-8 hidden w-12 -scale-x-100 rotate-[70deg] md:block" />
        and on the Lock Screen
      </p>
    </div>
  );
}

function LockScreen({ label, left, done }: { label: string; left: number; done: boolean }) {
  return (
    <div
      className="absolute inset-0 font-apple text-white [container-type:inline-size]"
      style={{
        background:
          "radial-gradient(90% 55% at 80% 100%, rgb(217 64 64 / 0.35), transparent 70%), linear-gradient(172deg, #3a4258 0%, #1b1f2b 48%, #0e0f14 100%)",
      }}
    >
      <p className="absolute inset-x-0 top-[12.5%] text-center text-[4.6cqw] font-semibold text-white/85">Thursday 26 November</p>
      <p className="absolute inset-x-0 top-[15%] text-center text-[24cqw] font-bold leading-none tracking-[-0.02em] text-white/95">9:41</p>

      {/* Live Activity */}
      <div
        className="absolute inset-x-[4%] top-[37%] flex items-center gap-[3.5cqw] rounded-[6cqw] bg-black/55 p-[4cqw] backdrop-blur-md"
        role="img"
        aria-label={done ? "Lock Screen Live Activity: Incline Bench Press, rest complete" : `Lock Screen Live Activity: Incline Bench Press, set 3 of 4, ${label} of rest left`}
      >
        <span className="grid size-[11.9cqw] shrink-0 place-items-center rounded-[3.5cqw] bg-red/20">
          {done ? <Check className="size-[5.6cqw] text-red" strokeWidth={3} /> : <Timer className="size-[5.6cqw] text-red" strokeWidth={2.5} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[4.25cqw] font-semibold">Incline Bench Press</span>
          <span className="block text-[3.75cqw] text-white/65">Set 3/4</span>
          {!done && (
            <span className="mt-[1.6cqw] block h-[1.1cqw] overflow-hidden rounded-full bg-white/20">
              <span className="block h-full rounded-full bg-red transition-[width] duration-1000 ease-linear" style={{ width: `${(left / TOTAL) * 100}%` }} />
            </span>
          )}
        </span>
        <span className={done ? "w-[19.4cqw] text-right text-[3.75cqw] font-bold leading-tight text-red" : "min-w-[19.4cqw] text-right text-[7cqw] font-bold tabular-nums"}>
          {done ? "Rest complete" : label}
        </span>
      </div>
    </div>
  );
}
