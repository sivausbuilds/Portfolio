// All copy lives here — edit freely.
export { work } from './data/work'
export type { Category, CaseStudy } from './data/work'

export const site = {
  name: 'Sivadarshan',
  role: 'Product Designer',
  year: '2026',
  status: 'Open to APM roles',
  email: 'sivadarshanus@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sivadarshanus/',
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Resume', href: '/resume' },
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
      { label: 'Shipped', value: '20+ brands' },
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
    { text: 'e-commerce', note: { title: 'E-commerce', body: 'Shopify stores built end to end for brands in India, UAE, UK and Australia.' } },
    'and digital products: framing the problem, aligning the team, and following the work all the way to',
    { text: 'the metric after launch.', note: { title: 'Measured', body: 'I find where people hesitate, design and build the fix, then check the numbers.' } },
  ] as AboutToken[],
  stats: [
    { value: 20, suffix: '+', label: 'Brands' },
    { value: 20, suffix: '+', label: 'Products shipped' },
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

/*
  Websites built — the project index.
  status: 'live' (opens the site) · 'building' (in development) · 'protected' (password protected; CTA asks for access by email).
  Never put store passwords here: this file is public.
  image: a 16:10 banner in /public/sites. Add as many stores as you like; filters and counts update on their own.
*/
export type SiteStatus = 'live' | 'building' | 'protected'
export type Site = { name: string; url: string; tag: string; market: string; year: string; note: string; status: SiteStatus; image: string }
export const websites = {
  title: 'Stores I *designed & built*',
  intro: 'Shopify stores designed and developed end to end for brands in India, UAE, UK and Australia. Some are still in development or password protected; ask and I’ll walk you through them.',
  items: [
    { name: 'Varak Edible Luxury', url: 'https://varakedibleluxury.com', tag: 'Gifting & bakery', market: 'UAE', year: '2026', note: 'Custom cart, upsells and a jar box builder', status: 'live', image: '/sites/varak.jpg' },
    { name: 'OffNorth', url: 'https://offnorth.com', tag: 'Apparel', market: 'India', year: '2025', note: 'Proof next to every buying decision', status: 'live', image: '/sites/offnorth.jpg' },
    { name: 'The Panache Artistry', url: 'https://thepanacheartistry.com', tag: 'Art & lifestyle', market: 'India', year: '2025', note: 'Designed and built end to end', status: 'live', image: '/sites/panache.jpg' },
    { name: 'Tarama Jeans', url: 'https://taramajeans.com', tag: 'Denim', market: 'India', year: '2025', note: 'Designed and built end to end', status: 'live', image: '/sites/tarama.jpg' },
    { name: 'Cordori', url: 'https://cordori.com.au', tag: 'Lifestyle', market: 'Australia', year: '2024', note: 'Designed and built end to end', status: 'live', image: '/sites/cordori.jpg' },
    { name: 'The Staple', url: 'https://thestaple.in', tag: 'Fashion', market: 'India', year: '2024', note: 'Designed and built end to end', status: 'live', image: '/sites/staple.jpg' },
    // Example of a store that is not public yet — copy and fill in:
    // { name: 'Brand name', url: 'https://brand.myshopify.com', tag: 'Category', market: 'India', year: '2026', note: 'What I built', status: 'protected', image: '/sites/brand.jpg' },
  ] as Site[],
}
