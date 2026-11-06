import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from 'motion/react'
import { ChevronRight, Pause, Play } from 'lucide-react'
import { ease, models, photo, photoSet, type DroneModel } from '../lib/data'

const SHOW_SECONDS = 6

const price = (m: DroneModel) => (m.price ? `From $${m.price.toLocaleString('en-US')}` : 'Talk to sales')

/** The product selector: one frosted bar of models, a highlight that slides to the active one,
 *  a timer on the active model only, and a pause/play control for the auto-advance. */
function Dock({
  index,
  onPick,
  progress,
  onHover,
  playing,
  onToggle,
  canPlay,
}: {
  index: number
  onPick: (i: number) => void
  progress: MotionValue<number>
  onHover: (hovering: boolean) => void
  playing: boolean
  onToggle: () => void
  canPlay: boolean
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const scroller = useRef<HTMLDivElement>(null)

  // Keep the active model in view on narrow screens.
  useEffect(() => {
    const el = refs.current[index]
    const box = scroller.current
    if (!el || !box || box.scrollWidth <= box.clientWidth) return
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
  }, [index])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? models.length - 1 : (index + step + models.length) % models.length
    onPick(next)
    refs.current[next]?.focus()
  }

  return (
    <div
      className="mx-auto flex w-full max-w-[min(1180px,calc(100%-24px))] items-center gap-1 rounded-[22px] border border-white/10 bg-black/35 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl backdrop-saturate-150 md:w-fit"
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      <div
        ref={scroller}
        role="tablist"
        aria-label="Choose a drone"
        className="no-scrollbar flex min-w-0 flex-1 snap-x snap-mandatory gap-1 overflow-x-auto"
        data-lenis-prevent-touch
      >
        {models.map((m, i) => {
          const on = i === index
          return (
            <button
              key={m.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`dock-${m.id}`}
              aria-selected={on}
              aria-label={`${m.name}, ${price(m)}`}
              aria-controls="hero-stage"
              tabIndex={on ? 0 : -1}
              onClick={() => onPick(i)}
              onKeyDown={onKey}
              className="group relative flex w-[188px] shrink-0 cursor-pointer snap-center items-center gap-3 rounded-2xl py-2 pr-4 pl-2 text-left"
            >
              {on && (
                <motion.span
                  layoutId="dock-active"
                  aria-hidden
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  className="absolute inset-0 rounded-2xl bg-white/[0.13] ring-1 ring-white/20 ring-inset"
                />
              )}
              <span
                className={`relative size-11 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 transition-opacity duration-300 ${
                  on ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'
                }`}
              >
                <img
                  src={photo(m.img, 320)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="relative min-w-0 flex-1">
                <span
                  className={`block truncate text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                    on ? 'text-white' : 'text-cream/60 group-hover:text-cream/90'
                  }`}
                >
                  {m.name}
                </span>
                <span className={`mt-0.5 block text-[12px] transition-colors duration-300 ${on ? 'text-cream/70' : 'text-cream/40'}`}>{price(m)}</span>
              </span>
              {on && (
                <span aria-hidden className="absolute right-4 bottom-1.5 left-[64px] h-[2px] overflow-hidden rounded-full bg-white/15">
                  <motion.span style={{ scaleX: progress }} className="block h-full origin-left rounded-full bg-accent" />
                </span>
              )}
            </button>
          )
        })}
      </div>
      {canPlay && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-cream/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4 translate-x-px" aria-hidden />}
        </button>
      )}
    </div>
  )
}

export function Hero() {
  const hero = useRef<HTMLElement>(null)
  const reduced = !!useReducedMotion()
  const inView = useInView(hero, { margin: '0px 0px -10% 0px' })
  const [index, setIndex] = useState(0)
  const active = models[index]

  const current = useRef(0)
  const pick = useCallback((i: number) => {
    if (i === current.current) return
    current.current = i
    setIndex(i)
  }, [])

  // Auto-advance through the lineup. Hovering the dock pauses it for a moment; the pause button
  // stops it until pressed again.
  const progress = useMotionValue(0)
  const controls = useRef<AnimationPlaybackControls | null>(null)
  const hovering = useRef(false)
  const [playing, setPlaying] = useState(true)
  const stopped = useRef(false)
  useEffect(() => {
    progress.set(0)
    if (reduced || !inView) return
    const c = animate(progress, 1, {
      duration: SHOW_SECONDS,
      ease: 'linear',
      onComplete: () => pick((index + 1) % models.length),
    })
    if (hovering.current || stopped.current) c.pause()
    controls.current = c
    return () => c.stop()
  }, [index, reduced, inView, progress, pick])
  const sync = () => {
    if (hovering.current || stopped.current) controls.current?.pause()
    else controls.current?.play()
  }
  const onHover = (h: boolean) => {
    hovering.current = h
    sync()
  }
  const onToggle = () => {
    stopped.current = !stopped.current
    setPlaying(!stopped.current)
    sync()
  }

  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const fade = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const rise = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section
      ref={hero}
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured drones"
      className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-night text-cream"
    >
      {/* the product photo, full-bleed, cross-fading between models */}
      <motion.div
        id="hero-stage"
        role="tabpanel"
        aria-labelledby={`dock-${active.id}`}
        style={reduced ? undefined : { y: drift }}
        className="absolute inset-0 -z-10"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={active.id}
            src={photo(active.hero.img, 1920)}
            srcSet={photoSet(active.hero.img)}
            sizes="100vw"
            alt={`${active.name} in flight`}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1, ease }, scale: { duration: SHOW_SECONDS + 1, ease: 'easeOut' } }}
            style={{ objectPosition: active.hero.position }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* a light veil under the nav, and a deeper one where the title sits */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
      </motion.div>

      {/* title, DJI-style: centred, over the open ground below the drone */}
      <motion.div
        style={reduced ? undefined : { opacity: fade, y: rise }}
        className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+112px)] flex flex-col items-center px-4 text-center md:bottom-[120px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[13px] font-medium tracking-[0.2em] text-cream/75 uppercase">
              {active.category === 'Consumer' && index === 0 ? 'New' : active.category}
            </p>
            <h1 className="mt-3 text-[clamp(44px,6vw,96px)] leading-none font-medium tracking-[-0.035em]">
              <span className="sr-only">Jay Drone </span>
              {active.name}
            </h1>
            <p className="mt-3 text-lg text-cream/85 md:mt-4 md:text-2xl">{active.tagline}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#imaging"
            className="group inline-flex h-11 items-center gap-1 rounded-full border border-white/55 px-6 text-sm font-medium backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
          >
            Learn more
            <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#compare"
            className="group inline-flex h-11 items-center gap-1 rounded-full bg-white px-6 text-sm font-medium text-ink transition-colors hover:bg-white/85"
          >
            Buy now
            <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>

      {/* the product selector */}
      <div className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+16px)] md:bottom-6">
        <Dock
          index={index}
          onPick={pick}
          progress={progress}
          onHover={onHover}
          playing={playing}
          onToggle={onToggle}
          canPlay={!reduced}
        />
      </div>
    </section>
  )
}
