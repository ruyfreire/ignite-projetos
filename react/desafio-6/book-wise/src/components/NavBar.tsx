"use client"

import { usePathname } from "next/navigation"

import { Glasses, LineChart, User2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { LoginStatus } from "./LoginStatus"
import { NavLink } from "./NavLink"

const links = [
  {
    href: "/inicio",
    icon: LineChart,
    name: "Início",
    private: false,
  },
  {
    href: "/explorar",
    icon: Glasses,
    name: "Explorar",
    private: false,
  },
  {
    href: "/perfil",
    icon: User2,
    name: "Perfil",
    private: true,
  },
]

export function NavBar() {
  const pathname = usePathname()
  const session = useSession()

  const isAuthenticated = session.status === "authenticated"

  return (
    <div className="relative">
      <div className="fixed bottom-5 top-5 flex w-[14.5rem] flex-col items-center rounded-xl bg-gray-800 bg-gradient-dark-vertical p-6 backdrop-blur-3xl backdrop-opacity-50">
        <Image src="/logo.svg" alt="" width={128} height={32} priority />

        <nav className="mt-16 flex flex-1 flex-col gap-4">
          {links.map((route) => {
            if (route.private && !isAuthenticated) return null

            return (
              <NavLink
                key={route.href}
                href={route.href}
                icon={route.icon}
                active={pathname === route.href}
              >
                {route.name}
              </NavLink>
            )
          })}
        </nav>

        <LoginStatus />
      </div>
    </div>
  )
}
