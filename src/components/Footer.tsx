import { ArrowUp } from 'lucide-react'
import { brand } from '../lib/brand'

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-ink/90 py-4 sm:py-5">
      <div className="section-pad mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/30 bg-ink/80 font-jp text-[0.7rem] leading-none text-gold">
            {brand.seal}
          </span>
          <p className="font-jp text-xs tracking-wide text-cream">
            {brand.jp} <span className="font-sans text-[0.65rem] tracking-[0.18em] text-stone uppercase">· {brand.en}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[0.7rem] text-stone sm:justify-end">
          <span>© {year} {brand.en} · Concept Project</span>
          <span className="hidden h-3 w-px bg-white/10 sm:inline" aria-hidden />
          <span>
            Designed & Built by{' '}
            <a
              href="https://portfolio-nam3isrobin.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-cream underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
            >
              Robin
            </a>
          </span>
          <span className="h-3 w-px bg-white/10" aria-hidden />
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-gold"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}


