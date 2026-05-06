# Design System — Maison Aurore

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
| `--color-gold-light` | `#D4B483` | Hover states, dark-bg gold text |
| `--color-gold-dark` | `#9A7A42` | Active/pressed gold states |
| `--color-forest` | `#2A3D35` | Primary dark — deep forest green |
| `--color-forest-light` | `#3D5749` | Hover on forest bg, secondary dark |
| `--color-forest-dark` | `#1A2820` | Deep section backgrounds |
| `--color-blush` | `#E8D5C4` | Dividers, card borders, subtle backgrounds |
| `--color-blush-dark` | `#D4B49A` | Deeper borders, selected state borders |
| `--color-warm-black` | `#1C1C1A` | Body text — not pure black, warm undertone |
| `--color-stone` | `#8C8680` | Secondary and muted text |
| `--color-stone-light` | `#B0ABA5` | Placeholder text, de-emphasised copy |

### Color Palette Usage Philosophy

- **Light sections** (`#FAF7F2`, `#F0EBE1`): Homepage features, product grids, collection details — breathable, high-contrast
- **Dark sections** (`#2A3D35`, `#1A2820`): Hero, testimonials, craftsmanship — creates dramatic editorial contrast
- **Gold accents** (`#B8975A`, `#D4B483`): CTAs, category labels, on-hover states — used sparingly for maximum impact
- **Blush/cream dividers** (`#E8D5C4`): Borders, horizontal rules — warm separation without coldness

### Accessibility
- All text-on-dark combinations meet WCAG AA contrast (4.5:1 minimum)
- All body text on cream backgrounds: `#1C1C1A` on `#FAF7F2` — ratio 14.9:1

---

## Typography

### Font Stack

| Role | Font | Variable | Source |
|---|---|---|---|
| Display / Headings | Playfair Display | `--font-playfair` | Google Fonts |
| Body / UI | Inter | `--font-inter` | Google Fonts |

Both fonts are loaded via `next/font/google` in `src/app/layout.tsx` for optimal performance.

### Scale & Usage

| Element | Size | Weight | Font | Notes |
|---|---|---|---|---|
| Hero H1 | `5xl–7xl` (responsive) | 400 | Playfair Display | Often with italic emphasis |
| Section H2 | `3xl–4xl` | 400 | Playfair Display | |
| Product H3 | `lg` | 500 | Playfair Display | |
| Sub-headings (H4) | `sm` | 500 | Playfair Display | |
| Eyebrow labels | `11px` / `0.35em` tracking | 400 | Inter | ALL CAPS, wide tracking |
| Body copy | `sm–base` | 400 | Inter | |
| Navigation links | `13px` / `0.12em` tracking | 400 | Inter | ALL CAPS |
| CTA buttons | `sm` / `0.15em` tracking | 500 | Inter | ALL CAPS |
| Price | `sm–2xl` | 500–600 | Inter | |
| Stat numbers | `2xl–4xl` | 400 | Playfair Display | Numerical elegance |

### Typographic Principles
- Headings use Playfair Display at **regular weight (400)** — never bold headings, elegance over impact
- Italic is used as accent/emphasis (`<em>` within headings), particularly for emotional words ("Story", "love", "One Maker")
- ALL CAPS sparingly — eyebrows, CTAs, navigation labels only
- Wide letter-spacing (`tracking-[0.25em]` to `tracking-[0.35em]`) on micro-labels for luxury feel
- Line-height generous on body (`leading-relaxed` = 1.625)

---

## Spacing & Layout

### Grid
- **Max width:** `max-w-7xl` (80rem / 1280px)
- **Horizontal padding:** `px-6` (mobile) / `px-10` (large screens)
- **Section vertical padding:** `py-20 lg:py-28` for main sections, `py-16` for compact sections

### Component Spacing
- Card gaps: `gap-5 lg:gap-6`
- Section-to-section: `py-20` minimum
- Internal component breathing room: `gap-8 lg:gap-12`

---

## Iconography

All icons are inline SVG, drawn with:
- `strokeWidth="1.2"` to `strokeWidth="1.5"` — refined line-weight
- `strokeLinecap="round"` — soft, hand-drawn quality
- No fill icons in UI (outline only) except stars in testimonials

### Navigation Icons
- Search: magnifying glass
- Bag: shopping bag icon with item count badge
- Menu: animated hamburger → ✕

---

## Component Inventory

### Navigation
- Fixed top, transparent-to-frosted on scroll
- Left: stacked brand name + "Artisan Jewellery" sub-label
- Centre/Right: nav links (desktop) + search/bag icons
- Mobile: hamburger with animated expand drawer

### HeroSection
- Full viewport height, dark forest green background
- Radial gradient + fine grid texture overlay
- Abstract jewellery SVG silhouettes (necklace + bracelet) right side (desktop)
- Left-pinned copy: pre-heading, H1 with italic accent, subheading, dual CTAs, trust stats
- Scroll indicator at bottom

### FeaturesSection
- 4-column card grid (stacks to 2 → 1 on mobile)
- Cards: hover reversal (white → forest green, all text/icon colours invert)
- 4 pillars: Sustainably Sourced, Master Craftsmanship, Timeless by Design, Made with Intention

### CollectionsSection
- 2-column split (stacks to 1 on mobile)
- Modern Collection: dark forest green card
- Timeless Collection: warm cream card
- Each: badge, tagline, H2, description, piece tags, inline CTA with arrow

### ProductCard
- 3:4 image aspect ratio (gradient placeholder until real images added)
- Hover: subtle image scale + dark overlay
- Badges: New, Bestseller, Sale (top-left), Collection (bottom-left)
- Hover: "Add to Bag" overlay button emerges from bottom
- Below: subtitle, name (hover: gold), price, original price (if sale), sustainability micro-indicator

### CraftsmanshipSection
- Dark forest section, 2-column layout
- Left: decorative SVG (tools, mandrel, gemstone), floating stat (6hrs per piece)
- Right: copy + 4-step process list with numbered square markers

### SustainabilitySection
- 3-part structure: editorial header, circular visual indicator (100% SVG), 4-pillar grid
- Pillars: Recycled Metals, Ethical Gemstones, Carbon-Conscious Packaging, The Long Arc
- Each pillar: large number, title, detail copy, stat + unit at bottom

### CTABanner
- 3 variants: `dark` (forest), `gold` (brand gold), `light` (cream)
- All colours adjust per variant
- Eyebrow + H2 + subtext + primary + optional secondary CTA
- Centred layout, max-width constrained copy

### TestimonialsSection
- Dark forest background
- 4-column card grid (stacks)
- Each card: star rating, quotation mark accent, quote, author + location + product worn
- Aggregate social proof bar at bottom (4.9 rating, 2,400+ reviews, 94% recommend)

### NewsletterSection
- 2-column: copy/benefits left, white card form right
- Post-submission: confirmation state with checkmark
- Benefits listed with gold dot markers
- Incentive: 10% off first order

### Footer
- 4-column grid: brand blurb + social links, Shop links, Our World links, Help & Care
- Sustainability pledge bar (forest dark, 5 pledges)
- Legal bar (copyright, privacy/terms/accessibility links)

### ProductDetailPage
- Breadcrumb navigation
- 2-column: gradient image placeholder left, full product info right
- Sustainability note overlay on image
- Collection tag, name, subtitle, pricing, description (short + long)
- Add to Bag CTA + wishlist icon button
- Trust indicators: Free Delivery, 30-Day Returns, Lifetime Care
- Materials list, Dimensions, Care instructions, Sustainability callout box
- Related products grid below

---

## Interaction & Motion

### Principles
- Motion is **understated** — never decorative, never gratuitous
- Duration: `300–500ms` for UI interactions, `700ms` for image zoom
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` — smooth deceleration

### Defined Transitions
| Interaction | Duration | Effect |
|---|---|---|
| Nav link hover | 300ms | Color shift |
| Nav background on scroll | 500ms | Transparent → frosted |
| Feature card hover | 500ms | Full colour inversion |
| Product card image | 700ms | Subtle scale (1.0 → 1.05) |
| Product card overlay | 300ms | Fade + slide up |
| CTA button hover | 300ms | Color + arrow translate |
| Mobile menu | 500ms | Max-height + opacity |
| Link underline | 400ms | Width 0% → 100% |

---

## Responsive Breakpoints

Using Tailwind's default breakpoints:

| Breakpoint | Width | Key Layout Changes |
|---|---|---|
| Default (mobile) | < 640px | Single column, stacked nav, reduced spacing |
| `sm` | ≥ 640px | 2-col grids start, some flex rows |
| `md` | ≥ 768px | Full desktop navigation appears |
| `lg` | ≥ 1024px | 3–4 column grids, 2-col split layouts |

---

## Image Strategy

Currently using CSS gradient placeholders that communicate product character through colour:
- Products use unique gradient combinations matching their material palette
- Gold products: warm ochre-to-deep-gold gradients
- Silver products: cool grey-to-white gradients
- Stone pieces: material colour incorporated into gradient

**To implement real images:** replace the `style={{ background: product.imageColor }}` div with `next/image` components. Recommended aspect ratio: `3:4`.

---

## Design Principles

1. **Less is more** — whitespace is a feature, not absence of design
2. **Warmth over coldness** — no pure black or pure white; everything has a warm undertone
3. **Editorial restraint** — typography does the heavy lifting, not decorative elements
4. **Material honesty** — the design reflects the brand's values: real, substantial, honest
5. **Hover reveals character** — meaningful state changes reward exploration without requiring it
6. **Sustainability is visual** — green indicators, material callouts, and sustainability notes are woven into the product experience, not relegated to a small-print disclaimer
