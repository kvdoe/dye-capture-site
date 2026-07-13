import Image from "next/image";
import { acknowledgments, meta, references } from "@/lib/data";
import Reveal from "./Reveal";

export default function Team() {
  return (
    <footer id="team" className="surface-noise relative overflow-hidden bg-ink text-cream">
      <div className="container-x section-space relative pb-10">
        <Reveal>
          <div className="border-b border-cream/20 pb-4">
            <p className="kicker text-teal-soft">Contributors</p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h2 className="max-w-[14ch] text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[0.94] text-cream">
              Researchers, mentors, and sources.
            </h2>
            <p className="max-w-[52ch] text-lg leading-relaxed text-cream/70 lg:justify-self-end">
              This project was completed through the UT High School Research Academy Sustainable Fashion Materials program.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="relative mt-14 aspect-[16/10] overflow-hidden border border-cream/20 sm:aspect-[21/9]">
            <Image
              src="/photos/img-9602.jpg"
              alt="Researchers working with treated flasks and bead formulations in the laboratory"
              fill
              className="photo-grade object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 max-w-xl p-6 text-sm leading-relaxed text-cream/80 sm:p-8">
              Laboratory work during the final formulation comparison.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-teal-soft">Student researchers</h3>
              <ol className="mt-6 border-t border-cream/20">
                {meta.team.map((name, index) => (
                  <li key={name} className="grid grid-cols-[42px_1fr] gap-4 border-b border-cream/20 py-5">
                    <span className="metric-mono text-xs text-cream/45">0{index + 1}</span>
                    <span className="font-display text-2xl text-cream">{name}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-12">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-clay-soft">Mentors</h3>
                <p className="mt-5 text-base leading-relaxed text-cream/75">{meta.mentors.join(" · ")}</p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-teal-soft">Acknowledgments</h3>
              <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-cream/75">{acknowledgments}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <details className="group mt-12 border-y border-cream/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 marker:content-none">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-teal-soft">References</span>
                  <span className="flex items-center gap-3">
                    <span className="click-cue text-teal-soft">Click to expand</span>
                    <span aria-hidden="true" className="grid h-9 w-9 place-items-center border border-cream/25 text-lg group-open:rotate-45">+</span>
                  </span>
                </summary>
                <ol className="space-y-5 border-t border-cream/20 py-6">
                  {references.map((reference, index) => (
                    <li key={reference.href} className="grid grid-cols-[30px_1fr] gap-3 text-sm leading-relaxed text-cream/65">
                      <span className="metric-mono text-cream/40">{index + 1}</span>
                      <a href={reference.href} target="_blank" rel="noopener noreferrer" className="text-link w-fit hover:text-cream">
                        {reference.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-cream/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="max-w-2xl font-display text-xl leading-tight text-cream sm:text-2xl">{meta.title}</p>
            <p className="mt-3 text-sm text-cream/55">{meta.org} · {meta.program}</p>
          </div>
          <div className="flex gap-5 text-sm font-semibold">
            <a href="/poster.pdf" className="text-link">Poster PDF</a>
            <a href="#top" className="text-link">Back to top <span aria-hidden="true">&#8593;</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
