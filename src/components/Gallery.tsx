"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { GALLERY, photoSrc, type Photo } from "@/lib/photos";
import Lightbox from "./Lightbox";

const FEATURED_FILES = [
  "img-9218.jpg",
  "img-9500.jpg",
  "img-9527.jpg",
  "img-9558.jpg",
  "shot-81070487.jpg",
  "img-9602.jpg",
  "img-9625.jpg",
  "img-9572.jpg",
  "img-9515.jpg",
  "img-9641.jpg",
  "img-9610.jpg",
  "img-9611.jpg",
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const photos = useMemo(
    () => FEATURED_FILES.map((file) => GALLERY.find((photo) => photo.file === file)).filter((photo): photo is Photo => Boolean(photo)),
    [],
  );

  const rows: { key: string; items: Photo[]; reverse: boolean }[] = [
    { key: "row1", items: photos, reverse: false },
    { key: "row2", items: [...photos].reverse(), reverse: true },
  ];

  return (
    <section id="gallery" className="relative overflow-hidden bg-ink py-20 text-cream lg:py-28">
      <div className="pointer-events-none absolute inset-0 water-gradient opacity-15" />

      <div className="relative z-10 mb-10 flex flex-wrap items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <h2 className="max-w-[16ch] text-[clamp(2.3rem,4.8vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.055em]">
          The experiment, documented.
        </h2>
        <p className="max-w-[30ch] text-right font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-cream/45">
          Auto-playing reel &middot; Click any photo to enlarge
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.key}
            className="gallery-marquee flex w-max items-stretch"
            style={{ animationDirection: row.reverse ? "reverse" : "normal" }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1 ? "true" : undefined} className="flex items-stretch gap-3 pr-3">
                {row.items.map((photo) => {
                  const photoIndex = photos.indexOf(photo);
                  return (
                    <button
                      key={`${row.key}-${copy}-${photo.file}`}
                      type="button"
                      tabIndex={copy === 1 ? -1 : 0}
                      onClick={() => setIndex(photoIndex)}
                      className="group relative h-[230px] w-[68vw] shrink-0 overflow-hidden border border-cream/20 text-left sm:h-[280px] sm:w-[400px]"
                      aria-label={`Open photograph: ${photo.alt}`}
                    >
                      <Image
                        src={photoSrc(photo.file)}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                        sizes="(max-width: 640px) 68vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                      <span className="click-cue absolute right-3 top-3 z-10 bg-ink/60 text-cream backdrop-blur-sm transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                        Click to enlarge
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-teal-soft">{photo.cat}</p>
                        <p className="mt-1 truncate text-xs leading-relaxed text-cream/85">{photo.alt}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 px-5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-cream/45 sm:px-8 lg:px-12">
        <span>{photos.length} photographs from the actual experiment</span>
        <a href="#poster" className="text-link text-cream">Open the poster</a>
      </div>

      <Lightbox photos={photos} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}
