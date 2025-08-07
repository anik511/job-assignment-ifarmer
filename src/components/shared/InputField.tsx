import { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

export default function InputField({ 
  label, 
  error, 
  className = '', 
  ...props 
}: InputFieldProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
          error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
