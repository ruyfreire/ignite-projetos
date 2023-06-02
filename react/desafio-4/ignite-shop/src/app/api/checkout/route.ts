import { NextResponse } from 'next/server'

import { stripe } from '@/service/stripe'

export async function POST(req: Request) {
  const { priceId } = (await req.json()) as { priceId: string }

  if (!priceId) {
    return NextResponse.json({ error: 'PriceId is required' }, { status: 400 })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return NextResponse.json(
    { checkoutUrl: checkoutSession.url },
    { status: 201 }
  )
}
