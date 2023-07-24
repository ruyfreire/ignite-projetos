import "@/styles/globals.css"
import clsx from "clsx"
import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"

const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Book Wise - Ruy Freire",
  description: "Projeto 6 do curso de ignite",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={clsx(
          nunito.className,
          "has-class-[modal-opened]:overflow-hidden",
        )}
      >
        <div className="bg-gray-800">{children}</div>
      </body>
    </html>
  )
}
