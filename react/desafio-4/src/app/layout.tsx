import Image from 'next/image'
import { Roboto } from 'next/font/google'

import Logo from '@/assets/logo.svg'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Ignite Shop',
  description: 'E-commerce ignite shop desafio 4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} bg-grayscale-background text-grayscale-title`}
      >
        <div className="flex flex-col items-start justify-center min-h-screen">
          <header className="w-full py-8 mx-auto max-w-6xl">
            <Image src={Logo} alt="" priority />
          </header>

          {children}
        </div>
      </body>
    </html>
  )
}
