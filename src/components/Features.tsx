import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { Battery, Radio, Radar, Crosshair, Moon, Route } from 'lucide-react'
import { IMG, photo, ease } from '../lib/data'
import { Reveal, Tag } from './ui'

function CountUp({ to, decimals = 0, className }: { to: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className={className}>
      {v.toFixed(decimals)}
    </span>
  )
}

function Card({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.85, delay, ease }}
      className={`relative overflow-hidden rounded-[20px] ${className}`}
    >
      {children}
    </motion.div>
  )
}

function CardHead({
  icon: Icon,
  title,
  body,
  dark,
  onAccent,
}: {
  icon: typeof Radar
  title: string
  body: string
  dark?: boolean
  onAccent?: boolean
}) {
  const chip = onAccent ? 'bg-white/15 text-white' : dark ? 'bg-cream/10 text-accent' : 'bg-accent/12 text-accent-ink'
  return (
    <div className="relative z-10">
      <span className={`grid size-10 place-items-center rounded-xl ${chip}`}>
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-[clamp(24px,2.2vw,30px)] leading-tight font-semibold tracking-[-0.03em]">{title}</h3>
      <p className={`mt-2 max-w-sm text-[15px] ${onAccent ? 'text-white/80' : dark ? 'text-cream-2' : 'text-ink-2'}`}>{body}</p>
    </div>
  )
}

function RadarVisual() {
  const blips = [
    { x: '28%', y: '32%', d: 0 },
    { x: '70%', y: '26%', d: 0.8 },
    { x: '76%', y: '68%', d: 1.6 },
    { x: '22%', y: '72%', d: 2.2 },
  ]
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[440px]">
      {[1, 0.75, 0.5, 0.25].map((s) => (
        <div key={s} className="absolute inset-0 m-auto rounded-full border border-accent/25" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
      ))}
      <div className="absolute inset-0 m-auto h-px w-full bg-accent/15" />
      <div className="absolute inset-0 m-auto h-full w-px bg-accent/15" />
      <div className="animate-radar absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(10,108,255,0.5),transparent_22%)]" />
      {blips.map((b, i) => (
        <span key={i} className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2" style={{ left: b.x, top: b.y }}>
          <span className="animate-ping-soft absolute inset-0 rounded-full bg-accent" style={{ animationDelay: `${b.d}s` }} />
          <span className="absolute inset-0 rounded-full bg-accent" />
        </span>
      ))}
      {/* drone top view */}
      <svg viewBox="0 0 64 64" className="absolute inset-0 m-auto size-16 text-cream drop-shadow-[0_0_16px_rgba(10,108,255,0.8)]">
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M20 20l24 24M44 20L20 44" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="16" cy="16" r="8" />
          <circle cx="48" cy="16" r="8" />
          <circle cx="16" cy="48" r="8" />
          <circle cx="48" cy="48" r="8" />
        </g>
        <rect x="26" y="24" width="12" height="16" rx="4" fill="currentColor" />
      </svg>
    </div>
  )
}

function BatteryVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} aria-hidden className="mt-6 flex items-center gap-1.5">
      <div className="flex h-14 flex-1 gap-1 rounded-xl border-2 border-ink/80 p-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-[5px] bg-gradient-to-t from-accent-ink to-accent"
            initial={{ scaleY: 0.1, opacity: 0.2 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.09, duration: 0.5, ease }}
          />
        ))}
      </div>
      <span className="h-6 w-1.5 rounded-r-md bg-ink/80" />
    </div>
  )
}

function SignalVisual() {
  return (
    <svg aria-hidden viewBox="0 0 200 110" className="mt-4 w-full max-w-[260px]">
      {[30, 55, 80].map((r, i) => (
        <path
          key={r}
          d={`M ${100 - r} 100 A ${r} ${r} 0 0 1 ${100 + r} 100`}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className="animate-arc text-white"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      <circle cx="100" cy="100" r="8" className="fill-white" />
    </svg>
  )
}

export function Features() {
  return (
    <section id="features" className="bg-paper px-3 py-[clamp(72px,9vw,130px)] text-ink sm:px-5">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
          <div>
            <Tag className="text-ink-2">Intelligent flight</Tag>
            <h2 className="mt-4 text-[clamp(42px,6vw,96px)] leading-[0.96] font-semibold tracking-[-0.045em] text-balance">
              Smart enough to fly itself. Fun enough that you won’t let it.
            </h2>
          </div>
          <p className="text-lg text-ink-2 md:max-w-md md:justify-self-end">
            Every Jay drone is built on the same flight platform: redundant sensors, on-board AI and a transmission system that
            keeps you connected kilometres away.
          </p>
        </Reveal>

        <div className="grid gap-3 md:grid-cols-6 md:gap-4">
          {/* radar */}
          <Card className="flex flex-col justify-between gap-8 bg-night p-7 text-cream md:col-span-4 md:row-span-2 md:flex-row md:items-center md:p-10">
            <div className="md:w-[44%]">
              <CardHead
                dark
                icon={Radar}
                title="Omnidirectional obstacle sensing"
                body="Eight vision sensors and a forward LiDAR map the world around you in real time, braking or bypassing obstacles in every direction — day or night."
              />
              <dl className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs text-cream-2">Sensing range</dt>
                  <dd className="text-4xl font-semibold tracking-tight">
                    <CountUp to={200} />
                    <span className="text-base text-cream-2"> m</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-cream-2">Refresh rate</dt>
                  <dd className="text-4xl font-semibold tracking-tight">
                    <CountUp to={120} />
                    <span className="text-base text-cream-2"> Hz</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="md:w-[52%]">
              <RadarVisual />
            </div>
          </Card>

          {/* battery */}
          <Card delay={0.08} className="bg-paper-2 p-7 md:col-span-2 md:p-8">
            <CardHead icon={Battery} title="51-minute flights" body="High-density cells and an efficient airframe keep you airborne longer." />
            <BatteryVisual />
            <p className="mt-4 text-6xl font-semibold tracking-tight">
              <CountUp to={51} />
              <span className="text-xl text-ink-2"> min</span>
            </p>
          </Card>

          {/* transmission */}
          <Card delay={0.12} className="bg-accent p-7 text-white md:col-span-2 md:p-8">
            <CardHead onAccent icon={Radio} title="30 km HD link" body="1080p/60fps live feed with near-zero latency and quad-antenna redundancy." />
            <SignalVisual />
          </Card>

          {/* active track */}
          <Card className="group flex flex-col bg-night text-cream md:col-span-3">
            <div className="relative aspect-[1400/930] overflow-hidden">
              <img
                src={photo(IMG.cliffMist, 1400)}
                alt="A hiker standing on a misty cliff, tracked by the drone"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
              <TrackingBox />
            </div>
            <div className="p-7 pt-2 md:p-8 md:pt-2">
              <CardHead dark icon={Crosshair} title="ActiveTrack 6" body="Lock onto a subject and let the drone frame, follow and orbit — even through trees." />
            </div>
          </Card>

          {/* night */}
          <Card delay={0.08} className="group flex flex-col bg-night text-cream md:col-span-3">
            <div className="relative aspect-[1400/930] overflow-hidden">
              <img
                src={photo(IMG.milkyWay, 1400)}
                alt="The Milky Way over snow-capped mountains at night"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
              <div className="absolute top-5 right-5 flex gap-2 text-[11px] font-semibold tracking-wider">
                <span className="rounded-full bg-black/35 px-3 py-1 backdrop-blur-md">ISO 12800</span>
                <span className="rounded-full bg-black/35 px-3 py-1 backdrop-blur-md">Low-noise</span>
              </div>
            </div>
            <div className="p-7 pt-2 md:p-8 md:pt-2">
              <CardHead dark icon={Moon} title="Night mode" body="A brighter, cleaner picture after sunset — so the story doesn’t end when the light does." />
            </div>
          </Card>

          {/* waypoints strip */}
          <Card className="flex flex-col gap-6 bg-paper-2 p-7 md:col-span-6 md:flex-row md:items-center md:justify-between md:p-10">
            <CardHead icon={Route} title="Waypoints & MasterShots" body="Plan a cinematic route once, repeat it perfectly — or let one tap produce a fully edited sequence." />
            <WaypointPath />
          </Card>
        </div>
      </div>
    </section>
  )
}

function TrackingBox() {
  return (
    <motion.div
      aria-hidden
      className="absolute top-[54%] left-[60.5%] h-[22%] w-[10%]"
      initial={{ opacity: 0, scale: 2.2 }}
      whileInView={{ opacity: 1, scale: [2.2, 0.9, 1.05, 1] }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
      transition={{ duration: 1.4, ease }}
    >
      {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map(
        (c) => (
          <span key={c} className={`absolute size-3 border-[#34c759] md:size-4 ${c}`} />
        ),
      )}
      <span className="absolute -top-7 left-0 whitespace-nowrap rounded-md bg-[#34c759] px-2 py-0.5 text-[11px] font-semibold text-black">Tracking · 98%</span>
    </motion.div>
  )
}

function WaypointPath() {
  return (
    <svg aria-hidden viewBox="0 0 520 120" className="w-full max-w-[560px] text-accent-ink">
      <motion.path
        d="M10 90 C 90 10, 160 10, 220 60 S 350 120, 410 50 S 490 20, 510 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="1 0"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease }}
      />
      {[
        [10, 90],
        [220, 60],
        [410, 50],
        [510, 30],
      ].map(([x, y], i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.5, duration: 0.4, ease }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        >
          <circle cx={x} cy={y} r="11" className="fill-white" stroke="currentColor" strokeWidth="3" />
          <text x={x} y={y + 4} textAnchor="middle" className="fill-ink text-[11px] font-semibold">
            {i + 1}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}
