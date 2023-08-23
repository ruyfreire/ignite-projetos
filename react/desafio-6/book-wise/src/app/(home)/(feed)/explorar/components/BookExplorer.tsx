import { Rating } from "@/components/Rating"
import Image from "next/image"

interface BookExplorerProps {
  imageUrl: string
  title: string
  author: string
  rating: number
  read: boolean
}

export function BookExplorer({
  imageUrl,
  title,
  author,
  rating,
  read,
}: BookExplorerProps) {
  return (
    <div className="relative flex gap-5 rounded-lg bg-gray-700 px-5 py-4 hover:cursor-pointer hover:shadow-card-small">
      {read && (
        <span className="absolute right-0 top-0 rounded-bl-md rounded-tr-lg bg-green-300 px-3 py-1 text-xs font-bold uppercase leading-snug tracking-wide text-green-100">
          Lido
        </span>
      )}

      <Image
        alt={title}
        src={imageUrl}
        width={108}
        height={152}
        className="rounded"
      />

      <div className="z-10 flex flex-col overflow-hidden">
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
