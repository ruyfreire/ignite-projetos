'use client'

import { useContext } from 'react'

import { CartContext } from '@/contexts/CartContext'

interface ButtonBuyProps {
  children: React.ReactNode
  priceId: string
}

export function ButtonBuy({ children, priceId }: ButtonBuyProps) {
  const { cart, addItemToCart } = useContext(CartContext)

  const handleBuyProduct = async () => {
    addItemToCart({
      priceId,
      quantity: 1,
    })

    // try {
    //   setIsCreatingCheckout(true)
    //   const response = await axios.post('/api/checkout', {
    //     priceId,
    //   })

    //   const { checkoutUrl } = response.data

    //   window.location.href = checkoutUrl
    // } catch (error) {
    //   setIsCreatingCheckout(false)
    //   alert('Error ao redirecionar para o checkout')
    // }
  }

  const hasItem = cart.find((item) => item.priceId === priceId)

  return (
    <button
      className="relative mt-auto bg-brand-principal border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-lg disabled:opacity-60 disabled:cursor-not-allowed [&:not(:disabled):hover]:bg-brand-light"
      onClick={handleBuyProduct}
    >
      {children}

      {hasItem && (
        <span className="absolute -top-3 -right-3 flex items-center justify-center w-7 h-7 rounded-full bg-brand-principal border-solid border-4 border-grayscale-background text-sm font-bold text-white">
          {hasItem.quantity}
        </span>
      )}
    </button>
  )
}
