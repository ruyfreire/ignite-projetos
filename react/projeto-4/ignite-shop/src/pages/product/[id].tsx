import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import axios from 'axios'

import { stripe } from '@/service/stripe'

import { ImageContainer, ProductContainer, ProductDetails } from './styles'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string | null
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckout(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckout(false)
      alert('Error ao redirecionar para o checkout')
    }
  }

  if (isFallback) return <p>Loading...</p>

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt=""
          width={520}
          height={480}
          priority
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>

        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckout} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        defaultPriceId: price.id,
        price: price.unit_amount
          ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price.unit_amount / 100)
          : null,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
