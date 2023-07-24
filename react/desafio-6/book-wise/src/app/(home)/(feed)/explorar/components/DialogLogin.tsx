"use client"

import IconGithubLogo from "@/assets/icons/github-logo.svg"
import IconGoogleLogo from "@/assets/icons/google-logo.svg"
import { SocialButton } from "@/components/SocialButton"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

export function DialogLogin() {
  return (
    <>
      {createPortal(
        <div className="modal-opened fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-60">
          <dialog
            open
            className="relative w-full max-w-lg rounded-xl bg-gray-700 p-14 shadow-base"
          >
            <button
              title="Fechar"
              className="absolute right-4 top-4 text-0 text-gray-400 transition-colors hover:text-gray-300"
            >
              <X size={24} />
            </button>

            <h2 className="mb-10 text-center font-bold text-gray-200">
              Faça login para deixar sua avaliação
            </h2>

            <div className="flex flex-col gap-4">
              <SocialButton icon={IconGoogleLogo}>
                Entrar com Google
              </SocialButton>

              <SocialButton icon={IconGithubLogo}>
                Entrar com Github
              </SocialButton>
            </div>
          </dialog>
        </div>,
        document.body,
      )}
    </>
  )
}
