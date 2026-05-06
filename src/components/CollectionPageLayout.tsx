import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CTABanner from "@/components/CTABanner";
import NewsletterSection from "@/components/NewsletterSection";
import { Product } from "@/lib/products";

interface CollectionPageLayoutProps {
  category: "necklaces" | "bracelets";
  headline: string;
  subheadline: string;
  description: string;
  products: Product[];
  heroBg: string;
  ctaHref: string;
  ctaLabel: string;
}

export default function CollectionPageLayout({
  category,
  headline,
  subheadline,
  description,
  products,
  heroBg,
  ctaHref,
  ctaLabel,
}: CollectionPageLayoutProps) {
  const modernProducts = products.filter((p) => p.collection === "modern");
  const timelessProducts = products.filter((p) => p.collection === "timeless");

  return (
    <>
      <Navigation />

      <main>
        {/* Collection Hero */}
        <section
          className="relative pt-36 pb-20 lg:pt-44 lg:pb-28"
          style={{ background: heroBg }}
        >
          {/* Fine grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#E8D5C4 1px, transparent 1px), linear-gradient(90deg, #E8D5C4 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#B0ABA5] mb-10">
              <Link href="/" className="hover:text-[#D4B483] transition-colors">
                Home
              </Link>
              <span className="text-[#3D5749]">/</span>
              <span className="text-[#D4B483]">{category}</span>
            </nav>

            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#B8975A]" />
                <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
                  {subheadline}
                </span>
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl text-[#F0EBE1] mb-6"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontWeight: 400,
                }}
              >
                {headline}
              </h1>
              <p className="text-[#B0ABA5] leading-relaxed max-w-lg">{description}</p>

              {/* Product count */}
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#8C8680] mt-6">
                {products.length} pieces — {modernProducts.length} Modern,{" "}
                {timelessProducts.length} Timeless
              </p>
            </div>
          </div>
        </section>

        {/* Main product section */}
        <section className="bg-[#FAF7F2] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Modern Collection */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2
                    className="text-2xl text-[#1C1C1A]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    The Modern Collection
                  </h2>
                  <p className="text-sm text-[#8C8680] mt-1">
                    Geometric, architectural, and rigorously crafted
                  </p>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-[#B8975A] px-3 py-1 border border-[#B8975A]/30">
                  {modernProducts.length} pieces
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {modernProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-6 my-14">
              <div className="flex-1 h-px bg-[#E8D5C4]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#B8975A]">
                &amp;
              </span>
              <div className="flex-1 h-px bg-[#E8D5C4]" />
            </div>

            {/* Timeless Collection */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2
                    className="text-2xl text-[#1C1C1A]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    The Timeless Collection
                  </h2>
                  <p className="text-sm text-[#8C8680] mt-1">
                    Organic, botanical, and enduringly beautiful
                  </p>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-[#B8975A] px-3 py-1 border border-[#B8975A]/30">
                  {timelessProducts.length} pieces
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {timelessProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability strip */}
        <div className="bg-[#2A3D35] py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              {[
                { icon: "♻", text: "100% Recycled Metals" },
                { icon: "✦", text: "Hand-Crafted in London" },
                { icon: "◈", text: "Ethical Stone Sourcing" },
                { icon: "⬡", text: "Carbon-Neutral Packaging" },
                { icon: "∞", text: "Lifetime Maintenance" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-[#B8975A] text-sm">{item.icon}</span>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#B0ABA5]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <CTABanner
          variant="light"
          eyebrow="Bespoke"
          headline="Can't find exactly what you're looking for?"
          subheadline="Our jeweller takes bespoke commissions — a chance to create a necklace or bracelet designed entirely around you and your story."
          primaryCTA={{ label: ctaLabel, href: ctaHref }}
          secondaryCTA={{ label: "Learn More", href: "/#craftsmanship" }}
        />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      <Footer />
    </>
  );
}
