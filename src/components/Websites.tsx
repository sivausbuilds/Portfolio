import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site, websites } from '../content'
import { prefersReducedMotion } from '../lib/smooth'
import { Arrow } from './Header'
import { Rich } from './Rich'

gsap.registerPlugin(ScrollTrigger)
const ease = [0.22, 1, 0.36, 1] as const
const items = websites.items
const N = items.length
const STEP = 360 / N
const ARC = STEP * 0.86 // each panel covers most of its sector, leaving a small gap
const SLICES = 12 // vertical strips per panel; more = smoother curve
const host = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '')

/** Cylinder size from the viewport. */
function useGeometry() {
  const calc = () => {
    const w = typeof window === 'undefined' ? 1440 : window.innerWidth
    const R = w < 760 ? w * 0.62 : w < 1100 ? w * 0.48 : Math.min(640, w * 0.36)
    const sliceDeg = ARC / SLICES
    const sliceW = 2 * R * Math.tan(((sliceDeg / 2) * Math.PI) / 180) + 1.2 // overlap hides seams
    const panelW = sliceW * SLICES
    return { R, sliceDeg, sliceW, panelW, H: panelW * 0.62 }
  }
  const [g, setG] = useState(calc)
  useEffect(() => {
    const on = () => setG(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return g
}

/**
 * Curved site panels on a tilted cylinder. Scroll (pinned on desktop) or drag turns it;
 * the panel facing you is active. Click the active panel or any name to open the live site.
 */
export function Websites() {
  const root = useRef<HTMLElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const g = useGeometry()
  const [active, setActive] = useState(0)
  const state = useRef({ scroll: 0, drag: 0, current: 0, lastFront: -1 })

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.wsx-panel')
      const s = state.current
      const render = () => {
        const target = -(s.scroll + s.drag)
        s.current += (target - s.current) * 0.08
        if (ring.current) ring.current.style.transform = `rotateY(${s.current}deg)`
        const front = (((-s.current / STEP) % N) + N) % N
        if (Math.abs(front - s.lastFront) > 0.01) {
          s.lastFront = front
          panels.forEach((p, i) => {
            let d = Math.abs(i - front)
            d = Math.min(d, N - d)
            p.style.setProperty('--d', d.toFixed(3))
          })
          const idx = Math.round(front) % N
          setActive((a) => (a === idx ? a : idx))
        }
      }
      gsap.ticker.add(render)
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        if (prefersReducedMotion()) return
        const st = ScrollTrigger.create({
          trigger: '.wsx__pin',
          start: 'top top',
          end: () => `+=${window.innerHeight * 0.6 * (N - 1)}`,
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

  // drag (all devices); snap to the nearest panel on release
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null)
  const moved = useRef(false)
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, start: state.current.drag, moved: false }
    moved.current = false
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 5) d.moved = moved.current = true
    state.current.drag = d.start - dx * 0.16
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
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
    <section ref={root} id="websites" className="wsx">
      <div className="wsx__pin">
        <span className="wsx__glow" aria-hidden />
        <div className="container wsx__inner">
          <p className="wsx__lead">
            <strong>Websites built</strong> {websites.lead}
          </p>

          <div
            className="wsx__stage"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
            onPointerCancel={onUp}
          >
            <div className="wsx__tilt">
              <div ref={ring} className="wsx__ring">
                {items.map((s, i) => (
                  <a
                    key={s.url}
                    className={`wsx-panel ${i === active ? 'is-active' : ''}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    aria-label={`${s.name} — open ${host(s.url)}`}
                    onClick={(e) => {
                      if (moved.current) return e.preventDefault()
                      if (i !== active) {
                        e.preventDefault()
                        goTo(i)
                      }
                    }}
                  >
                    {Array.from({ length: SLICES }).map((_, k) => {
                      const off = -ARC / 2 + g.sliceDeg * (k + 0.5)
                      return (
                        <span
                          key={k}
                          className="wsx-slice"
                          style={{
                            width: g.sliceW,
                            height: g.H,
                            marginLeft: -g.sliceW / 2,
                            marginTop: -g.H / 2,
                            transform: `rotateY(${i * STEP + off}deg) translateZ(${g.R}px)`,
                            backgroundImage: `linear-gradient(var(--fog), var(--fog)), url(${s.image})`,
                            backgroundSize: `100% 100%, ${(g.sliceW - 1.2) * SLICES}px ${g.H}px`,
                            backgroundPosition: `0 0, ${-k * (g.sliceW - 1.2)}px 0`,
                            borderRadius: k === 0 ? '18px 0 0 18px' : k === SLICES - 1 ? '0 18px 18px 0' : 0,
                          }}
                        />
                      )
                    })}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="wsx__years">© {websites.years}</div>
          <h2 className="wsx__title">
            <motion.span className="wsx__l1" initial={{ y: '30%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
              {websites.title[0]}
            </motion.span>
            <motion.span className="wsx__l2" initial={{ y: '30%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.12 }}>
              <Rich text={websites.title[1]} fancy />
            </motion.span>
          </h2>

          <ol className="wsx__list">
            {items.map((s, i) => {
              let d = Math.abs(i - active)
              d = Math.min(d, N - d)
              return (
                <li key={s.url} className={i === active ? 'is-active' : ''} style={{ ['--d' as string]: d }}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerEnter={(e) => e.pointerType === 'mouse' && goTo(i)}
                    onFocus={() => goTo(i)}
                  >
                    <span className="wsx__tag">{s.tag}</span>
                    <span className="wsx__name">{s.name}</span>
                    <span className="wsx__more">
                      <span className="wsx__note">{s.note}</span>
                      <span className="wsx__visit">
                        Visit {host(s.url)} <Arrow />
                      </span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>

          <div className="wsx__foot">
            <span>© 2026 {site.name}</span>
            <span className="wsx__hint">Scroll or drag to explore</span>
            <span>Bengaluru, IN — 14 stores</span>
          </div>
        </div>
      </div>
    </section>
  )
}
