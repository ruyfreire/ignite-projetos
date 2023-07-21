import Link from "next/link"
import { Avatar } from "./Avatar"
import { Rating } from "./Rating"

interface BookUserHeaderProps {
  user: {
    name: string
    username: string
    avatarUrl: string
  }
  date: string
  rating: number
}

export function BookUserHeader({ user, date, rating }: BookUserHeaderProps) {
  return (
    <header className="flex items-start gap-4">
      <Avatar src={user.avatarUrl} alt={user.name} />

      <div className="flex-1">
        <Link
          href={`/perfil/${user.username}`}
          className="leading-relaxed text-gray-100"
        >
          {user.name}
        </Link>
        <p className="text-sm leading-relaxed text-gray-400">{date}</p>
      </div>

      <Rating rating={rating} />
    </header>
  )
}
