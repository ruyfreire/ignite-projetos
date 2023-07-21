import { BookUserHeader } from "@/components/BookUserHeader"
import { Rating, RatingProps } from "@/components/Rating"
import clsx from "clsx"
import Image from "next/image"
import Link, { LinkProps } from "next/link"

interface CardBookReviewProps {
  rating: RatingProps["rating"]
  date: string
  user?: {
    name: string
    username: string
    avatarUrl: string
  }
  book: {
    title: string
    author: string
    description: string
    imageUrl: string
    linkMore?: LinkProps["href"]
  }
}

export function CardBookReview({
  rating,
  date,
  user,
  book,
}: CardBookReviewProps) {
  const cardShowUser = !!user

  return (
    <article className="flex flex-col gap-8 rounded-lg bg-gray-700 p-6 transition-colors hover:bg-gray-600">
      {cardShowUser && (
        <BookUserHeader user={user} rating={rating} date={date} />
      )}

      <div className="flex gap-5">
        <Image src={book.imageUrl} alt={book.title} width={108} height={152} />

        <div className="flex flex-col">
          {!cardShowUser && (
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm leading-relaxed text-gray-400">{date}</p>

              <Rating rating={rating} />
            </div>
          )}
          <strong className="text-gray-100">{book.title}</strong>

          <p className="text-sm leading-relaxed text-gray-400">{book.author}</p>

          <p className="mt-auto text-sm leading-relaxed text-gray-300">
            <span
              className={clsx("text-ellipsis-block", {
                "ellipsis-block-lines-2": !cardShowUser,
                "ellipsis-block-lines-4": cardShowUser,
              })}
            >
              {book.description}
            </span>

            {book.linkMore && (
              <Link
                href="/"
                className="text-sm font-bold leading-relaxed text-purple-100"
              >
                ver mais
              </Link>
            )}
          </p>
        </div>
      </div>
    </article>
  )
}
