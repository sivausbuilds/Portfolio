/*
  Case studies. Content comes from Sivadarshan's own write-ups.

  Text formatting inside strings:
    ==text==  → highlighted phrase
    **text**  → bold
    *text*    → italic (titles only)

  Open items (not rendered — fill in when ready):
    Varak    · same-period 2025 comparison, feature go-live dates, upsell take-up rate,
               "what I would do next", client approval to publish revenue + testimonial names
    OffNorth · redesign launch date and 8-week before/after comparison, currency check (report is USD),
               "what I would do next"
    Theliv   · source and sample size for the 75% / 48% / 12–25h figures, 2–3 product decisions,
               VibeCon outcome and early user feedback
    Finly, Google Forms, OutX, WhatsApp · full write-ups from Notion
*/

export type Category = 'E-commerce' | 'Product'

export type Media =
  | { kind: 'video'; src: string; poster?: string }
  | { kind: 'image'; src: string; alt: string }

export type Block =
  | { type: 'p'; text: string }
  | { type: 'goal'; text: string }
  | { type: 'why'; text: string }
  | { type: 'journey'; steps: { stage: string; question: string; fix: string }[]; extra?: string }
  | { type: 'feature'; frame: 'browser' | 'phone'; src: string; url?: string; steps: { title: string; body: string; at: number }[] }
  | { type: 'drawer' }
  | { type: 'image'; src: string; alt: string; caption?: string; frame?: 'browser'; url?: string }
  | { type: 'kpis'; items: { value: string; label: string }[]; note?: string }
  | { type: 'compare'; before: { src: string; caption: string }; after: { src: string; caption: string }; url?: string }
  | { type: 'tabs'; tabs: { label: string; before: string[]; after: string[] }[] }
  | { type: 'flow'; without: FlowNode[]; with: FlowNode[]; withoutResult: string; withResult: string; labels?: [string, string] }
  | { type: 'versus'; options: { name: string; verdict: string; chosen?: boolean; points: string[] }[] }
  | { type: 'metrics'; items: { metric: string; why: string }[] }
  | { type: 'docs'; items: { title: string; kind: string; pages: number; body: string; covers: string[]; points: string[]; file: string }[] }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'table'; rows: [string, string][] }
  | { type: 'links'; items: LinkItem[] }
  | { type: 'pending'; text: string }

export type FlowNode = { t: string; kind?: 'bad' | 'ok' | 'ai' | 'break' }
export type LinkItem = { kind: string; title: string; body?: string; href: string; cta: string }

export type Chapter = { id: string; kicker: string; title: string; blocks: Block[] }

export type CaseStudy = {
  slug: string
  /** short name for ribbons and the sticky bar */
  name: string
  /** card + page title; *italic* allowed */
  title: string
  kicker: string
  category: Category
  status: 'Complete' | 'In progress'
  year: string
  summary: string
  intro: string
  tags: string[]
  meta: { label: string; value: string }[]
  cover?: Media
  /** colours for generated covers and tints: [background, accent] */
  tone: [string, string]
  /** the things a reader must not miss — shown in the summary strip and sticky bar */
  facts: {
    problem: string
    built: string
    outcome: string
    highlights: { value: string; label: string }[]
    primary?: { label: string; href: string }
  }
  chapters: Chapter[]
}

const VARAK = '/work/varak'
const OFFNORTH = '/work/offnorth'

export const work: CaseStudy[] = [
  {
    slug: 'varak',
    name: 'Varak',
    title: 'Varak *Edible Luxury*',
    kicker: 'Shopify · UAE',
    category: 'E-commerce',
    status: 'Complete',
    year: '2026',
    summary: 'Four custom features for gifting orders: upsell popup, jar box builder, per-item notes and a testimonial slider.',
    intro:
      'A gifting and bakery brand where one order often includes a cake, a balloon and a handwritten message. I wrote four custom features so the store handles that in one cart.',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CRO'],
    meta: [
      { label: 'Role', value: 'Product and build' },
      { label: 'Stack', value: 'Shopify theme, Liquid, JavaScript' },
      { label: 'Market', value: 'United Arab Emirates (AED)' },
      { label: 'Period', value: '2026' },
    ],
    cover: { kind: 'video', src: `${VARAK}/upsell.mp4` },
    tone: ['#e4ebe5', '#2f5a48'],
    facts: {
      problem: 'Gifting orders are personal, but a standard Shopify cart gives one note per order, no pickup choice and no prompt to add extras.',
      built: 'Four custom features: a variant picker with an upsell popup, a jar box builder, per-item notes with delivery or pickup, and a 3D testimonial slider.',
      outcome: '5,322 orders and a 37.71% returning customer rate, 1 Jan to 3 Nov 2026 (whole store).',
      highlights: [
        { value: '4', label: 'custom features' },
        { value: '5,322', label: 'orders in 2026' },
        { value: '37.71%', label: 'returning customers' },
      ],
      primary: { label: 'Visit store', href: 'https://varakedibleluxury.com' },
    },
    chapters: [
      {
        id: 'problem',
        kicker: 'Chapter 1',
        title: 'The *problem*',
        blocks: [
          {
            type: 'p',
            text: 'Gifting orders are personal. Shoppers pick a size, want a message on the item, need to decide between delivery and collecting from the store, and often add a balloon or candles. Standard Shopify carts give ==one note per order==, no pickup choice, and no prompt to add the extras.',
          },
          { type: 'goal', text: 'Raise **conversion**, **average order value** and **upsell take-up** with changes that feel like part of the brand, not a plugin.' },
        ],
      },
      {
        id: 'journey',
        kicker: 'Chapter 2',
        title: 'Where the shopper *hesitates*',
        blocks: [
          { type: 'p', text: 'I mapped the path from product card to payment and put ==one custom feature on each point of friction==.' },
          {
            type: 'journey',
            steps: [
              { stage: 'Browse', question: 'Which size?', fix: 'Variant picker on cards' },
              { stage: 'Add', question: 'Anything to go with it?', fix: 'Upsell popup' },
              { stage: 'Cart', question: 'Can I add a message and pick up?', fix: 'Note per item · Delivery or pickup' },
              { stage: 'Trust', question: 'Is this brand real?', fix: 'Custom testimonial slider' },
            ],
            extra: 'Plus a build-your-own jar box for shoppers who want to mix flavours.',
          },
        ],
      },
      {
        id: 'upsell',
        kicker: 'Chapter 3',
        title: 'Pick a size on the card, then see *what goes with it*',
        blocks: [
          {
            type: 'p',
            text: 'Size selection moves onto the product card, so a shopper adds to cart without opening the product page. Right after, a popup lists balloons, candles and sparklers with their own Add buttons and a clear **Skip & View Cart**.',
          },
          {
            type: 'feature',
            frame: 'browser',
            url: 'varakedibleluxury.com',
            src: `${VARAK}/upsell.mp4`,
            steps: [
              { title: 'Choose a size', body: 'The variant picker sits on the card. No page change.', at: 0 },
              { title: 'Upsell popup opens', body: 'Frequently added items, priced in AED, one tap each.', at: 3.5 },
              { title: 'Add or skip', body: 'Add-ons go straight to the cart. Skip is always visible at the top.', at: 7 },
            ],
          },
          { type: 'why', text: 'Gift extras are cheap (10 to 45 AED) and easy to forget. Showing them at the moment of adding keeps the decision small.' },
        ],
      },
      {
        id: 'jar-box',
        kicker: 'Chapter 4',
        title: 'Build your own *jar box*',
        blocks: [
          {
            type: 'p',
            text: 'Shoppers choose a set number of jars, change quantities with steppers, and ==the box locks when the count is reached==. The counter tells them exactly how many are left.',
          },
          {
            type: 'feature',
            frame: 'browser',
            url: 'varakedibleluxury.com',
            src: `${VARAK}/builder.mp4`,
            steps: [
              { title: 'Choose the box size', body: 'The flow starts with how many jars.', at: 0 },
              { title: 'Mix flavours', body: 'Steppers per flavour, live count.', at: 6 },
              { title: 'Box complete', body: '“4 of 4 selected” locks the options and enables add to cart.', at: 10.5 },
            ],
          },
        ],
      },
      {
        id: 'cart',
        kicker: 'Chapter 5',
        title: 'A cart drawer that *understands gifts*',
        blocks: [
          {
            type: 'p',
            text: 'Two additions. A **note for each item** (“Happy birthday” goes with the cake, not the order). And a **Delivery or Store Pickup** switch that checks the shopper’s area before checkout.',
          },
          {
            type: 'feature',
            frame: 'phone',
            src: `${VARAK}/cart.mp4`,
            steps: [
              { title: 'Add a note', body: 'Opens an inline editor under the item.', at: 0 },
              { title: 'Autosaves', body: '“Saving…” then the note shows under the product.', at: 3 },
              { title: 'You may also like', body: 'A carousel of extras inside the drawer.', at: 6 },
              { title: 'Delivery or Pickup', body: 'Pickup skips the address check. Delivery asks for an area.', at: 9 },
            ],
          },
          { type: 'drawer' },
        ],
      },
      {
        id: 'reviews',
        kicker: 'Chapter 6',
        title: 'Reviews that *move*',
        blocks: [
          {
            type: 'p',
            text: 'A custom 3D testimonial slider on the home page. The active review sits in the brand green card and ==the neighbours tilt back==, so one review is readable at a time.',
          },
          {
            type: 'image',
            frame: 'browser',
            url: 'varakedibleluxury.com',
            src: `${VARAK}/testimonials.jpg`,
            alt: 'Varak homepage testimonial slider showing a five-star review',
          },
        ],
      },
      {
        id: 'results',
        kicker: 'Chapter 7',
        title: '*Results*',
        blocks: [
          { type: 'p', text: 'Store totals from Shopify Analytics, **1 Jan to 3 Nov 2026**. These are whole-store numbers. They are not split by feature.' },
          {
            type: 'kpis',
            items: [
              { value: '$387.5K', label: 'Total sales' },
              { value: '5,322', label: 'Orders' },
              { value: '$347.7K', label: 'Gross sales' },
              { value: '37.71%', label: 'Returning customers' },
            ],
          },
          {
            type: 'image',
            src: `${VARAK}/analytics.jpg`,
            alt: 'Shopify analytics for Varak, 1 Jan to 3 Nov 2026: total sales 387,542.40, 5,322 orders, 37.71% returning customer rate',
            caption: 'Shopify Analytics · 1 Jan – 3 Nov 2026',
          },
        ],
      },
    ],
  },

  {
    slug: 'offnorth',
    name: 'OffNorth',
    title: 'OffNorth *Fashions*',
    kicker: 'Shopify · India',
    category: 'E-commerce',
    status: 'Complete',
    year: '2024–25',
    summary: 'A redesign that puts proof next to every buying decision.',
    intro:
      'A Supima cotton polo and t-shirt brand from Tirupur. The store sells a premium product in a crowded category, so the redesign focused on proof: why this cotton, why this brand, and what happens if the shopper is not happy.',
    tags: ['Shopify', 'Redesign', 'Mobile-first', 'CRO'],
    meta: [
      { label: 'Role', value: 'Product and build' },
      { label: 'Stack', value: 'Shopify theme, Liquid, JavaScript' },
      { label: 'Market', value: 'India' },
      { label: 'Scope', value: 'Home, collection, product page, footer' },
    ],
    cover: { kind: 'video', src: `${OFFNORTH}/after.mp4` },
    tone: ['#e9e6df', '#5b4a32'],
    facts: {
      problem: 'A good product in a crowded category, on a store that left the buying questions unanswered near the buy button.',
      built: 'A redesign of the home, collection and product pages and the footer that answers one shopper question at each step.',
      outcome: '9,347 orders over 18 months. About 85% of sessions are on mobile, so every change was judged on a phone first.',
      highlights: [
        { value: '9,347', label: 'orders' },
        { value: '85%', label: 'mobile sessions' },
        { value: '35.84%', label: 'returning customers' },
      ],
      primary: { label: 'Visit store', href: 'https://offnorth.com' },
    },
    chapters: [
      {
        id: 'problem',
        kicker: 'The problem',
        title: 'A good product, a store that *did not say so.*',
        blocks: [
          {
            type: 'p',
            text: 'The old store showed the product well but left the buying questions unanswered. A shopper met a hero image, a grid of polos and a long list of colours. ==Nothing near the buy button== said why the cotton is better, who else had bought, how fast it ships or what happens if it does not fit.',
          },
          { type: 'goal', text: 'Make the store carry the proof, so a first-time shopper from an ad has the answers **before they have to ask**.' },
        ],
      },
      {
        id: 'before-after',
        kicker: 'Before and after',
        title: 'Same store, *two experiences.*',
        blocks: [
          { type: 'p', text: 'Screen recordings of the live store, scrolling the home page, a collection and a product page.' },
          {
            type: 'compare',
            url: 'offnorth.com',
            before: { src: `${OFFNORTH}/before.mp4`, caption: 'One hero, a product grid, a plain product page' },
            after: { src: `${OFFNORTH}/after.mp4`, caption: 'Proof on every page' },
          },
        ],
      },
      {
        id: 'changes',
        kicker: 'What changed',
        title: 'Page by *page.*',
        blocks: [
          {
            type: 'tabs',
            tabs: [
              {
                label: 'Home',
                before: ['One hero image and a Shop Now button', 'Announcement bar with a generic line', 'No proof on the page'],
                after: [
                  'Hero that leads with the Exclusive Interlock Supima Polo and the 20% launch offer',
                  'Trust bar: 48-hour delivery, 200% refund guarantee, rated 4.8 by 35,000+ customers',
                  'Counters: 35,000+ happy customers, 2,00,000+ products delivered, 48-hour metro delivery, 4.8 average rating',
                  'Category tiles for Polo, Winter wear and All products',
                ],
              },
              {
                label: 'Collection',
                before: ['Illustrated banner and a filter bar', 'Product cards with price and swatches'],
                after: [
                  'Filters for sleeve type, pattern, size, colour and recommendation',
                  'Cards carry the rating and review count, a discount badge and a wishlist heart',
                  'Green badges: 200% refund guarantee, 14-day return and exchange, same-day dispatch, 48-hour metro delivery',
                ],
              },
              {
                label: 'Product page',
                before: ['Gallery, price, a long list of colours, size, add to cart and buy it now', 'A Why choose Supima block below'],
                after: [
                  'Named colours, in-stock signal, wishlist and a size guide',
                  'Trust strip next to the buy button: 200% refund, world’s finest cotton, rated 4.8',
                  'Spec chips: 220 GSM, 100% Supima cotton, regular fit, single jersey, no colour fade',
                  'Accordions for product details, care, return and exchange, help',
                  'FAQ and related items',
                  'Sticky add-to-cart bar with size, colour and quantity',
                ],
              },
              {
                label: 'Reviews & story',
                before: ['Review list with pagination', 'A story block about the brand'],
                after: ['Review cards with Verified Purchase and a Load more button', 'A short Who are we? story: made in Tirupur, the knit capital of India'],
              },
              {
                label: 'Footer',
                before: ['Company, orders, policies, address and phone'],
                after: ['The same links, plus the 200% refund guarantee stated in full above the phone number'],
              },
            ],
          },
          {
            type: 'why',
            text: 'Each change answers one question a shopper has at that point: Is it good? Is it safe to buy? How fast will it arrive? Can I return it? The answer sits ==next to the decision==, not on a separate page.',
          },
        ],
      },
      {
        id: 'results',
        kicker: 'Results',
        title: 'Store performance, *Apr 2024 to Oct 2025.*',
        blocks: [
          { type: 'p', text: 'Shopify Analytics for the whole store over 18 months. This is lifetime store data. It does not isolate the redesign.' },
          {
            type: 'kpis',
            items: [
              { value: '$183.1K', label: 'Total sales' },
              { value: '9,347', label: 'Orders' },
              { value: '583.9K', label: 'Sessions' },
              { value: '35.84%', label: 'Returning customers' },
            ],
          },
          {
            type: 'image',
            src: `${OFFNORTH}/kpis.jpg`,
            alt: 'Shopify analytics for OffNorth Fashions, 15 Apr 2024 to 31 Oct 2025: gross sales 247,924.49, 9,347 orders, 35.84% returning customer rate',
            caption: 'Shopify Analytics · 15 Apr 2024 – 31 Oct 2025',
          },
          { type: 'image', src: `${OFFNORTH}/sales.jpg`, alt: 'OffNorth sales by channel, average order value 21.26 and top products by sales' },
          {
            type: 'p',
            text: 'Two things stand out. About ==85% of sessions are on mobile== (498.1K of 583.9K), so every change was judged on a phone first. And the best-selling product, the Exclusive Interlock Supima Polo, is the one the new home page and product page lead with.',
          },
        ],
      },
    ],
  },

  {
    slug: 'solxi',
    name: 'SolXi',
    title: 'SolXi: school uniforms, *built not bought*',
    kicker: 'Shopify · India · Pre-launch',
    category: 'E-commerce',
    status: 'Complete',
    year: '2026',
    summary: 'A build-vs-buy call that replaced two paid apps with custom Shopify features: a fitting booking system and a school uniform finder.',
    intro:
      'SolXi sells school uniforms and accessories. Parents shop by school, gender and grade, and many want an in-person fitting first. Shopify handles neither out of the box, so I compared the apps against a custom build, then designed and built both features inside Shopify.',
    tags: ['Build vs buy', 'Shopify Flow', 'Liquid', 'Metaobjects', 'AI-assisted build'],
    meta: [
      { label: 'Role', value: 'Product, design and build' },
      { label: 'Stack', value: 'Shopify theme, Liquid, JavaScript, Shopify Flow, Metaobjects' },
      { label: 'Market', value: 'India (INR)' },
      { label: 'Status', value: 'Built, pre-launch' },
    ],
    cover: { kind: 'video', src: '/work/solxi/find-your-school.mp4' },
    tone: ['#f1e8ea', '#6b1f30'],
    facts: {
      problem: 'Parents need school-specific uniform bundles and in-person fittings; booking and bundle apps cost a monthly fee and could not handle multi-child bookings or school-level search.',
      built: 'Two custom Shopify features with no third-party apps: a multi-child, multi-location fitting booking system and a 4-step Find Your School bundle flow, plus Flow automation that routes bookings and product orders.',
      outcome: 'About $30–40 a month saved in app fees, zero apps to maintain, and a school added in about 15 minutes without a developer. Launch metrics are defined; the store is not live yet.',
      highlights: [
        { value: '$30–40', label: 'saved per month vs apps' },
        { value: '0', label: 'third-party apps' },
        { value: '15 min', label: 'to add a school' },
      ],
    },
    chapters: [
      {
        id: 'problem',
        kicker: 'The problem',
        title: 'Uniforms are bought by school, *not by product.*',
        blocks: [
          {
            type: 'p',
            text: 'A parent does not search for “navy shorts, size 28”. They search for their child’s school, then need the exact items for that gender and grade. Many also want to try sizes in person before they buy. SolXi needed both: ==a school-first shopping flow== and ==a fitting booking system==, in the same store and the same checkout.',
          },
          {
            type: 'p',
            text: 'Shopify has no native appointment booking, and its order confirmation is the same email for every order. A booking and a box of uniforms would look identical to the parent and to the team packing orders.',
          },
          { type: 'goal', text: 'Let a parent go from **school** to **booked fitting** or **checked-out bundle** in a few taps, and let the founder run it all from Shopify admin **without a developer**.' },
        ],
      },
      {
        id: 'decision',
        kicker: 'Build vs buy',
        title: 'Apps were faster to install, *slower to live with.*',
        blocks: [
          { type: 'p', text: 'Before writing code I tested the app route against the requirements. The deciding factors were not features on a pricing page but the edge cases SolXi would hit every day.' },
          {
            type: 'versus',
            options: [
              {
                name: 'Third-party apps',
                verdict: 'Rejected',
                points: [
                  'Recurring cost of about $30–40 a month across booking and bundle apps',
                  'Capacity counted per child, not per family, so a parent with 3 children took 3 places',
                  'No school-level search, gender and grade filtering for bundles',
                  'Extra scripts, a second admin to learn, and booking data outside Shopify',
                  'Generic widgets that did not match the theme',
                ],
              },
              {
                name: 'Custom build in Shopify',
                verdict: 'Chosen',
                chosen: true,
                points: [
                  'No monthly app fees; runs on Shopify features SolXi already pays for',
                  'Multi-child bookings: one family uses one place, however many children',
                  'Schools, venues and bundles managed as Metaobjects in Shopify admin',
                  'Every booking is a ₹0 Shopify order, so reports, exports and customer data stay in one place',
                  'Designed to match the store, desktop and mobile',
                ],
              },
            ],
          },
          { type: 'why', text: 'The custom route cost more effort up front, but it removed a monthly fee, a vendor dependency and ==two limitations the apps could not solve==: multi-child bookings and school-first search.' },
        ],
      },
      {
        id: 'booking',
        kicker: 'Feature 1',
        title: 'Pre-book fitting: *one family, one place.*',
        blocks: [
          { type: 'p', text: 'Parents book a 15 or 30 minute private fitting. The core product decision was the capacity rule: ==each slot holds a number of families, not children==, because a parent arrives with all of their children at once.' },
          {
            type: 'journey',
            steps: [
              { stage: 'School', question: 'Where do I go?', fix: 'Search the school, see its fitting centre' },
              { stage: 'Children', question: 'Can I bring all my kids?', fix: 'Grades and each child’s name in one booking' },
              { stage: 'Slot', question: 'When is free?', fix: 'Date and slot with “X of Y places left”' },
              { stage: 'Confirm', question: 'Is it really booked?', fix: '₹0 checkout and a branded booking email' },
            ],
            extra: 'Plus multiple fitting centres per school, with “Find nearest” sorting centres by distance.',
          },
          {
            type: 'feature',
            frame: 'browser',
            url: 'solxuniform.myshopify.com/pages/pre-book-fitting',
            src: '/work/solxi/fitting-booking.mp4',
            steps: [
              { title: 'Find the school', body: 'Search the school, then pick one of its fitting centres.', at: 0 },
              { title: 'Add the children', body: 'Tap each grade, set how many children and add their names. One booking covers the family.', at: 5 },
              { title: 'Pick a date and slot', body: 'Slots show places left; full slots are greyed out.', at: 12 },
              { title: 'Review and book', body: 'One summary to check, then a ₹0 checkout and the booking email.', at: 16.5 },
            ],
          },
          {
            type: 'table',
            rows: [
              ['Slots', 'One product variant per date and time; stock equals family places left'],
              ['Bookings', 'Each booking is a ₹0 order; the order number is the booking reference'],
              ['Schools and venues', 'Metaobjects in Shopify admin; a new school takes about 15 minutes'],
              ['Slot generator', 'A tool that creates a whole fitting programme as a CSV, skipping Sundays and closed dates'],
              ['Rules', 'A 2-hour booking cut-off, closed days, full slots shown as Full, cancellations restock the place'],
            ],
          },
        ],
      },
      {
        id: 'routing',
        kicker: 'Automation',
        title: 'One checkout, *two kinds of orders.*',
        blocks: [
          { type: 'p', text: 'SolXi sells physical products and fitting bookings through the same checkout. Shopify sends one confirmation email for every order, so I built the logic that ==tells them apart automatically==.' },
          {
            type: 'flow',
            labels: ['Without automation', 'With automation'],
            without: [
              { t: 'Order placed' }, { t: 'Same confirmation email', kind: 'bad' }, { t: 'Parent unsure it is a booking', kind: 'bad' },
              { t: 'Team opens each order', kind: 'break' }, { t: 'Manual sorting', kind: 'bad' },
            ],
            with: [
              { t: 'Order placed' }, { t: 'Flow checks product type', kind: 'ai' }, { t: 'Booking: tag “Fitting Booking”', kind: 'ok' },
              { t: 'Booking email with date, venue, calendar', kind: 'ok' }, { t: 'Product order: standard email' }, { t: 'Filter bookings in Orders', kind: 'ok' },
            ],
            withoutResult: 'Bookings and uniform orders look the same, so parents are unsure and the team sorts orders by hand.',
            withResult: 'Each order gets the right email and a tag, so bookings filter out of the order list in one click.',
          },
          { type: 'image', src: '/work/solxi/flow.jpg', alt: 'Shopify Flow workflow: order created, condition product type is Fitting Appointment, add order tag Fitting Booking', caption: 'Shopify Flow · Fitting Appointment tagging' },
          { type: 'image', src: '/work/solxi/booking-email.jpg', alt: 'SolXi booking confirmation email with date, venue, add to calendar and booking reference', caption: 'Booking email (test booking, personal details blurred)' },
        ],
      },
      {
        id: 'finder',
        kicker: 'Feature 2',
        title: 'Find Your School: *the bundle in four steps.*',
        blocks: [
          { type: 'p', text: 'A school-first bundle flow that runs entirely on Shopify, ==with no bundle app and no external server==. Each bundle is an ordinary Shopify collection, so the team edits it like any other.' },
          {
            type: 'journey',
            steps: [
              { stage: 'School & group', question: 'Which items does my school need?', fix: 'Search school, pick Boys or Girls and grade range' },
              { stage: 'Uniforms', question: 'What size, and do I need all of it?', fix: 'Every item pre-ticked, untick what you don’t need' },
              { stage: 'Add-ons', question: 'Anything else?', fix: 'Bags, bottles, stationery with filter tabs' },
              { stage: 'Checkout', question: 'Can I order for two children?', fix: 'Each child’s bundle stays its own cart line' },
            ],
          },
          {
            type: 'feature',
            frame: 'browser',
            url: 'solxuniform.myshopify.com/pages/find-your-school',
            src: '/work/solxi/find-your-school.mp4',
            steps: [
              { title: 'School and group', body: 'Search the school, choose Boys or Girls and the grade range.', at: 0 },
              { title: 'Uniform items', body: 'Every item in the bundle is ticked; pick sizes and untick what you don’t need.', at: 5 },
              { title: 'Quick view', body: 'Tap any item for photos, details and the size chart.', at: 14 },
              { title: 'Prices after sign-in', body: 'Prices appear once the parent signs in, with choices kept.', at: 20 },
              { title: 'Add-ons and checkout', body: 'Bags, bottles and stationery with filter tabs, then one tap to checkout.', at: 32 },
            ],
          },
          {
            type: 'table',
            rows: [
              ['Data model', 'One Metaobject per school with up to six bundle slots (KG, Primary, Secondary × Boys, Girls)'],
              ['Search and filtering', 'School search, gender and grade-range filters; bundles a school does not offer are greyed out'],
              ['Sizes', 'Variants become a size dropdown; sold-out sizes are disabled and unavailable items drop out'],
              ['Multi-child orders', 'A hidden bundle ID per checkout keeps two children’s bundles as separate lines'],
              ['Price lock', 'Prices hidden until sign-in; choices are kept through the sign-in round trip'],
              ['Size help', 'Per-school size note, size chart drawer and a quick view for every item'],
            ],
          },
        ],
      },
      {
        id: 'build',
        kicker: 'How I built it',
        title: 'AI-assisted, *with a workflow I tuned.*',
        blocks: [
          { type: 'p', text: 'I built both features with **Claude Code** using my own optimized workflow: a written spec first, small reviewable changes, and tests before anything reaches the store. It let one person cover product, design and front-end build in a fraction of the usual time.' },
          {
            type: 'stats',
            items: [
              { value: '35', label: 'automated checks (search, sizes, totals, cart payload, sign-in lock) run during the build' },
              { value: '2', label: 'admin setup guides so the founder can run schools, slots and bundles without a developer' },
              { value: '0', label: 'external servers or build steps; everything ships inside the Shopify theme' },
            ],
          },
        ],
      },
      {
        id: 'docs',
        kicker: 'Documentation',
        title: 'Handover docs, *written for the founder.*',
        blocks: [
          {
            type: 'p',
            text: 'A feature is only finished when the client can run it without me. I wrote ==two setup guides==: one for the founder’s everyday tasks, one with the developer detail, so ==adding a school or opening new slots never needs a developer==.',
          },
          {
            type: 'docs',
            items: [
              {
                title: 'Pre-Book Fitting: Founder Setup Guide',
                kind: 'Founder guide',
                pages: 5,
                body: 'How the booking system works, adding a school in 15 minutes, multi-location centres and everyday tasks.',
                covers: ['/work/solxi/docs/solxi-pre-book-fitting-setup-guide-p1.jpg', '/work/solxi/docs/solxi-pre-book-fitting-setup-guide-p2.jpg'],
                points: ['Add a school in 6 steps', 'Everyday tasks table', 'Naming rules and limits', 'Troubleshooting'],
                file: '/work/solxi/docs/solxi-pre-book-fitting-setup-guide.pdf',
              },
              {
                title: 'Find Your School: Admin & Developer Guide',
                kind: 'Admin + developer guide',
                pages: 12,
                body: 'Products, bundle collections and schools for admins; data flow, files, data model and cart payload for developers.',
                covers: ['/work/solxi/docs/solxi-find-your-school-setup-guide-p1.jpg', '/work/solxi/docs/solxi-find-your-school-setup-guide-p2.jpg'],
                points: ['3 admin setup guides', 'Publishing checklist', 'Data model and cart payload', 'Testing and gotchas'],
                file: '/work/solxi/docs/solxi-find-your-school-setup-guide.pdf',
              },
            ],
          },
        ],
      },
      {
        id: 'outcome',
        kicker: 'The outcome',
        title: 'Ready to launch, *with metrics defined.*',
        blocks: [
          { type: 'p', text: 'Both features are built and tested; the store is ==not launched yet==, so there are no live conversion numbers. What is already true: about **$30–40 a month** saved against the app route, zero apps to maintain, and booking data that lives in Shopify orders.' },
          {
            type: 'metrics',
            items: [
              { metric: 'Booking completion rate', why: 'Share of parents who start the fitting flow and receive a booking email' },
              { metric: 'Fitting no-show rate', why: 'Tests whether the reminder email and calendar link are enough' },
              { metric: 'Orders through Find Your School', why: 'Share of uniform orders that start from the school flow' },
              { metric: 'Size-related returns and queries', why: 'Checks whether size charts and fittings reduce wrong sizes' },
              { metric: 'Time to add a school', why: 'Target under 15 minutes, done by the founder without a developer' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'theliv',
    name: 'Theliv',
    title: 'Theliv: from messy client inputs to *clear design briefs*',
    kicker: 'Own product · MVP',
    category: 'Product',
    status: 'Complete',
    year: '2026',
    summary: 'From messy client inputs to clear design briefs, with a PRD, deck and live MVP.',
    intro:
      'Designers work with scattered inputs like notes, references and client feedback across different tools. Theliv turns a discovery call into a brief the client signs off.',
    tags: ['Product Discovery', 'Friction Analysis', 'MVP', 'RAG'],
    meta: [
      { label: 'Role', value: 'Product definition, design and build' },
      { label: 'Type', value: 'Own product · 0 to 1' },
      { label: 'Status', value: 'PRD v1.0 · working MVP' },
      { label: 'Period', value: 'March 2026' },
    ],
    tone: ['#e5e7ee', '#34406a'],
    facts: {
      problem: 'Designers start client work from incomplete, contradictory inputs, which leads to 3 to 5 revision cycles per project.',
      built: 'A RAG-powered design context assistant that captures client input, asks clarifying questions and generates a brief the client signs off.',
      outcome: 'PRD v1.0 and a working MVP. The goal is 20–40% fewer revision cycles. These are targets, not measured results yet.',
      highlights: [
        { value: '3–5', label: 'revision cycles today' },
        { value: '20–40%', label: 'fewer revisions (goal)' },
        { value: 'MVP', label: 'live prototype' },
      ],
      primary: { label: 'Try the MVP', href: 'https://theliv.base44.app/' },
    },
    chapters: [
      {
        id: 'problem',
        kicker: 'The problem',
        title: 'Designs start on guesswork, and *the client says no.*',
        blocks: [
          {
            type: 'p',
            text: 'Web designers working on client projects ==consistently start design work with incomplete, contradictory, or misunderstood inputs==. Discovery has no structure, clients use subjective language, and references arrive with no annotation. Designers fill the gaps with assumptions.',
          },
          {
            type: 'p',
            text: 'The result is a first draft the client did not expect, and a ==3 to 5 revision cycle== that burns time on both sides. I framed it as a ==tooling problem, not a discipline problem==. Designers already have Figma, Notion and Loom. Nothing turns the chaos of a discovery call into a decision-ready brief.',
          },
          {
            type: 'flow',
            without: [
              { t: 'Discovery call' }, { t: 'Client explains project' }, { t: 'References arrive' }, { t: 'Low context' },
              { t: 'Designer interprets', kind: 'break' }, { t: 'Manual guesswork' }, { t: 'Design starts', kind: 'bad' },
              { t: 'Built on memory' }, { t: 'First draft shared', kind: 'bad' }, { t: 'Client says no', kind: 'bad' },
              { t: 'Revisions begin', kind: 'bad' }, { t: 'Repeat cycle' }, { t: '10 to 25 hours lost', kind: 'bad' },
            ],
            with: [
              { t: 'Discovery call' }, { t: 'Capture context' }, { t: 'Project created' },
              { t: 'AI asks a clarification question', kind: 'ai' }, { t: 'Designer taps an answer' },
              { t: 'Report generated', kind: 'ai' }, { t: 'Confirmed brief' }, { t: 'Client signs off', kind: 'ok' }, { t: 'Design begins', kind: 'ok' },
            ],
            withoutResult: 'The designer guesses at the break point, the first draft misses, and the cycle repeats.',
            withResult: 'The designer works from a confirmed brief, so the first draft starts from what the client actually said.',
          },
        ],
      },
      {
        id: 'insight',
        kicker: 'The insight',
        title: 'It is an information problem, *not a skill problem.*',
        blocks: [
          {
            type: 'stats',
            items: [
              { value: '75%', label: 'of designers go through 3 to 5 revision rounds per project' },
              { value: '48%', label: 'of those revisions trace back to unclear or misread inputs from the discovery call' },
              { value: '12–25h', label: 'wasted per project guessing what the client meant' },
            ],
          },
        ],
      },
      {
        id: 'build',
        kicker: 'The build',
        title: 'A RAG-powered *design context assistant.*',
        blocks: [
          {
            type: 'p',
            text: 'The focus is on ==eliminating assumption-based design starts== by capturing and structuring client context ==before the first pixel is placed==. Theliv stores, retrieves and reasons over client inputs, asks clarifying questions where something is missing, and generates a structured design direction report the client signs off.',
          },
          {
            type: 'table',
            rows: [
              ['Target user', 'Freelance and agency web designers running client projects'],
              ['Core problem', 'Vague inputs and missing context cause 3 to 5 expensive revision cycles per project'],
              ['MVP scope', 'Structured input capture, design direction report, conflict and gap detection'],
              ['Success signal', 'Revision cycles reduced 20 to 40 percent within 3 months of use'],
              ['Status', 'PRD v1.0 (March 2026), working prototype built in Base44'],
            ],
          },
        ],
      },
      {
        id: 'outcome',
        kicker: 'The outcome',
        title: 'A confirmed brief to work from, *not a memory of a call.*',
        blocks: [
          {
            type: 'p',
            text: 'The product targets ==20 to 40% fewer revision cycles== and ==30% less time from discovery to brief==. These are the goals set in the PRD. They are not measured results yet.',
          },
          { type: 'p', text: 'I also recorded a video about the product and submitted it to **VibeCon India 2026**, the event by Y Combinator and Emergent Labs.' },
        ],
      },
      {
        id: 'resources',
        kicker: 'See it yourself',
        title: 'Everything *behind Theliv.*',
        blocks: [
          {
            type: 'links',
            items: [
              { kind: 'Prototype', title: 'Live MVP', body: 'Try the working product.', href: 'https://theliv.base44.app/', cta: 'Open' },
              { kind: 'Video', title: 'VibeCon India 2026', body: 'Submission to the Y Combinator and Emergent Labs event.', href: 'https://canva.link/cmmklonfjn7u453', cta: 'Watch' },
              { kind: 'Slide deck · 11 slides', title: 'Improving design decisions before design starts', body: 'The full story in slides.', href: 'https://canva.link/2x0fnaw0qhq3sdj', cta: 'View' },
              { kind: 'PRD · v1.0', title: 'Design Context Assistant', body: 'Requirements, scope and success signals.', href: 'https://docs.google.com/document/d/1QPE36ouNQNgOMuKUCo3c-c4Ma9bT3YI0MlTYwLNtSAY/preview?tab=t.0', cta: 'Read' },
              { kind: 'Notion', title: 'Full case study', body: 'The original write-up.', href: 'https://l1nq.com/nexyebk', cta: 'Read' },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'finly',
    name: 'Finly',
    title: 'Making the future impact of *financial decisions* visible',
    kicker: 'Own product · Fintech',
    category: 'Product',
    status: 'In progress',
    year: '2026',
    summary: 'A decision clarity tool that shows the short and long term impact of a financial choice before you commit.',
    intro:
      'A decision clarity tool that helps professionals understand the short and long term impact of a financial choice before they commit, so they can spend with more confidence.',
    tags: ['Product Discovery', 'Friction Analysis', 'MVP', 'User research'],
    meta: [
      { label: 'Role', value: 'Product definition, design and build' },
      { label: 'Type', value: 'Own product · 0 to 1' },
      { label: 'Status', value: 'Working MVP' },
      { label: 'Period', value: '2026' },
    ],
    tone: ['#e3ebe9', '#235a55'],
    facts: {
      problem: 'Professionals make spending choices without seeing what they do to the rest of the month and the years ahead.',
      built: 'A decision clarity tool that shows the short and long term impact of a choice before you commit.',
      outcome: 'A working MVP. The full write-up is on Notion.',
      highlights: [{ value: 'MVP', label: 'live prototype' }],
      primary: { label: 'Try the MVP', href: 'https://finlymga.base44.app/' },
    },
    chapters: [
      {
        id: 'problem',
        kicker: 'The problem',
        title: 'People commit first and *see the cost later.*',
        blocks: [
          { type: 'p', text: 'Professionals make spending choices without seeing what those choices do to the rest of the month and to the years ahead. ==Clarity arrives after the decision.==' },
          {
            type: 'links',
            items: [
              { kind: 'Prototype', title: 'Live MVP', href: 'https://finlymga.base44.app/', cta: 'Open' },
              { kind: 'Notion', title: 'Full case study', href: 'https://l1nq.com/92933ro', cta: 'Read' },
            ],
          },
          { type: 'pending', text: 'The full story, with research, the build and the outcome, is being written up here. Until then, the Notion case study has the details.' },
        ],
      },
    ],
  },

  {
    slug: 'google-forms',
    name: 'Google Forms',
    title: 'Improving the quality of *open-ended* responses in survey tools',
    kicker: 'Product improvement',
    category: 'Product',
    status: 'In progress',
    year: '2026',
    summary: 'Guiding users to give useful answers in survey tools.',
    intro: 'Users give short answers without guidance. That leads to poor data and weak product decisions.',
    tags: ['User research', 'Friction Analysis', 'Behavioral Insights', 'Prioritization (RICE)'],
    meta: [
      { label: 'Type', value: 'Product improvement' },
      { label: 'Product', value: 'Google Forms' },
      { label: 'Methods', value: 'User research, RICE' },
      { label: 'Period', value: '2026' },
    ],
    tone: ['#e8e4ef', '#4f3c7a'],
    facts: {
      problem: 'Respondents give short answers to open-ended questions, so teams decide on thin evidence.',
      built: 'A feature concept that guides respondents towards useful answers, prioritised with RICE.',
      outcome: 'Full write-up in progress.',
      highlights: [{ value: 'RICE', label: 'prioritised' }],
    },
    chapters: [
      {
        id: 'problem',
        kicker: 'The problem',
        title: 'Short answers, *weak decisions.*',
        blocks: [
          {
            type: 'p',
            text: 'Open-ended questions are where the useful detail lives, and respondents ==give short answers without guidance==. The people reading the data end up deciding on thin evidence.',
          },
          { type: 'pending', text: 'The research, the feature idea and the RICE scores are being written up.' },
        ],
      },
    ],
  },

  {
    slug: 'outx',
    name: 'OutX',
    title: 'OutX: strong signals, *broken growth engine*',
    kicker: 'Growth · B2B SaaS',
    category: 'Product',
    status: 'In progress',
    year: '2026',
    summary: 'Turning accidental traffic into a growth loop.',
    intro: 'OutX does not have a signal problem. It has a growth system problem.',
    tags: ['Market Research', 'Growth Loop', 'Competitor analysis', 'Network Effects'],
    meta: [
      { label: 'Type', value: 'Growth strategy' },
      { label: 'Product', value: 'OutX · B2B SaaS' },
      { label: 'Methods', value: 'Failure workflow analysis, growth loops' },
      { label: 'Period', value: '2026' },
    ],
    tone: ['#ece6dc', '#7a4a1f'],
    facts: {
      problem: 'OutX gets accidental traffic and isolated wins, but nothing turns first signals into repeat growth.',
      built: 'A product-led growth redesign that turns those signals into a structured growth loop.',
      outcome: 'Full write-up in progress.',
      highlights: [{ value: 'PLG', label: 'growth loop' }],
    },
    chapters: [
      {
        id: 'story',
        kicker: 'The story',
        title: 'From accidental traffic to *a loop that compounds.*',
        blocks: [
          {
            type: 'p',
            text: 'I redesigned OutX as a B2B SaaS product-led growth product by turning ==accidental traffic and isolated wins into a structured growth loop== that reliably converts first signals into ==compounding acquisition and revenue==.',
          },
          { type: 'pending', text: 'The failure analysis, the loop diagram and the proposed changes are being written up.' },
        ],
      },
    ],
  },

  {
    slug: 'whatsapp',
    name: 'WhatsApp',
    title: 'Reducing *forgotten replies* in WhatsApp conversations',
    kicker: 'Product improvement',
    category: 'Product',
    status: 'In progress',
    year: '2026',
    summary: 'Unread is a trigger. Reading removes it.',
    intro: 'Users forget to reply after reading messages. Unread acts as a trigger. Reading removes it.',
    tags: ['User research', 'Failure Workflow Analysis', 'Behavioral Design', 'Prioritization'],
    meta: [
      { label: 'Type', value: 'Product improvement' },
      { label: 'Product', value: 'WhatsApp' },
      { label: 'Methods', value: 'User research, behavioural design' },
      { label: 'Period', value: '2026' },
    ],
    tone: ['#e2ebe3', '#2c6a3f'],
    facts: {
      problem: 'The unread badge is the reminder. Opening the chat removes it, so the reply depends on memory.',
      built: 'Reply Later, a feature that keeps the reminder after you read.',
      outcome: 'Full write-up in progress.',
      highlights: [{ value: 'Reply Later', label: 'feature concept' }],
    },
    chapters: [
      {
        id: 'insight',
        kicker: 'The insight',
        title: 'The reminder disappears *at the moment you read.*',
        blocks: [
          {
            type: 'p',
            text: 'The unread badge works as a reminder. The second you open the chat, ==the trigger is gone== and the reply depends on memory. A feature called **Reply Later** is my answer.',
          },
          { type: 'pending', text: 'The research findings, the feature design and how I would measure it are being written up.' },
        ],
      },
    ],
  },
]
