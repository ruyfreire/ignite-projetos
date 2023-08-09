"use client"

import { BookUserHeader } from "@/components/BookUserHeader"
import { Rating, RatingProps } from "@/components/Rating"
import { dayjs } from "@/lib/dayjs"
import { capitalizeString } from "@/utils/string"
import Image from "next/image"
import { useState } from "react"

interface CardBookReviewProps {
  rating: RatingProps["rating"]
  date: string
  description: string
  user?: {
    id: string
    name: string
    avatarUrl: string
  }
  book: {
    title: string
    author: string
    imageUrl: string
  }
}

const MAX_DESCRIPTION_LENGTH = 100

export function CardBookReview({
  rating,
  date,
  user,
  book,
  description,
}: CardBookReviewProps) {
  const [showDescriptionComplete, setShowDescriptionComplete] = useState(false)

  const cardShowUser = !!user
  const showMore = description && description.length > MAX_DESCRIPTION_LENGTH

  function getDescription() {
    if (typeof description !== "string") return ""

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return description.slice(0, MAX_DESCRIPTION_LENGTH).concat("...")
    }

    return description
  }

  const objectDate = dayjs(date)

  const distanceDate = objectDate.fromNow()
  const formattedDate = capitalizeString(distanceDate)
  const utcDate = capitalizeString(objectDate.format("LLLL"))

  return (
    <article className="flex flex-col gap-8 rounded-lg bg-gray-700 p-6 transition-colors hover:bg-gray-600">
      {cardShowUser && (
        <BookUserHeader user={user} rating={rating} date={date} />
      )}

      <div className="flex gap-5">
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={108}
          height={152}
          className="h-[152px] w-[108px]"
        />

        <div className="flex flex-col">
          {!cardShowUser && (
            <div className="mb-3 flex items-center justify-between">
              <time
                title={utcDate}
                dateTime={date}
                className="block text-sm leading-relaxed text-gray-400"
              >
                {formattedDate}
              </time>

              <Rating rating={rating} />
            </div>
          )}
          <strong className="text-gray-100">{book.title}</strong>

          <p className="mb-4 text-sm leading-relaxed text-gray-400">
            {book.author}
          </p>

          <p className="mt-auto text-sm leading-relaxed text-gray-300">
            {showDescriptionComplete ? description : getDescription()}

            {showMore && (
              <>
                {" "}
                <span
                  onClick={() => setShowDescriptionComplete((state) => !state)}
                  className="cursor-pointer text-sm font-bold leading-relaxed text-purple-100"
                >
                  {showDescriptionComplete ? "ver menos" : "ver mais"}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </article>
  )
}
