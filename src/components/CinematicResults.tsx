"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  anova,
  carbonLevels,
  coatingPenalty,
  coatingPenaltyP,
  coatingPenaltySignificant,
  dyeRemoval,
  dyeRemovalSd,
  findingPoints,
  massGain,
  massGainSd,
  tukeyGroups,
  waterAbsorbed,
} from "@/lib/data";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CoatingMode = keyof typeof dyeRemoval;

const coatingOptions = [
  { value: "uncoated", label: "Uncoated" },
  { value: "coated", label: "Chitosan-coated" },
] as const satisfies ReadonlyArray<{
  value: CoatingMode;
  label: string;
}>;

const chartX = [72, 320, 568] as const;
const chartTop = 24;
const chartBottom = 194;

const beadRandom = (() => {
  let seed = 20240713;
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
})();

const beadSpecs = Array.from({ length: 26 }, () => ({
  left: 3 + beadRandom() * 90,
  bottom: 2 + beadRandom() * 66,
  size: 9 + Math.floor(beadRandom() * 16),
  depth: 0.55 + beadRandom() * 0.4,
}));

function chartY(value: number) {
  return chartBottom - (value / 100) * (chartBottom - chartTop);
}

function linePath(values: readonly number[]) {
  return values
    .map((value, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${chartX[index]} ${chartY(value)}`;
    })
    .join(" ");
}

function interpolate(values: readonly number[], progress: number) {
  const lowerIndex = Math.min(Math.floor(progress), values.length - 1);
  const upperIndex = Math.min(lowerIndex + 1, values.length - 1);
  const localProgress = progress - lowerIndex;
  return (
    values[lowerIndex] +
    (values[upperIndex] - values[lowerIndex]) * localProgress
  );
}

function formatRemoval(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatPenalty(value: number) {
  return `${value.toFixed(1)} pts`;
}

function beadVisual(carbon: number) {
  if (carbon === 0) {
    return {
      background:
        "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.92) 0%, rgba(205,224,255,0.42) 22%, rgba(96,125,180,0.18) 58%, rgba(8,15,30,0.22) 78%, rgba(219,234,254,0.34) 100%)",
      shadow:
        "inset 0 0 0 1px rgba(224, 236, 255, 0.42), inset -3px -4px 8px rgba(3, 8, 20, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2)",
    };
  }

  if (carbon === 10) {
    return {
      background:
        "radial-gradient(circle at 31% 25%, #737d78 0%, #272e2c 28%, #080c0b 74%)",
      shadow:
        "inset 0 0 0 1px rgba(223, 231, 246, 0.12), 0 5px 10px rgba(0, 0, 0, 0.32)",
    };
  }

  return {
    background:
      "radial-gradient(circle at 31% 25%, #4b5552 0%, #111918 28%, #020504 74%)",
    shadow:
      "inset 0 0 0 1px rgba(223, 231, 246, 0.08), 0 5px 10px rgba(0, 0, 0, 0.34)",
  };
}

function metricTween(
  element: HTMLSpanElement | null,
  from: number,
  to: number,
  decimals: number,
  suffix = "",
  reduceMotion = false,
) {
  if (!element) return undefined;

  if (reduceMotion) {
    element.textContent = `${to.toFixed(decimals)}${suffix}`;
    return undefined;
  }

  const counter = { value: from };
  return gsap.to(counter, {
    value: to,
    duration: 0.72,
    ease: "power3.out",
    overwrite: true,
    onStart: () => {
      element.textContent = `${from.toFixed(decimals)}${suffix}`;
    },
    onUpdate: () => {
      element.textContent = `${counter.value.toFixed(decimals)}${suffix}`;
    },
    onComplete: () => {
      element.textContent = `${to.toFixed(decimals)}${suffix}`;
    },
  });
}

export default function CinematicResults() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chamberRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const uncoatedPathRef = useRef<SVGPathElement>(null);
  const coatedPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGLineElement>(null);
  const activeDotRef = useRef<SVGCircleElement>(null);
  const removalNumberRef = useRef<HTMLSpanElement>(null);
  const swellingNumberRef = useRef<HTMLSpanElement>(null);
  const waterNumberRef = useRef<HTMLSpanElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const motionProgressRef = useRef({ value: 0 });
  const paintSceneRef = useRef<(progress: number) => void>(() => undefined);
  const activeIndexRef = useRef(0);
  const previousMetricsRef = useRef({
    removal: dyeRemoval.uncoated[0],
    swelling: massGain.uncoated[0],
    water: waterAbsorbed.uncoated,
  });
  const { ref: viewRef, inView } = useInView<HTMLDivElement>("10% 0px");

  const [activeIndex, setActiveIndex] = useState(0);
  const [coating, setCoating] = useState<CoatingMode>("uncoated");
  const coatingRef = useRef<CoatingMode>(coating);

  const activeCarbon = carbonLevels[activeIndex];
  const currentRemoval = dyeRemoval[coating][activeIndex];
  const currentSwelling = massGain[coating][activeIndex];
  const currentRemovalSd = dyeRemovalSd[coating][activeIndex];
  const currentSwellingSd = massGainSd[coating][activeIndex];
  const currentGroup = tukeyGroups[coating][activeIndex];
  const currentWater = waterAbsorbed[coating];
  const currentBeadVisual = beadVisual(activeCarbon);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      const water = waterRef.current;
      const chamber = chamberRef.current;
      const marker = markerRef.current;
      const activeDot = activeDotRef.current;
      const paths = [uncoatedPathRef.current, coatedPathRef.current].filter(
        (path): path is SVGPathElement => Boolean(path),
      );

      if (!root || !stage || !water || !chamber) return;

      const paintScene = (progress: number) => {
        const boundedProgress = gsap.utils.clamp(
          0,
          carbonLevels.length - 1,
          progress,
        );
        const mode = coatingRef.current;
        const removal = interpolate(dyeRemoval[mode], boundedProgress);
        const graphX = interpolate(chartX, boundedProgress);
        const graphY = chartY(interpolate(dyeRemoval[mode], boundedProgress));

        // dye = 1 when fully dyed, 0 when fully removed. Vivid artificial
        // turquoise fades to pale, nearly clear water as removal increases.
        const dye = gsap.utils.clamp(0, 1, 1 - removal / 100);
        const mix = (from: number, to: number) => from + (to - from) * dye;
        const r = Math.round(mix(226, 6));
        const g = Math.round(mix(246, 224));
        const b = Math.round(mix(250, 214));
        const alphaTop = mix(0.14, 0.72);
        const alphaBottom = mix(0.24, 0.94);
        water.style.background = `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, ${alphaTop}) 0%, rgba(${r}, ${g}, ${b}, ${alphaBottom}) 100%)`;
        water.style.boxShadow = `inset 0 24px 42px rgba(${r}, ${g}, ${b}, ${mix(0.1, 0.4)}), 0 -8px 30px rgba(20, 220, 210, ${dye * 0.4})`;

        if (marker) {
          marker.setAttribute("x1", graphX.toString());
          marker.setAttribute("x2", graphX.toString());
        }

        if (activeDot) {
          activeDot.setAttribute("cx", graphX.toString());
          activeDot.setAttribute("cy", graphY.toString());
        }

        const nextIndex = Math.min(
          carbonLevels.length - 1,
          Math.floor(boundedProgress + 0.5),
        );

        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
      };

      paintSceneRef.current = paintScene;
      paintScene(motionProgressRef.current.value);

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // No scroll hijacking. The chamber, chart and numbers are driven only by
      // the carbon-loading and coating buttons below.
      gsap.set("[data-bead]", { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(paths, { strokeDashoffset: 0 });
      gsap.set("[data-pair]", { autoAlpha: 1, y: 0 });
      scrollTriggerRef.current = null;

      if (!reducedMotion) {
        gsap.fromTo(
          "[data-bead]",
          { autoAlpha: 0, scale: 0.6, y: (index) => -40 - (index % 7) * 8 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            stagger: { amount: 0.6, from: "edges" },
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
          },
        );
        gsap.fromTo(
          paths,
          { strokeDashoffset: (index, target) => target.getTotalLength() },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 66%" },
          },
        );
      }

      return () => {
        paintSceneRef.current = () => undefined;
      };
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const previous = previousMetricsRef.current;
      const next = {
        removal: currentRemoval,
        swelling: currentSwelling,
        water: currentWater,
      };

      const tweens = [
        metricTween(
          removalNumberRef.current,
          previous.removal,
          next.removal,
          1,
          "%",
          reducedMotion,
        ),
        metricTween(
          swellingNumberRef.current,
          previous.swelling,
          next.swelling,
          1,
          "%",
          reducedMotion,
        ),
        metricTween(
          waterNumberRef.current,
          previous.water,
          next.water,
          0,
          " mL",
          reducedMotion,
        ),
      ];

      if (!reducedMotion) {
        gsap.fromTo(
          "[data-metric-label]",
          { autoAlpha: 0.35, y: 7 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.46,
            stagger: 0.035,
            ease: "power2.out",
          },
        );
      }

      previousMetricsRef.current = next;

      return () => {
        tweens.forEach((tween) => tween?.kill());
      };
    },
    {
      scope: rootRef,
      dependencies: [
        coating,
        activeIndex,
        currentRemoval,
        currentSwelling,
        currentWater,
      ],
    },
  );

  useGSAP(
    () => {
      coatingRef.current = coating;
      paintSceneRef.current(motionProgressRef.current.value);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!reducedMotion) {
        gsap.fromTo(
          "[data-pair]",
          { autoAlpha: 0.45, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: true,
          },
        );
      }
    },
    { scope: rootRef, dependencies: [coating] },
  );

  function chooseCarbonLevel(index: number) {
    activeIndexRef.current = index;
    setActiveIndex(index);

    const trigger = scrollTriggerRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (trigger) {
      const progress = index / (carbonLevels.length - 1);
      window.scrollTo({
        top: trigger.start + (trigger.end - trigger.start) * progress,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      return;
    }

    gsap.to(motionProgressRef.current, {
      value: index,
      duration: reducedMotion ? 0 : 0.72,
      ease: "power3.inOut",
      overwrite: true,
      onUpdate: () => {
        paintSceneRef.current(motionProgressRef.current.value);
      },
    });
  }

  function tiltChamber(event: React.PointerEvent<HTMLDivElement>) {
    if (!chamberRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    gsap.to(chamberRef.current, {
      rotateY: x * 4,
      rotateX: y * -3,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  function resetChamberTilt() {
    if (!chamberRef.current) return;
    gsap.to(chamberRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  return (
    <section
      ref={rootRef}
      id="results"
      aria-labelledby="cinematic-results-heading"
      className="relative isolate overflow-hidden bg-[#05070f] text-[#f4f7ff]"
    >
      <div
        ref={stageRef}
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#05070f]"
      >
        <div ref={viewRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at 14% 20%, rgba(37, 99, 235, 0.2), transparent 32%), radial-gradient(circle at 85% 72%, rgba(148, 163, 184, 0.1), transparent 29%), linear-gradient(115deg, #05070f 0%, #0a1226 46%, #04060d 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(226, 236, 255, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 236, 255, 0.18) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 78%, transparent)",
          }}
        />

        <div className="container-x relative z-10 flex w-full flex-1 flex-col py-16 sm:py-20 lg:pb-4 lg:pt-[5.5rem]">
          <header className="grid gap-6 border-b border-white/15 pb-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.58fr)] lg:items-end lg:gap-12">
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#60a5fa]">
                Interactive results, mean ± SD, n = 3 flasks per formulation
              </p>
              <h2
                id="cinematic-results-heading"
                className="mt-3 max-w-[1100px] text-[clamp(2rem,3.5vw,3.9rem)] leading-[0.94] tracking-[-0.05em] text-[#f4f7ff]"
              >
                {findingPoints[0].title}.
              </h2>
            </div>
            <p className="max-w-[62ch] text-sm leading-relaxed text-[#f4f7ff]/68 sm:text-base lg:pb-1">
              {findingPoints[0].body}
            </p>
          </header>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="click-cue text-[#60a5fa]">Try it</span>
            <p className="text-xs text-[#f4f7ff]/65 sm:text-sm">
              Tap a carbon loading and a coating below to change the chamber, chart, and numbers.
            </p>
          </div>

          <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div
              role="group"
              aria-label="Choose carbon loading"
              className="flex w-full border border-white/20 xl:w-auto"
            >
              {carbonLevels.map((level, index) => {
                const selected = activeIndex === index;
                return (
                  <button
                    key={level}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseCarbonLevel(index)}
                    className={`relative min-h-11 flex-1 px-5 py-2.5 text-left font-mono text-xs tabular-nums transition-colors xl:min-w-32 ${
                      index > 0 ? "border-l border-white/20" : ""
                    } ${
                      selected
                        ? "bg-[#f4f7ff] text-[#05070f]"
                        : "bg-transparent text-[#f4f7ff]/65 hover:bg-white/10 hover:text-[#f4f7ff]"
                    }`}
                  >
                    <span className="block text-base font-semibold">{level}%</span>
                    <span className="block text-[0.6rem] uppercase tracking-[0.14em]">
                      carbon
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="Choose coating condition"
              className="flex w-full border border-white/20 xl:w-auto"
            >
              {coatingOptions.map((option, index) => {
                const selected = coating === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCoating(option.value)}
                    className={`min-h-11 flex-1 px-5 py-3 text-xs font-semibold transition-colors xl:min-w-44 ${
                      index > 0 ? "border-l border-white/20" : ""
                    } ${
                      selected
                        ? "bg-[#60a5fa] text-[#05070f]"
                        : "bg-transparent text-[#f4f7ff]/65 hover:bg-white/10 hover:text-[#f4f7ff]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid flex-1 gap-5 lg:min-h-0 lg:grid-cols-[minmax(0,1.22fr)_minmax(22rem,0.78fr)]">
            <div
              className="relative min-h-[470px] overflow-hidden border border-white/20 bg-white/[0.025] p-3 sm:min-h-[520px] sm:p-5 lg:min-h-0"
              onPointerMove={tiltChamber}
              onPointerLeave={resetChamberTilt}
            >
              <div className="absolute left-5 top-5 z-30 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
                <span className="text-[#60a5fa]">{activeCarbon}% carbon</span>
                <span className="mx-2 text-white/25">/</span>
                {coating === "uncoated" ? "Uncoated" : "Chitosan-coated"}
              </div>

              <div
                ref={chamberRef}
                aria-hidden="true"
                className="absolute inset-x-[14%] bottom-[26%] top-[9%] overflow-hidden rounded-[2rem_2rem_3.75rem_3.75rem] border border-white/35 bg-white/[0.035] shadow-[inset_14px_0_24px_rgba(255,255,255,0.06),inset_-12px_0_28px_rgba(0,0,0,0.16),0_35px_80px_rgba(0,0,0,0.26)] [transform-style:preserve-3d] sm:inset-x-[18%]"
              >
                <div className="absolute inset-x-[10%] top-0 z-20 h-5 -translate-y-1/2 rounded-[50%] border border-white/40 bg-[#0b1730]/75 shadow-[inset_0_3px_5px_rgba(255,255,255,0.14)]" />
                <div className="absolute bottom-0 left-[4%] top-0 z-20 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[0.5px]" />
                <div className="absolute bottom-0 right-[5%] top-[7%] z-20 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />

                <div
                  ref={waterRef}
                  className="absolute inset-x-0 bottom-0 h-[78%] overflow-hidden transition-[background,box-shadow] duration-500"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20, 220, 210, 0.55) 0%, rgba(6, 224, 205, 0.82) 100%)",
                  }}
                >
                  <div aria-hidden="true" className="absolute -top-9 left-0 h-16 w-[200%]" style={{ animation: "wave-slide 6s linear infinite", animationPlayState: inView ? "running" : "paused" }}>
                    <svg className="h-full w-full" viewBox="0 0 2400 90" preserveAspectRatio="none">
                      <path d="M0 45 C 200 5 400 85 600 45 C 800 5 1000 85 1200 45 C 1400 5 1600 85 1800 45 C 2000 5 2200 85 2400 45 L 2400 90 L 0 90 Z" fill="rgba(96, 165, 250, 0.5)" />
                    </svg>
                  </div>
                  <div aria-hidden="true" className="absolute -top-6 left-0 h-14 w-[200%]" style={{ animation: "wave-slide 3.8s linear infinite reverse", animationPlayState: inView ? "running" : "paused" }}>
                    <svg className="h-full w-full" viewBox="0 0 2400 90" preserveAspectRatio="none">
                      <path d="M0 50 C 150 90 450 10 600 50 C 750 90 1050 10 1200 50 C 1350 90 1650 10 1800 50 C 1950 90 2250 10 2400 50 L 2400 90 L 0 90 Z" fill="rgba(37, 99, 235, 0.45)" />
                    </svg>
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[170%] w-[170%] rounded-full opacity-70"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(147,197,253,0) 0%, rgba(147,197,253,0.3) 12%, rgba(29,78,216,0) 30%, rgba(191,219,254,0.24) 52%, rgba(29,78,216,0) 72%, rgba(147,197,253,0.28) 88%, rgba(147,197,253,0) 100%)",
                      animation: "swirl-spin 7s linear infinite",
                      animationPlayState: inView ? "running" : "paused",
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_38%,rgba(255,255,255,0.2),transparent_29%),linear-gradient(105deg,transparent_24%,rgba(255,255,255,0.1)_49%,transparent_72%)]" />

                  {beadSpecs.map((bead, index) => (
                    <span
                      key={index}
                      data-bead
                      className="absolute z-10 rounded-full"
                      style={{
                        left: `${bead.left}%`,
                        bottom: `${bead.bottom}%`,
                        width: bead.size,
                        height: bead.size,
                        opacity: bead.depth,
                        background: currentBeadVisual.background,
                        boxShadow: `${
                          coating === "coated"
                            ? "0 0 0 1px rgba(226, 234, 248, 0.68), "
                            : ""
                        }${currentBeadVisual.shadow}`,
                      }}
                    />
                  ))}

                  {Array.from({ length: 8 }, (_, index) => (
                    <span
                      key={index}
                      className="absolute rounded-full border border-white/30 bg-white/10"
                      style={{
                        left: `${5 + ((index * 27) % 90)}%`,
                        bottom: "-8px",
                        width: 3 + (index % 4) * 2,
                        height: 3 + (index % 4) * 2,
                        animation: `bubble-rise ${4 + (index % 5) * 1.3}s linear ${(index * 0.7) % 6}s infinite`,
                        animationPlayState: inView ? "running" : "paused",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-30 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/20 bg-[#05070f]/65 pt-4 backdrop-blur-md sm:grid-cols-3">
                <div data-metric-label>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/48">
                    Apparent dye removal
                  </p>
                  <span
                    ref={removalNumberRef}
                    aria-hidden="true"
                    className="mt-1 block font-mono text-[clamp(1.45rem,3vw,2.35rem)] tabular-nums text-[#93c5fd]"
                  >
                    {formatRemoval(currentRemoval)}
                  </span>
                  <span aria-hidden="true" className="block font-mono text-[0.62rem] text-white/55">
                    ± {currentRemovalSd.toFixed(1)} SD · Tukey group {currentGroup}
                  </span>
                </div>
                <div data-metric-label>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/48">
                    Wet-bead mass gain
                  </p>
                  <span
                    ref={swellingNumberRef}
                    aria-hidden="true"
                    className="mt-1 block font-mono text-[clamp(1.45rem,3vw,2.35rem)] tabular-nums text-[#f4f7ff]"
                  >
                    {currentSwelling.toFixed(1)}%
                  </span>
                  <span aria-hidden="true" className="block font-mono text-[0.62rem] text-white/55">
                    ± {currentSwellingSd.toFixed(1)} SD, vs 4.00 g start
                  </span>
                </div>
                <div data-metric-label>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/48">
                    Solution drawn into beads
                  </p>
                  <span aria-hidden="true" className="mt-1 block font-mono text-[clamp(1.2rem,2.3vw,1.95rem)] leading-tight tabular-nums text-[#f4f7ff]">
                    <span className="block text-[0.5em] uppercase tracking-[0.1em] text-white/55">about</span>
                    <span ref={waterNumberRef} className="whitespace-nowrap">
                      {currentWater} mL
                    </span>
                  </span>
                  <span aria-hidden="true" className="block font-mono text-[0.62rem] text-white/55">
                    of 40.0 mL, coating-group mean
                  </span>
                </div>
              </div>

              <p className="sr-only" aria-live="polite">
                {activeCarbon}% carbon, {coating === "uncoated" ? "uncoated" : "chitosan-coated"}. Apparent dye removal {formatRemoval(currentRemoval)} plus or minus {currentRemovalSd.toFixed(1)}, Tukey group {currentGroup}. Wet-bead mass gain {currentSwelling.toFixed(1)}%. Solution drawn into beads about {currentWater} mL.
              </p>
            </div>

            <div className="flex min-h-0 flex-col border-y border-white/20 lg:border-b-0 lg:border-t-0 lg:border-l lg:pl-5">
              <div className="py-5 lg:pt-0">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[0.61rem] uppercase tracking-[0.18em] text-white/45">
                      Apparent dye removal by carbon loading
                    </p>
                    <h3 className="mt-2 text-2xl tracking-[-0.035em] text-[#f4f7ff]">
                      Both conditions, measured side by side.
                    </h3>
                  </div>
                  <div className="hidden shrink-0 text-right font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/45 sm:block">
                    <span className="block text-[#60a5fa]">Uncoated</span>
                    <span className="mt-1 block text-[#cbd5e1]">Chitosan-coated</span>
                  </div>
                </div>

                <svg
                  className="mt-5 h-auto w-full overflow-visible"
                  viewBox="0 0 640 236"
                  role="img"
                  aria-labelledby="removal-graph-title removal-graph-description"
                >
                  <title id="removal-graph-title">
                    Dye removal by carbon loading and coating condition
                  </title>
                  <desc id="removal-graph-description">
                    Mean of three flasks. Uncoated values are 16.6%, 44.5%, and 84.0%. Chitosan-coated values are 13.8%, 19.5%, and 40.6% at 0%, 10%, and 20% carbon.
                  </desc>

                  {chartX.map((x, index) => (
                    <g key={x}>
                      <line
                        x1={x}
                        x2={x}
                        y1={chartTop}
                        y2={chartBottom}
                        stroke="rgba(241,238,230,0.12)"
                        vectorEffect="non-scaling-stroke"
                      />
                      <text
                        x={x}
                        y="224"
                        fill="rgba(241,238,230,0.58)"
                        fontSize="12"
                        fontFamily="var(--font-mono)"
                        textAnchor="middle"
                      >
                        {carbonLevels[index]}% carbon
                      </text>
                    </g>
                  ))}

                  <line
                    ref={markerRef}
                    x1={chartX[0]}
                    x2={chartX[0]}
                    y1={chartTop - 8}
                    y2={chartBottom + 4}
                    stroke="rgba(241,238,230,0.56)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    vectorEffect="non-scaling-stroke"
                  />

                  <path
                    ref={uncoatedPathRef}
                    d={linePath(dyeRemoval.uncoated)}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth={coating === "uncoated" ? 4 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={coating === "uncoated" ? 1 : 0.42}
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={coatedPathRef}
                    d={linePath(dyeRemoval.coated)}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth={coating === "coated" ? 4 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={coating === "coated" ? 1 : 0.42}
                    vectorEffect="non-scaling-stroke"
                  />

                  {coatingOptions.map((option) =>
                    dyeRemoval[option.value].map((value, index) => (
                      <g key={`${option.value}-${carbonLevels[index]}`}>
                        <circle
                          cx={chartX[index]}
                          cy={chartY(value)}
                          r="5"
                          fill={
                            option.value === "uncoated" ? "#60a5fa" : "#cbd5e1"
                          }
                          opacity={coating === option.value ? 1 : 0.5}
                        />
                        <text
                          x={chartX[index]}
                          y={
                            chartY(value) +
                            (option.value === "uncoated" ? -12 : 20)
                          }
                          fill={
                            option.value === "uncoated" ? "#93c5fd" : "#e2e8f0"
                          }
                          fontSize="12"
                          fontFamily="var(--font-mono)"
                          textAnchor="middle"
                          opacity={coating === option.value ? 1 : 0.56}
                        >
                          {formatRemoval(value)}
                        </text>
                      </g>
                    )),
                  )}

                  <circle
                    ref={activeDotRef}
                    cx={chartX[0]}
                    cy={chartY(dyeRemoval.uncoated[0])}
                    r="10"
                    fill="none"
                    stroke={coating === "uncoated" ? "#f4f7ff" : "#cbd5e1"}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <div className="mt-auto border-t border-white/20">
                {coatingOptions.map((option) => {
                  const mode = option.value;
                  const active = mode === coating;
                  return (
                    <button
                      key={mode}
                      type="button"
                      data-pair
                      aria-pressed={active}
                      onClick={() => setCoating(mode)}
                      className={`grid w-full grid-cols-[minmax(8rem,0.72fr)_repeat(3,minmax(0,1fr))] items-center gap-3 border-b border-white/15 py-4 text-left transition-colors last:border-b-0 ${
                        active ? "text-[#f4f7ff]" : "text-[#f4f7ff]/48 hover:text-[#f4f7ff]/80"
                      }`}
                    >
                      <span className="flex items-center gap-3 text-xs font-semibold">
                        <span className="relative h-5 w-9 shrink-0" aria-hidden="true">
                          {[0, 1, 2].map((bead) => (
                            <span
                              key={bead}
                              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full"
                              style={{
                                left: bead * 9,
                                background: currentBeadVisual.background,
                                boxShadow: `${
                                  mode === "coated"
                                    ? "0 0 0 1px rgba(226, 234, 248, 0.72), "
                                    : ""
                                }${currentBeadVisual.shadow}`,
                              }}
                            />
                          ))}
                        </span>
                        {option.label}
                      </span>
                      <span className="font-mono text-sm tabular-nums">
                        <span className="block text-[0.52rem] uppercase tracking-[0.12em] text-white/36">
                          Removed
                        </span>
                        {formatRemoval(dyeRemoval[mode][activeIndex])}
                      </span>
                      <span className="font-mono text-sm tabular-nums">
                        <span className="block text-[0.52rem] uppercase tracking-[0.12em] text-white/36">
                          Mass gain
                        </span>
                        {massGain[mode][activeIndex].toFixed(1)}%
                      </span>
                      <span className="font-mono text-sm tabular-nums">
                        <span className="block text-[0.52rem] uppercase tracking-[0.12em] text-white/36">
                          Tukey group
                        </span>
                        {tukeyGroups[mode][activeIndex]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="border-t border-white/15 py-3 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-white/40">
                Bead color follows carbon loading. At the same loading, coating is marked only by the fine outline.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15 bg-[#05080f] py-14 sm:py-20">
        <div className="container-x">
          <div className="border-y border-white/20">
            <div className="py-6">
              <h3 className="text-2xl text-[#f4f7ff] sm:text-3xl">
                Results for all six formulations
              </h3>
              <p className="mt-2 max-w-[80ch] text-sm text-[#f4f7ff]/55">
                Apparent dye removal and wet-bead mass gain are mean ± SD of three flasks. Formulations sharing a Tukey letter are not significantly different (α = 0.05). Solution-volume decrease is a coating-group mean read to the nearest mL. The animated chamber is a visual explanation, not a measurement.
              </p>
            </div>

            <div className="overflow-x-auto border-t border-white/20 pb-8 pt-3">
              <table className="w-full min-w-[720px] text-left text-sm">
                <caption className="sr-only">
                  Apparent dye removal, wet-bead mass gain, Tukey group, and solution-volume decrease for each carbon loading and coating condition
                </caption>
                <thead>
                  <tr className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/45">
                    <th scope="col" className="px-4 py-3 font-medium">Carbon</th>
                    <th scope="col" className="px-4 py-3 font-medium">Condition</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Dye removal</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Mass gain</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Tukey group</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Volume drawn in</th>
                  </tr>
                </thead>
                <tbody>
                  {carbonLevels.flatMap((level, levelIndex) =>
                    coatingOptions.map((option) => (
                      <tr key={`${level}-${option.value}`} className="border-t border-white/15 text-[#f4f7ff]/82">
                        <th scope="row" className="px-4 py-3 font-mono font-semibold tabular-nums text-[#f4f7ff]">
                          {level}%
                        </th>
                        <td className="px-4 py-3">{option.label}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">
                          {formatRemoval(dyeRemoval[option.value][levelIndex])} ± {dyeRemovalSd[option.value][levelIndex].toFixed(1)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">
                          {massGain[option.value][levelIndex].toFixed(1)}% ± {massGainSd[option.value][levelIndex].toFixed(1)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">
                          {tukeyGroups[option.value][levelIndex]}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">
                          about {waterAbsorbed[option.value]} mL
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border border-white/20 p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#60a5fa]">Statistical summary</p>
              <h3 className="mt-3 text-xl text-[#f4f7ff] sm:text-2xl">Two-way ANOVA on the {anova.flasks} treatment flasks</h3>
              <dl className="mt-5 grid gap-3 font-mono text-sm text-[#f4f7ff]/80 sm:grid-cols-2">
                <div className="border-t border-white/15 pt-3">
                  <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-white/45">Carbon loading</dt>
                  <dd className="mt-1 tabular-nums">F({anova.carbon.df}) = {anova.carbon.F}, {anova.carbon.p}</dd>
                </div>
                <div className="border-t border-white/15 pt-3">
                  <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-white/45">Chitosan coating</dt>
                  <dd className="mt-1 tabular-nums">F({anova.coating.df}) = {anova.coating.F}, {anova.coating.p}</dd>
                </div>
                <div className="border-t border-white/15 pt-3">
                  <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-white/45">Carbon × coating interaction</dt>
                  <dd className="mt-1 tabular-nums">F({anova.interaction.df}) = {anova.interaction.F}, {anova.interaction.p}</dd>
                </div>
                <div className="border-t border-white/15 pt-3">
                  <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-white/45">Model fit</dt>
                  <dd className="mt-1 tabular-nums">R² = {anova.r2.toFixed(2)}, {anova.residualDf} residual df</dd>
                </div>
              </dl>
              <p className="mt-5 border-t border-white/15 pt-4 text-sm text-[#f4f7ff]/65">
                Tukey HSD: {anova.tukey.map((t) => `${t.pair}, ${t.p}`).join("; ")}. Wet-mass-gain interaction {anova.massGainInteraction}.
              </p>
              <p className="mt-3 text-xs text-[#f4f7ff]/45">
                Assumption checks (Levene {anova.supplemental.levene}; Shapiro-Wilk {anova.supplemental.shapiro}; pooled SD {anova.supplemental.pooledSd}) have limited power with three flasks per formulation: large p-values mean no violation was detected, not that the assumptions were proven.
              </p>
            </div>

            <div className="border border-white/20 p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#60a5fa]">Reduction attributable to coating</p>
              <h3 className="mt-3 text-xl text-[#f4f7ff] sm:text-2xl">Uncoated minus coated at each loading</h3>
              <ul className="mt-5 divide-y divide-white/15 border-t border-white/15 font-mono text-sm">
                {carbonLevels.map((level, index) => (
                  <li key={level} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="text-white/60">{level}% carbon</span>
                    <span className="tabular-nums text-[#f4f7ff]">
                      {formatPenalty(coatingPenalty[index])}
                      <span className={`ml-3 text-xs ${coatingPenaltySignificant[index] ? "text-[#93c5fd]" : "text-white/45"}`}>
                        {coatingPenaltyP[index]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#f4f7ff]/45">
                95% confidence intervals from the pooled ANOVA error are ± 6.3 percentage points. P-values are Holm-adjusted across the three comparisons.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/dye-capture-results.csv" download className="inline-flex min-h-10 items-center border border-white/30 px-4 text-xs font-semibold text-[#f4f7ff] hover:bg-white hover:text-[#05070f]">
                  Download formulation means (CSV)
                </a>
                <a href="/dye-capture-vials.csv" download className="inline-flex min-h-10 items-center border border-white/30 px-4 text-xs font-semibold text-[#f4f7ff] hover:bg-white hover:text-[#05070f]">
                  Download per-flask data (CSV)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
