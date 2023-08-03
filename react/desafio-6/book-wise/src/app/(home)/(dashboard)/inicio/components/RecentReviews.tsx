import { ReviewRecent } from "@/@types/review"
import { api } from "@/lib/axios"
import { CardBookReview } from "./CardBookReview"

export async function RecentReviews() {
  const { data } = await api.get<{ recent_reviews: ReviewRecent[] }>(
    "reviews/most-recent",
    { params: { limit: 10 } },
  )

  return (
    <div>
      <h3 className="mb-4 text-sm leading-relaxed">Avaliações mais recentes</h3>

      <ul className="flex flex-1 flex-col gap-3">
        {data.recent_reviews.map((review) => {
          return (
            <li key={review.id}>
              <CardBookReview
                rating={review.rating}
                date={review.created_at}
                description={review.description}
                user={{
                  name: review.user.name,
                  id: review.user.id,
                  avatarUrl: review.user.avatarUrl,
                }}
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
