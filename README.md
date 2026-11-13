# Portfolio

Product design portfolio — Vite + React + TypeScript, Framer Motion, GSAP ScrollTrigger and Lenis smooth scroll.

```bash
npm install
npm run dev
```

- **Copy:** `src/content.ts` holds the hero and About section; `src/data/work.ts` holds every case study (chapters, blocks, key facts for the sticky bar). Open items still to fill in are listed at the top of that file.
- **Media:** case study videos and images live in `public/work/<project>/`.
- **Case studies:** each entry gets its own page at `/work/<slug>`. The `public/_redirects` (Netlify) and `vercel.json` files make those URLs work after deploy.
- **Typefaces:** Mandrel (display serif) and Neue Haas Grotesk (UI sans) are commercial fonts. Add an Adobe Fonts kit link in `index.html`, or self-host licensed `.woff2` files via `src/styles/fonts.css`. Until you do, Newsreader and Inter Tight stand in for them.
- **Liquid glass:** see `src/components/LiquidGlass.tsx` and the `.glass*` rules in `src/styles/global.css`. The SVG refraction runs in Chromium and Firefox; Safari gets the frosted and specular layers.
