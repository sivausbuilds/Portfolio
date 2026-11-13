// All copy lives here — edit freely.
export { work } from './data/work'
export type { Category, CaseStudy } from './data/work'

export const site = {
  name: 'Sivadarshan',
  role: 'Product Designer',
  year: '2026',
  status: 'Open to APM roles',
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
      'I turn messy problems into clear flows and interfaces, then build them so they ship and sell — for 20+ brands across India, UAE, UK and Australia.',
    meta: [
      { label: 'Focus', value: 'Product Design & E-commerce' },
      { label: 'Shipped', value: '20+ brands · 14 stores' },
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
    { text: '20+ products', icon: 'grid', title: 'Shipped', body: 'Stores, custom Shopify sections and my own products like Theliv and Finly — designed and built by me.' },
    'across',
    { text: 'e-commerce', icon: 'bag', title: 'E-commerce', body: '14 Shopify stores designed and built end to end, for brands in India, UAE, UK and Australia.' },
    'and digital products — framing the problem, aligning the team, and following the work to',
    { text: 'the metric after launch.', icon: 'chart', title: 'Measured', body: 'I find where people hesitate, design and build the fix, then check the numbers.' },
  ] as AboutToken[],
  stats: [
    { value: 20, suffix: '+', label: 'Brands' },
    { value: 14, suffix: '', label: 'Stores built end to end' },
    { value: 4, suffix: '', label: 'Countries: India, UAE, UK, Australia' },
  ],
  principles: [
    { title: 'Discover — find the real problem', body: 'I start with the person who is stuck: calls, recordings, store data and where they drop off. For Theliv that was the revision cycles behind every discovery call.' },
    { title: 'Define — name it in one sentence', body: 'A tooling problem or a discipline problem? Who is affected, and what does a good result look like? I write that down before drawing anything.' },
    { title: 'Design — flows first, then interface', body: 'Map the steps, cut the ones that do not help, then craft the screens and the small details that make it feel obvious.' },
    { title: 'Deliver — ship it and measure', body: 'I write the Shopify and JavaScript myself, so the idea reaches the store as designed. Then I check what changed.' },
  ],
}

