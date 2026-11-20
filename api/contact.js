// Vercel serverless function: emails contact-form enquiries via Resend (https://resend.com).
// Set RESEND_API_KEY in Vercel → Project → Settings → Environment Variables.
// Optional: CONTACT_TO (defaults to the portfolio email), CONTACT_FROM (a sender on a domain verified in Resend).
const TO = process.env.CONTACT_TO || 'sivadarshanus@gmail.com'
const FROM = process.env.CONTACT_FROM || 'Portfolio enquiries <onboarding@resend.dev>'
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]).slice(0, 4000)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  if (b.website) return res.status(200).json({ ok: true }) // honeypot: silently drop bots
  if (!b.name || !b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) || !b.message)
    return res.status(400).json({ ok: false, error: 'Please fill in your name, a valid email and a message.' })
  if (!process.env.RESEND_API_KEY) return res.status(501).json({ ok: false, error: 'Email sending is not configured yet.' })

  const rows = [
    ['Name', b.name],
    ['Email', b.email],
    ['Store or website', b.store],
    ['Service', b.service],
    ['Budget', b.budget],
    ['Timeline', b.timeline],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#667"><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join('')
  const html = `<h2 style="font-family:Georgia,serif">New enquiry: ${esc(b.service || 'General')}</h2><table>${rows}</table><p style="white-space:pre-wrap;margin-top:16px">${esc(b.message)}</p>`

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: b.email, subject: `Portfolio enquiry: ${b.service || 'General'} from ${b.name}`, html }),
  })
  if (!r.ok) return res.status(502).json({ ok: false, error: 'Could not send right now.' })
  return res.status(200).json({ ok: true })
}
