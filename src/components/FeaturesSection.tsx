const features = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Sustainably Sourced",
    subtitle: "Materials with integrity",
    description:
      "Every gram of gold is recycled from pre-consumer industry waste. Every gemstone is individually verified for ethical provenance. We never compromise on what's inside.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Master Craftsmanship",
    subtitle: "Hours become heirlooms",
    description:
      "Shaped, soldered, and finished entirely by hand in our London studio. Each piece passes through the hands of a single jeweller from raw material to final polish.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Timeless by Design",
    subtitle: "Contemporary yet enduring",
    description:
      "Our pieces are designed to outlast trends — drawn from geometry, nature, and architectural form. Jewellery you'll reach for in twenty years, just as you do today.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Made with Intention",
    subtitle: "Each piece, only one maker",
    description:
      "We deliberately make small and slowly. No factories. No assembly lines. Only considered, careful work — because you deserve to wear something made with genuine care.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#FAF7F2] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#B8975A]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
              Why Maison Aurore
            </span>
            <span className="w-8 h-px bg-[#B8975A]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl text-[#1C1C1A] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
          >
            Four Principles.
            <em className="text-[#B8975A] ml-2" style={{ fontStyle: "italic" }}>
              No Exceptions.
            </em>
          </h2>
          <p className="text-[#8C8680] max-w-xl mx-auto leading-relaxed">
            We built Maison Aurore on the belief that beautiful jewellery and
            responsible practice are not in conflict — they are inseparable.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group flex flex-col p-8 bg-white hover:bg-[#2A3D35] transition-all duration-500 rounded-sm border border-[#E8D5C4]/60 hover:border-[#2A3D35]"
            >
              <div className="text-[#B8975A] group-hover:text-[#D4B483] transition-colors duration-500 mb-5">
                {feature.icon}
              </div>
              <h3
                className="text-lg text-[#1C1C1A] group-hover:text-[#F0EBE1] mb-1 transition-colors duration-500"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
              >
                {feature.title}
              </h3>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#B8975A] group-hover:text-[#D4B483] mb-4 transition-colors duration-500">
                {feature.subtitle}
              </p>
              <p className="text-sm text-[#8C8680] group-hover:text-[#B0ABA5] leading-relaxed transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
