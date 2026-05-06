import { Metadata } from "next";
import CollectionPageLayout from "@/components/CollectionPageLayout";
import { necklaces } from "@/lib/products";

export const metadata: Metadata = {
  title: "Handmade Necklaces",
  description:
    "Handcrafted necklaces in recycled gold and sterling silver — from the Modern Collection's geometric forms to the Timeless Collection's organic botanicals. Each piece made in our London studio.",
};

export default function NecklacesPage() {
  return (
    <CollectionPageLayout
      category="necklaces"
      headline="Handcrafted Necklaces"
      subheadline="The Necklace Collection"
      description="Each necklace is formed by a single jeweller in our London studio — shaped from recycled gold or sterling silver, set with ethically sourced stones, and designed to be worn for a lifetime."
      products={necklaces}
      heroBg="linear-gradient(135deg, #2A3D35 0%, #1A2820 60%, #3D5749 100%)"
      ctaHref="#"
      ctaLabel="Enquire About a Bespoke Necklace"
    />
  );
}
