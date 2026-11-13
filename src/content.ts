// All copy lives here — edit freely.
export type Category = 'E-commerce' | 'Product'

export type CaseStudy = {
  slug: string
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
  href: string
}

export const site = {
  name: 'Siva',
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
  statement:
    'Great products are not drawn, they are decided. I bring the rigour of a product manager to the craft of design — research that shapes roadmaps, prototypes that settle debates, and interfaces measured by the outcomes they move.',
}

/*
  TODO: replace these placeholders with your real case studies.
  Titles, clients and summaries below are examples only — no outcomes are shown
  until you add an `outcome` with your real numbers.
*/
export const work: CaseStudy[] = [
  {
    slug: 'checkout',
    title: 'Rethinking checkout for first-time buyers',
    client: 'Client name',
    category: 'E-commerce',
    year: '2026',
    summary: 'Untangling a five-step checkout into a single, confident flow.',
    role: 'Lead Product Designer',
    platform: 'Web · iOS · Android',
    tone: ['#dfe7e1', '#1e4c3f'],
    href: '#',
  },
  {
    slug: 'discovery',
    title: 'Product discovery that feels curated',
    client: 'Client name',
    category: 'E-commerce',
    year: '2025',
    summary: 'Search, filters and collections rebuilt around how people actually shop.',
    role: 'Product Designer',
    platform: 'Web · Mobile web',
    tone: ['#eee5d8', '#8a5a3b'],
    href: '#',
  },
  {
    slug: 'saas-onboarding',
    title: 'Onboarding that gets teams to value faster',
    client: 'Client name',
    category: 'Product',
    year: '2025',
    summary: 'From empty state to first win — a guided setup for a B2B workspace.',
    role: 'Product Designer',
    platform: 'Web app',
    tone: ['#e3e6ee', '#2e3d63'],
    href: '#',
  },
  {
    slug: 'design-system',
    title: 'A design system for a growing product suite',
    client: 'Client name',
    category: 'Product',
    year: '2025',
    summary: 'Tokens, components and governance shared across four product teams.',
    role: 'Design Systems Lead',
    platform: 'Web · Figma',
    tone: ['#e6ebe4', '#3c5a3a'],
    href: '#',
  },
  {
    slug: 'pdp',
    title: 'Product pages that answer before you ask',
    client: 'Client name',
    category: 'E-commerce',
    year: '2024',
    summary: 'Restructuring product detail pages around the questions that block purchase.',
    role: 'Product Designer',
    platform: 'Web · iOS',
    tone: ['#ece4e4', '#6b3a43'],
    href: '#',
  },
  {
    slug: 'analytics',
    title: 'Turning raw data into daily decisions',
    client: 'Client name',
    category: 'Product',
    year: '2024',
    summary: 'A dashboard redesign that put the next action ahead of the numbers.',
    role: 'Product Designer',
    platform: 'Web app',
    tone: ['#e2e9ea', '#24535a'],
    href: '#',
  },
  {
    slug: 'loyalty',
    title: 'A loyalty programme people come back for',
    client: 'Client name',
    category: 'E-commerce',
    year: '2024',
    summary: 'Rewards, tiers and post-purchase moments designed to build habit.',
    role: 'Product Designer',
    platform: 'iOS · Android',
    tone: ['#ebe7da', '#6a5a24'],
    href: '#',
  },
  {
    slug: 'mobile-app',
    title: 'Shipping a mobile companion from zero to one',
    client: 'Client name',
    category: 'Product',
    year: '2023',
    summary: 'Scoping, prototyping and launching a focused v1 in twelve weeks.',
    role: 'Product Designer',
    platform: 'iOS · Android',
    tone: ['#e7e3ec', '#4a3a6b'],
    href: '#',
  },
]
