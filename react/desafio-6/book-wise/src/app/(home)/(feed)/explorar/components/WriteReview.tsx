"use client"

import { Avatar } from "@/components/Avatar"
import { Check, Loader2, Star, X } from "lucide-react"

import { DialogLogin } from "@/components/DialogLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  review: z
    .string()
    .min(3, { message: "Digite ao menos 3 caracteres" })
    .max(450, { message: "O limite é de 450 caracteres" })
    .regex(new RegExp(/^[^<>&/*\\]+$/), {
      message: "Remover caracteres inválidos (<, >, &, /, *, \\)",
    }),
  rating: z.number().min(1).max(5),
})

export type FormReview = z.infer<typeof formSchema>

interface WriteReviewProps {
  bookId: string
  onSubmitReview: (dataForm: FormReview) => Promise<string>
}

export function WriteReview({ bookId, onSubmitReview }: WriteReviewProps) {
  const [requestLogin, setRequestLogin] = useState(false)
  const [formReview, setFormReview] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const session = useSession()
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<FormReview>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  })

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

  async function handleSubmitReview(dataForm: FormReview) {
    const errorMessage = await onSubmitReview(dataForm)
    if (errorMessage) {
      setSubmitError(errorMessage)
    } else {
      reset()
      setFormReview(false)
    }
  }

  function handleCancelReview() {
    clearErrors()
    setFormReview(false)
  }

  const { rating, review } = watch()

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
        <>
          <form
            className="mb-3 flex flex-col rounded-lg bg-gray-700 p-6"
            onSubmit={handleSubmit(handleSubmitReview)}
          >
            <div className="mb-6 flex items-center gap-4">
              <Avatar src={avatarUrl} alt={name} />

              <strong className="flex-1">{name}</strong>

              <div>
                <div className="flex gap-1 text-purple-100">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const number = index + 1

                    return (
                      <button
                        key={number}
                        type="button"
                        className="text-0"
                        title={String(number)}
                        onClick={() => {
                          setValue("rating", number, { shouldValidate: true })
                        }}
                      >
                        <Star
                          size={28}
                          className={clsx("text-purple-100", {
                            "fill-purple-100": number <= Number(rating),
                          })}
                        />
                      </button>
                    )
                  })}
                </div>

                {errors.rating && (
                  <span className="text-xs text-red-400">
                    Coloque a nota da avaliação
                  </span>
                )}
              </div>
            </div>

            <label className="relative block">
              <textarea
                placeholder="Escreva sua avaliação"
                className="min-h-[6.25rem] w-full rounded-md border-2 border-gray-500 bg-gray-800 p-5 text-sm leading-relaxed text-gray-200 outline-none placeholder:text-sm placeholder:text-gray-400 focus:border-green-200"
                {...register("review")}
              />

              <span
                className={clsx(
                  "pointer-events-none absolute bottom-3 right-3 text-xs",
                  {
                    "text-red-400": review.length > 450,
                    "text-gray-400": review.length <= 450,
                  },
                )}
              >
                {review.length}/450
              </span>
            </label>
            {errors.review && (
              <span className="text-xs text-red-400">
                {errors.review.message}
              </span>
            )}

            <div className="mt-3 flex justify-end gap-2">
              <button
                title="Cancelar"
                onClick={handleCancelReview}
                className="rounded bg-gray-600 p-2 text-0 text-purple-100 hover:bg-gray-500"
              >
                <X size={24} />
              </button>

              <button
                type="submit"
                title="Salvar"
                disabled={isSubmitting}
                className={clsx(
                  "rounded bg-gray-600 p-2 text-0 text-green-100",
                  {
                    "cursor-not-allowed opacity-50": isSubmitting,
                    "hover:bg-gray-500": !isSubmitting,
                  },
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <Check size={24} />
                )}
              </button>
            </div>
          </form>

          {submitError && (
            <span className="text-xs text-red-400">{submitError}</span>
          )}
        </>
      )}

      {requestLogin && <DialogLogin onClose={() => setRequestLogin(false)} />}
    </>
  )
}
