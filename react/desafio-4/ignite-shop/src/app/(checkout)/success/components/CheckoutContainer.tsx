'use client'

import { useContext, useEffect } from 'react'
import { CartContext } from '@/contexts/CartContext'

interface CheckoutContainerPros {
  children: React.ReactNode
}

export const CheckoutContainer = ({ children }: CheckoutContainerPros) => {
  const { clearItens } = useContext(CartContext)

  useEffect(() => {
    clearItens()
  }, [clearItens])

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-8">
      {children}
    </div>
  )
}
