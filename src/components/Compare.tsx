import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { IMG, photo, ease } from '../lib/data'
import { Reveal, Tag } from './ui'

const models = [
  {
    name: 'Nimbus Mini 3',
    img: IMG.phantomSky,
    blurb: 'Lightweight and licence-free in most regions.',
    price: [759, 989],
    specs: { Weight: '< 249 g', 'Flight time': '38 min', Video: '4K/100fps HDR', Range: '20 km', Sensing: 'Tri-directional' },
  },
  {
    name: 'Skyline 4 Pro',
    img: IMG.mavicWater,
    blurb: 'Our most capable camera drone, ever.',
    price: [2199, 2799],
    featured: true,
    specs: { Weight: '958 g', 'Flight time': '51 min', Video: '8K/60fps · 10-bit', Range: '30 km', Sensing: 'Omnidirectional + LiDAR' },
  },
  {
    name: 'Vortex FPV',
    img: IMG.mavicGreen,
    blurb: 'Goggles-on, fully immersive freedom.',
    price: [999, 1299],
    specs: { Weight: '410 g', 'Flight time': '20 min', Video: '4K/120fps', Range: '13 km', Sensing: 'Downward + rear' },
  },
]

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

export function Compare() {
  const [combo, setCombo] = useState(0)

  return (
    <section id="compare" className="bg-paper px-4 py-[clamp(72px,9vw,130px)] text-ink">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Tag className="text-ink-2">Compare</Tag>
          <h2 className="mt-4 text-[clamp(42px,6vw,96px)] leading-[0.96] font-semibold tracking-[-0.045em] text-balance">Which Jay is <em className="text-accent-ink">yours?</em></h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex justify-center">
          <div role="radiogroup" aria-label="Package" className="relative inline-flex rounded-full bg-ink/5 p-1">
            {['Standard', 'Fly More Combo'].map((label, i) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={combo === i}
                onClick={() => setCombo(i)}
                className={`relative z-10 h-11 cursor-pointer rounded-full px-5 text-sm font-medium transition-colors duration-200 ${
                  combo === i ? 'text-paper' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {combo === i && (
                  <motion.span layoutId="combo-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0" data-lenis-prevent-touch>
          {models.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.85, delay: i * 0.08, ease }}
              className={`relative flex w-[82vw] shrink-0 snap-center flex-col rounded-[20px] p-6 sm:w-[60vw] md:w-auto md:p-7 ${
                m.featured ? 'bg-night text-cream shadow-[0_30px_80px_-30px_rgba(10,108,255,0.45)]' : 'bg-paper-2'
              }`}
            >
              {m.featured && (
                <span className="absolute top-5 right-5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                  Most popular
                </span>
              )}
              <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                <img src={photo(m.img, 800)} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-6 text-[28px] font-semibold tracking-[-0.03em]">{m.name}</h3>
              <p className={`mt-1 text-sm ${m.featured ? 'text-cream-2' : 'text-ink-2'}`}>{m.blurb}</p>

              <div className="mt-5 flex h-10 items-baseline gap-2 overflow-hidden">
                <span className={`text-sm ${m.featured ? 'text-cream-2' : 'text-ink-2'}`}>From</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={m.price[combo]}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="text-4xl font-semibold tracking-tight tabular-nums"
                  >
                    {fmt(m.price[combo])}
                  </motion.span>
                </AnimatePresence>
              </div>

              <dl className={`mt-5 divide-y text-sm ${m.featured ? 'divide-cream-line' : 'divide-line'}`}>
                {Object.entries(m.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className={m.featured ? 'text-cream-2' : 'text-ink-2'}>{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              {combo === 1 && (
                <p className={`mt-3 flex items-center gap-2 text-sm ${m.featured ? 'text-accent' : 'text-accent-ink'}`}>
                  <Check className="size-4" aria-hidden /> 3 batteries, charging hub & bag
                </p>
              )}

              <div className="mt-auto flex gap-3 pt-6">
                <a href="#cta" className={`flex min-h-12 flex-1 items-center justify-center rounded-full text-sm font-semibold transition-colors ${m.featured ? 'bg-accent text-white hover:bg-accent-strong' : 'bg-ink text-paper hover:bg-accent hover:text-white'}`}>
                  Buy
                </a>
                <a href="#imaging" className={`flex min-h-12 flex-1 items-center justify-center rounded-full border text-sm font-medium transition-colors ${m.featured ? 'border-cream-line hover:bg-cream hover:text-ink' : 'border-line hover:border-ink'}`}>
                  Learn more
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
