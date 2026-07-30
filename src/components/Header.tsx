import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import type Lenis from 'lenis'
import { scrollToId } from '../hooks/useLenis'
import { brand } from '../lib/brand'

const NAV = [
  { id: 'craft', label: 'Craft' },
  { id: 'sequence', label: 'The Pour' },
  { id: 'menu', label: 'Menu' },
  { id: 'visit', label: 'Visit' },
]

type HeaderProps = {
  lenis: Lenis | null
}

export function Header({ lenis }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(lenis, id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        className={[
          'header-glass mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:gap-6 sm:px-5 sm:py-2.5',
          scrolled || open ? 'header-glass-scrolled max-w-4xl' : '',
        ].join(' ')}
      >
        <button
          type="button"
          onClick={() => go('top')}
          className="group relative z-[1] flex min-w-0 cursor-pointer items-center gap-2.5 text-left sm:gap-3"
          aria-label={`${brand.en} home`}
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-gold/30 transition-colors duration-300 group-hover:border-gold/55"
            />
            <span
              aria-hidden
              className="absolute inset-[3px] rounded-full border border-white/[0.06] bg-ink/50"
            />
            <span className="relative font-jp text-[0.95rem] leading-none text-gold transition-transform duration-300 group-hover:scale-105">
              {brand.seal}
            </span>
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-jp text-[0.9rem] font-medium tracking-[0.06em] text-cream sm:text-[1.05rem]">
              {brand.jp}
            </span>
            <span className="mt-1 block truncate text-[0.55rem] font-medium tracking-[0.22em] text-stone uppercase sm:tracking-[0.28em]">
              {brand.en}
            </span>
          </span>
        </button>

        <nav
          className="relative z-[1] hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="nav-link cursor-pointer px-3.5 py-2.5"
            >
              {item.label}
            </button>
          ))}
          <span
            aria-hidden
            className="mx-2 h-3 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
          />
          <button
            type="button"
            onClick={() => go('reserve')}
            className="cta-premium cursor-pointer rounded-full px-5 py-2.5"
          >
            Reserve
          </button>
        </nav>

        <button
          type="button"
          className="relative z-[1] inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cream transition-colors hover:border-gold/30 hover:text-gold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-ink/75 backdrop-blur-xl lg:hidden"
              aria-hidden
            />
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="header-glass header-glass-scrolled relative z-40 mx-auto mt-2 flex max-w-5xl flex-col gap-0.5 overflow-hidden rounded-3xl p-2 lg:hidden"
              aria-label="Mobile"
            >
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.25 }}
                  onClick={() => go(item.id)}
                  className="cursor-pointer rounded-2xl px-4 py-3.5 text-left text-[0.72rem] font-medium tracking-[0.18em] text-cream-muted uppercase transition-colors hover:bg-white/[0.04] hover:text-cream"
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="px-2 pb-2 pt-1">
                <button
                  type="button"
                  onClick={() => go('reserve')}
                  className="cta-premium w-full cursor-pointer rounded-full py-3"
                >
                  Reserve a seat
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
