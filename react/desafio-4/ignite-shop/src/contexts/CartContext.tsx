'use client'

import { Product } from '@/types/Product'
import { createContext, useState, useCallback, useEffect } from 'react'

interface ItemCart {
  product: Product
  quantity: number
}

interface CartContextProps {
  cart: ItemCart[]
  addItemToCart: (item: ItemCart) => void
  removeItemToCart: (productId: string) => void
  clearItens: () => void
}

interface CartProviderProps {
  children: React.ReactNode
}

const storageName = 'ignite-shop@1.0.0'

const loadLocalStorage = () => {
  const cart = localStorage.getItem(storageName)

  if (cart) {
    return JSON.parse(cart)
  }

  return []
}

const saveLocalStorage = (cart: ItemCart[]) => {
  localStorage.setItem(storageName, JSON.stringify(cart))
}

export const CartContext = createContext({} as CartContextProps)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ItemCart[]>(loadLocalStorage())

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

  const clearItens = useCallback(() => {
    if (cart.length) {
      setCart([])
    }
  }, [cart])

  useEffect(() => {
    saveLocalStorage(cart)
  }, [cart])

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemToCart, clearItens }}
    >
      {children}
    </CartContext.Provider>
  )
}
