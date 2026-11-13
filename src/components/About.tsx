import { useGSAP } from '@gsap/react'
import { animate, motion, useInView } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { about, type AboutToken } from '../content'
import { prefersReducedMotion } from '../lib/smooth'

gsap.registerPlugin(ScrollTrigger)
const ease = [0.22, 1, 0.36, 1] as const

export function About() {
  const root = useRef<HTMLElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  // number the noted terms in reading order
  let n = 0
  const tokens = about.paragraph.map((t) => (typeof t !== 'string' && t.note ? { ...t, idx: ++n } : t))
  const notes = tokens.filter((t): t is Exclude<AboutToken, string> & { idx: number } => typeof t !== 'string' && 'idx' in t)

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>('.about__text .w')
      const noteEls = gsap.utils.toArray<HTMLElement>('.about-note')
      if (prefersReducedMotion()) {
        root.current?.classList.add('is-static')
        return
      }

      const build = (pin: boolean) => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: pin
            ? { trigger: '.about__pin', start: 'top top', end: '+=140%', pin: true, scrub: 0.8 }
            : { trigger: '.about__text', start: 'top 85%', end: 'bottom 55%', scrub: 0.8 },
        })
        words.forEach((w, i) => {
          tl.fromTo(w, { opacity: 0.14, filter: 'blur(3px)', y: '0.12em' }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.4 }, i * 0.06)
          if (w.classList.contains('term')) {
            const k = Number(w.dataset.note)
            const at = i * 0.06 + 0.2
            tl.fromTo(w, { '--line': 0 }, { '--line': 1, duration: 0.5, ease: 'power2.out' }, at)
            if (k) tl.fromTo(noteEls[k - 1], { opacity: 0.25, x: -10 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, at)
          }
        })
        if (pin) tl.to({}, { duration: 0.8 }) // hold the finished paragraph
        return () => tl.scrollTrigger?.kill()
      }

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => build(true))
      mm.add('(max-width: 899px)', () => build(false))
      gsap.from('.about__label', { opacity: 0, y: 16, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="about">
      <div className="about__pin">
        <div className="container about__wrap">
          <p className="label about__label">(02) — About</p>
          <ol className="about-notes" aria-label="Notes">
              {notes.map((t) => (
                <li
                  key={t.idx}
                  className={`about-note ${hover === t.idx ? 'is-hover' : ''}`}
                  onPointerEnter={() => setHover(t.idx)}
                  onPointerLeave={() => setHover(null)}
                >
                  <span className="about-note__num">{String(t.idx).padStart(2, '0')}</span>
                  <span className="about-note__body">
                    <span className="about-note__title">{t.note!.title}</span>
                    <span className="about-note__text">{t.note!.body}</span>
                  </span>
                </li>
              ))}
          </ol>

          <p className="about__text">
            {tokens.map((t, i) =>
              typeof t === 'string' ? (
                <Words key={i} text={t} />
              ) : 'idx' in t ? (
                <span
                  key={i}
                  className={`w term ${hover === t.idx ? 'is-hover' : ''}`}
                  data-note={t.idx}
                  tabIndex={0}
                  onPointerEnter={() => setHover(t.idx as number)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(t.idx as number)}
                  onBlur={() => setHover(null)}
                >
                  {t.text}
                  <sup className="term__num">{String(t.idx).padStart(2, '0')}</sup>{' '}
                </span>
              ) : (
                <span key={i} className="w accent">
                  {t.text}{' '}
                </span>
              ),
            )}
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
