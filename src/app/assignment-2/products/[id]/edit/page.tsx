'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductForm from '@/components/assignment-2/ProductForm'
import LoadingSpinner from '@/components/assignment-2/LoadingSpinner'

// Platzi API Product interface
interface PlatziProduct {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  creationAt: string
  updatedAt: string
  category: {
    id: number
    name: string
    image: string
    creationAt: string
    updatedAt: string
  }
}

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<PlatziProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: PlatziProduct = await response.json()
        
        if (isMounted) {
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        if (isMounted) {
          setError('Failed to load product data')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      isMounted = false
    }
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading product data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {error || 'Product not found'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Prepare initial data for the form
  const initialData = {
    title: product.title,
    price: product.price.toString(),
    description: product.description,
    categoryId: product.category.id.toString(),
    images: product.images
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Product
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Update product information
          </p>
        </div>

        {/* Product Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <ProductForm 
            mode="edit" 
            productId={productId}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  )
}
