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
└── types/
    └── order.ts                # Order type definitions (NEW)
```

## 🎨 Managing Product Images

### Current Setup: CSS Gradient Placeholders

Products currently use CSS gradient placeholders representing different photography angles:

- **Studio**: Primary product shot (flat lay)
- **Detail**: Close-up of clasp, texture, or stone
- **Styled**: Product in context/environment
- **Worn**: On-body lifestyle shot

Each product has a `gallery` array with 4 CSS gradients in `src/data/products.ts`.

### Adding Real Product Photography

To replace gradient placeholders with real images:

1. **Update the Product type** (optional):
   ```typescript
   // Remove gallery gradients, add image URLs
   gallery: string[]; // Now real image URLs instead of CSS gradients
   ```

2. **Upload images** to your preferred CDN or use Next.js `public/` folder:
   ```
   public/images/products/
   ├── necklace-golden-harmony/
   │   ├── studio.jpg
   │   ├── detail.jpg
   │   ├── styled.jpg
   │   └── worn.jpg
   ```

3. **Replace gradient with Image component** in `ProductDetailPage.tsx`:
   ```typescript
   import Image from 'next/image'
   
   // In gallery section:
   <Image
     src={product.gallery[activeImage]}
     alt={`${product.name} - ${viewLabels[activeImage]}`}
     fill
     className="object-cover"
     priority={activeImage === 0}
   />
   ```

4. **Update ProductCard** similarly for thumbnail images.

### Image Specifications

- **Aspect Ratio**: 4:5 for detail pages, 3:4 for cards
- **Formats**: WebP or AVIF (optimized), with JPG fallback
- **Sizes**: 
  - Main/detail images: 800×1000px (2x for retina)
  - Thumbnail images: 400×500px
- **Naming convention**: `product-name-view.jpg` (e.g., `golden-harmony-studio.jpg`)

## 💰 Managing Product Pricing

Product data is defined in `src/data/products.ts`:

```typescript
{
  id: '1',
  name: 'Golden Harmony Necklace',
  price: 285,              // Current price in GBP
  originalPrice: 310,      // Optional: for sale pricing
  category: 'necklaces',
  collection: 'modern',
  stockCount: 3,
  images: [...],
  description: '...',
  tags: ['18k Gold', 'New Arrival'],
  sizes: undefined,        // Optional for size variants
}
```

### To update pricing:

1. **Edit `src/data/products.ts`**
2. **Update the `price` field** for the target product
3. **Add `originalPrice`** if the product is on sale (strikethrough will display)
4. **Sale badge**: Products with `originalPrice` automatically show "Sale" badge

### Adding a New Product

1. Create image gradients (or real images) for the 4 views
2. Add product entry to `products.ts`:
   ```typescript
   {
     id: 'unique-id',
     name: 'Product Name',
     description: 'Short description',
     price: 195,
     originalPrice: null,  // or number for sales
     category: 'necklaces', // or 'bracelets'
     collection: 'timeless', // or 'modern'
     stockCount: 5,
     gallery: [gradient1, gradient2, gradient3, gradient4],
     imageColor: gradient1,  // for card background
     tags: ['Tag 1', 'Tag 2'],
     sizes: undefined,  // or ['S', 'M', 'L'] for size variants
   }
   ```

3. **Generate static params** (if using dynamic routes):
   The app already has `generateStaticParams` in collection pages — update the slug list if adding new products.

4. **Rebuild**:
   ```bash
   bun build
   ```

## 🗄️ Supabase & Order Management

### Configuration

The Supabase client is configured in `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Set your credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database Schema

The `supabase/orders_schema.sql` file contains the complete schema for:

- **`orders` table**: Customer orders with financial, status, and tracking fields
- **`order_items` table**: Individual line items for each order

#### Key Fields:

**orders table:**
- `order_number` (text) - Unique order identifier (e.g., ORD-2026-001)
- `customer_id` (uuid) - References Supabase auth users
- `email` (text) - Customer email
- `subtotal`, `tax`, `shipping`, `discount`, `total` (numeric) - Financial breakdown
- `order_status` (text) - pending | processing | shipped | delivered | cancelled
- `payment_status` (text) - pending | paid | failed | refunded
- `fulfillment_status` (text) - unfulfilled | partial | fulfilled | cancelled
- `shipping_address` (jsonb) - Customer shipping address
- `billing_address` (jsonb) - Billing address
- `tracking_number` (text) - Carrier tracking number
- `estimated_delivery` (date) - Expected delivery date

**order_items table:**
- `order_id` (uuid) - References orders.id
- `product_id` (uuid) - References products table
- `product_name` (text) - Product name at time of purchase
- `quantity` (integer) - Quantity ordered
- `unit_price` (numeric) - Price per unit
- `total_price` (numeric) - Quantity × unit price
- `image_url` (text) - Product image URL

### Setting Up the Database

1. **Access Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to **SQL Editor**

2. **Run the Schema SQL**
   - Open `supabase/orders_schema.sql`
   - Paste into SQL Editor and run
   - Or use the Supabase CLI:
     ```bash
     bunx supabase db push
     ```

3. **Enable Row Level Security (RLS)**
   - RLS is enabled by default in the schema
   - Adjust policies in Supabase dashboard as needed

4. **Insert Sample Data**
   - The SQL file includes 4 sample orders with items
   - Remove or modify as needed

### Accessing Orders Data

The order dashboard (`/orders`) automatically fetches and displays orders from your Supabase database:

```typescript
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .order('created_at', { ascending: false })
```

### Order Status Flow

```
Pending → Processing → Shipped → Delivered
    ↓
Cancelled (at any stage)
```

- **Payment Status**: pending → paid (or failed/refunded)
- **Fulfillment**: unfulfilled → partial → fulfilled (or cancelled)

## 🛠️ Available Scripts

```bash
# Development
bun dev              # Start dev server

# Build & Production
bun build            # Build for production
bun start            # Start production server

# Linting & Type Checking
bun lint             # Run ESLint
bun typecheck        # Run TypeScript compiler
```

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

### Adding New Pages

1. Create page file in `src/app/` (e.g., `about/page.tsx`)
2. Add to navigation in `src/components/Navigation.tsx`
3. Update sitemap if using one (`app/sitemap.ts`)

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

## 📦 Deployment

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
**Version**: 1.2  
**Built with**: ❤️ + Next.js + TypeScript + Tailwind CSS