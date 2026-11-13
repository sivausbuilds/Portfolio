import { useGSAP } from '@gsap/react'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { about, site, type AboutToken } from '../content'
import { prefersReducedMotion } from '../lib/smooth'
import { LiquidGlass } from './LiquidGlass'

gsap.registerPlugin(ScrollTrigger)
const ease = [0.22, 1, 0.36, 1] as const

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.about__pin', start: 'top top', end: '+=130%', pin: true, scrub: 0.6 },
      })
      // words and pills reveal in reading order; pills also fill and pop as they arrive
      const parts = gsap.utils.toArray<HTMLElement>('.about__text > .w, .about__text > .pill-wrap')
      parts.forEach((el, i) => {
        const at = i * 0.05
        tl.fromTo(el, { opacity: 0.1 }, { opacity: 1, ease: 'none', duration: 0.3 }, at)
        const pill = el.querySelector('.pill')
        if (pill) tl.fromTo(pill, { scale: 0.86, '--fill': 0 }, { scale: 1, '--fill': 1, ease: 'back.out(2.2)', duration: 0.3 }, at + 0.05)
      })
      tl.to({}, { duration: 0.6 }) // hold the finished paragraph
      gsap.from('.about__label', { opacity: 0, y: 16, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="about">
      <div className="about__pin">
        <div className="container about__wrap">
          <div className="about__side">
            <p className="label about__label">(02) — About</p>
            <p className="label about__hint">Hover or tap the highlights</p>
          </div>
          <p className="about__text">
            {about.paragraph.map((tok, i) => (typeof tok === 'string' ? <Words key={i} text={tok} /> : <Pill key={i} tok={tok} />))}
          </p>
        </div>
      </div>

      <div className="container about__more">
        <Stats />
        <Principles />
      </div>
    </section>
  )
}

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span className="w" key={i}>
          {w}{' '}
        </span>
      ))}
    </>
  )
}

function Pill({ tok }: { tok: Exclude<AboutToken, string> }) {
  const [open, setOpen] = useState(false)
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center')
  const ref = useRef<HTMLButtonElement>(null)
  const pointer = useRef('mouse')

  const show = () => {
    const r = ref.current?.getBoundingClientRect()
    if (r) {
      const c = r.left + r.width / 2
      setAlign(c < 160 ? 'left' : c > window.innerWidth - 160 ? 'right' : 'center')
    }
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <span className="pill-wrap">
      <button
        ref={ref}
        type="button"
        className={`pill ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        onPointerDown={(e) => { pointer.current = e.pointerType }}
        onPointerEnter={(e) => e.pointerType === 'mouse' && show()}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && show()}
        onBlur={() => setOpen(false)}
        // mouse users get hover; touch users toggle with a tap
        onClick={() => pointer.current !== 'mouse' && (open ? setOpen(false) : show())}
      >
        <Icon kind={tok.icon} />
        <span className="pill__text">{tok.text}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            className={`pop pop--${align}`}
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            role="tooltip"
          >
            <LiquidGlass as="span" className="pop__glass" interactive={false}>
              <span className="label">{tok.title}</span>
              <span className="pop__body">{tok.body}</span>
            </LiquidGlass>
          </motion.span>
        )}
      </AnimatePresence>{' '}
    </span>
  )
}

function Icon({ kind }: { kind: Exclude<AboutToken, string>['icon'] }) {
  if (kind === 'avatar')
    return (
      <span className="pill__icon pill__icon--avatar" aria-hidden>
        {about.photo ? <img src={about.photo} alt="" /> : site.name[0]}
      </span>
    )
  const paths: Record<string, string> = {
    spark: 'M10 2v4M10 14v4M2 10h4M14 10h4M4.6 4.6l2.8 2.8M12.6 12.6l2.8 2.8M4.6 15.4l2.8-2.8M12.6 7.4l2.8-2.8',
    grid: 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z',
    bag: 'M4 7h12l-1 10H5L4 7zM7 7V5.5a3 3 0 016 0V7',
    chart: 'M3 16l4.5-5 3.5 3 6-8M13 6h4v4',
  }
  return (
    <span className="pill__icon" aria-hidden>
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[kind]} />
      </svg>
    </span>
  )
}

function Stats() {
  return (
    <dl className="stats">
      {about.stats.map((s, i) => (
        <Stat key={s.label} {...s} delay={i * 0.12} />
      ))}
    </dl>
  )
}

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, delay, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value, delay])

  return (
    <motion.div
      ref={ref}
      className="stat"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease, delay }}
    >
      <dd className="stat__value">
        {n}
        <span>{suffix}</span>
      </dd>
      <dt className="label">{label}</dt>
    </motion.div>
  )
}

function Principles() {
  const [active, setActive] = useState(0)
  return (
    <div className="principles" id="process">
      <p className="label">How I work</p>
      <ol>
        {about.principles.map((p, i) => (
          <motion.li
            key={p.title}
            className={`principle ${active === i ? 'is-active' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease, delay: i * 0.08 }}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
          >
            <button type="button" className="principle__head" aria-expanded={active === i} onClick={() => setActive(i)}>
              <span className="principle__num label">0{i + 1}</span>
              <span className="principle__title">{p.title}</span>
              <span className="principle__plus" aria-hidden />
            </button>
            <motion.div
              className="principle__body"
              initial={false}
              animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <p>{p.body}</p>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
