import { Fragment } from 'react'
import { GradientText } from './GradientText'

/**
 * Renders inline markup in a plain string:
 *   ==text==  key phrase → italic gradient with a soft underline
 *   **text**  bold
 *   *text*    italic (with `fancy`, italic becomes gradient + shimmer — used for titles)
 */
export function Rich({ text, fancy = false }: { text: string; fancy?: boolean }) {
  const parts = text.split(/(==.+?==|\*\*.+?\*\*|\*.+?\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('==')) return <span key={i} className="hl">{p.slice(2, -2)}</span>
        if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('*') && p.length > 2)
          return fancy ? (
            <em key={i} className="em-fancy">
              <GradientText text={p.slice(1, -1)} delay={3.5} />
            </em>
          ) : (
            <em key={i}>{p.slice(1, -1)}</em>
          )
        return <Fragment key={i}>{p}</Fragment>
      })}
    </>
  )
}

export const plain = (text: string) => text.replace(/==|\*\*|\*/g, '')
