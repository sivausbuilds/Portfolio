import { useGSAP } from '@gsap/react'
import { MeshGradient } from '@paper-design/shaders-react'
import { animate, stagger } from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site, work } from '../content'
import { navigate } from '../lib/router'
import { AutoVideo } from './Media'
import ShinyText from './ShinyText'
import { prefersReducedMotion, scrollTo } from '../lib/smooth'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const
const D = 0.3 // intro delay (s)

/** Client brands from the work so far (own products like Theliv and Finly are left out). */
const BRANDS = ['Varak', 'OffNorth', 'Panache', 'ANiiVEXX', 'Tarama Jeans', 'SuperGlamourous', 'Barqat Elixirs', 'Cordori', 'The Staple', 'Kalbeliya']

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = typeof window !== 'undefined' && prefersReducedMotion()

  // Headline: each line rises out of a soft clip with a blur, one after the other (anime.js).
  useEffect(() => {
    const el = root.current
    if (!el || reduced) return
    const a = animate(el.querySelectorAll('.hx-line__inner'), {
      y: ['112%', '0%'],
      rotate: [2.5, 0],
      opacity: [0, 1],
      filter: ['blur(12px)', 'blur(0px)'],
      duration: 1800,
      delay: stagger(160, { start: D * 1000 + 100 }),
      ease: 'outExpo',
    })
    return () => {
      a.revert()
    }
  }, [reduced])

  // Mesh only animates while the hero is on screen
  const [meshOn, setMeshOn] = useState(true)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setMeshOn(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Scroll: headline lifts, the case card drifts, mesh slowly zooms. The brand row stays put.
  // The brand marquee runs on GSAP so scrolling speeds it up, then it eases back.
  useGSAP(
    () => {
      const track = root.current?.querySelector('.hx-marquee__track')
      const loop = track ? gsap.to(track, { xPercent: -50, duration: 46, ease: 'none', repeat: -1 }) : null
      if (reduced) {
        loop?.pause()
        return
      }
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hx-title', { yPercent: -10, ease: 'none', scrollTrigger: st })
      gsap.to('.hx-feat', { yPercent: -14, ease: 'none', scrollTrigger: st })
      gsap.to('.hx-mesh', { scale: 1.12, yPercent: 8, ease: 'none', scrollTrigger: st })

      let boost = 1
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          boost = Math.min(4, 1 + Math.abs(self.getVelocity()) / 600)
        },
      })
      const decay = () => {
        boost += (1 - boost) * 0.05
        loop?.timeScale(boost)
      }
      gsap.ticker.add(decay)
      return () => gsap.ticker.remove(decay)
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
          speed={reduced || !meshOn ? 0 : 0.12}
          grainOverlay={0.06}
          minPixelRatio={1}
          maxPixelCount={1440 * 900}
        />
        <span className="hx-bg__fade" />
      </div>

      <div className="hx-inner container">
        <motion.div className="hx-top" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: D }}>
          <span className="hx-top__who">
            <span>
              <strong>Sivadarshan U S</strong>
              <span className="hx-top__muted"> · Product Designer &amp; builder</span>
            </span>
          </span>
          <Clock />
        </motion.div>

        <h1 className="hx-title" aria-label="Product Designer with a PM mindset.">
          {['Product Designer', 'with a PM mindset.'].map((line, i) => (
            <span className={`hx-line hx-line--${i}`} key={line} aria-hidden>
              <span className="hx-line__inner">
                <span className="hx-gt">{line}</span>
                <ShinyText
                  className="hx-shine"
                  text={line}
                  color="rgba(255, 255, 255, 0)"
                  shineColor="rgba(222, 240, 229, 0.95)"
                  speed={3.4}
                  delay={3.2}
                  shineWidth={18}
                  softness={0.95}
                  angle={112}
                />
              </span>
            </span>
          ))}
        </h1>

        <Featured />

        <motion.div className="hx-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease, delay: D + 1.1 }}>
          <p className="hx-lead__text">{site.hero.intro}</p>
          <div className="hx-ctas">
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

/** Latest case study, playing — real work in place of a decorative card. Tilts gently toward the pointer. */
function Featured() {
  const item = work[0]
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 140, damping: 18 })
  const glare = useTransform([mx, my], ([x, y]) => `radial-gradient(380px circle at ${(Number(x) + 0.5) * 100}% ${(Number(y) + 0.5) * 100}%, rgba(255,255,255,.5), transparent 60%)`)
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/work/${item.slug}`)
  }

  return (
    <motion.div
      className="hx-feat"
      initial={{ opacity: 0, y: 50, scale: 0.94, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.6, ease, delay: D + 0.6 }}
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
      <motion.a href={`/work/${item.slug}`} onClick={open} className="hx-feat__card" style={{ rotateX: rx, rotateY: ry }}>
        <LiquidGlass className="hx-feat__glass" interactive={false}>
          <span className="hx-feat__head">
            <span className="label">Latest case study</span>
            <span className="hx-feat__go" aria-hidden>
              <Arrow />
            </span>
          </span>
          <span className="hx-feat__media">
            {item.cover?.kind === 'video' && <AutoVideo src={item.cover.src} />}
          </span>
          <span className="hx-feat__title">{item.name}</span>
          <span className="hx-feat__meta">
            {item.facts.highlights.slice(0, 2).map((h) => (
              <span key={h.label}>
                <strong>{h.value}</strong> {h.label}
              </span>
            ))}
          </span>
          <motion.span className="hx-feat__glare" aria-hidden style={{ background: glare }} />
        </LiquidGlass>
      </motion.a>
    </motion.div>
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
