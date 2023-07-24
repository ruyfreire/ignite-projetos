"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface SocialButtonProps {
  icon?: string
  children: string
}

export function SocialButton({ icon, children }: SocialButtonProps) {
  const router = useRouter()

  return (
    <button
      className="flex items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500"
      onClick={() => router.push("/inicio")}
    >
      {icon && <Image src={icon} alt="" />}

      <span className="text-lg font-bold leading-relaxed text-gray-200">
        {children}
      </span>
    </button>
  )
}
