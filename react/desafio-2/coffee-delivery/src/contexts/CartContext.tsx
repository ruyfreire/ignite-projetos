import { ReactNode, createContext, useContext, useReducer } from 'react'

import { cartReducer, initialState, Item, cartActions } from '../reducers/cart'

export interface ItemCoffee {
  id: number
  name: string
  image_url: string
  quantity: number
  unit_value: number
}

interface CartContextProps {
  cart: Item[]
  addItemCart: (item: ItemCoffee) => void
  updateItemCart: (item: ItemCoffee) => void
}

const CartContext = createContext({} as CartContextProps)

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState)

  const { cart } = cartState

  const addItemCart = (newCoffee: ItemCoffee) => {
    const addCartItem: Item = {
      id: newCoffee.id,
      name: newCoffee.name,
      image_url: newCoffee.image_url,
      quantity: newCoffee.quantity,
      unit_value: newCoffee.unit_value,
      total_value: Number(
        (newCoffee.quantity * newCoffee.unit_value).toFixed(2),
      ),
    }

    const hasItem = cartState.cart.find((item) => item.id === addCartItem.id)
    if (hasItem) {
      addCartItem.quantity = Number(
        (addCartItem.quantity + hasItem.quantity).toFixed(2),
      )
      addCartItem.total_value = Number(
        (addCartItem.total_value + hasItem.total_value).toFixed(2),
      )

      dispatch(cartActions.updateItem(addCartItem))
    } else {
      dispatch(cartActions.addItem(addCartItem))
    }
  }

  const updateItemCart = (updateCoffee: ItemCoffee) => {
    const updateCartItem: Item = {
      id: updateCoffee.id,
      name: updateCoffee.name,
      image_url: updateCoffee.image_url,
      quantity: updateCoffee.quantity,
      unit_value: updateCoffee.unit_value,
      total_value: Number(
        (updateCoffee.quantity * updateCoffee.unit_value).toFixed(2),
      ),
    }

    const hasItem = cartState.cart.find((item) => item.id === updateCartItem.id)
    if (hasItem) {
      dispatch(cartActions.updateItem(updateCartItem))
    }
  }

  return (
    <CartContext.Provider value={{ cart, addItemCart, updateItemCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
