# Dye Capture research site

An interactive research website for:

> Capturing an Anionic Reactive Textile Dye with Coconut-Shell Carbon and Alginate Beads
>
> Effects of Carbon Loading and a Chitosan Coating

Live site: [dye-capture-site.vercel.app](https://dye-capture-site.vercel.app/)

The site presents the experiment as a scroll-directed visual narrative. It combines one clearly labeled conceptual environmental image with original laboratory photography, a five-part pinned protocol, an interactive results chamber, complete mean-value tables, a natural-color coated and uncoated comparison, a moving photo archive, and the full research poster.

Generated imagery is never used as experimental evidence. The bead, vial, procedure, and result photographs are the original project images and should not be recolored.

## Run it locally

Use Node.js 24.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before publishing changes, run:

```bash
npm run check
```

This runs ESLint, TypeScript, and the production build.

## Where to edit

### Scientific copy and data

Edit [`src/lib/data.ts`](src/lib/data.ts).

This file contains:

- Research title, team, and mentors
- Research question and context
- Material descriptions
- Five protocol steps
- Mean dye removal, swelling, selectivity, and ImageJ values
- Conclusions, limitations, future work, and references

The removal, swelling, and selectivity values are formulation means from three replicates. Water uptake values are approximate group-level observations. Do not add error bars or uncertainty values unless the replicate-level measurements are available.

### Page sections

The page order is controlled by [`src/app/page.tsx`](src/app/page.tsx).

The active visual sections are:

- `src/components/Hero.tsx` and `src/components/DyeFlowCanvas.tsx`
- `src/components/Problem.tsx`
- `src/components/Materials.tsx`
- `src/components/Method.tsx`
- `src/components/CinematicResults.tsx`
- `src/components/DataTrack.tsx`
- `src/components/BigFinding.tsx`
- `src/components/Gallery.tsx`
- `src/components/Conclusion.tsx`
- `src/components/Poster.tsx`
- `src/components/Team.tsx`

Most long-form motion uses GSAP ScrollTrigger. Controls and navigation use React state and Framer Motion where appropriate. Reduced-motion users receive readable normal-flow alternatives.

### Colors, fonts, and global styling

- Palette and Tailwind theme: `tailwind.config.ts`
- Fonts and page metadata: `src/app/layout.tsx`
- Global styles and reusable classes: `src/app/globals.css`

The site uses Geist for display and body text, with IBM Plex Mono for measurements and sample labels.

### Images

Original laboratory photographs live in `public/photos/`. Gallery descriptions and categories live in [`src/lib/photos.ts`](src/lib/photos.ts).

The single generated environmental image is `public/visuals/textile-dye-pollution-hero.png`. It is disclosed on the page as a conceptual visualization and should not be moved into an evidence section.

To add a real laboratory image, place it in `public/photos/`, then add its filename, description, category, and orientation to `src/lib/photos.ts`.

### Research poster

Replace both files when the poster changes:

- `public/poster.png` for the on-page preview
- `public/poster.pdf` for the downloadable document

Keep the same filenames so no component changes are needed.

### Downloadable data

The public CSV is [`public/dye-capture-results.csv`](public/dye-capture-results.csv). Update it whenever the values in `src/lib/data.ts` change. Preserve the distinction between measured formulation means and approximate group-level observations.

## Project stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 3
- GSAP 3 with ScrollTrigger
- Framer Motion 12
- Next Image optimization
- Vercel deployment

No environment variables are required.

## Deploy to Vercel

The local project is linked to the existing `dye-capture-site` Vercel project. To publish the current folder:

```bash
vercel --prod
```

For a Git-based workflow:

1. Create a Git repository in this folder.
2. Commit the source files. The included `.gitignore` excludes dependencies, build output, and local Vercel settings.
3. Push the repository to GitHub.
4. Import it into Vercel or connect it to the existing project.
5. Keep the framework preset set to Next.js and the Node.js version set to 24.x.

Vercel uses `npm run build` and serves the generated Next.js output automatically.

## Production details

- The site is statically prerendered.
- Navigation, interactive controls, and dialogs support keyboard use.
- Motion respects the user's reduced-motion preference.
- Result values remain available in a visible table without interaction.
- The gallery and poster dialogs restore focus when closed.
- Metadata includes a canonical URL, Open Graph image, sitemap, robots file, favicon, and structured research data.
- Security headers are configured in `next.config.mjs`.
