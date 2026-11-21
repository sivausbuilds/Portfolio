import { useState, type ReactNode } from 'react'

/**
 * Opens a password-protected Shopify page in a new tab, already unlocked.
 * Shopify always redirects to the home page after its password form, so this works in two steps:
 *   1. on click, open a named tab and post the store's own password form into it (sets the unlock cookie);
 *   2. once that has loaded, send the same tab on to the exact page.
 * The password is also copied, and shown next to the button, as a fallback.
 */
export function Unlock({
  url,
  password,
  className = '',
  children,
  label,
}: {
  url: string
  password?: string
  className?: string
  children: ReactNode
  label?: string
}) {
  const u = new URL(url)
  if (!password) {
    return (
      <a className={className} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {children}
      </a>
    )
  }
  return (
    <form
      className="unlock"
      method="post"
      action={`${u.origin}/password`}
      onSubmit={(e) => {
        const name = `preview-${Date.now()}`
        e.currentTarget.target = name
        const tab = window.open('about:blank', name)
        navigator.clipboard?.writeText(password).catch(() => {})
        if (tab) {
          window.setTimeout(() => {
            try {
              tab.location.href = url
            } catch {
              /* tab closed */
            }
          }, 2200)
        } else {
          // pop-ups blocked: unlock in this tab instead; the visitor lands on the store home
          e.currentTarget.target = '_self'
        }
      }}
    >
      <input type="hidden" name="form_type" value="storefront_password" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="password" value={password} />
      <button type="submit" className={className} aria-label={label}>
        {children}
      </button>
    </form>
  )
}

/** Visible password with one-click copy. */
export function PasswordChip({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="sx-pw pw-chip"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* visible anyway */
        }
      }}
      aria-label={`Copy password ${value}`}
    >
      <span className="sx-pw__label">Password</span>
      <code>{value}</code>
      <span className="sx-pw__copy">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
