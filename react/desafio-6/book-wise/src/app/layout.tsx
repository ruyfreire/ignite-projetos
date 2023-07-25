import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { AuthSessionProvider } from "@/contexts/AuthSessionContext"
import "@/styles/globals.css"
import clsx from "clsx"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Nunito_Sans } from "next/font/google"

const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Book Wise - Ruy Freire",
  description: "Projeto 6 do curso de ignite",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body
        className={clsx(
          nunito.className,
          "has-class-[modal-opened]:overflow-hidden",
        )}
      >
        <AuthSessionProvider session={session}>
          <div className="bg-gray-800">{children}</div>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
