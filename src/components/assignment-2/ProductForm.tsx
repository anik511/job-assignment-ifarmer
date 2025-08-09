import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/shared/Button'
import InputField from '@/components/shared/InputField'
import Swal from 'sweetalert2'

// Platzi API Category interface
interface PlatziCategory {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}

// Product form data interface
interface ProductFormData {
  title: string
  price: string
  description: string
  categoryId: string
  images: string[]
}

interface ProductFormProps {
  mode: 'create' | 'edit'
  productId?: string
  initialData?: Partial<ProductFormData>
  onSuccess?: () => void
}

export default function ProductForm({ mode, productId, initialData, onSuccess }: ProductFormProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<PlatziCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    categoryId: initialData?.categoryId || '',
    images: initialData?.images || ['https://placehold.co/600x400']
  })

  const [errors, setErrors] = useState<Partial<ProductFormData>>({})

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: PlatziCategory[] = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback categories
        setCategories([
          { id: 1, name: 'Clothes', slug: 'clothes', image: '', creationAt: '', updatedAt: '' },
          { id: 2, name: 'Electronics', slug: 'electronics', image: '', creationAt: '', updatedAt: '' },
          { id: 3, name: 'Furniture', slug: 'furniture', image: '', creationAt: '', updatedAt: '' },
          { id: 4, name: 'Shoes', slug: 'shoes', image: '', creationAt: '', updatedAt: '' },
          { id: 5, name: 'Miscellaneous', slug: 'miscellaneous', image: '', creationAt: '', updatedAt: '' }
        ])
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required'
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Handle image URL change
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData(prev => ({ ...prev, images: newImages }))
  }

  // Add image URL
  const addImage = () => {
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, 'https://placehold.co/600x400'] 
    }))
  }

  // Remove image URL
  const removeImage = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, images: newImages }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const apiUrl = mode === 'create' 
        ? 'https://api.escuelajs.co/api/v1/products'
        : `https://api.escuelajs.co/api/v1/products/${productId}`

      const method = mode === 'create' ? 'POST' : 'PUT'

      const requestBody = {
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        categoryId: Number(formData.categoryId),
        images: formData.images.filter(img => img.trim() !== '')
      }

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      await response.json()

      // Show success message
      await Swal.fire({
        title: 'Success!',
        text: `Product ${mode === 'create' ? 'created' : 'updated'} successfully!`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })

      // Call success callback or navigate
      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/assignment-2/products')
      }

    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} product:`, error)
      
      await Swal.fire({
        title: 'Error!',
        text: `Failed to ${mode === 'create' ? 'create' : 'update'} product. Please try again.`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setLoading(false)
    }
  }

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading categories...</span>
      </div>
    )
  }

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Product Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Title *
          </label>
          <InputField
            id="title"
            placeholder="Enter product title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price (USD) *
          </label>
          <InputField
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            className="w-full"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.categoryId}
            onChange={(e) => handleInputChange('categoryId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.categoryId}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Images
          </label>
          <div className="space-y-3">
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <InputField
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1"
                />
                {formData.images.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeImage(index)}
                    className="px-3"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addImage}
            className="mt-2"
          >
            Add Image URL
          </Button>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/assignment-2/products')}
            className="w-full sm:flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-full sm:flex-1"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span className="text-sm sm:text-base">
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">
                {mode === 'create' ? 'Create Product' : 'Update Product'}
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
