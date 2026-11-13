import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import type { CaseStudy } from '../data/work'
import { lockScroll, scrollTo } from '../lib/smooth'
import { Arrow } from './Header'
import { plain } from './Rich'
import { LiquidGlass } from './LiquidGlass'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Floating "don't miss this" bar for a case study: progress, current chapter,
 * headline numbers and the main link. "Key facts" opens a panel with the
 * problem, the build, the outcome and a chapter list to jump to.
 */
export function CaseBar({ item, active, visible }: { item: CaseStudy; active: string; visible: boolean }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const dash = useTransform(p, (v) => 100 - v * 100)

  const idx = Math.max(0, item.chapters.findIndex((c) => c.id === active))
  const chapter = item.chapters[idx]

  useEffect(() => {
    if (!visible) setOpen(false)
  }, [visible])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  // on phones the panel is a sheet: freeze the page behind it
  useEffect(() => {
    const small = window.matchMedia('(max-width: 760px)').matches
    if (small) lockScroll(open)
    return () => { if (small) lockScroll(false) }
  }, [open])

  const jump = (id: string) => {
    setOpen(false)
    setTimeout(() => scrollTo(`#cs-${id}`), 200)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            className="cs-bar__scrim"
            aria-label="Close key facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="cs-bar"
        initial={false}
        animate={{ y: visible ? 0 : '160%', opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.7, ease }}
        aria-hidden={!visible}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              id="cs-facts"
              className="cs-bar__panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.5, ease }}
              role="dialog"
              aria-label={`${item.name} key facts`}
            >
              <LiquidGlass className="cs-bar__panel-glass" interactive={false} refract={false}>
                <div className="facts">
                  {[
                    ['The problem', item.facts.problem],
                    ['What I built', item.facts.built],
                    ['The outcome', item.facts.outcome],
                  ].map(([k, v], i) => (
                    <motion.div key={k} className="facts__col" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease }}>
                      <span className="label">{k}</span>
                      <p>{v}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="facts__highlights">
                  {item.facts.highlights.map((h) => (
                    <span key={h.label} className="facts__hl">
                      <strong>{h.value}</strong> {h.label}
                    </span>
                  ))}
                </div>
                {item.chapters.length > 1 && (
                  <div className="facts__jump">
                    <span className="label">Jump to</span>
                    <div>
                      {item.chapters.map((c, i) => (
                        <button key={c.id} type="button" className={c.id === active ? 'is-active' : ''} onClick={() => jump(c.id)}>
                          <span>0{i + 1}</span> {shortTitle(c)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </LiquidGlass>
            </motion.div>
          )}
        </AnimatePresence>

        <LiquidGlass className="cs-bar__glass" refract={false}>
          <div className="cs-bar__where">
            <svg className="cs-bar__ring" viewBox="0 0 36 36" aria-hidden>
              <circle cx="18" cy="18" r="15.9" pathLength="100" className="cs-bar__ring-bg" />
              <motion.circle cx="18" cy="18" r="15.9" pathLength="100" className="cs-bar__ring-fg" style={{ strokeDashoffset: dash }} />
            </svg>
            <span className="cs-bar__num">{String(idx + 1).padStart(2, '0')}</span>
            <span className="cs-bar__titles">
              <span className="cs-bar__name">{item.name}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={chapter?.id}
                  className="cs-bar__chapter"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  {chapter ? shortTitle(chapter) : ''}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <div className="cs-bar__hl" aria-label="Highlights">
            {item.facts.highlights.map((h) => (
              <span key={h.label}>
                <strong>{h.value}</strong>
                {h.label}
              </span>
            ))}
          </div>

          <div className="cs-bar__actions">
            <button type="button" className={`cs-bar__facts ${open ? 'is-open' : ''}`} aria-expanded={open} aria-controls="cs-facts" onClick={() => setOpen((o) => !o)}>
              Key facts
              <span className="cs-bar__chev" aria-hidden />
            </button>
            {item.facts.primary && (
              <a className="btn btn--ink btn--sm cs-bar__cta" href={item.facts.primary.href} target="_blank" rel="noopener noreferrer">
                <span className="cs-bar__cta-text">{item.facts.primary.label}</span> <Arrow />
              </a>
            )}
          </div>
        </LiquidGlass>
      </motion.div>
    </>
  )
}

/** Chapter label for tight spaces: kicker if it is descriptive, else the title. */
function shortTitle(c: { kicker: string; title: string }) {
  return /^Chapter \d+/.test(c.kicker) ? plain(c.title).replace(/\.$/, '') : c.kicker
}
