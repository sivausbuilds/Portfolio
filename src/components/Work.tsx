import { AnimatePresence, LayoutGroup, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { work, type Category, type CaseStudy } from '../content'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'

const ease = [0.22, 1, 0.36, 1] as const
type Filter = 'All' | Category
const filters: Filter[] = ['All', 'E-commerce', 'Product']

export function Work() {
  const [filter, setFilter] = useState<Filter>('All')
  const items = useMemo(() => (filter === 'All' ? work : work.filter((w) => w.category === filter)), [filter])
  const count = (f: Filter) => (f === 'All' ? work.length : work.filter((w) => w.category === f).length)

  // Cursor-following "View case" bubble (desktop only, via CSS)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.5 })
  const y = useSpring(my, { stiffness: 300, damping: 30, mass: 0.5 })
  const [hovering, setHovering] = useState(false)

  return (
    <section
      id="work"
      className="work"
      onPointerMove={(e) => {
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
    >
      <div className="container">
        <div className="work__head">
          <motion.p
            className="label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease }}
          >
            (02) — Selected work
          </motion.p>

          <h2 className="work__title">
            <span className="line">
              <motion.span
                className="line__inner"
                initial={{ y: '105%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.2, ease }}
              >
                Case studies<sup>({String(work.length).padStart(2, '0')})</sup>
              </motion.span>
            </span>
          </h2>

          <motion.div
            className="work__intro"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, ease, delay: 0.15 }}
          >
            <p className="body-lg">
              E-commerce journeys and product work — each one framed by a problem, a decision and a measurable outcome.
            </p>

            <LayoutGroup id="work-filter">
              <LiquidGlass className="segmented" interactive={false} role="tablist" aria-label="Filter case studies">
                {filters.map((f) => (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={filter === f}
                    className={`segmented__btn ${filter === f ? 'is-active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {filter === f && (
                      <motion.span layoutId="seg-pill" className="segmented__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="segmented__text">
                      {f}
                      <span className="segmented__count">{count(f)}</span>
                    </span>
                  </button>
                ))}
              </LiquidGlass>
            </LayoutGroup>
          </motion.div>
        </div>

        <motion.ul layout className="work__grid">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <Card key={item.slug} item={item} index={i} onHover={setHovering} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <motion.div className="cursor-bubble" style={{ x, y }} aria-hidden>
        <motion.div
          initial={false}
          animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.45, ease }}
        >
          <LiquidGlass className="cursor-bubble__glass" interactive={false}>
            View case <Arrow />
          </LiquidGlass>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Card({ item, index, onHover }: { item: CaseStudy; index: number; onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const coverY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <motion.li
      ref={ref}
      layout
      className="case"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, ease, delay: (index % 2) * 0.12 }}
    >
      <a href={item.href} className="case__link" onPointerEnter={() => onHover(true)} onPointerLeave={() => onHover(false)}>
        <div className="case__cover" style={{ background: item.tone[0] }}>
          <motion.div className="case__cover-inner" style={{ y: coverY }}>
            {item.image ? <img src={item.image} alt="" loading="lazy" /> : <Cover item={item} />}
          </motion.div>
          <LiquidGlass className="case__chip" interactive={false} refract={false}>
            {item.category}
          </LiquidGlass>
        </div>

        <div className="case__body">
          <div className="case__row">
            <span className="label">
              {String(index + 1).padStart(2, '0')} · {item.client}
            </span>
            <span className="label">{item.year}</span>
          </div>
          <h3 className="case__title">{item.title}</h3>
          <p className="case__summary">{item.summary}</p>
          <dl className="case__meta">
            {item.outcome && (
              <div>
                <dt className="label">{item.outcome.label}</dt>
                <dd>{item.outcome.value}</dd>
              </div>
            )}
            <div>
              <dt className="label">Role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt className="label">Platform</dt>
              <dd>{item.platform}</dd>
            </div>
          </dl>
        </div>
      </a>
    </motion.li>
  )
}

/** Generated placeholder cover: an abstract UI floating on a soft field, tinted per project. */
function Cover({ item }: { item: CaseStudy }) {
  const [, accent] = item.tone
  const shop = item.category === 'E-commerce'
  return (
    <div className="cover" style={{ ['--accent' as string]: accent }}>
      <span className="cover__orb" />
      <span className="cover__orb cover__orb--2" />
      <LiquidGlass className="cover__panel" interactive={false} refract={false}>
        <span className="cover__bar" />
        {shop ? (
          <span className="cover__tiles">
            {Array.from({ length: 6 }).map((_, k) => (
              <span key={k} />
            ))}
          </span>
        ) : (
          <span className="cover__chart">
            {[38, 62, 48, 80, 56, 92, 70].map((h, k) => (
              <span key={k} style={{ height: `${h}%` }} />
            ))}
          </span>
        )}
        <span className="cover__lines">
          <span />
          <span />
        </span>
      </LiquidGlass>
    </div>
  )
}
