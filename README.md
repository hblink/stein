# Maison Aurore — Artisan Jewellery Website

A premium e-commerce website built with Next.js 16, TypeScript, and Tailwind CSS, featuring handmade necklaces and bracelets with sustainable craftsmanship at its core.

## 🌐 Live Demo

The website is deployed and accessible at the configured domain.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended)
- **Supabase account** (for order management and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   Using Bun (recommended):
   ```bash
   bun install
   ```
   Or using npm:
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set up the database (optional but recommended)**
   
   If you want to use the order management system:
   ```bash
   # Connect to your Supabase project
   bunx supabase login
   bunx supabase link --project-ref your-project-id
   
   # Run the SQL schema
   # Execute the SQL in supabase/orders_schema.sql via Supabase SQL Editor
   ```

5. **Run the development server**
   ```bash
   bun dev
   ```
   Or:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles & theme
│   ├── orders/
│   │   └── page.tsx            # Order dashboard (NEW)
│   ├── admin/
│   │   └── products/            # Product management (NEW)
│   │       └── page.tsx
│   └── collections/
│       ├── necklaces/
│       │   └── [slug]/
│       │       └── page.tsx    # Necklace product detail
│       └── bracelets/
│           └── [slug]/
│               └── page.tsx    # Bracelet product detail
├── components/
│   ├── Navigation.tsx          # Main navigation bar
│   ├── HeroSection.tsx         # 3-slide auto-advancing hero slider
│   ├── ProductCard.tsx         # Product grid card
│   ├── ProductDetailPage.tsx   # Product detail page
│   ├── OrderStatusBadge.tsx    # Status badge components (NEW)
│   ├── OrderCard.tsx           # Order card for grid view (NEW)
│   ├── OrdersTable.tsx         # Order table component (NEW)
│   ├── OrderDetailsModal.tsx   # Order detail modal (NEW)
│   └── ...                     # Other components
├── lib/
│   └── supabase.ts             # Supabase client (NEW)
├── types/
│   └── order.ts                # Order type definitions (NEW)
└── data/
    └── products.ts             # Product data (legacy - use DB now)
```

## 🛠️ Admin Panel (Easy Product Management)

**No coding needed!** Manage products through a web interface:

1. Navigate to `/admin/products` in your browser (when logged in/authenticated)
2. **Add Product** — Click "Add Product" and fill the form
3. **Edit** — Click ✏️ on any product
4. **Delete** — Click 🗑️ to remove

### What You Can Change

- ✏️ **Name & Description** — Product titles and details
- 💰 **Pricing** — Regular price and original price (for showing discounts)
- 📦 **Stock** — Current inventory count
- 🖼️ **Images** — URLs for 4 views (Studio, Detail, Styled, Worn)
- 🏷️ **Tags** — Filterable tags (e.g., "Gold", "Gemstone")
- 📏 **Sizes** — Available sizes for bracelets
- ⭐ **Badges** — "New Arrival" / "Bestseller" toggles
- 🔘 **Active** — Show/hide from storefront
- 🔢 **Sort Order** — Display sequence (lower = first)

### Changes Are Instant

All edits save directly to Supabase and appear immediately on the site. No rebuild needed!

## 🖼️ Adding Real Product Photos

Currently uses CSS gradient placeholders. To add real photos:

1. **Upload images** to your CDN or cloud storage (Cloudinary, AWS S3, Imgix, etc.)
2. **Get the URLs** (e.g., `https://cdn.example.com/ring-gold-studio.jpg`)
3. **In the Admin Panel** (`/admin/products`), paste URLs into the 4 image fields:
   - Studio (main product shot)
   - Detail (close-up)
   - Styled (lifestyle)
   - Worn (on-body)
4. **Save** — Changes appear immediately!

### Image Specs
- **Aspect Ratio**: 4:5 (portrait)
- **Size**: 800×1000px recommended (2x for retina)
- **Format**: WebP/JPG/PNG
- **Naming**: `product-name-view.jpg` (e.g., `golden-harmony-studio.jpg`)

## 💰 Managing Product Pricing

Use the **Admin Panel** (`/admin/products`) to change prices:

1. Go to `/admin/products`
2. Click ✏️ on the product
3. Edit the **Price** field
4. Click **Save Changes**
5. Done! The new price appears instantly on the live site

No editing code or rebuilding required!

## 🗄️ Database Schema

### Orders Table
The `supabase/orders_schema.sql` file contains the complete schema for order management:
- `orders` table with financial, status, and tracking fields
- `order_items` table for line items
- Row Level Security (RLS) policies
- Sample data included

### Products Table
The `supabase/products_schema.sql` file contains schema for the products table compatible with the Admin Panel.

## 🎨 Design System

### Color Palette

Custom theme defined in `src/app/globals.css`:

- **Cream**: `#FAF7F2` (primary background)
- **Gold**: `#B8975A` (brand accent)
- **Forest**: `#2A3D35` (dark sections)
- **Warm Black**: `#1C1C1A` (body text)
- **Stone**: `#8C8680` (muted text)

### Typography

- **Display**: Playfair Display (headings)
- **Body**: Inter (UI and text)

Both loaded via `next/font/google` for optimal performance.

## 🔧 Troubleshooting

### Supabase Connection Issues

**Error**: "Cannot find module '@supabase/supabase-js'"
```bash
bun install @supabase/supabase-js
```

**Error**: "Invalid Supabase URL"
- Verify `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
- Format: `https://your-project.supabase.co`

### Type Errors

Run type check to see all errors:
```bash
bun typecheck
```

### Lint Errors

Fix automatically:
```bash
bun lint --fix
```

Or manually review and fix reported issues.

### Images Not Loading

- If using `next/image`, ensure images are in `public/` folder or use remote patterns
- For external images, configure `next.config.js` with allowed domains
- Current gradient placeholders require no external resources

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Other Platforms

- **Netlify**: Set environment variables in site settings
- **Cloudflare Pages**: Add environment variables during build
- **Self-hosted**: Run `bun build && bun start`

## 🗄️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anon/public key |

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🛡️ Security

- **Never commit secrets**: `.env.local` is in `.gitignore`
- **Use Row Level Security (RLS)** on Supabase tables
- **Sanitize user inputs** on all forms
- **Validate API requests** with proper authorization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open Pull Request

## 📄 License

This project is proprietary and confidential. Unauthorized use, copying, or distribution is prohibited.

## 🆘 Support

For issues, questions, or feature requests:
- Check existing [issues](https://github.com/your-repo/issues)
- Open a new issue with detailed description
- Contact the development team

---

**Last Updated**: May 2026  
**Version**: 1.4  
**Built with**: ❤️ + Next.js + TypeScript + Tailwind CSS