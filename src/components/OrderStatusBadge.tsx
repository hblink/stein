import React from 'react'

interface OrderStatusBadgeProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  size?: 'sm' | 'md'
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pending' },
    processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Processing' },
    shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Shipped' },
    delivered: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Delivered' },
    cancelled: { bg: 'bg-rose-100', text: 'text-rose-800', label: 'Cancelled' },
  }[status]

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses}`}>
      {config.label}
    </span>
  )
}

interface PaymentStatusBadgeProps {
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  size?: 'sm' | 'md'
}

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pending' },
    paid: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Paid' },
    failed: { bg: 'bg-rose-100', text: 'text-rose-800', label: 'Failed' },
    refunded: { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Refunded' },
  }[status]

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses}`}>
      {config.label}
    </span>
  )
}

interface FulfillmentStatusBadgeProps {
  status: 'unfulfilled' | 'partial' | 'fulfilled' | 'cancelled'
  size?: 'sm' | 'md'
}

export const FulfillmentStatusBadge: React.FC<FulfillmentStatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    unfulfilled: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Unfulfilled' },
    partial: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Partial' },
    fulfilled: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Fulfilled' },
    cancelled: { bg: 'bg-rose-100', text: 'text-rose-800', label: 'Cancelled' },
  }[status]

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses}`}>
      {config.label}
    </span>
  )
}