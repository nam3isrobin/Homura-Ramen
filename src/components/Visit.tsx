import { MapPin, Clock, Phone, Train, ExternalLink } from 'lucide-react'
import { Reveal } from './Reveal'
import { brand } from '../lib/brand'

export function Visit() {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(brand.address)}`

  return (
    <section id="visit" className="relative py-24 sm:py-32">
      <div className="section-pad mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Visit · ご来店</p>
            <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
              <span className="font-jp text-2xl text-gold sm:text-3xl">
                夜、うまいラーメン
              </span>
              <span className="mt-2 block">Find us in Shibuya.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream-muted">
              Walk-ins welcome. Counter seats face the open kitchen — watch
              the pour, then eat while it is still steaming. Parties of 5 or
              more, please reserve.
            </p>
            <p className="mt-3 text-sm text-stone">
              {brand.seats} · Cash & cards accepted
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-elevated text-fire">
                  <MapPin size={18} strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-xs tracking-[0.18em] text-stone uppercase">
                    Address
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-1 inline-flex items-center gap-1.5 text-cream transition-colors hover:text-gold"
                  >
                    <span>{brand.address}</span>
                    <ExternalLink size={14} className="text-stone transition-colors group-hover:text-gold" />
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-elevated text-fire">
                  <Train size={18} strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-xs tracking-[0.18em] text-stone uppercase">
                    Access
                  </p>
                  <p className="mt-1 text-cream">{brand.nearest}</p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-elevated text-fire">
                  <Clock size={18} strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-xs tracking-[0.18em] text-stone uppercase">
                    Hours
                  </p>
                  <p className="mt-1 whitespace-pre-line text-cream">
                    {brand.hours}
                    {'\n'}
                    {brand.lastOrder}
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-elevated text-fire">
                  <Phone size={18} strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-xs tracking-[0.18em] text-stone uppercase">
                    Contact
                  </p>
                  <div className="mt-1 flex flex-col text-cream">
                    <a
                      href={`tel:${brand.phone.replace(/\s/g, '')}`}
                      className="transition-colors hover:text-gold"
                    >
                      {brand.phone}
                    </a>
                    <a
                      href={`mailto:${brand.email}`}
                      className="transition-colors hover:text-gold"
                    >
                      {brand.email}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass relative overflow-hidden rounded-3xl p-1">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] sm:aspect-[5/4] lg:aspect-[4/5]"
                style={{
                  background:
                    'radial-gradient(circle at 40% 35%, rgb(232 93 4 / 0.35), transparent 45%), radial-gradient(circle at 70% 70%, rgb(212 160 23 / 0.2), transparent 40%), #1a1510',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="font-jp text-5xl text-gold/90 sm:text-6xl">炎</p>
                  <p className="mt-4 font-display text-2xl text-cream italic">
                    Open kitchen
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-cream-muted">
                    Twelve counter seats. Steam, fire, and the sound of the
                    ladle — dinner as performance.
                  </p>
                  <div className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <p className="mt-6 font-jp text-sm tracking-widest text-cream-muted">
                    {brand.jp}
                  </p>
                  <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-stone uppercase">
                    {brand.en}
                  </p>
                </div>
                <div
                  aria-hidden
                  data-parallax
                  data-speed="0.08"
                  className="absolute -left-10 bottom-10 h-40 w-40 rounded-full border border-fire/20"
                />
                <div
                  aria-hidden
                  data-parallax
                  data-speed="0.14"
                  className="absolute -right-8 top-12 h-28 w-28 rounded-full border border-gold/15"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
