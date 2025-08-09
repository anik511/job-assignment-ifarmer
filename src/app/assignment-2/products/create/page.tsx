'use client'

import ProductForm from '@/components/assignment-2/ProductForm'

export default function CreateProductPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Product
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Add a new product to the store
          </p>
        </div>

        {/* Product Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <ProductForm mode="create" />
        </div>
      </div>
    </div>
  )
}
