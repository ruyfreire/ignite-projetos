/* eslint-disable no-unused-vars */
export interface Item {
  id: number
  name: string
  quantity: number
  unit_value: number
  total_value: number
}

export interface CartState {
  cart: Item[]
}

export const initialState: CartState = {
  cart: [],
}

enum CartTypes {
  ADD_ITEM = 'ADD_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
}

export const cartActions = {
  addItem: (payload: Item) => {
    return {
      type: CartTypes.ADD_ITEM,
      payload,
    }
  },
  updateItem: (payload: Item) => {
    return {
      type: CartTypes.UPDATE_ITEM,
      payload,
    }
  },
}

export const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case CartTypes.ADD_ITEM: {
      const newCoffee = action.payload as Item

      return {
        ...state,
        cart: [...state.cart, newCoffee],
      }
    }

    case CartTypes.UPDATE_ITEM: {
      const updateCoffee = action.payload as Item

      const newListCoffee = state.cart.map((current) => {
        if (current.id === updateCoffee.id) {
          return updateCoffee
        }

        return current
      })

      return {
        ...state,
        cart: newListCoffee,
      }
    }

    default: {
      return state
    }
  }
}
