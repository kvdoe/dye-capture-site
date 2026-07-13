import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="relative isolate min-h-[100dvh] overflow-hidden bg-cream text-ink"
      aria-labelledby="not-found-title"
    >
      <div className="water-gradient absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="surface-noise absolute inset-0" aria-hidden="true" />

      <div className="container-x relative grid min-h-[100dvh] items-center gap-14 py-20 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] md:py-24">
        <section className="max-w-2xl">
          <p className="metric-mono text-sm font-semibold text-teal-deep">404</p>
          <h1
            id="not-found-title"
            className="mt-5 text-5xl leading-[0.96] sm:text-6xl lg:text-7xl"
          >
            Page not found.
          </h1>
          <p className="mt-7 max-w-[56ch] text-base leading-relaxed text-ink/75 sm:text-lg">
            This project is a single-page research record. The address may be
            incorrect, or the page may have moved.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link className="action-primary" href="/">
              Return to the study
            </Link>
            <Link className="action-secondary" href="/#results">
              View measured results
            </Link>
          </div>
        </section>

        <div
          className="relative mx-auto aspect-square w-full max-w-[27rem] overflow-hidden rounded-full border border-teal/40 bg-teal-wash"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-[20%] aspect-square w-[36%] -translate-x-1/2 rounded-full bg-ink shadow-lift">
            <span className="absolute left-[28%] top-[24%] h-[10%] w-[10%] rounded-full bg-teal-soft" />
            <span className="absolute right-[24%] top-[34%] h-[13%] w-[13%] rounded-full bg-cream" />
            <span className="absolute bottom-[25%] left-[40%] h-[9%] w-[9%] rounded-full bg-teal" />
          </div>
          <div className="absolute -bottom-[27%] left-1/2 h-[66%] w-[138%] -translate-x-1/2 rounded-[50%] bg-teal" />
          <div className="absolute bottom-[27%] left-1/2 h-px w-[76%] -translate-x-1/2 bg-cream/80" />
        </div>
      </div>
    </main>
  );
}
