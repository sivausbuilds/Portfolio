/*
  ATS-friendly resume. Plain structure, standard section names, no tables or columns.
  Edit here; /resume and the PDF (npm run resume:pdf) are both generated from this file.
  TODO (needs your input): education, LinkedIn URL, exact start month of freelance work.
*/
export const resume = {
  name: 'Sivadarshan U S',
  title: 'Product Designer',
  location: 'Bengaluru, India',
  email: 'sivadarshanus@gmail.com',
  portfolio: 'sivadarshanus.vercel.app',
  linkedin: 'linkedin.com/in/sivadarshanus',
  summary:
    'Product Designer with a PM mindset and 3 years of end-to-end experience across e-commerce and digital products. Shipped 20+ Shopify stores and custom features for brands in India, UAE, UK and Australia, owning research, UX and UI design, front-end build in Liquid and JavaScript, and post-launch measurement. Defined and built two 0-to-1 products (Theliv, Finly) from PRD to working MVP.',
  skills: [
    { group: 'Product design', items: 'User research, friction analysis, journey mapping, interaction design, UI design, prototyping, usability testing, design systems, mobile-first design' },
    { group: 'Product management', items: 'Problem framing, PRDs, MVP scoping, success metrics, RICE prioritization, growth loops, competitor analysis, conversion rate optimization (CRO)' },
    { group: 'Tools and build', items: 'Figma, Shopify, Liquid, JavaScript, HTML, CSS, Shopify Analytics, Notion, Base44, AI tools (RAG, prompt design)' },
  ],
  experience: [
    {
      role: 'Product Designer and Shopify Developer (Freelance)',
      org: 'Self-employed',
      location: 'Bengaluru, India (remote clients)',
      dates: '2024 – Present',
      bullets: [
        'Designed and developed 20+ Shopify stores and custom sections end to end for D2C brands in India, UAE, UK and Australia, from discovery calls to launch and post-launch analytics.',
        'Varak Edible Luxury (UAE): mapped shopper friction from product card to checkout and designed and coded 4 custom features (on-card variant picker with upsell popup, build-your-own jar box, per-item gift notes with delivery or pickup, 3D testimonial slider); the store recorded 5,322 orders and a 37.71% returning customer rate, Jan–Nov 2026.',
        'OffNorth Fashions (India): redesigned home, collection and product pages around trust signals placed next to each buying decision (refund guarantee, delivery promise, ratings, spec chips, sticky add-to-cart), mobile-first since about 85% of 583.9K sessions were mobile; 9,347 orders over 18 months.',
        'SolXi (India, pre-launch): led a build-vs-buy analysis and replaced two paid apps with custom Shopify features (a multi-child, multi-location fitting booking system and a school uniform bundle finder), saving an estimated $30–40 per month; automated booking vs product order routing with Shopify Flow and Liquid.',
      ],
    },
  ],
  projects: [
    {
      name: 'Theliv: RAG-powered design context assistant',
      meta: 'Own product, 0 to 1 · 2026',
      bullets: [
        'Framed 3 to 5 revision cycles per project as a tooling problem, then wrote PRD v1.0 and built an MVP in Base44 that captures client inputs, asks clarifying questions and generates a brief the client signs off.',
        'Set success targets of 20–40% fewer revision cycles and 30% less time from discovery to brief; submitted to VibeCon India 2026 (Y Combinator × Emergent Labs).',
      ],
    },
    {
      name: 'Finly: financial decision clarity tool',
      meta: 'Own product, 0 to 1 · 2026',
      bullets: ['Designed and built an MVP that shows the short and long term impact of a spending decision before the user commits.'],
    },
    {
      name: 'ANiiVEXX: website and dashboard',
      meta: 'Founding product designer · Agri-fintech startup',
      bullets: ['Designed the corporate website and the trading dashboard for a livestock trading startup in Figma.'],
    },
    {
      name: 'Product improvement case studies',
      meta: 'Google Forms, WhatsApp, OutX',
      bullets: [
        'Google Forms: designed guidance for better open-ended survey answers and prioritized features with RICE.',
        'WhatsApp: proposed "Reply Later" after finding that reading a message removes the unread reminder.',
        'OutX: redesigned a B2B SaaS growth model into a product-led growth loop.',
      ],
    },
  ],
  certifications: [
    'AI Product Management Program, HelloPM (4-month live program), June 2026',
    'Product Management Basics and Product Discovery, Pendo × Mind the Product',
    'AI for Product Management, Google Cloud × Mind the Product',
    'In progress: DigiPivot India 2026; McKinsey Forward Program 2026',
  ],
  education: [] as { degree: string; school: string; dates: string }[],
}
export const RESUME_PDF = '/Sivadarshan-US-Product-Designer-Resume.pdf'
