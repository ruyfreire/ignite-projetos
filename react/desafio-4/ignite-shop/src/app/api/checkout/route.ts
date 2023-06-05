import { NextResponse } from 'next/server'

import { stripe } from '@/service/stripe'
import { ProductCheckout } from '@/types/Product'

export async function POST(req: Request) {
  const { productsCheckout } = (await req.json()) as {
    productsCheckout: ProductCheckout[]
  }

  if (!productsCheckout || productsCheckout.length === 0) {
    return NextResponse.json(
      { error: 'Product checkout is required' },
      { status: 400 }
    )
  }

  const successUrl = `${process.env.VERCEL_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.VERCEL_URL}/`

  const lineItems = productsCheckout.map((product) => ({
    price: product.priceId,
    quantity: product.quantity,
  }))

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })

  return NextResponse.json(
    { checkoutUrl: checkoutSession.url },
    { status: 201 }
  )
}
