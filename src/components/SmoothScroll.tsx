"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Native scrolling (snappy, no wheel hijacking). We only intercept in-page
 * anchor clicks to add a smooth, offset-aware jump. Everything else uses the
 * browser's own scroller so there's zero per-frame cost.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top =
        (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({
        top,
        behavior: prefersReduced ? "auto" : "smooth",
      });
      history.replaceState(null, "", id);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55 }}>
      {children}
    </MotionConfig>
  );
}
