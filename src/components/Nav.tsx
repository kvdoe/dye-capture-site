"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#context", label: "Context" },
  { href: "#materials", label: "Formulations" },
  { href: "#method", label: "Protocol" },
  { href: "#results", label: "Results" },
  { href: "#gallery", label: "Archive" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("context");
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > window.innerHeight * 0.78);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-34% 0px -58% 0px", threshold: [0, 0.25, 0.6] }
    );

    LINKS.forEach(({ href }) => {
      const element = document.getElementById(href.slice(1));
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const focusables = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusables?.[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
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
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,box-shadow] duration-500 ${
          scrolled
            ? "border-ink/10 bg-cream/90 text-ink shadow-[0_12px_40px_rgba(31,33,31,0.08)] backdrop-blur-xl"
            : "border-transparent bg-transparent text-cream"
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Primary navigation">
          <a href="#top" className="group flex items-center gap-3" aria-label="Dye Capture, back to top">
            <span className={`relative grid h-9 w-9 place-items-center border ${scrolled ? "border-ink/25" : "border-cream/35"}`}>
              <span className="h-2.5 w-2.5 rounded-full bg-teal transition-transform duration-300 group-hover:scale-125" />
              <span className="absolute inset-1.5 rounded-full border border-teal/25" />
            </span>
            <span className="font-display text-[0.95rem] font-semibold leading-[0.92] tracking-[-0.045em]">
              DYE
              <br />
              <span className="text-teal">CAPTURE</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            <ul className="flex items-center gap-6">
              {LINKS.map((link) => {
                const current = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={current ? "location" : undefined}
                      className={`relative py-3 text-[0.78rem] font-semibold ${
                        current
                          ? scrolled
                            ? "text-teal"
                            : "text-teal-soft"
                          : scrolled
                            ? "text-ink hover:text-teal"
                            : "text-cream/80 hover:text-cream"
                      }`}
                    >
                      {link.label}
                      {current && (
                        <motion.span
                          layoutId="active-nav-rule"
                          className="absolute inset-x-0 bottom-1 h-px bg-teal"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#poster"
              className={`inline-flex min-h-10 items-center gap-2 border px-4 py-2 text-sm font-semibold ${
                scrolled ? "border-ink/25 text-ink hover:bg-ink hover:text-cream" : "border-cream/35 text-cream hover:bg-cream hover:text-ink"
              }`}
            >
              Research poster
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className={`flex min-h-11 min-w-11 items-center justify-center border lg:hidden ${scrolled ? "border-ink/25" : "border-cream/35"}`}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span className="grid gap-1.5" aria-hidden="true">
              <span className={`block h-px w-5 ${scrolled ? "bg-ink" : "bg-cream"}`} />
              <span className={`block h-px w-5 ${scrolled ? "bg-ink" : "bg-cream"}`} />
            </span>
          </button>
        </nav>
        <motion.div style={{ scaleX: progress }} className="h-0.5 origin-left bg-teal" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] flex flex-col bg-cream px-5 pb-8 pt-5 lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between border-b border-ink/15 pb-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">Study index</p>
              <button
                type="button"
                onClick={() => {
                  close();
                  triggerRef.current?.focus();
                }}
                className="flex min-h-11 min-w-11 items-center justify-center border border-ink/25"
                aria-label="Close navigation"
              >
                <span aria-hidden="true" className="text-2xl leading-none">&#215;</span>
              </button>
            </div>

            <ol className="mt-8 grid gap-1">
              {LINKS.map((link) => (
                <li key={link.href} className="border-b border-ink/15">
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex min-h-16 items-center justify-between py-3 font-display text-[clamp(1.6rem,8vw,2.5rem)] tracking-[-0.05em]"
                  >
                    {link.label}
                    <span aria-hidden="true" className="font-mono text-sm tracking-normal text-taupe">&#8599;</span>
                  </a>
                </li>
              ))}
            </ol>
            <a href="#poster" onClick={close} className="action-primary mt-auto w-full">
              Open the research poster
              <span aria-hidden="true">&#8599;</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
