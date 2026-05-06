const testimonials = [
  {
    quote:
      "I've worn my Solstice Pendant every single day for two years. It's the first piece of jewellery I've ever owned that makes me feel like myself — and knowing it's made responsibly makes it even more meaningful.",
    author: "Isabelle M.",
    location: "London",
    product: "Solstice Pendant",
    rating: 5,
  },
  {
    quote:
      "The craftsmanship is extraordinary. I watched a tour of the studio on Instagram and was moved by the care and skill that goes into each piece. The Forest Thread necklace is genuinely the most beautiful thing I've ever worn.",
    author: "Caoimhe R.",
    location: "Dublin",
    product: "Forest Thread",
    rating: 5,
  },
  {
    quote:
      "I bought the Arc Stack for myself as a thirtieth birthday gift and they are perfect. The quality is exceptional and the fact that they're made from recycled gold is something I tell everyone about proudly.",
    author: "Margot D.",
    location: "Paris",
    product: "Arc Stack",
    rating: 5,
  },
  {
    quote:
      "I was hesitant to spend this much on jewellery but after two years my Weave Cuff still looks immaculate. It's become my signature piece — I feel underdressed without it. Worth every penny.",
    author: "Sarah K.",
    location: "Edinburgh",
    product: "Weave Cuff",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#2A3D35] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#B8975A]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
              From Our Community
            </span>
            <span className="w-8 h-px bg-[#B8975A]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl text-[#F0EBE1]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
          >
            Worn with
            <em className="text-[#D4B483] ml-2" style={{ fontStyle: "italic" }}>
              love.
            </em>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col bg-[#1A2820] p-7 border border-[#3D5749]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <svg
                    key={s}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="#B8975A"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Opening quotation mark */}
              <span
                className="text-5xl text-[#B8975A]/30 leading-none mb-2 -mt-2"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p className="text-sm text-[#B0ABA5] leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              {/* Author */}
              <div className="pt-5 border-t border-[#3D5749]">
                <p className="text-sm text-[#E8D5C4] font-medium">{t.author}</p>
                <p className="text-[11px] text-[#8C8680] mt-0.5">{t.location}</p>
                <p className="text-[11px] text-[#B8975A] mt-2 tracking-wider">
                  Wearing: {t.product}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof aggregate */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t border-[#3D5749]">
          <div className="text-center">
            <p
              className="text-3xl text-[#D4B483]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              4.9
            </p>
            <p className="text-[11px] text-[#8C8680] tracking-wider mt-1">Average Rating</p>
          </div>
          <div className="w-px h-10 bg-[#3D5749] hidden sm:block" />
          <div className="text-center">
            <p
              className="text-3xl text-[#D4B483]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              2,400+
            </p>
            <p className="text-[11px] text-[#8C8680] tracking-wider mt-1">Verified Reviews</p>
          </div>
          <div className="w-px h-10 bg-[#3D5749] hidden sm:block" />
          <div className="text-center">
            <p
              className="text-3xl text-[#D4B483]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              94%
            </p>
            <p className="text-[11px] text-[#8C8680] tracking-wider mt-1">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
}
