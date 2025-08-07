export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductFormData {
  name: string
  description: string
  price: string // string for form input, converted to number
  category: string
  imageUrl: string
  inStock: boolean
}

export interface ProductFilters {
  search: string
  category: string
}

export const PRODUCT_CATEGORIES = [
  'Clothes',
  'Electronics', 
  'Furniture',
  'Shoes',
  'Miscellaneous'
] as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]

// Initial empty product for forms
export const emptyProduct: ProductFormData = {
  name: '',
  description: '',
  price: '',
  category: '',
  imageUrl: '',
  inStock: true
}

// Sample products for initial data (using Platzi categories)
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    imageUrl: 'https://via.placeholder.com/300x200?text=Headphones',
    inStock: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 19.99,
    category: 'Clothes',
    imageUrl: 'https://via.placeholder.com/300x200?text=T-Shirt',
    inStock: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Lightweight running shoes for daily exercise',
    price: 79.99,
    category: 'Shoes',
    imageUrl: 'https://via.placeholder.com/300x200?text=Shoes',
    inStock: false,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  }
]
