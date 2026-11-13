import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { websites, type Site } from '../content'
import { prefersReducedMotion } from '../lib/smooth'
import { Arrow } from './Header'
import { AutoVideo } from './Media'
import { Rich } from './Rich'

gsap.registerPlugin(ScrollTrigger)
const ease = [0.22, 1, 0.36, 1] as const
const items = websites.items
const N = items.length
const STEP = 360 / N
const host = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '')

/**
 * A ring of site panels in 3D. Scroll (pinned on desktop) or drag turns it;
 * the panel facing you is the active site. Click any panel or name to open the site.
 */
export function Websites() {
  const root = useRef<HTMLElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const state = useRef({ scroll: 0, drag: 0, target: 0, current: 0 })

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.ws-panel')
      const s = state.current
      const render = () => {
        s.target = -(s.scroll + s.drag)
        s.current += (s.target - s.current) * 0.09
        if (ring.current) ring.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${s.current}deg)`
        const front = (((-s.current / STEP) % N) + N) % N
        panels.forEach((p, i) => {
          let d = Math.abs(i - front)
          d = Math.min(d, N - d) // distance in panels from the front
          p.style.opacity = String(Math.max(0.12, 1 - d * 0.32))
          p.style.filter = `blur(${Math.min(8, d * 3.2)}px) saturate(${1 - Math.min(0.5, d * 0.2)})`
        })
        const idx = Math.round(front) % N
        setActive((a) => (a === idx ? a : idx))
      }
      gsap.ticker.add(render)

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        if (prefersReducedMotion()) return
        const st = ScrollTrigger.create({
          trigger: '.ws__pin',
          start: 'top top',
          end: () => `+=${window.innerHeight * 0.55 * (N - 1)}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            s.scroll = self.progress * STEP * (N - 1)
          },
        })
        return () => st.kill()
      })
      return () => gsap.ticker.remove(render)
    },
    { scope: root },
  )

  // drag to turn (all devices); a click without movement opens the panel's site
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null)
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, start: state.current.drag, moved: false }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 4) d.moved = true
    state.current.drag = d.start - dx * 0.18
  }
  const onUp = () => {
    const d = drag.current
    drag.current = null
    if (!d) return
    // settle on the nearest panel
    const total = state.current.scroll + state.current.drag
    state.current.drag += Math.round(total / STEP) * STEP - total
  }
  const goTo = (i: number) => {
    const total = state.current.scroll + state.current.drag
    const cur = Math.round(total / STEP)
    let diff = (i - (((cur % N) + N) % N)) % N
    if (diff > N / 2) diff -= N
    if (diff < -N / 2) diff += N
    state.current.drag += (cur + diff) * STEP - total
  }

  return (
    <section ref={root} id="websites" className="ws">
      <div className="ws__pin">
        <div className="container ws__inner">
          <div className="ws__intro">
            <p className="label">(05) — Websites built</p>
            <p className="ws__lead">{websites.intro}</p>
          </div>

          <div
            className="ws__stage"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div ref={ring} className="ws__ring" style={{ ['--n' as string]: N }}>
              {items.map((s, i) => (
                <a
                  key={s.url}
                  className={`ws-panel ${i === active ? 'is-active' : ''}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--r))` }}
                  onClick={(e) => {
                    if (drag.current?.moved) e.preventDefault()
                    else if (i !== active) {
                      e.preventDefault()
                      goTo(i)
                    }
                  }}
                  aria-label={`${s.name} — open website`}
                  draggable={false}
                >
                  <Panel s={s} live={i === active} />
                </a>
              ))}
            </div>
          </div>

          <ol className="ws__list">
            {items.map((s, i) => (
              <li key={s.url} className={i === active ? 'is-active' : ''}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" onPointerEnter={(e) => e.pointerType === 'mouse' && goTo(i)} onFocus={() => goTo(i)}>
                  <span className="ws__tag">{s.tag}</span>
                  <span className="ws__name">{s.name}</span>
                  <span className="ws__more">
                    <span className="ws__note">{s.note}</span>
                    <span className="ws__visit">
                      Visit {host(s.url)} <Arrow />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <h2 className="ws__title">
            <motion.span className="ws__title-inner" initial={{ y: '40%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
              <Rich text={websites.title} fancy />
            </motion.span>
          </h2>

          <div className="ws__foot">
            <span className="label">14 stores · 4 countries</span>
            <span className="label ws__hint">Scroll or drag to explore · click to visit</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Panel({ s, live }: { s: Site; live: boolean }) {
  return (
    <span className="ws-panel__inner" style={{ ['--bg' as string]: s.tone[0], ['--fg' as string]: s.tone[1] }}>
      {s.video ? (
        <AutoVideo src={s.video} autoPlay={live} />
      ) : s.image ? (
        <img src={s.image} alt="" draggable={false} />
      ) : (
        <span className="ws-panel__gen" aria-hidden>
          <span className="ws-panel__bar">
            <i />
            <i />
            <i />
            <em>{host(s.url)}</em>
          </span>
          <span className="ws-panel__brand">{s.name}</span>
          <span className="ws-panel__tiles">
            <b />
            <b />
            <b />
            <b />
          </span>
        </span>
      )}
      <span className="ws-panel__shine" aria-hidden />
    </span>
  )
}
