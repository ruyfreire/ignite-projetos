import "@/styles/globals.css"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700"] })

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
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
