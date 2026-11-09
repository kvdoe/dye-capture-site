import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const PAGES = [
  {
    href: "/materials",
    kicker: "Materials",
    title: "The materials behind the beads.",
    body: "Coconut-shell activated carbon, sodium alginate, chitosan, and Reactive Blue 140, with the role each one played.",
    photo: "/photos/material-carbon.png",
  },
  {
    href: "/protocol",
    kicker: "Protocol",
    title: "How the experiment was run.",
    body: "How the beads were made, coated, dosed, shaken for 24 hours, and measured with ImageJ.",
    photo: "/photos/img-9557.jpg",
  },
];

export default function StudyPages() {
  return (
    <section id="study-pages" aria-label="Materials and protocol pages" className="bg-cream text-ink">
      <div className="container-x pb-16 lg:pb-24">
        <Reveal>
          <div className="border-b border-ink/20 pb-4">
            <p className="kicker text-teal">How the study was run</p>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {PAGES.map((page, index) => (
            <Reveal key={page.href} delay={index * 0.06}>
              <Link href={page.href} className="group grid overflow-hidden border border-ink/20 bg-paper transition-colors hover:border-teal focus-visible:border-teal">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#0a1226]">
                  <Image
                    src={page.photo}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">{page.kicker}</p>
                  <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.02] tracking-[-0.03em]">{page.title}</h3>
                  <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-ink/65">{page.body}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-teal">
                    Open the page <span aria-hidden="true">&#8599;</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
