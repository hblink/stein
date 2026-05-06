import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Maison Aurore — Artisan Handmade Jewellery",
    template: "%s | Maison Aurore",
  },
  description:
    "Handcrafted necklaces and bracelets made with ethically sourced materials. Each piece is a celebration of sustainable craftsmanship and timeless beauty.",
  keywords: [
    "artisan jewellery",
    "handmade necklaces",
    "handmade bracelets",
    "sustainable jewellery",
    "ethical gold",
    "conscious luxury",
  ],
  openGraph: {
    title: "Maison Aurore — Artisan Handmade Jewellery",
    description:
      "Handcrafted necklaces and bracelets made with ethically sourced materials.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#FAF7F2] text-[#1C1C1A]`}
        style={{ fontFamily: "var(--font-inter), 'Helvetica Neue', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
