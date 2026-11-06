// Photography is served locally from public/images as WebP, each at the widths in PHOTO_WIDTHS
// (files are named `<name>-<width>.webp`). Originals: Unsplash (free license), photo IDs below.
// Placeholders — swap for real product shots by replacing the files under the same names.
export const IMG = {
  phantomForest: 'phantom-forest', // 1473968512647-3e447244af8f
  mavicWater: 'mavic-water', // 1507582020474-9a35b7d455d9
  mavicGreen: 'mavic-green', // 1527977966376-1c8408f9f108
  valley: 'valley', // 1464822759023-fed622ff2c3b
  lagoon: 'lagoon', // 1501785888041-af3ef285b470
  desertRoad: 'desert-road', // 1500530855697-b586d89ba3ee
  cliffMist: 'cliff-mist', // 1469474968028-56623f02e42e
  milkyWay: 'milky-way', // 1519681393784-d120267933ba
  snowPeak: 'snow-peak', // 1454496522488-7a8e488e8606
  greenCliffs: 'green-cliffs', // 1470071459604-3b5ec3a7fe05
  droneLow: 'drone-low', // 1521405924368-64c5b84bec60
  phantomSky: 'phantom-sky', // 1524143986875-3b098d78b363
  tabletMap: 'tablet-map', // 1533310266094-8898a03807dd
} as const

export const PHOTO_WIDTHS = [320, 768, 1280, 1920] as const

/** The local file for a photo, at the smallest stored width that covers `w`. */
export function photo(name: string, w = 1280) {
  const size = PHOTO_WIDTHS.find((s) => s >= w) ?? PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1]
  return `/images/${name}-${size}.webp`
}

/** A `srcset` listing every stored width, so the browser picks the right one. */
export function photoSet(name: string) {
  return PHOTO_WIDTHS.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ')
}

export type DroneModel = {
  id: string
  code: string // short name on the orbit
  name: string
  tagline: string
  img: string
  hero: { img: string; position: string } // full-bleed banner photo and its anchor
  price: number | null
  category: 'Consumer' | 'FPV' | 'Enterprise' | 'Cinema'
  stats: { value: string; unit: string; label: string }[]
}

export const models: DroneModel[] = [
  {
    id: 'skyline-4-pro',
    code: 'Skyline',
    name: 'Skyline 4 Pro',
    tagline: 'Triple-lens flagship. 8K vision.',
    img: IMG.mavicWater,
    hero: { img: IMG.mavicWater, position: '50% 55%' },
    price: 2199,
    category: 'Consumer',
    stats: [
      { value: '51', unit: 'min', label: 'Flight time' },
      { value: '8K', unit: '60', label: 'Video' },
      { value: '30', unit: 'km', label: 'Range' },
    ],
  },
  {
    id: 'nimbus-mini-3',
    code: 'Nimbus',
    name: 'Nimbus Mini 3',
    tagline: 'Mini to the max. Under 249 g.',
    img: IMG.phantomSky,
    hero: { img: IMG.desertRoad, position: '50% 50%' },
    price: 759,
    category: 'Consumer',
    stats: [
      { value: '38', unit: 'min', label: 'Flight time' },
      { value: '249', unit: 'g', label: 'Weight' },
      { value: '20', unit: 'km', label: 'Range' },
    ],
  },
  {
    id: 'vortex-fpv',
    code: 'Vortex',
    name: 'Vortex FPV',
    tagline: 'Goggles on. Gravity off.',
    img: IMG.mavicGreen,
    hero: { img: IMG.droneLow, position: '50% 68%' },
    price: 999,
    category: 'FPV',
    stats: [
      { value: '140', unit: 'km/h', label: 'Top speed' },
      { value: '4K', unit: '120', label: 'Video' },
      { value: '13', unit: 'km', label: 'Range' },
    ],
  },
  {
    id: 'atlas-enterprise',
    code: 'Atlas',
    name: 'Atlas Enterprise',
    tagline: 'Survey, map and inspect at scale.',
    img: IMG.tabletMap,
    hero: { img: IMG.valley, position: '50% 45%' },
    price: null,
    category: 'Enterprise',
    stats: [
      { value: '56', unit: 'min', label: 'Flight time' },
      { value: '1', unit: 'cm', label: 'RTK accuracy' },
      { value: 'IP55', unit: '', label: 'Weather' },
    ],
  },
  {
    id: 'aero-cine',
    code: 'Aero',
    name: 'Aero Cine',
    tagline: 'A full-frame cinema camera, airborne.',
    img: IMG.phantomForest,
    hero: { img: IMG.phantomForest, position: '50% 100%' },
    price: 4899,
    category: 'Cinema',
    stats: [
      { value: '6K', unit: 'RAW', label: 'Full frame' },
      { value: '28', unit: 'min', label: 'Flight time' },
      { value: '15', unit: 'km', label: 'Range' },
    ],
  },
]

/** Kept for the search box and the mobile menu. */
export const products = models.slice(0, 4)
export type Product = DroneModel

export const ease = [0.16, 1, 0.3, 1] as const
export const easeMain = [0.65, 0.01, 0.05, 0.99] as const
