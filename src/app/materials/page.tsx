import type { Metadata } from "next";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Materials from "@/components/Materials";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Materials | Dye Capture",
  description:
    "The four materials behind the carbon-alginate bead study: coconut-shell activated carbon, sodium alginate, chitosan, and Reactive Blue 140.",
  alternates: { canonical: "/materials" },
};

export default function MaterialsPage() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main-content">
        Skip to the materials
      </a>
      <Nav variant="page" />
      <main id="main-content" className="w-full max-w-full overflow-x-clip bg-cream pt-[72px] text-ink">
        <div className="container-x pt-10 sm:pt-14">
          <Link href="/" className="text-link text-sm font-semibold text-ink/70 hover:text-teal">
            <span aria-hidden="true">&#8592;</span> Back to the study
          </Link>
        </div>
        <Materials />
        <nav aria-label="Continue" className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 py-10">
          <Link href="/protocol" className="action-primary">
            Next: the five-step protocol
            <span aria-hidden="true">&#8599;</span>
          </Link>
          <Link href="/#results" className="action-secondary">
            Jump to the results
          </Link>
        </nav>
      </main>
      <Team />
    </SmoothScroll>
  );
}
