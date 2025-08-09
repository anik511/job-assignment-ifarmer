"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { LoadingSpinner } from '@/components/assignment-2'
import Button from '@/components/shared/Button'
import Swal from 'sweetalert2'

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

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const [productImages, setProductImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params
        const { id } = resolvedParams
        
        // Fetch from Platzi API
        const API_URL = `https://api.escuelajs.co/api/v1/products/${id}`
        
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const apiProduct: PlatziProduct = await response.json()
        
        // Transform API response to our Product interface
        const transformedProduct: Product = {
          id: apiProduct.id.toString(),
          name: apiProduct.title,
          description: apiProduct.description,
          price: apiProduct.price,
          category: apiProduct.category.name,
          imageUrl: apiProduct.images[0] || 'https://via.placeholder.com/400x400?text=No+Image',
          createdAt: new Date(apiProduct.creationAt),
          updatedAt: new Date(apiProduct.updatedAt)
        }
        
        // Store all images for gallery display
        setProductImages(apiProduct.images.filter(img => img && img.trim() !== ''))
        
        setProduct(transformedProduct)
        
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product details. Please check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params])

  const handleDelete = async () => {
    if (!product) return
    
    try {
      // Show confirmation dialog with SweetAlert2
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this! Product "${product.name}" will be deleted.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        // Call the Platzi API to delete the product
        const API_URL = `https://api.escuelajs.co/api/v1/products/${product.id}`
        
        const response = await fetch(API_URL, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // Show success message
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your product has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
        
        // Navigate back to products list
        router.push('/assignment-2/products')
      }
      
    } catch (err) {
      console.error('Error deleting product:', err)
      
      // Show error message with SweetAlert2
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" className="mb-4" />
            <div className="text-lg text-gray-600 dark:text-gray-300">Loading product details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Product Not Found'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/assignment-2/products">
              <Button variant="primary">
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 sm:mb-8">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link 
                href="/assignment-2/products" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 dark:text-white font-medium truncate max-w-32 sm:max-w-none">{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Product Image Gallery */}
            <div className="space-y-4 order-1 lg:order-1">
              {/* Main Image */}
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-96 h-64 sm:h-80 lg:h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative mx-auto">
                <Image
                  src={productImages[selectedImageIndex] || product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              
              {/* Image Thumbnails */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 max-w-sm sm:max-w-md lg:max-w-96 mx-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative border-2 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
              {/* Title and Price */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium self-start sm:self-center">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 sm:pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="flex flex-col sm:block">
                    <span className="text-gray-600 dark:text-gray-400">Product ID:</span>
                    <span className="sm:ml-2 font-medium text-gray-900 dark:text-white">#{product.id}</span>
                  </div>
                  <div className="flex flex-col sm:block">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="sm:ml-2 font-medium text-gray-900 dark:text-white">{product.category}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link 
                    href={`/assignment-2/products/${product.id}/edit`}
                    className="flex-1"
                  >
                    <Button variant="primary" className="w-full">
                      Edit Product
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="danger" 
                    onClick={handleDelete}
                    className="flex-1"
                  >
                    Delete Product
                  </Button>
                </div>
                
                <div className="mt-3 sm:mt-4">
                  <Link href="/assignment-2/products">
                    <Button variant="outline" className="w-full">
                      Back to Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
