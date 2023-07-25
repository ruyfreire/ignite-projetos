"use client"

import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface SocialButtonProps {
  icon?: string
  children: string
  signInType: "github" | "google" | "visitant"
  redirectUrl?: string
}

export function SocialButton({
  icon,
  children,
  signInType,
  redirectUrl,
}: SocialButtonProps) {
  const router = useRouter()
  const session = useSession()

  async function handleSignIn() {
    if (signInType === "visitant" || session.status === "authenticated") {
      return router.push("/inicio")
    }

    signIn(signInType, { callbackUrl: redirectUrl || "/inicio" })
  }

  return (
    <button
      className="flex items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500"
      onClick={handleSignIn}
    >
      {icon && <Image src={icon} alt="" />}

      <span className="text-lg font-bold leading-relaxed text-gray-200">
        {children}
      </span>
    </button>
  )
}
