"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { conclusion, futureWork } from "@/lib/data";
import BeforeAfter from "./BeforeAfter";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Conclusion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".conclusion-line",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          },
        );
        gsap.fromTo(
          ".conclusion-next",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: ".conclusion-next", start: "top 85%" },
          },
        );
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="conclusion" className="relative overflow-hidden bg-paper px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-stretch">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.17em] text-teal">Conclusion</p>
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2.3rem,4vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.05em]">
              What the data supports.
            </h2>
            <div className="mt-8 border-t border-ink/20">
              {conclusion.map((paragraph) => (
                <p key={paragraph} className="conclusion-line border-b border-ink/20 py-5 text-sm leading-relaxed text-ink/75 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <figure className="relative min-h-[58svh] overflow-hidden border border-ink/20 md:min-h-[68svh]">
            <BeforeAfter
              beforeSrc="/photos/before-dye.jpg"
              afterSrc="/photos/after-dye.jpg"
              beforeAlt="Flask of turquoise reactive dye solution before treatment"
              afterAlt="Flask of water run nearly clear after treatment with uncoated carbon-alginate beads"
              beforeLabel="With dye"
              afterLabel="Treated (uncoated beads)"
            />
          </figure>
        </div>

        <div className="conclusion-next mt-14 border-t border-ink/20 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.17em] text-teal">Next experiments</p>
          <h3 className="mt-5 max-w-[22ch] text-[clamp(2rem,3.5vw,3.9rem)] font-medium leading-[0.96] tracking-[-0.045em]">
            A proof of concept, not a finished treatment system.
          </h3>
          <ol className="mt-8 grid gap-3 border-t border-ink/20 pt-5 sm:grid-cols-2">
            {futureWork.map((item, index) => (
              <li key={item} className="grid grid-cols-[28px_1fr] gap-3 border-b border-ink/15 pb-3 text-sm leading-relaxed text-ink/70">
                <span className="font-mono text-teal">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
