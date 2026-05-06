import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#2A3D35]">
      {/* Background gradient field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 65% 40%, #3D5749 0%, #2A3D35 50%, #1A2820 100%)",
        }}
      />

      {/* Decorative gold circle */}
      <div
        className="absolute right-[8%] top-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle, #D4B483 0%, #B8975A 50%, transparent 75%)",
        }}
      />

      {/* Fine grid overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#E8D5C4 1px, transparent 1px), linear-gradient(90deg, #E8D5C4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient product silhouette area */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center">
        <div className="relative w-80 h-96">
          {/* Necklace silhouette - abstract SVG */}
          <svg
            viewBox="0 0 300 380"
            className="w-full h-full opacity-20"
            fill="none"
          >
            <ellipse
              cx="150"
              cy="180"
              rx="120"
              ry="140"
              stroke="#D4B483"
              strokeWidth="2.5"
            />
            <circle cx="150" cy="320" r="18" stroke="#D4B483" strokeWidth="2" fill="none" />
            <line x1="150" y1="302" x2="150" y2="180" stroke="#D4B483" strokeWidth="1.5" />
            <ellipse
              cx="150"
              cy="180"
              rx="80"
              ry="90"
              stroke="#B8975A"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>
          {/* Bracelet silhouette */}
          <svg
            viewBox="0 0 140 140"
            className="absolute bottom-0 right-0 w-32 h-32 opacity-15"
            fill="none"
          >
            <circle cx="70" cy="70" r="55" stroke="#D4B483" strokeWidth="3" />
            <circle cx="70" cy="70" r="40" stroke="#B8975A" strokeWidth="1.5" strokeDasharray="6 4" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          {/* Pre-heading */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#B8975A]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
              Handcrafted in London
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-[#F0EBE1] leading-[1.08] mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
          >
            Wear the
            <br />
            <em className="text-[#D4B483]" style={{ fontStyle: "italic" }}>
              Story
            </em>
            <br />
            of the Earth.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#B0ABA5] leading-relaxed mb-10 max-w-md">
            Necklaces and bracelets handmade from recycled gold and ethically
            sourced gemstones — designed to be worn for a lifetime, and cared
            for by the planet.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/collections/necklaces"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B8975A] text-[#1C1C1A] text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#D4B483] transition-all duration-300 group"
            >
              Shop Necklaces
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/collections/bracelets"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#E8D5C4]/40 text-[#E8D5C4] text-sm tracking-[0.15em] uppercase hover:border-[#D4B483] hover:text-[#D4B483] transition-all duration-300"
            >
              Shop Bracelets
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-[#3D5749]">
            {[
              { value: "100%", label: "Recycled Gold" },
              { value: "6+", label: "Years Crafting" },
              { value: "2,400+", label: "Happy Wearers" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-2xl text-[#D4B483]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[11px] text-[#8C8680] tracking-wider uppercase mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#E8D5C4]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#E8D5C4] to-transparent" />
      </div>
    </section>
  );
}
