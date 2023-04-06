import { ReactNode, createContext, useContext, useReducer } from 'react'

import { cartReducer, initialState, Item, cartActions } from '../reducers/cart'

export interface AddCoffee {
  id: number
  name: string
  quantity: number
  unit_value: number
}

interface CartContextProps {
  cart: Item[]
  addItemCart: (item: AddCoffee) => void
}

const CartContext = createContext({} as CartContextProps)

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState)

  const { cart } = cartState

  const addItemCart = (newCoffee: AddCoffee) => {
    const addCartItem: Item = {
      id: newCoffee.id,
      name: newCoffee.name,
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

  return (
    <CartContext.Provider value={{ cart, addItemCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
