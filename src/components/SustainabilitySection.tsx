const pillars = [
  {
    number: "01",
    title: "Recycled Metals",
    detail:
      "100% of our gold and silver comes from certified recycled sources — recovered from industrial waste and verified by the Responsible Jewellery Council. Mining new gold is one of the most destructive industries on earth. We chose not to participate in it.",
    stat: "0",
    statUnit: "grams of new-mined metal",
  },
  {
    number: "02",
    title: "Ethical Gemstones",
    detail:
      "Every stone we set is individually sourced and traced. We work directly with certified ethical mines in Brazil, Madagascar, and Sri Lanka — meeting our suppliers in person to verify the conditions in which stones are found.",
    stat: "100%",
    statUnit: "direct-traced gemstones",
  },
  {
    number: "03",
    title: "Carbon-Conscious Packaging",
    detail:
      "Our packaging uses FSC-certified recycled paper, soy-based inks, and linen pouches grown without pesticides. The outer box is 100% compostable. We've removed plastic from every part of the unboxing experience.",
    stat: "Zero",
    statUnit: "single-use plastic",
  },
  {
    number: "04",
    title: "The Long Arc",
    detail:
      "We offer lifetime maintenance on all pieces — free resizing, repolishing, and stone-tightening. Because the most sustainable piece of jewellery is the one that's still being worn twenty years from now.",
    stat: "Lifetime",
    statUnit: "maintenance guarantee",
  },
];

export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="bg-[#FAF7F2] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#B8975A]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
                Our Commitment
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl text-[#1C1C1A] mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
            >
              Conscious Luxury
              <br />
              <em className="text-[#2A3D35]" style={{ fontStyle: "italic" }}>
                is not a compromise.
              </em>
            </h2>
            <p className="text-[#8C8680] leading-relaxed mb-6">
              We founded Maison Aurore in 2018 with one guiding question: could
              we make jewellery that is genuinely beautiful{" "}
              <em>and</em> genuinely responsible?
            </p>
            <p className="text-[#8C8680] leading-relaxed">
              After six years, the answer is an absolute yes. Our sustainability
              practice is not a marketing position — it is a set of operational
              commitments that shape every decision we make, from the suppliers
              we choose to the packaging we use.
            </p>
          </div>

          {/* Visual sustainability indicator */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Outer ring */}
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#E8D5C4"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#2A3D35"
                  strokeWidth="3"
                  strokeDasharray="534 0"
                  strokeLinecap="round"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="68"
                  fill="none"
                  stroke="#B8975A"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  className="text-4xl text-[#2A3D35] mb-1"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  100%
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-[#8C8680]">
                  Recycled Metals
                </span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-0 right-0 bg-[#2A3D35] text-[#E8D5C4] px-3 py-2 text-[10px] tracking-wider uppercase">
              RJC Certified
            </div>
            <div className="absolute bottom-0 left-0 bg-[#B8975A] text-[#1C1C1A] px-3 py-2 text-[10px] tracking-wider uppercase">
              B Corp Member
            </div>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#E8D5C4]/40">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="bg-[#FAF7F2] p-8">
              <div className="text-[#E8D5C4] text-4xl font-light mb-4"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {pillar.number}
              </div>
              <h3
                className="text-base text-[#1C1C1A] mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
              >
                {pillar.title}
              </h3>
              <p className="text-sm text-[#8C8680] leading-relaxed mb-6">
                {pillar.detail}
              </p>
              <div className="pt-5 border-t border-[#E8D5C4]">
                <p
                  className="text-2xl text-[#B8975A]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {pillar.stat}
                </p>
                <p className="text-[11px] text-[#8C8680] tracking-wide mt-0.5">
                  {pillar.statUnit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
