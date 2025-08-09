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
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 lg:sticky lg:top-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
        Categories
      </h3>
      
      <div className="space-y-1 sm:space-y-2">
        {/* All Categories */}
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
            selectedCategory === ''
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>All Categories</span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {Object.values(productCounts).reduce((sum, count) => sum + count, 0)}
            </span>
          </div>
        </button>

        {/* Individual Categories */}
        {PRODUCT_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="truncate">{category}</span>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-2">
                {productCounts[category] || 0}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Clear Filter */}
      {selectedCategory && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => onCategoryChange('')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs sm:text-sm font-medium"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
