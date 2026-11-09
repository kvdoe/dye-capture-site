"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports whether an element is near the viewport. Used to pause infinite
 * CSS animations, canvases and video while they are off-screen, which is the
 * main source of main-thread and GPU load on phones.
 */
export function useInView<T extends HTMLElement>(rootMargin = "25% 0px") {
  const ref = useRef<T>(null);
  // Starts true so server markup and browsers without IntersectionObserver
  // behave exactly as before; the observer then pauses what is off-screen.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
