import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import { Rich } from './Rich'

const ease = [0.22, 1, 0.36, 1] as const

const PRINCIPLES = ['Hierarchy', 'Proximity', 'Alignment', 'Visual cues', 'Typography']
/** Self-rated, 0–1 — edit to taste. */
const TOOLS: [string, number][] = [
  ['Figma', 0.95],
  ['Shopify · Liquid', 0.85],
  ['JavaScript', 0.7],
  ['AI tools', 0.8],
]
const STEPS = [
  { t: 'Discover', d: 'Find the real problem' },
  { t: 'Define', d: 'Name it in one sentence' },
  { t: 'Design', d: 'Flows first, then interface' },
  { t: 'Validate', d: 'Test with real users' },
  { t: 'Deliver', d: 'Ship it and measure' },
]

const cell = (i: number) => ({
  initial: { opacity: 0, y: 30, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-8% 0px' },
  transition: { duration: 1, ease, delay: i * 0.07 },
})

export function Bento() {
  return (
    <section className="bento" aria-label="In short">
      <div className="container">
        <div className="bento__head">
          <p className="label">(04) — In short</p>
          <h2 className="bento__title">
            <Rich text="The whole picture, *at a glance*" fancy />
          </h2>
        </div>

        <div className="bento__grid">
          {/* Identity */}
          <motion.div className="b-cell b-id" {...cell(0)}>
            <span className="b-id__mesh" aria-hidden />
            <span className="b-id__mono" aria-hidden>S</span>
            <div className="b-id__foot">
              <span className="b-id__name">{site.name}</span>
              <span className="b-id__role">Product Designer · PM mindset</span>
              <span className="b-id__status">
                <span className="status__dot" aria-hidden /> {site.status}
              </span>
            </div>
          </motion.div>

          {/* Design thinking */}
          <motion.div className="b-cell b-think" {...cell(1)}>
            <p className="b-title">Design Thinking &amp; Craft</p>
            <div className="b-chips" aria-label={PRINCIPLES.join(', ')}>
              <div className="b-chips__track" aria-hidden>
                {[0, 1].map((k) => (
                  <span key={k} className="b-chips__set">
                    {PRINCIPLES.map((p, i) => (
                      <span key={p} className="b-chip">
                        <ChipIcon i={i} />
                        <span className="b-chip__label">{p}</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Craft quote */}
          <motion.div className="b-cell b-craft" {...cell(2)}>
            <div className="b-craft__card">
              <span className="b-craft__aurora" aria-hidden />
              <svg className="b-craft__cursor" viewBox="0 0 24 24" aria-hidden>
                <path d="M5 3.5l14 7-6.2 1.8-2.6 6.2z" />
              </svg>
              <p className="b-title">Craftsmanship</p>
              <p className="b-text">I don’t design to impress. I design to express, solve, and simplify.</p>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div className="b-cell b-exp" {...cell(3)}>
            <span className="label">Experience</span>
            <div className="b-laurel">
              <Laurel />
              <span className="b-laurel__n">
                <Count to={3} />
                <em>+</em>
              </span>
              <span className="b-laurel__u">Years</span>
              <Laurel flip />
            </div>
            <div>
              <p className="b-title">Crafting Digital Products</p>
              <p className="b-text">Designing user-centered web and mobile experiences across e-commerce and digital products.</p>
            </div>
          </motion.div>

          {/* Collaboration */}
          <motion.div className="b-cell b-collab" {...cell(4)}>
            <span className="label">Collaboration</span>
            <p className="b-title">Cross-functional Workflow</p>
            <p className="b-text">Working closely with product and engineering teams.</p>
            <span className="b-cursor b-cursor--a" aria-hidden>
              <CursorSvg />
              <i>PM</i>
            </span>
            <span className="b-cursor b-cursor--b" aria-hidden>
              <CursorSvg />
              <i>Engineer</i>
            </span>
          </motion.div>

          {/* Shipped */}
          <motion.div className="b-cell b-ship" {...cell(5)}>
            <div>
              <p className="b-title b-ship__title">Products Shipped</p>
              <p className="b-text">Delivered across 14 stores in four countries &amp; my own products.</p>
            </div>
            <span className="b-ship__n">
              <Count to={20} />
              <em>+</em>
            </span>
          </motion.div>

          {/* Toolkit */}
          <motion.div className="b-cell b-tools" {...cell(6)}>
            <span className="label">Toolkit</span>
            <ul className="b-bars">
              {TOOLS.map(([t, v], i) => (
                <li key={t}>
                  <span className="b-bars__name">{t}</span>
                  <span className="b-bars__track">
                    <motion.span
                      className="b-bars__fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: v }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease, delay: 0.3 + i * 0.12 }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Process */}
          <motion.div className="b-cell b-proc" {...cell(7)}>
            <span className="label">My design process</span>
            <Process />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Count up once when visible. */
function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{n}</span>
}

/** Stepper that walks through the process on a loop while on screen. */
function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [step, setStep] = useState(-1)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setStep((s) => (s >= STEPS.length ? -1 : s + 1)), 1100)
    return () => clearInterval(id)
  }, [inView])
  const done = Math.min(step, STEPS.length - 1)
  return (
    <div ref={ref} className="b-steps" style={{ ['--p' as string]: Math.max(0, done) / (STEPS.length - 1) }}>
      <span className="b-steps__rail" aria-hidden>
        <span className="b-steps__fill" />
      </span>
      <ol>
        {STEPS.map((s, i) => (
          <li key={s.t} className={i <= done ? 'is-done' : ''}>
            <span className="b-steps__dot" aria-hidden>
              <svg viewBox="0 0 12 12">
                <path d="M3 6.2l2 2 4-4.4" />
              </svg>
            </span>
            <span className="b-steps__t">{s.t}</span>
            <span className="b-steps__d">{s.d}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ChipIcon({ i }: { i: number }) {
  const k = i % 5
  return (
    <span className={`b-ico b-ico--${k}`} aria-hidden>
      {k === 0 && ( // hierarchy
        <>
          <i className="b-ico__block" />
          <i style={{ width: '80%' }} />
          <i style={{ width: '55%' }} />
        </>
      )}
      {k === 1 && Array.from({ length: 3 }).map((_, j) => <b key={j} />) /* proximity */}
      {k === 2 && ( // alignment
        <>
          <i style={{ width: '90%' }} />
          <i style={{ width: '60%' }} />
          <i style={{ width: '75%' }} />
        </>
      )}
      {k === 3 && ( // visual cues
        <>
          <b className="b-ico__dot" />
          <b className="b-ico__sq" />
          <span className="b-ico__link" />
        </>
      )}
      {k === 4 && ( // typography
        <>
          <span className="b-ico__t">T</span>
          <span className="b-ico__guide" />
        </>
      )}
    </span>
  )
}

function Laurel({ flip = false }: { flip?: boolean }) {
  // points along the stem (quadratic curve from bottom to top), with a leaf pair at each
  const P0 = [34, 92], P1 = [2, 58], P2 = [22, 6]
  const at = (t: number) => [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
  ]
  const leaves: { x: number; y: number; r: number; k: number }[] = []
  for (let i = 0; i < 6; i++) {
    const t = 0.1 + i * 0.15
    const [x, y] = at(t)
    const [x2, y2] = at(t + 0.01)
    const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI
    leaves.push({ x, y, r: ang - 50, k: i * 2 }, { x, y, r: ang + 50 + 180, k: i * 2 + 1 })
  }
  return (
    <svg className={`b-laurel__w ${flip ? 'is-flip' : ''}`} viewBox="0 0 44 100" aria-hidden>
      <path d={`M${P0} Q${P1} ${P2}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {leaves.map((l) => (
        <ellipse key={l.k} cx={l.x} cy={l.y} rx="3.6" ry="7.2" transform={`rotate(${l.r} ${l.x} ${l.y}) translate(0 -7)`} fill="currentColor" style={{ ['--i' as string]: l.k }} />
      ))}
      <ellipse cx={P2[0]} cy={P2[1]} rx="3.4" ry="6.4" transform={`rotate(20 ${P2[0]} ${P2[1]})`} fill="currentColor" style={{ ['--i' as string]: 12 }} />
    </svg>
  )
}

function CursorSvg() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16">
      <path d="M2 1.5l11 5.2-4.6 1.3-1.9 4.5z" fill="currentColor" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}
