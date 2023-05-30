import Image from 'next/image'
import Head from 'next/head'

import Stripe from 'stripe'

import { stripe } from '@/service/stripe'
import { ButtonBuy } from '@/components/ButtonBuy'

interface ProductProps {
  params: {
    id: string
  }
}

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string | null
  description: string
  defaultPriceId: string
}

export const getProduct = async (productId: string): Promise<Product> => {
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    description: product.description || '',
    defaultPriceId: price.id,
    price: price.unit_amount
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100)
      : null,
  }
}

export default async function Product({ params }: ProductProps) {
  const product = await getProduct(params.id)

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <div className="grid grid-cols-2 items-stretch gap-16 max-w-6xl w-full mx-auto">
        <div className="w-full max-w-xl h-96 rounded-lg p-1 flex items-center justify-center bg-gradient-product">
          <Image
            className="object-cover"
            src={product.imageUrl}
            alt=""
            width={520}
            height={480}
            priority
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl text-grayscale-text">{product.name}</h1>

          <span className="mt-4 block text-4xl text-brand-light">
            {product.price}
          </span>

          <p className="mt-10 text-lg text-grayscale-text leading-relaxed">
            {product.description}
          </p>

          <ButtonBuy priceId={product.defaultPriceId}>Comprar agora</ButtonBuy>
        </div>
      </div>
    </>
  )
}
