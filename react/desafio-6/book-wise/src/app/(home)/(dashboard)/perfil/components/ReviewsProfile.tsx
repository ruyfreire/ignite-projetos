"use client"

import { LastReview } from "@/@types/review"
import { Input } from "@/components/Input"
import { Loader } from "@/components/Loader"
import { Rating } from "@/components/Rating"
import { api } from "@/lib/axios"
import { getFormattedDate } from "@/utils/date"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"

interface ReviewsProfileProps {
  userId: string
  reviews: LastReview[] | null
}

export default function ReviewsProfile({
  userId,
  reviews,
}: ReviewsProfileProps) {
  const debounceSearch = useRef<NodeJS.Timeout>()

  const [lastReviews, setLastReviews] = useState<LastReview[] | null>(reviews)

  const searchBooks = useCallback(
    async function (search: string = "") {
      try {
        const { data } = await api.get<{ last_reviews: LastReview[] }>(
          `reviews/${userId}`,
          { params: { limit: 5, search } },
        )

        setLastReviews(data.last_reviews || [])
      } catch (error) {
        setLastReviews([])
        console.error(error)
      }
    },
    [userId],
  )

  function handleSearchBook(event: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(debounceSearch.current)

    debounceSearch.current = setTimeout(() => {
      const { value } = event.target
      searchBooks(value)
    }, 500)
  }

  return (
    <main className="flex flex-col gap-6">
      <Input
        className="mb-2"
        onChange={handleSearchBook}
        placeholder="Buscar livro avaliado"
      />

      {lastReviews === null ? (
        <Loader active />
      ) : lastReviews.length === 0 ? (
        <p className="text-center">Nenhuma avaliação feita pelo usuário</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {lastReviews.map((review) => {
            const { formattedDate, utcDate } = getFormattedDate(
              review.created_at,
            )

            return (
              <li key={review.id}>
                <div>
                  <time
                    title={utcDate}
                    dateTime={review.created_at}
                    className="mb-2 block text-sm leading-relaxed text-gray-300"
                  >
                    {formattedDate}
                  </time>

                  <div className="grid grid-cols-[98px_1fr] grid-rows-[134px_1fr] gap-6 rounded-lg bg-gray-700 p-6">
                    <Image
                      src={review.book.imageUrl}
                      alt={review.book.title}
                      width={98}
                      height={134}
                      className="rounded"
                    />

                    <div className="flex flex-col">
                      <h4 className="text-lg font-bold text-gray-100">
                        {review.book.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-400">
                        {review.book.author}
                      </p>
                      <Rating rating={review.rating} className="mt-auto" />
                    </div>

                    <p className="col-span-2 text-sm leading-relaxed text-gray-300">
                      {review.description}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
