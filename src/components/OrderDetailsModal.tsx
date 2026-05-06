import React from 'react'
import { Order } from '@/types/order'
import { OrderStatusBadge } from './OrderStatusBadge'
import { PaymentStatusBadge } from './OrderStatusBadge'
import { FulfillmentStatusBadge } from './OrderStatusBadge'
import { X, Package, MapPin, CreditCard, Truck, Calendar, Tag, Info } from 'lucide-react'

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen || !order) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose, isOpen, order])

  if (!isOpen || !order) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="modal-title" className="text-xl font-bold text-slate-900">
                Order Details
              </h2>
              <p className="text-sm text-slate-500 mt-1">{order.orderNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <OrderStatusBadge status={order.orderStatus} />
            <PaymentStatusBadge status={order.paymentStatus} />
            <FulfillmentStatusBadge status={order.fulfillmentStatus} />
          </div>

          {/* Tracking Info */}
          {(order.trackingNumber || order.estimatedDelivery) && (
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-5 h-5 text-slate-600" />
                <span className="font-semibold text-slate-900">Shipping Information</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {order.trackingNumber && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Tracking:</span>
                    <span className="font-mono font-medium text-slate-900">{order.trackingNumber}</span>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Est. Delivery:</span>
                    <span className="font-medium text-slate-900">
                      {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Items */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">Items ({order.items.length})</h3>
            </div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl"
                >
                  <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <div
                        className="w-full h-full object-cover bg-center bg-cover rounded"
                        style={{ backgroundImage: `url(${item.image})` }}
                        role="img"
                        aria-label={item.productName}
                      />
                    ) : (
                      <Package className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{item.productName}</p>
                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-slate-900">
                      {formatPrice(item.totalPrice)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatPrice(item.unitPrice)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-slate-600" />
                <span className="font-semibold text-slate-900">Shipping Address</span>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p className="font-medium text-slate-900">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && (
                  <p className="text-slate-500">{order.shippingAddress.phone}</p>
                )}
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-slate-600" />
                <span className="font-semibold text-slate-900">Billing Address</span>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p className="font-medium text-slate-900">{order.billingAddress.fullName}</p>
                <p>{order.billingAddress.street}</p>
                <p>
                  {order.billingAddress.city}, {order.billingAddress.state}{' '}
                  {order.billingAddress.postalCode}
                </p>
                <p>{order.billingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-50 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-600" />
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between text-lg font-bold">
                <span className="text-slate-900">Total</span>
                <span className="text-slate-900">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 mt-6 text-xs text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>Ordered on {formatDate(order.createdAt)}</span>
            {order.updatedAt !== order.createdAt && (
              <>
                <span>•</span>
                <span>Last updated {formatDate(order.updatedAt)}</span>
              </>
            )}
          </div>
          {order.notes && (
            <div className="mt-4 p-3 bg-amber-50 rounded-xl">
              <p className="text-sm text-amber-800">
                <span className="font-medium">Note:</span> {order.notes}
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}