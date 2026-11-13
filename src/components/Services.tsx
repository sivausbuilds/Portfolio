import { motion } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import { services, work } from '../content'
import { navigate } from '../lib/router'
import { Arrow } from './Header'
import { Rich } from './Rich'

const ease = [0.22, 1, 0.36, 1] as const

export function Services() {
  return (
    <section id="services" className="svc">
      <div className="container">
        <div className="svc__head">
          <motion.p className="label" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, ease }}>
            (03) — What I do
          </motion.p>
          <h2 className="svc__title">
            <span className="line">
              <motion.span className="line__inner" initial={{ y: '105%' }} whileInView={{ y: '0%' }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 1.2, ease }}>
                <Rich text={services.title} fancy />
              </motion.span>
            </span>
          </h2>
          <motion.p className="svc__intro" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 1, ease, delay: 0.15 }}>
            {services.intro}
          </motion.p>
        </div>

        <ul className="svc__grid">
          {services.items.map((s, i) => (
            <Card key={s.title} s={s} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Card({ s, i }: { s: (typeof services.items)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const proof = s.proof.map((slug) => work.find((w) => w.slug === slug)).filter(Boolean) as typeof work

  return (
    <motion.li
      ref={ref}
      className="svc-card"
      onPointerMove={onMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, ease, delay: (i % 3) * 0.1 }}
    >
      <span className="svc-card__spot" aria-hidden />
      <span className="svc-card__num" aria-hidden>
        {String(i + 1).padStart(2, '0')}
      </span>

      <span className="svc-icon" aria-hidden>
        <i className="svc-icon__c svc-icon__c--tl" />
        <i className="svc-icon__c svc-icon__c--tr" />
        <i className="svc-icon__c svc-icon__c--bl" />
        <i className="svc-icon__c svc-icon__c--br" />
        <Icon kind={s.icon} />
      </span>

      <h3 className="svc-card__title">
        <Rich text={s.title} fancy />
      </h3>
      <p className="svc-card__body">{s.body}</p>

      {proof.length > 0 && (
        <div className="svc-card__proof">
          <span className="label">Seen in</span>
          <span className="svc-card__links">
            {proof.map((w) => (
              <a
                key={w.slug}
                href={`/work/${w.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/work/${w.slug}`)
                }}
              >
                {w.name}
                <Arrow />
              </a>
            ))}
          </span>
        </div>
      )}
    </motion.li>
  )
}

/** Line icons drawn with one stroke weight; they redraw on hover. */
function Icon({ kind }: { kind: (typeof services.items)[number]['icon'] }) {
  const paths: Record<string, string[]> = {
    interface: ['M4 5.5h16v13H4z', 'M4 9h16', 'M7 7.2h.01M9.5 7.2h.01', 'M8 12.5h5M8 15h3', 'M15 12h2.5v3.5H15z'],
    compass: ['M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z', 'M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8z'],
    system: ['M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6z', 'M16.5 13l3.5 3.5-3.5 3.5-3.5-3.5z'],
    code: ['M8.5 7.5L4 12l4.5 4.5', 'M15.5 7.5L20 12l-4.5 4.5', 'M13.5 5l-3 14'],
    research: ['M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z', 'M15.3 15.3L20 20', 'M8 10.5h5'],
    spark: ['M12 3.5l1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8 5-1.8z', 'M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z'],
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {paths[kind].map((d, k) => (
        <path key={k} d={d} pathLength={1} style={{ ['--d' as string]: `${k * 0.12}s` }} />
      ))}
    </svg>
  )
}
