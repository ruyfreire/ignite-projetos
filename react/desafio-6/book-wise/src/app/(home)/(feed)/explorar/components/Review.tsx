import { Review } from "@/@types/review"
import { BookUserHeader } from "@/components/BookUserHeader"

interface ReviewProps {
  review: Review
}

export function Review({ review }: ReviewProps) {
  const { user, createdAt, rating, description } = review

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-gray-700 p-6 hover:bg-gray-600">
      <BookUserHeader user={user} date={createdAt} rating={rating} />

      <p className="text-sm leading-relaxed text-gray-300">{description}</p>
    </div>
  )
}
