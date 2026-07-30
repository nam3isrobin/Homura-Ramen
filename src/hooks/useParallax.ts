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
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || 'ontouchstart' in window)

    if (reduced || isMobile) return

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    ).map((el) => ({
      el,
      speed: Number(el.dataset.speed || '0.12'),
    }))

    if (elements.length === 0) return

    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      for (let i = 0; i < elements.length; i++) {
        const item = elements[i]
        const offset = y * item.speed * -0.12
        item.el.style.transform = `translate3d(0, ${offset}px, 0)`
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
