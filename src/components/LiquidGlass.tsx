import { useRef, type CSSProperties, type ElementType, type ReactNode, type PointerEvent } from 'react'

/** Global SVG filter used for the refraction layer (Chromium / Firefox). Render once. */
export function GlassFilter() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="lg-distort" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.009 0.012" numOctaves="2" seed="11" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="48" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

type Props = {
  as?: ElementType
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** follow the pointer with a specular highlight */
  interactive?: boolean
  /** lens distortion on the backdrop; off for small or nested surfaces */
  refract?: boolean
} & Record<string, unknown>

/**
 * Layered "liquid glass" surface:
 *  refract → frosted, distorted backdrop
 *  tint    → milky body
 *  shine   → rim light, inner bevel and a pointer-driven specular
 */
export function LiquidGlass({ as: Tag = 'div', className = '', style, children, interactive = true, refract = true, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!interactive || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    ref.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <Tag ref={ref} className={`glass ${refract ? '' : 'glass--flat'} ${className}`} style={style} onPointerMove={onMove} {...rest}>
      <span className="glass__refract" aria-hidden />
      <span className="glass__tint" aria-hidden />
      <span className="glass__shine" aria-hidden />
      <span className="glass__content">{children}</span>
    </Tag>
  )
}
