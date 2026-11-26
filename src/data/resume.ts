/*
  Resume — mirrors Sivadarshan_US_APM_E-Commerce.pdf (the file visitors download).
  If you change the resume, replace the PDF in /public and update this file to match.
*/
export const resume = {
  name: 'Sivadarshan U S',
  title: 'Product & Growth Manager | AI E-commerce & D2C Growth',
  location: 'Bengaluru, India',
  phone: '+91 75399 61885',
  email: 'sivadarshanus@gmail.com',
  linkedin: 'linkedin.com/in/sivadarshanus',
  portfolio: 'sivadarshanus.vercel.app',
  summary:
    'Product and growth manager with 2.8 years owning product discovery, conversion rate optimization (CRO), merchandising and customer journeys for 20+ D2C and B2B Shopify brands across India, the UAE, the UK and Australia, working in growth agencies directly with founders. Increased conversion from 1.8% to 3.0% and AOV by 34% for D2C stores. Completed the HelloPM AI Product Management program and built Theliv, a RAG-based AI product, from 0 to 1. Immediate Joiner.',
  skills: [
    { group: 'Product Management', items: 'Product Discovery, User Research, JTBD, PRD Writing, Roadmapping, Prioritization (RICE, ICE), Experimentation, Stakeholder Management, Agile, 0 to 1 Product Development, User Story' },
    { group: 'E-commerce and Growth', items: 'CRO, A/B Testing, Funnel Optimization, PDP and Checkout Optimization, Merchandising, AOV, P&L, Retention, Customer Journey, Shopify, GoKwik, Product-Led Growth, Go to Market, Klaviyo' },
    { group: 'Analytics', items: 'Shopify Analytics, Google Analytics, Zoho PageSense, Product Analytics, SQL, Excel' },
    { group: 'AI and Technology', items: 'Generative AI, LLMs, RAG, Prompt Engineering, AI Prototyping, Base44, Claude, Figma, Shopify Liquid, HTML, CSS, JavaScript, Python, Notion, ClickUp, Cursor, Claude Code, Codex' },
  ],
  experience: [
    {
      role: 'Product & Growth Manager, E-commerce',
      org: 'Firstdraft Studio (Growth Agency)',
      location: 'Bengaluru, India',
      dates: 'Nov 2025 to Present',
      bullets: [
        'Own product discovery, CRO and growth for 15+ D2C and B2B clients across the UAE, India, the UK and Australia.',
        'Grew Varak Edible Luxury (Shopify, UAE market) to $371K in total sales in 2026 across 167K sessions, at 2.94% conversion, $63.50 AOV and 37.8% returning customers; conversion peaked at 3.99% in Sep 2026.',
        'Authored an 88-item D2C Shopify CRO checklist, scoring each item by impact (1 to 10) and by priority, to help D2C founders at every stage sequence the highest-leverage conversion fixes first.',
        'Led a build-vs-buy decision for a uniform brand after third-party apps failed on multi-child booking and complex filtering; prototyped and built custom appointment booking and guided purchase journeys end to end with Claude Code, added Shopify Flow automation to route bookings and product orders to separate emails and tags, and wrote admin and developer documentation that lets non-technical staff onboard a new school in about 15 minutes (pre-launch).',
        'Increased conversion from 1.8% to 3.0% and generated 5+ monthly wholesale enquiries for Panache Artistry (about $140K annual revenue) by rebuilding the discovery, evaluation and checkout journey.',
        'Cut client revision cycles from 5 to 7 rounds to 2 to 4 by standardizing requirements capture and validation; built 20+ reusable Shopify sections (Liquid, HTML, CSS) to speed up page delivery across client stores.',
      ],
    },
    {
      role: 'Product & Growth Manager, E-commerce',
      org: 'Yenmurai Technologies (Growth Agency)',
      location: 'Tiruppur, India',
      dates: 'Apr 2024 to Oct 2025',
      bullets: [
        'First hire and founding team member; owned product strategy and delivery for 10+ B2B and D2C e-commerce clients.',
        'Increased AOV by 34% for OffNorth Fashions by prioritizing an A/B testing roadmap of product bundling, one-click checkout (GoKwik) and funnel redesign, using Shopify Analytics, Google Analytics and Zoho PageSense.',
        'Grew OffNorth Fashions to $248K gross sales and 9,300+ orders in 18 months, with a 36% returning customer rate, through merchandising, product value communication and post-purchase lifecycle engagement.',
        'Built the agency’s first repeatable discovery-to-delivery SOP, adopted as the standard stakeholder alignment process.',
      ],
    },
  ],
  projects: [
    {
      name: 'Theliv',
      meta: 'AI context assistant, solo build | Case study: l1nq.com/nexyebk | MVP: theliv.base44.app',
      bullets: [
        'Ran JTBD research with designers: 75% went through 3 to 5 revision rounds and 48% traced them to unclear inputs, costing 12 to 25 hours of rework per project; prioritized with RICE and ICE and wrote the PRD with revision rounds as the primary metric.',
        'Built a RAG-based MVP on Base44; reached Round 2 of 3 at VibeCon India (Y Combinator x Emergent Labs); now in build.',
      ],
    },
    {
      name: 'ANiiVEXX',
      meta: 'Agri-fintech livestock startup | Founding Product Designer | MVP UI/UX design: sl1nk.com/pmqpqnm',
      bullets: [
        'Founding product designer for an agri-fintech livestock startup: corporate website and owned dashboard designed in Figma.',
        'Designed the corporate website and customer dashboard from 0 to 1: portfolio value, ownership models and animal health.',
      ],
    },
  ],
  stores: [
    'thepanacheartistry.com', 'varakedibleluxury.com', 'offnorth.com', 'purewear.co', 'taramajeans.com', 'superglamourous.ae',
    'barqatelixirs.com', 'cordori.com.au', 'thestaple.in', 'varthagaminternational.com', 'kalbeliya.in', 'drinkspoilt.com',
  ],
  education: [
    { name: 'AI Product Management Certification Program', org: 'HelloPM', dates: 'Jan 2026 to Jun 2026', detail: 'Product Discovery, Product Strategy, Roadmapping, MVP and Prototyping, Generative AI, Product Analytics' },
    { name: 'DigiPivot India 2026', org: 'Google, IIM Calcutta & Accenture LearnVantage', dates: 'Oct 2026 to Jan 2027', detail: 'AI foundations, Digital marketing, SEO, Google Ads, Analytics, E-commerce growth, data-driven decision-making and business strategy' },
    { name: 'McKinsey.org Forward Program', org: 'McKinsey & Company', dates: 'Sep 2026 to Dec 2026', detail: 'Structured Problem Solving, Critical Thinking, Stakeholder Communication, Digital & AI Fluency, Adaptability, Decision-Making' },
    { name: 'B.E. Information Science and Engineering', org: 'Bannari Amman Institute of Technology', dates: '2019 to 2023', detail: '8.67 CGPA' },
  ],
}
export const RESUME_PDF = '/Sivadarshan_US_APM_E-Commerce.pdf'
