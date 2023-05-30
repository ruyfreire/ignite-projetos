'use client'
import axios from 'axios'
import { useState } from 'react'

interface ButtonBuyProps {
  children: React.ReactNode
  priceId: string
}

export function ButtonBuy({ children, priceId }: ButtonBuyProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckout(true)
      const response = await axios.post('/api/checkout', {
        priceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckout(false)
      alert('Error ao redirecionar para o checkout')
    }
  }

  return (
    <button
      className="mt-auto bg-brand-principal border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-lg disabled:opacity-60 disabled:cursor-not-allowed [&:not(:disabled):hover]:bg-brand-light"
      disabled={isCreatingCheckout}
      onClick={handleBuyProduct}
    >
      {children}
    </button>
  )
}
