import { LastReview } from "@/@types/review"
import { api } from "@/lib/axios"
import { ChevronRight } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { CardBookReview } from "./CardBookReview"

export async function LastReading() {
  const url = api.getUri({ url: "reviews/me", params: { limit: 1 } })
  const response = await fetch(url, { method: "GET", headers: headers() })
  const data: { last_reviews: LastReview[] } = await response.json()

  if (!data.last_reviews.length) return null

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm leading-relaxed text-gray-100">
          Sua última avaliação
        </h3>

        <Link
          href="/perfil"
          className="flex items-center gap-2 text-sm font-bold leading-relaxed text-purple-100"
        >
          Ver todas
          <ChevronRight size={16} />
        </Link>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {data.last_reviews.map((review) => {
          return (
            <li key={review.id}>
              <CardBookReview
                rating={review.rating}
                date={review.created_at}
                description={review.description}
                book={{
                  title: review.book.title,
                  author: review.book.author,
                  imageUrl: review.book.imageUrl,
                }}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
