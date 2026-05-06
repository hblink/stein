# Product Requirements Document — Maison Aurore

**Version:** 1.2  
**Last updated:** 6 May 2026  
**Status:** v1.2 implemented and deployed

### Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | May 2026 | Initial build — all pages, components, product data |
| 1.1 | May 2026 | Bug fix: `"use client"` added to `ProductCard` (onClick handler) |
| 1.1 | May 2026 | Bug fix: Hero section invisible before hydration — rewrote as `SlideVisual` component, added explicit `backgroundColor` on `<section>` |
| 1.2 | May 2026 | Hero redesigned as 3-slide auto-advancing slider; Product detail page fully rebuilt with gallery, tabs, stock indicator, qty stepper, size selector, wishlist toggle, share buttons, maker bio |

---

## 1. Executive Summary

Maison Aurore is a direct-to-consumer artisan jewellery brand selling exclusively handmade necklaces and bracelets. The website is the primary sales channel, brand storytelling platform, and community hub for a conscious luxury consumer audience.

Three brand pillars are communicated at every touchpoint:
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
- **Need:** Clear pricing, size guidance, gifting context, product descriptions that justify the price

### Tertiary: The Design-Led Consumer
- **Age:** 25–40
- **Motivation:** Aesthetic interest, design intelligence, self-expression
- **Behaviour:** Discovery-led (Instagram, editorial content), values the "story" aesthetic
- **Need:** Beautiful visual experience, collection narrative, editorial vocabulary

---

## 3. Business Model

- **Revenue type:** Direct-to-consumer e-commerce (no wholesale in v1)
- **Price range:** £150–£340 (bracelets), £175–£310 (necklaces)
- **Margins:** Premium artisan margins — target 60–70% gross margin
- **AOV target:** £220–£250 (single piece or two-piece stack)
- **Growth levers:** Email list, repeat purchase, bespoke commissions, brand partnerships

---

## 4. Product Catalogue

### Necklaces (6 SKUs)

| Name | Collection | Price | Key Material | Stock | Sizes |
|---|---|---|---|---|---|
| Solstice Pendant | Modern | £285 | 18k Recycled Yellow Gold | 3 | — |
| Horizon Bar | Modern | £175 | 14k Recycled White Gold | 7 | — |
| Roots Chain | Modern | £310 | 18k Recycled Yellow Gold | 1 | — |
| Forest Thread | Timeless | £195 | Recycled Silver + Green Tourmaline | 5 | — |
| Luna Arc | Timeless | £240 ~~£270~~ | 14k Recycled Yellow Gold | 2 | — |
| Bloom Pendant | Timeless | £220 | 18k Recycled Rose Gold + Rose Quartz | 4 | — |

### Bracelets (6 SKUs)

| Name | Collection | Price | Key Material | Stock | Sizes |
|---|---|---|---|---|---|
| Weave Cuff | Modern | £340 | 18k Recycled Yellow Gold | 1 | — |
| Arc Stack (set) | Modern | £275 ~~£315~~ | 14k Recycled Yellow, White, Rose Gold | 4 | XS–L |
| Slab Bangle | Modern | £150 | Recycled Sterling Silver | 8 | S/M/L |
| Pebble Bracelet | Timeless | £165 | Recycled Sterling Silver | 6 | — |
| Tendril Wrap | Timeless | £195 | 14k Recycled Yellow Gold | 5 | — |
| Knot Bracelet | Timeless | £210 | 18k Recycled Yellow Gold | 3 | — |

### Data Model per Product
Each product carries:
- `gallery: string[]` — 4 CSS gradient placeholders (Studio, Detail, Styled, Worn views)
- `stockCount: number` — drives stock indicator and quantity stepper cap
- `tags: string[]` — rendered as pill badges in the Description tab
- `sizes?: string[]` — optional; renders size selector when present

### Collections
- **The Modern Collection:** Geometric, architectural, minimal. Bold silhouettes.
- **The Timeless Collection:** Organic, botanical, natural forms. Enduring and personal.

---

## 5. Pages & Features

### 5.1 Homepage `/`

**Purpose:** Brand discovery, emotional connection, collection entry  
**Conversion goal:** Click-through to collection or product pages

| # | Section | Purpose | CTA |
|---|---|---|---|
| 1 | Sticky Navigation | Persistent access to all key pages | — |
| 2 | **Hero Slider** (3 slides) | Brand positioning, collection entry points, first impression | Per-slide CTAs |
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

### 5.2 Hero Slider (detail) _(new in v1.2)_

The hero is a 3-slide auto-advancing client-side slider:

| Slide | Theme | Background | SVG Visual | Primary CTA |
|---|---|---|---|---|
| 1 | "Wear the Story of the Earth" | Forest green radial | Necklace + bracelet silhouettes | Shop Necklaces |
| 2 | "Architecture for the Body" | Near-black with gold glow | Geometric polygon | Explore Modern |
| 3 | "Nature, Memory, and the Eternal" | Warm dark brown | Moon arc + botanical vine | Explore Timeless |

**Behaviour:**
- Auto-advances every 5,500ms
- Pauses on mouse hover
- Cross-fade (350ms opacity) on all content: background, glow, headline, sub, CTAs, stats, SVG visual
- Dot indicators with animated progress bar (fills during slide duration)
- Prev/Next arrow controls
- Slide counter (01/03) top-right on desktop

---

### 5.3 Collection Pages `/collections/necklaces` and `/collections/bracelets`

**Purpose:** Category browsing, product discovery  
**Conversion goal:** Click-through to product detail pages

- Collection hero with breadcrumb, category headline, product counts
- Products split into two labelled grids: Modern (3) and Timeless (3)
- Sustainability icon strip
- Bespoke CTA (light variant)
- Newsletter section + Footer

---

### 5.4 Product Detail Pages _(fully redesigned in v1.2)_

`/collections/necklaces/[slug]` and `/collections/bracelets/[slug]`

**Purpose:** Final conversion step  
**Conversion goal:** "Add to Bag" click  
**Rendering:** `"use client"` — all interactive state managed locally

#### Layout
Two-column `[1fr 1px 1fr]` on desktop with a visible blush-coloured vertical divider.

#### Left Column — Image Gallery

| Element | Detail |
|---|---|
| Main image | 4:5 aspect ratio; CSS gradient (→ real `next/image`); 500ms cross-fade on thumbnail switch |
| View label overlay | "Studio / Detail / Styled / Worn" — bottom-left, backdrop-blur |
| Prev/Next arrows | Overlaid on main image; navigate through gallery array |
| Thumbnail strip | `grid-cols-4`; 1:1 squares; active = gold ring + ring-offset; each labelled |
| Badges | New Arrival, Bestseller, Sale — top-left of main image |
| Share buttons | Facebook, Pinterest, Twitter/X — below thumbnails |

#### Right Column — Purchase Info

| Element | Behaviour |
|---|---|
| Collection tag | Links to `?collection=modern/timeless` filtered view |
| H1 + subtitle | Playfair Display 400 |
| Price | Shows current price; struck-through original price if on sale; "Save £X" in gold |
| Short description | 1-sentence hook; visually separated by bottom border |
| **Stock indicator** | Green dot = in stock; Amber dot = only N left (≤2); Red dot = out of stock |
| **Size selector** | Rendered only if `product.sizes` exists; selected = forest bg/text; inactive = border |
| **Quantity stepper** | −/qty/+ bordered control; qty capped to `stockCount` |
| **Add to Bag** | Primary CTA; shows price × qty; confirmed state = checkmark + "Added to Bag" for 2.5s; disabled if out of stock |
| **Wishlist** | Heart icon; toggles fill; state persists for session |
| Ask a Question | Secondary full-width button; chat bubble icon |
| Trust strip | 3-up: Free Delivery (over £150) / 30-Day Returns / Lifetime Care |
| **Tabbed content** | See below |
| **Maker bio** | Studio avatar + name + location + bio + "Meet the maker" link |

#### Tabbed Content (3 tabs)

| Tab | Content |
|---|---|
| **Description** | Long description paragraph; dimensions block; tag pill badges; SKU + category link |
| **Materials & Care** | Bulleted materials list (gold dot markers); care instructions paragraph; sustainability callout box (forest-tinted border, shield icon) |
| **Shipping & Returns** | Dispatch timeline (1–3 days standard; 7–10 days for made-to-order); 4 delivery options (UK Standard / UK Express / Europe / International) with prices; 30-day returns policy |

#### Related Products
4-up product card grid from the same collection, in cream-dark section below the main layout.

---

### 5.5 404 Page `/not-found`

Brand-consistent 404 with editorial copy ("This piece has moved on") and two recovery CTAs: Return Home + Shop Collection.

---

## 6. Navigation Architecture

```
/                                    Homepage (with hero slider)
/collections/necklaces               Necklaces collection
/collections/bracelets               Bracelets collection
/collections/necklaces/[slug]        Necklace product detail
/collections/bracelets/[slug]        Bracelet product detail
```

**Navigation bar links:**
- Necklaces → `/collections/necklaces`
- Bracelets → `/collections/bracelets`
- Collections → `/#collections`
- Our Story → `/#our-story`

**Static params generated for all 12 product slugs** via `generateStaticParams`.

---

## 7. Conversion Optimisation Features

### Social Proof
- Testimonials section with 4 detailed reviews, product attribution per review
- Aggregate stats: 4.9 rating, 2,400+ reviews, 94% recommend
- Bestseller badges on product cards and detail pages
- "From Our Community" section header

### Trust Signals
- RJC Certification badge (SustainabilitySection)
- B Corp member badge
- Sustainability pledges in footer bar (5 items)
- Lifetime maintenance guarantee (footer + product detail trust strip + tab content)
- Free delivery + 30-day returns in product detail trust strip
- "London Studio — Est. 2018" provenance (footer)
- Per-product sustainability callout in Materials & Care tab
- Maker bio block on every product detail page

### Urgency & Scarcity
- "New Arrival" badge on cards and detail pages
- **Low stock indicator**: "Only N left" with amber dot when `stockCount ≤ 2`
- Seasonal CTA banners ("The Spring Edit has arrived")
- Bestseller labelling
- Made-to-order scarcity framing for Weave Cuff

### Email Capture
- Newsletter with explicit value exchange: 10% off first order
- Positioned mid-lower homepage (after trust content is established)
- Post-submit confirmation state with personalised copy

### High-Converting CTA Placement
- Hero slider: unique dual CTAs per slide (6 CTAs total across 3 slides)
- After features section: collection exploration
- Mid-page gold banner: seasonal/new arrivals urgency
- Mid-page dark banner: bespoke/high-value enquiry
- Product cards: hover "Add to Bag" overlay with backdrop-blur
- Product detail: dominant "Add to Bag — £XXX×qty" with confirmed state
- Product detail: Ask a Question secondary CTA (reduces exit intent)
- Collection pages: bespoke CTA at bottom

---

## 8. Technical Specifications

### Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 with App Router |
| Language | TypeScript (strict, zero errors) |
| Styling | Tailwind CSS v4 with `@theme` custom tokens |
| Fonts | Playfair Display + Inter via `next/font/google` |
| Package manager | Bun |
| Rendering | Server Components by default; `"use client"` only where required |

### Client Component Inventory

| Component | Reason for `"use client"` |
|---|---|
| `Navigation` | `useState` (menu), `useEffect` (scroll listener) |
| `HeroSection` | `useState` (slide, fade), `useEffect` (auto-advance timer), `useCallback`, `useRef` |
| `ProductCard` | `onClick` on "Add to Bag" hover button |
| `ProductDetailPage` | Gallery, tabs, qty stepper, wishlist, add-to-bag confirmed state |
| `NewsletterSection` | Form `onSubmit`, `useState` for submission state |

### Performance Considerations
- All non-interactive components remain Server Components
- `generateStaticParams` on all 12 product detail pages — fully static at build time
- Fonts loaded with `next/font` — automatic optimisation, zero FOUT, zero layout shift
- CSS gradient placeholders — zero network requests for images in current state
- No third-party JS dependencies beyond Next.js core
- `useRef` used in HeroSection to guard transition state without triggering re-renders

### SEO

- `generateMetadata` on all product pages — unique `title` and `description` per product
- Root `layout.tsx` metadata with `title.template` (`%s | Maison Aurore`)
- Open Graph tags in root layout
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Proper H1→H2→H3 hierarchy on every page (one H1 per page)
- Breadcrumb navigation on collection and product pages
- `alt` text on all image/visual elements
- Product `tags[]` rendered as visible tag pills (natural keyword density)

### Accessibility

- `aria-label` on all icon-only buttons (search, bag, wishlist, menu, gallery arrows, slider controls, qty buttons)
- `aria-label` on all social share links
- Mobile nav focus management via hamburger toggle
- Sufficient colour contrast (WCAG AA) across all colour pairs
- Stock status communicated via text + colour (never colour alone)
- Tab order follows visual reading order

---

## 9. Content Strategy

### Voice & Tone
- **Authoritative** — writes from a position of expertise, not aspiration
- **Unhurried** — long-form product descriptions; never rushing the sale
- **Material-specific** — names exact alloys, carat weights, stone origins, mine locations
- **Emotionally intelligent** — jewellery is about memory, identity, and meaning

### Key Copy Themes
1. The piece has an origin story — where the material came from, what inspired the form
2. The maker's hand is referenced — one person, one piece, hours of work
3. Sustainability is fact-based, not sentimental ("100% recycled gold from RJC-certified sources", not "kinder to the planet")
4. Time is celebrated — "worn for a lifetime", "heirloom quality", "still being worn in twenty years"

### Per-Product Copy Structure
Each product has two description layers:
- **Short description** (1 sentence): emotional hook used on cards and above the fold on detail page
- **Long description** (3–4 sentences): provenance, craft process, design story — used in Description tab

---

## 10. Roadmap

### Phase 2 — Commerce Infrastructure
- [ ] Real product photography (4 angles per product — maps directly to `gallery[]` array)
- [ ] Shopping cart (drawer or page)
- [ ] Checkout flow with payment processing (Stripe)
- [ ] User accounts / order history
- [ ] Wishlist persistence (localStorage or account-linked)
- [ ] Size guide modal/page

### Phase 3 — Content & Discovery
- [ ] Product filtering and sorting on collection pages (by collection, price, material)
- [ ] Bespoke commission enquiry form with project brief inputs
- [ ] The Aurore Journal (editorial blog)
- [ ] Instagram feed integration
- [ ] Gift wrapping option at checkout
- [ ] Jewellery care guide content pages

### Phase 4 — Retention & Optimisation
- [ ] Loyalty/rewards programme
- [ ] Email automation (post-purchase, birthday, care reminders, back-in-stock)
- [ ] Reviews system — replace static testimonials with verified purchase reviews
- [ ] Analytics dashboard for conversion tracking
- [ ] A/B testing for hero slider content and CTA copy
- [ ] International shipping / currency switching

---

## 11. Success Metrics

| Metric | Target (Month 3) |
|---|---|
| Homepage → Collection click-through rate | > 35% |
| Collection → Product page conversion | > 25% |
| Product page → Add to Bag click rate | > 8% |
| Hero slider engagement (arrow/dot clicks) | > 15% of sessions |
| Email signup conversion | > 4% of sessions |
| Average session duration | > 3 minutes |
| Bounce rate | < 55% |
| Mobile conversion rate | ≥ 60% of desktop rate |
| Wishlist add rate (product pages) | > 12% |

---

## 12. Out of Scope (v1.2)

- Shopping cart and checkout (payment processing)
- User authentication / accounts
- CMS / content management
- Real-time inventory management
- Product search functionality
- Third-party review platform integration
- Live chat / support widget
- International shipping / currency switching
- Email automation
- Analytics integration (GA4, Meta Pixel)
