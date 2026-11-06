import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

let lenisInstance: Lenis | null = null
export const getLenis = () => lenisInstance

/** Smooth, inertial scrolling. Skipped entirely for reduced-motion users. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } })
    lenisInstance = lenis
    if (import.meta.env.DEV) (window as unknown as { lenis?: Lenis }).lenis = lenis
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}

/** Locks page scroll (used by overlays). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const lenis = getLenis()
    lenis?.stop()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = prev
    }
  }, [locked])
}
