import Link from 'next/link'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Stripe from 'stripe'

import { stripe } from '@/service/stripe'

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
  product: {
    name: string
    imageUrl: string
  }
}

const getCheckoutSession = async (sessionId: string): Promise<Checkout> => {
  if (!sessionId) {
    redirect('/')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    customerName: customerName || '',
    product: {
      name: product.name,
      imageUrl: product.images[0],
    },
  }
}

export default async function Success({ searchParams }: SuccessProps) {
  const { product, customerName } = await getCheckoutSession(
    searchParams.session_id
  )

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-grayscale-title font-bold">
        Compra efetuada!
      </h1>

      <div className="w-full max-w-[8rem] h-40 rounded-lg p-1 mt-16 flex align-center justify-center bg-gradient-product">
        <Image
          className="object-cover"
          src={product.imageUrl}
          alt=""
          width={120}
          height={110}
          priority
        />
      </div>

      <p className="text-2xl leading-relaxed text-grayscale-text mt-8 max-w-lg text-center">
        Uhuul <strong>{customerName}</strong>, sua{' '}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link
        href="/"
        className="text-lg font-bold text-brand-principal no-underline mt-16 hover:text-brand-light"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}
