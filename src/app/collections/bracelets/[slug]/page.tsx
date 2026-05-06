import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailPage from "@/components/ProductDetailPage";
import { bracelets, getProductBySlug, formatPrice } from "@/lib/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bracelets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)}. ${product.sustainabilityNote}`,
  };
}

export default async function BraceletProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.category !== "bracelets") {
    notFound();
  }

  const relatedProducts = bracelets
    .filter((p) => p.slug !== slug && p.collection === product.collection)
    .slice(0, 4);

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
