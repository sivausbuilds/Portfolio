import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react'
import { useMemo, useState } from 'react'
import { site, websites, type Site, type SiteStatus } from '../content'
import { navigate } from '../lib/router'
import { scrollTo } from '../lib/smooth'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'
import { Rich } from './Rich'

const ease = [0.22, 1, 0.36, 1] as const
const host = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '')
const STATUS: Record<SiteStatus, string> = { live: 'Live', building: 'In development', protected: 'Private preview' }
type Filter = 'all' | 'live' | 'private'

/**
 * Project index: one clean row per store. On desktop a preview follows the cursor
 * and tilts with its speed; on touch screens each row shows its image inline.
 */
export function Websites() {
  const [filter, setFilter] = useState<Filter>('all')
  const [hover, setHover] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const items = [...websites.items].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  const shown = useMemo(
    () => items.filter((s) => filter === 'all' || (filter === 'live' ? s.status === 'live' : s.status !== 'live')),
    [items, filter],
  )
  const counts = { all: items.length, live: items.filter((s) => s.status === 'live').length, private: items.filter((s) => s.status !== 'live').length }

  // cursor-following preview
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 })
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 })
  const vx = useVelocity(x)
  const rotate = useTransform(vx, [-2000, 0, 2000], [-9, 0, 9], { clamp: true })
  const LIMIT = 8
  const visible = expanded ? shown : shown.slice(0, LIMIT)
  const active = hover !== null ? visible[hover] : null

  const toContact = (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.location.pathname !== '/') navigate('/', '#contact')
    else scrollTo('#contact')
  }

  return (
    <section
      id="websites"
      className="sx"
      onPointerMove={(e) => {
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
    >
      <div className="container">
        <div className="sx__head">
          <p className="label">(02) — Websites built</p>
          <h2 className="sx__title">
            <span className="line">
              <motion.span className="line__inner" initial={{ y: '105%' }} whileInView={{ y: '0%' }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 1.2, ease }}>
                <Rich text={websites.title} fancy />
              </motion.span>
            </span>
          </h2>
          <motion.div className="sx__side" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease, delay: 0.15 }}>
            <p className="body-lg"><Rich text={websites.intro} /></p>
            <div className="sx__ctas">
              <a href="#contact" className="btn btn--shimmer" onClick={toContact}>
                <span className="btn--shimmer__sweep" aria-hidden />
                <span className="btn--shimmer__label">Start a store project <Arrow /></span>
              </a>
              <LayoutGroup id="sx-filter">
                <LiquidGlass className="segmented" interactive={false} role="tablist" aria-label="Filter stores">
                  {(['all', 'live', 'private'] as Filter[]).map((f) => (
                    <button key={f} role="tab" aria-selected={filter === f} className={`segmented__btn ${filter === f ? 'is-active' : ''}`} onClick={() => { setFilter(f); setHover(null) }}>
                      {filter === f && <motion.span layoutId="sx-pill" className="segmented__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                      <span className="segmented__text">
                        {f === 'all' ? 'All' : f === 'live' ? 'Live' : 'In progress'}
                        <span className="segmented__count">{counts[f]}</span>
                      </span>
                    </button>
                  ))}
                </LiquidGlass>
              </LayoutGroup>
            </div>
          </motion.div>
        </div>

        <div className="sx__cols label" aria-hidden>
          <span>No.</span>
          <span>Store</span>
          <span>Category</span>
          <span>Status</span>
          <span />
        </div>

        <ol className="sx__list" onPointerLeave={() => setHover(null)}>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((s, i) => (
              <Row key={s.name} s={s} i={i} dim={hover !== null && hover !== i} onHover={setHover} />
            ))}
          </AnimatePresence>
        </ol>
        {shown.length > LIMIT && (
          <div className="sx__more">
            <button type="button" className="sx__more-btn" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
              <span>{expanded ? 'Show fewer' : `Show all ${shown.length} stores`}</span>
              <span className={`sx__more-icon ${expanded ? 'is-open' : ''}`} aria-hidden>+</span>
            </button>
          </div>
        )}
      </div>

      {/* floating preview (fine pointers only, via CSS) */}
      <motion.div className="sx__preview" style={{ x, y, rotate }} aria-hidden>
        <AnimatePresence>
          {active && (
            <motion.div
              key="frame"
              className="sx__frame"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.45, ease }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={active.image}
                  src={active.image}
                  alt=""
                                    initial={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                />
              </AnimatePresence>
              {active.status !== 'live' && (
                <span className="sx__lock">
                  <LockIcon /> {active.password ? `Password: ${active.password}` : STATUS[active.status]}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function Row({ s, i, dim, onHover }: { s: Site; i: number; dim: boolean; onHover: (i: number | null) => void }) {
  const dev = s.status !== 'live'
  const href = s.url
  const cta = !href ? 'Link coming soon' : dev ? 'Open preview' : `Visit ${host(href)}`
  return (
    <motion.li
      layout
      className={`sx-row ${dim ? 'is-dim' : ''} ${s.featured ? 'is-featured' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.8, ease, delay: Math.min(i, 6) * 0.05 }}
    >
      <div className="sx-row__link" onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(i)} onFocus={() => onHover(i)} onBlur={() => onHover(null)}>
        <span className="sx-row__num">{String(i + 1).padStart(2, '0')}</span>
        <span className="sx-row__thumb" aria-hidden>
          <img src={s.image} alt="" loading="lazy" />
          {dev && <span className="sx__lock"><LockIcon /></span>}
        </span>
        <span className="sx-row__main">
          {s.press && <Press kind={s.press} />}
          <span className="sx-row__name">{s.name}</span>
          {dev ? (
            <span className="sx-row__access">
              <span className="sx-row__url">{host(s.url)}</span>
              {s.password && <Password value={s.password} />}
            </span>
          ) : (
            <span className="sx-row__note">{s.note}</span>
          )}
        </span>
        <span className="sx-row__meta">
          {s.tag}
          <em>{[s.market, s.year].filter(Boolean).join(' · ')}</em>
        </span>
        <span className={`sx-row__status is-${s.status}`}>
          <i aria-hidden /> {STATUS[s.status]}
        </span>
        {href && s.password ? (
          // Submits the store's own password form (POST /password) in a new tab, so Shopify
          // unlocks the storefront and redirects to the home page. The password is also copied as a fallback.
          <form className="sx-row__form" method="post" action={`${href.replace(/\/$/, '')}/password`} target="_blank">
            <input type="hidden" name="form_type" value="storefront_password" />
            <input type="hidden" name="utf8" value="✓" />
            <input type="hidden" name="password" value={s.password} />
            <button
              type="submit"
              className="sx-row__cta sx-row__hit"
              aria-label={`Open ${s.name} preview, password filled in`}
              onClick={() => navigator.clipboard?.writeText(s.password!).catch(() => {})}
            >
              <span className="sx-row__cta-text">{cta}</span>
              <span className="sx-row__arrow"><Arrow /></span>
            </button>
          </form>
        ) : href ? (
          <a className="sx-row__cta sx-row__hit" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${cta} (${s.name})`}>
            <span className="sx-row__cta-text">{cta}</span>
            <span className="sx-row__arrow"><Arrow /></span>
          </a>
        ) : (
          <span className="sx-row__cta is-soon"><span className="sx-row__cta-text">{cta}</span></span>
        )}
        <span className="sx-row__fill" aria-hidden />
      </div>
    </motion.li>
  )
}

/** Storefront password with one-click copy. Sits above the row link. */
function Password({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="sx-pw"
      onClick={async (e) => {
        e.stopPropagation()
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* clipboard blocked: the password is visible anyway */
        }
      }}
      aria-label={`Copy password ${value}`}
    >
      <LockIcon />
      <span className="sx-pw__label">Password</span>
      <code>{value}</code>
      <span className="sx-pw__copy">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <rect x="3" y="7" width="10" height="7" rx="2" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  )
}

/** Press credit, set as type rather than the publishers' logos. */
export function Press({ kind }: { kind: 'vogue' | 'radio' }) {
  if (kind === 'radio')
    return (
      <span className="press press--radio" aria-label="As heard on Dubai Eye 103.8">
        <span className="press__label">As heard on</span>
        <span className="press__onair" aria-hidden><i /></span>
        <span className="press__mark press__mark--radio">DUBAI EYE <b>103.8</b></span>
      </span>
    )
  return (
    <span className="press" aria-label="Featured in British Vogue and Condé Nast">
      <span className="press__label">As featured in</span>
      <span className="press__mark press__mark--vogue">
        <small>British</small>VOGUE
      </span>
      <span className="press__sep" aria-hidden />
      <span className="press__mark press__mark--cn">CONDÉ NAST</span>
    </span>
  )
}
