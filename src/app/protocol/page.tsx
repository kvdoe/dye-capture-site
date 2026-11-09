import type { Metadata } from "next";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Method from "@/components/Method";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Protocol | Dye Capture",
  description:
    "The five-step protocol for the carbon-alginate bead study: mixing, bead formation, chitosan coating, a 24-hour dye run, and ImageJ analysis.",
  alternates: { canonical: "/protocol" },
};

export default function ProtocolPage() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main-content">
        Skip to the protocol
      </a>
      <Nav variant="page" />
      <main id="main-content" className="w-full max-w-full overflow-x-clip bg-ink pt-[72px] text-cream">
        <div className="container-x py-8 sm:py-10">
          <Link href="/" className="text-link text-sm font-semibold text-cream/70 hover:text-teal-soft">
            <span aria-hidden="true">&#8592;</span> Back to the study
          </Link>
        </div>
        <Method />
        <nav aria-label="Continue" className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 py-10">
          <Link href="/#results" className="action-primary">
            See the results
            <span aria-hidden="true">&#8599;</span>
          </Link>
          <Link href="/materials" className="inline-flex min-h-12 items-center gap-3 border border-cream/30 px-6 py-3 text-sm font-semibold text-cream hover:bg-cream hover:text-ink">
            The four materials
          </Link>
        </nav>
      </main>
      <Team />
    </SmoothScroll>
  );
}
