"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { problemBody, researchQuestion } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statement = [
  "Reactive dyes",
  "remain stable,",
  "highly soluble,",
  "and difficult",
  "to remove",
  "from water.",
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>(".problem-word", stage);
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        gsap.set(words, { opacity: 0.1, yPercent: 30 });
        gsap.set(".problem-photo", { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 });
        gsap.set(".problem-support", { opacity: 0, y: 32 });
        gsap.set(".problem-question", { opacity: 0, yPercent: 18 });

        timeline
          .to(words, { opacity: 1, yPercent: 0, duration: 0.5, stagger: 0.06 }, 0)
          .to(".problem-photo", { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.7, ease: "power2.out" }, 0.1)
          .to(".problem-support", { opacity: 1, y: 0, duration: 0.35 }, 0.55)
          .to(".problem-copy", { opacity: 0.15, y: -28, duration: 0.35 }, 0.98)
          .to(".problem-question", { opacity: 1, yPercent: 0, duration: 0.45 }, 1.05);
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".problem-word", ".problem-support", ".problem-question"], { opacity: 1, y: 0, yPercent: 0 });
        gsap.set(".problem-photo", { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="context" className="relative bg-cream text-ink">
      <div ref={stageRef} className="relative flex min-h-[100svh] overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30" />
        <div className="relative mx-auto flex w-full max-w-[1500px] flex-col justify-between">
          <div className="problem-copy grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">The problem / Reactive Blue 140</p>
              <h2 className="mt-6 font-sans text-[clamp(2.2rem,4.4vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.05em]">
                {statement.map((phrase) => (
                  <span key={phrase} className="problem-word mr-[0.18em] inline-block">
                    {phrase}
                  </span>
                ))}
              </h2>

              <div className="problem-support mt-10 grid gap-6 border-t border-ink/20 pt-6 sm:grid-cols-2">
                <p className="max-w-[46ch] text-sm leading-relaxed text-ink sm:text-base">{problemBody[0]}</p>
                <p className="max-w-[46ch] text-sm leading-relaxed text-ink sm:text-base">{problemBody[1]}</p>
              </div>
            </div>

            <figure className="problem-photo relative hidden min-h-[440px] overflow-hidden border border-ink/15 shadow-lift md:block">
              <Image
                src="/visuals/dye-pollution.jpg"
                alt="Reactive dye dispersing as a turquoise plume through dark polluted water"
                fill
                className="object-cover"
                sizes="(max-width: 1500px) 42vw, 620px"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-ink/60 p-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                Reactive dye dispersing in water — conceptual visualization
              </figcaption>
            </figure>
          </div>

          <div className="problem-question mt-12 border-t border-ink/25 bg-cream/95 pb-4 pt-7 backdrop-blur-sm">
            <p className="max-w-[72rem] font-sans text-[clamp(1.5rem,2.7vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.04em]">
              {researchQuestion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
