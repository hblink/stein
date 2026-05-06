"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  {
    id: 0,
    eyebrow: "Handcrafted in London",
    headline: ["Wear the", "Story", "of the Earth."],
    headlineAccentIndex: 1,
    sub: "Necklaces and bracelets handmade from recycled gold and ethically sourced gemstones — designed to be worn for a lifetime.",
    primaryCTA: { label: "Shop Necklaces", href: "/collections/necklaces" },
    secondaryCTA: { label: "Shop Bracelets", href: "/collections/bracelets" },
    bg: "radial-gradient(ellipse 70% 70% at 65% 40%, #3D5749 0%, #2A3D35 50%, #1A2820 100%)",
    accentGlow: "radial-gradient(circle, #D4B483 0%, #B8975A 50%, transparent 75%)",
    glowPosition: "right-[8%] top-1/2 -translate-y-1/2",
    visual: (
      <svg viewBox="0 0 300 380" className="w-full h-full opacity-20" fill="none">
        <ellipse cx="150" cy="180" rx="120" ry="140" stroke="#D4B483" strokeWidth="2.5" />
        <circle cx="150" cy="320" r="18" stroke="#D4B483" strokeWidth="2" fill="none" />
        <line x1="150" y1="302" x2="150" y2="180" stroke="#D4B483" strokeWidth="1.5" />
        <ellipse cx="150" cy="180" rx="80" ry="90" stroke="#B8975A" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="150" cy="320" r="6" fill="#D4B483" opacity="0.5" />
      </svg>
    ),
    stats: [
      { value: "100%", label: "Recycled Gold" },
      { value: "6+", label: "Years Crafting" },
      { value: "2,400+", label: "Happy Wearers" },
    ],
  },
  {
    id: 1,
    eyebrow: "The Modern Collection",
    headline: ["Architecture", "for the", "Body."],
    headlineAccentIndex: 0,
    sub: "Geometric forms and bold silhouettes cut from recycled 18k gold. Pieces that reward a second look and earn a lifetime of wearing.",
    primaryCTA: { label: "Explore Modern", href: "/collections/necklaces?collection=modern" },
    secondaryCTA: { label: "See All Pieces", href: "/collections/necklaces" },
    bg: "radial-gradient(ellipse 60% 80% at 30% 60%, #2E2A20 0%, #1C1C1A 55%, #0E0E0C 100%)",
    accentGlow: "radial-gradient(circle, #C9A870 0%, #9A7A42 55%, transparent 80%)",
    glowPosition: "left-[5%] top-1/3",
    visual: (
      <svg viewBox="0 0 300 300" className="w-full h-full opacity-25" fill="none">
        <polygon points="150,30 270,110 230,240 70,240 30,110" stroke="#D4B483" strokeWidth="2" />
        <polygon points="150,70 230,130 200,210 100,210 70,130" stroke="#B8975A" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="150" cy="155" r="28" stroke="#D4B483" strokeWidth="2" />
        <line x1="150" y1="30" x2="150" y2="127" stroke="#B8975A" strokeWidth="1" opacity="0.5" />
        <line x1="150" y1="183" x2="150" y2="240" stroke="#B8975A" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    stats: [
      { value: "6", label: "Modern Pieces" },
      { value: "18k", label: "Recycled Gold" },
      { value: "1", label: "Maker per Piece" },
    ],
  },
  {
    id: 2,
    eyebrow: "The Timeless Collection",
    headline: ["Nature,", "Memory,", "and the Eternal."],
    headlineAccentIndex: 1,
    sub: "Drawn from botanical forms — the arc of a moon, the curl of a vine. Pieces that carry personal meaning from the very first wearing.",
    primaryCTA: { label: "Explore Timeless", href: "/collections/necklaces?collection=timeless" },
    secondaryCTA: { label: "Shop Bracelets", href: "/collections/bracelets" },
    bg: "radial-gradient(ellipse 75% 65% at 60% 35%, #4A3828 0%, #2C2018 55%, #1A1410 100%)",
    accentGlow: "radial-gradient(circle, #E8C4B8 0%, #C4948A 50%, transparent 75%)",
    glowPosition: "right-[10%] top-1/2 -translate-y-1/2",
    visual: (
      <svg viewBox="0 0 300 380" className="w-full h-full opacity-20" fill="none">
        {/* Moon arc */}
        <path d="M200,60 Q270,180 200,300 Q130,240 150,180 Q170,120 200,60Z" stroke="#D4B483" strokeWidth="2" />
        {/* Vine tendril */}
        <path d="M80,320 Q100,280 120,260 Q140,240 130,200 Q120,160 150,140" stroke="#B8975A" strokeWidth="1.5" fill="none" />
        {/* Leaf */}
        <ellipse cx="150" cy="134" rx="14" ry="8" stroke="#B8975A" strokeWidth="1.2" transform="rotate(-30 150 134)" />
        <ellipse cx="118" cy="208" rx="10" ry="6" stroke="#B8975A" strokeWidth="1" transform="rotate(20 118 208)" />
        {/* Stone circle */}
        <circle cx="200" cy="180" r="22" stroke="#D4B483" strokeWidth="1.5" />
        <circle cx="200" cy="180" r="12" stroke="#D4B483" strokeWidth="0.8" strokeDasharray="3 3" />
      </svg>
    ),
    stats: [
      { value: "6", label: "Timeless Pieces" },
      { value: "100%", label: "Ethical Stones" },
      { value: "∞", label: "Lifetime Care" },
    ],
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 380);
    },
    [current, fading]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background — crossfades */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: slide.bg,
          opacity: fading ? 0 : 1,
        }}
      />

      {/* Accent glow */}
      <div
        className={`absolute ${slide.glowPosition} rounded-full opacity-15 pointer-events-none transition-opacity duration-700`}
        style={{
          width: "480px",
          height: "480px",
          background: slide.accentGlow,
          opacity: fading ? 0 : 0.15,
        }}
      />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E8D5C4 1px, transparent 1px), linear-gradient(90deg, #E8D5C4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Slide visual — right side (desktop) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center pointer-events-none">
        <div
          className="relative w-80 h-96 transition-opacity duration-500"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {slide.visual}
        </div>
      </div>

      {/* Slide number ticker — top right */}
      <div className="absolute top-28 right-8 lg:right-10 hidden md:flex flex-col items-end gap-1 select-none">
        <span
          className="text-4xl text-[#E8D5C4]/20 transition-opacity duration-500"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            opacity: fading ? 0 : 1,
          }}
        >
          0{current + 1}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C8680]">
          / 0{slides.length}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-28 pt-36 w-full">
        <div className="max-w-2xl">
          {/* Pre-heading */}
          <div
            className="flex items-center gap-3 mb-8 transition-opacity duration-500"
            style={{ opacity: fading ? 0 : 1 }}
          >
            <span className="w-8 h-px bg-[#B8975A]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
              {slide.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-[#F0EBE1] leading-[1.08] mb-8 transition-opacity duration-500"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 400,
              opacity: fading ? 0 : 1,
            }}
          >
            {slide.headline.map((line, i) =>
              i === slide.headlineAccentIndex ? (
                <span key={i}>
                  <em className="text-[#D4B483]" style={{ fontStyle: "italic" }}>
                    {line}
                  </em>
                  <br />
                </span>
              ) : (
                <span key={i}>
                  {line}
                  <br />
                </span>
              )
            )}
          </h1>

          {/* Sub */}
          <p
            className="text-base sm:text-lg text-[#B0ABA5] leading-relaxed mb-10 max-w-md transition-opacity duration-500"
            style={{ opacity: fading ? 0 : 1 }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 transition-opacity duration-500"
            style={{ opacity: fading ? 0 : 1 }}
          >
            <Link
              href={slide.primaryCTA.href}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B8975A] text-[#1C1C1A] text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#D4B483] transition-all duration-300 group"
            >
              {slide.primaryCTA.label}
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
              href={slide.secondaryCTA.href}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#E8D5C4]/40 text-[#E8D5C4] text-sm tracking-[0.15em] uppercase hover:border-[#D4B483] hover:text-[#D4B483] transition-all duration-300"
            >
              {slide.secondaryCTA.label}
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10 transition-opacity duration-500"
            style={{ opacity: fading ? 0 : 1 }}
          >
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

      {/* ── Controls row ── */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Dot indicators + progress */}
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative flex items-center"
              >
                {i === current ? (
                  /* Active dot with animated progress bar */
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
                    <span className="relative h-px w-10 bg-white/20 overflow-hidden">
                      <span
                        className="absolute inset-y-0 left-0 bg-[#B8975A]"
                        style={{
                          animation: paused
                            ? "none"
                            : `progress ${AUTOPLAY_MS}ms linear forwards`,
                        }}
                      />
                    </span>
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-colors" />
                )}
              </button>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar keyframe */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
