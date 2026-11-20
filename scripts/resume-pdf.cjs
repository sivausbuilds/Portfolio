// Renders /resume to a text-based (ATS-readable) A4 PDF in /public.
// Usage: start the dev server (npm run dev), then: npm run resume:pdf
const { chromium } = require('playwright')
const path = require('path')
;(async () => {
  const url = process.env.RESUME_URL || 'http://127.0.0.1:5173/resume'
  const out = path.join(__dirname, '..', 'public', 'Sivadarshan-US-Product-Designer-Resume.pdf')
  const b = await chromium.launch()
  const p = await b.newPage()
  await p.goto(url, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  await p.emulateMedia({ media: 'print' })
  await p.pdf({ path: out, format: 'A4', printBackground: false, preferCSSPageSize: true })
  await b.close()
  console.log('wrote', out)
})()
