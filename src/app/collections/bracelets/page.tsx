import { Metadata } from "next";
import CollectionPageLayout from "@/components/CollectionPageLayout";
import { bracelets } from "@/lib/products";

export const metadata: Metadata = {
  title: "Handmade Bracelets",
  description:
    "Handcrafted bracelets in recycled gold and sterling silver — from sculptural cuffs to delicate wraps. Each piece made in our London studio with ethically sourced materials.",
};

export default function BraceletsPage() {
  return (
    <CollectionPageLayout
      category="bracelets"
      headline="Handcrafted Bracelets"
      subheadline="The Bracelet Collection"
      description="From the sculptural Weave Cuff to the delicate Tendril Wrap, every bracelet is shaped by hand in recycled gold and silver. Pieces built to become part of your daily life."
      products={bracelets}
      heroBg="linear-gradient(135deg, #2A3D35 0%, #1A2820 60%, #3D5749 100%)"
      ctaHref="#"
      ctaLabel="Enquire About a Bespoke Bracelet"
    />
  );
}
