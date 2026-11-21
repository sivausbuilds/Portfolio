import type { ReactNode } from 'react'

/**
 * Opens a password-protected Shopify page in a new tab with the storefront password already submitted.
 * It posts the store's own password form (POST /password); `return_to` asks Shopify to land on `path`.
 * The password is also copied, so a visitor can paste it if the store still shows its password page.
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
    <form className="unlock" method="post" action={`${u.origin}/password`} target="_blank">
      <input type="hidden" name="form_type" value="storefront_password" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="password" value={password} />
      <input type="hidden" name="return_to" value={u.pathname + u.search} />
      <button type="submit" className={className} aria-label={label} onClick={() => navigator.clipboard?.writeText(password).catch(() => {})}>
        {children}
      </button>
    </form>
  )
}
