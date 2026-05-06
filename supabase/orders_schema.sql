-- Orders table for customer order tracking
create table orders (
  id uuid default gen_random_uuid() primary key,
  order_number text unique not null,
  
  -- Customer info
  customer_id uuid references public.profiles(id) on delete set null,
  email text not null,
  customer_name text,

  -- Financial
  subtotal numeric(10,2) not null default 0,
  tax numeric(10,2) default 0,
  shipping numeric(10,2) default 0,
  discount numeric(10,2) default 0,
  total numeric(10,2) not null default 0,
  
  -- Status fields
  order_status text default 'pending' check (order_status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  fulfillment_status text default 'unfulfilled' check (fulfillment_status in ('unfulfilled', 'partial', 'fulfilled', 'cancelled')),
  
  -- Addresses (JSONB for flexibility)
  shipping_address jsonb not null,
  billing_address jsonb not null,
  
  -- Shipping / Tracking
  tracking_number text,
  tracking_url text,
  estimated_delivery date,
  
  -- Metadata
  notes text,
  cancelled_at timestamp with time zone,
  fulfilled_at timestamp with time zone,
  
  -- Timestamps
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes
create index idx_orders_customer_id on orders(customer_id);
create index idx_orders_order_number on orders(order_number);
create index idx_orders_order_status on orders(order_status);
create index idx_orders_payment_status on orders(payment_status);
create index idx_orders_fulfillment_status on orders(fulfillment_status);
create index idx_orders_created_at on orders(created_at);
create index idx_orders_estimated_delivery on orders(estimated_delivery);

-- Row Level Security
alter table orders enable row level security;

-- Policies
create policy "Orders are viewable by authenticated users" on orders
  for select using (auth.role() = 'authenticated');

create policy "Orders are viewable by admin users" on orders
  for select using (auth.role() = 'admin');

-- Auto-update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_orders_updated_at before update on orders
  for each row execute function update_updated_at_column();

-- Order items table
create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null,
  image_url text,
  created_at timestamp with time zone default now()
);

create index idx_order_items_order_id on order_items(order_id);

-- Sample data (optional)
insert into orders (
  order_number,
  email,
  customer_name,
  subtotal,
  tax,
  shipping,
  discount,
  total,
  order_status,
  payment_status,
  fulfillment_status,
  shipping_address,
  billing_address,
  tracking_number,
  estimated_delivery
) values
  (
    'ORD-2026-001',
    'alice.johnson@email.com',
    'Alice Johnson',
    450.00,
    36.00,
    15.00,
    0.00,
    501.00,
    'delivered',
    'paid',
    'fulfilled',
    '{"fullName": "Alice Johnson", "street": "123 Main St", "city": "New York", "state": "NY", "postalCode": "10001", "country": "USA", "phone": "+1-555-0101"}'::jsonb,
    '{"fullName": "Alice Johnson", "street": "123 Main St", "city": "New York", "state": "NY", "postalCode": "10001", "country": "USA"}'::jsonb,
    '1Z999AA10123456784',
    '2026-04-25'
  ),
  (
    'ORD-2026-002',
    'bob.smith@email.com',
    'Bob Smith',
    320.00,
    25.60,
    15.00,
    20.00,
    340.60,
    'shipped',
    'paid',
    'partial',
    '{"fullName": "Bob Smith", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postalCode": "90001", "country": "USA", "phone": "+1-555-0102"}'::jsonb,
    '{"fullName": "Bob Smith", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postalCode": "90001", "country": "USA"}'::jsonb,
    '1Z999AA10123456785',
    '2026-05-10'
  ),
  (
    'ORD-2026-003',
    'carol.white@email.com',
    'Carol White',
    180.00,
    14.40,
    15.00,
    0.00,
    209.40,
    'processing',
    'paid',
    'unfulfilled',
    '{"fullName": "Carol White", "street": "789 Pine Rd", "city": "Chicago", "state": "IL", "postalCode": "60601", "country": "USA", "phone": "+1-555-0103"}'::jsonb,
    '{"fullName": "Carol White", "street": "789 Pine Rd", "city": "Chicago", "state": "IL", "postalCode": "60601", "country": "USA"}'::jsonb,
    null,
    '2026-05-08'
  ),
  (
    'ORD-2026-004',
    'dan.brown@email.com',
    'Dan Brown',
    620.00,
    49.60,
    0.00,
    50.00,
    619.60,
    'pending',
    'pending',
    'unfulfilled',
    '{"fullName": "Dan Brown", "street": "321 Elm St", "city": "Houston", "state": "TX", "postalCode": "77001", "country": "USA", "phone": "+1-555-0104"}'::jsonb,
    '{"fullName": "Dan Brown", "street": "321 Elm St", "city": "Houston", "state": "TX", "postalCode": "77001", "country": "USA"}'::jsonb,
    null,
    null
  );

insert into order_items (order_id, product_name, quantity, unit_price, total_price, image_url) values
  ((select id from orders where order_number = 'ORD-2026-001'), 'Golden Harmony Necklace', 1, 350.00, 350.00, '/products/necklace-golden-harmony.jpg'),
  ((select id from orders where order_number = 'ORD-2026-001'), 'Essence Bracelet', 1, 100.00, 100.00, '/products/bracelet-essence.jpg'),
  ((select id from orders where order_number = 'ORD-2026-002'), 'Celestial Pendant', 1, 280.00, 280.00, '/products/pendant-celestial.jpg'),
  ((select id from orders where order_number = 'ORD-2026-002'), 'Delicate Chain', 1, 40.00, 40.00, '/products/chain-delicate.jpg'),
  ((select id from orders where order_number = 'ORD-2026-003'), 'Moonlight Cuff', 1, 180.00, 180.00, '/products/cuff-moonlight.jpg'),
  ((select id from orders where order_number = 'ORD-2026-004'), 'Royal Signet Ring', 1, 450.00, 450.00, '/products/ring-royal-signet.jpg'),
  ((select id from orders where order_number = 'ORD-2026-004'), 'Sapphire Drops', 1, 170.00, 170.00, '/products/earrings-sapphire-drops.jpg');