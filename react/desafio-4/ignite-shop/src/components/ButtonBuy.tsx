'use client'

import { useContext } from 'react'

import { CartContext } from '@/contexts/CartContext'
import { Product } from '@/types/Product'

interface ButtonBuyProps {
  children: React.ReactNode
  product: Product
}

export function ButtonBuy({ children, product }: ButtonBuyProps) {
  const { addItemToCart } = useContext(CartContext)

  const handleBuyProduct = async () => {
    addItemToCart({
      product,
      quantity: 1,
    })
  }

  return (
    <button
      className="relative mt-auto bg-brand-principal border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-lg disabled:opacity-60 disabled:cursor-not-allowed [&:not(:disabled):hover]:bg-brand-light"
      onClick={handleBuyProduct}
    >
      {children}
    </button>
  )
}
