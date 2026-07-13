"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { materials } from "@/lib/data";
import { photoSrc } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Materials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".material-media",
          { yPercent: 8, scale: 1.08 },
          {
            yPercent: -8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".material-flow-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="materials" className="relative overflow-hidden bg-cream px-5 py-16 text-ink sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <h2 className="max-w-[1450px] font-sans text-[clamp(2.3rem,4.6vw,4.8rem)] font-normal leading-[0.98] tracking-[-0.05em]">
          We seal coconut-shell carbon inside alginate beads and compare a chitosan coating.
        </h2>

        <div className="mt-12 h-px w-full overflow-hidden bg-ink/15">
          <div className="material-flow-line h-full origin-left bg-teal" />
        </div>

        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-0 overflow-x-auto border border-ink/20 md:h-[620px] md:overflow-visible">
          {materials.map((material, index) => {
            const selected = active === index;
            return (
              <button
                key={material.name}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group relative h-[72svh] min-h-[540px] w-[86vw] shrink-0 snap-center overflow-hidden border-r border-cream/40 text-left transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] last:border-r-0 md:h-auto md:min-h-0 md:w-auto md:min-w-[150px] ${
                  selected ? "md:flex-[4.3_1_0%]" : "md:flex-[1_1_0%]"
                }`}
              >
                <div className="material-media absolute -inset-y-[10%] inset-x-0">
                  <Image
                    src={photoSrc(material.photo)}
                    alt={material.name}
                    fill
                    className={`object-cover transition-[filter,transform] duration-700 ${selected ? "scale-[1.015] saturate-100" : "scale-105 saturate-50 md:brightness-75"}`}
                    sizes={selected ? "(max-width:767px) 86vw, 58vw" : "(max-width:767px) 86vw, 16vw"}
                  />
                </div>
                <div className={`absolute inset-0 transition-colors duration-700 ${selected ? "bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" : "bg-ink/30 md:bg-ink/50"}`} />

                <span className={`absolute text-cream transition-all duration-700 ${selected ? "left-6 top-6 text-3xl sm:left-8 sm:top-8 sm:text-5xl" : "left-1/2 top-8 -translate-x-1/2 text-2xl md:left-1/2 md:top-8 md:origin-top-left md:translate-x-3 md:rotate-90 md:whitespace-nowrap"}`}>
                  {material.name}
                </span>

                {!selected && (
                  <span className="click-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap bg-ink/60 text-cream backdrop-blur-sm md:inline-flex">
                    Click
                  </span>
                )}

                <div className={`absolute inset-x-0 bottom-0 p-6 text-cream transition-all duration-500 sm:p-8 ${selected ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-soft">{material.role}</p>
                  <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-cream/80 sm:text-base">{material.body}</p>
                  <p className="mt-8 font-mono text-xs text-cream/55">M-{String(index + 1).padStart(2, "0")}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-6 text-sm text-ink/55">
          <p className="flex items-center gap-3">
            <span className="click-cue text-teal">Click here</span>
            Click or hover each material panel above to expand its role.
          </p>
          <p className="hidden font-mono text-xs md:block">Four materials, six formulations</p>
        </div>
      </div>
    </section>
  );
}
