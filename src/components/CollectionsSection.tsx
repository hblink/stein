import Link from "next/link";

const collections = [
  {
    id: "modern",
    name: "The Modern Collection",
    tagline: "Architecture for the body",
    description:
      "Clean geometry, bold silhouettes, and a rigorous material honesty. The Modern Collection is for those who find beauty in structure — pieces designed with the precision of a sketch and refined by the patience of a craftsperson's hand.",
    pieces: ["Solstice Pendant", "Horizon Bar", "Roots Chain", "Weave Cuff", "Arc Stack", "Slab Bangle"],
    ctaLabel: "Explore Modern",
    ctaHref: "/collections/necklaces?collection=modern",
    bgGradient:
      "linear-gradient(135deg, #2A3D35 0%, #1A2820 60%, #3D5749 100%)",
    accentColor: "#D4B483",
    textColor: "#F0EBE1",
    mutedColor: "#B0ABA5",
    badge: "Geometric & Bold",
  },
  {
    id: "timeless",
    name: "The Timeless Collection",
    tagline: "Nature, memory, and the eternal",
    description:
      "Drawn from the forms of nature — the arc of a moon, the curve of a vine, the smoothness of a river pebble. The Timeless Collection honours the organic and enduring, creating pieces that carry personal meaning from the first wearing.",
    pieces: ["Forest Thread", "Luna Arc", "Bloom Pendant", "Pebble Bracelet", "Tendril Wrap", "Knot Bracelet"],
    ctaLabel: "Explore Timeless",
    ctaHref: "/collections/necklaces?collection=timeless",
    bgGradient:
      "linear-gradient(135deg, #FAF7F2 0%, #F0EBE1 50%, #E8D5C4 100%)",
    accentColor: "#B8975A",
    textColor: "#1C1C1A",
    mutedColor: "#8C8680",
    badge: "Organic & Enduring",
  },
];

export default function CollectionsSection() {
  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#F0EBE1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#B8975A]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
                Our Collections
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl text-[#1C1C1A]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
            >
              Two Worlds.
              <em className="text-[#B8975A] ml-2" style={{ fontStyle: "italic" }}>
                One Philosophy.
              </em>
            </h2>
          </div>
          <p className="text-sm text-[#8C8680] max-w-xs text-right hidden sm:block">
            Each collection is a distinct design language,
            united by sustainable material practice.
          </p>
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              className="group relative overflow-hidden rounded-sm min-h-[480px] flex flex-col justify-between p-10"
              style={{ background: col.bgGradient }}
            >
              {/* Badge */}
              <div
                className="inline-flex self-start items-center gap-2 px-3 py-1.5 border text-[10px] tracking-[0.25em] uppercase mb-auto"
                style={{
                  borderColor: `${col.accentColor}60`,
                  color: col.accentColor,
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: col.accentColor }}
                />
                {col.badge}
              </div>

              {/* Content */}
              <div className="mt-12">
                <p
                  className="text-[11px] tracking-[0.3em] uppercase mb-3"
                  style={{ color: col.accentColor }}
                >
                  {col.tagline}
                </p>
                <h3
                  className="text-3xl sm:text-4xl mb-5"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 400,
                    color: col.textColor,
                  }}
                >
                  {col.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-8 max-w-sm"
                  style={{ color: col.mutedColor }}
                >
                  {col.description}
                </p>

                {/* Piece list */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {col.pieces.map((piece) => (
                    <span
                      key={piece}
                      className="text-[11px] tracking-wider px-2.5 py-1"
                      style={{
                        color: col.accentColor,
                        background: `${col.accentColor}15`,
                        border: `1px solid ${col.accentColor}30`,
                      }}
                    >
                      {piece}
                    </span>
                  ))}
                </div>

                <Link
                  href={col.ctaHref}
                  className="inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase font-medium group/btn"
                  style={{ color: col.accentColor }}
                >
                  {col.ctaLabel}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
