import Link from "next/link";

interface CTABannerProps {
  variant?: "dark" | "gold" | "light";
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export default function CTABanner({
  variant = "dark",
  eyebrow,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: CTABannerProps) {
  const variants = {
    dark: {
      bg: "bg-[#2A3D35]",
      text: "text-[#F0EBE1]",
      subtext: "text-[#B0ABA5]",
      eyebrowColor: "text-[#B8975A]",
      eyebrowLine: "bg-[#B8975A]",
      primaryBtn: "bg-[#B8975A] text-[#1C1C1A] hover:bg-[#D4B483]",
      secondaryBtn:
        "border border-[#E8D5C4]/40 text-[#E8D5C4] hover:border-[#D4B483] hover:text-[#D4B483]",
    },
    gold: {
      bg: "bg-[#B8975A]",
      text: "text-[#1C1C1A]",
      subtext: "text-[#5C4820]",
      eyebrowColor: "text-[#1C1C1A]",
      eyebrowLine: "bg-[#1C1C1A]",
      primaryBtn: "bg-[#1C1C1A] text-[#FAF7F2] hover:bg-[#2A3D35]",
      secondaryBtn:
        "border border-[#1C1C1A]/40 text-[#1C1C1A] hover:border-[#1C1C1A]",
    },
    light: {
      bg: "bg-[#F0EBE1]",
      text: "text-[#1C1C1A]",
      subtext: "text-[#8C8680]",
      eyebrowColor: "text-[#B8975A]",
      eyebrowLine: "bg-[#B8975A]",
      primaryBtn: "bg-[#2A3D35] text-[#F0EBE1] hover:bg-[#3D5749]",
      secondaryBtn:
        "border border-[#2A3D35]/40 text-[#2A3D35] hover:border-[#2A3D35]",
    },
  };

  const v = variants[variant];

  return (
    <section className={`${v.bg} py-16 lg:py-20`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        {eyebrow && (
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className={`w-8 h-px ${v.eyebrowLine}`} />
            <span className={`text-[11px] tracking-[0.35em] uppercase ${v.eyebrowColor}`}>
              {eyebrow}
            </span>
            <span className={`w-8 h-px ${v.eyebrowLine}`} />
          </div>
        )}

        <h2
          className={`text-3xl sm:text-4xl ${v.text} mb-5`}
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
        >
          {headline}
        </h2>

        {subheadline && (
          <p className={`${v.subtext} max-w-lg mx-auto mb-8 leading-relaxed`}>
            {subheadline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            className={`inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 group ${v.primaryBtn}`}
          >
            {primaryCTA.label}
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
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={`inline-flex items-center px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${v.secondaryBtn}`}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
