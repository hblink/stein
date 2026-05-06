"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { Order, OrderItem } from '@/types/order'
import { supabase } from '@/lib/supabase'
import { OrdersTable } from '@/components/OrdersTable'
import { OrderCard } from '@/components/OrderCard'
import { OrderDetailsModal } from '@/components/OrderDetailsModal'
import { Package, Search, Filter, SlidersHorizontal, List, LayoutGrid, ArrowUpDown } from 'lucide-react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'total'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError

      const ordersWithItems = await Promise.all(
        (data || []).map(async (order) => {
          const items = await fetchOrderItems(order.id)
          return {
            id: order.id,
            orderNumber: order.order_number,
            customerId: order.customer_id,
            customerName: order.customer_name,
            email: order.email,
            subtotal: Number(order.subtotal) || 0,
            tax: Number(order.tax) || 0,
            shipping: Number(order.shipping) || 0,
            discount: Number(order.discount) || 0,
            total: Number(order.total) || 0,
            orderStatus: order.order_status || 'pending',
            paymentStatus: order.payment_status || 'pending',
            fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
            shippingAddress: typeof order.shipping_address === 'string'
              ? JSON.parse(order.shipping_address)
              : order.shipping_address || {},
            billingAddress: typeof order.billing_address === 'string'
              ? JSON.parse(order.billing_address)
              : order.billing_address || {},
            trackingNumber: order.tracking_number,
            trackingUrl: order.tracking_url,
            estimatedDelivery: order.estimated_delivery || undefined,
            items: items || [],
            notes: order.notes,
            cancelledAt: order.cancelled_at,
            fulfilledAt: order.fulfilled_at,
            createdAt: order.created_at,
            updatedAt: order.updated_at,
          } as Order
        })
      )

      setOrders(ordersWithItems)
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const fetchOrderItems = async (orderId: string): Promise<OrderItem[]> => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)

      if (error) throw error

      return (data || []).map(item => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id || '',
        productName: item.product_name,
        quantity: item.quantity,
        unitPrice: Number(item.unit_price) || 0,
        totalPrice: Number(item.total_price) || 0,
        image: item.image_url,
      }))
    } catch (err) {
      console.error('Error fetching order items:', err)
      return []
    }
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query) ||
          order.customerName?.toLowerCase().includes(query) ||
          order.orderStatus.toLowerCase().includes(query)
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter((order) => order.orderStatus === statusFilter)
    }

    if (paymentFilter !== 'all') {
      result = result.filter((order) => order.paymentStatus === paymentFilter)
    }

    result.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === 'total') {
        comparison = a.total - b.total
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [orders, searchQuery, statusFilter, paymentFilter, sortBy, sortOrder])

  const stats = useMemo(() => {
    return {
      total: orders.length,
      revenue: orders.reduce((sum, o) => sum + o.total, 0),
      pending: orders.filter((o) => o.orderStatus === 'pending').length,
      delivered: orders.filter((o) => o.orderStatus === 'delivered').length,
      cancelled: orders.filter((o) => o.orderStatus === 'cancelled').length,
    }
  }, [orders])

  // Don't render on server to avoid supabase errors during build
  if (!isClient) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
          <span className="text-slate-600 font-medium">Loading orders...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-12">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Package className="w-7 h-7 text-slate-700" />
                Order Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Track and manage customer orders from the Supabase orders table
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
            <button onClick={fetchOrders} className="ml-auto text-rose-700 hover:text-rose-800 font-medium">
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="text-slate-500 text-sm font-medium mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="text-slate-500 text-sm font-medium mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.revenue)}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="text-slate-500 text-sm font-medium mb-1">Pending</div>
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="text-slate-500 text-sm font-medium mb-1">Delivered</div>
            <div className="text-2xl font-bold text-emerald-600">{stats.delivered}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="text-slate-500 text-sm font-medium mb-1">Cancelled</div>
            <div className="text-2xl font-bold text-rose-600">{stats.cancelled}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                showFilters || statusFilter !== 'all' || paymentFilter !== 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(statusFilter !== 'all' || paymentFilter !== 'all') && (
                <span className="w-5 h-5 rounded-full bg-white/20 text-white text-xs flex items-center justify-center">
                  {(statusFilter !== 'all' ? 1 : 0) + (paymentFilter !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <List className="w-4 h-4" />
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Cards
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Order Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Payment:</span>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value="all">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'total')}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value="date">Date</option>
                  <option value="total">Total</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
                >
                  {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            Showing {filteredAndSortedOrders.length} of {orders.length} orders
          </p>
        </div>

        {viewMode === 'table' ? (
          <OrdersTable orders={filteredAndSortedOrders} onViewOrder={handleViewOrder} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredAndSortedOrders.map((order) => (
              <OrderCard
                key={order.id}
                orderNumber={order.orderNumber}
                orderStatus={order.orderStatus}
                paymentStatus={order.paymentStatus}
                fulfillmentStatus={order.fulfillmentStatus}
                total={order.total}
                items={order.items}
                estimatedDelivery={order.estimatedDelivery}
                trackingNumber={order.trackingNumber}
                createdAt={order.createdAt}
                customerName={order.customerName}
                onViewDetails={() => handleViewOrder(order)}
              />
            ))}
          </div>
        )}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedOrder(null)
        }}
      />
    </div>
  )
}