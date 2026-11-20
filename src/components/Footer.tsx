import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import { RESUME_PDF } from '../data/resume'
import { navigate } from '../lib/router'
import { scrollTo } from '../lib/smooth'
import { Arrow } from './Header'
import { Rich } from './Rich'

const ease = [0.22, 1, 0.36, 1] as const
const WORD = 'Sivadarshan'

export function Footer() {
  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.location.pathname !== '/') navigate('/', hash)
    else scrollTo(hash)
  }
  const links = [
    { title: 'Explore', items: [
      { label: 'Case studies', href: '/#work', on: go('#work') },
      { label: 'Websites built', href: '/#websites', on: go('#websites') },
      { label: 'About', href: '/#about', on: go('#about') },
      { label: 'What I do', href: '/#services', on: go('#services') },
    ] },
    { title: 'Resume', items: [
      { label: 'View resume', href: '/resume', on: (e: React.MouseEvent) => { e.preventDefault(); navigate('/resume') } },
      { label: 'Download PDF', href: RESUME_PDF, download: true },
    ] },
  ]

  return (
    <footer id="contact" className="ft">
      <span className="ft__grid-bg" aria-hidden />
      <span className="ft__glow" aria-hidden />
      <div className="container">
        <div className="ft__top">
          <p className="label">(06) — Contact</p>
          <span className="status ft__status"><span className="status__dot" aria-hidden /> {site.status}</span>
        </div>

        <h2 className="ft__title" aria-label="Let’s make your product feel obvious.">
          {['Let’s make your', 'product *feel obvious.*'].map((l, i) => (
            <span className="ft__line" key={l} aria-hidden>
              <motion.span
                className="ft__line-in"
                initial={{ y: '110%', rotate: 2, filter: 'blur(8px)' }}
                whileInView={{ y: '0%', rotate: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.3, ease, delay: i * 0.12 }}
              >
                <Rich text={l} fancy />
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          className="ft__actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          <a className="btn btn--shimmer" href={`mailto:${site.email}`}>
            <span className="btn--shimmer__sweep" aria-hidden />
            <span className="btn--shimmer__label">Email me <Arrow /></span>
          </a>
          <CopyEmail />
        </motion.div>

        <div className="ft__cols">
          {links.map((c, ci) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: 0.1 + ci * 0.08 }}>
              <p className="label">{c.title}</p>
              <ul>
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a className="ft__link" href={it.href} onClick={it.on} download={'download' in it ? true : undefined}>
                      <span className="ft__roll" data-text={it.label}><span>{it.label}</span></span>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: 0.26 }}>
            <p className="label">Based in</p>
            <ul>
              <li>Bengaluru, India</li>
              <li className="ft__mono">12.9716° N · 77.5946° E</li>
            </ul>
          </motion.div>
          <div className="ft__totop">
            <button type="button" onClick={() => scrollTo(0)} aria-label="Back to top">
              <span className="ft__totop-ring" aria-hidden>
                <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" /></svg>
                <span>↑</span>
              </span>
              Back to top
            </button>
          </div>
        </div>

        <Wordmark />

        <div className="ft__base">
          <span>© {new Date().getFullYear()} Sivadarshan U S</span>
          <Ticker />
          <span>Designed &amp; built by me</span>
        </div>
      </div>
    </footer>
  )
}

/** Big wordmark: letters rise in, a shimmer passes over, and a light follows the cursor. */
function Wordmark() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const mask = useMotionTemplate`radial-gradient(260px circle at ${sx}% ${sy}%, #000 0%, transparent 70%)`
  const [hot, setHot] = useState(false)

  const letters = (cls: string) =>
    WORD.split('').map((ch, i) => (
      <motion.span
        key={i}
        className={cls}
        initial={{ y: '70%', opacity: 0, filter: 'blur(14px)' }}
        whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{ duration: 1.4, ease, delay: i * 0.05 }}
      >
        {ch}
      </motion.span>
    ))

  return (
    <div
      ref={ref}
      className="ft__mark"
      aria-hidden
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
    >
      <span className="ft__mark-base">{letters('ft__ch')}</span>
      <span className="ft__mark-shine">{WORD.split('').map((c, i) => <span key={i} className="ft__ch">{c}</span>)}</span>
      <motion.span className="ft__mark-light" style={{ WebkitMaskImage: mask, maskImage: mask, opacity: hot ? 1 : 0 }}>
        {WORD.split('').map((c, i) => <span key={i} className="ft__ch">{c}</span>)}
      </motion.span>
    </div>
  )
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }
  return (
    <button type="button" className="ft__email" onClick={copy}>
      <span>{site.email}</span>
      <span className="ft__copy">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={copied ? 'y' : 'n'} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.25, ease }}>
            {copied ? 'Copied ✓' : 'Copy'}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  )
}

/** Live readout: local time with seconds. */
function Ticker() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="ft__ticker">
      <i aria-hidden /> Local time {t} IST
    </span>
  )
}
