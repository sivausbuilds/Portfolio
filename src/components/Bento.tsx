import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../content'
import { GradientText } from './GradientText'
import { Rich } from './Rich'

const ease = [0.22, 1, 0.36, 1] as const

const PRINCIPLES = ['Hierarchy', 'Proximity', 'Alignment', 'Visual cues', 'Typography', 'Contrast', 'Feedback', 'Consistency']
const TOOLS = ['Figma', 'Shopify', 'Liquid', 'JavaScript', 'Notion', 'Base44', 'AI tools', 'Analytics']
const STEPS = [
  { t: 'Discover', d: 'Find the real problem' },
  { t: 'Define', d: 'Name it in one sentence' },
  { t: 'Design', d: 'Flows first, then interface' },
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
            <p className="b-title">Design thinking &amp; craft</p>
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
            <span className="label">Craftsmanship</span>
            <p className="b-craft__quote">
              Design that feels <GradientText text="obvious to use." />
            </p>
            <span className="b-craft__sub">I don’t design to impress. I design to remove hesitation.</span>
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
              <p className="b-title">Crafting digital products</p>
              <p className="b-text">Shopify stores, custom sections and my own products, from the first call to the metric after launch.</p>
            </div>
          </motion.div>

          {/* Collaboration */}
          <motion.div className="b-cell b-collab" {...cell(4)}>
            <span className="label">Collaboration</span>
            <p className="b-title">Cross-functional workflow</p>
            <p className="b-text">Working closely with product, engineering and the people running the store.</p>
            <span className="b-cursor b-cursor--a" aria-hidden>
              <CursorSvg />
              <i>PM</i>
            </span>
            <span className="b-cursor b-cursor--b" aria-hidden>
              <CursorSvg />
              <i>Dev</i>
            </span>
          </motion.div>

          {/* Shipped */}
          <motion.div className="b-cell b-ship" {...cell(5)}>
            <div>
              <p className="b-title">Products shipped</p>
              <p className="b-text">Across 14 stores in four countries, plus my own products.</p>
            </div>
            <span className="b-ship__n">
              <Count to={20} />
              <em>+</em>
            </span>
          </motion.div>

          {/* Toolkit */}
          <motion.div className="b-cell b-tools" {...cell(6)}>
            <span className="label">Toolkit</span>
            <ul>
              {TOOLS.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.05 }}
                >
                  {t}
                </motion.li>
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
  const k = i % 4
  return (
    <span className={`b-chip__icon b-chip__icon--${k}`} aria-hidden>
      {k === 0 && (
        <>
          <i style={{ width: '100%' }} />
          <i style={{ width: '70%' }} />
          <i style={{ width: '45%' }} />
        </>
      )}
      {k === 1 && Array.from({ length: 6 }).map((_, j) => <b key={j} />)}
      {k === 2 && (
        <>
          <i style={{ width: '60%' }} />
          <i style={{ width: '90%' }} />
          <i style={{ width: '40%' }} />
        </>
      )}
      {k === 3 && <span className="b-chip__t">Aa</span>}
    </span>
  )
}

function Laurel({ flip = false }: { flip?: boolean }) {
  const leaves = Array.from({ length: 7 })
  return (
    <svg className={`b-laurel__w ${flip ? 'is-flip' : ''}`} viewBox="0 0 40 80" aria-hidden>
      <path d="M30 76 C 8 62, 4 30, 18 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {leaves.map((_, i) => {
        const t = i / (leaves.length - 1)
        const y = 70 - t * 60
        const x = 26 - Math.sin(t * Math.PI) * 15 - t * 6
        return <ellipse key={i} cx={x} cy={y} rx="3.4" ry="7.5" transform={`rotate(${-35 + t * 30} ${x} ${y})`} fill="currentColor" style={{ ['--i' as string]: i }} />
      })}
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
