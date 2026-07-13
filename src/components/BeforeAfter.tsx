"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "With dye",
  afterLabel = "After treatment",
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 cursor-ew-resize select-none overflow-hidden bg-[#e9edf3]"
      style={{ touchAction: "none" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) moveTo(e.clientX);
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      role="slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Drag to compare the dyed water with the treated water"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
    >
      {/* After (treated) — base layer */}
      <Image src={afterSrc} alt={afterAlt} fill className="pointer-events-none object-contain" sizes="(max-width:767px) 100vw, 54vw" priority />
      <span className="pointer-events-none absolute bottom-4 right-4 z-20 bg-teal px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white">
        {afterLabel}
      </span>

      {/* Before (dyed) — clipped to left of handle */}
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={beforeSrc} alt={beforeAlt} fill className="object-contain" sizes="(max-width:767px) 100vw, 54vw" />
        <span className="absolute bottom-4 left-4 z-20 bg-ink px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white">
          {beforeLabel}
        </span>
      </div>

      {/* Divider + handle */}
      <div className="pointer-events-none absolute inset-y-0 z-30 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_18px_rgba(0,0,0,0.5)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-teal text-white shadow-lift">
          <span aria-hidden="true" className="text-lg font-bold leading-none">&#8646;</span>
        </div>
      </div>

      <span className="click-cue pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 bg-ink/70 text-white backdrop-blur-sm">
        Drag to compare
      </span>
    </div>
  );
}
