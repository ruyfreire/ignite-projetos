"use client"

import clsx from "clsx"
import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Avatar } from "./Avatar"
import { DialogLogin } from "./DialogLogin"

export function LoginStatus() {
  const session = useSession()
  const router = useRouter()
  const [openModalSignIn, setOpenModalSignIn] = useState(false)

  const isAuthenticated = session.status === "authenticated"
  const name = session?.data?.user?.name || ""
  const avatarUrl = session?.data?.user?.image || "/profile.svg"

  function handleLogout() {
    if (isAuthenticated) {
      signOut({ callbackUrl: "/" })
    } else {
      setOpenModalSignIn(true)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated && <Avatar alt={name} src={avatarUrl} />}

      <span className="text-sm leading-relaxed text-gray-200">
        {isAuthenticated ? name : "Fazer login"}
      </span>

      <button
        className={clsx("text-0 text-danger-400", {
          "text-danger-400": isAuthenticated,
          "text-green-100": !isAuthenticated,
        })}
        title={isAuthenticated ? "Sair" : "Fazer login"}
        onClick={handleLogout}
      >
        <LogOut size={20} />
      </button>

      {openModalSignIn && (
        <DialogLogin onClose={() => setOpenModalSignIn(false)} />
      )}
    </div>
  )
}
