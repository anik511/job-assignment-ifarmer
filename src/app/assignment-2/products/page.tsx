"use client"

import { useState, useEffect, useMemo } from 'react'
import { Product, sampleProducts } from '@/types/product'
import { ProductCard, CategorySidebar, Pagination, LoadingSpinner } from '@/components/assignment-2'
import InputField from '@/components/shared/InputField'

// Platzi API Response interface
interface PlatziProduct {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: {
    id: number
    name: string
    slug: string
    image: string
    creationAt: string
    updatedAt: string
  }
  images: string[]
  creationAt: string
  updatedAt: string
}

const PRODUCTS_PER_PAGE = 6

export default function ProductsPage() {
  // State management
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Fetch products from Platzi API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Platzi Fake Store API
        const API_URL = 'https://api.escuelajs.co/api/v1/products?limit=30'
        
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: PlatziProduct[] = await response.json()
        
        // Transform Platzi API data to match our Product interface
        const transformedProducts: Product[] = data.map((item: PlatziProduct) => ({
          id: item.id.toString(),
          name: item.title,
          description: item.description,
          price: item.price,
          category: item.category.name,
          imageUrl: item.images[0] || 'https://via.placeholder.com/300x200?text=No+Image',
          inStock: true, // Platzi API doesn't have stock info, assume all in stock
          createdAt: new Date(item.creationAt),
          updatedAt: new Date(item.updatedAt)
        }))
        
        setProducts(transformedProducts)
        // Cache in localStorage
        localStorage.setItem('products', JSON.stringify(transformedProducts))
        
      } catch (error) {
        console.error('Error fetching products:', error)
        
        // Fallback to localStorage or sample data
        const savedProducts = localStorage.getItem('products')
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts))
        } else {
          setProducts(sampleProducts)
          localStorage.setItem('products', JSON.stringify(sampleProducts))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  // Category counts for sidebar
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1
    })
    return counts
  }, [products])

  // Delete product function
  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id)
    setProducts(updatedProducts)
    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" className="mb-4" />
            <div className="text-lg text-gray-600 dark:text-gray-300">Loading products...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Products
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-md">
            <InputField
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Categories */}
          <div className="w-64 flex-shrink-0">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              productCounts={categoryCount}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
                {searchTerm && (
                  <span> for &ldquo;{searchTerm}&rdquo;</span>
                )}
                {selectedCategory && (
                  <span> in {selectedCategory}</span>
                )}
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {searchTerm || selectedCategory 
                    ? "Try adjusting your search or filter criteria"
                    : "No products available at the moment"}
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDelete={handleDeleteProduct}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-8"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
