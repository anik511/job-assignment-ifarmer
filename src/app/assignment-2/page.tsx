"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Assignment2Page() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to products page immediately
    router.replace('/assignment-2/products')
  }, [router])

  return null
}
