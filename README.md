# Dye Capture research site

An interactive research website for:

> The Effects of Carbon Loading and Chitosan Coating on Activated Carbon-Alginate Beads for Reactive Textile Dye Removal
>
> The University of Texas at Austin, College of Natural Sciences. Poster prepared for the 2026 AIChE Annual Student Conference.

Live site: [dye-capture-site.vercel.app](https://dye-capture-site.vercel.app/)

The site presents the experiment as a scroll-directed visual narrative. The home page carries the context, hypotheses, interactive results chamber, statistics, conclusion, poster and figures, photo archive, and trailer. The four materials and the five-step protocol each have their own page (`/materials`, `/protocol`).

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

- Research title, authors, and mentors
- Research question, context, and hypotheses
- Material descriptions
- Five protocol steps
- Apparent dye removal and wet-bead mass gain (mean and SD of three flasks), coating penalty, Tukey groups, and the two-way ANOVA summary
- Discussion, conclusions, limitations, future work, references, and poster figure captions

All means and SDs come from the 18 per-flask values in `public/dye-capture-vials.csv`. Solution-volume decrease is a coating-group observation read to the nearest mL.

### Page sections

The home page order is controlled by [`src/app/page.tsx`](src/app/page.tsx). The materials and protocol pages are `src/app/materials/page.tsx` and `src/app/protocol/page.tsx`.

The active visual sections are:

- `src/components/Hero.tsx` and `src/components/DyeFlowCanvas.tsx`
- `src/components/Problem.tsx`
- `src/components/Hypotheses.tsx`
- `src/components/CinematicResults.tsx` (interactive chamber, results table, statistics)
- `src/components/DataTrack.tsx`
- `src/components/BigFinding.tsx`
- `src/components/Conclusion.tsx` (discussion, conclusion, limitations, next experiments)
- `src/components/Poster.tsx` (poster plus the seven poster figures)
- `src/components/StudyPages.tsx` (links to the materials and protocol pages)
- `src/components/Gallery.tsx`
- `src/components/Trailer.tsx`
- `src/components/Team.tsx`
- `src/components/Materials.tsx` and `src/components/Method.tsx` (own pages)

Infinite animations (marquees, chamber water, canvas, video) pause when their section is off-screen via `src/hooks/useInView.ts`. The trailer video is `preload="none"` with a poster frame and only plays while visible.

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

Replace these files when the poster changes:

- `public/poster.png` for the on-page preview (3024 x 2592)
- `public/poster.pdf` for the downloadable document
- `public/figures/*.png` for the seven poster figures (captions live in `figures` in `src/lib/data.ts`)

Keep the same filenames so no component changes are needed.

### Downloadable data

Two public CSVs: [`public/dye-capture-results.csv`](public/dye-capture-results.csv) (formulation means and SDs) and [`public/dye-capture-vials.csv`](public/dye-capture-vials.csv) (the 18 per-flask values plus the control). Update both whenever the values in `src/lib/data.ts` change.

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
