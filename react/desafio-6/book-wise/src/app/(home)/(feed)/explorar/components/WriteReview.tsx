"use client"

import { Avatar } from "@/components/Avatar"
import { Check, Star, X } from "lucide-react"

import { DialogLogin } from "@/components/DialogLogin"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { useState } from "react"

export function WriteReview() {
  const [requestLogin, setRequestLogin] = useState(false)
  const [formReview, setFormReview] = useState(false)
  const session = useSession()

  const isAuthenticated = session.status === "authenticated"
  const name = session.data?.user?.name || ""
  const avatarUrl = session.data?.user?.image || "/profile.svg"

  function handleEnableReview() {
    if (isAuthenticated) {
      setFormReview(true)
    } else {
      setRequestLogin(true)
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm leading-relaxed text-gray-200">Avaliações</p>

        <button
          onClick={handleEnableReview}
          className={clsx("p-2 font-bold leading-relaxed text-purple-100", {
            invisible: formReview,
          })}
        >
          Avaliar
        </button>
      </div>

      {formReview && (
        <form className="mb-3 flex flex-col rounded-lg bg-gray-700 p-6">
          <div className="mb-6 flex items-center gap-4">
            <Avatar src={avatarUrl} alt={name} />

            <strong className="flex-1">{name}</strong>

            <div className="flex gap-1 text-purple-100">
              <button className="text-0" title="1">
                <Star size={28} />
              </button>
              <button className="text-0" title="2">
                <Star size={28} />
              </button>
              <button className="text-0" title="3">
                <Star size={28} />
              </button>
              <button className="text-0" title="4">
                <Star size={28} />
              </button>
              <button className="text-0" title="5">
                <Star size={28} />
              </button>
            </div>
          </div>

          <label className="relative block">
            <textarea
              placeholder="Escreva sua avaliação"
              maxLength={450}
              className="min-h-[6.25rem] w-full rounded-md border-2 border-gray-500 bg-gray-800 p-5 text-sm leading-relaxed text-gray-200 outline-none placeholder:text-sm placeholder:text-gray-400 focus:border-green-200"
            />

            <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-gray-400">
              0/450
            </span>
          </label>

          <div className="mt-3 flex justify-end gap-2">
            <button
              title="Cancelar"
              onClick={() => setFormReview(false)}
              className="rounded bg-gray-600 p-2 text-0 text-purple-100 hover:bg-gray-500"
            >
              <X size={24} />
            </button>
            <button
              title="Salvar"
              className="rounded bg-gray-600 p-2 text-0 text-green-100 hover:bg-gray-500"
            >
              <Check size={24} />
            </button>
          </div>
        </form>
      )}

      {requestLogin && <DialogLogin onClose={() => setRequestLogin(false)} />}
    </>
  )
}
