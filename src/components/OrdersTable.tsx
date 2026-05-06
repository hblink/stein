import React from 'react'
import { Order } from '../types/order'
import { OrderStatusBadge } from './OrderStatusBadge'
import { PaymentStatusBadge } from './OrderStatusBadge'
import { FulfillmentStatusBadge } from './OrderStatusBadge'

interface OrdersTableProps {
  orders: Order[]
  onViewOrder: (order: Order) => void
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewOrder }) => {
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

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
        <svg
          className="w-16 h-16 mx-auto text-slate-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M6.75 7.5h10.5a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No orders found</h3>
        <p className="text-slate-500">No orders match your search criteria</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-100">
        {orders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-slate-900">Order {order.orderNumber}</h3>
                <p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p>
              </div>
              <span className="text-lg font-bold text-slate-900">{formatPrice(order.total)}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <OrderStatusBadge status={order.orderStatus} size="sm" />
              <PaymentStatusBadge status={order.paymentStatus} size="sm" />
              <FulfillmentStatusBadge status={order.fulfillmentStatus} size="sm" />
            </div>

            <div className="space-y-2 mb-3">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="truncate">{item.productName}</span>
                  <span className="text-slate-400">x{item.quantity}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <p className="text-sm text-slate-500">+{order.items.length - 2} more items</p>
              )}
            </div>

            {order.estimatedDelivery && (
              <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full w-fit mb-3 text-sm">
                <svg
                  className="w-3 h-3"
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
                <span className="font-medium">Est. {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            )}

            <button
              onClick={() => onViewOrder(order)}
              className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Order</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Customer</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Items</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Total</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Delivery</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order.id}
                className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${idx === orders.length - 1 ? 'border-b-0' : ''}`}
              >
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-slate-900">{order.orderNumber}</p>
                    <p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600">{formatDate(order.createdAt)}</td>
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-slate-900">{order.customerName || 'N/A'}</p>
                  <p className="text-sm text-slate-500">{order.email}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-slate-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-slate-900">{formatPrice(order.total)}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    <OrderStatusBadge status={order.orderStatus} size="sm" />
                    <PaymentStatusBadge status={order.paymentStatus} size="sm" />
                    <FulfillmentStatusBadge status={order.fulfillmentStatus} size="sm" />
                  </div>
                </td>
                <td className="py-4 px-6">
                  {order.estimatedDelivery ? (
                    <div className="flex items-center gap-2 text-amber-700">
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
                      <span className="text-sm font-medium">
                        {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">N/A</span>
                  )}
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    View
                    <svg
                      className="w-3.5 h-3.5"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}