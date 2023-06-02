'use client'

import { CartContext } from '@/contexts/CartContext'
import Link from 'next/link'
import { useContext } from 'react'

interface ButtonCartProps {}

export const ButtonCart = ({}: ButtonCartProps) => {
  const { cart } = useContext(CartContext)

  return (
    <Link
      className="relative text-[0px] w-12 h-12 flex items-center justify-center rounded-md p-3 text-white bg-grayscale-elements hover:brightness-125 active:brightness-90 transition-colors"
      href="/"
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

      {cart.length && (
        <span className="absolute -top-3 -right-3 flex items-center justify-center w-7 h-7 rounded-full bg-brand-principal border-solid border-4 border-grayscale-background text-sm font-bold text-white">
          {cart.length}
        </span>
      )}
    </Link>
  )
}
