import { Reveal } from './Reveal'

const BOWLS = [
  {
    jp: '醤油ラーメン',
    name: 'Shoyu Ramen',
    desc: 'Clear chicken–pork blend, house soy tare, soft-boiled egg, chashu, nori, scallion.',
    price: '¥1,280',
    tag: 'Signature',
  },
  {
    jp: '豚骨ラーメン',
    name: 'Tonkotsu Ramen',
    desc: '18-hour milky broth, thin straight noodles, black garlic oil, chashu, menma.',
    price: '¥1,480',
    tag: 'Most ordered',
  },
  {
    jp: '味噌ラーメン',
    name: 'Miso Ramen',
    desc: 'Hokkaido-style miso base, corn, butter optional, spicy blend on request.',
    price: '¥1,380',
    tag: 'Seasonal heat',
  },
  {
    jp: '塩ラーメン',
    name: 'Shio Ramen',
    desc: 'Sea salt tare, yuzu accent, chicken chintan — clean, bright, and refined.',
    price: '¥1,250',
    tag: 'Light & clear',
  },
]

const EXTRAS = [
  { name: 'Kaedama (extra noodles)', price: '¥200' },
  { name: 'Ajitama egg', price: '¥150' },
  { name: 'Extra chashu (2 slices)', price: '¥350' },
  { name: 'Black garlic oil', price: '¥100' },
]

export function MenuSection() {
  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Menu · お品書き</p>
              <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
                <span className="font-jp text-2xl text-gold sm:text-3xl">
                  本日の一杯
                </span>
                <span className="mt-2 block">Bowls built for balance.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-stone">
              Tax included. Noodle firmness and oil level available at the
              counter — just ask.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {BOWLS.map((bowl, i) => (
            <Reveal key={bowl.name} delay={i * 0.06}>
              <article className="glass group relative overflow-hidden rounded-2xl p-6 sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-6 font-jp text-6xl text-white/[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:text-fire/[0.06] sm:text-7xl"
                >
                  {bowl.jp.slice(0, 2)}
                </div>
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full border border-gold/25 bg-gold/10 px-2.5 py-0.5 text-[0.65rem] tracking-wider text-gold uppercase">
                      {bowl.tag}
                    </span>
                    <h3 className="mt-3 font-display text-2xl text-cream sm:text-3xl">
                      {bowl.name}
                    </h3>
                    <p className="mt-1 font-jp text-sm text-gold/80">{bowl.jp}</p>
                  </div>
                  <p className="shrink-0 font-display text-xl tabular-nums text-gold-soft">
                    {bowl.price}
                  </p>
                </div>
                <p className="relative mt-4 max-w-md text-sm leading-relaxed text-cream-muted">
                  {bowl.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="glass mt-6 rounded-2xl p-6 sm:p-7">
            <p className="eyebrow">Toppings · トッピング</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {EXTRAS.map((x) => (
                <li
                  key={x.name}
                  className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 text-sm last:border-0 sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-0"
                >
                  <span className="text-cream-muted">{x.name}</span>
                  <span className="tabular-nums text-gold-soft">{x.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
