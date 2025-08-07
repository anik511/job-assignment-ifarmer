import { PRODUCT_CATEGORIES } from '@/types/product'

interface CategorySidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  productCounts: Record<string, number>
}

export default function CategorySidebar({ 
  selectedCategory, 
  onCategoryChange, 
  productCounts 
}: CategorySidebarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Categories
      </h3>
      
      <div className="space-y-2">
        {/* All Categories */}
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === ''
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>All Categories</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Object.values(productCounts).reduce((sum, count) => sum + count, 0)}
            </span>
          </div>
        </button>

        {/* Individual Categories */}
        {PRODUCT_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{category}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {productCounts[category] || 0}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Clear Filter */}
      {selectedCategory && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => onCategoryChange('')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
