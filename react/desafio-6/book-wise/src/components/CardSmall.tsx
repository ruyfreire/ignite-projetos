import Image from "next/image"
import Rating from "./Rating"

interface CardSmallProps {
  image: string
  title: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
}

export default function CardSmall({
  image,
  title,
  author,
  rating,
}: CardSmallProps) {
  return (
    <div className="flex gap-5 rounded-lg bg-gray-700 px-5 py-4 hover:cursor-pointer hover:shadow-card-small">
      <Image alt="" src={image} width={64} height={94} className="rounded" />

      <div className="flex flex-col overflow-hidden">
        <h4
          className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-100"
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
