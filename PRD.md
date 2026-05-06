# Product Requirements Document — Maison Aurore

**Version:** 1.0  
**Date:** May 2026  
**Status:** Implemented (v1.0 complete)

---

## 1. Executive Summary

Maison Aurore is a direct-to-consumer artisan jewellery brand selling exclusively handmade necklaces and bracelets. The website serves as the primary sales channel, brand storytelling platform, and community hub for a conscious luxury consumer audience.

The site must communicate three pillars simultaneously:
1. **Sustainability** — 100% recycled metals, ethical stone sourcing, carbon-neutral packaging
2. **Craftsmanship** — hand-made in London, single-maker production, heirloom quality
3. **Design excellence** — two collections (Modern, Timeless) with distinct aesthetic identities

The primary business goal is conversion — turning first-time visitors into paying customers and loyal brand advocates.

---

## 2. Target Audience

### Primary: The Conscious Luxury Consumer
- **Age:** 28–45
- **Income:** Professional, disposable income £50k+
- **Values:** Environmental awareness, authenticity, craftsmanship over consumption
- **Behaviour:** Researches thoroughly before purchasing, reads brand stories, checks sustainability credentials
- **Pain points:**
  - Scepticism of "greenwashing" — wants proof, not claims
  - Frustration with fast fashion jewellery that tarnishes or breaks
  - Desire for jewellery that feels personal and meaningful, not mass-produced

### Secondary: The Gift Buyer
- **Age:** 30–55
- **Occasion:** Milestone gifts (birthdays, anniversaries, new babies, achievements)
- **Behaviour:** Higher spend tolerance for gifts, needs confidence in quality
- **Need:** Clear pricing, gifting context, product descriptions that justify the price

### Tertiary: The Design-Led Consumer
- **Age:** 25–40
- **Motivation:** Aesthetic interest, design intelligence, self-expression
- **Behaviour:** Discovery-led (Instagram, editorial content), values the "story" aesthetic
- **Need:** Beautiful visual experience, collection narrative, editorial vocabulary

---

## 3. Business Model

- **Revenue type:** Direct-to-consumer e-commerce (no wholesale in v1)
- **Price range:** £150–£350 (necklaces), £150–£340 (bracelets)
- **Margins:** Premium artisan margins — target 60–70% gross margin
- **AOV target:** £220–£250 (single piece or two-piece stack)
- **Growth levers:** Email list, repeat purchase, bespoke commissions, brand partnerships

---

## 4. Product Catalogue

### Necklaces (6 SKUs)

| Name | Collection | Price | Key Material |
|---|---|---|---|
| Solstice Pendant | Modern | £285 | 18k Recycled Yellow Gold |
| Horizon Bar | Modern | £175 | 14k Recycled White Gold |
| Roots Chain | Modern | £310 | 18k Recycled Yellow Gold |
| Forest Thread | Timeless | £195 | Recycled Silver + Green Tourmaline |
| Luna Arc | Timeless | £240 (sale from £270) | 14k Recycled Yellow Gold |
| Bloom Pendant | Timeless | £220 | 18k Recycled Rose Gold + Rose Quartz |

### Bracelets (6 SKUs)

| Name | Collection | Price | Key Material |
|---|---|---|---|
| Weave Cuff | Modern | £340 | 18k Recycled Yellow Gold |
| Arc Stack (set) | Modern | £275 (sale from £315) | 14k Recycled Yellow, White, Rose Gold |
| Slab Bangle | Modern | £150 | Recycled Sterling Silver |
| Pebble Bracelet | Timeless | £165 | Recycled Sterling Silver |
| Tendril Wrap | Timeless | £195 | 14k Recycled Yellow Gold |
| Knot Bracelet | Timeless | £210 | 18k Recycled Yellow Gold |

### Collections
- **The Modern Collection:** Geometric, architectural, minimal. Bold silhouettes.
- **The Timeless Collection:** Organic, botanical, natural forms. Enduring and personal.

---

## 5. Pages & Features

### 5.1 Homepage `/`

**Purpose:** Brand discovery, emotional connection, collection entry  
**Conversion goal:** Click-through to collection pages or product pages

**Sections (in order):**

| # | Section | Purpose | CTA |
|---|---|---|---|
| 1 | Sticky Navigation | Persistent access to all key pages | — |
| 2 | Hero | Brand positioning, first impression | "Shop Necklaces" + "Shop Bracelets" |
| 3 | Features (4 pillars) | Overcome objections, build trust | Informational |
| 4 | Collections Showcase | Route users to category intent | "Explore Modern" / "Explore Timeless" |
| 5 | Mid-page CTA Banner (gold) | New arrivals urgency, seasonal hook | "See New Pieces" |
| 6 | Bestsellers grid | Social proof via curation, quick browse | Links to product pages |
| 7 | Craftsmanship section | Justify price, deepen brand connection | Informational |
| 8 | Sustainability section | Address ethical credentials, remove purchase barriers | Informational |
| 9 | Mid-page CTA Banner (dark) | Bespoke services, higher-value conversion | "Enquire About Bespoke" |
| 10 | Testimonials | Social proof, emotional validation | Informational |
| 11 | Newsletter | Email capture, 10% incentive | "Join Now — Get 10% Off" |
| 12 | Footer | Navigation hub, sustainability pledges, legal | — |

---

### 5.2 Necklaces Collection Page `/collections/necklaces`

**Purpose:** Category browsing, product discovery  
**Conversion goal:** Click-through to product detail pages

**Features:**
- Collection hero with breadcrumb navigation
- Product count display
- Products split by collection: Modern (3) and Timeless (3)
- Each collection has its own heading and styling
- Sustainability trust bar
- Bespoke CTA at bottom
- Newsletter section
- Footer

---

### 5.3 Bracelets Collection Page `/collections/bracelets`

Identical structure to necklaces collection page with bracelet-specific copy and products.

---

### 5.4 Product Detail Pages `/collections/necklaces/[slug]` and `/collections/bracelets/[slug]`

**Purpose:** Final conversion step  
**Conversion goal:** "Add to Bag" click

**Features:**

| Feature | Description |
|---|---|
| Breadcrumb | Home > Necklaces/Bracelets > Product Name |
| Product image | 3:4 gradient placeholder (real image: `next/image`) |
| Badges | New Arrival, Bestseller on image |
| Sustainability overlay | Sustainability note on image, always visible |
| Collection tag | Links back to filtered collection |
| Product name & subtitle | Clear H1 hierarchy |
| Pricing | Current price + original price if on sale |
| Short description | 1-sentence emotional hook |
| Long description | 3–4 sentence provenance/craft story |
| Add to Bag | Primary CTA with price in button label |
| Wishlist button | Secondary icon action |
| Trust indicators | Free Delivery / 30-Day Returns / Lifetime Care |
| Materials list | Bulleted, each with gold dot |
| Dimensions | Technical detail |
| Care instructions | Longevity guidance |
| Sustainability callout | Green-bordered box with shield icon |
| Related products | Up to 4 products from same collection |

---

### 5.5 404 Page `/not-found`

Brand-consistent 404 with editorial copy ("This piece has moved on") and two recovery CTAs.

---

## 6. Navigation Architecture

```
/                         Homepage
/collections/necklaces    Necklaces collection
/collections/bracelets    Bracelets collection
/collections/necklaces/[slug]   Necklace product detail
/collections/bracelets/[slug]   Bracelet product detail
```

**Navigation bar links:**
- Necklaces → `/collections/necklaces`
- Bracelets → `/collections/bracelets`
- Collections → `/#collections` (homepage anchor)
- Our Story → `/#our-story` (homepage anchor)

---

## 7. Conversion Optimisation Features

### Social Proof
- Testimonials section with 4 detailed reviews
- Aggregate stats: 4.9 rating, 2,400+ reviews, 94% recommend
- Bestseller badges on product cards
- "From Our Community" section header

### Trust Signals
- RJC Certification badge
- Sustainability pledges in footer bar
- Lifetime maintenance guarantee (footer + product detail)
- Free delivery + 30-day returns trust indicators
- "London Studio — Est. 2018" provenance
- Material provenance details on every product

### Urgency & Scarcity
- "New Arrival" badge system
- Seasonal CTA banners ("The Spring Edit has arrived")
- Bestseller labelling

### Email Capture
- Newsletter with explicit value exchange: 10% off first order
- Positioned mid-lower page (after content builds trust)
- Post-submit confirmation state with personalised copy

### High-Converting CTA Placement
- Hero: dual CTAs above fold (necklaces + bracelets)
- After features section: collection exploration
- Mid-page gold banner: seasonal/new arrivals
- Mid-page dark banner: bespoke/high-value
- Product cards: hover "Add to Bag" overlay
- Product detail: prominent "Add to Bag — £XXX" with price
- Collection pages: bespoke CTA at bottom

---

## 8. Technical Specifications

### Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16 with App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Fonts | Google Fonts via `next/font/google` |
| Package manager | Bun |
| Rendering | Server Components by default; `"use client"` only for Navigation and Newsletter form |

### Performance Considerations
- Server Components used everywhere except interactive UI (Navigation scroll state, Newsletter form)
- `generateStaticParams` on all product detail pages for static generation
- Fonts loaded with `next/font` (automatic optimisation, no FOUT)
- Images: gradient placeholders ready for `next/image` replacement
- No external JS dependencies beyond Next.js

### SEO
- Dynamic `generateMetadata` on all product pages
- Root layout metadata with `title.template`
- Open Graph tags in root layout
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, proper H1→H2→H3 hierarchy
- Breadcrumb navigation on collection and product pages
- `alt` text present on all image elements

### Accessibility
- `aria-label` on all icon-only buttons (search, bag, wishlist, menu)
- Focus management on mobile nav
- Sufficient colour contrast (WCAG AA) across all colour pairs
- Semantic heading hierarchy per page

---

## 9. Content Strategy

### Voice & Tone
- **Authoritative** — writes from a position of expertise, not aspiration
- **Unhurried** — long-form product descriptions; never rushing the sale
- **Material-specific** — names exact alloys, carat weights, stone origins
- **Emotionally intelligent** — jewellery is about memory, identity, and meaning

### Key Copy Themes
1. The piece has a origin story (where the material came from, what inspired the form)
2. The maker's hand is referenced — one person, one piece
3. Sustainability is fact-based, not sentimental ("100% recycled gold from RJC-certified sources" not "kinder to the planet")
4. Time is celebrated — "worn for a lifetime", "heirloom quality", "worn for twenty years"

---

## 10. Future Roadmap

### Phase 2 (Next Quarter)
- [ ] Real product photography integration (replacing gradient placeholders)
- [ ] Shopping cart and checkout flow
- [ ] User accounts / order history
- [ ] Wishlist persistence
- [ ] Product filtering and sorting on collection pages
- [ ] Size guide modal/page

### Phase 3
- [ ] Bespoke commission enquiry form with project brief inputs
- [ ] The Aurore Journal (blog/editorial content)
- [ ] Instagram feed integration
- [ ] Gift wrapping selection at checkout
- [ ] Jewellery care guide content pages

### Phase 4
- [ ] Loyalty/rewards programme
- [ ] Email automation (post-purchase, birthday, care reminders)
- [ ] Reviews system (real data replacing static testimonials)
- [ ] Analytics dashboard for conversion tracking
- [ ] A/B testing infrastructure for CTA variants

---

## 11. Success Metrics

| Metric | Target (Month 3) |
|---|---|
| Homepage → Collection click-through rate | > 35% |
| Collection → Product page conversion | > 25% |
| Product page → Add to Bag | > 8% |
| Email signup conversion | > 4% of sessions |
| Average session duration | > 3 minutes |
| Bounce rate | < 55% |
| Mobile conversion rate | ≥ 60% of desktop rate |

---

## 12. Out of Scope (v1)

- Shopping cart and checkout (payment processing)
- User authentication / accounts
- CMS / content management
- Real-time inventory management
- Product search functionality
- Third-party review platform integration
- Live chat
- International shipping / currency switching
