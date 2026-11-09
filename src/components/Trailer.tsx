"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * The trailer sits at the bottom of the page. The video is not fetched until
 * it is close to the viewport, and it plays only while visible.
 */
export default function Trailer() {
  const { ref, inView } = useInView<HTMLElement>("40% 0px");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      if (video.preload === "none") video.preload = "auto";
      const attempt = video.play();
      if (attempt) attempt.catch(() => undefined);
    } else if (!video.paused) {
      video.pause();
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      id="trailer"
      className="relative overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.12),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(29,78,216,0.1),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-28">
        <div className="text-center lg:text-left">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#60a5fa]">
            The story in forty seconds
          </p>
          <h2 className="trailer-glow mt-4 font-display text-[clamp(2.4rem,7vw,5.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
            <span className="text-[#3b82f6]">DYE</span>
            <span className="text-white">VERGE</span>
            <br />
            <span className="text-white">TRAILER</span>
          </h2>
        </div>

        <div>
          <div className="relative overflow-hidden border border-white/15 bg-[#050505] shadow-[0_0_60px_rgba(37,99,235,0.25)]">
            <video
              ref={videoRef}
              className="block aspect-video w-full object-cover"
              src="/dyeverge.mp4"
              poster="/dyeverge-poster.jpg"
              muted
              loop
              playsInline
              controls
              preload="none"
              aria-label="DYEVERGE trailer"
            />
          </div>
          <p className="trailer-cue mt-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.24em]">
            &#128266; Unmute for the full experience
          </p>
        </div>
      </div>
    </section>
  );
}
