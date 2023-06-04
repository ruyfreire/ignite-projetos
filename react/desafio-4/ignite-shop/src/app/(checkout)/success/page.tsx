import Link from 'next/link'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Stripe from 'stripe'

import { stripe } from '@/service/stripe'
import { CheckoutContainer } from './components/CheckoutContainer'

export const metadata: Metadata = {
  title: 'Compra efetuada | Ignite Shop',
}

interface SuccessProps {
  searchParams: {
    session_id: string
  }
}

interface Checkout {
  customerName: string
  products: {
    name: string
    imageUrl: string
  }[]
}

const getCheckoutSession = async (sessionId: string): Promise<Checkout> => {
  if (!sessionId) {
    redirect('/')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products =
    session.line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product

      return {
        name: product.name,
        imageUrl: product.images[0],
      }
    }) || []

  return {
    customerName: customerName || '',
    products,
  }
}

export default async function Success({ searchParams }: SuccessProps) {
  const { products, customerName } = await getCheckoutSession(
    searchParams.session_id
  )

  const textItens =
    products.length > 1 ? `${products.length} camisetas` : '1 camiseta'

  return (
    <CheckoutContainer>
      <div className="flex">
        {products.map((product, index) => (
          <div
            key={product.name}
            className={
              'w-36 h-36 rounded-full p-1 flex align-center justify-center bg-gradient-product shadow-[0px_0px_60px_rgba(0,0,0,0.8)]' +
              (index > 0 ? ' -ml-14' : '')
            }
          >
            <Image
              className="object-cover"
              src={product.imageUrl}
              title={product.name}
              alt=""
              width={120}
              height={110}
              priority
            />
          </div>
        ))}
      </div>

      <h1 className="text-4xl text-grayscale-title font-bold mt-12">
        Compra efetuada!
      </h1>

      <p className="text-2xl leading-relaxed text-grayscale-text mt-6 max-w-lg text-center">
        Uhuul <strong>{customerName}</strong>, sua compra de {textItens} já está
        a caminho da sua casa.
      </p>

      <Link
        href="/"
        className="text-lg font-bold text-brand-principal no-underline mt-16 hover:text-brand-light"
      >
        Voltar ao catálogo
      </Link>
    </CheckoutContainer>
  )
}
