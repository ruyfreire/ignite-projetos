"use client"

import { usePathname, useRouter } from "next/navigation"

import { Glasses, LineChart, LogOut, User2 } from "lucide-react"
import Image from "next/image"
import { Avatar } from "./Avatar"
import { NavLink } from "./NavLink"

const routes = [
  {
    href: "/inicio",
    icon: LineChart,
    name: "Início",
  },
  {
    href: "/explorar",
    icon: Glasses,
    name: "Explorar",
  },
  {
    href: "/perfil",
    icon: User2,
    name: "Perfil",
  },
]

export function NavBar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="relative">
      <div className="fixed bottom-5 top-5 flex w-[14.5rem] flex-col items-center rounded-xl bg-gray-800 bg-gradient-dark-vertical p-6 backdrop-blur-3xl backdrop-opacity-50">
        <Image src="/logo.svg" alt="" width={128} height={32} priority />

        <nav className="mt-16 flex flex-1 flex-col gap-4">
          {routes.map((route) => {
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

        <div className="flex items-center gap-3">
          <Avatar alt="Ruy Freire" src="https://github.com/ruyfreire.png" />

          <span className="text-sm leading-relaxed text-gray-200">
            Ruy Freire
          </span>

          <button
            className="text-0 text-danger-400"
            title="Sair"
            onClick={() => router.push("/")}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
