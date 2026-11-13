import { useGSAP } from '@gsap/react'
import { MeshGradient } from '@paper-design/shaders-react'
import { animate, splitText, stagger } from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { about, site } from '../content'
import { prefersReducedMotion, scrollTo } from '../lib/smooth'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'
import { Magnetic } from './Magnetic'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const
const D = 0.3 // intro delay (s)

/** Client brands from the work so far (own products like Theliv and Finly are left out). */
const BRANDS = ['Varak', 'OffNorth', 'Panache', 'ANiiVEXX', 'Tarama Jeans', 'SuperGlamourous', 'Barqat Elixirs', 'Cordori', 'The Staple', 'Kalbeliya']

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = typeof window !== 'undefined' && prefersReducedMotion()

  // Headline: anime.js splits the first line and "with a" into characters that rise out of a clip;
  // the gradient phrase arrives as one piece so its colour sweep stays continuous.
  useEffect(() => {
    const el = root.current
    if (!el || reduced) return
    const split = splitText(el.querySelectorAll('[data-split]'), { chars: { wrap: 'clip' } })
    const chars = split.chars
    const a1 = animate(chars, {
      y: ['110%', '0%'],
      rotate: [6, 0],
      duration: 1300,
      delay: stagger(26, { start: D * 1000 + 150 }),
      ease: 'outExpo',
    })
    const a2 = animate(el.querySelectorAll('.hx-grad'), {
      opacity: [0, 1],
      y: ['30%', '0%'],
      filter: ['blur(14px)', 'blur(0px)'],
      duration: 1600,
      delay: D * 1000 + 150 + chars.length * 26,
      ease: 'outExpo',
    })
    return () => {
      a1.revert()
      a2.revert()
      split.revert()
    }
  }, [reduced])

  // Scroll: headline lifts and softens, portrait drifts, mesh slowly zooms
  useGSAP(
    () => {
      if (reduced) return
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hx-title', { yPercent: -14, opacity: 0.2, ease: 'none', scrollTrigger: st })
      gsap.to('.hx-portrait', { yPercent: -18, ease: 'none', scrollTrigger: st })
      gsap.to('.hx-mesh', { scale: 1.15, yPercent: 10, ease: 'none', scrollTrigger: st })
      gsap.to('.hx-foot', { opacity: 0, y: -40, ease: 'none', scrollTrigger: { ...st, start: '15% top', end: '65% top' } })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="hx">
      <div className="hx-bg" aria-hidden>
        <MeshGradient
          className="hx-mesh"
          colors={['#f5f5f7', '#e3ede6', '#b9cfc1', '#f1e9dc', '#f5f5f7', '#93b5a3']}
          distortion={0.8}
          swirl={0.15}
          speed={reduced ? 0 : 0.12}
          grainOverlay={0.06}
          maxPixelCount={1920 * 1080}
        />
        <span className="hx-bg__fade" />
      </div>

      <div className="hx-inner container">
        <motion.div className="hx-top" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: D }}>
          <span className="hx-top__who">
            <img className="hx-top__avatar" src={about.photo} alt="" />
            <span>
              <strong>Sivadarshan U S</strong>
              <span className="hx-top__muted"> · Product Designer &amp; builder</span>
            </span>
          </span>
          <Clock />
        </motion.div>

        <h1 className="hx-title" aria-label="Product Designer with a PM mindset.">
          <span className="hx-line" data-split aria-hidden>
            Product Designer
          </span>
          <span className="hx-line" aria-hidden>
            <span data-split>with a </span>
            <em className="hx-grad">PM mindset.</em>
          </span>
        </h1>

        <Portrait />

        <motion.div className="hx-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: D + 1.1 }}>
          <p className="hx-lead__text">{site.hero.intro}</p>
          <div className="hx-ctas">
            <Magnetic>
              <a
                href="#work"
                className="btn btn--shimmer"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#work')
                }}
              >
                <span className="btn--shimmer__sweep" aria-hidden />
                <span className="btn--shimmer__label">
                  View selected work <Arrow />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <LiquidGlass
                as="a"
                href="#about"
                className="btn btn--glass"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  scrollTo('#about')
                }}
              >
                About me
              </LiquidGlass>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div className="hx-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: D + 1.4 }}>
          <p className="label hx-foot__label">
            Trusted by 20+ brands
            <span> across India, UAE, UK and Australia</span>
          </p>
          <div className="hx-marquee" aria-label={`Brands: ${BRANDS.join(', ')}`}>
            <div className="hx-marquee__track" aria-hidden>
              {[0, 1].map((k) => (
                <span key={k} className="hx-marquee__set">
                  {BRANDS.map((b) => (
                    <span key={b} className="hx-marquee__item">
                      {b}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/** Portrait with a duotone treatment and a soft 3D tilt that follows the pointer. */
function Portrait() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 18 })
  const gx = useTransform(mx, [-0.5, 0.5], ['20%', '80%'])
  const gy = useTransform(my, [-0.5, 0.5], ['10%', '70%'])

  return (
    <motion.figure
      className="hx-portrait"
      initial={{ opacity: 0, y: 50, scale: 0.94, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.6, ease, delay: D + 0.5 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div className="hx-portrait__card" style={{ rotateX: rx, rotateY: ry }}>
        <img src={about.photo} alt="Portrait of Sivadarshan" />
        <span className="hx-portrait__tone" aria-hidden />
        <motion.span
          className="hx-portrait__glare"
          aria-hidden
          style={{ background: useTransform([gx, gy], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,.28), transparent 60%)`) }}
        />
        <LiquidGlass className="hx-portrait__chip" interactive={false}>
          <span className="status">
            <span className="status__dot" aria-hidden />
            {site.status}
          </span>
        </LiquidGlass>
        <figcaption className="hx-portrait__cap">
          <span className="hx-portrait__name">Sivadarshan</span>
          <span className="label">Bengaluru, India</span>
        </figcaption>
      </motion.div>
    </motion.figure>
  )
}

/** Local time in Bengaluru — a small human detail. */
function Clock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="hx-clock label">
      Bengaluru <span className="hx-clock__time">{t}</span> IST
    </span>
  )
}
