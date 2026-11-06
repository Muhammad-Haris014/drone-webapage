import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ease } from '../lib/data'

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Small mono label above a heading. */
export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[12px] font-semibold tracking-[0.16em] uppercase ${className}`}>{children}</p>
}

/** Round mono-labelled control, like FitCheck's `.ctl`. */
export function Pill({
  href,
  children,
  tone = 'dark',
  className = '',
}: {
  href: string
  children: ReactNode
  tone?: 'dark' | 'light' | 'ink'
  className?: string
}) {
  const tones = {
    dark: 'border-cream-line text-cream hover:bg-cream hover:text-ink hover:border-cream',
    light: 'border-line text-ink hover:bg-ink hover:text-paper hover:border-ink',
    ink: 'border-ink bg-ink text-paper hover:bg-accent hover:border-accent hover:text-white',
  }
  return (
    <a
      href={href}
      className={`group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-5 text-[14px] font-medium whitespace-nowrap transition-colors duration-200 ${tones[tone]} ${className}`}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

/** The Jay mark: an X-frame quad seen from above. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M10 10l12 12M22 10L10 22" />
        </g>
        <g fill="none" stroke="var(--color-accent)" strokeWidth="2">
          <circle cx="9" cy="9" r="4" />
          <circle cx="23" cy="9" r="4" />
          <circle cx="9" cy="23" r="4" />
          <circle cx="23" cy="23" r="4" />
        </g>
        <rect x="13" y="13" width="6" height="6" rx="2" fill="currentColor" />
      </svg>
      <span className="text-[16px] font-semibold tracking-[0.16em]">
        JAY<span className="font-normal opacity-75">DRONE</span>
      </span>
    </span>
  )
}
