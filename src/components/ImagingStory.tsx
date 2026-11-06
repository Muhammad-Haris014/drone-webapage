import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { IMG, photoSet, photo } from '../lib/data'
import { Tag } from './ui'

const chapters = [
  {
    kicker: '01 — Main camera',
    title: (
      <>
        1-inch sensor. <em className="text-accent">14 stops.</em>
      </>
    ),
    body: 'A large 50 MP sensor holds deep shadows and bright skies in one frame, with natural colour straight out of the camera.',
  },
  {
    kicker: '02 — Triple-lens system',
    title: (
      <>
        24 · 70 · <em className="text-accent">166 mm.</em>
      </>
    ),
    body: 'Switch between wide, medium tele and long tele mid-flight for cinematic compression without ever moving closer.',
  },
  {
    kicker: '03 — Video',
    title: (
      <>
        8K at 60. <em className="text-accent">10‑bit log.</em>
      </>
    ),
    body: 'Record crisp 8K or slow time down with 4K/120 — with the grading latitude professional colourists expect.',
  },
]

function Chapter({ p, i, c }: { p: MotionValue<number>; i: number; c: (typeof chapters)[number] }) {
  const start = 0.36 + i * 0.2
  const opacity = useTransform(p, [start, start + 0.06, start + 0.14, start + 0.2], [0, 1, 1, i === chapters.length - 1 ? 1 : 0])
  const y = useTransform(p, [start, start + 0.08], [40, 0])
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-0 px-[clamp(16px,3vw,40px)] pb-14 md:pb-20">
      <div className="max-w-2xl">
        <Tag className="text-cream-2">{c.kicker}</Tag>
        <h3 className="mt-3 text-[clamp(34px,5vw,80px)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance">{c.title}</h3>
        <p className="mt-4 max-w-[30em] text-base text-cream-2 md:text-lg">{c.body}</p>
      </div>
    </motion.div>
  )
}

export function ImagingStory() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const clip = useTransform(p, [0, 0.32], ['inset(18% 20% 12% 20% round 14px)', 'inset(0% 0% 0% 0% round 0px)'])
  const imgScale = useTransform(p, [0, 0.32, 1], [1.3, 1.05, 1])
  const introOpacity = useTransform(p, [0, 0.12, 0.22], [1, 1, 0])
  const introY = useTransform(p, [0, 0.22], [0, -60])
  const shade = useTransform(p, [0.25, 0.4], [0, 1])
  const step = useTransform(p, [0.36, 0.96], [0, 1])

  const heading = (
    <>
      Imaging, <em className="text-accent">reimagined.</em>
    </>
  )

  if (reduced) {
    return (
      <section id="imaging" className="bg-night px-[clamp(16px,3vw,40px)] py-24 text-cream">
        <Tag className="text-cream-2">Imaging</Tag>
        <h2 className="mt-3 text-[clamp(42px,7vw,112px)] leading-[0.96] font-semibold tracking-[-0.045em]">{heading}</h2>
        <img src={photo(IMG.lagoon, 1600)} alt="Aerial shot of a turquoise lagoon framed by cliffs" className="mt-10 aspect-[16/9] w-full rounded-[14px] object-cover" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {chapters.map((c) => (
            <div key={c.kicker}>
              <Tag className="text-cream-2">{c.kicker}</Tag>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-cream-2">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="imaging" className="relative h-[360vh] bg-night text-cream">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute inset-x-0 top-[6%] z-10 px-4 text-center">
          <Tag className="text-cream-2">Imaging</Tag>
          <h2 className="mt-2 text-[clamp(38px,6vw,96px)] leading-[0.95] font-semibold tracking-[-0.045em]">{heading}</h2>
        </motion.div>

        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.img
            style={{ scale: imgScale }}
            src={photo(IMG.lagoon, 1920)}
            srcSet={photoSet(IMG.lagoon)}
            sizes="100vw"
            alt="Aerial shot of a turquoise lagoon framed by cliffs, captured from above"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-night/10" />
          {chapters.map((c, i) => (
            <Chapter key={c.kicker} p={p} i={i} c={c} />
          ))}
          <motion.div style={{ opacity: shade }} className="absolute top-1/2 right-[clamp(16px,3vw,40px)] hidden -translate-y-1/2 flex-col gap-3 md:flex">
            {chapters.map((c, i) => (
              <RailDot key={c.kicker} step={step} i={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function RailDot({ step, i }: { step: MotionValue<number>; i: number }) {
  const n = chapters.length
  const h = useTransform(step, [i / n, (i + 1) / n], ['0%', '100%'])
  return (
    <span className="relative block h-12 w-[3px] overflow-hidden rounded-full bg-cream/20">
      <motion.span style={{ height: h }} className="absolute inset-x-0 top-0 block bg-accent" />
    </span>
  )
}
