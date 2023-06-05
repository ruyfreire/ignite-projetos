import { Metadata } from 'next'
import Image from 'next/image'

import Stripe from 'stripe'

import { stripe } from '@/service/stripe'
import { ButtonBuy } from '@/components/ButtonBuy'
import { Product } from '@/types/Product'
import { formatCurrency } from '@/utils/formatValue'

interface ProductProps {
  params: {
    id: string
  }
}

interface ProductDetail extends Product {
  description: string
}

const getProduct = async (productId: string): Promise<ProductDetail> => {
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
    price: price.unit_amount ? price.unit_amount / 100 : 0,
  }
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product.name,
  }
}

export default async function Product({ params }: ProductProps) {
  const product = await getProduct(params.id)

  return (
    <div className="grid grid-cols-2 items-stretch gap-16 max-w-6xl w-full mx-auto">
      <div className="w-full max-w-xl h-96 rounded-lg p-1 flex items-center justify-center bg-gradient-product">
        <Image
          className="object-cover h-96 w-auto"
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
          {formatCurrency(product.price)}
        </span>

        <p className="mt-10 text-lg text-grayscale-text leading-relaxed">
          {product.description}
        </p>

        <ButtonBuy product={product}>Comprar agora</ButtonBuy>
      </div>
    </div>
  )
}
