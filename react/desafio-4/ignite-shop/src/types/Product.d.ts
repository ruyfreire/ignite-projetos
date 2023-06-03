export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  defaultPriceId: string
}

export interface ProductCheckout {
  priceId: string
  quantity: number
}
