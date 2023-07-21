import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { CardBookReview } from "./CardBookReview"

export function LastReading() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm leading-relaxed text-gray-100">
          Sua última leitura
        </h3>

        <Link
          href="/ultima-leitura"
          className="flex items-center gap-2 text-sm font-bold leading-relaxed text-purple-100"
        >
          Ver todas
          <ChevronRight size={16} />
        </Link>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        <li>
          <CardBookReview
            rating={4}
            date="Há 2 dias"
            book={{
              title: "Entendendo Algoritmos",
              author: "Aditya Bhargava",
              imageUrl: "/books/entendendo-algoritmos.png",
              description:
                "Integer at tincidunt sed mi. Venenatis nunc justo porta viverra lacus scelerisque ut orci ultricies. Massa ultrices lacus non lectus pellentesque cras posuere neque. Nunc nisl curabitur et non. Tellus senectus elit porta lorem.",
            }}
          />
        </li>
      </ul>
    </div>
  )
}
