import { ReviewPopular } from "@/@types/review"
import { CardBook } from "@/components/CardBook"
import { api } from "@/lib/axios"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export async function AsidePopularBooks() {
  const { data } = await api.get<{ popular_reviews: ReviewPopular[] }>(
    "reviews/popular",
    { params: { limit: 4 } },
  )

  return (
    <aside>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm leading-relaxed text-gray-100">
          Livros populares
        </h3>

        <Link
          href="#"
          className="flex items-center gap-2 text-sm font-bold leading-relaxed text-purple-100"
        >
          Ver todos
          <ChevronRight size={16} />
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {data.popular_reviews.map((review) => {
          return (
            <li key={review.id}>
              <CardBook
                imageUrl={review.book.imageUrl}
                title={review.book.title}
                author={review.book.author}
                rating={review.rating}
              />
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
