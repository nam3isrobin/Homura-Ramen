import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type Lenis from 'lenis'
import { scrollToId } from '../hooks/useLenis'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { brand } from '../lib/brand'

type HeroProps = {
  lenis: Lenis | null
}

export function Hero({ lenis }: HeroProps) {
  const reduced = useReducedMotion()

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgb(232 93 4 / 0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 60%, rgb(212 160 23 / 0.08), transparent 50%), linear-gradient(180deg, #0c0a09 0%, #161311 55%, #0c0a09 100%)',
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-5%] top-24 select-none font-jp text-[clamp(8rem,22vw,16rem)] font-bold leading-none text-white/[0.03] sm:right-[4%] sm:top-28"
        initial={reduced ? false : { y: 40, opacity: 0 }}
        animate={reduced ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        data-parallax
        data-speed="0.18"
      >
        炎
      </motion.div>

      <div className="section-pad relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          className="eyebrow mb-5"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {brand.city} · Tonkotsu · Open kitchen
        </motion.p>

        <motion.h1
          className="max-w-4xl font-display text-[clamp(2.75rem,8vw,5.75rem)] font-medium leading-[0.95] tracking-tight text-cream"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-jp text-[clamp(1.6rem,4.5vw,2.75rem)] font-medium tracking-wide text-gold">
            {brand.sloganJp}
          </span>
          <span className="mt-2 block">{brand.sloganEn.replace(/\.$/, '')}</span>
          <span className="gold-text mt-1 block italic">
            {brand.taglineEn}
          </span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-xl text-base leading-relaxed text-cream-muted sm:text-lg"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
        >
          <span className="font-jp text-gold">{brand.jp}</span>
          {' — '}
          {brand.en}. Eighteen-hour tonkotsu, hand-cut noodles, and a charcoal
          finish at the counter. {brand.craftJp} — {brand.craftEn}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          <button
            type="button"
            onClick={() => scrollToId(lenis, 'reserve')}
            className="cursor-pointer rounded-full bg-cream px-6 py-3.5 text-sm font-semibold tracking-wide text-ink transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Reserve a seat
          </button>
          <button
            type="button"
            onClick={() => scrollToId(lenis, 'menu')}
            className="glass cursor-pointer rounded-full px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-white/10"
          >
            View menu
          </button>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center gap-3 text-stone"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-stone/60" />
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
        </motion.div>
      </div>
    </section>
  )
}
