// All copy lives here — edit freely.
export { work } from './data/work'
export type { Category, CaseStudy } from './data/work'

export const site = {
  name: 'Sivadarshan',
  role: 'Design · CRO · Product',
  roles: ['Product Designer', 'CRO Strategist', 'Product Manager'],
  year: '2026',
  status: 'Open to Product, CRO & PM roles',
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
  intro: 'Design and product thinking in ==one person==, and the code to ship it. Each skill links to ==the work that proves it==.',
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
  password: storefront password for stores in development — it is shown publicly on the site.
  image: a 16:10 banner in /public/sites. Add as many stores as you like; filters and counts update on their own.
*/
export type SiteStatus = 'live' | 'building' | 'protected'
export type Site = { name: string; url: string; password?: string; tag: string; market: string; year?: string; note: string; status: SiteStatus; image: string; featured?: boolean; press?: 'vogue' | 'radio' }
export const websites = {
  title: 'Stores I *designed & built*',
  intro: 'Shopify stores ==designed and developed end to end== for brands in India, UAE, UK and Australia. Stores in development show their ==preview link and password==.',
  items: [
    // Live
    { name: 'The Panache Artistry', url: 'https://thepanacheartistry.com', tag: 'Art & lifestyle', market: 'India', note: 'Designed and built end to end', status: 'live', image: '/sites/panache.jpg', featured: true, press: 'vogue' },
    { name: 'Varak Edible Luxury', url: 'https://www.varakedibleluxury.com', tag: 'Gifting & bakery', market: 'UAE', note: 'Custom cart, upsells and a jar box builder', status: 'live', image: '/sites/varak.jpg', featured: true, press: 'radio' },
    { name: 'Drink Spoilt', url: 'https://www.drinkspoilt.com', tag: 'Beverages', market: 'Global', note: 'Designed and built end to end', status: 'live', image: '/sites/drinkspoilt.jpg' },
    { name: 'Tarama Jeans', url: 'https://taramajeans.com', tag: 'Denim', market: 'India', note: 'Designed and built end to end', status: 'live', image: '/sites/tarama.jpg' },
    { name: 'OffNorth', url: 'https://offnorth.com', tag: 'Apparel', market: 'India', note: 'Proof next to every buying decision', status: 'live', image: '/sites/offnorth.jpg' },
    { name: 'Cordori', url: 'https://cordori.com.au', tag: 'Shopify store', market: 'Australia', note: 'Designed and built end to end', status: 'live', image: '/sites/cordori.jpg' },
    { name: 'Invrd', url: 'https://invrd.world', tag: 'Shopify store', market: 'Global', note: 'Designed and built end to end', status: 'live', image: '/sites/invrd.jpg' },
    { name: 'Kalbeliya', url: 'https://kalbeliya.in', tag: 'Shopify store', market: 'India', note: 'Designed and built end to end', status: 'live', image: '/sites/kalbeliya.jpg' },
    { name: 'Superglamourous', url: 'https://superglamourous.ae', tag: 'Shopify store', market: 'UAE', note: 'Designed and built end to end', status: 'live', image: '/sites/superglamourous.jpg' },
    { name: 'The Staple', url: 'https://thestaple.in', tag: 'Shopify store', market: 'India', note: 'Designed and built end to end', status: 'live', image: '/sites/staple.jpg' },
    { name: 'Saga', url: 'https://mysaga.co', tag: 'Shopify store', market: 'Global', note: 'Designed and built end to end', status: 'live', image: '/sites/saga.jpg' },
    { name: 'Purewear', url: 'https://purewear.co', tag: 'Teamwear', market: 'UAE', note: 'Redesign and custom club stores', status: 'live', image: '/sites/purewear.jpg' },
    { name: 'Barqat Elixirs', url: '', tag: 'Shopify store', market: 'UAE', note: 'Designed and built end to end', status: 'live', image: '/sites/barqat.jpg' },
    // In development — the preview link and its storefront password are shown on the site
    { name: 'Weavers Town', url: 'https://weaverstown.in', password: 'weaver', tag: 'Shopify store', market: 'India', note: 'Store build in progress', status: 'building', image: '/sites/weaverstown.jpg' },
    { name: 'Suii Cura', url: 'https://suii-cura.myshopify.com', password: 'FDS@1', tag: 'Shopify store', market: '', note: 'Store build in progress', status: 'building', image: '/sites/suiicura.jpg' },
    { name: 'Blend & Co', url: 'https://blendandco-uae.myshopify.com', password: 'fds1', tag: 'Shopify store', market: 'UAE', note: 'Store build in progress', status: 'building', image: '/sites/blendandco.jpg' },
    { name: 'Solx Uniform', url: 'https://solxuniform.myshopify.com', password: 'fds1', tag: 'Shopify store', market: '', note: 'Store build in progress', status: 'building', image: '/sites/solx.jpg' },
    { name: 'Signature Artistry', url: 'https://signature-artistry-uae.myshopify.com', password: 'fds1', tag: 'Shopify store', market: 'UAE', note: 'Store build in progress', status: 'building', image: '/sites/signature.jpg' },
    { name: 'Aurëlle by H', url: 'https://aurelle-uae.myshopify.com', password: 'fds1', tag: 'Shopify store', market: 'UAE', note: 'Store build in progress', status: 'building', image: '/sites/aurelle.jpg' },
  ] as Site[],
}
