import ShinyText from './ShinyText'

/**
 * Deep-green moving gradient text, optionally with a ReactBits ShinyText highlight
 * passing over it. Styles: `.gtext` in global.css.
 */
export function GradientText({
  text,
  shimmer = true,
  delay = 4,
  className = '',
}: {
  text: string
  shimmer?: boolean
  delay?: number
  className?: string
}) {
  return (
    <span className={`gtext ${className}`}>
      <span className="gtext__fill">{text}</span>
      {shimmer && (
        <ShinyText
          className="gtext__shine"
          text={text}
          color="rgba(255, 255, 255, 0)"
          shineColor="rgba(226, 243, 233, 0.95)"
          speed={2.8}
          delay={delay}
          shineWidth={26}
          softness={0.95}
          angle={112}
        />
      )}
    </span>
  )
}
