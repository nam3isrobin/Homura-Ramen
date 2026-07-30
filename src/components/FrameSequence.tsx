import { useCallback, useEffect, useRef, useState } from 'react'
import { drawCover, FRAME_COUNT, frameSrc } from '../lib/frames'
import { brand } from '../lib/brand'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Caption = {
  at: number
  jp: string
  en: string
}

const CAPTIONS: Caption[] = [
  { at: 0.05, jp: '蒸気', en: 'Steam rises' },
  { at: 0.28, jp: '注ぎ', en: 'The pour' },
  { at: 0.55, jp: '炎', en: 'Open flame' },
  { at: 0.8, jp: '完成', en: 'Served hot' },
]

function findNearestLoadedImage(
  images: (HTMLImageElement | null)[],
  targetIndex: number,
): HTMLImageElement | null {
  const current = images[targetIndex]
  if (current?.complete && current.naturalWidth) return current

  for (let delta = 1; delta < images.length; delta++) {
    const prev = images[targetIndex - delta]
    if (prev?.complete && prev.naturalWidth) return prev

    const next = images[targetIndex + delta]
    if (next?.complete && next.naturalWidth) return next
  }

  return null
}

type FrameSequenceProps = {
  preloadedImages?: (HTMLImageElement | null)[]
}

/**
 * Native scroll-scrubbed image sequence.
 * 100% native scroll scrubbing with direct HTML Canvas rendering — no Lenis or Motion dependencies.
 */
export function FrameSequence({ preloadedImages }: FrameSequenceProps) {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: FRAME_COUNT }, () => null),
  )

  const frameRef = useRef(0)
  const pendingDraw = useRef(false)
  const [progress, setProgress] = useState(0)

  // Sync preloadedImages into stable imagesRef
  useEffect(() => {
    if (preloadedImages && preloadedImages.length > 0) {
      imagesRef.current = preloadedImages
      scheduleDraw(frameRef.current)
    }
  }, [preloadedImages])

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const img = findNearestLoadedImage(imagesRef.current, index)
    if (!img) return

    const isMobile = window.innerWidth < 768
    const maxDpr = isMobile ? 1.25 : 2
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)

    const w = canvas.clientWidth
    const h = canvas.clientHeight
    const tw = Math.round(w * dpr)
    const th = Math.round(h * dpr)
    if (canvas.width !== tw || canvas.height !== th) {
      canvas.width = tw
      canvas.height = th
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = '#0c0a09'
    ctx.fillRect(0, 0, w, h)
    drawCover(ctx, img, w, h, img.naturalWidth, img.naturalHeight)
  }, [])

  const scheduleDraw = useCallback(
    (index: number) => {
      frameRef.current = index
      if (pendingDraw.current) return
      pendingDraw.current = true
      requestAnimationFrame(() => {
        pendingDraw.current = false
        drawFrame(frameRef.current)
      })
    },
    [drawFrame],
  )

  // Fallback loader if preloadedImages prop is not supplied
  useEffect(() => {
    if (preloadedImages) {
      scheduleDraw(0)
      return
    }

    let cancelled = false
    let loaded = 0

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.src = frameSrc(i)
        img.onload = () => {
          if (!cancelled) {
            imagesRef.current[i] = img
            loaded++
            if (i === 0 || loaded === 12) {
              scheduleDraw(0)
            }
          }
          resolve()
        }
        img.onerror = () => resolve()
      })

    ;(async () => {
      const priority = 24
      for (let i = 0; i < priority && !cancelled; i++) {
        await loadOne(i)
      }
      const batch = 12
      for (let i = priority; i < FRAME_COUNT && !cancelled; i += batch) {
        const slice = Array.from(
          { length: Math.min(batch, FRAME_COUNT - i) },
          (_, k) => loadOne(i + k),
        )
        await Promise.all(slice)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [preloadedImages, scheduleDraw])

  // Pure native scroll scrubbing
  useEffect(() => {
    let ticking = false

    const updateScroll = () => {
      ticking = false
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      if (total <= 0) return
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const p = scrolled / total

      if (reduced) {
        scheduleDraw(Math.floor(FRAME_COUNT * 0.75))
        return
      }

      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(p * (FRAME_COUNT - 1))),
      )

      scheduleDraw(idx)
      setProgress(p)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateScroll)
    }

    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [reduced, scheduleDraw])

  const activeCaption =
    [...CAPTIONS].reverse().find((c) => progress >= c.at) ?? CAPTIONS[0]

  const frameNum = Math.round(progress * (FRAME_COUNT - 1)) + 1
  const pct = Math.round(progress * 100)

  return (
    <section
      id="sequence"
      ref={sectionRef}
      className="relative"
      style={{ height: reduced ? '100dvh' : '320vh' }}
      aria-label="Scroll to watch the broth pour"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />

        {/* Lighter vignette on mobile — keep bowl center clear */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgb(12 10 9 / 0.55) 0%, transparent 22%, transparent 62%, rgb(12 10 9 / 0.72) 100%), linear-gradient(90deg, rgb(12 10 9 / 0.45) 0%, transparent 28%, transparent 72%, rgb(12 10 9 / 0.25) 100%)',
          }}
        />


        {/* Top title — compact on mobile so pour stays dominant */}
        <div className="section-pad pointer-events-none absolute inset-x-0 top-0 z-10 pt-[max(5.5rem,env(safe-area-inset-top)+4.5rem)] sm:pt-28">
          <p className="eyebrow text-[0.6rem] sm:text-[0.7rem]">
            {brand.craftJp} · Live pour
          </p>
          <h2 className="mt-1.5 max-w-md font-display text-xl leading-tight text-cream sm:mt-3 sm:text-4xl md:text-5xl">
            <span className="hidden sm:inline">
              Scroll to taste
              <span className="block italic text-gold-soft">with your eyes.</span>
            </span>
            <span className="sm:hidden">
              Scroll ·{' '}
              <span className="italic text-gold-soft">watch the pour</span>
            </span>
          </h2>
        </div>

        {/*
          Caption HUD
          - Mobile: slim bottom strip, does not cover bowl center
          - Desktop: glass card lower-left, offset from center
        */}
        <div
          className="section-pad absolute inset-x-0 bottom-0 z-10 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-8 sm:pb-0 md:bottom-12"
          style={{
            transform: reduced
              ? undefined
              : `translate3d(0, ${(progress - 0.5) * 12}px, 0)`,
          }}
        >
          {/* Mobile strip */}
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/10 bg-ink/55 px-3.5 py-2.5 backdrop-blur-md sm:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-jp text-lg leading-none text-gold">
                  {activeCaption.jp}
                  <span className="ml-2 font-display text-base text-cream italic">
                    {activeCaption.en}
                  </span>
                </p>
              </div>
              <p className="shrink-0 text-[0.6rem] tracking-wider text-stone tabular-nums uppercase">
                {frameNum}/{FRAME_COUNT}
              </p>
            </div>
            <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-fire via-fire-soft to-gold"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Desktop / tablet card — sits left, never full-center on large screens */}
          <div className="glass hidden max-w-[17rem] rounded-2xl p-5 sm:block md:max-w-sm md:p-6">
            <p className="font-jp text-2xl text-gold md:text-3xl">
              {activeCaption.jp}
            </p>
            <p className="mt-1 font-display text-xl text-cream italic md:text-2xl">
              {activeCaption.en}
            </p>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-fire via-fire-soft to-gold"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-[0.65rem] tracking-[0.2em] text-stone uppercase">
              Frame {frameNum} / {FRAME_COUNT}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
