"use client"

import IconGithubLogo from "@/assets/icons/github-logo.svg"
import IconGoogleLogo from "@/assets/icons/google-logo.svg"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { SocialButton } from "./SocialButton"

interface DialogLoginProps {
  onClose: () => void
}

export function DialogLogin({ onClose }: DialogLoginProps) {
  const pathname = usePathname()

  return (
    <>
      {createPortal(
        <>
          <dialog
            open
            className="fixed left-1/2 top-1/2 z-40 m-0 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-gray-700 p-14 shadow-base"
          >
            <button
              title="Fechar"
              onClick={onClose}
              className="absolute right-4 top-4 text-0 text-gray-400 transition-colors hover:text-gray-300"
            >
              <X size={24} />
            </button>

            <h2 className="mb-10 text-center font-bold text-gray-200">
              Faça login para continuar
            </h2>

            <div className="flex flex-col gap-4">
              <SocialButton
                signInType="google"
                redirectUrl={pathname}
                icon={IconGoogleLogo}
              >
                Entrar com Google
              </SocialButton>

              <SocialButton
                signInType="github"
                redirectUrl={pathname}
                icon={IconGithubLogo}
              >
                Entrar com Github
              </SocialButton>
            </div>
          </dialog>

          <div
            onClick={onClose}
            className="modal-opened fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60"
          />
        </>,
        document.body,
      )}
    </>
  )
}
