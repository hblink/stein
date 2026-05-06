# Active Context: Maison Aurore — Artisan Jewellery Website

## Current State

**Project Status:** ✅ v1.0 Complete — Full website implemented

A complete high-converting artisan jewellery website for "Maison Aurore" has been built on top of the Next.js starter template. The site sells handmade necklaces and bracelets with a focus on sustainability, craftsmanship, and two design collections (Modern and Timeless).

## Recently Completed

- [x] Brand identity: Maison Aurore — "Crafted for the Conscious Soul"
- [x] Global design system: custom Tailwind v4 theme tokens (cream, gold, forest, blush)
- [x] Typography: Playfair Display (headings) + Inter (body) via next/font
- [x] Product data layer: `src/lib/products.ts` — 12 SKUs (6 necklaces, 6 bracelets)
- [x] Navigation component — sticky, scroll-aware, mobile-responsive with animated hamburger
- [x] Footer component — 4-column grid, sustainability pledges bar, legal bar
- [x] HeroSection — full-viewport, dark forest green, SVG jewellery silhouettes
- [x] FeaturesSection — 4-pillar cards with dark hover reversal
- [x] CollectionsSection — 2-card split: Modern (dark) + Timeless (cream)
- [x] CraftsmanshipSection — dark section with SVG tools visual + 4-step process
- [x] SustainabilitySection — 4-pillar grid + SVG circular indicator
- [x] ProductCard — 3:4 gradient placeholder, hover overlay, badges, sustainability micro-indicator
- [x] CTABanner — 3 variants (dark/gold/light), reusable
- [x] TestimonialsSection — 4 reviews + aggregate stats bar
- [x] NewsletterSection — form with post-submit confirmation state
- [x] Homepage (`/`) — 10 sections, full layout
- [x] Necklaces collection page (`/collections/necklaces`)
- [x] Bracelets collection page (`/collections/bracelets`)
- [x] CollectionPageLayout — shared component for both category pages
- [x] Product detail pages (`/collections/necklaces/[slug]`, `/collections/bracelets/[slug]`)
- [x] ProductDetailPage — full detail view with trust indicators, materials, sustainability callout
- [x] 404 page — brand-consistent with editorial copy
- [x] `generateStaticParams` on all product detail pages
- [x] `generateMetadata` with dynamic title/description per product
- [x] DESIGN.md — comprehensive design system documentation
- [x] PRD.md — full product requirements document
- [x] Zero TypeScript errors, zero ESLint errors

## Current File Structure

```
src/
  app/
    globals.css                         # Tailwind v4 + @theme custom tokens
    layout.tsx                          # Root layout with Playfair + Inter fonts
    page.tsx                            # Homepage
    not-found.tsx                       # 404 page
    collections/
      necklaces/
        page.tsx                        # Necklaces collection
        [slug]/page.tsx                 # Necklace product detail
      bracelets/
        page.tsx                        # Bracelets collection
        [slug]/page.tsx                 # Bracelet product detail
  components/
    Navigation.tsx                      # Sticky nav (client component)
    Footer.tsx                          # Footer
    HeroSection.tsx                     # Homepage hero
    FeaturesSection.tsx                 # 4-pillar features
    CollectionsSection.tsx              # 2-collection showcase
    CraftsmanshipSection.tsx            # Craft story + process
    SustainabilitySection.tsx           # Sustainability pillars
    ProductCard.tsx                     # Product grid card
    CTABanner.tsx                       # Reusable CTA (3 variants)
    TestimonialsSection.tsx             # Reviews + social proof
    NewsletterSection.tsx               # Email capture (client component)
    CollectionPageLayout.tsx            # Shared collection page
    ProductDetailPage.tsx               # Product detail layout
  lib/
    products.ts                         # 12 product data items + utility functions
DESIGN.md                               # Full design system documentation
PRD.md                                  # Product requirements document
```

## Brand Identity

- **Brand:** Maison Aurore
- **Tagline:** "Crafted for the Conscious Soul"
- **Color palette:** Cream (`#FAF7F2`), Forest Green (`#2A3D35`), Gold (`#B8975A`), Blush (`#E8D5C4`), Warm Black (`#1C1C1A`)
- **Typography:** Playfair Display (headings) + Inter (body)
- **Two collections:** The Modern Collection (geometric, architectural) + The Timeless Collection (organic, botanical)
- **12 products:** 6 necklaces, 6 bracelets, prices £150–£340

## Next Steps (Phase 2)

- [ ] Real product photography (replace gradient CSS placeholders)
- [ ] Shopping cart and checkout (payment processing)
- [ ] Product filtering on collection pages
- [ ] Bespoke commission enquiry form
- [ ] Editorial journal/blog section
- [ ] Reviews integration

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base Next.js 16 setup |
| May 2026 | Full Maison Aurore jewellery website — v1.0 complete |
