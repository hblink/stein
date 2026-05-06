"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-[#F0EBE1] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#B8975A]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#B8975A]">
                Stay Connected
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl text-[#1C1C1A] mb-5"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
            >
              The Inner Circle
            </h2>
            <p className="text-[#8C8680] leading-relaxed mb-4">
              Join our community for early access to new pieces, invitations to
              studio open days, and thoughtful writing on sustainability in fine
              jewellery. No noise. Just what matters.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-[#8C8680]">
              {[
                "Early access to new launches",
                "Invitations to studio events",
                "The Aurore Journal — quarterly essays",
                "10% off your first order",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="bg-white p-8 lg:p-10 border border-[#E8D5C4]">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#2A3D35]/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A3D35"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3
                  className="text-xl text-[#1C1C1A] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Welcome to the circle.
                </h3>
                <p className="text-sm text-[#8C8680]">
                  Your 10% discount code is on its way to your inbox. Thank you
                  for joining us.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="text-xl text-[#1C1C1A] mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
                >
                  Join the Inner Circle
                </h3>
                <p className="text-sm text-[#8C8680] mb-6">
                  10% off your first order. Unsubscribe anytime.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="newsletter-email"
                      className="block text-xs tracking-[0.15em] uppercase text-[#8C8680] mb-2"
                    >
                      Your email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-[#E8D5C4] bg-[#FAF7F2] text-[#1C1C1A] text-sm placeholder:text-[#B0ABA5] focus:outline-none focus:border-[#B8975A] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#2A3D35] text-[#F0EBE1] text-sm tracking-[0.15em] uppercase hover:bg-[#3D5749] transition-colors duration-300"
                  >
                    Join Now — Get 10% Off
                  </button>
                  <p className="text-[11px] text-[#B0ABA5] text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
