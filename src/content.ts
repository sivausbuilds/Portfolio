// All copy lives here — edit freely.
export type Category = 'E-commerce' | 'Product'

export type CaseStudy = {
  slug: string
  /** short project name — shown on the moving ribbons */
  name: string
  title: string
  client: string
  category: Category
  year: string
  summary: string
  role: string
  platform: string
  /** Optional headline result, e.g. { value: '+18%', label: 'Checkout conversion' } */
  outcome?: { value: string; label: string }
  /** Optional cover image path in /public, e.g. '/work/checkout.jpg'. Falls back to a generated cover. */
  image?: string
  /** Colours for the generated cover: [background, accent] */
  tone: [string, string]
  /** e.g. '4 months' */
  timeline: string
  team?: string
  /** Full write-up. Leave out to show the template placeholders. */
  sections?: CaseSection[]
  impact?: { value: string; label: string }[]
}

export type CaseSection = {
  id: string
  title: string
  body: string[]
  /** a highlighted decision / insight shown as a glass callout */
  callout?: string
  /** image paths in /public; placeholders are shown when empty */
  images?: string[]
}

export const site = {
  name: 'Sivadarshan',
  role: 'Product Designer',
  year: '2026',
  status: 'Open to new roles',
  email: 'sivadarshanus@gmail.com',
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Portfolio — Selected work',
    lines: [
      [{ t: 'Product Designer' }],
      [{ t: 'with a ' }, { t: 'PM mindset.', italic: true }],
    ],
    intro:
      'I design digital products and e-commerce experiences that earn their place — framing the right problem, aligning teams around outcomes, and crafting the details people actually feel.',
    meta: [
      { label: 'Focus', value: 'Product Design & E-commerce' },
      { label: 'Shipped', value: '20+ products' },
      { label: 'Experience', value: '3 years' },
    ],
    // Cycles inside the glass card — the "PM mindset" in practice.
    mindset: ['Problem framing', 'Product strategy', 'Interaction design', 'Design systems', 'Metrics & iteration'],
  },
}

/*
  About — the paragraph reveals word by word on scroll.
  Plain strings are text; objects become interactive pills with a hover/tap card.
*/
export type AboutToken = string | { text: string; icon: 'avatar' | 'spark' | 'bag' | 'grid' | 'chart'; title: string; body: string }

export const about = {
  paragraph: [
    'Hi, I’m',
    { text: 'Sivadarshan', icon: 'avatar', title: 'Product Designer', body: 'Designing with a PM mindset — I own the why as much as the how.' },
    '— a product designer who thinks in outcomes, not screens. Over',
    { text: '3 years', icon: 'spark', title: 'Experience', body: 'Three years of end-to-end product work, from discovery to post-launch.' },
    'I’ve shipped',
    { text: '20+ products', icon: 'grid', title: 'Shipped', body: 'New launches and redesigns of live products, taken all the way to release.' },
    'across',
    { text: 'e-commerce', icon: 'bag', title: 'E-commerce', body: 'Discovery, product pages, checkout and loyalty — journeys where every step is measurable.' },
    'and digital products — framing the problem, aligning the team, and following the work to',
    { text: 'the metric after launch.', icon: 'chart', title: 'Measured', body: 'Success is a number that moved, not a file that got approved.' },
  ] as AboutToken[],
  stats: [
    { value: 3, suffix: '', label: 'Years designing products' },
    { value: 20, suffix: '+', label: 'Products shipped' },
    { value: 2, suffix: '', label: 'Domains — e-commerce & product' },
  ],
  principles: [
    { title: 'Frame the problem first', body: 'Before pixels: who is this for, what is broken, and how will we know it is fixed? A sharp problem statement saves weeks of polish on the wrong thing.' },
    { title: 'Decide with evidence', body: 'Research, data and quick prototypes settle debates faster than opinions. I bring the trade-offs to the table so the team can decide together.' },
    { title: 'Design the system, not the screen', body: 'Reusable patterns and clear rules let products grow without falling apart — and let engineering ship faster.' },
    { title: 'Ship, measure, iterate', body: 'Launch is the midpoint. I define success metrics up front and keep refining once real users arrive.' },
  ],
}

/*
  TODO: replace these placeholders with your real case studies.
  Titles, clients and summaries below are examples only — no outcomes are shown
  until you add an `outcome` with your real numbers.
*/
export const work: CaseStudy[] = [
  {
    slug: 'checkout',
    name: 'Checkout',
    title: 'Rethinking checkout for first-time buyers',
    client: 'Client name',
    category: 'E-commerce',
    year: '2026',
    summary: 'Untangling a five-step checkout into a single, confident flow.',
    role: 'Lead Product Designer',
    platform: 'Web · iOS · Android',
    tone: ['#dfe7e1', '#1e4c3f'],
    timeline: '4 months',
  },
  {
    slug: 'discovery',
    name: 'Discovery',
    title: 'Product discovery that feels curated',
    client: 'Client name',
    category: 'E-commerce',
    year: '2025',
    summary: 'Search, filters and collections rebuilt around how people actually shop.',
    role: 'Product Designer',
    platform: 'Web · Mobile web',
    tone: ['#eee5d8', '#8a5a3b'],
    timeline: '3 months',
  },
  {
    slug: 'saas-onboarding',
    name: 'Onboarding',
    title: 'Onboarding that gets teams to value faster',
    client: 'Client name',
    category: 'Product',
    year: '2025',
    summary: 'From empty state to first win — a guided setup for a B2B workspace.',
    role: 'Product Designer',
    platform: 'Web app',
    tone: ['#e3e6ee', '#2e3d63'],
    timeline: '2 months',
  },
  {
    slug: 'design-system',
    name: 'Design System',
    title: 'A design system for a growing product suite',
    client: 'Client name',
    category: 'Product',
    year: '2025',
    summary: 'Tokens, components and governance shared across four product teams.',
    role: 'Design Systems Lead',
    platform: 'Web · Figma',
    tone: ['#e6ebe4', '#3c5a3a'],
    timeline: '6 months',
  },
  {
    slug: 'pdp',
    name: 'Product Pages',
    title: 'Product pages that answer before you ask',
    client: 'Client name',
    category: 'E-commerce',
    year: '2024',
    summary: 'Restructuring product detail pages around the questions that block purchase.',
    role: 'Product Designer',
    platform: 'Web · iOS',
    tone: ['#ece4e4', '#6b3a43'],
    timeline: '3 months',
  },
  {
    slug: 'analytics',
    name: 'Analytics',
    title: 'Turning raw data into daily decisions',
    client: 'Client name',
    category: 'Product',
    year: '2024',
    summary: 'A dashboard redesign that put the next action ahead of the numbers.',
    role: 'Product Designer',
    platform: 'Web app',
    tone: ['#e2e9ea', '#24535a'],
    timeline: '2 months',
  },
  {
    slug: 'loyalty',
    name: 'Loyalty',
    title: 'A loyalty programme people come back for',
    client: 'Client name',
    category: 'E-commerce',
    year: '2024',
    summary: 'Rewards, tiers and post-purchase moments designed to build habit.',
    role: 'Product Designer',
    platform: 'iOS · Android',
    tone: ['#ebe7da', '#6a5a24'],
    timeline: '4 months',
  },
  {
    slug: 'mobile-app',
    name: 'Mobile App',
    title: 'Shipping a mobile companion from zero to one',
    client: 'Client name',
    category: 'Product',
    year: '2023',
    summary: 'Scoping, prototyping and launching a focused v1 in twelve weeks.',
    role: 'Product Designer',
    platform: 'iOS · Android',
    tone: ['#e7e3ec', '#4a3a6b'],
    timeline: '3 months',
  },
]
