'use client'

import { createContext, useState } from 'react'

interface ItemCart {
  priceId: string
  quantity: number
}

interface CartContextProps {
  cart: ItemCart[]
  addItemToCart: (item: ItemCart) => void
  removeItemToCart: (priceId: string) => void
}

interface CartProviderProps {
  children: React.ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ItemCart[]>([])

  const addItemToCart = (item: ItemCart) => {
    const hasItem = cart.find((cartItem) => cartItem.priceId === item.priceId)

    if (hasItem) {
      setCart((state) =>
        state.map((cartItem) =>
          cartItem.priceId === item.priceId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    } else {
      setCart((state) => [...state, item])
    }
  }

  const removeItemToCart = (priceId: string) => {
    const hasItem = cart.find((cartItem) => cartItem.priceId === priceId)

    if (hasItem) {
      setCart((state) =>
        state.filter((cartItem) => cartItem.priceId !== priceId)
      )
    }
  }

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemToCart }}>
      {children}
    </CartContext.Provider>
  )
}
