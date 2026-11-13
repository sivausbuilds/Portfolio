import { useGSAP } from '@gsap/react'
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMemo, useRef, useState } from 'react'
import { work, type Category, type CaseStudy } from '../content'
import { navigate } from '../lib/router'
import { prefersReducedMotion } from '../lib/smooth'
import { Cover } from './Cover'
import { AutoVideo } from './Media'
import { plain } from './Rich'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const
type Filter = 'All' | Category
const filters: Filter[] = ['All', 'E-commerce', 'Product']
const pad = (n: number) => String(n).padStart(2, '0')

export function Work() {
  const [filter, setFilter] = useState<Filter>('All')
  const items = useMemo(() => (filter === 'All' ? work : work.filter((w) => w.category === filter)), [filter])
  const count = (f: Filter) => (f === 'All' ? work.length : work.filter((w) => w.category === f).length)

  return (
    <section id="work" className="work">
      <div className="container">
        <div className="work__head">
          <motion.p
            className="label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease }}
          >
            (01) — Selected work
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
                Case studies<sup>({pad(work.length)})</sup>
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
              Shopify builds that sell and products I defined myself — each one told as problem, insight, build and outcome.
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
      </div>

      <Stack key={filter} items={items} />
    </section>
  )
}

/**
 * Pinned card stack. Each scroll step slides the next case study up over the deck;
 * earlier cards sink back like sheets of paper. Two tilted ribbons behind the deck
 * name the active project and speed up with scroll velocity.
 */
function Stack({ items }: { items: CaseStudy[] }) {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const item = items[active]

  // "View case" bubble
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const bx = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.5 })
  const by = useSpring(my, { stiffness: 320, damping: 30, mass: 0.5 })
  const [hovering, setHovering] = useState(false)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack__card')
      const tracks = gsap.utils.toArray<HTMLElement>('.ribbon__track')

      // Ribbon marquees (opposite directions), boosted by scroll velocity
      const marquees = tracks.map((t, i) =>
        gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: 'none', repeat: -1 }),
      )
      let boost = 1
      const decay = () => {
        boost += (1 - boost) * 0.06
        marquees.forEach((m) => m.timeScale(boost))
      }
      gsap.ticker.add(decay)

      if (prefersReducedMotion() || cards.length < 2) {
        marquees.forEach((m) => m.timeScale(prefersReducedMotion() ? 0 : 1))
        return () => gsap.ticker.remove(decay)
      }

      gsap.set(cards.slice(1), { yPercent: 165, rotate: (i) => (i % 2 ? -5 : 5) })

      const steps = cards.length - 1
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 1 },
        scrollTrigger: {
          trigger: '.stack__pin',
          start: 'top top',
          // refresh before the About pin below, so a remount (filter change) can't leave About measuring stale positions
          refreshPriority: 1,
          end: () => `+=${steps * window.innerHeight * 0.85}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / steps, duration: { min: 0.25, max: 0.7 }, ease: 'power2.inOut', delay: 0.05 },
          onUpdate: (self) => {
            const i = Math.round(self.progress * steps)
            if (i !== activeRef.current) {
              activeRef.current = i
              setActive(i)
            }
            boost = Math.min(5, 1 + Math.abs(self.getVelocity()) / 400)
          },
        },
      })

      cards.forEach((card, i) => {
        if (i === 0) return
        tl.to(card, { yPercent: 0, rotate: 0 }, i - 1)
        cards.slice(0, i).forEach((prev, j) => {
          const depth = i - j
          tl.to(
            prev,
            {
              scale: 1 - depth * 0.045,
              yPercent: -depth * 3.2,
              rotate: (j % 2 ? 1 : -1) * Math.min(depth, 2) * 1.1,
              opacity: depth > 2 ? 0 : 1,
            },
            i - 1,
          )
        })
      })

      requestAnimationFrame(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      })
      return () => gsap.ticker.remove(decay)
    },
    { scope: root, dependencies: [items] },
  )

  const ribbonText = item ? [item.name, item.category, item.kicker] : []

  return (
    <div ref={root} className="stack" onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY) }}>
      <div className="stack__pin">
        <div className="ribbons" aria-hidden>
          {[0, 1].map((r) => (
            <div key={r} className={`ribbon ribbon--${r}`}>
              <div className="ribbon__track">
                {Array.from({ length: 2 }).map((_, half) => (
                  <span key={half} className="ribbon__half">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={item?.slug}
                        className="ribbon__content"
                        initial={{ opacity: 0, y: '40%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        exit={{ opacity: 0, y: '-40%' }}
                        transition={{ duration: 0.6, ease }}
                      >
                        {Array.from({ length: 3 }).flatMap((_, k) =>
                          (r ? [...ribbonText].reverse() : ribbonText).map((t, j) => (
                            <span key={`${k}-${j}`} className="ribbon__item">
                              {t}
                              <Diamond />
                            </span>
                          )),
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stack__deck container">
          <div className="stack__frame">
            <span className="stack__ghost stack__ghost--a" aria-hidden />
            <span className="stack__ghost stack__ghost--b" aria-hidden />
            {items.map((it, i) => (
              <article
                key={it.slug}
                className="stack__card"
                style={{ zIndex: i + 1 }}
                aria-hidden={i !== active}
              >
                <a
                  href={`/work/${it.slug}`}
                  className="card"
                  tabIndex={i === active ? 0 : -1}
                  onClick={(e) => { e.preventDefault(); navigate(`/work/${it.slug}`) }}
                  onPointerEnter={() => setHovering(true)}
                  onPointerLeave={() => setHovering(false)}
                >
                  <div className="card__media" style={{ background: it.tone[0] }}>
                    {it.cover?.kind === 'video' && Math.abs(i - active) <= 1 ? (
                      <div className="card__video">
                        <AutoVideo src={it.cover.src} autoPlay={i === active} />
                      </div>
                    ) : it.cover?.kind === 'image' ? (
                      <img src={it.cover.src} alt="" loading="lazy" />
                    ) : (
                      <Cover item={it} />
                    )}
                  </div>
                  <div className="card__info">
                    <div className="card__row">
                      <span className="label">{pad(i + 1)} / {pad(items.length)} · {it.kicker}</span>
                      <span className={`card__status ${it.status === 'Complete' ? 'is-done' : ''}`}>
                        <i aria-hidden /> {it.status === 'Complete' ? it.year : 'In progress'}
                      </span>
                    </div>
                    <div className="card__main">
                      <h3 className="card__title">{plain(it.title)}</h3>
                      <p className="card__summary">{it.summary}</p>
                      <ul className="card__tags">
                        {it.tags.slice(0, 3).map((t, k) => (
                          <li key={t} className={k === 2 ? 'hide-sm' : ''}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <LiquidGlass className="card__go" interactive={false} refract={false}>
                      <Arrow />
                    </LiquidGlass>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="stack__progress container" aria-hidden>
          <span className="label">
            <span className="stack__num">{pad(active + 1)}</span> / {pad(items.length)}
          </span>
          <span className="stack__bars">
            {items.map((it, i) => (
              <span key={it.slug} className={i <= active ? 'is-on' : ''} />
            ))}
          </span>
          <span className="label hide-sm">Scroll to explore</span>
        </div>
      </div>

      <motion.div className="cursor-bubble" style={{ x: bx, y: by }} aria-hidden>
        <motion.div initial={false} animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }} transition={{ duration: 0.45, ease }}>
          <LiquidGlass className="cursor-bubble__glass" interactive={false}>
            View case <Arrow />
          </LiquidGlass>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Diamond() {
  return (
    <svg className="ribbon__diamond" viewBox="0 0 20 20" aria-hidden>
      <path d="M10 0l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="currentColor" />
    </svg>
  )
}
