import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Lightweight multi-layer parallax on [data-parallax][data-speed].
 * Only uses transform (GPU). Safe alongside Lenis (reads window.scrollY).
 * Do not apply to the ramen canvas sequence.
 */
export function useParallax() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const nodes = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('[data-parallax]'),
      )

    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      for (const el of nodes()) {
        const speed = Number(el.dataset.speed || '0.12')
        const offset = y * speed * -0.12
        el.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])
}
