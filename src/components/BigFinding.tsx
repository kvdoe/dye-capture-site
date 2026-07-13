"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dyeRemoval, selectivity, waterAbsorbed } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const finalWords =
  "Coated beads took up more water. Carbon loading drove dye capture.".split(" ");

export default function BigFinding() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          [".finding-uncoated", ".finding-coated"],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: "power2.out",
            duration: 0.8,
            scrollTrigger: { trigger: ".finding-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".finding-word",
          { opacity: 0.1, yPercent: 40 },
          {
            opacity: 1,
            yPercent: 0,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: ".finding-final",
              start: "top 65%",
              end: "bottom 65%",
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
    <section ref={sectionRef} id="finding" className="relative bg-cream text-ink">
      <div className="mx-auto max-w-[1600px] px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pt-40">
        <h2 className="max-w-[1500px] text-[clamp(2.3rem,4.8vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
          Coated beads took up more water. Carbon loading drove dye capture.
        </h2>
        <p className="mt-8 max-w-[56ch] text-base leading-relaxed text-ink/65 sm:text-lg">
          Both photographs below are from the experiment. The chitosan-coated beads were not recolored and are shown in their natural appearance. Removal and selectivity are means of n = 3. Water uptake is an approximate coating-group mean.
        </p>
      </div>

      <div className="finding-grid mx-auto grid max-w-[1600px] gap-5 px-0 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:px-12">
        <FindingFrame
          className="finding-uncoated"
          image="/photos/img-9610.jpg"
          imageAlt="Actual uncoated bead formulations labeled 0%, 10%, and 20% carbon"
          label="Uncoated carbon-alginate beads"
          statement="Higher dye removal at every carbon loading"
          removal={`${dyeRemoval.uncoated[2].toFixed(1)}%`}
          selectivityValue={selectivity.uncoated[2].toFixed(2)}
          water={`about ${waterAbsorbed.uncoated} mL`}
          accent="text-teal-soft"
        />

        <FindingFrame
          className="finding-coated"
          image="/photos/img-9611.jpg"
          imageAlt="Actual chitosan-coated bead formulations labeled 0%, 10%, and 20% carbon"
          label="Chitosan-coated carbon-alginate beads"
          statement="Greater swelling, lower removal at every loading"
          removal={`${dyeRemoval.coated[2].toFixed(1)}%`}
          selectivityValue={selectivity.coated[2].toFixed(2)}
          water={`about ${waterAbsorbed.coated} mL`}
          accent="text-clay-soft"
        />
      </div>

      <div className="finding-final relative flex min-h-[125svh] items-center overflow-hidden bg-teal-deep px-5 py-28 text-cream sm:px-8 lg:px-12">
        <div className="water-gradient absolute inset-0 opacity-30" />
        <p className="relative mx-auto max-w-[1500px] text-[clamp(2.4rem,5.2vw,5.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
          {finalWords.map((word, index) => (
            <span key={`${word}-${index}`} className="finding-word mr-[0.18em] inline-block">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function FindingFrame({
  className,
  image,
  imageAlt,
  label,
  statement,
  removal,
  selectivityValue,
  water,
  accent,
}: {
  className: string;
  image: string;
  imageAlt: string;
  label: string;
  statement: string;
  removal: string;
  selectivityValue: string;
  water: string;
  accent: string;
}) {
  return (
    <article className={`${className} relative flex flex-col overflow-hidden bg-ink text-cream`}>
      <div className="flex items-center justify-between gap-5 border-b border-cream/20 px-6 py-5 sm:px-9">
        <p className={`font-mono text-xs uppercase tracking-[0.16em] ${accent}`}>{label}</p>
        <p className="font-mono text-xs text-cream/55">Actual experiment photograph</p>
      </div>

      <div className="relative h-[42svh] min-h-[340px] overflow-hidden bg-[#030808] md:h-[46svh] md:min-h-[420px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-contain p-3 sm:p-6"
          sizes="100vw"
        />
      </div>

      <div className="border-t border-cream/20 px-6 py-6 sm:px-9 sm:py-8">
        <h3 className="text-[clamp(1.8rem,3.2vw,3.4rem)] font-medium leading-none tracking-[-0.045em]">
          {statement}
        </h3>
      </div>

      <dl className="grid border-t border-cream/20 sm:grid-cols-3">
        <Metric label="Mean dye removed, 20% carbon" value={removal} accent={accent} />
        <Metric label="Mean selectivity, 20% carbon" value={selectivityValue} accent={accent} />
        <Metric label="Approx. coating-group water uptake" value={water} accent={accent} />
      </dl>
    </article>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="border-b border-cream/20 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-8">
      <dt className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cream/55 sm:text-xs">{label}</dt>
      <dd className={`mt-3 font-mono text-[clamp(1.3rem,3vw,3.3rem)] leading-none ${accent}`}>{value}</dd>
    </div>
  );
}
