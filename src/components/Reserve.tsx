import { useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'
import { brand } from '../lib/brand'

export function Reserve() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="reserve" className="relative py-24 sm:py-32">
      <div className="section-pad mx-auto max-w-6xl">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fire/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Reserve · ご予約</p>
              <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
                <span className="font-jp text-2xl text-gold sm:text-3xl">
                  席を確保
                </span>
                <span className="mt-2 block">Claim your counter seat.</span>
              </h2>
              <p className="mt-5 text-cream-muted">
                We hold tables for 15 minutes past reservation time. For same-day
                seats, call {brand.phone} after 10:30.
              </p>
              <p className="mt-3 text-sm text-stone">
                {brand.hours} · {brand.lastOrder}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              {sent ? (
                <div className="flex h-full min-h-[220px] flex-col items-start justify-center rounded-2xl border border-gold/20 bg-ink/40 p-6">
                  <p className="font-jp text-2xl text-gold">ありがとうございます</p>
                  <p className="mt-2 font-display text-2xl text-cream italic">
                    {name ? `${name}, ` : ''}we have your request.
                  </p>
                  <p className="mt-3 text-sm text-cream-muted">
                    A confirmation will be sent to your email shortly. See you
                    at {brand.jp}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false)
                      setName('')
                    }}
                    className="mt-6 cursor-pointer text-sm text-gold underline-offset-4 hover:underline"
                  >
                    Make another reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="mb-1.5 block text-stone">Full name</span>
                      <input
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className="w-full rounded-xl border border-white/10 bg-ink/50 px-4 py-3 text-cream outline-none transition focus:border-gold/50"
                        placeholder="Name"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1.5 block text-stone">Guests</span>
                      <select
                        name="guests"
                        className="w-full cursor-pointer rounded-xl border border-white/10 bg-black px-4 py-3 text-cream outline-none transition focus:border-gold/50 [color-scheme:dark]"
                        defaultValue="2"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n} className="bg-black text-cream">
                            {n} {n === 1 ? 'guest' : 'guests'}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-stone">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-ink/50 px-4 py-3 text-cream outline-none transition focus:border-gold/50"
                      placeholder="you@email.com"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-stone">Date & time</span>
                    <input
                      required
                      type="datetime-local"
                      name="when"
                      className="w-full rounded-xl border border-white/10 bg-ink/50 px-4 py-3 text-cream outline-none transition focus:border-gold/50"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-stone">
                      Requests (optional)
                    </span>
                    <textarea
                      name="notes"
                      rows={3}
                      className="w-full resize-none rounded-xl border border-white/10 bg-ink/50 px-4 py-3 text-cream outline-none transition focus:border-gold/50"
                      placeholder="Allergies, counter seat preference, celebration…"
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-full bg-gradient-to-r from-fire to-fire-soft py-3.5 text-sm font-semibold tracking-wide text-cream shadow-lg shadow-fire/25 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:px-10"
                  >
                    Confirm reservation
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
