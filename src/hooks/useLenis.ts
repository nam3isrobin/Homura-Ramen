import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from './useReducedMotion'

export function useLenis() {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.15,
      wheelMultiplier: 1,
      autoRaf: false,
    })

    setLenis(instance)

    let rafId = 0
    const raf = (time: number) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return lenis
}

export function scrollToId(
  lenis: Lenis | null,
  id: string,
  offset = -80,
) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
