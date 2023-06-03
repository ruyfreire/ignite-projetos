'use client'

import { Product } from '@/types/Product'
import { createContext, useState } from 'react'

interface ItemCart {
  product: Product
  quantity: number
}

interface CartContextProps {
  cart: ItemCart[]
  addItemToCart: (item: ItemCart) => void
  removeItemToCart: (productId: string) => void
}

interface CartProviderProps {
  children: React.ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ItemCart[]>([])

  const addItemToCart = (item: ItemCart) => {
    const hasItem = cart.find(
      (cartItem) => cartItem.product.id === item.product.id
    )

    if (hasItem) {
      setCart((state) =>
        state.map((cartItem) =>
          cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    } else {
      setCart((state) => [...state, item])
    }
  }

  const removeItemToCart = (productId: string) => {
    const hasItem = cart.find((cartItem) => cartItem.product.id === productId)

    if (hasItem) {
      setCart((state) =>
        state.filter((cartItem) => cartItem.product.id !== productId)
      )
    }
  }

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemToCart }}>
      {children}
    </CartContext.Provider>
  )
}
