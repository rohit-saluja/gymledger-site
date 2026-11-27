// Marker strokes drawn on the board: a few round-capped paths each, in the
// current text colour. They are decoration, so every one is aria-hidden.

type MarkProps = { className?: string; style?: React.CSSProperties };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A quick double swipe under a word. Stretches to the word's width. */
export function Underline({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 300 22" preserveAspectRatio="none" aria-hidden className={className} style={style}>
      <path d="M5 12 C 70 6, 160 4, 295 8" strokeWidth="7" {...stroke} />
      <path d="M38 18 C 120 13, 210 12, 278 14" strokeWidth="4" opacity="0.85" {...stroke} />
    </svg>
  );
}

/** A curved arrow pointing left, as a coach draws one to a detail. */
export function ArrowLeft({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 96 48" aria-hidden className={className} style={style}>
      <path d="M92 10 C 70 4, 40 10, 10 30" strokeWidth="3" {...stroke} />
      <path d="M10 30 L 24 29 M10 30 L 15 17" strokeWidth="3" {...stroke} />
    </svg>
  );
}

/** A curved arrow pointing down and right. */
export function ArrowDown({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 64 72" aria-hidden className={className} style={style}>
      <path d="M8 6 C 4 30, 18 52, 50 64" strokeWidth="3" {...stroke} />
      <path d="M50 64 L 36 66 M50 64 L 44 51" strokeWidth="3" {...stroke} />
    </svg>
  );
}

/** A straight-ish arrow pointing right, for "this turns into that". */
export function ArrowRight({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 80 28" aria-hidden className={className} style={style}>
      <path d="M4 16 C 26 12, 50 12, 74 13" strokeWidth="3.5" {...stroke} />
      <path d="M74 13 L 62 5 M74 13 L 63 22" strokeWidth="3.5" {...stroke} />
    </svg>
  );
}

/** A loose loop drawn around a word. */
export function Loop({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 200 84" preserveAspectRatio="none" aria-hidden className={className} style={style}>
      <path d="M152 12 C 96 0, 22 10, 12 40 C 4 68, 112 82, 172 62 C 204 50, 198 16, 128 9" strokeWidth="4" {...stroke} />
    </svg>
  );
}

/** A tick. */
export function Tick({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 36 32" aria-hidden className={className} style={style}>
      <path d="M4 18 L 14 27 L 33 4" strokeWidth="4.5" {...stroke} />
    </svg>
  );
}

/** A hand-drawn box, ticked or empty. */
export function CheckBox({ className, style, checked = true }: MarkProps & { checked?: boolean }) {
  return (
    <svg viewBox="0 0 34 34" aria-hidden className={className} style={style}>
      <path d="M4 6 C 12 4, 22 4, 29 5 C 30 13, 30 21, 29 29 C 20 30, 12 30, 5 29 C 4 21, 4 13, 4 6 Z" strokeWidth="2.6" {...stroke} />
      {checked && <path d="M9 17 L 15 23 L 31 3" strokeWidth="3.6" className="text-red" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}
