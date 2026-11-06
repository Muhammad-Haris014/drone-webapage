import { useRef, useState, type ComponentType, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { ease } from '../lib/data'
import { ControllerArt, DroneArt, FlyMoreArt, GogglesArt, GuardArt, RemoteArt } from './ProductArt'
import { Reveal, Tag } from './ui'

type Item = {
  id: string
  name: string
  short: string
  long: string
  price: number
  specs: string[]
  Art: ComponentType<{ className?: string }>
  layout: 'card' | 'row'
}

const items: Item[] = [
  {
    id: 'vortex-fpv',
    name: 'Vortex FPV',
    short: 'Immersive first-person flight with built-in prop guards and cinematic stability.',
    long: 'A 410 g cinewhoop built for tight gaps and smooth lines. Ducted guards keep it safe indoors, while a 1/1.3-inch sensor records stabilised 4K at 120 fps.',
    price: 999,
    specs: ['4K/120fps', '410 g', '20 min flight', '13 km range'],
    Art: DroneArt,
    layout: 'card',
  },
  {
    id: 'goggles-3',
    name: 'Vortex Goggles 3',
    short: 'Micro-OLED goggles with a sharp, low-latency live view and head tracking.',
    long: 'Two 1080p micro-OLED screens show your flight at 100 fps with under 30 ms of delay. Turn your head and the camera follows, or pass the view to a friend’s phone.',
    price: 449,
    specs: ['1080p/100fps', '< 30 ms latency', 'Head tracking', 'Diopter adjust'],
    Art: GogglesArt,
    layout: 'card',
  },
  {
    id: 'motion-3',
    name: 'Motion Controller 3',
    short: 'Point where you want to go and squeeze to fly — no sticks to learn.',
    long: 'Fly by moving your hand. The cursor in your goggles follows the controller; squeeze the trigger to accelerate and release to brake. One button brings the drone home.',
    price: 199,
    specs: ['One-hand flight', 'Emergency brake', 'Return-to-home', '10 h battery'],
    Art: ControllerArt,
    layout: 'card',
  },
  {
    id: 'fly-more',
    name: 'Fly More Kit',
    short: 'Three Intelligent Flight Batteries and a charging hub for back-to-back sessions.',
    long: 'Charge three batteries in sequence from a single hub, and use the hub as a power bank in the field. Up to an hour of flying before you need a wall socket.',
    price: 249,
    specs: ['3 × batteries', 'Sequential charging', 'Power-bank mode', '60 min total'],
    Art: FlyMoreArt,
    layout: 'card',
  },
  {
    id: 'guards',
    name: 'Propeller Guard Set',
    short: 'Lightweight replacement guards in impact-resistant polymer.',
    long: 'A full replacement frame of ducted guards in a flexible, impact-resistant polymer. Swaps in under two minutes with the included driver.',
    price: 29,
    specs: ['Impact-resistant', '38 g', 'Tool included'],
    Art: GuardArt,
    layout: 'row',
  },
  {
    id: 'remote-3',
    name: 'FPV Remote Controller 3',
    short: 'Precision sticks for manual acro flying and full control.',
    long: 'Hall-effect gimbals, adjustable stick tension and a switch for Normal, Sport and Manual modes — for when you’re ready to fly fully manual.',
    price: 199,
    specs: ['Hall-effect sticks', '3 flight modes', 'USB-C sim support'],
    Art: RemoteArt,
    layout: 'row',
  },
]

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

export function Ecosystem() {
  const [sel, setSel] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const item = items[sel]

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (i + step + items.length) % items.length
    setSel(next)
    refs.current[next]?.focus()
  }

  const tabProps = (i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      refs.current[i] = el
    },
    type: 'button' as const,
    role: 'tab',
    id: `fpv-tab-${items[i].id}`,
    'aria-selected': sel === i,
    'aria-controls': 'fpv-detail',
    tabIndex: sel === i ? 0 : -1,
    onClick: () => setSel(i),
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => onKey(e, i),
  })

  const cardState = (on: boolean) =>
    on ? 'border-white/40 bg-white/[0.07]' : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'

  return (
    <section id="fpv" aria-labelledby="fpv-title" className="bg-night px-[clamp(16px,3vw,40px)] py-[clamp(72px,9vw,130px)] text-cream">
      <div className="mx-auto grid max-w-[1400px] gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)]">
        {/* heading */}
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <Tag className="text-sky">The Vortex FPV system</Tag>
          <h2 id="fpv-title" className="mt-4 text-[clamp(36px,4.2vw,60px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
            Everything you need to fly first-person.
          </h2>
        </Reveal>

        {/* the selected product, large */}
        <div
          id="fpv-detail"
          role="tabpanel"
          aria-labelledby={`fpv-tab-${item.id}`}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[720px]">
            <div aria-hidden className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(94,162,255,0.16),rgba(255,255,255,0.04)_55%,transparent)]" />
            <div aria-hidden className="absolute bottom-[8%] left-1/2 h-[7%] w-[46%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.92, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 grid place-items-center"
              >
                <item.Art className="animate-float h-[86%] w-[86%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]" />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="mx-auto mt-6 max-w-[720px]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[clamp(28px,2.6vw,40px)] font-semibold tracking-[-0.03em]">{item.name}</h3>
                <p className="text-xl font-medium text-cream/90">{fmt(item.price)}</p>
              </div>
              <p className="mt-3 max-w-[40em] text-[17px] leading-relaxed text-cream-2 md:text-lg">{item.long}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key specs">
                {item.specs.map((s) => (
                  <li key={s} className="rounded-full border border-cream-line px-3 py-1 text-[13px] text-cream/85">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#footer"
                  className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-accent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-accent-strong"
                >
                  Book a demo flight
                </a>
                <a
                  href="#compare"
                  className="group inline-flex h-12 items-center justify-center gap-1 rounded-lg border border-white/30 px-6 text-[15px] font-medium transition-colors hover:border-white hover:bg-white/5"
                >
                  Add to bag
                  <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the kit: cards, then list rows */}
        <div role="tablist" aria-label="Vortex FPV system products" aria-orientation="horizontal" className="lg:col-start-1 lg:row-start-2">
          <div className="grid grid-cols-2 gap-3">
            {items.map((it, i) =>
              it.layout === 'card' ? (
                <motion.button
                  key={it.id}
                  {...tabProps(i)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease }}
                  className={`group cursor-pointer rounded-[18px] border p-2 text-left transition-colors duration-300 ${cardState(sel === i)}`}
                >
                  <span className="block aspect-square overflow-hidden rounded-[12px] bg-gradient-to-b from-[#d9d9dd] to-[#b9b9bf] p-[12%]">
                    <it.Art className="h-full w-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-[1.06]" />
                  </span>
                  <span className="block px-2 pt-3 pb-2">
                    <span className="block text-[16px] font-medium tracking-[-0.01em] sm:text-[17px]">{it.name}</span>
                    <span className="mt-1 line-clamp-3 block text-[13px] leading-snug text-cream-2">{it.short}</span>
                  </span>
                </motion.button>
              ) : null,
            )}
          </div>
          <div className="mt-3 space-y-3">
            {items.map((it, i) =>
              it.layout === 'row' ? (
                <motion.button
                  key={it.id}
                  {...tabProps(i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.6, delay: 0.2 + (i - 4) * 0.06, ease }}
                  className={`group flex w-full cursor-pointer items-center gap-4 rounded-[18px] border p-3 text-left transition-colors duration-300 ${cardState(sel === i)}`}
                >
                  <span className="grid size-16 shrink-0 place-items-center rounded-[12px] bg-gradient-to-b from-[#d9d9dd] to-[#b9b9bf] p-2">
                    <it.Art className="h-full w-full transition-transform duration-500 group-hover:scale-[1.08]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-medium tracking-[-0.01em] sm:text-[17px]">{it.name}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-cream-2">{it.short}</span>
                  </span>
                </motion.button>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
