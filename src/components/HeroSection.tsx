"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Slide data (no JSX in the object — visuals rendered separately) ─── */
const SLIDES = [
  {
    id: 0,
    eyebrow: "Handcrafted in London",
    headlineLines: ["Wear the", "Story", "of the Earth."],
    accentLine: 1,
    sub: "Necklaces and bracelets handmade from recycled gold and ethically sourced gemstones — designed to be worn for a lifetime.",
    primaryCTA: { label: "Shop Necklaces", href: "/collections/necklaces" },
    secondaryCTA: { label: "Shop Bracelets", href: "/collections/bracelets" },
    bg: "#2A3D35",
    bgGradient:
      "radial-gradient(ellipse 70% 70% at 65% 40%, #3D5749 0%, #2A3D35 50%, #1A2820 100%)",
    glowColor:
      "radial-gradient(circle, #D4B483 0%, #B8975A 50%, transparent 75%)",
    glowClass: "right-[8%] top-1/2 -translate-y-1/2",
    stats: [
      { value: "100%", label: "Recycled Gold" },
      { value: "6+", label: "Years Crafting" },
      { value: "2,400+", label: "Happy Wearers" },
    ],
  },
  {
    id: 1,
    eyebrow: "The Modern Collection",
    headlineLines: ["Architecture", "for the", "Body."],
    accentLine: 0,
    sub: "Geometric forms and bold silhouettes cut from recycled 18k gold. Pieces that reward a second look and earn a lifetime of wearing.",
    primaryCTA: {
      label: "Explore Modern",
      href: "/collections/necklaces?collection=modern",
    },
    secondaryCTA: { label: "See All Pieces", href: "/collections/necklaces" },
    bg: "#1C1C1A",
    bgGradient:
      "radial-gradient(ellipse 60% 80% at 30% 60%, #2E2A20 0%, #1C1C1A 55%, #0E0E0C 100%)",
    glowColor:
      "radial-gradient(circle, #C9A870 0%, #9A7A42 55%, transparent 80%)",
    glowClass: "left-[5%] top-1/3",
    stats: [
      { value: "6", label: "Modern Pieces" },
      { value: "18k", label: "Recycled Gold" },
      { value: "1", label: "Maker per Piece" },
    ],
  },
  {
    id: 2,
    eyebrow: "The Timeless Collection",
    headlineLines: ["Nature,", "Memory,", "and the Eternal."],
    accentLine: 1,
    sub: "Drawn from botanical forms — the arc of a moon, the curl of a vine. Pieces that carry personal meaning from the very first wearing.",
    primaryCTA: {
      label: "Explore Timeless",
      href: "/collections/necklaces?collection=timeless",
    },
    secondaryCTA: { label: "Shop Bracelets", href: "/collections/bracelets" },
    bg: "#2C2018",
    bgGradient:
      "radial-gradient(ellipse 75% 65% at 60% 35%, #4A3828 0%, #2C2018 55%, #1A1410 100%)",
    glowColor:
      "radial-gradient(circle, #E8C4B8 0%, #C4948A 50%, transparent 75%)",
    glowClass: "right-[10%] top-1/2 -translate-y-1/2",
    stats: [
      { value: "6", label: "Timeless Pieces" },
      { value: "100%", label: "Ethical Stones" },
      { value: "∞", label: "Lifetime Care" },
    ],
  },
] as const;

const AUTOPLAY_MS = 5500;

/* ─── Per-slide SVG visuals ─── */
function SlideVisual({ id }: { id: number }) {
  if (id === 0) {
    return (
      <svg viewBox="0 0 300 380" className="w-full h-full" fill="none">
        <ellipse cx="150" cy="180" rx="120" ry="140" stroke="#D4B483" strokeWidth="2.5" />
        <circle cx="150" cy="320" r="18" stroke="#D4B483" strokeWidth="2" fill="none" />
        <line x1="150" y1="302" x2="150" y2="180" stroke="#D4B483" strokeWidth="1.5" />
        <ellipse cx="150" cy="180" rx="80" ry="90" stroke="#B8975A" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="150" cy="320" r="6" fill="#D4B483" opacity="0.5" />
      </svg>
    );
  }
  if (id === 1) {
    return (
      <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
        <polygon points="150,30 270,110 230,240 70,240 30,110" stroke="#D4B483" strokeWidth="2" />
        <polygon points="150,70 230,130 200,210 100,210 70,130" stroke="#B8975A" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="150" cy="155" r="28" stroke="#D4B483" strokeWidth="2" />
        <line x1="150" y1="30" x2="150" y2="127" stroke="#B8975A" strokeWidth="1" opacity="0.5" />
        <line x1="150" y1="183" x2="150" y2="240" stroke="#B8975A" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 380" className="w-full h-full" fill="none">
      <path d="M200,60 Q270,180 200,300 Q130,240 150,180 Q170,120 200,60Z" stroke="#D4B483" strokeWidth="2" />
      <path d="M80,320 Q100,280 120,260 Q140,240 130,200 Q120,160 150,140" stroke="#B8975A" strokeWidth="1.5" fill="none" />
      <ellipse cx="150" cy="134" rx="14" ry="8" stroke="#B8975A" strokeWidth="1.2" transform="rotate(-30 150 134)" />
      <ellipse cx="118" cy="208" rx="10" ry="6" stroke="#B8975A" strokeWidth="1" transform="rotate(20 118 208)" />
      <circle cx="200" cy="180" r="22" stroke="#D4B483" strokeWidth="1.5" />
      <circle cx="200" cy="180" r="12" stroke="#D4B483" strokeWidth="0.8" strokeDasharray="3 3" />
    </svg>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true); // false during crossfade
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inTransition = useRef(false);

  const goTo = useCallback((index: number) => {
    if (inTransition.current) return;
    inTransition.current = true;
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
      inTransition.current = false;
    }, 350);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: slide.bg }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background gradient (fades with content) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: slide.bgGradient,
          opacity: visible ? 1 : 0,
          transition: "opacity 350ms ease",
        }}
      />

      {/* ── Accent glow orb ── */}
      <div
        className={`absolute ${slide.glowClass} rounded-full pointer-events-none`}
        style={{
          width: 480,
          height: 480,
          background: slide.glowColor,
          opacity: visible ? 0.15 : 0,
          transition: "opacity 350ms ease",
        }}
      />

      {/* ── Fine grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E8D5C4 1px, transparent 1px), linear-gradient(90deg, #E8D5C4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.025,
        }}
      />

      {/* ── Decorative SVG visual (desktop only) ── */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center pointer-events-none">
        <div
          className="w-80 h-96"
          style={{ opacity: visible ? 0.2 : 0, transition: "opacity 350ms ease" }}
        >
          <SlideVisual id={slide.id} />
        </div>
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute top-28 right-8 lg:right-10 hidden md:flex flex-col items-end gap-1 select-none pointer-events-none">
        <span
          className="text-4xl text-white/10"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            opacity: visible ? 1 : 0,
            transition: "opacity 350ms ease",
          }}
        >
          0{current + 1}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
          / 0{SLIDES.length}
        </span>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-28 pt-36"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 350ms ease" }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#B8975A]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
              {slide.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-[#F0EBE1] leading-[1.08] mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
          >
            {slide.headlineLines.map((line, i) =>
              i === slide.accentLine ? (
                <span key={i}>
                  <em className="text-[#D4B483]" style={{ fontStyle: "italic" }}>{line}</em>
                  <br />
                </span>
              ) : (
                <span key={i}>{line}<br /></span>
              )
            )}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#B0ABA5] leading-relaxed mb-10 max-w-md">
            {slide.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={slide.primaryCTA.href}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B8975A] text-[#1C1C1A] text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#D4B483] transition-colors duration-300 group"
            >
              {slide.primaryCTA.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={slide.secondaryCTA.href}
              className="inline-flex items-center justify-center px-8 py-4 border border-[#E8D5C4]/40 text-[#E8D5C4] text-sm tracking-[0.15em] uppercase hover:border-[#D4B483] hover:text-[#D4B483] transition-colors duration-300"
            >
              {slide.secondaryCTA.label}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10">
            {slide.stats.map((stat) => (
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

      {/* ── Controls bar ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-8 flex items-center justify-between">
        {/* Dot indicators with progress bar */}
        <div className="flex items-center gap-4">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex items-center gap-2 py-1"
            >
              <span
                className="block w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i === current ? "#B8975A" : "rgba(255,255,255,0.3)" }}
              />
              {i === current && (
                <span className="relative h-px w-10 bg-white/20 overflow-hidden block">
                  <span
                    key={`${current}-bar`}
                    className="absolute inset-y-0 left-0 bg-[#B8975A]"
                    style={{
                      animation: paused ? "none" : `heroProgress ${AUTOPLAY_MS}ms linear forwards`,
                    }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/50 hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/50 hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress animation keyframe */}
      <style>{`
        @keyframes heroProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}
