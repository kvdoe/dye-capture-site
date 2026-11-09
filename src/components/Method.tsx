"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { methodSteps } from "@/lib/data";
import { photoSrc } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const methodIntroduction =
  "Three carbon loadings (0, 10, 20 wt% relative to alginate solids) were tested with and without a chitosan coating. Each formulation had three replicate flasks, a 24-hour contact period at 90 rpm, and a pH 4 dye solution.";

const analysisCopy = (
  <>
    Red-channel brightness I was converted to absorbance with{" "}
    <span className="metric-mono whitespace-nowrap text-cream">
      A = -log<sub>10</sub>(I / 255)
    </span>
    . Each treated flask was compared with the dye-only control to calculate apparent removal: removal (%) = [(A<sub>control</sub> − A<sub>sample</sub>) / A<sub>control</sub>] × 100. The assay is referenced to the control and was not calibrated to concentration, so results are apparent decolorization. Wet-bead mass gain (%) = [(final mass − 4.00 g) / 4.00 g] × 100. Two-way ANOVA tested carbon loading, coating, and their interaction across the 18 flasks; Tukey HSD compared all six formulations; coating contrasts used the pooled ANOVA error with Holm-adjusted p-values (α = 0.05).
  </>
);

function ProgressRail({ active }: { active?: number }) {
  return (
    <div className="flex w-full gap-1.5" aria-hidden="true">
      {methodSteps.map((step, index) => (
        <span key={step.n} className="h-[3px] flex-1 overflow-hidden bg-cream/20">
          {typeof active === "number" ? (
            <span
              className={`block h-full bg-teal-soft ${index <= active ? "scale-x-100" : "scale-x-0"}`}
              style={{ transformOrigin: "left center" }}
            />
          ) : (
            <span
              data-protocol-progress
              className="block h-full origin-left scale-x-0 bg-teal-soft"
            />
          )}
        </span>
      ))}
    </div>
  );
}

function DesktopFilm() {
  const filmRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const stage = stageRef.current;
        if (!stage) return;

        const photos = gsap.utils.toArray<HTMLElement>("[data-protocol-photo]");
        const shades = gsap.utils.toArray<HTMLElement>("[data-protocol-shade]");
        const copies = gsap.utils.toArray<HTMLElement>("[data-protocol-copy]");
        const numbers = gsap.utils.toArray<HTMLElement>("[data-protocol-number]");
        const progress = gsap.utils.toArray<HTMLElement>("[data-protocol-progress]");

        gsap.set(photos, {
          autoAlpha: 0,
          filter: "brightness(0.62) saturate(0.82)",
          scale: 0.82,
          transformOrigin: "center center",
        });
        gsap.set(shades, { opacity: 0.5 });
        gsap.set(copies, { autoAlpha: 0 });
        gsap.set(numbers, { yPercent: 115 });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

        copies.forEach((copy) => {
          gsap.set(copy.querySelectorAll<HTMLElement>("[data-protocol-wipe]"), {
            clipPath: "inset(0 0 100% 0)",
            yPercent: 24,
          });
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * methodSteps.length}`,
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: [0, 0.09, 0.29, 0.49, 0.69, 0.89, 1],
              duration: { min: 0.18, max: 0.48 },
              delay: 0.08,
              ease: "power1.inOut",
            },
          },
        });

        methodSteps.forEach((_, index) => {
          const start = index;
          const wipes = copies[index].querySelectorAll<HTMLElement>("[data-protocol-wipe]");

          timeline
          .set(photos[index], { autoAlpha: 1, zIndex: index + 1 }, start)
          .set(copies[index], { autoAlpha: 1, zIndex: index + 1 }, start)
          .to(
            photos[index],
            {
              filter: "brightness(0.94) saturate(0.9)",
              scale: 1,
              duration: 0.72,
              ease: "power1.out",
            },
            start
          )
          .to(shades[index], { opacity: 0.18, duration: 0.52 }, start)
          .to(numbers[index], { yPercent: 0, duration: 0.18, ease: "power2.out" }, start + 0.03)
          .to(
            wipes,
            {
              clipPath: "inset(0 0 0% 0)",
              yPercent: 0,
              duration: 0.2,
              stagger: 0.045,
              ease: "power2.out",
            },
            start + 0.05
          )
          .to(progress[index], { scaleX: 1, duration: 0.84 }, start + 0.02)
          .to(
            wipes,
            {
              clipPath: "inset(100% 0 0 0)",
              yPercent: -18,
              duration: 0.1,
              stagger: 0.014,
              ease: "power2.in",
            },
            start + 0.87
          )
          .to(numbers[index], { yPercent: -115, duration: 0.1, ease: "power2.in" }, start + 0.88)
          .to(shades[index], { opacity: 0.74, duration: 0.12 }, start + 0.87)
          .to(
            photos[index],
            {
              autoAlpha: index === methodSteps.length - 1 ? 0.3 : 0,
              filter: "brightness(0.3) saturate(0.62)",
              duration: 0.12,
            },
            start + 0.88
          )
            .set(copies[index], { autoAlpha: 0 }, start + 0.98);
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      return () => media.revert();
    },
    { scope: filmRef }
  );

  return (
    <div ref={filmRef} className="protocol-film hidden lg:block">
      <div ref={stageRef} className="relative h-[100svh] min-h-[650px] overflow-hidden bg-ink text-cream">
        <div className="absolute inset-y-0 right-0 w-[62%] overflow-hidden border-l border-cream/15">
          {methodSteps.map((step, index) => (
            <div
              key={step.n}
              data-protocol-photo
              className={`invisible absolute inset-0 opacity-0 ${index === 0 ? "visible opacity-100" : ""}`}
            >
              <Image
                src={photoSrc(step.photo)}
                alt={`Protocol step ${step.n}: ${step.title}`}
                fill
                className="photo-grade object-cover"
                sizes="62vw"
                priority={index === 0}
              />
              <div
                data-protocol-shade
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,33,31,0.58)_0%,rgba(31,33,31,0.05)_32%,rgba(31,33,31,0.12)_100%)]"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-[38%] z-20 w-28 -translate-x-full bg-gradient-to-l from-transparent to-ink" />

        <div className="relative z-30 flex h-full w-[38%] min-w-[29rem] flex-col px-[clamp(2.5rem,4vw,5.5rem)] pb-6 pt-[clamp(4.5rem,7vh,6rem)]">
          <div>
            <h2 className="max-w-full text-[clamp(1.8rem,2.3vw,3rem)] leading-[0.95] text-cream">
              From alginate powder to measured removal in five steps.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[clamp(0.88rem,1.05vw,1.05rem)] leading-relaxed text-cream/70">
              {methodIntroduction}
            </p>
          </div>

          <div className="relative mt-8 h-[24rem] 2xl:h-[26rem]">
            {methodSteps.map((step, index) => (
              <article
                key={step.n}
                data-protocol-copy
                className={`invisible absolute inset-0 flex flex-col justify-start opacity-0 ${
                  index === 0 ? "visible opacity-100" : ""
                }`}
              >
                <div className="flex items-end justify-between gap-5 border-b border-cream/20 pb-4">
                  <div className="overflow-hidden">
                    <span
                      data-protocol-number
                      className="metric-mono block text-[clamp(2.3rem,3.4vw,3.8rem)] leading-none text-teal-soft"
                    >
                      {String(step.n).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="metric-mono pb-1 text-xs text-cream/45">/ 05</span>
                </div>
                <div data-protocol-wipe className="mt-5">
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-teal-soft">
                    {step.detail}
                  </p>
                </div>
                <div data-protocol-wipe>
                  <h3 className="mt-2 max-w-[18ch] text-[clamp(1.5rem,2.1vw,2.4rem)] leading-[0.98] text-cream">
                    {step.title}
                  </h3>
                </div>
                <div data-protocol-wipe>
                  <p className="mt-3 max-w-[48ch] text-[clamp(0.92rem,1.08vw,1.1rem)] leading-relaxed text-cream/78">
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <ProgressRail />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-40 border border-cream/10" aria-hidden="true" />
      </div>
    </div>
  );
}

function ReducedMotionDesktop() {
  return (
    <div className="protocol-reduced hidden bg-ink text-cream">
      <header className="container-x border-b border-cream/15 py-24">
        <h2 className="max-w-[16ch] text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[0.94]">
          From alginate powder to measured removal in five steps.
        </h2>
        <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-cream/68">{methodIntroduction}</p>
      </header>
      {methodSteps.map((step, index) => (
        <article key={step.n} className="grid min-h-[100svh] grid-cols-[38%_62%] border-b border-cream/15">
          <div className="flex flex-col justify-center px-[clamp(2.5rem,5vw,6rem)] py-16">
            <p className="metric-mono text-6xl leading-none text-teal-soft">
              {String(step.n).padStart(2, "0")}
              <span className="ml-3 text-base text-cream/40">/ 05</span>
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-teal-soft">{step.detail}</p>
            <h3 className="mt-4 text-[clamp(1.9rem,2.9vw,3.4rem)] leading-[0.96]">{step.title}</h3>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-cream/68">{step.body}</p>
            <div className="mt-10">
              <ProgressRail active={index} />
            </div>
          </div>
          <div className="relative min-h-[100svh] overflow-hidden">
            <Image
              src={photoSrc(step.photo)}
              alt={`Protocol step ${step.n}: ${step.title}`}
              fill
              className="photo-grade object-cover"
              sizes="62vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/28 via-transparent to-transparent" />
          </div>
        </article>
      ))}
    </div>
  );
}

function MobileScenes() {
  return (
    <div className="bg-ink text-cream lg:hidden">
      <div
        className="relative"
        role="region"
        aria-label="Five-step experimental protocol"
      >
        {methodSteps.map((step, index) => (
          <article key={step.n} className="min-h-[100svh] border-b border-cream/15">
            <div className="relative min-h-[58svh] overflow-hidden border-b border-cream/15">
              <Image
                src={photoSrc(step.photo)}
                alt={`Protocol step ${step.n}: ${step.title}`}
                fill
                className="photo-grade object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/78 via-transparent to-ink/55" />

              {index === 0 && (
                <div className="absolute inset-x-0 top-0 z-10 px-5 pt-8 sm:px-8 sm:pt-12">
                  <h2 className="max-w-full text-[clamp(1.9rem,8vw,3.4rem)] leading-[0.94]">
                    From alginate powder to measured removal in five steps.
                  </h2>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-5 sm:px-8">
                <p className="metric-mono text-5xl leading-none text-teal-soft">
                  {String(step.n).padStart(2, "0")}
                  <span className="ml-2 text-sm text-cream/55">/ 05</span>
                </p>
                <p className="max-w-[17ch] text-right font-mono text-[0.58rem] uppercase tracking-[0.14em] text-cream/72">
                  {step.detail}
                </p>
              </div>
            </div>

            <div className="flex min-h-[42svh] flex-col justify-center px-5 py-10 sm:px-8">
              {index === 0 && (
                <p className="mb-7 max-w-[54ch] border-b border-cream/15 pb-7 text-sm leading-relaxed text-cream/58">
                  {methodIntroduction}
                </p>
              )}
              <h3 className="max-w-[18ch] text-[clamp(1.8rem,8vw,3rem)] leading-[0.96]">{step.title}</h3>
              <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-cream/70">{step.body}</p>
              <div className="mt-8">
                <ProgressRail active={index} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Method() {
  return (
    <section id="method" className="surface-noise relative overflow-hidden bg-ink">
      <DesktopFilm />
      <ReducedMotionDesktop />
      <MobileScenes />

      <div className="relative z-10 border-y border-cream/15 bg-ink text-cream">
        <div className="container-x grid gap-5 py-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-center lg:py-14">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-soft">Image analysis and statistics</p>
          <p className="max-w-4xl text-sm leading-relaxed text-cream/68 sm:text-base">{analysisCopy}</p>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) and (prefers-reduced-motion: reduce) {
          :global(.protocol-film) {
            display: none !important;
          }

          :global(.protocol-reduced) {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
