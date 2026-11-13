import { AnimatePresence, LayoutGroup, motion, useInView, animate } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { Block, CaseStudy, FlowNode } from '../data/work'
import { Arrow } from './Header'
import { LiquidGlass } from './LiquidGlass'
import { AutoVideo, BrowserFrame, PhoneFrame } from './Media'
import { Rich } from './Rich'
import { GradientText } from './GradientText'

const ease = [0.22, 1, 0.36, 1] as const
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
  transition: { duration: 1, ease },
}

export function BlockView({ block, item }: { block: Block; item: CaseStudy }) {
  switch (block.type) {
    case 'p':
      return (
        <motion.p className="cs-p" {...reveal}>
          <Rich text={block.text} />
        </motion.p>
      )
    case 'goal':
      return <Callout label="The goal" text={block.text} tone="goal" />
    case 'why':
      return <Callout label="Why this design" text={block.text} tone="why" />
    case 'journey':
      return <Journey {...block} />
    case 'feature':
      return <Feature {...block} />
    case 'drawer':
      return <DrawerDemo />
    case 'image':
      return (
        <motion.figure className="cs-figure cs-wide" {...reveal}>
          {block.frame === 'browser' ? (
            <BrowserFrame url={block.url}>
              <img src={block.src} alt={block.alt} loading="lazy" />
            </BrowserFrame>
          ) : (
            <div className="cs-figure__plain">
              <img src={block.src} alt={block.alt} loading="lazy" />
            </div>
          )}
          {block.caption && <figcaption className="label">{block.caption}</figcaption>}
        </motion.figure>
      )
    case 'kpis':
      return <Kpis items={block.items} />
    case 'compare':
      return <Compare {...block} />
    case 'tabs':
      return <Tabs tabs={block.tabs} />
    case 'flow':
      return <Flow {...block} />
    case 'stats':
      return <Stats items={block.items} />
    case 'table':
      return (
        <motion.dl className="cs-table" {...reveal}>
          {block.rows.map(([k, v]) => (
            <div key={k} className="cs-table__row">
              <dt className="label">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </motion.dl>
      )
    case 'links':
      return (
        <div className="cs-links">
          {block.items.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-link"
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.06 }}
            >
              <span className="label">{l.kind}</span>
              <span className="cs-link__title">{l.title}</span>
              {l.body && <span className="cs-link__body">{l.body}</span>}
              <span className="cs-link__cta">
                {l.cta} <Arrow />
              </span>
            </motion.a>
          ))}
        </div>
      )
    case 'pending':
      return (
        <motion.div className="cs-pending" {...reveal} style={{ ['--accent' as string]: item.tone[1] }}>
          <span className="cs-pending__dot" aria-hidden />
          <p>{block.text}</p>
        </motion.div>
      )
  }
}

function Callout({ label, text, tone }: { label: string; text: string; tone: 'goal' | 'why' }) {
  return (
    <motion.div {...reveal}>
      <LiquidGlass className={`cs-callout cs-callout--${tone}`}>
        <span className="label">{label}</span>
        <span className="cs-callout__text">
          <Rich text={text} />
        </span>
      </LiquidGlass>
    </motion.div>
  )
}

/* ── Journey: stage → question → fix ── */
function Journey({ steps, extra }: Extract<Block, { type: 'journey' }>) {
  return (
    <div className="journey cs-wide">
      <ol>
        {steps.map((s, i) => (
          <motion.li key={s.stage} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
            <span className="journey__idx label">0{i + 1}</span>
            <span className="journey__stage label">{s.stage}</span>
            <span className="journey__q">“{s.question}”</span>
            <span className="journey__fix">
              <span className="journey__fix-dot" aria-hidden />
              {s.fix}
            </span>
          </motion.li>
        ))}
      </ol>
      {extra && (
        <motion.p className="journey__extra" {...reveal}>
          <span className="label">Plus</span> {extra.replace(/^Plus /, '')}
        </motion.p>
      )}
    </div>
  )
}

/* ── Feature: device video with steps that follow the playhead ── */
function Feature({ frame, src, url, steps }: Extract<Block, { type: 'feature' }>) {
  const video = useRef<HTMLVideoElement | null>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  const onTime = (t: number, d: number) => {
    let i = 0
    steps.forEach((s, k) => t >= s.at && (i = k))
    setActive(i)
    const start = steps[i].at
    const end = steps[i + 1]?.at ?? d
    setProgress(end > start ? Math.min(1, (t - start) / (end - start)) : 0)
  }
  const seek = (k: number) => {
    const v = video.current
    if (!v) return
    v.currentTime = steps[k].at + 0.05
    v.play().catch(() => {})
    setActive(k)
  }

  const media = <AutoVideo ref={video} src={src} onTime={onTime} />

  return (
    <motion.div className={`feature feature--${frame} cs-wide`} {...reveal}>
      <div className="feature__device">{frame === 'phone' ? <PhoneFrame>{media}</PhoneFrame> : <BrowserFrame url={url}>{media}</BrowserFrame>}</div>
      <ol className="feature__steps">
        {steps.map((s, k) => (
          <li key={s.title}>
            <button type="button" className={`feature__step ${k === active ? 'is-active' : ''}`} onClick={() => seek(k)}>
              <span className="feature__num label">0{k + 1}</span>
              <span className="feature__text">
                <span className="feature__title">{s.title}</span>
                <span className="feature__body">{s.body}</span>
              </span>
              <span className="feature__bar" aria-hidden>
                <span style={{ transform: `scaleX(${k === active ? progress : k < active ? 1 : 0})` }} />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </motion.div>
  )
}

/* ── Varak cart drawer recreation ── */
const ADDONS: [string, number][] = [
  ['Helium number balloon', 45],
  ['Happy birthday balloon', 35],
  ['Anniversary balloon', 35],
  ['Latex helium balloon', 10],
]

function DrawerDemo() {
  const [note, setNote] = useState('Happy birthday')
  const [draft, setDraft] = useState(note)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [added, setAdded] = useState<Record<number, boolean>>({})
  const [mode, setMode] = useState<'delivery' | 'pickup'>('delivery')
  const [area, setArea] = useState('')
  const [msg, setMsg] = useState('')
  const timer = useRef<number | undefined>(undefined)

  const total = 45 + ADDONS.reduce((t, a, i) => t + (added[i] ? a[1] : 0), 0)
  const count = 1 + Object.values(added).filter(Boolean).length

  const onDraft = (v: string) => {
    setDraft(v)
    setSaving('saving')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setNote(v)
      setSaving('saved')
    }, 600)
  }
  const checkout = () =>
    setMsg(
      mode === 'delivery' && !area.trim()
        ? 'Enter your area to check delivery before checking out.'
        : mode === 'pickup'
          ? 'Pickup selected. Continuing to payment (demo).'
          : 'Area accepted. Continuing to payment (demo).',
    )

  return (
    <motion.div className="drawer-demo cs-wide" {...reveal}>
      <div className="drawer-demo__intro">
        <p className="label">Try the interaction</p>
        <h3 className="drawer-demo__title">Play with the drawer</h3>
        <p className="cs-p">A recreation of the drawer with the live store’s prices. It is not the real store.</p>
        <ul className="drawer-demo__tips">
          <li>Edit the note and watch it save.</li>
          <li>Add a balloon and watch the total.</li>
          <li>Switch to Store Pickup and the address field goes away.</li>
        </ul>
      </div>

      <LiquidGlass className="drawer" interactive={false}>
        <div className="drawer__head">
          <span className="drawer__title">
            Cart <span>({count})</span>
          </span>
          <span className="label">Recreation</span>
        </div>

        <div className="drawer__item">
          <span className="drawer__thumb" aria-hidden />
          <div className="drawer__info">
            <span className="drawer__name">Healthy Soul Seed Brittle</span>
            <span className="label">Small (8 pcs)</span>
            <AnimatePresence mode="wait" initial={false}>
              {editing ? (
                <motion.div key="edit" className="drawer__edit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <textarea value={draft} onChange={(e) => onDraft(e.target.value)} rows={2} aria-label="Note for this item" autoFocus />
                  <span className="drawer__saving label">{saving === 'saving' ? 'Saving…' : saving === 'saved' ? 'Saved' : ''}</span>
                </motion.div>
              ) : (
                <motion.span key="note" className="drawer__note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Note: {note || '—'}
                </motion.span>
              )}
            </AnimatePresence>
            <button
              type="button"
              className="drawer__link"
              onClick={() => {
                if (!editing) setDraft(note)
                else setNote(draft)
                setEditing(!editing)
              }}
            >
              {editing ? 'Done' : 'Edit note'}
            </button>
          </div>
          <span className="drawer__price">45.00 AED</span>
        </div>

        <div className="drawer__upsell">
          <span className="label">You may also like</span>
          <div className="drawer__addons">
            {ADDONS.map(([name, price], i) => (
              <button
                key={name}
                type="button"
                className={`drawer__addon ${added[i] ? 'is-added' : ''}`}
                aria-pressed={!!added[i]}
                onClick={() => setAdded((a) => ({ ...a, [i]: !a[i] }))}
              >
                <span>{name}</span>
                <span className="drawer__addon-price">
                  {price.toFixed(2)} AED · {added[i] ? 'Added' : 'Add'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="drawer__foot">
          <div className="drawer__total">
            <span>Total</span>
            <motion.span key={total} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease }}>
              {total.toFixed(2)} AED
            </motion.span>
          </div>
          <LayoutGroup id="drawer-mode">
            <div className="drawer__seg" role="tablist">
              {(['delivery', 'pickup'] as const).map((m) => (
                <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setMsg('') }}>
                  {mode === m && <motion.span layoutId="drawer-pill" className="drawer__seg-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span>{m === 'delivery' ? 'Delivery' : 'Store Pickup'}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <AnimatePresence initial={false} mode="wait">
            {mode === 'delivery' ? (
              <motion.div key="d" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="drawer__area">
                <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Enter your area" aria-label="Delivery area" />
              </motion.div>
            ) : (
              <motion.p key="p" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="drawer__pickup">
                Pickup from the Varak store. No address needed.
              </motion.p>
            )}
          </AnimatePresence>
          <button type="button" className="btn btn--ink drawer__checkout" onClick={checkout}>
            Check out
          </button>
          <AnimatePresence>
            {msg && (
              <motion.p key={msg} className="drawer__msg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {msg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </LiquidGlass>
    </motion.div>
  )
}

/* ── KPI tiles with count-up ── */
function Kpis({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="kpis cs-wide">
      {items.map((k, i) => (
        <motion.div key={k.label} className="kpi" {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
          <CountUp value={k.value} />
          <span className="label">{k.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

/** Counts up the numeric part of strings like "$387.5K", "5,322", "37.71%". */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/)
  const [text, setText] = useState(m ? value.replace(m[2], '0') : value)

  useEffect(() => {
    if (!inView || !m) return
    const target = parseFloat(m[2].replace(/,/g, ''))
    const decimals = (m[2].split('.')[1] ?? '').length
    const comma = m[2].includes(',')
    const c = animate(0, target, {
      duration: 1.6,
      ease,
      onUpdate: (v) => {
        const n = comma ? Math.round(v).toLocaleString('en-US') : v.toFixed(decimals)
        setText(`${m[1]}${n}${m[3]}`)
      },
      onComplete: () => setText(value),
    })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value])

  return (
    <span ref={ref} className="kpi__value">
      <GradientText text={text} delay={3} />
    </span>
  )
}

/* ── Before / after videos ── */
function Compare({ before, after, url }: Extract<Block, { type: 'compare' }>) {
  const [side, setSide] = useState<'before' | 'after'>('after')
  const cur = side === 'before' ? before : after
  return (
    <motion.div className="compare cs-wide" {...reveal}>
      <LayoutGroup id="compare">
        <LiquidGlass className="segmented compare__toggle" interactive={false} role="tablist">
          {(['before', 'after'] as const).map((s) => (
            <button key={s} type="button" role="tab" aria-selected={side === s} className={`segmented__btn ${side === s ? 'is-active' : ''}`} onClick={() => setSide(s)}>
              {side === s && <motion.span layoutId="compare-pill" className="segmented__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="segmented__text">{s === 'before' ? 'Before' : 'After'}</span>
            </button>
          ))}
        </LiquidGlass>
      </LayoutGroup>
      <BrowserFrame url={url}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={side} className="compare__video" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
            <AutoVideo src={cur.src} />
          </motion.div>
        </AnimatePresence>
      </BrowserFrame>
      <AnimatePresence mode="wait">
        <motion.p key={side} className="compare__caption" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <span className={`compare__tag compare__tag--${side}`}>{side === 'before' ? 'Before' : 'After'}</span>
          {cur.caption}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Page-by-page tabs ── */
function Tabs({ tabs }: { tabs: { label: string; before: string[]; after: string[] }[] }) {
  const [i, setI] = useState(0)
  const t = tabs[i]
  return (
    <motion.div className="tabs cs-wide" {...reveal}>
      <LayoutGroup id="tabs">
        <div className="tabs__list" role="tablist">
          {tabs.map((x, k) => (
            <button key={x.label} type="button" role="tab" aria-selected={k === i} className={`tabs__btn ${k === i ? 'is-active' : ''}`} onClick={() => setI(k)}>
              {k === i && <motion.span layoutId="tab-line" className="tabs__line" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
              {x.label}
            </button>
          ))}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div key={t.label} className="tabs__panel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }}>
          <div className="tabs__col tabs__col--before">
            <span className="compare__tag compare__tag--before">Before</span>
            <ul>
              {t.before.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <LiquidGlass className="tabs__col tabs__col--after" interactive={false}>
            <span className="compare__tag compare__tag--after">After</span>
            <ul>
              {t.after.map((b, k) => (
                <motion.li key={b} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + k * 0.05, duration: 0.5, ease }}>
                  {b}
                </motion.li>
              ))}
            </ul>
          </LiquidGlass>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Theliv: without / with flow ── */
function Flow(props: Extract<Block, { type: 'flow' }>) {
  const [withIt, setWithIt] = useState(false)
  const nodes: FlowNode[] = withIt ? props.with : props.without
  return (
    <motion.div className="flowx cs-wide" {...reveal}>
      <LayoutGroup id="flow">
        <LiquidGlass className="segmented" interactive={false} role="tablist">
          {[false, true].map((w) => (
            <button key={String(w)} type="button" role="tab" aria-selected={withIt === w} className={`segmented__btn ${withIt === w ? 'is-active' : ''}`} onClick={() => setWithIt(w)}>
              {withIt === w && <motion.span layoutId="flow-pill" className="segmented__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="segmented__text">{w ? 'With Theliv' : 'Without Theliv'}</span>
            </button>
          ))}
        </LiquidGlass>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div key={String(withIt)} className="flowx__track" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
          {nodes.map((n, k) => (
            <motion.span
              key={k}
              className={`flowx__node ${n.kind ? `is-${n.kind}` : ''}`}
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: k * 0.06, duration: 0.5, ease }}
            >
              {n.t}
              {k < nodes.length - 1 && <span className="flowx__arrow" aria-hidden>→</span>}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p key={String(withIt)} className="flowx__result" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: nodes.length * 0.06 } }} exit={{ opacity: 0 }}>
          <strong>Result:</strong> {withIt ? props.withResult : props.withoutResult}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="cs-stats cs-wide">
      {items.map((s, i) => (
        <motion.div key={s.label} className="cs-stat" {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
          <CountUp value={s.value} />
          <span>{s.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
