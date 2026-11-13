import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { site } from '../content'
import { prefersReducedMotion } from '../lib/smooth'

/** Scroll-scrubbed word reveal — demonstrates the on-scroll language for the sections to come. */
export function Statement() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.word',
        { opacity: 0.12, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: { trigger: '.statement__text', start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        },
      )
      gsap.from('.statement__label', {
        opacity: 0, y: 20, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className="statement">
      <div className="container statement__grid">
        <p className="label statement__label">(01) — Philosophy</p>
        <p className="statement__text">
          {site.statement.split(' ').map((w, i) => (
            <span className="word" key={i}>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
      <div id="work" className="container next">
        <span className="rule rule--static" />
        <p className="label">(02) — Selected work · next section</p>
      </div>
    </section>
  )
}
