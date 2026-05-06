"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Package } from "lucide-react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-sm shadow-sm border-b border-[#E8D5C4]/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between"
        style={{ height: "72px" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col leading-none group"
          aria-label="Maison Aurore home"
        >
          <span
            className="text-xl tracking-[0.18em] uppercase text-[#1C1C1A] group-hover:text-[#B8975A] transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 600 }}
          >
            Maison Aurore
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C8680] mt-0.5">
            Artisan Jewellery
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-[0.12em] uppercase text-[#1C1C1A]">
          <li>
            <Link
              href="/collections/necklaces"
              className="link-underline hover:text-[#B8975A] transition-colors duration-300 text-[13px]"
            >
              Necklaces
            </Link>
          </li>
          <li>
            <Link
              href="/collections/bracelets"
              className="link-underline hover:text-[#B8975A] transition-colors duration-300 text-[13px]"
            >
              Bracelets
            </Link>
          </li>
          <li>
            <Link
              href="/#collections"
              className="link-underline hover:text-[#B8975A] transition-colors duration-300 text-[13px]"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              href="/#our-story"
              className="link-underline hover:text-[#B8975A] transition-colors duration-300 text-[13px]"
            >
              Our Story
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className="link-underline hover:text-[#B8975A] transition-colors duration-300 text-[13px] flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5" />
              Orders
            </Link>
          </li>
        </ul>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/orders">
            <Package className="w-5 h-5 text-[#8C8680] hover:text-[#B8975A] transition-colors duration-300 cursor-pointer" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-[#1C1C1A] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#1C1C1A] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#1C1C1A] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-[#FAF7F2] border-t border-[#E8D5C4]/40 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 py-6 flex flex-col gap-5 text-sm tracking-[0.15em] uppercase">
          <li>
            <Link
              href="/collections/necklaces"
              onClick={() => setMenuOpen(false)}
              className="text-[#1C1C1A] hover:text-[#B8975A] transition-colors"
            >
              Necklaces
            </Link>
          </li>
          <li>
            <Link
              href="/collections/bracelets"
              onClick={() => setMenuOpen(false)}
              className="text-[#1C1C1A] hover:text-[#B8975A] transition-colors"
            >
              Bracelets
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              onClick={() => setMenuOpen(false)}
              className="text-[#1C1C1A] hover:text-[#B8975A] transition-colors flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Order History
            </Link>
          </li>
          <li>
            <Link
              href="/#collections"
              onClick={() => setMenuOpen(false)}
              className="text-[#1C1C1A] hover:text-[#B8975A] transition-colors"
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              href="/#our-story"
              onClick={() => setMenuOpen(false)}
              className="text-[#1C1C1A] hover:text-[#B8975A] transition-colors"
            >
              Our Story
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}