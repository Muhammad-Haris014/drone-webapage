import { useRef, useState, type FormEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ChevronRight, Globe } from 'lucide-react'
import { ease, IMG, photo, photoSet } from '../lib/data'
import { Logo, Reveal, Tag } from './ui'

const promises = [
  {
    title: 'Return-to-home, always.',
    body: 'Low battery, lost signal or one tap — the drone flies itself back to where it took off and lands gently.',
  },
  {
    title: 'Geofencing built in.',
    body: 'Live airspace data warns you about airports and restricted zones before you ever get close.',
  },
  {
    title: 'AirSense on every model.',
    body: 'Receives signals from nearby aircraft and alerts you in time to give way.',
  },
  {
    title: 'Your footage stays yours.',
    body: 'Photos and video live on your card and your phone. Nothing uploads unless you choose to share it.',
  },
]

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="grid gap-[clamp(16px,3vw,40px)] bg-night px-[clamp(16px,3vw,40px)] py-[clamp(64px,9vw,130px)] text-cream md:grid-cols-2">
      <Reveal>
        <Tag className="text-sky">Safety & privacy</Tag>
        <h2 id="trust-title" className="mt-4 max-w-[10em] text-[clamp(40px,6vw,96px)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
          Your flight. <em className="text-accent">Your rules.</em>
        </h2>
      </Reveal>
      <ul className="self-end">
        {promises.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
            className="border-t border-cream-line py-[18px] text-[17px] leading-[1.45] text-cream-2"
          >
            <strong className="block font-semibold text-cream">{p.title}</strong>
            {p.body}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

const footerNav: [string, string[]][] = [
  ['Products', ['Skyline 4 Pro', 'Nimbus Mini 3', 'Vortex FPV', 'Atlas Enterprise', 'Aero Cine']],
  ['Explore', ['Shot on Jay', 'Flight academy', 'Pilot community', 'Events']],
  ['Support', ['Help center', 'Repair service', 'Jay Care', 'Safety & regulations']],
  ['Company', ['About', 'Careers', 'Newsroom', 'Contact']],
]

export function FinalCTA() {
  const end = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: end, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <>
      {/* closing banner, DJI-style: full-bleed photo, centred title, two clean buttons */}
      <section
        ref={end}
        id="cta"
        aria-labelledby="end-title"
        className="relative isolate flex min-h-[min(88vh,820px)] items-center justify-center overflow-hidden bg-night px-4 text-center text-cream"
      >
        <motion.img
          style={reduced ? undefined : { y, scale: 1.2 }}
          src={photo(IMG.snowPeak, 1920)}
          srcSet={photoSet(IMG.snowPeak)}
          sizes="100vw"
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/35 to-night/80" />
        <Reveal className="max-w-3xl">
          <Tag className="text-cream/80">Limited offer</Tag>
          <h2 id="end-title" className="mt-4 text-[clamp(44px,7vw,104px)] leading-[0.98] font-semibold tracking-[-0.04em]">
            Your sky is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-cream/85">
            Order Skyline 4 Pro today and get the Fly More kit — three batteries, a charging hub and a bag — at no extra cost.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#compare"
              className="group inline-flex h-12 items-center gap-1 rounded-full bg-accent px-7 text-[15px] font-semibold text-white transition-colors hover:bg-accent-strong"
            >
              Buy Skyline 4 Pro
              <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#footer"
              className="group inline-flex h-12 items-center gap-1 rounded-full border border-white/55 px-7 text-[15px] font-medium backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
            >
              Find a store
              <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </section>

      <footer id="footer" className="bg-night px-[clamp(16px,3vw,40px)] pt-14 pb-[calc(env(safe-area-inset-bottom)+22px)] text-cream">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo />
            <form onSubmit={submit} className="mt-6 max-w-sm">
              <label htmlFor="newsletter" className="text-[15px] font-medium">
                Get launch news and flight tips
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 min-w-0 flex-1 rounded-full border border-cream-line bg-night-2 px-4 text-base text-cream outline-none placeholder:text-cream/35 focus:border-accent"
                />
                <button type="submit" className="h-12 cursor-pointer rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong">
                  Subscribe
                </button>
              </div>
              <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-sky">
                {done ? 'Thanks — you’re on the list.' : ''}
              </p>
            </form>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map(([title, items]) => (
              <div key={title}>
                <h3 className="text-[12px] font-semibold tracking-[0.16em] text-cream-2 uppercase">{title}</h3>
                <ul className="mt-3 space-y-0.5">
                  {items.map((l) => (
                    <li key={l}>
                      <a href="#top" className="inline-flex min-h-9 items-center text-[15px] text-cream/85 transition-colors hover:text-sky">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-cream-line pt-6 text-[13px] text-cream-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Jay Drone. Demo site — product names are fictional and imagery is from Unsplash.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#top" className="hover:text-cream">
              Privacy
            </a>
            <a href="#top" className="hover:text-cream">
              Terms
            </a>
            <span className="inline-flex items-center gap-1">
              <Globe className="size-3.5" aria-hidden /> United States (English)
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
