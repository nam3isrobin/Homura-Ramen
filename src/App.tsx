import { useLenis } from './hooks/useLenis'
import { useParallax } from './hooks/useParallax'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FrameSequence } from './components/FrameSequence'
import { Story } from './components/Story'
import { MenuSection } from './components/Menu'
import { Visit } from './components/Visit'
import { Reserve } from './components/Reserve'
import { Footer } from './components/Footer'

export default function App() {
  const lenis = useLenis()
  useParallax()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="noise" aria-hidden />
      <Header lenis={lenis} />
      <main id="main">
        <Hero lenis={lenis} />
        <Story />
        <FrameSequence />
        <MenuSection />
        <Visit />
        <Reserve />
      </main>
      <Footer />
    </>
  )
}
