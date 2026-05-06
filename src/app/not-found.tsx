import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
        <div className="text-center max-w-lg">
          <p
            className="text-8xl text-[#E8D5C4] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            404
          </p>
          <h1
            className="text-3xl text-[#1C1C1A] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
          >
            This piece has moved on.
          </h1>
          <p className="text-[#8C8680] mb-8 leading-relaxed">
            The page you were looking for doesn&apos;t exist, or has been retired. Perhaps it
            found a new home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 bg-[#2A3D35] text-[#F0EBE1] text-sm tracking-[0.15em] uppercase hover:bg-[#3D5749] transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/collections/necklaces"
              className="px-8 py-3 border border-[#E8D5C4] text-[#8C8680] text-sm tracking-[0.15em] uppercase hover:border-[#B8975A] hover:text-[#B8975A] transition-colors"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
