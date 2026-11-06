import { useId } from 'react'

// Shaded product illustrations for the FPV-system section. Placeholders for real cut-out renders:
// each one is a self-contained SVG in a 240×240 box, readable on light-grey cards and on black.

type ArtProps = { className?: string }

function useGrad() {
  // React's useId can contain characters (: « ») that break url(#…) references, so keep it plain.
  const id = 'art' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  return {
    body: `${id}-body`,
    soft: `${id}-soft`,
    ring: `${id}-ring`,
    defs: (
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a7b81" />
          <stop offset="0.55" stopColor="#45464b" />
          <stop offset="1" stopColor="#26272a" />
        </linearGradient>
        <linearGradient id={`${id}-soft`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d8e94" />
          <stop offset="1" stopColor="#3a3b40" />
        </linearGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a9ba1" />
          <stop offset="0.5" stopColor="#55565b" />
          <stop offset="1" stopColor="#2c2d31" />
        </linearGradient>
      </defs>
    ),
  }
}

const ROTORS: [number, number, number][] = [
  [62, 62, 20],
  [178, 62, -25],
  [62, 178, 65],
  [178, 178, -60],
]

/** FPV drone seen from above: ducted guards, four props, a slim body and a front camera. */
export function DroneArt({ className }: ArtProps) {
  const g = useGrad()
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      {g.defs}
      {ROTORS.map(([x, y]) => (
        <line key={`a${x}${y}`} x1="120" y1="120" x2={x} y2={y} stroke={`url(#${g.soft})`} strokeWidth="14" strokeLinecap="round" />
      ))}
      {ROTORS.map(([x, y, r]) => (
        <g key={`r${x}${y}`}>
          <circle cx={x} cy={y} r="44" fill="none" stroke={`url(#${g.ring})`} strokeWidth="10" />
          <circle cx={x} cy={y} r="38" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="2" />
          <g transform={`rotate(${r} ${x} ${y})`}>
            <ellipse cx={x} cy={y} rx="33" ry="4.5" fill="#9b9ca2" fillOpacity="0.6" />
            <ellipse cx={x} cy={y} rx="33" ry="4.5" fill="#9b9ca2" fillOpacity="0.35" transform={`rotate(90 ${x} ${y})`} />
          </g>
          <circle cx={x} cy={y} r="7" fill="#2a2b2e" stroke="#a5a6ab" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="94" y="56" width="52" height="132" rx="22" fill={`url(#${g.body})`} />
      <rect x="102" y="104" width="36" height="62" rx="10" fill="#1d1e21" />
      {[114, 122, 130, 138, 146].map((y) => (
        <line key={y} x1="108" y1={y + 6} x2="132" y2={y + 6} stroke="#3a3b40" strokeWidth="2" strokeLinecap="round" />
      ))}
      {[110, 116, 122, 128].map((x) => (
        <circle key={x} cx={x + 1} cy="178" r="2" fill="#d6d7db" />
      ))}
      <rect x="117" y="80" width="6" height="16" rx="3" fill="#0a6cff" />
      <rect x="104" y="40" width="32" height="26" rx="8" fill="#18181b" />
      <circle cx="120" cy="53" r="8" fill="#0d0d10" stroke="#55565b" strokeWidth="2" />
      <circle cx="117" cy="50" r="2.5" fill="#5ea2ff" />
    </svg>
  )
}

/** FPV goggles, front view, with antennas and strap mounts. */
export function GogglesArt({ className }: ArtProps) {
  const g = useGrad()
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      {g.defs}
      <rect x="62" y="44" width="11" height="56" rx="5.5" fill={`url(#${g.soft})`} transform="rotate(-18 67 96)" />
      <rect x="167" y="44" width="11" height="56" rx="5.5" fill={`url(#${g.soft})`} transform="rotate(18 173 96)" />
      <path d="M36 118 C 16 116 10 136 24 144" fill="none" stroke="#2a2b2e" strokeWidth="11" strokeLinecap="round" />
      <path d="M204 118 C 224 116 230 136 216 144" fill="none" stroke="#2a2b2e" strokeWidth="11" strokeLinecap="round" />
      <path d="M38 98 Q120 74 202 98 L208 146 Q204 176 170 176 L144 176 Q120 154 96 176 L70 176 Q36 176 32 146 Z" fill={`url(#${g.body})`} />
      <path d="M50 106 Q120 86 190 106 L194 142 Q190 162 166 162 L146 162 Q120 142 94 162 L74 162 Q50 162 46 142 Z" fill="#141417" />
      <path d="M58 112 Q120 94 182 112" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
      <rect x="100" y="86" width="40" height="5" rx="2.5" fill="#000" fillOpacity="0.35" />
      <circle cx="190" cy="124" r="3.2" fill="#0a6cff" />
    </svg>
  )
}

/** One-hand motion controller, side view. */
export function ControllerArt({ className }: ArtProps) {
  const g = useGrad()
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      {g.defs}
      <path d="M100 76 C 100 56 140 56 140 76 L148 192 C 148 210 92 210 92 192 Z" fill={`url(#${g.body})`} />
      <path d="M106 86 L110 190" stroke="#fff" strokeOpacity="0.14" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="120" cy="68" rx="36" ry="27" fill={`url(#${g.soft})`} />
      <ellipse cx="120" cy="60" rx="25" ry="14" fill="#1d1e21" />
      <circle cx="120" cy="60" r="9" fill="#3a3b40" stroke="#9b9ca2" strokeWidth="1.5" />
      <path d="M146 84 q 16 6 12 30 q -7 3 -12 -5 Z" fill="#1d1e21" />
      <circle cx="154" cy="68" r="6" fill="#0a6cff" />
      <circle cx="120" cy="204" r="6" fill="none" stroke="#2a2b2e" strokeWidth="3" />
    </svg>
  )
}

/** Fly More kit: three batteries standing in a charging hub. */
export function FlyMoreArt({ className }: ArtProps) {
  const g = useGrad()
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      {g.defs}
      {[52, 100, 148].map((x, i) => (
        <g key={x}>
          <rect x={x} y="62" width="40" height="98" rx="10" fill={`url(#${g.soft})`} />
          <rect x={x + 6} y="88" width="28" height="30" rx="5" fill="#1d1e21" />
          {[0, 1, 2, 3].map((d) => (
            <circle key={d} cx={x + 11 + d * 6} cy="136" r="2" fill={i === 1 && d < 3 ? '#5ea2ff' : '#d6d7db'} fillOpacity={i === 1 || d < 2 ? 1 : 0.45} />
          ))}
        </g>
      ))}
      <rect x="34" y="146" width="172" height="52" rx="14" fill={`url(#${g.body})`} />
      <rect x="40" y="150" width="160" height="8" rx="4" fill="#fff" fillOpacity="0.12" />
      {[86, 120, 154].map((x) => (
        <rect key={x} x={x - 8} y="178" width="16" height="3" rx="1.5" fill="#0a6cff" />
      ))}
    </svg>
  )
}

/** A replacement guard set: four ducts joined to a centre plate. */
export function GuardArt({ className }: ArtProps) {
  const g = useGrad()
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      {g.defs}
      {ROTORS.map(([x, y]) => (
        <line key={`a${x}${y}`} x1="120" y1="120" x2={x} y2={y} stroke={`url(#${g.soft})`} strokeWidth="10" strokeLinecap="round" />
      ))}
      {ROTORS.map(([x, y]) => (
        <g key={`r${x}${y}`}>
          <circle cx={x} cy={y} r="44" fill="none" stroke={`url(#${g.ring})`} strokeWidth="11" />
          <circle cx={x} cy={y} r="10" fill="none" stroke="#3a3b40" strokeWidth="4" />
        </g>
      ))}
      <rect x="96" y="96" width="48" height="48" rx="14" fill={`url(#${g.body})`} />
      <circle cx="120" cy="120" r="6" fill="#0a6cff" />
    </svg>
  )
}

/** Remote controller with two gimbal sticks and a small screen. */
export function RemoteArt({ className }: ArtProps) {
  const g = useGrad()
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden>
      {g.defs}
      <rect x="70" y="62" width="100" height="16" rx="8" fill="#2a2b2e" />
      <path d="M38 114 Q38 82 70 82 L170 82 Q202 82 202 114 L198 152 Q192 180 160 180 L140 170 L100 170 L80 180 Q48 180 42 152 Z" fill={`url(#${g.body})`} />
      {[84, 156].map((x) => (
        <g key={x}>
          <circle cx={x} cy="124" r="21" fill="#1d1e21" />
          <circle cx={x} cy="124" r="8" fill="#4a4b50" />
          <ellipse cx={x} cy="116" rx="7" ry="5" fill="#9b9ca2" />
        </g>
      ))}
      <rect x="104" y="98" width="32" height="22" rx="4" fill="#0d0d10" />
      <rect x="108" y="108" width="24" height="2" rx="1" fill="#5ea2ff" />
      {[110, 120, 130].map((x) => (
        <circle key={x} cx={x} cy="150" r="3" fill={x === 120 ? '#0a6cff' : '#3a3b40'} />
      ))}
    </svg>
  )
}
