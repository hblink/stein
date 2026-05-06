"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const href = `/collections/${product.category}/${product.slug}`;

  return (
    <Link href={href} className={`group flex flex-col ${className}`}>
      {/* Image area */}
      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-[#F0EBE1]">
        {/* Placeholder image with gradient */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ background: product.imageColor }}
        />

        {/* Image overlay on hover */}
        <div className="absolute inset-0 bg-[#1C1C1A]/0 group-hover:bg-[#1C1C1A]/10 transition-all duration-500" />

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

        {/* Collection badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className="text-[10px] tracking-[0.2em] uppercase px-2 py-1"
            style={{
              background: "rgba(26, 40, 32, 0.7)",
              color: product.collection === "modern" ? "#D4B483" : "#E8D5C4",
              backdropFilter: "blur(4px)",
            }}
          >
            {product.collection === "modern" ? "Modern" : "Timeless"}
          </span>
        </div>

        {/* Quick add CTA on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            className="w-full py-2.5 bg-[#1C1C1A]/90 text-[#FAF7F2] text-[11px] tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-[#B8975A] hover:text-[#1C1C1A] transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic
            }}
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8C8680] mb-1">
          {product.subtitle}
        </p>
        <h3
          className="text-base text-[#1C1C1A] group-hover:text-[#B8975A] transition-colors duration-300 mb-2"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm font-medium text-[#1C1C1A]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#8C8680] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Sustainability micro-indicator */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2A3D35]" />
          <span className="text-[10px] text-[#8C8680] tracking-wider">Recycled metals</span>
        </div>
      </div>
    </Link>
  );
}
