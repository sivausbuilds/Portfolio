import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import { prefersReducedMotion, scrollTo } from '../lib/smooth'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'
import { Magnetic } from './Magnetic'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const
const D = 0.35 // global intro delay

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }

      // Headline drifts up & softens as you leave the hero
      gsap.to('.hero__title', { yPercent: -18, opacity: 0.15, filter: 'blur(4px)', ease: 'none', scrollTrigger: st })
      gsap.to('.hero__aside', { yPercent: -40, ease: 'none', scrollTrigger: st })
      gsap.to('.hero__foot', { yPercent: 30, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top' } })

      // Aurora parallax — each blob at its own depth
      gsap.utils.toArray<HTMLElement>('.aurora__blob').forEach((el, i) => {
        gsap.to(el, { yPercent: (i + 1) * 22, scale: 1 + i * 0.08, ease: 'none', scrollTrigger: st })
      })

      // Pointer parallax on desktop
      const mm = gsap.matchMedia()
      mm.add('(pointer: fine)', () => {
        const qx = gsap.quickTo('.aurora', 'x', { duration: 1.6, ease: 'power3' })
        const qy = gsap.quickTo('.aurora', 'y', { duration: 1.6, ease: 'power3' })
        const cx = gsap.quickTo('.hero__card', 'x', { duration: 1.2, ease: 'power3' })
        const cy = gsap.quickTo('.hero__card', 'y', { duration: 1.2, ease: 'power3' })
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / innerWidth - 0.5
          const ny = e.clientY / innerHeight - 0.5
          qx(nx * -40); qy(ny * -30); cx(nx * 14); cy(ny * 10)
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="hero">
      <Aurora />

      <div className="hero__inner container">
        <motion.div
          className="hero__eyebrow label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: D }}
        >
          <span>{site.hero.eyebrow}</span>
          <span className="hero__eyebrow-rule" aria-hidden />
          <span>©{site.year}</span>
        </motion.div>

        <h1 className="hero__title" aria-label={site.hero.lines.map((l) => l.map((p) => p.t).join('')).join(' ')}>
          {site.hero.lines.map((line, i) => (
            <span className="line" key={i} aria-hidden>
              <motion.span
                className="line__inner"
                initial={{ y: '105%', rotate: 2.5 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{ duration: 1.3, ease, delay: D + 0.15 + i * 0.12 }}
              >
                {line.map((p, j) => (p.italic ? <em key={j}>{p.t}</em> : <span key={j}>{p.t}</span>))}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero__aside">
          <motion.div
            className="hero__card-wrap"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease, delay: D + 0.6 }}
          >
            <MindsetCard />
          </motion.div>
        </div>

        <div className="hero__foot">
          <motion.span
            className="rule"
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease, delay: D + 0.5 }}
          />
          <div className="hero__grid">
            <motion.div
              className="hero__lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: D + 0.75 }}
            >
              <p className="label">Introduction</p>
              <p className="body-lg">{site.hero.intro}</p>
              <div className="hero__ctas">
                <Magnetic>
                  <a href="#work" className="btn btn--ink" onClick={(e) => { e.preventDefault(); scrollTo('#work') }}>
                    View selected work <Arrow />
                  </a>
                </Magnetic>
                <Magnetic>
                  <LiquidGlass as="a" href="#about" className="btn btn--glass" onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo('#about') }}>
                    About me
                  </LiquidGlass>
                </Magnetic>
              </div>
            </motion.div>

            <dl className="meta">
              {site.hero.meta.map((m, i) => (
                <motion.div
                  className="meta__row"
                  key={m.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease, delay: D + 0.85 + i * 0.08 }}
                >
                  <dt className="label">{m.label}</dt>
                  <dd>{m.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        <motion.button
          className="scroll-cue"
          onClick={() => scrollTo('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: D + 1.4, duration: 1 }}
          aria-label="Scroll to content"
        >
          <span className="scroll-cue__track"><span className="scroll-cue__thumb" /></span>
          <span className="label">Scroll</span>
        </motion.button>
      </div>
    </section>
  )
}

function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      <span className="aurora__blob b1" />
      <span className="aurora__blob b2" />
      <span className="aurora__blob b3" />
      <span className="aurora__blob b4" />
      <span className="grain" />
    </div>
  )
}

function MindsetCard() {
  const words = site.hero.mindset
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <LiquidGlass className="hero__card">
      <div className="card__top">
        <span className="label">Design × Product</span>
        <span className="card__count label">
          0{i + 1}<span>/0{words.length}</span>
        </span>
      </div>
      <div className="card__word" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[i]}
            initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.8, ease }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="card__progress">
        {words.map((w, k) => (
          <span key={w} className={k === i ? 'is-active' : k < i ? 'is-done' : ''} />
        ))}
      </div>
    </LiquidGlass>
  )
}
