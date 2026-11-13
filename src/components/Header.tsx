import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { site } from '../content'
import { navigate } from '../lib/router'
import { lockScroll, scrollTo } from '../lib/smooth'
import { LiquidGlass } from './LiquidGlass'

const ease = [0.22, 1, 0.36, 1] as const

export function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    if (!open) setHidden(y > prev && y > 240)
  })

  useEffect(() => {
    lockScroll(open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (window.location.pathname !== '/') return navigate('/', href === '#top' ? undefined : href)
    if (!document.querySelector(href)) {
      if (href === '#contact') window.location.href = `mailto:${site.email}`
      return
    }
    // let the sheet close before scrolling
    setTimeout(() => scrollTo(href), open ? 350 : 0)
  }

  return (
    <motion.header
      className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? '-140%' : 0, opacity: 1 }}
      transition={{ duration: hidden ? 0.5 : 0.9, ease, delay: hidden ? 0 : 0.15 }}
    >
      <LiquidGlass className="header__bar">
        <a href="#top" className="brand" onClick={go('#top')} aria-label={`${site.name} — home`}>
          <span className="brand__mark">{site.name}</span>
          <span className="brand__sep" aria-hidden />
          <span className="brand__role">{site.role}</span>
        </a>

        <nav className="nav" aria-label="Primary">
          {site.nav.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)} className="nav__link">
              <span className="nav__roll">
                <span data-text={l.label}>{l.label}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <span className="status">
            <span className="status__dot" aria-hidden />
            {site.status}
          </span>
          <span className="btn-wrap">
            <a href="#contact" onClick={go('#contact')} className="btn btn--ink btn--sm">
              Let’s talk
              <Arrow />
            </a>
          </span>
          <button
            className="menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </LiquidGlass>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="sheet"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
          >
            <LiquidGlass className="sheet__glass" interactive={false}>
              <ul>
                {site.nav.map((l, i) => (
                  <li key={l.href}>
                    <motion.a
                      href={l.href}
                      onClick={go(l.href)}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.06 }}
                    >
                      <span className="sheet__idx">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="sheet__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="status">
                  <span className="status__dot" aria-hidden />
                  {site.status}
                </span>
                <a href={`mailto:${site.email}`} className="btn btn--ink">
                  Let’s talk <Arrow />
                </a>
              </motion.div>
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3.5 10.5l7-7M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
