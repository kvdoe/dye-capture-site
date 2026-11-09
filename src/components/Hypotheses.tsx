import Link from "next/link";
import { hypotheses, meta } from "@/lib/data";
import Reveal from "./Reveal";

export default function Hypotheses() {
  return (
    <section id="hypotheses" aria-labelledby="hypotheses-heading" className="bg-paper text-ink">
      <div className="container-x py-14 sm:py-16 lg:py-20">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <div>
              <p className="kicker text-teal">Design and hypotheses</p>
              <h2 id="hypotheses-heading" className="mt-5 max-w-[16ch] text-[clamp(2rem,3.6vw,3.8rem)] leading-[0.96]">
                Three carbon loadings, two surfaces, eighteen flasks.
              </h2>
              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-ink/70">
                A 3 x 2 factorial design: 0, 10, and 20 wt% coconut-shell activated carbon relative to alginate solids, each uncoated or chitosan-coated, with three replicate flasks per formulation plus dye-only controls. {meta.venue}.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/materials" className="action-secondary">
                  The four materials
                  <span aria-hidden="true">&#8599;</span>
                </Link>
                <Link href="/protocol" className="action-secondary">
                  The five-step protocol
                  <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>

            <ol className="grid gap-4">
              {hypotheses.map((hypothesis) => (
                <li
                  key={hypothesis.code}
                  className={`border-l-4 bg-cream p-6 shadow-soft ${hypothesis.supported ? "border-teal" : "border-clay"}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/55">{hypothesis.code}</p>
                    <p className={`font-mono text-xs font-semibold uppercase tracking-[0.16em] ${hypothesis.supported ? "text-teal" : "text-clay"}`}>
                      {hypothesis.outcome}
                    </p>
                  </div>
                  <p className="mt-3 text-lg font-medium leading-snug tracking-[-0.02em]">{hypothesis.statement}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{hypothesis.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
