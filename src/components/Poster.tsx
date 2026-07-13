"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Poster() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".poster-preview",
          { y: 90, scale: 0.95, rotateX: 5 },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".poster-copy",
          { xPercent: -8, opacity: 0.2 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <section ref={sectionRef} id="poster" className="overflow-hidden bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="border-b border-ink/20 pb-4">
            <p className="kicker text-teal">Research poster</p>
          </div>
          <div className="poster-copy mt-10 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <h2 className="max-w-[14ch] text-[clamp(2.4rem,4.2vw,4.2rem)] leading-[0.94]">
              The complete study in one document.
            </h2>
            <div className="lg:justify-self-end">
              <p className="max-w-[54ch] text-lg leading-relaxed text-ink/75">
                The poster contains the full rationale, method, charts, calculation table, conclusion, and references used for the research presentation.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/poster.pdf" download className="action-primary">
                  Download PDF
                  <span aria-hidden="true">&#8595;</span>
                </a>
                <a href="/poster.png" target="_blank" rel="noopener noreferrer" className="action-secondary">
                  Open full image
                  <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="perspective-[1400px]">
          <div className="poster-preview mt-8 border border-ink/20 bg-paper p-2 will-change-transform sm:p-4">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="group relative block w-full overflow-hidden bg-white"
              aria-label="Enlarge the research poster"
            >
              <Image
                src="/poster.png"
                alt="Research poster showing the dye-capture study, method, results, charts, and conclusion"
                width={2600}
                height={2080}
                className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.008] group-focus-visible:scale-[1.008]"
                sizes="(max-width:1380px) 100vw, 1320px"
              />
              <span className="click-cue absolute bottom-4 right-4 bg-ink text-cream transition-colors duration-300 group-hover:bg-teal">
                Click to enlarge
              </span>
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/20 py-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-taupe">
            <span>Landscape poster</span>
            <span>PDF and PNG included</span>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged research poster"
            className="fixed inset-0 z-[80] overflow-auto bg-ink/95 p-4 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="fixed right-5 top-5 z-10 flex gap-2">
              <a
                href="/poster.pdf"
                download
                className="hidden min-h-11 items-center border border-cream/25 px-4 text-sm font-semibold text-cream hover:bg-cream hover:text-ink sm:inline-flex"
                onClick={(event) => event.stopPropagation()}
              >
                Download PDF
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center border border-cream/25 text-cream hover:bg-cream hover:text-ink"
                aria-label="Close enlarged poster"
              >
                <span aria-hidden="true" className="text-2xl">&#215;</span>
              </button>
            </div>

            <motion.div
              className="mx-auto mt-14 max-w-[1500px] bg-white p-1 shadow-2xl"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image src="/poster.png" alt="Research poster enlarged" width={2600} height={2080} className="h-auto w-full" sizes="95vw" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
