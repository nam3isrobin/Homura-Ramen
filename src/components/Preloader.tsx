import { useEffect, useState } from 'react'
import { brand } from '../lib/brand'
import { FRAME_COUNT, frameSrc } from '../lib/frames'

type PreloaderProps = {
  onComplete: (images: (HTMLImageElement | null)[]) => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [loadPct, setLoadPct] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let cancelled = false
    const images: (HTMLImageElement | null)[] = Array.from(
      { length: FRAME_COUNT },
      () => null,
    )
    let loaded = 0

    const updateProgress = () => {
      if (cancelled) return
      loaded++
      setLoadedCount(loaded)
      const pct = Math.round((loaded / FRAME_COUNT) * 100)
      setLoadPct(pct)

      if (loaded === FRAME_COUNT) {
        onComplete(images)
        setFading(true)
        setTimeout(() => setHidden(true), 600)
      }
    }

    // Preload all 240 frames efficiently in parallel batches
    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.src = frameSrc(i)
        img.onload = () => {
          if (!cancelled) {
            images[i] = img
            updateProgress()
          }
          resolve()
        }
        img.onerror = () => {
          if (!cancelled) updateProgress()
          resolve()
        }
      })

    ;(async () => {
      // First priority batch of 24 frames
      const priorityBatch = 24
      const firstSlice = Array.from({ length: priorityBatch }, (_, k) => loadOne(k))
      await Promise.all(firstSlice)

      // Remaining frames in concurrent batches of 16
      const batchSize = 16
      for (let i = priorityBatch; i < FRAME_COUNT && !cancelled; i += batchSize) {
        const slice = Array.from(
          { length: Math.min(batchSize, FRAME_COUNT - i) },
          (_, k) => loadOne(i + k),
        )
        await Promise.all(slice)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [onComplete])

  if (hidden) return null

  return (
    <div
      className={[
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink p-6 transition-opacity duration-500',
        fading ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
      aria-busy={!fading}
      aria-label="Preloading website"
    >
      <div className="relative flex flex-col items-center text-center">
        {/* Glowing Japanese Seal */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-gold/40 bg-gold/10 blur-sm" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ink-elevated font-jp text-2xl text-gold shadow-lg shadow-gold/10">
            {brand.seal}
          </div>
        </div>

        <h1 className="mt-5 font-jp text-2xl font-medium tracking-wide text-cream sm:text-3xl">
          {brand.jp}
        </h1>
        <p className="mt-1 text-xs tracking-[0.25em] text-stone uppercase">
          {brand.en} · {brand.city}
        </p>

        <p className="mt-4 font-display text-base italic text-cream-muted">
          {brand.sloganJp} — {brand.sloganEn}
        </p>

        {/* Progress Bar */}
        <div className="mt-8 h-1.5 w-64 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:w-80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fire via-fire-soft to-gold transition-[width] duration-150 ease-out"
            style={{ width: `${loadPct}%` }}
          />
        </div>

        {/* Status indicator */}
        <div className="mt-4 flex items-center justify-between w-64 sm:w-80 text-[0.7rem] text-stone">
          <span className="tracking-wider uppercase">Loading frames</span>
          <span className="font-mono text-gold-soft tabular-nums">{loadPct}% ({loadedCount}/{FRAME_COUNT})</span>
        </div>
      </div>
    </div>
  )
}
