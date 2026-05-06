-- Products table for easy web-based management (no coding required)
create table products (
  id uuid default gen_random_uuid() primary key,
  
  -- Basic info
  name text not null,
  description text,
  short_description text,
  category text not null check (category in ('necklaces', 'bracelets')),
  collection text not null check (collection in ('modern', 'timeless')),
  
  -- Pricing (editable via web interface)
  price numeric(10,2) not null check (price >= 0),
  original_price numeric(10,2) check (original_price >= 0),
  
  -- Inventory
  stock_count integer not null default 0 check (stock_count >= 0),
  
  -- Images (4 views: studio, detail, styled, worn)
  image_studio text,
  image_detail text,
  image_styled text,
  image_worn text,
  
  -- Tags for filtering
  tags text[],
  
  -- Sizes (optional, for bracelets that come in sizes)
  sizes text[],
  
  -- Display order
  sort_order integer default 0,
  is_active boolean default true,
  is_new boolean default false,
  is_bestseller boolean default false,
  
  -- Timestamps
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_products_updated_at before update on products
  for each row execute function update_updated_at_column();

-- Indexes
create index idx_products_category on products(category);
create index idx_products_collection on products(collection);
create index idx_products_is_active on products(is_active);
create index idx_products_sort_order on products(sort_order);

-- Sample product data (4 necklaces, 4 bracelets - Modern and Timeless)
insert into products (
  name, description, short_description, category, collection, 
  price, original_price, stock_count,
  image_studio, image_detail, image_styled, image_worn,
  tags, sizes, sort_order, is_new, is_bestseller
) values
-- Necklaces (Modern)
(
  'Solstice Pendant',
  'A bold architectural statement featuring recycled 18k yellow gold. The geometric cut creates dramatic light play, embodying modern luxury that stands the test of time.',
  'A bold architectural statement in recycled 18k yellow gold',
  'necklaces', 'modern',
  285.00, null, 3,
  'linear-gradient(135deg, #D4B483 0%, #B8975A 50%, #9A7A42 100%)',
  'linear-gradient(155deg, #8C7B5E 0%, #B8975A 50%, #D4B483 100%)',
  'linear-gradient(115deg, #B8975A 0%, #D4B483 50%, #F0EBE1 100%)',
  'linear-gradient(145deg, #9A7A42 0%, #B8975A 50%, #D4B483 100%)',
  ARRAY['18k Gold', 'Modern', 'Statement Piece'],
  null,
  1, true, true
),
(
  'Horizon Bar',
  'Minimal elegance meets everyday wearability. This sleek horizontal bar necklace in recycled white gold is the perfect layering piece for the modern wardrobe.',
  'Minimal elegance in recycled white gold - perfect for layering',
  'necklaces', 'modern',
  175.00, null, 7,
  'linear-gradient(135deg, #E8D5C4 0%, #B0ABA5 50%, #8C8680 100%)',
  'linear-gradient(155deg, #D4B9A4 0%, #B0ABA5 50%, #E8D5C4 100%)',
  'linear-gradient(115deg, #B0ABA5 0%, #E8D5C4 50%, #FAF7F2 100%)',
  'linear-gradient(145deg, #8C8680 0%, #B0ABA5 50%, #D4B9A4 100%)',
  ARRAY['White Gold', 'Minimal', 'Layering'],
  null,
  2, false, false
),
(
  'Roots Chain',
  'An organic yet structured design featuring interlocking recycled yellow gold links. Each piece is hand-finished by our London studio for heirloom quality.',
  'Organic interlocking links in recycled yellow gold',
  'necklaces', 'modern',
  310.00, null, 1,
  'linear-gradient(135deg, #D4B483 0%, #B8975A 50%, #9A7A42 100%)',
  'linear-gradient(155deg, #B8975A 0%, #D4B483 50%, #F0EBE1 100%)',
  'linear-gradient(115deg, #9A7A42 0%, #B8975A 50%, #D4B483 100%)',
  'linear-gradient(145deg, #B8975A 0%, #9A7A42 50%, #D4B483 100%)',
  ARRAY['Yellow Gold', 'Handmade', 'Heirloom'],
  null,
  3, false, false
),
-- Necklaces (Timeless)
(
  'Forest Thread',
  'Delicate green tourmaline stones set in recycled silver, reminiscent of forest vines. Nature-inspired design for the conscious soul.',
  'Green tourmaline and recycled silver - nature inspired',
  'necklaces', 'timeless',
  195.00, null, 5,
  'linear-gradient(135deg, #2A3D35 0%, #3D5749 50%, #5A7A62 100%)',
  'linear-gradient(155deg, #3D5749 0%, #2A3D35 50%, #5A7A62 100%)',
  'linear-gradient(115deg, #5A7A62 0%, #3D5749 50%, #2A3D35 100%)',
  'linear-gradient(145deg, #2A3D35 0%, #5A7A62 50%, #3D5749 100%)',
  ARRAY['Recycled Silver', 'Gemstone', 'Botanical'],
  null,
  4, false, false
),
(
  'Luna Arc',
  'A celestial crescent moon design in warm yellow gold. Originally £270, now available at a special price.',
  'Celestial crescent moon in warm yellow gold',
  'necklaces', 'timeless',
  240.00, 270.00, 2,
  'linear-gradient(135deg, #D4B483 0%, #B8975A 50%, #F0EBE1 100%)',
  'linear-gradient(155deg, #B8975A 0%, #D4B483 50%, #9A7A42 100%)',
  'linear-gradient(115deg, #F0EBE1 0%, #D4B483 50%, #B8975A 100%)',
  'linear-gradient(145deg, #9A7A42 0%, #B8975A 50%, #D4B483 100%)',
  ARRAY['Yellow Gold', 'Celestial', 'Sale'],
  null,
  5, false, false
),
(
  'Bloom Pendant',
  'A rose quartz stone embraced by warm rose gold petals. Each piece celebrates natural imperfections and organic beauty.',
  'Rose quartz embraced by rose gold petals',
  'necklaces', 'timeless',
  220.00, null, 4,
  'linear-gradient(135deg, #E8D5C4 0%, #D4B9A4 50%, #F0EBE1 100%)',
  'linear-gradient(155deg, #D4B9A4 0%, #E8D5C4 50%, #B8975A 100%)',
  'linear-gradient(115deg, #F0EBE1 0%, #E8D5C4 50%, #D4B9A4 100%)',
  'linear-gradient(145deg, #B8975A 0%, #E8D5C4 50%, #D4B9A4 100%)',
  ARRAY['Rose Gold', 'Gemstone', 'Organic'],
  null,
  6, false, false
),
-- Bracelets (Modern)
(
  'Weave Cuff',
  'A substantial cuff bracelet made to order. Bold geometric weave pattern in recycled yellow gold. Allow 7-10 days for crafting.',
  'Bold geometric weave in recycled yellow gold - made to order',
  'bracelets', 'modern',
  340.00, null, 1,
  'linear-gradient(135deg, #D4B483 0%, #B8975A 50%, #9A7A42 100%)',
  'linear-gradient(155deg, #B8975A 0%, #D4B483 50%, #F0EBE1 100%)',
  'linear-gradient(115deg, #9A7A42 0%, #B8975A 50%, #D4B483 100%)',
  'linear-gradient(145deg, #B8975A 0%, #9A7A42 50%, #D4B483 100%)',
  ARRAY['Yellow Gold', 'Cuff', 'Made to Order'],
  ARRAY['XS', 'S', 'M', 'L'],
  7, false, false
),
(
  'Arc Stack',
  'Three delicate bands in mixed gold tones. Wear together for a curated look or separately for everyday elegance. Set of 3.',
  'Three delicate bands in mixed recycled gold tones - set of 3',
  'bracelets', 'modern',
  275.00, 315.00, 4,
  'linear-gradient(135deg, #E8D5C4 0%, #B0ABA5 50%, #8C8680 100%)',
  'linear-gradient(155deg, #D4B483 0%, #B8975A 50%, #D4B9A4 100%)',
  'linear-gradient(115deg, #B8975A 0%, #D4B483 50%, #F0EBE1 100%)',
  'linear-gradient(145deg, #D4B9A4 0%, #B8975A 50%, #D4B483 100%)',
  ARRAY['Mixed Gold', 'Stackable', 'Sale'],
  ARRAY['XS', 'S', 'M', 'L'],
  8, false, false
),
(
  'Slab Bangle',
  'A chunky sterling silver bangle with a smooth, modern profile. Substantial weight and shine for everyday confidence.',
  'Chunky sterling silver bangle with smooth profile',
  'bracelets', 'modern',
  150.00, null, 8,
  'linear-gradient(135deg, #E8D5C4 0%, #D4B9A4 50%, #C4A994 100%)',
  'linear-gradient(155deg, #D4B9A4 0%, #E8D5C4 50%, #B0ABA5 100%)',
  'linear-gradient(115deg, #F0EBE1 0%, #E8D5C4 50%, #D4B9A4 100%)',
  'linear-gradient(145deg, #B0ABA5 0%, #E8D5C4 50%, #D4B9A4 100%)',
  ARRAY['Sterling Silver', 'Chunky', 'Everyday'],
  ARRAY['S', 'M', 'L'],
  9, false, false
),
-- Bracelets (Timeless)
(
  'Pebble Bracelet',
  'Smooth, organic pebble-shaped links in recycled sterling silver. Comfort fit for all-day wear.',
  'Organic pebble-shaped links in recycled sterling silver',
  'bracelets', 'timeless',
  165.00, null, 6,
  'linear-gradient(135deg, #D4B9A4 0%, #B0ABA5 50%, #8C8680 100%)',
  'linear-gradient(155deg, #B0ABA5 0%, #D4B9A4 50%, #E8D5C4 100%)',
  'linear-gradient(115deg, #E8D5C4 0%, #D4B9A4 50%, #B0ABA5 100%)',
  'linear-gradient(145deg, #8C8680 0%, #D4B9A4 50%, #B0ABA5 100%)',
  ARRAY['Recycled Silver', 'Comfort Fit', 'Organic'],
  null,
  10, false, false
),
(
  'Tendril Wrap',
  'A delicate wrap bracelet featuring fine recycled yellow gold chains. Adjustable length for versatile styling.',
  'Delicate wrap with fine recycled yellow gold chains',
  'bracelets', 'timeless',
  195.00, null, 5,
  'linear-gradient(135deg, #D4B483 0%, #B8975A 50%, #F0EBE1 100%)',
  'linear-gradient(155deg, #B8975A 0%, #D4B483 50%, #9A7A42 100%)',
  'linear-gradient(115deg, #F0EBE1 0%, #D4B483 50%, #B8975A 100%)',
  'linear-gradient(145deg, #9A7A42 0%, #B8975A 50%, #D4B483 100%)',
  ARRAY['Yellow Gold', 'Wrap', 'Adjustable'],
  null,
  11, false, false
),
(
  'Knot Bracelet',
  'An intricately knotted bracelet in warm yellow gold. Each knot is hand-tied by our artisans in London.',
  'Hand-knotted yellow gold bracelet from our London studio',
  'bracelets', 'timeless',
  210.00, null, 3,
  'linear-gradient(135deg, #D4B483 0%, #B8975A 50%, #9A7A42 100%)',
  'linear-gradient(155deg, #B8975A 0%, #D4B483 50%, #F0EBE1 100%)',
  'linear-gradient(115deg, #9A7A42 0%, #B8975A 50%, #D4B483 100%)',
  'linear-gradient(145deg, #B8975A 0%, #9A7A42 50%, #D4B483 100%)',
  ARRAY['Yellow Gold', 'Handmade', 'Knotted'],
  null,
  12, false, false
);