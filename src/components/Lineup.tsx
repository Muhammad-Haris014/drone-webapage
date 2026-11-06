import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { ease, models, photoSet, photo, type DroneModel } from '../lib/data'
import { Reveal, Tag } from './ui'

const layout: Record<string, { wide?: boolean; position: string; badge?: string }> = {
  'skyline-4-pro': { wide: true, position: '50% 22%', badge: 'New' },
  'nimbus-mini-3': { position: '50% 55%', badge: 'Best seller' },
  'vortex-fpv': { position: '50% 50%' },
  'atlas-enterprise': { position: '50% 60%' },
  'aero-cine': { position: '50% 40%', badge: 'Pre-order' },
}

function TileLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="group/link inline-flex min-h-11 items-center gap-0.5 text-[15px] font-medium text-cream transition-colors hover:text-sky">
      <span className="underline-offset-4 group-hover/link:underline">{children}</span>
      <ChevronRight aria-hidden className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
    </a>
  )
}

function Tile({ m, i }: { m: DroneModel; i: number }) {
  const l = layout[m.id]
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease }}
      className={`group relative isolate overflow-hidden rounded-[20px] bg-night text-cream ${
        l.wide ? 'aspect-[4/5] sm:aspect-[16/10] md:col-span-2 md:aspect-[21/9]' : 'aspect-[4/5] md:aspect-[5/4.6]'
      }`}
    >
      <img
        src={photo(m.img, l.wide ? 1920 : 1200)}
        srcSet={photoSet(m.img)}
        sizes={l.wide ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
        alt={`${m.name} in flight`}
        loading="lazy"
        style={{ objectPosition: l.position }}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
      />
      <div
        className={`absolute inset-0 -z-10 ${
          l.wide
            ? 'bg-gradient-to-t from-night/85 via-night/10 to-transparent sm:bg-gradient-to-b sm:from-night/75 sm:via-night/5 sm:to-night/20'
            : 'bg-gradient-to-b from-night/75 via-night/5 to-night/25'
        }`}
      />
      <div
        className={`flex flex-col items-center px-6 text-center ${
          l.wide ? 'h-full justify-end pb-8 sm:h-auto sm:justify-start sm:pt-12 sm:pb-0' : 'pt-10 md:pt-12'
        }`}
      >
        {l.badge && (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cream-line bg-night/40 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {l.badge}
          </span>
        )}
        <h3 className={`font-semibold tracking-[-0.04em] ${l.wide ? 'text-[clamp(40px,5vw,72px)] leading-[1]' : 'text-[clamp(32px,3.2vw,48px)] leading-[1.02]'}`}>
          {m.name}
        </h3>
        <p className="mt-2 max-w-md text-balance text-cream-2 md:text-lg">{m.tagline}</p>
        <div className="mt-1 flex items-center gap-6">
          <TileLink href="#imaging">Learn more</TileLink>
          <TileLink href="#compare">{m.price ? `Buy from $${m.price.toLocaleString('en-US')}` : 'Contact sales'}</TileLink>
        </div>
      </div>
    </motion.article>
  )
}

export function Lineup() {
  return (
    <section id="lineup" aria-labelledby="lineup-title" className="bg-paper px-3 pt-[clamp(72px,9vw,130px)] pb-3 text-ink sm:px-5">
      <Reveal className="mx-auto mb-[clamp(40px,5vw,72px)] max-w-4xl text-center">
        <Tag className="text-ink-2">The lineup · 2026</Tag>
        <h2 id="lineup-title" className="mt-4 text-[clamp(42px,6.4vw,104px)] leading-[0.96] font-semibold tracking-[-0.045em] text-balance">
          Five drones. <em className="text-accent-ink">One</em> sky.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-2 text-balance">
          From a pocket-sized travel companion to a full-frame cinema rig — every Jay shares the same flight platform.
        </p>
      </Reveal>
      <div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 md:gap-4">
        {models.map((m, i) => (
          <Tile key={m.id} m={m} i={i} />
        ))}
      </div>
    </section>
  )
}
