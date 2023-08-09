import Image from "next/image"
import { Rating } from "./Rating"

interface CardBookProps {
  imageUrl: string
  title: string
  author: string
  rating: number
  size?: "small" | "large"
}

export function CardBook({
  imageUrl,
  title,
  author,
  rating,
  size = "small",
}: CardBookProps) {
  const imageWidth = size === "small" ? 64 : 108
  const imageHeight = size === "small" ? 94 : 152

  return (
    <div className="flex gap-5 rounded-lg bg-gray-700 px-5 py-4 ">
      <Image
        alt={title}
        src={imageUrl}
        width={imageWidth}
        height={imageHeight}
        className="rounded"
      />

      <div className="flex flex-col overflow-hidden">
        <h4
          className="font-bold text-gray-100 text-ellipsis-block ellipsis-block-lines-2"
          title={title}
        >
          {title}
        </h4>

        <p className="text-sm leading-relaxed text-gray-400">{author}</p>

        <Rating rating={rating} className="mt-auto" />
      </div>
    </div>
  )
}
