const steps = [
  {
    step: "01",
    title: "Design",
    description:
      "Each piece begins as a series of sketches — drawn by hand in the studio. We explore form, proportion, and material before committing to a final design direction.",
  },
  {
    step: "02",
    title: "Material Selection",
    description:
      "Recycled gold and silver are sourced from certified suppliers and refined to jewellery grade in our studio. Gemstones are individually chosen for their character.",
  },
  {
    step: "03",
    title: "Hand-Forming",
    description:
      "Metal is heated, shaped, and worked by hand using traditional tools. There is no CNC milling here — only the jeweller's hands and decades of accumulated skill.",
  },
  {
    step: "04",
    title: "Setting & Finishing",
    description:
      "Stones are set one by one, each secured by hand. Surfaces are polished over several hours to achieve the precise finish — brushed, hammered, or mirror — that each design demands.",
  },
];

export default function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="bg-[#1A2820] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: visual */}
          <div className="relative">
            {/* Main visual block */}
            <div
              className="aspect-square max-w-sm mx-auto lg:mx-0 relative"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 40%, #3D5749 0%, #2A3D35 50%, #1A2820 100%)",
              }}
            >
              {/* Decorative SVG jewellery tools */}
              <svg
                viewBox="0 0 300 300"
                className="absolute inset-0 w-full h-full opacity-30"
                fill="none"
              >
                {/* Pliers */}
                <line x1="80" y1="60" x2="140" y2="160" stroke="#D4B483" strokeWidth="3" strokeLinecap="round" />
                <line x1="100" y1="55" x2="155" y2="155" stroke="#D4B483" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="120" cy="52" rx="18" ry="8" stroke="#D4B483" strokeWidth="2" />
                {/* Ring mandrel */}
                <path d="M200 80 L220 220 Q210 240 190 240 Q185 225 200 80" stroke="#B8975A" strokeWidth="2.5" fill="none" />
                {/* Wire coil */}
                <path d="M40 200 Q60 180 80 200 Q100 220 120 200 Q140 180 160 200" stroke="#D4B483" strokeWidth="1.5" fill="none" />
                {/* Gemstone */}
                <polygon points="240,120 260,150 240,175 215,150" stroke="#B8975A" strokeWidth="2" fill="none" />
                <line x1="240" y1="120" x2="240" y2="175" stroke="#B8975A" strokeWidth="1" />
                <line x1="215" y1="150" x2="260" y2="150" stroke="#B8975A" strokeWidth="1" />
              </svg>

              {/* Corner text */}
              <div className="absolute bottom-6 right-6 text-right">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#B8975A]">London Studio</p>
                <p className="text-[10px] text-[#8C8680]">Since 2018</p>
              </div>
            </div>

            {/* Floating stat */}
            <div className="absolute -bottom-4 -right-4 lg:-right-8 bg-[#B8975A] p-6 text-[#1C1C1A]">
              <p
                className="text-3xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                6hrs
              </p>
              <p className="text-[11px] tracking-wider uppercase mt-1">
                Average per piece
              </p>
            </div>
          </div>

          {/* Right: copy + process */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#B8975A]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
                Our Process
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl text-[#F0EBE1] mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
            >
              Every Piece.
              <br />
              <em className="text-[#D4B483]" style={{ fontStyle: "italic" }}>
                One Maker.
              </em>
            </h2>
            <p className="text-[#B0ABA5] leading-relaxed mb-10">
              In our London studio, a single jeweller takes each piece from raw
              material to finished form. This is not efficiency — it is
              intentional. We believe that the best jewellery carries the mark
              of one person&apos;s careful attention throughout.
            </p>

            {/* Process steps */}
            <div className="flex flex-col gap-6">
              {steps.map((step) => (
                <div key={step.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 border border-[#B8975A]/40 flex items-center justify-center">
                    <span className="text-[10px] text-[#B8975A] tracking-wider">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h4
                      className="text-sm text-[#F0EBE1] mb-1"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-sm text-[#8C8680] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
