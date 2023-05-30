import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Stripe from 'stripe'
import 'keen-slider/keen-slider.min.css'

import KeepContainer from '@/components/KeepContainer'
import { stripe } from '@/service/stripe'

export const metadata: Metadata = {
  title: 'Home | Ignite Shop',
}

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string | null
}

const getProducts = async (): Promise<Product[]> => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount
        ? new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price.unit_amount / 100)
        : null,
    }
  })

  return products
}

export default async function Home() {
  const products = await getProducts()

  return (
    <KeepContainer>
      {products.map((product) => (
        <Link
          className="keen-slider__slide"
          key={product.id}
          href={`/product/${product.id}`}
          prefetch={false}
        >
          <div className="group rounded-lg p-1 cursor-pointer relative overflow-hidden flex items-center justify-center bg-gradient-product">
            <Image
              className="h-auto object-cover"
              src={product.imageUrl}
              width={520}
              height={480}
              alt=""
              priority
            />

            <footer className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between bg-black bg-opacity-60 translate-y-28 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <strong className="text-xl text-grayscale-title">
                {product.name}
              </strong>
              <span className="text-2xl font-bold text-brand-light">
                {product.price}
              </span>
            </footer>
          </div>
        </Link>
      ))}
    </KeepContainer>
  )
}
