"use client"

import React, { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'
import { Package, Edit, Save, Plus, Trash2, Image as ImageIcon, X } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  short_description: string
  category: 'necklaces' | 'bracelets'
  collection: 'modern' | 'timeless'
  price: number
  original_price: number | null
  stock_count: number
  image_studio: string | null
  image_detail: string | null
  image_styled: string | null
  image_worn: string | null
  tags: string[]
  sizes: string[] | null
  sort_order: number
  is_active: boolean
  is_new: boolean
  is_bestseller: boolean
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'necklaces',
    collection: 'modern',
    is_active: true,
    is_new: false,
    is_bestseller: false,
    tags: [],
    sizes: [],
    sort_order: 0,
  })
  const [tagInput, setTagInput] = useState('')
  const [sizeInput, setSizeInput] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    fetchProducts()
  }, [])

  // Don't render on server to avoid Supabase errors during build
  if (!isClient) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
          <span className="text-slate-600 font-medium">Loading products...</span>
        </div>
      </div>
    )
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const result = await (getSupabase() as any)
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      const { data, error } = result

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const saveProduct = async (product: Product) => {
    try {
      setSaving(true)
      const supabase = getSupabase()
      const result = await (supabase as any)
        .from('products')
        .update({
          name: product.name,
          description: product.description,
          short_description: product.short_description,
          category: product.category,
          collection: product.collection,
          price: product.price,
          original_price: product.original_price,
          stock_count: product.stock_count,
          image_studio: product.image_studio,
          image_detail: product.image_detail,
          image_styled: product.image_styled,
          image_worn: product.image_worn,
          tags: product.tags,
          sizes: product.sizes,
          sort_order: product.sort_order,
          is_active: product.is_active,
          is_new: product.is_new,
          is_bestseller: product.is_bestseller,
          updated_at: new Date().toISOString(),
        })
        .eq('id', product.id)

      const { error } = result

      if (error) throw error
      setEditingId(null)
      fetchProducts()
    } catch (err: any) {
      setError(err.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const addProduct = async () => {
    try {
      setSaving(true)
      const result = await (getSupabase() as any)
        .from('products')
        .insert({
          name: newProduct.name || '',
          description: newProduct.description || '',
          short_description: newProduct.short_description || '',
          category: newProduct.category || 'necklaces',
          collection: newProduct.collection || 'modern',
          price: newProduct.price || 0,
          original_price: newProduct.original_price,
          stock_count: newProduct.stock_count || 0,
          image_studio: newProduct.image_studio || null,
          image_detail: newProduct.image_detail || null,
          image_styled: newProduct.image_styled || null,
          image_worn: newProduct.image_worn || null,
          tags: newProduct.tags || [],
          sizes: newProduct.sizes || null,
          sort_order: newProduct.sort_order || 0,
          is_active: newProduct.is_active || true,
          is_new: newProduct.is_new || false,
          is_bestseller: newProduct.is_bestseller || false,
        })

      const { error } = result
      if (error) throw error
      setShowAddForm(false)
      setNewProduct({
        category: 'necklaces',
        collection: 'modern',
        is_active: true,
        is_new: false,
        is_bestseller: false,
        tags: [],
        sizes: [],
        sort_order: 0,
      })
      setTagInput('')
      setSizeInput('')
      fetchProducts()
    } catch (err: any) {
      setError(err.message || 'Failed to add product')
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const result = await (getSupabase() as any)
        .from('products')
        .delete()
        .eq('id', id)

      const { error } = result
      if (error) throw error
      fetchProducts()
    } catch (err: any) {
      setError(err.message || 'Failed to delete product')
    }
  }

  const addTag = (product: Product, tag: string) => {
    if (!tag.trim()) return
    const updated = { ...product, tags: [...product.tags, tag.trim()] }
    saveProduct(updated)
  }

  const removeTag = (product: Product, tagToRemove: string) => {
    const updated = { ...product, tags: product.tags.filter(t => t !== tagToRemove) }
    saveProduct(updated)
  }

  const addSize = (product: Product, size: string) => {
    if (!size.trim()) return
    const updated = { ...product, sizes: [...(product.sizes || []), size.trim()] }
    saveProduct(updated)
  }

  const removeSize = (product: Product, sizeToRemove: string) => {
    const updated = { ...product, sizes: (product.sizes || []).filter(s => s !== sizeToRemove) }
    saveProduct(updated)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
          <span className="text-slate-600 font-medium">Loading products...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Package className="w-7 h-7 text-slate-700" />
                Product Management
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Manage jewellery products, pricing, and inventory
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
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
            <button onClick={() => { setError(null); fetchProducts(); }} className="ml-auto text-rose-700 hover:text-rose-800 font-medium">
              Retry
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Image Preview */}
                  <div className="w-full lg:w-48 h-32 rounded-xl bg-gradient-to-br flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: product.image_studio || 'linear-gradient(135deg, #E8D5C4 0%, #D4B9A4 100%)' }}>
                    {product.image_studio ? (
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image_studio})` }} />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            product.category === 'necklaces' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {product.category}
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            product.collection === 'modern' ? 'bg-slate-900 text-white' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {product.collection}
                          </span>
                          {product.is_new && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">NEW</span>}
                          {product.is_bestseller && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">BESTSELLER</span>}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {!product.is_active && (
                          <span className="text-xs text-slate-500 font-medium px-2 py-0.5 rounded-full bg-slate-100">Inactive</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.short_description}</p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-slate-900">£{product.price.toFixed(2)}</span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-slate-400 line-through">£{product.original_price.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Tags */}
                    {product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stock & Sizes */}
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>Stock: <span className={`font-medium ${
                        product.stock_count === 0 ? 'text-rose-600' : 
                        product.stock_count <= 2 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>{product.stock_count}</span></span>
                      {product.sizes && product.sizes.length > 0 && (
                        <span>Sizes: {product.sizes.join(', ')}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => setEditingId(editingId === product.id ? null : product.id)}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                {editingId === product.id && (
                  <ProductEditForm
                    product={product}
                    onSave={saveProduct}
                    onCancel={() => setEditingId(null)}
                    saving={saving}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !showAddForm && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No products yet</h3>
            <p className="text-slate-500 mb-4">Add your first product to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        )}

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setTagInput('')
                  setSizeInput('')
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AddProductForm
              product={newProduct}
              onChange={setNewProduct}
              onSave={addProduct}
              onCancel={() => {
                setShowAddForm(false)
                setTagInput('')
                setSizeInput('')
              }}
              saving={saving}
              tagInput={tagInput}
              setTagInput={setTagInput}
              sizeInput={sizeInput}
              setSizeInput={setSizeInput}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function ProductEditForm({ product, onSave, onCancel, saving }: {
  product: Product
  onSave: (p: Product) => void
  onCancel: () => void
  saving: boolean
}) {
  const [edited, setEdited] = useState(product)
  const [tagInput, setTagInput] = useState('')
  const [sizeInput, setSizeInput] = useState('')

  const handleSave = () => {
    onSave(edited)
  }

  const addTag = () => {
    if (!tagInput.trim()) return
    setEdited({ ...edited, tags: [...edited.tags, tagInput.trim()] })
    setTagInput('')
  }

  const removeTag = (tagToRemove: string) => {
    setEdited({ ...edited, tags: edited.tags.filter(t => t !== tagToRemove) })
  }

  const addSize = () => {
    if (!sizeInput.trim()) return
    const sizes = edited.sizes || []
    setEdited({ ...edited, sizes: [...sizes, sizeInput.trim()] })
    setSizeInput('')
  }

  const removeSize = (sizeToRemove: string) => {
    setEdited({ ...edited, sizes: (edited.sizes || []).filter(s => s !== sizeToRemove) })
  }

  return (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
          <input
            type="text"
            value={edited.name}
            onChange={(e) => setEdited({ ...edited, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            value={edited.category}
            onChange={(e) => setEdited({ ...edited, category: e.target.value as any })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="necklaces">Necklaces</option>
            <option value="bracelets">Bracelets</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Collection</label>
          <select
            value={edited.collection}
            onChange={(e) => setEdited({ ...edited, collection: e.target.value as any })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="modern">Modern</option>
            <option value="timeless">Timeless</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Price (£)</label>
          <input
            type="number"
            step="0.01"
            value={edited.price}
            onChange={(e) => setEdited({ ...edited, price: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Original Price (£) <span className="text-slate-400">(optional)</span></label>
          <input
            type="number"
            step="0.01"
            value={edited.original_price || ''}
            onChange={(e) => setEdited({ ...edited, original_price: e.target.value ? parseFloat(e.target.value) : null })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Stock Count</label>
          <input
            type="number"
            min="0"
            value={edited.stock_count}
            onChange={(e) => setEdited({ ...edited, stock_count: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
        <textarea
          value={edited.short_description}
          onChange={(e) => setEdited({ ...edited, short_description: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={2}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Description</label>
        <textarea
          value={edited.description}
          onChange={(e) => setEdited({ ...edited, description: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="e.g. Gold, Gemstone"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
            <button
              onClick={addTag}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {edited.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-rose-600">×</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sizes (comma separated)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
              placeholder="e.g. S, M, L"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
            <button
              onClick={addSize}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {(edited.sizes || []).map((size, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                {size}
                <button onClick={() => removeSize(size)} className="hover:text-rose-600">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={edited.is_new}
            onChange={(e) => setEdited({ ...edited, is_new: e.target.checked })}
            className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm text-slate-700">New Arrival</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={edited.is_bestseller}
            onChange={(e) => setEdited({ ...edited, is_bestseller: e.target.checked })}
            className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm text-slate-700">Bestseller</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={edited.is_active}
            onChange={(e) => setEdited({ ...edited, is_active: e.target.checked })}
            className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
          />
          <span className="text-sm text-slate-700">Active</span>
        </label>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
          <input
            type="number"
            value={edited.sort_order}
            onChange={(e) => setEdited({ ...edited, sort_order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-400">
        <p><strong>Image URLs:</strong></p>
        <p className="mt-1">Studio: <span className="font-mono">{edited.image_studio || '—'}</span></p>
        <p>Detail: <span className="font-mono">{edited.image_detail || '—'}</span></p>
        <p>Styled: <span className="font-mono">{edited.image_styled || '—'}</span></p>
        <p>Worn: <span className="font-mono">{edited.image_worn || '—'}</span></p>
      </div>
    </div>
  )
}

function AddProductForm({ product, onChange, onSave, onCancel, saving, tagInput, setTagInput, sizeInput, setSizeInput }: {
  product: Partial<Product>
  onChange: (p: Partial<Product>) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  tagInput: string
  setTagInput: (s: string) => void
  sizeInput: string
  setSizeInput: (s: string) => void
}) {
  const addTag = () => {
    if (!tagInput.trim()) return
    const tags = [...(product.tags || []), tagInput.trim()]
    onChange({ ...product, tags })
    setTagInput('')
  }

  const removeTag = (tagToRemove: string) => {
    const tags = (product.tags || []).filter(t => t !== tagToRemove)
    onChange({ ...product, tags })
  }

  const addSize = () => {
    if (!sizeInput.trim()) return
    const sizes = [...(product.sizes || []), sizeInput.trim()]
    onChange({ ...product, sizes })
    setSizeInput('')
  }

  const removeSize = (sizeToRemove: string) => {
    const sizes = (product.sizes || []).filter(s => s !== sizeToRemove)
    onChange({ ...product, sizes })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
          <input
            type="text"
            value={product.name || ''}
            onChange={(e) => onChange({ ...product, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            placeholder="e.g. Golden Harmony Necklace"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            value={product.category || 'necklaces'}
            onChange={(e) => onChange({ ...product, category: e.target.value as any })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="necklaces">Necklaces</option>
            <option value="bracelets">Bracelets</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Collection</label>
          <select
            value={product.collection || 'modern'}
            onChange={(e) => onChange({ ...product, collection: e.target.value as any })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="modern">Modern</option>
            <option value="timeless">Timeless</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Price (£) *</label>
          <input
            type="number"
            step="0.01"
            value={product.price || ''}
            onChange={(e) => onChange({ ...product, price: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            placeholder="e.g. 285.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Original Price (£) <span className="text-slate-400">(for sales)</span></label>
          <input
            type="number"
            step="0.01"
            value={product.original_price || ''}
            onChange={(e) => onChange({ ...product, original_price: e.target.value ? parseFloat(e.target.value) : null })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            placeholder="e.g. 310.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Stock Count</label>
          <input
            type="number"
            min="0"
            value={product.stock_count || ''}
            onChange={(e) => onChange({ ...product, stock_count: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            placeholder="e.g. 5"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
        <textarea
          value={product.short_description || ''}
          onChange={(e) => onChange({ ...product, short_description: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={2}
          placeholder="Brief description for cards and above the fold..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Description</label>
        <textarea
          value={product.description || ''}
          onChange={(e) => onChange({ ...product, description: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
          placeholder="Detailed description for the product detail page..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="e.g. Gold, Gemstone, Modern"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
            <button
              onClick={addTag}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {(product.tags || []).map((tag, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-rose-600">×</button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sizes (comma separated) <span className="text-slate-400">(optional)</span></label>
          <div className="flex gap-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
              placeholder="e.g. S, M, L, XL"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
            <button
              onClick={addSize}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {(product.sizes || []).map((size, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                {size}
                <button onClick={() => removeSize(size)} className="hover:text-rose-600">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={product.is_new || false}
            onChange={(e) => onChange({ ...product, is_new: e.target.checked })}
            className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm text-slate-700">New Arrival</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={product.is_bestseller || false}
            onChange={(e) => onChange({ ...product, is_bestseller: e.target.checked })}
            className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
          />
          <span className="text-sm text-slate-700">Bestseller</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={product.is_active !== false}
            onChange={(e) => onChange({ ...product, is_active: e.target.checked })}
            className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
          />
          <span className="text-sm text-slate-700">Active</span>
        </label>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
          <input
            type="number"
            value={product.sort_order || 0}
            onChange={(e) => onChange({ ...product, sort_order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onSave}
          disabled={saving || !product.name || !product.price}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {saving ? 'Adding...' : 'Add Product'}
        </button>
        <button
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}