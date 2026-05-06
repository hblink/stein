import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product, formatPrice } from "@/lib/products";

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailPage({
  product,
  relatedProducts,
}: ProductDetailPageProps) {
  const categoryLabel =
    product.category === "necklaces" ? "Necklaces" : "Bracelets";
  const categoryHref = `/collections/${product.category}`;
  const collectionLabel =
    product.collection === "modern"
      ? "The Modern Collection"
      : "The Timeless Collection";

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#8C8680]">
            <Link href="/" className="hover:text-[#B8975A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={categoryHref}
              className="hover:text-[#B8975A] transition-colors"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-[#1C1C1A]">{product.name}</span>
          </nav>
        </div>

        {/* Main product section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Image */}
            <div className="relative">
              {/* Main image */}
              <div
                className="aspect-[3/4] rounded-sm overflow-hidden"
                style={{ background: product.imageColor }}
                role="img"
                aria-label={product.imageAlt}
              >
                {/* Subtle inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && (
                  <span className="px-3 py-1 bg-[#2A3D35] text-[#E8D5C4] text-[10px] tracking-[0.2em] uppercase">
                    New Arrival
                  </span>
                )}
                {product.bestseller && (
                  <span className="px-3 py-1 bg-[#B8975A] text-[#1C1C1A] text-[10px] tracking-[0.2em] uppercase">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Sustainability badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#1A2820]/85 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#B8975A] flex-shrink-0" />
                  <p className="text-[11px] tracking-wide text-[#E8D5C4] leading-snug">
                    {product.sustainabilityNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              {/* Collection tag */}
              <Link
                href={`${categoryHref}?collection=${product.collection}`}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#B8975A] mb-5 hover:text-[#9A7A42] transition-colors w-fit"
              >
                <span className="w-1 h-1 rounded-full bg-[#B8975A]" />
                {collectionLabel}
              </Link>

              {/* Product name */}
              <h1
                className="text-3xl sm:text-4xl text-[#1C1C1A] mb-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontWeight: 400,
                }}
              >
                {product.name}
              </h1>
              <p className="text-sm text-[#8C8680] mb-6">{product.subtitle}</p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl text-[#1C1C1A] font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#8C8680] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-base text-[#1C1C1A] leading-relaxed mb-5">
                {product.description}
              </p>
              <p className="text-sm text-[#8C8680] leading-relaxed mb-8">
                {product.longDescription}
              </p>

              {/* Add to bag CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button className="flex-1 py-4 bg-[#2A3D35] text-[#F0EBE1] text-sm tracking-[0.15em] uppercase hover:bg-[#3D5749] transition-colors duration-300 font-medium">
                  Add to Bag — {formatPrice(product.price)}
                </button>
                <button
                  aria-label="Save to wishlist"
                  className="w-14 flex items-center justify-center border border-[#E8D5C4] text-[#8C8680] hover:border-[#B8975A] hover:text-[#B8975A] transition-colors duration-300"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-3 mb-8 pb-8 border-b border-[#E8D5C4]">
                {[
                  {
                    icon: "🚚",
                    title: "Free Delivery",
                    sub: "Orders over £150",
                  },
                  {
                    icon: "↩",
                    title: "30-Day Returns",
                    sub: "No questions asked",
                  },
                  {
                    icon: "∞",
                    title: "Lifetime Care",
                    sub: "Free maintenance",
                  },
                ].map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="text-lg mb-1">{item.icon}</div>
                    <p className="text-[11px] text-[#1C1C1A] font-medium">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[#8C8680] mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Materials */}
              <div className="mb-6">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#8C8680] mb-3">
                  Materials
                </h3>
                <ul className="flex flex-col gap-2">
                  {product.materials.map((material) => (
                    <li
                      key={material}
                      className="flex items-center gap-2 text-sm text-[#1C1C1A]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dimensions */}
              <div className="mb-6">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#8C8680] mb-2">
                  Dimensions
                </h3>
                <p className="text-sm text-[#1C1C1A]">{product.dimensions}</p>
              </div>

              {/* Care */}
              <div className="mb-6">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#8C8680] mb-2">
                  Care
                </h3>
                <p className="text-sm text-[#8C8680]">{product.careInstructions}</p>
              </div>

              {/* Sustainability callout */}
              <div className="bg-[#2A3D35]/8 border border-[#2A3D35]/20 p-5">
                <div className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A3D35"
                    strokeWidth="1.5"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#2A3D35] mb-1">
                      Sustainability
                    </p>
                    <p className="text-sm text-[#8C8680]">{product.sustainabilityNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="bg-[#F0EBE1] py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8975A] mb-2">
                    You may also love
                  </p>
                  <h2
                    className="text-2xl text-[#1C1C1A]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    From the Same Collection
                  </h2>
                </div>
                <Link
                  href={categoryHref}
                  className="text-sm text-[#B8975A] tracking-[0.15em] uppercase link-underline hidden sm:block"
                >
                  View All {categoryLabel}
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {relatedProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
