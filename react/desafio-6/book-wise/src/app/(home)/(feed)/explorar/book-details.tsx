"use client"

import { BookDetails } from "@/@types/books"
import { ReviewDetails } from "@/@types/review"
import { Loader } from "@/components/Loader"
import { Rating } from "@/components/Rating"
import { api } from "@/lib/axios"
import { BookOpen, Bookmark, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AboutLabel } from "./components/AboutLabel"
import { Review as ReviewComponent } from "./components/Review"
import { FormReview, WriteReview } from "./components/WriteReview"

interface ReviewDetailsProps {
  bookId: string
}

export function BookDetails({ bookId }: ReviewDetailsProps) {
  const [bookDetails, setBookDetails] = useState<
    BookDetails | null | undefined
  >()

  function onClose() {
    window.history.back()
  }

  async function getBookReviews(bookId: string) {
    try {
      const { data } = await api.get<{ book_details: BookDetails }>(
        `books/${bookId}/details`,
      )

      setBookDetails(data.book_details)
    } catch (error) {
      setBookDetails(null)
      console.error(error)
    }
  }

  async function handleSubmitReview(dataForm: FormReview) {
    try {
      const { data } = await api.post<{
        message: string
        review: ReviewDetails
      }>(`books/${bookId}/write-review`, {
        review: dataForm.review,
        rating: dataForm.rating,
      })

      const newReview = data.review
      setBookDetails((prevBookDetails) => {
        if (!prevBookDetails) return prevBookDetails

        return {
          ...prevBookDetails,
          reviews: [newReview, ...(prevBookDetails?.reviews || [])],
        }
      })

      return ""
    } catch (error: any) {
      console.error(error)
      return error.response.data.message || "Erro ao enviar avaliação"
    }
  }

  useEffect(() => {
    getBookReviews(bookId)
  }, [bookId])

  return (
    <>
      <aside className="modal-opened fixed right-0 top-0 z-20 flex h-screen w-full max-w-[42rem] flex-col overflow-y-auto bg-gray-800 px-12 pt-2">
        <button
          title="Fechar"
          onClick={onClose}
          className="my-4 self-end text-0 text-gray-400 transition-colors hover:text-gray-300"
        >
          <X size={24} />
        </button>

        {bookDetails === undefined && <Loader active />}

        {bookDetails === null && (
          <p>Nenhum dado encontrado para o livro selecionado</p>
        )}

        {bookDetails && (
          <>
            <div className="mb-10 grid grid-cols-[172px,_1fr] gap-x-8 gap-y-10 rounded-lg bg-gray-700 px-8 py-6">
              <Image
                alt={bookDetails.title}
                src={bookDetails.imageUrl}
                width={172}
                height={242}
                className="rounded-lg"
              />

              <div className="flex flex-1 flex-col overflow-hidden">
                <h4
                  className="text-lg font-bold text-gray-100 text-ellipsis-block ellipsis-block-lines-2"
                  title={bookDetails.title}
                >
                  {bookDetails.title}
                </h4>

                <p className="text-sm leading-relaxed text-gray-400">
                  {bookDetails.author}
                </p>

                <Rating rating={bookDetails.rating} className="mb-1 mt-auto" />

                <p className="text-sm leading-relaxed text-gray-400">
                  {bookDetails.ratingCount} avaliações
                </p>
              </div>

              <ul className="col-span-2 flex justify-between border-t-1 border-gray-600 py-6">
                <li className="flex-1">
                  <AboutLabel label="Categoria" icon={Bookmark}>
                    {bookDetails.categories.join(", ")}
                  </AboutLabel>
                </li>

                <li className="flex-1">
                  <AboutLabel label="Páginas" icon={BookOpen}>
                    {bookDetails.pages}
                  </AboutLabel>
                </li>
              </ul>
            </div>

            <WriteReview bookId={bookId} onSubmitReview={handleSubmitReview} />

            <ul className="flex flex-col gap-3 pb-6">
              {bookDetails.reviews &&
                bookDetails.reviews.map((review) => {
                  return (
                    <li key={review.id}>
                      <ReviewComponent review={review} />
                    </li>
                  )
                })}
            </ul>
          </>
        )}
      </aside>

      <div
        onClick={onClose}
        className="fixed inset-0 z-10 bg-black bg-opacity-60"
      />
    </>
  )
}
