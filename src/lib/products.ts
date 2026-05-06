export type ProductCollection = "modern" | "timeless";
export type ProductCategory = "necklaces" | "bracelets";

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  collection: ProductCollection;
  description: string;
  longDescription: string;
  materials: string[];
  sustainabilityNote: string;
  featured: boolean;
  bestseller: boolean;
  new: boolean;
  imageColor: string; // CSS gradient for placeholder image
  imageAlt: string;
  dimensions: string;
  careInstructions: string;
}

export const necklaces: Product[] = [
  {
    id: "nc-001",
    slug: "solstice-pendant",
    name: "Solstice Pendant",
    subtitle: "Geometric 18k recycled gold pendant",
    price: 285,
    category: "necklaces",
    collection: "modern",
    description:
      "A bold geometric pendant that captures light at every angle — hand-cut from 18k recycled yellow gold.",
    longDescription:
      "The Solstice Pendant was born from the study of architectural shadow at midday. Each piece is hand-cut and refined using recycled 18k yellow gold recovered from pre-consumer industry waste. The resulting hexagonal form catches and scatters light beautifully, creating a wearable piece of sculpture that transitions seamlessly from boardroom to evening.",
    materials: ["18k Recycled Yellow Gold", "Recycled Gold Chain — 45cm"],
    sustainabilityNote:
      "Crafted from 100% recycled gold. Zero new-mined metal. Carbon-neutral packaging.",
    featured: true,
    bestseller: true,
    new: false,
    imageColor: "linear-gradient(135deg, #D4B483 0%, #9A7A42 50%, #C9A870 100%)",
    imageAlt: "Geometric gold hexagonal pendant on recycled gold chain",
    dimensions: "Pendant: 18mm × 18mm. Chain length: 45cm (adjustable to 40cm).",
    careInstructions:
      "Store in the provided linen pouch. Clean gently with a soft cloth. Avoid contact with perfumes and chlorine.",
  },
  {
    id: "nc-002",
    slug: "forest-thread",
    name: "Forest Thread",
    subtitle: "Recycled silver with green tourmaline",
    price: 195,
    category: "necklaces",
    collection: "timeless",
    description:
      "Fluid recycled sterling silver suspends a hand-set green tourmaline — the colour of deep forest.",
    longDescription:
      "Inspired by quiet mornings in old-growth forests, the Forest Thread necklace pairs ethically sourced green tourmaline with a hand-formed recycled sterling silver setting. The stone is individually selected for clarity and depth of colour, then set by hand in our studio. No two pieces are identical — each carries its own character.",
    materials: [
      "Recycled Sterling Silver",
      "Ethically Sourced Green Tourmaline",
      "Adjustable 40–48cm chain",
    ],
    sustainabilityNote:
      "Recycled silver, Fairtrade certified tourmaline from certified ethical mines in Brazil.",
    featured: true,
    bestseller: false,
    new: false,
    imageColor: "linear-gradient(135deg, #C0C8C0 0%, #2A3D35 60%, #3D5749 100%)",
    imageAlt: "Silver necklace with green tourmaline pendant",
    dimensions: "Stone: approx. 8mm oval. Chain: adjustable 40–48cm.",
    careInstructions:
      "Polish silver with a soft cloth. Store separately to avoid scratching. Avoid contact with water.",
  },
  {
    id: "nc-003",
    slug: "luna-arc",
    name: "Luna Arc",
    subtitle: "Hand-hammered crescent moon necklace",
    price: 240,
    originalPrice: 270,
    category: "necklaces",
    collection: "timeless",
    description:
      "A crescent moon hand-hammered from recycled 14k gold — honouring cycles, seasons, and stillness.",
    longDescription:
      "The Luna Arc is one of our most enduring designs. Hammered by hand from a single sheet of recycled 14k yellow gold, the crescent form is both ancient in symbolism and modern in execution. The subtle texture left by the hammer catches light differently with every movement — a reminder that beauty lives in imperfection.",
    materials: ["14k Recycled Yellow Gold", "Trace chain — 42cm"],
    sustainabilityNote:
      "Made from hallmarked recycled gold. Packaged in FSC-certified materials.",
    featured: false,
    bestseller: true,
    new: false,
    imageColor: "linear-gradient(135deg, #E8D5A0 0%, #B8975A 60%, #8B6B30 100%)",
    imageAlt: "Hand-hammered crescent moon gold necklace on delicate chain",
    dimensions: "Moon: 28mm × 12mm. Chain: 42cm fixed.",
    careInstructions:
      "Buff gently with a polishing cloth to restore shine. Store in the provided pouch.",
  },
  {
    id: "nc-004",
    slug: "horizon-bar",
    name: "Horizon Bar",
    subtitle: "Minimalist bar necklace in recycled gold",
    price: 175,
    category: "necklaces",
    collection: "modern",
    description:
      "A clean, horizontal bar — the line where sky meets earth. Minimalism refined to its essence.",
    longDescription:
      "The Horizon Bar is the centrepiece of our Modern Collection — a study in reduction and restraint. The bar is milled from recycled 14k white gold and finished by hand to a smooth, brushed surface. It hangs on a delicate trace chain with an adjustable clasp, sitting beautifully at the collarbone.",
    materials: ["14k Recycled White Gold", "Adjustable trace chain — 38–45cm"],
    sustainabilityNote:
      "White gold rhodium plating is lead-free. Recycled sourcing certified.",
    featured: false,
    bestseller: false,
    new: true,
    imageColor: "linear-gradient(135deg, #E0DDD8 0%, #B0ABA5 50%, #D8D4CE 100%)",
    imageAlt: "Minimalist white gold bar necklace on adjustable chain",
    dimensions: "Bar: 35mm × 3mm. Chain: adjustable 38–45cm.",
    careInstructions:
      "Wipe with a soft dry cloth. Rhodium plating may need re-application after sustained wear.",
  },
  {
    id: "nc-005",
    slug: "bloom-pendant",
    name: "Bloom Pendant",
    subtitle: "Floral motif with ethical rose quartz",
    price: 220,
    category: "necklaces",
    collection: "timeless",
    description:
      "Five petals, one stone — a botanical study in recycled gold and ethically sourced rose quartz.",
    longDescription:
      "Inspired by the wildflowers of the Provençal hillside, the Bloom Pendant is a celebration of nature's quiet geometry. Five hand-formed petals radiate around a bezel-set rose quartz, sourced directly from family-owned mines in Madagascar. The pendant is cast from recycled 18k rose gold, giving the piece a warm, blush-toned harmony that complements the stone.",
    materials: ["18k Recycled Rose Gold", "Ethically Sourced Rose Quartz — 6mm round"],
    sustainabilityNote:
      "Rose quartz directly sourced from certified ethical suppliers. Rose gold is fully recycled.",
    featured: true,
    bestseller: false,
    new: true,
    imageColor: "linear-gradient(135deg, #E8C4B8 0%, #C4948A 50%, #D4A898 100%)",
    imageAlt: "Rose gold floral pendant with pink rose quartz centre stone",
    dimensions: "Pendant: 22mm diameter. Chain: 40cm.",
    careInstructions:
      "Rose quartz is sensitive to prolonged sunlight — store away from direct light.",
  },
  {
    id: "nc-006",
    slug: "roots-chain",
    name: "Roots Chain",
    subtitle: "Hand-braided recycled gold chain necklace",
    price: 310,
    category: "necklaces",
    collection: "modern",
    description:
      "Three strands of fine recycled gold wire, braided by hand — wearable artisanship in its purest form.",
    longDescription:
      "The Roots Chain is a masterclass in the craft of chainmaking. Three fine strands of recycled 18k yellow gold wire are braided by hand by our senior jeweller, a technique requiring hours of patient, precise work. The resulting chain is supple and lustrous, worn alone as a statement or layered with other pieces from the collection.",
    materials: ["18k Recycled Yellow Gold — 3-strand hand-braided", "Length: 50cm with lobster clasp"],
    sustainabilityNote:
      "Every metre of gold wire used is from recycled industrial sources. Zero-waste production.",
    featured: false,
    bestseller: true,
    new: false,
    imageColor: "linear-gradient(135deg, #C9A870 0%, #B8975A 40%, #E0C890 100%)",
    imageAlt: "Hand-braided three-strand recycled gold chain necklace",
    dimensions: "Chain width: 4mm. Length: 50cm.",
    careInstructions:
      "Unclip the clasp before storage and lay flat to maintain the braid structure.",
  },
];

export const bracelets: Product[] = [
  {
    id: "br-001",
    slug: "weave-cuff",
    name: "Weave Cuff",
    subtitle: "Hand-woven recycled gold cuff",
    price: 340,
    category: "bracelets",
    collection: "modern",
    description:
      "A sculptural cuff woven by hand from fine recycled gold wire — where jewellery becomes architecture.",
    longDescription:
      "The Weave Cuff is the most labour-intensive piece we make. Over six hours of hand-weaving transforms fine recycled 18k gold wire into a cuff of remarkable structural integrity and visual complexity. The woven surface creates a play of light that changes throughout the day, making this an endlessly fascinating piece to wear. Each cuff is made to order and is unique.",
    materials: ["18k Recycled Yellow Gold wire", "Open-band cuff — one size, adjustable"],
    sustainabilityNote:
      "Made to order, zero-waste. 100% recycled gold. Each cuff is one-of-a-kind.",
    featured: true,
    bestseller: true,
    new: false,
    imageColor: "linear-gradient(135deg, #C9A870 0%, #8B6B30 50%, #D4B483 100%)",
    imageAlt: "Hand-woven sculptural recycled gold wire cuff bracelet",
    dimensions: "Width: 20mm. Inner diameter: 60mm (adjustable). Opening: 25mm.",
    careInstructions:
      "Handle with care to preserve weave structure. Store flat in the provided box.",
  },
  {
    id: "br-002",
    slug: "pebble-bracelet",
    name: "Pebble Bracelet",
    subtitle: "River-smoothed silver links",
    price: 165,
    category: "bracelets",
    collection: "timeless",
    description:
      "Oval links, hand-tumbled to a river-stone polish — a bracelet that feels worn-in from day one.",
    longDescription:
      "The Pebble Bracelet draws its inspiration from the river-smoothed stones found along the banks of high-altitude streams. Each oval link is formed from recycled sterling silver and then tumbled individually for six hours to achieve the characteristic smooth, organic finish. The result is a bracelet with an effortless, lived-in quality that only deepens with time.",
    materials: ["Recycled Sterling Silver", "7 hand-tumbled oval links", "Toggle clasp"],
    sustainabilityNote:
      "Recycled silver throughout. Toggle clasp is solid — no plated materials.",
    featured: false,
    bestseller: true,
    new: false,
    imageColor: "linear-gradient(135deg, #D4D0CC 0%, #9A9690 50%, #C0BCBA 100%)",
    imageAlt: "Sterling silver bracelet with hand-tumbled oval links",
    dimensions: "Link size: 14mm × 10mm. Total length: 19cm. Toggle adds 2cm.",
    careInstructions:
      "Silver will develop a natural patina over time that can be buffed away with a polishing cloth if desired.",
  },
  {
    id: "br-003",
    slug: "arc-stack",
    name: "Arc Stack",
    subtitle: "Three-piece mixed-metal stacking set",
    price: 275,
    originalPrice: 315,
    category: "bracelets",
    collection: "modern",
    description:
      "Three slim arcs — yellow gold, white gold, and rose gold — designed to stack, mix, and make a statement.",
    longDescription:
      "The Arc Stack invites you to curate your own wrist landscape. Three slim, hinged arcs in 14k recycled yellow, white, and rose gold are designed to be worn together or separately. Each arc is polished to a mirror finish that catches light precisely. Sold as a set, they arrive in a tripartite box with individual linen pouches.",
    materials: [
      "14k Recycled Yellow Gold arc",
      "14k Recycled White Gold arc",
      "14k Recycled Rose Gold arc",
      "Each: hinged bangle with hidden clasp",
    ],
    sustainabilityNote:
      "All three metals are recycled. Set packaging is 100% compostable.",
    featured: true,
    bestseller: false,
    new: true,
    imageColor: "linear-gradient(135deg, #C9A870 0%, #E0DDD8 33%, #E8C4B8 66%, #B8975A 100%)",
    imageAlt: "Three-piece stacking bracelet set in yellow, white, and rose gold",
    dimensions: "Each arc: width 3mm, inner circumference 19cm.",
    careInstructions:
      "Store each arc separately to avoid cross-metal scratching.",
  },
  {
    id: "br-004",
    slug: "tendril-wrap",
    name: "Tendril Wrap",
    subtitle: "Vine-inspired wrap bracelet in recycled gold",
    price: 195,
    category: "bracelets",
    collection: "timeless",
    description:
      "A fine gold tendril winds twice around the wrist — organic, botanical, and beautifully wild.",
    longDescription:
      "The Tendril Wrap emerged from sketches of climbing plants in the studio garden. A hand-formed vine of recycled 14k yellow gold spirals twice around the wrist, with three small leaf details hammered at different intervals. The adjustable wrap design means it sits differently on every wrist, creating a uniquely personal effect. One of our most botanical and poetic designs.",
    materials: [
      "14k Recycled Yellow Gold",
      "Three hand-hammered leaf details",
      "Adjustable wrap — fits wrists 14–18cm",
    ],
    sustainabilityNote:
      "Single-piece construction, minimal material waste. Recycled gold certified.",
    featured: false,
    bestseller: false,
    new: false,
    imageColor: "linear-gradient(135deg, #D4B483 0%, #2A3D35 50%, #B8975A 100%)",
    imageAlt: "Vine-inspired gold wrap bracelet with leaf details",
    dimensions: "Total length: 38cm. Suitable for wrists 14–18cm circumference.",
    careInstructions:
      "Gently re-shape leaves if bent. The organic form naturally evolves with wear.",
  },
  {
    id: "br-005",
    slug: "slab-bangle",
    name: "Slab Bangle",
    subtitle: "Textured recycled silver bangle",
    price: 150,
    category: "bracelets",
    collection: "modern",
    description:
      "Bold, architectural, deliberate — a recycled silver bangle with hand-applied raw texture.",
    longDescription:
      "The Slab Bangle takes its cues from the raw beauty of cut stone. A thick, flat band of recycled sterling silver is hammered along one face to create an irregular, geological texture, while the inner surface is polished smooth for comfort. This is a statement piece for those who appreciate confident, sculptural jewellery with a material honesty.",
    materials: ["Recycled Sterling Silver", "Width: 8mm slab band", "Solid construction — no clasp"],
    sustainabilityNote:
      "Solid sterling silver — no hollow construction, no plating, no compromise.",
    featured: false,
    bestseller: false,
    new: false,
    imageColor: "linear-gradient(135deg, #C8C4C0 0%, #8C8680 50%, #E0DCDA 100%)",
    imageAlt: "Textured recycled sterling silver wide band bangle",
    dimensions:
      "Width: 8mm. Available in inner diameters: S (56mm), M (60mm), L (64mm).",
    careInstructions:
      "Texture may collect oils — clean with a soft toothbrush and mild soap. Rinse and dry immediately.",
  },
  {
    id: "br-006",
    slug: "knot-bracelet",
    name: "Knot Bracelet",
    subtitle: "Celtic-inspired knot link chain",
    price: 210,
    category: "bracelets",
    collection: "timeless",
    description:
      "An ancient symbol rendered in recycled gold — interlocking knot links that speak of continuity and care.",
    longDescription:
      "The Knot Bracelet reimagines the Celtic eternal knot for contemporary wear. Each of the seven links is individually cast from recycled 18k yellow gold and polished to a warm lustre. The interconnected design is not only beautiful but structurally clever — each link passes through the next, making the bracelet flex naturally with every gesture.",
    materials: ["18k Recycled Yellow Gold", "7 cast knot links", "Box clasp with safety catch"],
    sustainabilityNote:
      "Cast using recycled gold certified by RJC (Responsible Jewellery Council).",
    featured: true,
    bestseller: false,
    new: false,
    imageColor: "linear-gradient(135deg, #D4B483 0%, #9A7A42 40%, #C9A870 100%)",
    imageAlt: "Celtic-inspired knot link bracelet in recycled 18k gold",
    dimensions: "Link size: 12mm × 12mm. Total length: 18cm.",
    careInstructions:
      "Clean in warm soapy water with a soft brush. Box clasp has a safety catch — press both sides to open.",
  },
];

export const allProducts: Product[] = [...necklaces, ...bracelets];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getProductsByCollection(collection: ProductCollection): Product[] {
  return allProducts.filter((p) => p.collection === collection);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.featured);
}

export function getBestsellerProducts(): Product[] {
  return allProducts.filter((p) => p.bestseller);
}

export function formatPrice(price: number): string {
  return `£${price.toLocaleString("en-GB")}`;
}
