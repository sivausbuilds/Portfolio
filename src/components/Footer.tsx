import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { site } from '../content'
import { RESUME_PDF } from '../data/resume'
import { navigate } from '../lib/router'
import { scrollTo } from '../lib/smooth'
import { Arrow } from './Header'
import { Rich } from './Rich'

const ease = [0.22, 1, 0.36, 1] as const

export function Footer() {
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
  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.location.pathname !== '/') navigate('/', hash)
    else scrollTo(hash)
  }

  return (
    <footer id="contact" className="ft">
      <span className="ft__glow" aria-hidden />
      <div className="container">
        <div className="ft__top">
          <p className="label">(06) — Contact</p>
          <span className="status ft__status"><span className="status__dot" aria-hidden /> {site.status}</span>
        </div>

        <h2 className="ft__title">
          <motion.span initial={{ y: '30%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
            <Rich text="Let’s make your product *feel obvious.*" fancy />
          </motion.span>
        </h2>

        <div className="ft__actions">
          <a className="btn btn--shimmer" href={`mailto:${site.email}`}>
            <span className="btn--shimmer__sweep" aria-hidden />
            <span className="btn--shimmer__label">Email me <Arrow /></span>
          </a>
          <button type="button" className="ft__email" onClick={copy}>
            <span>{site.email}</span>
            <span className="ft__copy">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="ft__grid">
          <div>
            <p className="label">Explore</p>
            <ul>
              <li><a href="/#work" onClick={go('#work')}>Case studies</a></li>
              <li><a href="/#websites" onClick={go('#websites')}>Websites built</a></li>
              <li><a href="/#about" onClick={go('#about')}>About</a></li>
              <li><a href="/#services" onClick={go('#services')}>What I do</a></li>
            </ul>
          </div>
          <div>
            <p className="label">Resume</p>
            <ul>
              <li><a href="/resume" onClick={(e) => { e.preventDefault(); navigate('/resume') }}>View resume</a></li>
              <li><a href={RESUME_PDF} download>Download PDF</a></li>
            </ul>
          </div>
          <div>
            <p className="label">Based in</p>
            <ul>
              <li>Bengaluru, India</li>
              <li><Clock /> IST</li>
            </ul>
          </div>
          <div className="ft__totop">
            <button type="button" onClick={() => scrollTo(0)} aria-label="Back to top">
              Back to top <span aria-hidden>↑</span>
            </button>
          </div>
        </div>

        <div className="ft__mark" aria-hidden>
          <span>Sivadarshan</span>
        </div>
        <div className="ft__base">
          <span>© {new Date().getFullYear()} Sivadarshan U S</span>
          <span>Designed and built by me</span>
        </div>
      </div>
    </footer>
  )
}

function Clock() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return <span className="ft__time">{t}</span>
}
