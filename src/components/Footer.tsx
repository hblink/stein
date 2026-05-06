import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2A3D35] text-[#E8D5C4]">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p
                className="text-xl tracking-[0.18em] uppercase text-[#F0EBE1] mb-1"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 600 }}
              >
                Maison Aurore
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#B0ABA5]">
                Artisan Jewellery
              </p>
            </div>
            <p className="text-sm text-[#B0ABA5] leading-relaxed max-w-xs mb-6">
              Every piece is handcrafted in our London studio using ethically
              sourced materials. Wearable art for the conscious soul.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {["Instagram", "Pinterest", "TikTok"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="text-[#8C8680] hover:text-[#B8975A] transition-colors duration-300 text-xs tracking-widest uppercase"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#B8975A] mb-5 font-medium">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "All Necklaces", href: "/collections/necklaces" },
                { label: "All Bracelets", href: "/collections/bracelets" },
                { label: "The Modern Collection", href: "/collections/necklaces?collection=modern" },
                { label: "The Timeless Collection", href: "/collections/necklaces?collection=timeless" },
                { label: "Bestsellers", href: "/#bestsellers" },
                { label: "New Arrivals", href: "/#new-arrivals" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#B0ABA5] hover:text-[#E8D5C4] transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About column */}
          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#B8975A] mb-5 font-medium">
              Our World
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Our Story", href: "/#our-story" },
                { label: "Sustainability", href: "/#sustainability" },
                { label: "Craftsmanship", href: "/#craftsmanship" },
                { label: "Materials Guide", href: "#" },
                { label: "Packaging", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#B0ABA5] hover:text-[#E8D5C4] transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help column */}
          <div>
            <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#B8975A] mb-5 font-medium">
              Help &amp; Care
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Sizing Guide", href: "#" },
                { label: "Care Instructions", href: "#" },
                { label: "Shipping & Returns", href: "#" },
                { label: "Bespoke Orders", href: "#" },
                { label: "Contact Us", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#B0ABA5] hover:text-[#E8D5C4] transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-[#3D5749]">
              <p className="text-xs text-[#8C8680] mb-1">Bespoke enquiries</p>
              <a
                href="mailto:bespoke@maisonaurore.com"
                className="text-sm text-[#B8975A] hover:text-[#D4B483] transition-colors"
              >
                bespoke@maisonaurore.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability pledge bar */}
      <div className="border-t border-[#3D5749] bg-[#1A2820]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
              {[
                "100% Recycled Metals",
                "Ethical Stone Sourcing",
                "Carbon-Neutral Packaging",
                "RJC Certified",
              ].map((pledge) => (
                <span key={pledge} className="flex items-center gap-2 text-xs text-[#8C8680]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0" />
                  {pledge}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#8C8680]">London Studio — Est. 2018</p>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="bg-[#1A2820] border-t border-[#2A3D35]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8C8680]">
            <p>© {new Date().getFullYear()} Maison Aurore Ltd. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="#" className="hover:text-[#B0ABA5] transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-[#B0ABA5] transition-colors">Terms</Link>
              <Link href="#" className="hover:text-[#B0ABA5] transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
