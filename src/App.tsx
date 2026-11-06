import { MotionConfig, useReducedMotion } from 'motion/react'
import { useSmoothScroll } from './lib/hooks'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Lineup } from './components/Lineup'
import { Ecosystem } from './components/Ecosystem'
import { ImagingStory } from './components/ImagingStory'
import { Features } from './components/Features'
import { Gallery } from './components/Gallery'
import { Compare } from './components/Compare'
import { Trust, FinalCTA } from './components/Closing'

export default function App() {
  const reduced = useReducedMotion()
  // `?nolenis` turns smooth scrolling off (handy for debugging/automated screenshots)
  useSmoothScroll(!reduced && !new URLSearchParams(window.location.search).has('nolenis'))

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Lineup />
        <Ecosystem />
        <ImagingStory />
        <Features />
        <Gallery />
        <Compare />
        <Trust />
      </main>
      <FinalCTA />
    </MotionConfig>
  )
}
