import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { IMG, photo } from '../lib/data'
import { useMediaQuery } from '../lib/hooks'
import { Reveal, Tag } from './ui'

const shots = [
  { img: IMG.valley, title: 'Alpine valley', meta: 'Skyline 4 Pro · 8K/30 · 24 mm' },
  { img: IMG.desertRoad, title: 'Canyon road', meta: 'Nimbus Mini 3 · 4K/60 · Hyperlapse' },
  { img: IMG.greenCliffs, title: 'Coastal cliffs', meta: 'Skyline 4 Pro · 70 mm tele' },
  { img: IMG.snowPeak, title: 'First light', meta: 'Skyline 4 Pro · 166 mm tele' },
  { img: IMG.milkyWay, title: 'Night sky', meta: 'Night mode · ISO 6400' },
  { img: IMG.droneLow, title: 'Low pass', meta: 'Vortex FPV · 4K/120' },
]

function Shot({ s, i, pinned }: { s: (typeof shots)[number]; i: number; pinned?: boolean }) {
  const box = pinned
    ? `h-[min(52vh,560px)] ${i % 2 ? 'aspect-[4/5]' : 'aspect-[5/4]'}`
    : `w-full ${i % 2 ? 'aspect-[4/5]' : 'aspect-[4/4.4]'}`
  return (
    <figure className={`group shrink-0 snap-center ${pinned ? '' : 'w-[80vw] sm:w-[56vw]'}`}>
      <div className={`overflow-hidden rounded-[14px] bg-night-3 ${box}`}>
        <img
          src={photo(s.img, 1100)}
          alt={`${s.title}, aerial photograph`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-xl font-semibold tracking-[-0.02em]">{s.title}</span>
        <span className="text-right text-xs text-cream-2">{s.meta}</span>
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  const wrap = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 768px)')
  const pinned = desktop && !reduced
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const el = track.current
    if (!el || !pinned) return
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * dist)
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const header = (
    <Reveal className="mx-auto flex max-w-[1440px] flex-col gap-4 px-[clamp(16px,3vw,40px)] md:flex-row md:items-end md:justify-between">
      <div>
        <Tag className="text-cream-2">Shot on Jay</Tag>
        <h2 className="mt-4 text-[clamp(42px,6vw,96px)] leading-[0.96] font-semibold tracking-[-0.045em]">The world, <em className="text-accent">from above.</em></h2>
      </div>
      <p className="max-w-sm text-cream-2">Frames captured by our community of pilots across six continents. Share yours with #ShotOnJay.</p>
    </Reveal>
  )

  if (!pinned) {
    return (
      <section id="explore" className="bg-night py-24 text-cream">
        {header}
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5" data-lenis-prevent-touch>
          {shots.map((s, i) => (
            <Shot key={s.title} s={s} i={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={wrap} id="explore" className="relative bg-night text-cream" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-12 overflow-hidden pt-16">
        {header}
        <motion.div ref={track} style={{ x }} className="flex w-max items-end gap-6 px-10 will-change-transform">
          {shots.map((s, i) => (
            <Shot key={s.title} s={s} i={i} pinned />
          ))}
        </motion.div>
        <div className="mx-auto h-[3px] w-48 overflow-hidden rounded-full bg-cream/15" aria-hidden>
          <motion.div style={{ width: bar }} className="h-full bg-accent" />
        </div>
      </div>
    </section>
  )
}
