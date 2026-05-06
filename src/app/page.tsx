import Link from "next/link";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CollectionsSection from "@/components/CollectionsSection";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getBestsellerProducts } from "@/lib/products";

export default function Home() {
  const bestsellers = getBestsellerProducts();

  return (
    <>
      <Navigation />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Features / USPs */}
        <FeaturesSection />

        {/* 3. Collections showcase */}
        <CollectionsSection />

        {/* 4. Mid-page CTA */}
        <CTABanner
          variant="gold"
          eyebrow="New Arrivals"
          headline="The Spring Edit has arrived."
          subheadline="Three new pieces joining the Modern Collection — inspired by solstice geometry and the architecture of first light."
          primaryCTA={{ label: "See New Pieces", href: "/collections/necklaces?filter=new" }}
          secondaryCTA={{ label: "All Necklaces", href: "/collections/necklaces" }}
        />

        {/* 5. Bestsellers */}
        <section id="bestsellers" className="bg-[#FAF7F2] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-[#B8975A]" />
                  <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
                    Most Loved
                  </span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl text-[#1C1C1A]"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 400,
                  }}
                >
                  Our Bestsellers
                </h2>
              </div>
              <Link
                href="/collections/necklaces"
                className="text-sm text-[#B8975A] tracking-[0.15em] uppercase link-underline hidden sm:block"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Craftsmanship story */}
        <CraftsmanshipSection />

        {/* 7. Sustainability deep-dive */}
        <SustainabilitySection />

        {/* 8. Mid-page CTA 2 */}
        <CTABanner
          variant="dark"
          eyebrow="Bespoke Service"
          headline="Commission a piece made only for you."
          subheadline="Work directly with our jeweller to create a bespoke necklace or bracelet — using your choice of metal, stone, and design direction. Each commission is a true collaboration."
          primaryCTA={{ label: "Enquire About Bespoke", href: "#" }}
          secondaryCTA={{ label: "See Our Work", href: "/collections/necklaces" }}
        />

        {/* 9. Testimonials */}
        <TestimonialsSection />

        {/* 10. Newsletter */}
        <NewsletterSection />
      </main>

      <Footer />
    </>
  );
}
