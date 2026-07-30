import { Flame, Clock, Wheat } from 'lucide-react'
import { Reveal } from './Reveal'
import { brand } from '../lib/brand'

const PILLARS = [
  {
    icon: Clock,
    jp: '出汁',
    title: '18-hour tonkotsu',
    body: 'Pork bones roll from dawn until the broth turns opaque and silk-rich — the foundation of every bowl we serve.',
  },
  {
    icon: Wheat,
    jp: '麺',
    title: 'Noodles cut to order',
    body: 'Alkaline dough rested twice, then cut for spring and a clean broth cling. Firm, medium, or soft — tell the chef.',
  },
  {
    icon: Flame,
    jp: '炎',
    title: 'Charcoal finish',
    body: 'A flash of open flame lifts aroma at the pass. Watch the pour from the counter — that heat is part of the taste.',
  },
]

export function Story() {
  return (
    <section id="craft" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(80%,40rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">Our craft</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-cream sm:text-5xl">
            <span className="font-jp text-2xl text-gold sm:text-3xl">
              {brand.craftJp}
            </span>
            <span className="mt-2 block">Quiet craft. Loud flavor.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-muted sm:text-lg">
            At {brand.jp}, ramen is built like a ceremony — broth, noodles,
            tare, and aroma assembled in seconds after hours of preparation.
            Every bowl balances salt, fat, acid, and heat.
          </p>
          <p className="mt-4 font-jp text-sm tracking-wide text-gold/90">
            {brand.taglineJp}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PILLARS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="glass group h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink/40 text-fire">
                    <item.icon size={20} strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="font-jp text-xl text-white/15 transition-colors group-hover:text-gold/40">
                    {item.jp}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-muted">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
