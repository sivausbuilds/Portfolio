import { useGSAP } from '@gsap/react'
import { motion, useScroll, useTransform } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { work, type CaseStudy } from '../data/work'
import { navigate } from '../lib/router'
import { scrollTo } from '../lib/smooth'
import { CaseBar } from './CaseBar'
import { BlockView } from './CaseBlocks'
import { Cover } from './Cover'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'
import { AutoVideo, BrowserFrame } from './Media'
import { plain, Rich } from './Rich'
import { GradientText } from './GradientText'

gsap.registerPlugin(ScrollTrigger)
const ease = [0.22, 1, 0.36, 1] as const

export function CaseStudyPage({ item }: { item: CaseStudy }) {
  const idx = work.findIndex((w) => w.slug === item.slug)
  const next = work[(idx + 1) % work.length]
  const root = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] })
  const coverY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const coverScale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1])
  const [active, setActive] = useState(item.chapters[0].id)
  const words = JSON.stringify(item.chapters).replace(/[^a-zA-Z ]/g, ' ').split(/\s+/).length
  const readMins = Math.max(1, Math.round(words / 220))
  const results = item.chapters.find((c) => /result|outcome/.test(c.id))
  const [barVisible, setBarVisible] = useState(false)

  useEffect(() => {
    document.title = `${plain(item.title)} — Sivadarshan`
    return () => {
      document.title = 'Sivadarshan — Product Designer'
    }
  }, [item])

  useGSAP(
    () => {
      item.chapters.forEach((c) => {
        ScrollTrigger.create({
          trigger: `#cs-${c.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && setActive(c.id),
        })
      })
      // key-phrase underlines draw in as they enter the viewport
      ScrollTrigger.batch('.cs .hl', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => els.forEach((el, i) => setTimeout(() => el.classList.add('is-drawn'), i * 120)),
      })
      // bar shows once the summary strip has scrolled by, hides at the end of the story
      ScrollTrigger.create({
        trigger: '.cs-glance',
        start: 'bottom 85%',
        endTrigger: '.cs-next',
        end: 'top 85%',
        onToggle: (self) => setBarVisible(self.isActive),
      })
    },
    { scope: root, dependencies: [item.slug] },
  )

  return (
    <div ref={root} className="cs" style={{ ['--tone' as string]: item.tone[0], ['--accent' as string]: item.tone[1] }}>
      <header className="cs-hero container">
        <div className="cs-hero__top">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
            <LiquidGlass
              as="a"
              href="/#work"
              className="cs-back"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                navigate('/', '#work')
              }}
            >
              <span className="cs-back__arrow">
                <Arrow />
              </span>{' '}
              All work
            </LiquidGlass>
          </motion.div>
          <motion.span className={`cs-status ${item.status === 'Complete' ? 'is-done' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <i aria-hidden /> {item.status === 'Complete' ? 'Case study' : 'Write-up in progress'}
          </motion.span>
        </div>

        <motion.p className="label cs-hero__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}>
          {item.kicker} · {item.year} · {readMins} min read
        </motion.p>

        <h1 className="cs-hero__title">
          <span className="line">
            <motion.span className="line__inner" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.3, ease, delay: 0.3 }}>
              <Rich text={item.title} fancy />
            </motion.span>
          </span>
        </h1>

        <div className="cs-hero__grid">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.55 }}>
            <p className="body-lg cs-hero__intro">{item.intro}</p>
            <ul className="cs-chips">
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="cs-actions">
              {results && (
                <a
                  href={`#cs-${results.id}`}
                  className="btn btn--shimmer"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(`#cs-${results.id}`)
                  }}
                >
                  <span className="btn--shimmer__sweep" aria-hidden />
                  <span className="btn--shimmer__label">
                    Skip to results <span className="cs-actions__down" aria-hidden>↓</span>
                  </span>
                </a>
              )}
              {item.facts.primary && (
                <LiquidGlass as="a" href={item.facts.primary.href} target="_blank" rel="noopener noreferrer" className="btn btn--glass">
                  {item.facts.primary.label} <Arrow />
                </LiquidGlass>
              )}
            </div>
          </motion.div>
          <dl className="meta">
            {item.meta.map((m, i) => (
              <motion.div className="meta__row" key={m.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.6 + i * 0.07 }}>
                <dt className="label">{m.label}</dt>
                <dd>{m.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Impact first: the numbers a reviewer is looking for */}
        <motion.div
          className="cs-impact"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.85 }}
          aria-label="Impact"
        >
          <span className="label cs-impact__label">Impact at a glance</span>
          <div className="cs-impact__row">
            {item.facts.highlights.map((h, i) => (
              <div key={h.label} className="cs-impact__item">
                <span className="cs-impact__value">
                  <GradientText text={h.value} delay={2.5 + i * 0.5} />
                </span>
                <span className="cs-impact__desc">{h.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      <motion.div ref={coverRef} className="cs-cover container" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease, delay: 0.6 }}>
        <motion.div className="cs-cover__frame" style={{ scale: coverScale }}>
          <motion.div className="cs-cover__inner" style={{ y: coverY }}>
            {item.cover?.kind === 'video' ? (
              <div className="cs-cover__device">
                <BrowserFrame url={item.facts.primary?.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}>
                  <AutoVideo src={item.cover.src} />
                </BrowserFrame>
              </div>
            ) : item.cover?.kind === 'image' ? (
              <img src={item.cover.src} alt={item.cover.alt} />
            ) : (
              <Cover item={item} large />
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The story in three steps — the outcome card carries the most weight */}
      <section className="cs-glance container" aria-label="At a glance">
        <p className="label cs-glance__label">The short version</p>
        <div className="cs-glance__row">
          {[
            ['01', 'The problem', item.facts.problem],
            ['02', 'What I built', item.facts.built],
            ['03', 'The outcome', item.facts.outcome],
          ].map(([n, k, v], i) => (
            <motion.div
              key={k}
              className={`cs-glance__card ${i === 2 ? 'is-key' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, ease, delay: i * 0.12 }}
            >
              <span className="cs-glance__num">{n}</span>
              <span className="label">{k}</span>
              <p>{v}</p>
              {i < 2 && <span className="cs-glance__arrow" aria-hidden>→</span>}
            </motion.div>
          ))}
        </div>
      </section>

      <div className="cs-body container">
        {item.chapters.length > 1 && (
          <aside className="cs-toc" aria-label="Chapters">
            <p className="label">Chapters</p>
            <ol>
              {item.chapters.map((c, i) => (
                <li key={c.id}>
                  <a
                    href={`#cs-${c.id}`}
                    className={active === c.id ? 'is-active' : ''}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(`#cs-${c.id}`)
                    }}
                  >
                    <span className="label">{String(i + 1).padStart(2, '0')}</span>
                    {/^Chapter/.test(c.kicker) ? plain(c.title) : c.kicker}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        )}

        <div className={`cs-content ${item.chapters.length > 1 ? '' : 'cs-content--solo'}`}>
          {item.chapters.map((c, ci) => (
            <section key={c.id} id={`cs-${c.id}`} className="cs-chapter">
              <motion.header
                className="cs-chapter__head"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease }}
              >
                <span className="cs-chapter__idx" aria-hidden>
                  <GradientText text={String(ci + 1).padStart(2, '0')} shimmer={false} />
                </span>
                {!/^Chapter \d+/.test(c.kicker) && <p className="label">{c.kicker}</p>}
                <h2 className="cs-chapter__title">
                  <Rich text={c.title} fancy />
                </h2>
              </motion.header>
              {c.blocks.map((b, k) => (
                <BlockView key={k} block={b} item={item} />
              ))}
            </section>
          ))}
        </div>
      </div>

      <div className="container cs-next">
        <span className="rule" />
        <a
          href={`/work/${next.slug}`}
          className="cs-next__link"
          onClick={(e) => {
            e.preventDefault()
            navigate(`/work/${next.slug}`)
          }}
        >
          <span className="label">Next case study · {next.kicker}</span>
          <span className="cs-next__title">
            <Rich text={next.title} fancy />
          </span>
          <span className="btn-wrap">
            <span className="btn btn--ink">
              View case <Arrow />
            </span>
          </span>
        </a>
      </div>

      <CaseBar item={item} active={active} visible={barVisible} />
    </div>
  )
}
