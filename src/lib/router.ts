import { useSyncExternalStore } from 'react'

const listeners = new Set<() => void>()
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  window.addEventListener('popstate', fn)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('popstate', fn)
  }
}

export const usePath = () => useSyncExternalStore(subscribe, () => window.location.pathname)

/** hash to scroll to once the home page has mounted after a route change */
let pendingHash: string | null = null
export const takePendingHash = () => {
  const h = pendingHash
  pendingHash = null
  return h
}

export function navigate(path: string, hash?: string) {
  pendingHash = hash ?? null
  if (path !== window.location.pathname) {
    window.history.pushState({}, '', path)
    listeners.forEach((l) => l())
  }
}
