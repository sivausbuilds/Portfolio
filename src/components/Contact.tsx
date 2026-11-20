import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'
import { site } from '../content'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'
import { Rich } from './Rich'
import { LinkedInIcon, MailIcon } from './Social'

const ease = [0.22, 1, 0.36, 1] as const
const SERVICES = [
  { id: 'Shopify website build', note: 'A new store, designed and built end to end' },
  { id: 'Website revamp', note: 'Redesign an existing store around conversion' },
  { id: 'Custom Shopify build', note: 'Sections, upsells, cart drawers, integrations' },
  { id: 'Shopify consulting', note: 'CRO audit, UX review, roadmap' },
  { id: 'Something else', note: 'Product design or anything around Shopify' },
]
const PRODUCT_SERVICES = [
  { id: 'Product design', note: 'Research, flows and UI for a digital product' },
  { id: 'MVP / 0-to-1 build', note: 'From problem framing and PRD to a working MVP' },
  { id: 'UX audit', note: 'Find where users hesitate, with a prioritised fix list' },
  { id: 'Shopify build', note: 'A store or custom feature in and around Shopify' },
  { id: 'Something else', note: 'Tell me what you have in mind' },
]
const BUDGETS = ['Under $1k', '$1k–3k', '$3k–7k', '$7k+', 'Not sure yet']
const TIMELINES = ['ASAP', '1–2 months', '3+ months', 'Flexible']

type Status = 'idle' | 'sending' | 'sent' | 'error'

type Copy = { label: string; title: string; lead: string; service: string }
const COPY: Record<'shopify' | 'product', Copy & { services: typeof SERVICES }> = {
  shopify: {
    label: '(06) — Work with me',
    title: 'Need a Shopify store *that sells?*',
    lead: 'New builds, revamps, custom sections and consulting in and around Shopify. Tell me about the project and I’ll ==reply within two working days==.',
    service: 'Shopify website build',
    services: SERVICES,
  },
  product: {
    label: 'Work with me',
    title: 'Have a product *to shape?*',
    lead: 'Product design, 0-to-1 MVPs and UX for digital products, or a custom build in and around Shopify. Tell me about it and I’ll ==reply within two working days==.',
    service: 'Product design',
    services: PRODUCT_SERVICES,
  },
}

export function Contact({ variant = 'shopify', label }: { variant?: 'shopify' | 'product'; label?: string }) {
  const copy = COPY[variant]
  const [service, setService] = useState(copy.service)
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const data = { ...Object.fromEntries(f.entries()), service, budget, timeline } as Record<string, string>
    setStatus('sending')
    setError('')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (r.ok) return setStatus('sent')
      const j = await r.json().catch(() => ({}))
      if (r.status === 501 || r.status === 404) return openMail(data) // no email service configured: hand off to the mail app
      throw new Error(j.error || 'Something went wrong.')
    } catch (err) {
      if (err instanceof TypeError) return openMail(data)
      setError((err as Error).message)
      setStatus('error')
    }
  }
  const openMail = (d: Record<string, string>) => {
    const body = [`Name: ${d.name}`, `Email: ${d.email}`, d.store && `Store: ${d.store}`, `Service: ${d.service}`, d.budget && `Budget: ${d.budget}`, d.timeline && `Timeline: ${d.timeline}`, '', d.message].filter((x) => x !== undefined && x !== '').join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${d.service}`)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  return (
    <section id="contact" className="ct">
      <div className="container ct__wrap">
        <div className="ct__intro">
          <p className="label">{label ?? copy.label}</p>
          <h2 className="ct__title">
            <motion.span initial={{ y: '40%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
              <Rich text={copy.title} fancy />
            </motion.span>
          </h2>
          <p className="ct__lead">
            <Rich text={copy.lead} />
          </p>
          <ul className="ct__services">
            {copy.services.slice(0, 4).map((s) => (
              <li key={s.id}>
                <span className="ct__tick" aria-hidden />
                <span><strong>{s.id}</strong> · {s.note}</span>
              </li>
            ))}
          </ul>
          <div className="ct__direct">
            <span className="label">Or reach me directly</span>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="ct__chan">
              <span className="ct__chan-icon"><LinkedInIcon /></span>
              <span><strong>LinkedIn</strong><em>linkedin.com/in/sivadarshanus</em></span>
              <Arrow />
            </a>
            <a href={`mailto:${site.email}`} className="ct__chan">
              <span className="ct__chan-icon"><MailIcon /></span>
              <span><strong>Email</strong><em>{site.email}</em></span>
              <Arrow />
            </a>
          </div>
        </div>

        <LiquidGlass className="ct__card" interactive={false}>
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.div key="done" className="ct__done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
                <svg viewBox="0 0 52 52" className="ct__check" aria-hidden>
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l7 7 15-16" />
                </svg>
                <h3 className="ct__done-title">Thank you, <em>message sent.</em></h3>
                <p>I’ll get back to you within two working days. For anything urgent, message me on LinkedIn.</p>
                <button type="button" className="btn btn--glass-dark" onClick={() => setStatus('idle')}>Send another</button>
              </motion.div>
            ) : (
              <motion.form key="form" className="ct__form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <fieldset className="ct__field">
                  <legend className="label">What do you need?</legend>
                  <LayoutGroup id="svc">
                    <div className="ct__chips" role="radiogroup">
                      {copy.services.map((s) => (
                        <button key={s.id} type="button" role="radio" aria-checked={service === s.id} className={`ct__chip ${service === s.id ? 'is-on' : ''}`} onClick={() => setService(s.id)}>
                          {service === s.id && <motion.span layoutId="svc-pill" className="ct__chip-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                          <span>{s.id}</span>
                        </button>
                      ))}
                    </div>
                  </LayoutGroup>
                </fieldset>

                <div className="ct__row">
                  <Input name="name" label="Your name" required autoComplete="name" />
                  <Input name="email" label="Email" type="email" required autoComplete="email" />
                </div>
                <Input name="store" label="Store or website (optional)" placeholder="yourbrand.com" />

                <div className="ct__row">
                  <Pills label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />
                  <Pills label="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />
                </div>

                <label className="ct__input ct__input--area">
                  <textarea name="message" required rows={4} placeholder=" " />
                  <span>Tell me about the project</span>
                </label>
                <input className="ct__hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden />

                <div className="ct__submit">
                  <button type="submit" className="btn btn--shimmer" disabled={status === 'sending'}>
                    <span className="btn--shimmer__sweep" aria-hidden />
                    <span className="btn--shimmer__label">{status === 'sending' ? 'Sending…' : 'Send enquiry'} <Arrow /></span>
                  </button>
                  {status === 'error' && <span className="ct__error">{error} You can also email {site.email}.</span>}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </LiquidGlass>
      </div>
    </section>
  )
}

function Input({ name, label, ...rest }: { name: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="ct__input">
      <input name={name} placeholder={rest.placeholder ?? ' '} {...rest} />
      <span>{label}</span>
    </label>
  )
}

function Pills({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="ct__field">
      <legend className="label">{label}</legend>
      <div className="ct__pills">
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} className={value === o ? 'is-on' : ''} onClick={() => onChange(value === o ? '' : o)}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
