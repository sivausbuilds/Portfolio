import type { CaseStudy } from '../content'
import { LiquidGlass } from './LiquidGlass'

/** Generated placeholder cover: an abstract UI floating on a soft field, tinted per project. */
export function Cover({ item, large = false }: { item: CaseStudy; large?: boolean }) {
  const [, accent] = item.tone
  const shop = item.category === 'E-commerce'
  return (
    <div className={`cover ${large ? 'cover--lg' : ''}`} style={{ ['--accent' as string]: accent }}>
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
