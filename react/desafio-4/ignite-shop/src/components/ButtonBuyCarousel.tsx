'use client'

import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'

interface ButtonBuyCarouselProps {
  priceId: string
}

export const ButtonBuyCarousel = ({ priceId }: ButtonBuyCarouselProps) => {
  const { cart, addItemToCart } = useContext(CartContext)

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    addItemToCart({
      priceId,
      quantity: 1,
    })
  }

  const hasItem = cart.find((item) => item.priceId === priceId)

  return (
    <button
      type="button"
      title="Comprar"
      className="relative text-[0px] flex items-center justify-center rounded-md p-3 text-white bg-brand-principal hover:bg-brand-light active:brightness-75 transition-colors"
      onClick={handleBuy}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M243.86,197.65l-14.25-120A20.06,20.06,0,0,0,209.67,60H179.83A52,52,0,0,0,76.17,60H46.33A20.06,20.06,0,0,0,26.39,77.65l-14.25,120A20,20,0,0,0,32.08,220H223.92a20,20,0,0,0,19.94-22.35ZM128,36a28,28,0,0,1,27.71,24H100.29A28,28,0,0,1,128,36ZM36.5,196,49.81,84H76v20a12,12,0,0,0,24,0V84h56v20a12,12,0,0,0,24,0V84h26.19L219.5,196Z" />
      </svg>

      {hasItem && (
        <span className="absolute -top-3 -right-3 flex items-center justify-center w-7 h-7 rounded-full bg-white bg-opacity-80 border-solid text-sm font-bold text-brand-principal">
          {hasItem.quantity}
        </span>
      )}
    </button>
  )
}
