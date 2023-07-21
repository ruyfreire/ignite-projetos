import { BookUserHeader } from "@/components/BookUserHeader"

interface ReviewProps {
  user: {
    name: string
    username: string
    avatarUrl: string
  }
  date: string
  rating: number
  children: React.ReactNode
}

export function Review({ user, date, rating, children }: ReviewProps) {
  return (
    <div className="flex flex-col gap-5 rounded-lg bg-gray-700 p-6 hover:bg-gray-600">
      <BookUserHeader user={user} date={date} rating={rating} />

      <p className="text-sm leading-relaxed text-gray-300">{children}</p>
    </div>
  )
}
