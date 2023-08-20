"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function LinkReturn() {
  const router = useRouter()

  return (
    <Link
      href="#"
      className="inline-flex items-center gap-3 font-bold leading-relaxed text-gray-100"
      onClick={() => router.back()}
    >
      <ChevronLeft size={20} />
      Voltar
    </Link>
  )
}
