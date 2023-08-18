"use client"

import { LastReview } from "@/@types/review"
import { Input } from "@/components/Input"
import { Loader } from "@/components/Loader"
import { Rating } from "@/components/Rating"
import { Title } from "@/components/Title"
import { api } from "@/lib/axios"
import { dayjs } from "@/lib/dayjs"
import { capitalizeString } from "@/utils/string"
import { ChevronLeft, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

interface SearchParams {
  search?: string
  limit: number
}

export default function Perfil() {
  const debounceSearch = useRef<NodeJS.Timeout>()
  const params = useSearchParams()
  const user_id = params.get("user_id")

  const [lastReviews, setLastReviews] = useState<LastReview[] | null>(null)

  const searchBooks = useCallback(
    async function (search?: string) {
      try {
        const searchParams: SearchParams = { limit: 5 }
        if (search) searchParams.search = search

        const { data } = await api.get<{ last_reviews: LastReview[] }>(
          `reviews/${user_id || "me"}`,
          { params: searchParams },
        )

        setLastReviews(data.last_reviews || [])
      } catch (error) {
        setLastReviews([])
        console.error(error)
      }
    },
    [user_id],
  )

  function handleSearchBook(event: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(debounceSearch.current)

    debounceSearch.current = setTimeout(() => {
      const { value } = event.target
      searchBooks(value)
    }, 500)
  }

  function getDate(date: string) {
    const objectDate = dayjs(date)

    const distanceDate = objectDate.fromNow()
    const formattedDate = capitalizeString(distanceDate)
    const utcDate = capitalizeString(objectDate.format("LLLL"))

    return { formattedDate, utcDate }
  }

  useEffect(() => {
    searchBooks()
  }, [searchBooks])

  return (
    <>
      {user_id ? (
        <Link
          href="/inicio"
          className="col-span-2 my-10 flex items-center gap-3 font-bold leading-relaxed text-gray-100"
        >
          <ChevronLeft size={20} />
          Voltar
        </Link>
      ) : (
        <Title icon={User2} className="col-span-2 my-10">
          Perfil
        </Title>
      )}

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
              const { formattedDate, utcDate } = getDate(review.created_at)

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
                        <Rating rating={4} className="mt-auto" />
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
    </>
  )
}
