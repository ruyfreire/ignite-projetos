/* eslint-disable no-unused-vars */
export interface CoffeeItem {
  id: number
  name: string
  image_url: string
  quantity: number
  unit_value: number
  total_value: number
}

interface Card {
  number: number
  validate: Date
  cvv: string
  name: string
  cpf: string
}

export enum PaymentTypes {
  credit_card = 'Cartão de Crédito',
  debit_card = 'Cartão de Débito',
  money = 'Dinheiro',
}

export interface Payment {
  type: PaymentTypes
  bank_card?: Card
}

export interface Address {
  zipcode: string
  street: string
  number: number
  complement?: string
  neighborhood: string
  city: string
  uf: string
}

export interface CartState {
  coffees: CoffeeItem[]
  address?: Address
  payment?: Payment
}

export const initialState: CartState = {
  coffees: [],
  address: undefined,
  payment: undefined,
}

enum CartTypes {
  ADD_COFFEE = 'ADD_COFFEE',
  UPDATE_COFFEE = 'UPDATE_COFFEE',
  REMOVE_COFFEE = 'REMOVE_COFFEE',
  ADD_ADDRESS = 'ADD_ADDRESS',
  ADD_PAYMENT = 'ADD_PAYMENT',
  CLEAR_COFFEES = 'CLEAR_COFFEES',
}

export const cartActions = {
  addCoffee: (payload: CoffeeItem) => {
    return {
      type: CartTypes.ADD_COFFEE,
      payload,
    }
  },
  updateCoffee: (payload: CoffeeItem) => {
    return {
      type: CartTypes.UPDATE_COFFEE,
      payload,
    }
  },
  removeCoffee: (payload: number) => {
    return {
      type: CartTypes.REMOVE_COFFEE,
      payload,
    }
  },
  addAddress: (payload: Address) => {
    return {
      type: CartTypes.ADD_ADDRESS,
      payload,
    }
  },
  addPayment: (payload: Payment) => {
    return {
      type: CartTypes.ADD_PAYMENT,
      payload,
    }
  },
  clearCoffees: () => {
    return {
      type: CartTypes.CLEAR_COFFEES,
    }
  },
}

export const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case CartTypes.ADD_COFFEE: {
      const newCoffee = action.payload as CoffeeItem

      return {
        ...state,
        coffees: [...state.coffees, newCoffee],
      }
    }

    case CartTypes.UPDATE_COFFEE: {
      const updateCoffee = action.payload as CoffeeItem

      const newListCoffee = state.coffees.map((current) => {
        if (current.id === updateCoffee.id) {
          return updateCoffee
        }

        return current
      })

      return {
        ...state,
        coffees: newListCoffee,
      }
    }

    case CartTypes.REMOVE_COFFEE: {
      const id = action.payload as number
      const newCart = state.coffees.filter((item) => item.id !== id)

      return {
        ...state,
        coffees: newCart,
      }
    }

    case CartTypes.ADD_ADDRESS: {
      const address = action.payload as Address

      return {
        ...state,
        address,
      }
    }

    case CartTypes.ADD_PAYMENT: {
      const payment = action.payload as Payment

      return {
        ...state,
        payment,
      }
    }

    case CartTypes.CLEAR_COFFEES: {
      return {
        ...state,
        coffees: [],
      }
    }

    default: {
      return state
    }
  }
}
