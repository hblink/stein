import React from 'react'
import { OrderStatusBadge } from './OrderStatusBadge'
import { PaymentStatusBadge } from './OrderStatusBadge'
import { FulfillmentStatusBadge } from './OrderStatusBadge'

interface OrderItem {
  id: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  image?: string
}

interface OrderCardProps {
  orderNumber: string
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled' | 'cancelled'
  total: number
  items: OrderItem[]
  estimatedDelivery?: string
  trackingNumber?: string
  createdAt: string
  customerName?: string
  onViewDetails?: () => void
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderNumber,
  orderStatus,
  paymentStatus,
  fulfillmentStatus,
  total,
  items,
  estimatedDelivery,
  trackingNumber,
  createdAt,
  customerName,
  onViewDetails,
}) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Order {orderNumber}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Placed on {formatDate(createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <OrderStatusBadge status={orderStatus} size="sm" />
            <PaymentStatusBadge status={paymentStatus} size="sm" />
            <FulfillmentStatusBadge status={fulfillmentStatus} size="sm" />
          </div>
        </div>
        {customerName && (
          <p className="text-sm text-slate-600 mt-2">
            Customer: <span className="font-medium text-slate-800">{customerName}</span>
          </p>
        )}
      </div>

      {/* Items Preview */}
      <div className="px-6 py-4">
        <div className="space-y-3">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
{item.image ? (
                      <div
                        className="w-full h-full object-cover bg-center bg-cover rounded"
                        style={{ backgroundImage: `url(${item.image})` }}
                        role="img"
                        aria-label={item.productName}
                      />
                    ) : (
                      <svg
                        className="w-6 h-6 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l-3-3m0 0l-3 3m3-3v6m6 0v-6m0 0l3 3m-3-3l-3 3"
                        />
                      </svg>
                    )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {item.productName}
                </p>
                <p className="text-sm text-slate-500">
                  {item.quantity} x {formatPrice(item.unitPrice)}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-slate-900">
                  {formatPrice(item.totalPrice)}
                </p>
              </div>
            </div>
          ))}
          {items.length > 3 && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm text-slate-500 text-center">
                +{items.length - 3} more item{items.length - 3 > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Delivery Info */}
        {(estimatedDelivery || trackingNumber) && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-4 text-sm">
              {estimatedDelivery && (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">Est. Delivery:</span>
                  <span className="font-semibold">
                    {new Date(estimatedDelivery).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {trackingNumber && (
                <div className="flex items-center gap-2 text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                  <span className="font-medium">Tracking:</span>
                  <span className="font-mono text-xs font-semibold">
                    {trackingNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <div className="text-lg font-bold text-slate-900">
          Total: {formatPrice(total)}
        </div>
        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          View Details
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}