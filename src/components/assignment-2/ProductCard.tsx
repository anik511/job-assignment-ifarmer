import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import Button from '@/components/shared/Button'

interface ProductCardProps {
  product: Product
  onDelete: (id: string) => void
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const handleDelete = () => {
    onDelete(product.id)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      {/* Product Image */}
      <div className="mb-3 sm:mb-4">
        <div className="w-full h-40 sm:h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
          <Image
            src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 sm:mb-3">
          <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded self-start sm:self-center">
            {product.category}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={`/assignment-2/products/${product.id}`}
          className="flex-1"
        >
          <Button variant="secondary" size="sm" className="w-full text-xs sm:text-sm">
            View
          </Button>
        </Link>
        <Link
          href={`/assignment-2/products/${product.id}/edit`}
          className="flex-1"
        >
          <Button variant="primary" size="sm" className="w-full text-xs sm:text-sm">
            Edit
          </Button>
        </Link>
        <Button 
          variant="danger" 
          size="sm" 
          onClick={handleDelete}
          className="flex-1 text-xs sm:text-sm"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
