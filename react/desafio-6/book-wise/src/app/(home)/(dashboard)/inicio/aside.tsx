import CardSmall from "@/components/CardSmall"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Aside() {
  return (
    <aside>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm leading-relaxed text-gray-100">
          Livros populares
        </h3>

        <Link
          href="/livros-populares"
          className="flex items-center gap-2 text-sm font-bold leading-relaxed text-purple-100"
        >
          Ver todos
          <ChevronRight size={16} />
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        <li>
          <CardSmall
            image="/books/a-revolucao-dos-bichos.png"
            title="A revolução dos bichos"
            author="George Orwell"
            rating={5}
          />
        </li>

        <li>
          <CardSmall
            image="/books/14-habitos-de-desenvolvedores-altamente-produtivos.png"
            title="14 Hábitos de desenvolvedores altamente produtivos"
            author="Zeno Rocha"
            rating={4}
          />
        </li>

        <li>
          <CardSmall
            image="/books/o-fim-da-eternidade.png"
            title="O Fim da Eternidade"
            author="Isaac Asimov"
            rating={3}
          />
        </li>

        <li>
          <CardSmall
            image="/books/entendendo-algoritmos.png"
            title="Entendendo Algoritmos"
            author="Aditya Bhargava"
            rating={1}
          />
        </li>
      </ul>
    </aside>
  )
}
