import clsx from "clsx"
import { Star } from "lucide-react"

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
}

export default function Rating({ rating, className, ...props }: RatingProps) {
  return (
    <div {...props} className={clsx("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <Star
            key={`rating-${index}`}
            size={16}
            className={clsx("text-purple-100", {
              "fill-purple-100": index < rating,
            })}
          />
        )
      })}
    </div>
  )
}
