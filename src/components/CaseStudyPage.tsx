import { useGSAP } from '@gsap/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { work, type CaseSection, type CaseStudy } from '../content'
import { navigate } from '../lib/router'
import { prefersReducedMotion, scrollTo } from '../lib/smooth'
import { Cover } from './Cover'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'
import { Magnetic } from './Magnetic'

gsap.registerPlugin(ScrollTrigger)
const ease = [0.22, 1, 0.36, 1] as const

/** Shown until a case study has its own `sections` — a guide to what each part should cover. */
const template: CaseSection[] = [
  { id: 'overview', title: 'Overview', body: ['Placeholder — one paragraph on the product, the audience and your role. What did the business need, and what did you own end to end?'] },
  { id: 'problem', title: 'The problem', body: ['Placeholder — what was broken, for whom, and how you knew. Lead with evidence: funnel drop-off, support tickets, interview quotes.'], callout: 'Problem statement — write it as one sentence the whole team could repeat.' },
  { id: 'research', title: 'Research & insights', body: ['Placeholder — methods you used and the three insights that changed the direction of the work.'], images: [] },
  { id: 'decisions', title: 'Key decisions', body: ['Placeholder — the trade-offs you made and why. This is where the PM mindset shows: scope, priorities, what you chose not to build.'], callout: 'Decision — the option you picked, the one you rejected, and the evidence that settled it.' },
  { id: 'solution', title: 'The solution', body: ['Placeholder — walk through the final design, flow by flow. Show the details that make it feel considered.'], images: [] },
  { id: 'impact', title: 'Impact', body: ['Placeholder — what changed after launch. Numbers first, then the qualitative wins.'] },
  { id: 'learnings', title: 'Learnings', body: ['Placeholder — what you would do differently, and what you are taking into the next project.'] },
]

export function CaseStudyPage({ item }: { item: CaseStudy }) {
  const sections = item.sections ?? template
  const idx = work.findIndex((w) => w.slug === item.slug)
  const next = work[(idx + 1) % work.length]
  const root = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] })
  const coverY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    document.title = `${item.title} — Sivadarshan`
    return () => { document.title = 'Sivadarshan — Product Designer' }
  }, [item])

  useGSAP(
    () => {
      sections.forEach((s) => {
        ScrollTrigger.create({
          trigger: `#cs-${s.id}`,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActive(s.id),
        })
      })
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.cs-section').forEach((el) => {
        gsap.from(el.querySelectorAll('.reveal'), {
          y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 78%' },
        })
      })
      gsap.utils.toArray<HTMLElement>('.cs-frame').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(12% 6% 12% 6% round 24px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 40%', scrub: true },
        })
      })
    },
    { scope: root, dependencies: [item.slug] },
  )

  const meta = [
    { label: 'Role', value: item.role },
    { label: 'Timeline', value: item.timeline },
    { label: 'Platform', value: item.platform },
    { label: 'Team', value: item.team ?? 'PM, Engineering, Research' },
  ]

  return (
    <div ref={root} className="cs">
      <header className="cs-hero container">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <LiquidGlass
            as="a"
            href="/#work"
            className="cs-back"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate('/', '#work') }}
          >
            <span className="cs-back__arrow"><Arrow /></span> All work
          </LiquidGlass>
        </motion.div>

        <motion.p className="label cs-hero__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}>
          {item.category} · {item.year} · {item.client}
        </motion.p>

        <h1 className="cs-hero__title">
          <span className="line">
            <motion.span className="line__inner" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.3, ease, delay: 0.3 }}>
              {item.title}
            </motion.span>
          </span>
        </h1>

        <div className="cs-hero__grid">
          <motion.p className="body-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.55 }}>
            {item.summary}
          </motion.p>
          <dl className="meta">
            {meta.map((m, i) => (
              <motion.div className="meta__row" key={m.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.6 + i * 0.07 }}>
                <dt className="label">{m.label}</dt>
                <dd>{m.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </header>

      <motion.div
        ref={coverRef}
        className="cs-cover container"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.6 }}
      >
        <div className="cs-cover__frame" style={{ background: item.tone[0] }}>
          <motion.div className="cs-cover__inner" style={{ y: coverY }}>
            {item.image ? <img src={item.image} alt="" /> : <Cover item={item} large />}
          </motion.div>
        </div>
      </motion.div>

      <div className="cs-body container">
        <aside className="cs-toc" aria-label="Sections">
          <p className="label">Contents</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#cs-${s.id}`}
                  className={active === s.id ? 'is-active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo(`#cs-${s.id}`) }}
                >
                  <span className="label">0{i + 1}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="cs-content">
          {sections.map((s, i) => (
            <section key={s.id} id={`cs-${s.id}`} className="cs-section">
              <p className="label reveal">0{i + 1} — {s.title}</p>
              <h2 className="cs-section__title reveal">{s.title}</h2>
              {s.body.map((para, k) => (
                <p key={k} className="cs-section__p reveal">{para}</p>
              ))}
              {s.callout && (
                <LiquidGlass className="cs-callout reveal" interactive>
                  <span className="label">Key insight</span>
                  <span className="cs-callout__text">{s.callout}</span>
                </LiquidGlass>
              )}
              {s.id === 'impact' && (
                <div className="cs-impact">
                  {(item.impact ?? [{ value: '—', label: 'Primary metric' }, { value: '—', label: 'Secondary metric' }, { value: '—', label: 'Qualitative win' }]).map((m) => (
                    <div key={m.label} className="cs-impact__item reveal">
                      <span className="cs-impact__value">{m.value}</span>
                      <span className="label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {s.images && (
                <div className="cs-frames">
                  {(s.images.length ? s.images : [null, null]).map((src, k) => (
                    <div key={k} className="cs-frame" style={{ background: item.tone[0] }}>
                      {src ? <img src={src} alt="" loading="lazy" /> : <span className="label cs-frame__ph">Image placeholder</span>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <div className="container cs-next">
        <span className="rule" />
        <a href={`/work/${next.slug}`} className="cs-next__link" onClick={(e) => { e.preventDefault(); navigate(`/work/${next.slug}`) }}>
          <span className="label">Next case study</span>
          <span className="cs-next__title">{next.title}</span>
          <Magnetic>
            <span className="btn btn--ink">View case <Arrow /></span>
          </Magnetic>
        </a>
      </div>
    </div>
  )
}
