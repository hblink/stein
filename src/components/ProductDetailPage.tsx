"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product, formatPrice } from "@/lib/products";

/* ── Gallery thumbnails label map ── */
const VIEW_LABELS = ["Studio", "Detail", "Styled", "Worn"];

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailPage({
  product,
  relatedProducts,
}: ProductDetailPageProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "materials" | "shipping">(
    "description"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ""
  );
  const [qty, setQty] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const categoryLabel = product.category === "necklaces" ? "Necklaces" : "Bracelets";
  const categoryHref = `/collections/${product.category}`;
  const collectionLabel =
    product.collection === "modern" ? "The Modern Collection" : "The Timeless Collection";

  const isLowStock = product.stockCount <= 2;
  const isOutOfStock = product.stockCount === 0;

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(product.name);

  function handleAddToBag() {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2500);
  }

  return (
    <>
      <Navigation />

      <main className="bg-[#FAF7F2] pt-20 pb-0">
        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 border-b border-[#E8D5C4]/60">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#8C8680]">
            <Link href="/" className="hover:text-[#B8975A] transition-colors">Home</Link>
            <span>/</span>
            <Link href={categoryHref} className="hover:text-[#B8975A] transition-colors">
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-[#1C1C1A]">{product.name}</span>
          </nav>
        </div>

        {/* ── Main product layout ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-14">

            {/* ════════════ LEFT: Image Gallery ════════════ */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{ background: product.gallery[activeImage] }}
                />
                {/* Corner label */}
                <div className="absolute bottom-3 left-3 bg-[#1A2820]/70 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B8975A]">
                    {VIEW_LABELS[activeImage]}
                  </span>
                </div>
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.new && (
                    <span className="px-2.5 py-1 bg-[#2A3D35] text-[#E8D5C4] text-[10px] tracking-[0.2em] uppercase">
                      New
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="px-2.5 py-1 bg-[#B8975A] text-[#1C1C1A] text-[10px] tracking-[0.2em] uppercase">
                      Bestseller
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2.5 py-1 bg-[#1C1C1A] text-[#E8D5C4] text-[10px] tracking-[0.2em] uppercase">
                      Sale
                    </span>
                  )}
                </div>
                {/* Prev / Next arrow on image */}
                {product.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((i) => (i - 1 + product.gallery.length) % product.gallery.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1C1C1A" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveImage((i) => (i + 1) % product.gallery.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1C1C1A" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-2">
                {product.gallery.map((grad, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative overflow-hidden transition-all duration-200 ${
                      i === activeImage
                        ? "ring-2 ring-[#B8975A] ring-offset-2 ring-offset-[#FAF7F2]"
                        : "opacity-60 hover:opacity-90"
                    }`}
                    style={{ aspectRatio: "1" }}
                    aria-label={`View ${VIEW_LABELS[i]}`}
                  >
                    <div className="absolute inset-0" style={{ background: grad }} />
                    <span className="absolute bottom-0 inset-x-0 bg-[#1A2820]/60 text-[9px] tracking-wider uppercase text-[#E8D5C4] text-center py-0.5">
                      {VIEW_LABELS[i]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Share row */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C8680]">Share</span>
                <div className="flex items-center gap-2">
                  {[
                    {
                      label: "Facebook",
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                      icon: (
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      ),
                    },
                    {
                      label: "Pinterest",
                      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
                      icon: (
                        <>
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.812-2.428.855 0 1.268.64 1.268 1.408 0 .858-.546 2.14-.828 3.33-.236.995.498 1.806 1.476 1.806 1.772 0 3.136-1.867 3.136-4.563 0-2.386-1.716-4.054-4.165-4.054-2.837 0-4.5 2.128-4.5 4.328 0 .857.33 1.776.741 2.278a.3.3 0 0 1 .069.285c-.076.312-.244.995-.277 1.134-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                        </>
                      ),
                    },
                    {
                      label: "Twitter / X",
                      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
                      icon: (
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${s.label}`}
                      className="w-8 h-8 flex items-center justify-center border border-[#E8D5C4] text-[#8C8680] hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-200"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {s.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical divider (desktop only) */}
            <div className="hidden lg:block bg-[#E8D5C4]/60" />

            {/* ════════════ RIGHT: Product Info ════════════ */}
            <div className="flex flex-col">

              {/* Collection tag */}
              <Link
                href={`${categoryHref}?collection=${product.collection}`}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#B8975A] mb-4 hover:text-[#9A7A42] transition-colors w-fit"
              >
                <span className="w-1 h-1 rounded-full bg-[#B8975A]" />
                {collectionLabel}
              </Link>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl text-[#1C1C1A] mb-1 leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
              >
                {product.name}
              </h1>
              <p className="text-sm text-[#8C8680] mb-5">{product.subtitle}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="text-3xl text-[#1C1C1A]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#8C8680] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-sm text-[#B8975A] font-medium">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Short description */}
              <p className="text-[#8C8680] text-sm leading-relaxed mb-6 border-b border-[#E8D5C4]/60 pb-6">
                {product.description}
              </p>

              {/* Stock indicator */}
              <div className="flex items-center gap-2 mb-5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOutOfStock ? "bg-red-400" : isLowStock ? "bg-amber-400" : "bg-[#2A3D35]"
                  }`}
                />
                <span className="text-sm text-[#1C1C1A]">
                  {isOutOfStock
                    ? "Out of stock — join the waitlist"
                    : isLowStock
                    ? `Only ${product.stockCount} left in stock`
                    : `In stock — ready to ship in 1–3 days`}
                </span>
              </div>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] tracking-[0.2em] uppercase text-[#8C8680]">
                      Size
                    </label>
                    <button className="text-[11px] text-[#B8975A] underline underline-offset-2 hover:text-[#9A7A42] transition-colors">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 text-xs tracking-wider border transition-all duration-200 ${
                          selectedSize === size
                            ? "border-[#2A3D35] bg-[#2A3D35] text-[#F0EBE1]"
                            : "border-[#E8D5C4] text-[#8C8680] hover:border-[#B8975A] hover:text-[#B8975A]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Bag */}
              <div className="flex gap-3 mb-4">
                {/* Qty */}
                <div className="flex items-center border border-[#E8D5C4] bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-12 flex items-center justify-center text-[#8C8680] hover:text-[#1C1C1A] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-[#1C1C1A] select-none">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stockCount, q + 1))}
                    className="w-10 h-12 flex items-center justify-center text-[#8C8680] hover:text-[#1C1C1A] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToBag}
                  disabled={isOutOfStock}
                  className={`flex-1 h-12 flex items-center justify-center gap-3 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                    addedToBag
                      ? "bg-[#2A3D35] text-[#F0EBE1]"
                      : isOutOfStock
                      ? "bg-[#E8D5C4] text-[#8C8680] cursor-not-allowed"
                      : "bg-[#1C1C1A] text-[#FAF7F2] hover:bg-[#2A3D35]"
                  }`}
                >
                  {addedToBag ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Added to Bag
                    </>
                  ) : (
                    <>
                      Add to Bag — {formatPrice(product.price * qty)}
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`w-12 h-12 flex items-center justify-center border transition-all duration-200 ${
                    wishlisted
                      ? "border-[#B8975A] bg-[#B8975A]/10 text-[#B8975A]"
                      : "border-[#E8D5C4] text-[#8C8680] hover:border-[#B8975A] hover:text-[#B8975A]"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "#B8975A" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Get Support */}
              <button className="w-full h-11 flex items-center justify-center gap-2 border border-[#E8D5C4] text-[#8C8680] text-sm tracking-[0.12em] uppercase hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-200 mb-6">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Ask a Question
              </button>

              {/* Trust strip */}
              <div className="grid grid-cols-3 gap-3 py-5 border-y border-[#E8D5C4]/60 mb-6">
                {[
                  { icon: "🚚", title: "Free Delivery", sub: "Orders over £150" },
                  { icon: "↩", title: "30-Day Returns", sub: "No questions asked" },
                  { icon: "∞", title: "Lifetime Care", sub: "Free maintenance" },
                ].map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="text-lg mb-1">{item.icon}</div>
                    <p className="text-[11px] font-medium text-[#1C1C1A]">{item.title}</p>
                    <p className="text-[10px] text-[#8C8680] mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* ── TABS ── */}
              <div>
                {/* Tab headers */}
                <div className="flex border-b border-[#E8D5C4]/60 mb-5">
                  {(
                    [
                      { key: "description", label: "Description" },
                      { key: "materials", label: "Materials & Care" },
                      { key: "shipping", label: "Shipping & Returns" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`text-[12px] tracking-[0.15em] uppercase pb-3 mr-6 border-b-2 transition-all duration-200 ${
                        activeTab === tab.key
                          ? "border-[#B8975A] text-[#1C1C1A]"
                          : "border-transparent text-[#8C8680] hover:text-[#1C1C1A]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="text-sm text-[#8C8680] leading-relaxed">
                  {activeTab === "description" && (
                    <div className="flex flex-col gap-4">
                      <p>{product.longDescription}</p>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A] mb-2">Dimensions</p>
                        <p>{product.dimensions}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[10px] tracking-wider border border-[#E8D5C4] text-[#8C8680]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] text-[#B0ABA5]">
                        <span className="text-[#8C8680]">SKU:</span> {product.id.toUpperCase()}&nbsp;&nbsp;
                        <span className="text-[#8C8680]">Category:</span>{" "}
                        <Link href={categoryHref} className="hover:text-[#B8975A] underline underline-offset-2 transition-colors">
                          {categoryLabel}
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeTab === "materials" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A] mb-3">What it&apos;s made of</p>
                        <ul className="flex flex-col gap-2">
                          {product.materials.map((m) => (
                            <li key={m} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0 mt-1.5" />
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A] mb-2">Care instructions</p>
                        <p>{product.careInstructions}</p>
                      </div>
                      <div className="flex items-start gap-3 bg-[#2A3D35]/6 border border-[#2A3D35]/20 p-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A3D35" strokeWidth="1.5" className="flex-shrink-0 mt-0.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <div>
                          <p className="text-[11px] tracking-[0.15em] uppercase text-[#2A3D35] mb-1">Sustainability</p>
                          <p>{product.sustainabilityNote}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "shipping" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A] mb-2">Dispatch</p>
                        <p>Ready to ship within 1–3 business days. Made-to-order pieces (Weave Cuff) ship within 7–10 days. You will receive a dispatch confirmation with tracking.</p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A] mb-2">Delivery</p>
                        <ul className="flex flex-col gap-1.5">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0 mt-1.5" />
                            UK Standard — Royal Mail Tracked 48 — Free over £150, otherwise £3.95
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0 mt-1.5" />
                            UK Express — Royal Mail Tracked 24 — £6.50
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0 mt-1.5" />
                            Europe — DHL Tracked — £14.00
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] flex-shrink-0 mt-1.5" />
                            International — DHL Tracked — £18.00
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A] mb-2">Returns</p>
                        <p>We accept returns within 30 days of delivery. Items must be unworn and in original packaging. Contact us at returns@maisonaurore.com to begin a return.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Maker bio ── */}
              <div className="mt-8 pt-6 border-t border-[#E8D5C4]/60">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8C8680] mb-4">Made by</p>
                <div className="flex items-start gap-4">
                  {/* Avatar placeholder */}
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #D4B483 0%, #2A3D35 100%)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p
                        className="text-base text-[#1C1C1A]"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
                      >
                        Maison Aurore Studio
                      </p>
                      <span className="text-[10px] tracking-wider text-[#8C8680]">London, UK</span>
                    </div>
                    <p className="text-sm text-[#8C8680] leading-relaxed mb-3">
                      Each Maison Aurore piece is made by a single jeweller from raw material to
                      finished form in our London studio. We never use factories or sub-contractors —
                      only skilled hands and considered practice.
                    </p>
                    <Link
                      href="/#craftsmanship"
                      className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[#B8975A] hover:text-[#9A7A42] transition-colors"
                    >
                      Meet the maker
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* END right column */}
          </div>
        </div>

        {/* ── Related products ── */}
        {relatedProducts.length > 0 && (
          <section className="bg-[#F0EBE1] py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8975A] mb-2">
                    You may also love
                  </p>
                  <h2
                    className="text-2xl text-[#1C1C1A]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
                  >
                    From the {collectionLabel}
                  </h2>
                </div>
                <Link
                  href={categoryHref}
                  className="text-sm text-[#B8975A] tracking-[0.15em] uppercase link-underline hidden sm:block"
                >
                  View All {categoryLabel}
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
