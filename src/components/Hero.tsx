"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DyeFlowCanvas from "./DyeFlowCanvas";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const backgroundScrollRef = useRef<HTMLDivElement>(null);
  const backgroundPointerRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLAnchorElement>(null);
  const questionPanelRef = useRef<HTMLDivElement>(null);
  const questionSupportRef = useRef<HTMLParagraphElement>(null);
  const questionRuleRef = useRef<HTMLDivElement>(null);
  const letterboxTopRef = useRef<HTMLDivElement>(null);
  const letterboxBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const scene = sceneRef.current;
      const backgroundScroll = backgroundScrollRef.current;
      const backgroundPointer = backgroundPointerRef.current;
      const backgroundImage = backgroundImageRef.current;
      const copy = copyRef.current;
      const canvas = canvasRef.current;
      const questionPanel = questionPanelRef.current;

      if (
        !root ||
        !scene ||
        !backgroundScroll ||
        !backgroundPointer ||
        !backgroundImage ||
        !copy ||
        !canvas ||
        !questionPanel
      ) {
        return;
      }

      const titleLines = gsap.utils.toArray<HTMLElement>(
        ".hero-title-line",
        root
      );
      const questionLines = gsap.utils.toArray<HTMLElement>(
        ".hero-question-line",
        root
      );
      const pigmentLayers = gsap.utils.toArray<HTMLElement>(
        "[data-pigment-layer]",
        root
      );
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(questionPanel, { clipPath: "inset(100% 0 0 0)" });
        gsap.set(
          [
            backgroundImage,
            copy,
            canvas,
            leadRef.current,
            supportRef.current,
            captionRef.current,
            scrollCueRef.current,
            ...titleLines,
          ],
          { clearProps: "all" }
        );
        return;
      }

      gsap.set(backgroundImage, { scale: 1.075, autoAlpha: 0 });
      gsap.set(titleLines, { yPercent: 112, rotate: 1.1 });
      gsap.set([leadRef.current, supportRef.current], {
        y: 18,
        autoAlpha: 0,
      });
      gsap.set([captionRef.current, scrollCueRef.current], { autoAlpha: 0 });
      gsap.set(questionPanel, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(questionLines, { yPercent: 112 });
      gsap.set(questionSupportRef.current, { y: 24, autoAlpha: 0 });
      gsap.set(questionRuleRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(letterboxTopRef.current, {
        scaleY: 1,
        transformOrigin: "top center",
      });
      gsap.set(letterboxBottomRef.current, {
        scaleY: 1,
        transformOrigin: "bottom center",
      });

      const opening = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      opening
        .to(backgroundImage, {
          autoAlpha: 1,
          scale: 1,
          duration: 2.1,
        })
        .to(
          [letterboxTopRef.current, letterboxBottomRef.current],
          { scaleY: 0, duration: 1.2, stagger: 0.06 },
          0.2
        )
        .to(
          leadRef.current,
          { y: 0, autoAlpha: 1, duration: 0.75 },
          0.34
        )
        .to(
          titleLines,
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.05,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.48
        )
        .to(
          supportRef.current,
          { y: 0, autoAlpha: 1, duration: 0.8 },
          1.05
        )
        .to(
          [captionRef.current, scrollCueRef.current],
          { autoAlpha: 1, duration: 0.7, stagger: 0.08 },
          1.3
        );

      const scrollSequence = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.1}`,
          scrub: 1.05,
          pin: scene,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollSequence
        .to(backgroundScroll, { scale: 1.17, yPercent: -2.5, duration: 1 }, 0)
        .to(
          pigmentLayers[0],
          { xPercent: -22, yPercent: -12, scale: 1.24, duration: 0.72 },
          0
        )
        .to(
          pigmentLayers[1],
          { xPercent: 20, yPercent: 15, scale: 1.3, duration: 0.72 },
          0
        )
        .to(scrollCueRef.current, { autoAlpha: 0, y: 12, duration: 0.12 }, 0.03)
        .to(copy, { autoAlpha: 0, yPercent: -24, scale: 0.965, duration: 0.3 }, 0.19)
        .to(captionRef.current, { autoAlpha: 0, duration: 0.16 }, 0.27)
        .to(canvas, { opacity: 0.12, scale: 1.08, duration: 0.34 }, 0.34)
        .to(
          questionPanel,
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.42,
            ease: "power2.inOut",
          },
          0.46
        )
        .to(questionRuleRef.current, { scaleX: 1, duration: 0.24 }, 0.61)
        .to(
          questionLines,
          {
            yPercent: 0,
            duration: 0.25,
            stagger: 0.055,
            ease: "power3.out",
          },
          0.65
        )
        .to(
          questionSupportRef.current,
          { y: 0, autoAlpha: 1, duration: 0.22, ease: "power2.out" },
          0.78
        );

      let removePointerMotion = () => undefined;
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const moveX = gsap.quickTo(backgroundPointer, "x", {
          duration: 1.2,
          ease: "power3.out",
        });
        const moveY = gsap.quickTo(backgroundPointer, "y", {
          duration: 1.2,
          ease: "power3.out",
        });
        const movePigmentX = gsap.quickTo(canvas, "x", {
          duration: 1.5,
          ease: "power3.out",
        });
        const movePigmentY = gsap.quickTo(canvas, "y", {
          duration: 1.5,
          ease: "power3.out",
        });

        const onPointerMove = (event: PointerEvent) => {
          const bounds = scene.getBoundingClientRect();
          const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
          const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
          moveX(normalizedX * -18);
          moveY(normalizedY * -12);
          movePigmentX(normalizedX * 12);
          movePigmentY(normalizedY * 8);
        };

        const onPointerLeave = () => {
          moveX(0);
          moveY(0);
          movePigmentX(0);
          movePigmentY(0);
        };

        scene.addEventListener("pointermove", onPointerMove, { passive: true });
        scene.addEventListener("pointerleave", onPointerLeave);
        removePointerMotion = () => {
          scene.removeEventListener("pointermove", onPointerMove);
          scene.removeEventListener("pointerleave", onPointerLeave);
        };
      }

      return () => {
        removePointerMotion();
        opening.kill();
        scrollSequence.scrollTrigger?.kill();
        scrollSequence.kill();
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#03060f] text-white"
    >
      <div
        ref={sceneRef}
        className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#03060f]"
      >
        <div
          ref={backgroundScrollRef}
          aria-hidden="true"
          className="absolute -inset-[3%] will-change-transform"
        >
          <div
            ref={backgroundPointerRef}
            className="absolute -inset-[2%] will-change-transform"
          >
            <div
              ref={backgroundImageRef}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src="/visuals/textile-dye-pollution-hero.png"
                alt=""
                fill
                priority
                className="object-cover object-[64%_center] brightness-[0.66] saturate-[0.88] contrast-[1.08] sm:object-center"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          data-pigment-layer
          className="absolute -right-[12vw] top-[18%] h-[36vw] min-h-64 w-[44vw] min-w-80 rounded-full bg-blue-400/20 blur-[90px] mix-blend-screen will-change-transform"
        />
        <div
          aria-hidden="true"
          data-pigment-layer
          className="absolute -bottom-[14vw] left-[14%] h-[38vw] min-h-72 w-[52vw] min-w-96 rounded-full bg-[#1d4ed8]/25 blur-[110px] mix-blend-screen will-change-transform"
        />

        <div
          ref={canvasRef}
          aria-hidden="true"
          className="absolute -inset-[2%] z-[2] opacity-75 mix-blend-screen will-change-transform"
        >
          <DyeFlowCanvas />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_44%,rgba(2,6,18,0.04)_0%,rgba(2,6,18,0.25)_56%,rgba(2,5,15,0.76)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(2,5,15,0.5)_0%,rgba(2,5,15,0.04)_27%,rgba(2,5,15,0.08)_66%,rgba(2,5,15,0.64)_100%)]"
        />

        <div className="container-x absolute inset-0 z-10 flex items-center justify-center pb-20 pt-[108px] sm:pb-24 lg:pb-20 lg:pt-[116px]">
          <div
            ref={copyRef}
            className="w-full max-w-[1400px] text-center will-change-transform"
          >
            <p
              ref={leadRef}
              className="mx-auto mb-6 max-w-[52ch] text-[0.68rem] font-semibold uppercase tracking-[0.19em] text-blue-200/85 sm:mb-8 sm:text-xs"
            >
              Some reactive dye never fixes to the textile. It enters the wastewater.
            </p>

            <h1
              id="hero-title"
              aria-label="Our water is dying from textile dye."
              className="mx-auto w-full max-w-[1400px] font-display text-[clamp(2.5rem,10.4vw,4.3rem)] font-semibold leading-[0.91] tracking-[-0.062em] text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.28)] md:text-[clamp(3rem,5.6vw,6rem)] md:leading-[0.9]"
            >
              <span aria-hidden="true" className="md:hidden">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-title-line block">Our water</span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-title-line block">is dying from</span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-title-line block">textile dye.</span>
                </span>
              </span>
              <span aria-hidden="true" className="hidden md:block">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-title-line block whitespace-nowrap">
                    Our water is dying
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="hero-title-line block whitespace-nowrap">
                    from textile dye.
                  </span>
                </span>
              </span>
            </h1>

            <p
              ref={supportRef}
              className="mx-auto mt-7 max-w-[58ch] text-sm leading-relaxed text-white/80 sm:mt-9 sm:text-base lg:text-lg"
            >
              Reactive dyes are made to dissolve and produce durable color.
              Unfixed dye can stay soluble and stable once it reaches
              wastewater, which makes removal difficult.
            </p>
          </div>
        </div>

        <p
          ref={captionRef}
          className="absolute bottom-5 left-5 z-20 max-w-[20rem] font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.14em] text-white/55 sm:bottom-7 sm:left-8 sm:text-[0.62rem] lg:left-12"
        >
          Conceptual visualization of textile dye entering surface water
        </p>

        <a
          ref={scrollCueRef}
          href="#context"
          className="group absolute bottom-5 right-5 z-20 hidden items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/80 sm:bottom-7 sm:right-8 sm:flex lg:right-12"
          aria-label="Continue to the research context"
        >
          <span>Follow the dye</span>
          <span
            aria-hidden="true"
            className="relative block h-10 w-px overflow-hidden bg-white/30"
          >
            <span className="absolute left-0 top-0 h-3 w-px bg-blue-300 transition-transform duration-700 group-hover:translate-y-7" />
          </span>
        </a>

        <div
          ref={questionPanelRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 flex items-center overflow-hidden bg-[#eff3fa] text-[#05070f] will-change-[clip-path]"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          <div className="container-x w-full pb-14 pt-[104px] sm:pb-16 lg:pt-[112px]">
            <div
              ref={questionRuleRef}
              className="mb-8 h-px w-full bg-[#1d4ed8]/45 sm:mb-10"
            />
            <p className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-[#1d4ed8] sm:mb-7 sm:text-xs">
              That persistence shaped our study.
            </p>
            <div className="max-w-[1320px] font-display text-[clamp(2.4rem,9vw,4rem)] font-semibold leading-[0.91] tracking-[-0.06em] sm:text-[clamp(3rem,5.8vw,6rem)]">
              <span className="block overflow-hidden pb-[0.09em]">
                <span className="hero-question-line block">Could the carbon</span>
              </span>
              <span className="block overflow-hidden pb-[0.09em]">
                <span className="hero-question-line block text-[#1d4ed8]">
                  be contained
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.09em]">
                <span className="hero-question-line block">
                  and still capture the dye?
                </span>
              </span>
            </div>
            <p
              ref={questionSupportRef}
              className="mt-8 max-w-[56ch] text-sm leading-relaxed text-[#05070f]/72 sm:mt-10 sm:text-base lg:text-lg"
            >
              We tested coconut-shell activated carbon inside recoverable,
              biodegradable alginate beads.
            </p>
          </div>
        </div>

        <div
          ref={letterboxTopRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[7svh] bg-[#02040a]"
        />
        <div
          ref={letterboxBottomRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[7svh] bg-[#02040a]"
        />
      </div>
    </section>
  );
}
