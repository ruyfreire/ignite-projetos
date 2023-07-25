import { Rating } from "@/components/Rating"
import Image from "next/image"

interface BookExplorerProps {
  imageUrl: string
  title: string
  author: string
  rating: number
}

export function BookExplorer({
  imageUrl,
  title,
  author,
  rating,
}: BookExplorerProps) {
  return (
    <div className="flex gap-5 rounded-lg bg-gray-700 px-5 py-4 hover:cursor-pointer hover:shadow-card-small">
      <Image
        alt={title}
        src={imageUrl}
        width={108}
        height={152}
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
