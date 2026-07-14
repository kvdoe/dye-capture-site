"use client";

export default function Trailer() {
  return (
    <section id="trailer" className="relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.12),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(29,78,216,0.1),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12 lg:py-28">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.34em] text-[#60a5fa]">Preview</p>
          <h2 className="trailer-glow mt-6 font-display text-[clamp(2.3rem,4.8vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            The problem.
            <br />
            The solution.
            <br />
            <span className="text-[#60a5fa]">In one trailer.</span>
          </h2>
          <p className="mt-8 max-w-[40ch] text-sm leading-relaxed text-white/55 sm:text-base">
            A short cinematic look at the dye crisis and the recoverable carbon-alginate bead we built to answer it.
          </p>
          <p className="trailer-cue mt-8 inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.24em]">
            <span aria-hidden="true">&#9654;</span> Watch the trailer
          </p>
        </div>

        <div>
          <div className="relative border border-white/15 bg-black shadow-[0_0_60px_rgba(37,99,235,0.25)]">
            <video
              className="block w-full"
              src="/dyeverge.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
              aria-label="DYEVERGE trailer"
            />
            <span className="trailer-cue pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#60a5fa]/50 bg-black/70 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] backdrop-blur-sm sm:text-xs">
              &#128266; Unmute for the full experience
            </span>
          </div>
          <p className="trailer-cue mt-4 text-center font-mono text-[0.68rem] uppercase tracking-[0.22em]">
            &#128266; Tap the speaker icon to unmute &mdash; sound on for the full experience
          </p>
        </div>
      </div>
    </section>
  );
}
