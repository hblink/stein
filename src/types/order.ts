export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type FulfillmentStatus = 'unfulfilled' | 'partial' | 'fulfilled' | 'cancelled'

export interface ShippingAddress {
  fullName: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface BillingAddress {
  fullName: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  image?: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId?: string
  customerName?: string
  email: string
  
  // Financial
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  
  // Status
  orderStatus: OrderStatus
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  
  // Addresses
  shippingAddress: ShippingAddress
  billingAddress: BillingAddress
  
  // Tracking
  trackingNumber?: string
  trackingUrl?: string
  estimatedDelivery?: string
  
  // Items
  items: OrderItem[]
  
  // Metadata
  notes?: string
  cancelledAt?: string
  fulfilledAt?: string
  createdAt: string
  updatedAt: string
}