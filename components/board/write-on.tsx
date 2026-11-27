"use client";

import { useEffect, useRef } from "react";

/**
 * Marker writing that writes itself in once, left to right, the first time
 * it scrolls into view. Visible by default (no JS, reduced motion, or already
 * on screen at load); only text below the fold is hidden and then revealed.
 */
export function WriteOn({
  as: Tag = "span",
  className,
  children,
  delay = 0,
}: {
  as?: "span" | "div" | "h2" | "p";
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    // Already in view when the page loads: leave it be.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    el.dataset.write = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        window.setTimeout(() => {
          el.dataset.write = "done";
        }, delay);
      },
      { rootMargin: "0px 0px -18% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    // @ts-expect-error -- ref type differs per tag, all are HTMLElements
    <Tag ref={ref} data-write="" className={className}>
      {children}
    </Tag>
  );
}
