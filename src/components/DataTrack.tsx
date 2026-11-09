"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const ITEMS = [
  "84.0% apparent dye removal",
  "43.3 points lost to coating at 20% carbon",
  "18 treatment flasks",
  "3 replicates per formulation",
  "Reactive Blue 140, pH 4",
  "Carbon × coating interaction p < 0.001",
  "20% carbon, uncoated",
];

export default function DataTrack() {
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLElement>("10% 0px");

  return (
    <aside ref={ref} aria-label="Key study measurements" className="relative overflow-hidden border-y border-cream/20 bg-ink py-5 pr-24 text-cream">
      <div
        className="data-track flex w-max items-center whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] sm:text-sm"
        style={{ animationPlayState: paused || !inView ? "paused" : "running" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 ? "true" : undefined} className="flex items-center">
            {ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="px-8 sm:px-12">{item}</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal-soft" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
        className="absolute right-3 top-1/2 min-h-9 -translate-y-1/2 border border-cream/35 bg-ink px-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream hover:border-cream"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </aside>
  );
}
