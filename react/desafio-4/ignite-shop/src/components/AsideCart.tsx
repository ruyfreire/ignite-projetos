'use client'

import { useContext, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

import { CartContext } from '@/contexts/CartContext'
import { ProductCheckout } from '@/types/Product'
import { formatCurrency } from '@/utils/formatValue'

interface AsideCartProps {
  onClose: () => void
}

export default function AsideCart({ onClose }: AsideCartProps) {
  const { cart, removeItemToCart } = useContext(CartContext)
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)
  const [open, setOpen] = useState(true)

  const handleRemoveItem = (productId: string) => {
    const hasItem = cart.find(({ product }) => product.id === productId)

    removeItemToCart(productId)

    if (hasItem && cart.length === 1) {
      onClose()
    }
  }

  const handleCheckout = async () => {
    try {
      setIsCreatingCheckout(true)

      const productsCheckout: ProductCheckout[] = cart.map(
        ({ product, quantity }) => ({
          priceId: product.defaultPriceId,
          quantity,
        })
      )

      const response = await axios.post('/api/checkout', {
        productsCheckout,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckout(false)
      alert('Error ao redirecionar para o checkout')
    }
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(onClose, 450)
  }

  const resumeQuantity = cart.length > 1 ? `${cart.length} itens` : '1 item'
  const totalValue = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  )

  return (
    <>
      <aside
        data-state={open ? 'open' : 'closed'}
        className="fixed top-0 right-0 h-screen z-50 bg-grayscale-elements p-6 flex flex-col min-w-[30%] data-[state=open]:animate-slide-left data-[state=closed]:animate-slide-left-reverse"
      >
        <button
          title="Fechar"
          onClick={handleClose}
          className="text-none text-grayscale-icon block ml-auto p-1 transition-colors hover:text-brand-light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
          </svg>
        </button>

        <main className="px-6 flex-1 flex flex-col overflow-hidden">
          <h1 className="mt-6 text-grayscale-title font-bold text-xl leading-relaxed">
            Sacola de compras
          </h1>

          <ul className="mt-8 flex-1 flex flex-col gap-6 overflow-auto">
            {cart.map(({ product, quantity }) => (
              <li className="flex gap-5" key={product.id}>
                <div className="w-28 h-28 p-1 rounded-lg bg-gradient-product flex items-center justify-center">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={100}
                    height={100}
                    className="h-24 w-auto"
                  />
                </div>

                <div className="flex-1 flex flex-col items-start">
                  <p className="text-lg leading-relaxed text-grayscale-text">
                    {product.name}
                  </p>

                  <strong className="text-lg leading-relaxed text-grayscale-title">
                    {formatCurrency(product.price * quantity)}
                  </strong>

                  <button
                    onClick={() => handleRemoveItem(product.id)}
                    className="font-bold text-base leading-relaxed text-brand-principal mt-auto transition-colors hover:text-brand-light"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="flex justify-between mb-1">
              <span className="text-base leading-relaxed text-grayscale-title">
                Quantidade
              </span>
              <span className="text-lg leading-relaxed text-grayscale-text">
                {resumeQuantity}
              </span>
            </p>

            <p className="flex justify-between">
              <strong className="text-lg leading-relaxed text-grayscale-title">
                Valor total
              </strong>
              <strong className="text-2xl leading-snug text-grayscale-title">
                {formatCurrency(totalValue)}
              </strong>
            </p>
          </div>

          <button
            disabled={isCreatingCheckout}
            onClick={handleCheckout}
            className="mt-14 bg-brand-principal flex items-center justify-center rounded-lg p-4 font-bold text-lg leading-relaxed text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-80"
          >
            Finalizar compra
          </button>
        </main>
      </aside>

      <div
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-grayscale-elements opacity-50"
      />
    </>
  )
}
