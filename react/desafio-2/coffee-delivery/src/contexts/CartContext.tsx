import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'

import {
  cartReducer,
  initialState,
  CoffeeItem,
  cartActions,
  Payment,
  Address,
} from '../reducers/cart'

export interface ItemCoffee {
  id: number
  name: string
  image_url: string
  quantity: number
  unit_value: number
}

interface CartContextProps {
  coffees: CoffeeItem[]
  address?: Address
  payment?: Payment
  addItemCart: (item: ItemCoffee) => void
  updateItemCart: (item: ItemCoffee) => void
  removeItem: (id: number) => void
  addAddress: (address: Address) => void
  addPayment: (payment: Payment) => void
  clearCoffees: () => void
}

const CartContext = createContext({} as CartContextProps)

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    initialState,
    (state) => {
      const storageState = sessionStorage.getItem(
        '@coffee-delivery-1.0.0:cart-state',
      )

      if (storageState) {
        return JSON.parse(storageState)
      }

      return state
    },
  )

  const { coffees, address, payment } = cartState

  const addItemCart = (newCoffee: ItemCoffee) => {
    const addCoffeeItem: CoffeeItem = {
      id: newCoffee.id,
      name: newCoffee.name,
      image_url: newCoffee.image_url,
      quantity: newCoffee.quantity,
      unit_value: newCoffee.unit_value,
      total_value: Number(
        (newCoffee.quantity * newCoffee.unit_value).toFixed(2),
      ),
    }

    const hasItem = coffees.find((item) => item.id === addCoffeeItem.id)
    if (hasItem) {
      addCoffeeItem.quantity = Number(
        (addCoffeeItem.quantity + hasItem.quantity).toFixed(2),
      )
      addCoffeeItem.total_value = Number(
        (addCoffeeItem.total_value + hasItem.total_value).toFixed(2),
      )

      dispatch(cartActions.updateCoffee(addCoffeeItem))
    } else {
      dispatch(cartActions.addCoffee(addCoffeeItem))
    }
  }

  const updateItemCart = (updateCoffee: ItemCoffee) => {
    const updateCoffeeItem: CoffeeItem = {
      id: updateCoffee.id,
      name: updateCoffee.name,
      image_url: updateCoffee.image_url,
      quantity: updateCoffee.quantity,
      unit_value: updateCoffee.unit_value,
      total_value: Number(
        (updateCoffee.quantity * updateCoffee.unit_value).toFixed(2),
      ),
    }

    const hasItem = coffees.find((item) => item.id === updateCoffeeItem.id)
    if (hasItem) {
      dispatch(cartActions.updateCoffee(updateCoffeeItem))
    }
  }

  const removeItem = (id: number) => {
    const hasItem = coffees.find((item) => item.id === id)

    if (hasItem) {
      dispatch(cartActions.removeCoffee(id))
    }
  }

  const addAddress = (address: Address) => {
    dispatch(cartActions.addAddress(address))
  }

  const addPayment = (payment: Payment) => {
    dispatch(cartActions.addPayment(payment))
  }

  const clearCoffees = () => {
    dispatch(cartActions.clearCoffees())
  }

  useEffect(() => {
    sessionStorage.setItem(
      '@coffee-delivery-1.0.0:cart-state',
      JSON.stringify(cartState),
    )
  }, [cartState])

  return (
    <CartContext.Provider
      value={{
        coffees,
        address,
        payment,
        addItemCart,
        updateItemCart,
        removeItem,
        addAddress,
        addPayment,
        clearCoffees,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
