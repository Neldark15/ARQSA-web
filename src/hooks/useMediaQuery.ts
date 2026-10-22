import { useSyncExternalStore } from 'react'

// useSyncExternalStore en vez de useState + useEffect: sin render en cascada y con valor estable
// en el prerender (getServerSnapshot = false), igual que el estado inicial que tenía antes.
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
