import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { ease, models, photo } from '../lib/data'
import { useScrollLock } from '../lib/hooks'
import { Logo } from './ui'

const links = [
  { label: 'Lineup', href: '#lineup' },
  { label: 'FPV', href: '#fpv' },
  { label: 'Technology', href: '#features' },
  { label: 'Gallery', href: '#explore' },
  { label: 'Compare', href: '#compare' },
]

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useScrollLock(open)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > window.innerHeight * 0.6)
    if (!open) setHidden(y > prev && y > 480)
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease }}
      className="fixed inset-x-0 top-0 z-[80] text-cream"
    >
      <div
        className={`relative transition-[background-color,backdrop-filter,border-color] duration-300 ${
          solid || open ? 'border-b border-cream-line bg-night/70 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Main" className="flex items-center justify-between px-[clamp(16px,3vw,40px)] pt-[env(safe-area-inset-top)]">
          <a href="#top" aria-label="Jay Drone home" className="flex min-h-16 items-center">
            <Logo />
          </a>
          <div className="flex items-center gap-[22px]">
            <ul className="hidden items-center gap-[22px] md:flex">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-flex min-h-11 items-center text-[15px] text-cream transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#compare"
              className="hidden min-h-11 items-center rounded-full border border-cream-line bg-night/50 px-5 text-[15px] font-medium backdrop-blur-md transition-colors hover:border-cream hover:bg-cream hover:text-ink sm:inline-flex"
            >
              Buy now
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="-mr-2.5 grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white/10 md:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </nav>
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-opacity ${solid ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-night md:hidden"
            data-lenis-prevent
          >
            <div className="px-4 pt-4 pb-10">
              <ul className="divide-y divide-cream-line">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease }}
                  >
                    <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center justify-between text-3xl font-semibold tracking-tight">
                      {l.label}
                      <ArrowRight className="size-5 text-cream-2" aria-hidden />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-cream-2 uppercase">The lineup</p>
              <ul className="mt-3 grid grid-cols-2 gap-3">
                {models.slice(0, 4).map((m) => (
                  <li key={m.id}>
                    <a href="#lineup" onClick={() => setOpen(false)} className="block">
                      <img src={photo(m.img, 400)} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[14px] object-cover" />
                      <span className="mt-2 block text-sm font-semibold">{m.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#compare"
                onClick={() => setOpen(false)}
                className="mt-8 flex min-h-14 items-center justify-center rounded-full bg-accent font-semibold text-white"
              >
                Buy now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
