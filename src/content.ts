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
/** Plain strings are text. `{ text, note }` is a highlighted term with a numbered side note; `{ text, accent }` is just emphasised. */
export type AboutToken = string | { text: string; accent?: true; note?: { title: string; body: string } }

export const about = {
  paragraph: [
    'I’m',
    { text: 'Sivadarshan', accent: true },
    '— a product designer who thinks in outcomes, not screens. For',
    { text: '3 years', note: { title: 'Experience', body: 'End-to-end product work, from the first discovery call to what happens after launch.' } },
    'I’ve shipped',
    { text: '20+ products', note: { title: 'Shipped', body: 'Stores, custom Shopify sections and my own products like Theliv and Finly, designed and built by me.' } },
    'across',
    { text: 'e-commerce', note: { title: 'E-commerce', body: '14 Shopify stores built end to end for brands in India, UAE, UK and Australia.' } },
    'and digital products: framing the problem, aligning the team, and following the work all the way to',
    { text: 'the metric after launch.', note: { title: 'Measured', body: 'I find where people hesitate, design and build the fix, then check the numbers.' } },
  ] as AboutToken[],
  stats: [
    { value: 20, suffix: '+', label: 'Brands' },
    { value: 14, suffix: '', label: 'Stores built end to end' },
    { value: 4, suffix: '', label: 'Countries' },
  ],
  principles: [
    { title: 'Discover — find the real problem', body: 'I start with the person who is stuck: calls, recordings, store data and where they drop off. For Theliv that was the revision cycles behind every discovery call.' },
    { title: 'Define — name it in one sentence', body: 'A tooling problem or a discipline problem? Who is affected, and what does a good result look like? I write that down before drawing anything.' },
    { title: 'Design — flows first, then interface', body: 'Map the steps, cut the ones that do not help, then craft the screens and the small details that make it feel obvious.' },
    { title: 'Deliver — ship it and measure', body: 'I write the Shopify and JavaScript myself, so the idea reaches the store as designed. Then I check what changed.' },
  ],
}


/*
  What I do — capability grid after About. `proof` links each skill to the case studies that show it.
*/
export const services = {
  title: 'What I bring to *the table*',
  intro: 'Design and product thinking in one person — and the code to ship it. Each skill links to the work that proves it.',
  items: [
    {
      icon: 'interface',
      title: 'UI/UX *Design*',
      body: 'Flows first, then interface. From wireframes to polished screens, grounded in research and judged on a phone first.',
      proof: ['varak', 'offnorth'],
    },
    {
      icon: 'compass',
      title: 'Product *Design*',
      body: 'PM thinking applied to design: framing the problem, setting scope and success metrics, and shipping the version that moves the number.',
      proof: ['theliv', 'finly'],
    },
    {
      icon: 'system',
      title: 'Design *Systems*',
      body: 'Reusable components, tokens and Shopify sections that keep a product consistent and let teams ship faster.',
      proof: ['varak', 'offnorth'],
    },
    {
      icon: 'code',
      title: 'Prototyping *& Build*',
      body: 'Interactive prototypes that settle debates, then production code in Liquid and JavaScript, so the idea reaches the store as designed.',
      proof: ['varak', 'theliv'],
    },
    {
      icon: 'research',
      title: 'User *Research*',
      body: 'Interviews, recordings, store data and friction analysis to find where people hesitate, and why.',
      proof: ['theliv', 'whatsapp'],
    },
    {
      icon: 'spark',
      title: 'AI Visuals *& Workflows*',
      body: 'AI-generated visuals, product mockups and motion for faster exploration, plus AI inside the product itself, like Theliv’s RAG assistant.',
      proof: ['theliv'],
    },
  ] as { icon: 'interface' | 'compass' | 'system' | 'code' | 'research' | 'spark'; title: string; body: string; proof: string[] }[],
}
