import { Fragment } from 'react'

/** Renders ==highlight==, **bold** and *italic* inside a plain string. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(==.+?==|\*\*.+?\*\*|\*.+?\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('==')) return <mark key={i}>{p.slice(2, -2)}</mark>
        if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
        return <Fragment key={i}>{p}</Fragment>
      })}
    </>
  )
}

export const plain = (text: string) => text.replace(/==|\*\*|\*/g, '')
