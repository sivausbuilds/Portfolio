# Portfolio

Product design portfolio — Vite + React + TypeScript, Framer Motion, GSAP ScrollTrigger and Lenis smooth scroll.

```bash
npm install
npm run dev
```

- **Resume:** the download is `public/Sivadarshan_US_APM_E-Commerce.pdf`; the `/resume` page mirrors it from `src/data/resume.ts`. Replace both when the resume changes.
- **Copy:** `src/content.ts` holds the hero and About section; `src/data/work.ts` holds every case study (chapters, blocks, key facts for the sticky bar). Open items still to fill in are listed at the top of that file.
- **Media:** case study videos and images live in `public/work/<project>/`.
- **Case studies:** each entry gets its own page at `/work/<slug>`. The `public/_redirects` (Netlify) and `vercel.json` files make those URLs work after deploy.
- **Typefaces:** Mandrel (display serif) and Neue Haas Grotesk (UI sans) are commercial fonts. Add an Adobe Fonts kit link in `index.html`, or self-host licensed `.woff2` files via `src/styles/fonts.css`. Until you do, Newsreader and Inter Tight stand in for them.
- **Liquid glass:** see `src/components/LiquidGlass.tsx` and the `.glass*` rules in `src/styles/global.css`. The SVG refraction runs in Chromium and Firefox; Safari gets the frosted and specular layers.

## Contact form

The form posts to `api/contact.js` (a Vercel function) which emails you through [Resend](https://resend.com).

1. Create a free Resend account and an API key.
2. In Vercel → Project → Settings → Environment Variables add `RESEND_API_KEY`.
   Optional: `CONTACT_TO` (where enquiries go) and `CONTACT_FROM` (a sender on a domain you verified in Resend).
3. Redeploy.

Until the key is set, the form opens the visitor's email app with the enquiry filled in, so no message is lost.
