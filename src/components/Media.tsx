import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react'

type VideoProps = {
  src: string
  className?: string
  /** play only while on screen (default) */
  autoPlay?: boolean
  onTime?: (t: number, duration: number) => void
}

/** Muted, looping, inline video that plays while visible and pauses off screen. */
export const AutoVideo = forwardRef<HTMLVideoElement | null, VideoProps>(function AutoVideo(
  { src, className, autoPlay = true, onTime },
  outer,
) {
  const ref = useRef<HTMLVideoElement>(null)
  useImperativeHandle<HTMLVideoElement | null, HTMLVideoElement | null>(outer, () => ref.current)

  useEffect(() => {
    const v = ref.current
    if (!v || !autoPlay) return
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.3 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [autoPlay, src])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onTimeUpdate={onTime ? (e) => onTime(e.currentTarget.currentTime, e.currentTarget.duration) : undefined}
    />
  )
})

export function BrowserFrame({ url, children, className = '' }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`frame-browser ${className}`}>
      <div className="frame-browser__bar" aria-hidden>
        <span className="frame-browser__dots">
          <i />
          <i />
          <i />
        </span>
        {url && <span className="frame-browser__url">{url}</span>}
        <span />
      </div>
      <div className="frame-browser__screen">{children}</div>
    </div>
  )
}

export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`frame-phone ${className}`}>
      <span className="frame-phone__island" aria-hidden />
      <div className="frame-phone__screen">{children}</div>
    </div>
  )
}
