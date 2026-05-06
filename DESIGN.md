# Design System — Maison Aurore

**Last updated:** 6 May 2026  
**Version:** 1.2

---

## Brand Identity

**Brand Name:** Maison Aurore  
**Tagline:** _"Crafted for the Conscious Soul"_  
**Tone:** Editorial luxury. Quiet confidence. Material honesty.  
**Position:** Premium artisan jewellery with an uncompromising sustainability practice. Not mass-market "eco" — genuine conscious luxury.

---

## Color System

All custom color tokens are defined in `src/app/globals.css` using the Tailwind v4 `@theme` directive.

| Token | Hex | Usage |
|---|---|---|
| `--color-cream` | `#FAF7F2` | Primary background — warm white with ivory undertone |
| `--color-cream-dark` | `#F0EBE1` | Secondary background, section alternation |
| `--color-gold` | `#B8975A` | Primary brand accent — warm, not garish |
| `--color-gold-light` | `#D4B483` | Hover states, dark-bg gold text, slider accents |
| `--color-gold-dark` | `#9A7A42` | Active/pressed gold states |
| `--color-forest` | `#2A3D35` | Primary dark — deep forest green |
| `--color-forest-light` | `#3D5749` | Hover on forest bg, secondary dark |
| `--color-forest-dark` | `#1A2820` | Deep section backgrounds |
| `--color-blush` | `#E8D5C4` | Dividers, card borders, tab underlines |
| `--color-blush-dark` | `#D4B49A` | Deeper borders, selected state borders |
| `--color-warm-black` | `#1C1C1A` | Body text, Add to Bag button — not pure black |
| `--color-stone` | `#8C8680` | Secondary and muted text, inactive tabs |
| `--color-stone-light` | `#B0ABA5` | Placeholder text, de-emphasised copy |

### Color Palette Usage Philosophy

- **Light sections** (`#FAF7F2`, `#F0EBE1`): Homepage features, product grids, product detail, collection pages — breathable, high-contrast
- **Dark sections** (`#2A3D35`, `#1A2820`, `#1C1C1A`): Hero slider, testimonials, craftsmanship, Add to Bag button — creates dramatic editorial contrast
- **Gold accents** (`#B8975A`, `#D4B483`): Active tabs, CTAs, category labels, slider progress bars, on-hover states, wishlist filled state — used sparingly for maximum impact
- **Blush/cream dividers** (`#E8D5C4`): Borders, horizontal rules, tab separators, thumbnail ring offset — warm separation without coldness
- **Status colours** (not branded): Amber `#F59E0B` for low-stock warning, Red `#F87171` for out-of-stock indicator

### Accessibility
- All text-on-dark combinations meet WCAG AA contrast (4.5:1 minimum)
- All body text on cream backgrounds: `#1C1C1A` on `#FAF7F2` — ratio 14.9:1
- Stock status colours supplemented with text labels (never colour alone)
- All interactive elements have visible focus states

---

## Typography

### Font Stack

| Role | Font | Variable | Source |
|---|---|---|---|
| Display / Headings | Playfair Display | `--font-playfair` | Google Fonts |
| Body / UI | Inter | `--font-inter` | Google Fonts |

Both fonts are loaded via `next/font/google` in `src/app/layout.tsx` for optimal performance (no FOUT, no layout shift).

### Scale & Usage

| Element | Size | Weight | Font | Notes |
|---|---|---|---|---|
| Hero H1 | `5xl–7xl` (responsive) | 400 | Playfair Display | Italic accent on one line per slide |
| Section H2 | `3xl–4xl` | 400 | Playfair Display | |
| Product H1 (detail page) | `3xl–4xl` | 400 | Playfair Display | |
| Product H3 (card) | `lg` | 500 | Playfair Display | |
| Sub-headings (H4) | `sm` | 500 | Playfair Display | |
| Eyebrow labels | `11px` / `0.35em` tracking | 400 | Inter | ALL CAPS, wide tracking |
| Tab labels | `12px` / `0.15em` tracking | 400 | Inter | ALL CAPS |
| Body copy | `sm–base` | 400 | Inter | |
| Navigation links | `13px` / `0.12em` tracking | 400 | Inter | ALL CAPS |
| CTA buttons | `sm` / `0.15em` tracking | 500 | Inter | ALL CAPS |
| Price (detail page) | `3xl` | 400 | Playfair Display | Editorial treatment |
| Price (card/summary) | `sm` | 500 | Inter | |
| Stat/counter numbers | `2xl–4xl` | 400 | Playfair Display | Slide counters, hero stats |
| Tag pills | `10px` | 400 | Inter | Tracking wide, all caps |

### Typographic Principles
- Headings use Playfair Display at **regular weight (400)** — never bold headings, elegance over impact
- Italic used as accent/emphasis (`<em>` within headings), particularly on emotional words per slide ("Story", "Body", "Memory")
- ALL CAPS sparingly — eyebrows, CTAs, navigation labels, tab headers, thumbnail view labels only
- Wide letter-spacing (`tracking-[0.25em]` to `tracking-[0.35em]`) on micro-labels for luxury feel
- Line-height generous on body (`leading-relaxed` = 1.625)

---

## Spacing & Layout

### Grid
- **Max width:** `max-w-7xl` (80rem / 1280px)
- **Horizontal padding:** `px-6` (mobile) / `px-10` (large screens)
- **Section vertical padding:** `py-20 lg:py-28` for main sections, `py-16` for compact sections
- **Product detail column layout:** `grid-cols-1 lg:grid-cols-[1fr_1px_1fr]` — image | divider | info

### Component Spacing
- Card gaps: `gap-5 lg:gap-6`
- Thumbnail strip: `grid-cols-4 gap-2`
- Section-to-section: `py-20` minimum
- Internal component breathing room: `gap-8 lg:gap-12`
- Tab content top padding: `mb-5` below tab header row

---

## Iconography

All icons are inline SVG, drawn with:
- `strokeWidth="1.2"` to `strokeWidth="1.5"` — refined line-weight
- `strokeLinecap="round"` — soft, hand-drawn quality
- No fill icons in UI (outline only) except:
  - Stars in testimonials (filled `#B8975A`)
  - Wishlist heart when active (filled `#B8975A`)

### Icon Inventory by Location

| Location | Icon | State |
|---|---|---|
| Navigation | Search, Shopping Bag (with count badge), Hamburger → ✕ | — |
| Hero slider | Left/Right arrows | Controls |
| Image gallery | Left/Right chevrons on main image, viewed per thumbnail | Navigation |
| Wishlist button | Heart outline → heart filled | Toggle |
| Add to Bag (confirmed) | Checkmark | Success state |
| Qty stepper | Minus, Plus | Controls |
| Ask a Question | Chat bubble | — |
| Maker bio | Right arrow | Link indicator |
| Social share | Facebook, Pinterest, Twitter/X | External links |
| Shield (sustainability) | Shield with check | Callout |
| Delivery trust strip | Truck, Return arrow, Infinity | Static |
| Dot indicators (slider) | Filled dot + progress bar line | Active state |

---

## Component Inventory

### Navigation
- Fixed top, transparent-to-frosted on scroll (500ms transition)
- Left: stacked brand name + "Artisan Jewellery" sub-label, links to `/`
- Centre/Right (desktop): nav links + search + bag icon with item count badge
- Mobile: hamburger with animated expand drawer (max-height + opacity)
- `"use client"` — uses `useEffect` scroll listener and `useState` for menu open

### HeroSection _(updated: now a 3-slide auto-advancing slider)_
- **3 slides**, each with unique content, background gradient, accent glow, and SVG visual:
  - Slide 1 — "Wear the Story of the Earth" — necklace silhouette — forest green BG
  - Slide 2 — "Architecture for the Body" — geometric polygon — near-black BG
  - Slide 3 — "Nature, Memory, and the Eternal" — botanical/moon SVG — warm dark brown BG
- **Auto-advance:** 5,500ms per slide, pauses on mouse hover
- **Cross-fade transition:** 350ms opacity fade on all content (bg gradient, glow, headline, CTAs, stats, SVG visual)
- **Controls:**
  - Dot indicators bottom-left: inactive dot (30% white) → active dot + 40px animated progress bar filling over slide duration
  - Prev/Next arrow buttons bottom-right (10×10 border squares)
- **Slide counter** top-right desktop (0N / 03)
- **Per-slide content:** eyebrow, 3-line headline with one italic accent line, subheading, 2 CTAs, 3 stats
- `"use client"` — uses `useState`, `useEffect`, `useCallback`, `useRef`
- `SlideVisual` is a separate named component (avoids JSX-in-data-object SSR issue)
- Section has explicit `style={{ backgroundColor }}` so dark bg renders server-side before hydration

### FeaturesSection
- 4-column card grid (stacks to 2 → 1 on mobile)
- Cards: hover reversal (white → forest green, all text/icon colours invert, 500ms)
- 4 pillars: Sustainably Sourced, Master Craftsmanship, Timeless by Design, Made with Intention

### CollectionsSection
- 2-column split (stacks to 1 on mobile)
- Modern Collection: dark forest green card
- Timeless Collection: warm cream card
- Each: badge, tagline, H2, description, piece tags, inline CTA with arrow

### ProductCard
- `"use client"` — `onClick` on "Add to Bag" overlay requires client
- 3:4 image aspect ratio (gradient placeholder; first item from `product.gallery[]`)
- Hover: subtle image scale (700ms) + dark overlay (500ms)
- Badges: New, Bestseller, Sale (top-left), Collection (bottom-left with backdrop-blur)
- Hover: "Add to Bag" button emerges from bottom (opacity + translateY, 300ms)
- Below image: subtitle, name (hover: gold transition), price, sale price if applicable, recycled metals micro-indicator

### CraftsmanshipSection
- Dark forest section, 2-column layout
- Left: decorative SVG (tools, mandrel, gemstone), floating stat (6hrs per piece)
- Right: copy + 4-step process list with numbered square markers

### SustainabilitySection
- 3-part structure: editorial header, circular visual indicator (100% SVG ring), 4-pillar grid
- Pillars: Recycled Metals, Ethical Gemstones, Carbon-Conscious Packaging, The Long Arc
- Each pillar: large sequential number, title, detail copy, stat + unit at bottom

### CTABanner
- 3 variants: `dark` (forest), `gold` (brand gold), `light` (cream)
- All text/border/button colours adjust per variant automatically
- Props: `eyebrow`, `headline`, `subheadline`, `primaryCTA`, optional `secondaryCTA`
- Centred layout, constrained copy width

### TestimonialsSection
- Dark forest background
- 4-column card grid (stacks to 1 on mobile)
- Each card: star rating (filled gold), large opening quote mark accent, quote body, author + location + product worn
- Aggregate social proof bar: 4.9 rating / 2,400+ reviews / 94% recommend

### NewsletterSection
- `"use client"` — form submission state
- 2-column: copy + 4 benefit bullets left, white card form right
- Post-submission: confirmation state (checkmark icon, personalised copy)
- Incentive: 10% off first order

### Footer
- 4-column grid: brand blurb + social links, Shop, Our World, Help & Care
- Sustainability pledge bar (forest dark, 5 pledges with gold dots)
- Legal bar (copyright, privacy/terms/accessibility)

### CollectionPageLayout
- Shared component used by both `/collections/necklaces` and `/collections/bracelets`
- Dark forest hero with breadcrumb, category headline, product counts
- Products split into two labelled grids: Modern then Timeless (with `&` divider)
- Sustainability icon strip (forest dark)
- Bespoke CTABanner (light variant)
- NewsletterSection + Footer

### ProductDetailPage _(updated: full redesign — v1.2)_
`"use client"` — manages all interactive state locally

**Layout:** `grid-cols-1 lg:grid-cols-[1fr_1px_1fr]` — image gallery | vertical divider | purchase info

#### Left column — Image Gallery
- **Main image:** 4:5 aspect ratio, CSS gradient (from `product.gallery[]`), cross-fade on thumbnail click (500ms)
- **View label** overlay bottom-left (Studio / Detail / Styled / Worn)
- **Badges** top-left: New, Bestseller, Sale
- **Prev/Next arrows** overlaid on image (white/80 backdrop-blur squares, 8×8)
- **Thumbnail strip:** `grid-cols-4 gap-2`, 1:1 square, gold ring + ring-offset on active thumbnail, view label at bottom of each
- **Share row** below thumbnails: "Share" label + Facebook / Pinterest / Twitter icon buttons (border squares)

#### Right column — Purchase Info
| Element | Detail |
|---|---|
| Collection tag | Links to filtered collection page |
| H1 product name | Playfair Display 400, 3xl–4xl |
| Subtitle | Inter, muted stone colour |
| Price | Playfair Display 3xl; sale price struck through; savings label in gold |
| Short description | 1-sentence hook, border-bottom separator |
| Stock indicator | Coloured dot + text: in stock / only N left / out of stock |
| Size selector | Visible only if `product.sizes` exists; active = forest bg; size guide link |
| Quantity stepper | −/qty/+ in bordered box, capped to `stockCount` |
| Add to Bag button | `flex-1`, warm-black → forest on hover; confirmed state (checkmark + "Added to Bag"); disabled + grey if out of stock |
| Wishlist button | Heart outline → filled gold on toggle |
| Ask a Question | Full-width secondary button, border style |
| Trust strip | 3-up: Free Delivery / 30-Day Returns / Lifetime Care |
| **Tabs** | Description \| Materials & Care \| Shipping & Returns |
| → Description tab | Long description, dimensions block, tag pills, SKU + category link |
| → Materials & Care tab | Bulleted materials list, care instructions, sustainability callout box |
| → Shipping & Returns tab | Dispatch times, 4 delivery options with prices, returns policy |
| Maker bio | Avatar circle, studio name + location, bio paragraph, "Meet the maker" link |

**Related products** — 4-up grid below in cream-dark section, same collection

---

## State Patterns (ProductDetailPage)

| State | Type | Behaviour |
|---|---|---|
| `activeImage` | `number` | Controls main image + active thumbnail ring |
| `activeTab` | `"description" \| "materials" \| "shipping"` | Controls tab content visibility |
| `selectedSize` | `string` | Tracks selected size option |
| `qty` | `number` | Min 1, max `product.stockCount` |
| `addedToBag` | `boolean` | True for 2,500ms after click; resets automatically |
| `wishlisted` | `boolean` | Persists for session; heart icon fills gold |

---

## Interaction & Motion

### Principles
- Motion is **understated** — never decorative, never gratuitous
- Duration: `200–350ms` for UI micro-interactions, `500ms` for gallery, `700ms` for card image scale
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` — smooth deceleration

### Defined Transitions

| Interaction | Duration | Effect |
|---|---|---|
| Nav link hover | 300ms | Color shift |
| Nav background on scroll | 500ms | Transparent → frosted glass |
| Feature card hover | 500ms | Full colour inversion |
| Hero slider cross-fade | 350ms | Opacity 1→0→1 on all slide content |
| Hero progress bar | `AUTOPLAY_MS` (5,500ms) | CSS animation `heroProgress` keyframe |
| Product card image | 700ms | Scale 1.0 → 1.05 |
| Product card "Add to Bag" overlay | 300ms | Opacity + translateY |
| Gallery main image switch | 500ms | Opacity transition |
| Gallery thumbnail active | 200ms | Ring + opacity |
| Add to Bag confirmed | instant | State swap; resets after 2,500ms |
| Wishlist toggle | 200ms | Fill color |
| Tab switch | instant | Content swap (no animation needed) |
| CTA button hover | 300ms | Color + arrow translateX(4px) |
| Mobile menu | 500ms | Max-height + opacity |
| Link underline | 400ms | `::after` width 0% → 100% |

---

## Responsive Breakpoints

Using Tailwind's default breakpoints:

| Breakpoint | Width | Key Layout Changes |
|---|---|---|
| Default (mobile) | < 640px | Single column, stacked nav, stacked product detail |
| `sm` | ≥ 640px | 2-col grids, flex rows in hero CTAs |
| `md` | ≥ 768px | Full desktop navigation appears, slider counter visible |
| `lg` | ≥ 1024px | 3–4 column grids, 2-col split layouts, gallery + info side-by-side |

---

## Image Strategy

### Current: CSS Gradient Placeholders
Each product has a `gallery: string[]` array of 4 unique CSS linear-gradients, each representing a different photography angle:

| Index | Label | Gradient angle | Intent |
|---|---|---|---|
| 0 | Studio | 135° | Primary product shot, flat lay |
| 1 | Detail | 155° | Close-up of clasp, texture, or stone |
| 2 | Styled | 115° | Product in context/environment |
| 3 | Worn | 145° | On-body lifestyle shot |

`product.imageColor` always equals `product.gallery[0]` — used by `ProductCard`.

### Migration to Real Photography
Replace `<div style={{ background: gradient }}>` with `<Image>` from `next/image`:
- Aspect ratio: **4:5** on detail page, **3:4** on product cards
- Use `sizes` prop for responsive loading
- Use `priority` on the first product card in a grid and the main detail image
- Provide `alt` text from `product.imageAlt`

---

## Data Model — Key Fields Added in v1.2

```typescript
interface Product {
  // ...existing fields...
  gallery: string[];          // 4 CSS gradients (→ 4 real image URLs)
  stockCount: number;         // Drives stock indicator + qty stepper cap
  tags: string[];             // Rendered as pill badges in Description tab
  sizes?: string[];           // Optional; renders size selector if present
}
```

---

## Design Principles

1. **Less is more** — whitespace is a feature, not absence of design
2. **Warmth over coldness** — no pure black or pure white; everything has a warm undertone
3. **Editorial restraint** — typography does the heavy lifting, not decorative elements
4. **Material honesty** — the design reflects the brand's values: real, substantial, honest
5. **Hover reveals character** — meaningful state changes reward exploration without requiring it
6. **Sustainability is visual** — green indicators, material callouts, and sustainability notes are woven into the product experience, not relegated to a small-print disclaimer
7. **Client boundary discipline** — `"use client"` is added only where event handlers or browser APIs require it; all other components remain Server Components for performance
