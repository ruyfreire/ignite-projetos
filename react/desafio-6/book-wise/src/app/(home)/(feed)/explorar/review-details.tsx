import { Rating } from "@/components/Rating"
import { BookOpen, Bookmark, X } from "lucide-react"
import Image from "next/image"
import { AboutLabel } from "./components/AboutLabel"
import { Review } from "./components/Review"
import { WriteReview } from "./components/WriteReview"

interface ReviewDetailsProps {
  book: {
    imageUrl: string
    title: string
    author: string
    rating: number
    ratingCount: number
    category: string
    pages: number
  }
}

export function ReviewDetails({ book }: ReviewDetailsProps) {
  return (
    <>
      <aside className="modal-opened fixed right-0 top-0 z-20 flex h-screen w-full max-w-[42rem] flex-col overflow-y-auto bg-gray-800 px-12 pt-2">
        <button
          title="Fechar"
          className="my-4 self-end text-0 text-gray-400 transition-colors hover:text-gray-300"
        >
          <X size={24} />
        </button>

        <div className="mb-10 grid grid-cols-[172px,_1fr] gap-x-8 gap-y-10 rounded-lg bg-gray-700 px-8 py-6">
          <Image
            alt={book.title}
            src={book.imageUrl}
            width={172}
            height={242}
            className="rounded-lg"
          />

          <div className="flex flex-1 flex-col overflow-hidden">
            <h4
              className="text-lg font-bold text-gray-100 text-ellipsis-block ellipsis-block-lines-2"
              title={book.title}
            >
              {book.title}
            </h4>

            <p className="text-sm leading-relaxed text-gray-400">
              {book.author}
            </p>

            <Rating rating={book.rating} className="mb-1 mt-auto" />

            <p className="text-sm leading-relaxed text-gray-400">
              {book.ratingCount} avaliações
            </p>
          </div>

          <ul className="col-span-2 flex justify-between border-t-1 border-gray-600 py-6">
            <li className="flex-1">
              <AboutLabel label="Categoria" icon={Bookmark}>
                {book.category}
              </AboutLabel>
            </li>

            <li className="flex-1">
              <AboutLabel label="Páginas" icon={BookOpen}>
                {book.pages}
              </AboutLabel>
            </li>
          </ul>
        </div>

        <WriteReview />

        <ul className="flex flex-col gap-3 pb-6">
          <li>
            <Review
              user={{
                name: "Brandon Botosh",
                username: "brandon_botosh",
                avatarUrl: "/profile.svg",
              }}
              date="Há 2 dias"
              rating={4}
            >
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus
              leo. Sit porta eget nec vitae sit vulputate eget
            </Review>
          </li>

          <li>
            <Review
              user={{
                name: "Jaylon Franci",
                username: "jaylon_franci",
                avatarUrl: "/profile.svg",
              }}
              date="Há 4 meses"
              rating={4}
            >
              Nec tempor nunc in egestas.
            </Review>
          </li>

          <li>
            <Review
              user={{
                name: "James Botosh",
                username: "james_botosh",
                avatarUrl: "/profile.svg",
              }}
              date="Há 4 meses"
              rating={4}
            >
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus
              leo. Sit porta eget nec vitae sit vulputate eget
            </Review>
          </li>
        </ul>
      </aside>

      <div className="fixed inset-0 z-10 bg-black bg-opacity-60" />
    </>
  )
}
