# NAMMA SIRSI · ನಮ್ಮ ಶಿರಸಿ

An immersive, scroll-driven 3D experience of Sirsi, Uttara Kannada, Karnataka.
Next.js 16 · React Three Fiber · GSAP ScrollTrigger · Lenis · Tailwind v4 · Leaflet.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Deploy
Push to GitHub and import in Vercel (framework: Next.js, no env vars needed).

## Content
- `src/data/sources.ts` – 26 cited sources; every claim references ids.
- `src/data/content.ts` – bilingual (English/ಕನ್ನಡ) chapters, places, itineraries.
- `src/data/archive.ts` – heritage timeline and living practices.
- Distances are shown as ranges; coordinates appear only where verified.

## Photography
Chapter photography is bundled locally in `public/photos/`. Photographer, licence, and source credits appear beside each image and are listed in `public/photos/credits.json`.

## Notes
The 3D world is a stylised interpretation, not a survey. Its terrain, river valleys, forest canopy, areca groves, waterfall spray, and chapter-specific atmosphere are generated locally; no external 3D assets are required. Scene detail and shadow quality adapt to the device tier, pixel ratio eases down under sustained frame pressure, and chapter photography lazy-loads. A static atmospheric background keeps the text and map usable if WebGL is unavailable. Map tiles (OpenStreetMap) need internet.
