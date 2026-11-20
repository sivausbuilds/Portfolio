import { site } from '../content'

export const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9.75h4v11H3zm7 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.6h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.26-1.96 2.6v5.06H10z" />
  </svg>
)
export const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M4 7.5l8 5.5 8-5.5" />
  </svg>
)

/** Round LinkedIn + email buttons. */
export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <span className={`social ${className}`}>
      <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
        <LinkedInIcon />
      </a>
      <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} title={site.email}>
        <MailIcon />
      </a>
    </span>
  )
}
