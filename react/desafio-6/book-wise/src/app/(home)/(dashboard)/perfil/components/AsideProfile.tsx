import { Avatar } from "@/components/Avatar"
import { BookOpen, Bookmark, Library, UserCheck2 } from "lucide-react"
import { Info } from "./Info"

interface AsideProfileProps {
  user: {
    name: string
    avatarUrl: string
    created_at: string
  }
  infos: {
    pages_read: number
    books_rated: number
    authors_read: number
    category_most_read: string
  }
}

export function AsideProfile({ user, infos }: AsideProfileProps) {
  const { name, avatarUrl, created_at } = user
  const { pages_read, books_rated, authors_read, category_most_read } = infos

  return (
    <aside>
      <div className="flex flex-col items-center border-l-2 border-l-gray-700 p-5 pt-0">
        <Avatar alt={name} src={avatarUrl} size="large" />

        <h2 className="mt-5 text-xl font-bold text-gray-100">{name}</h2>
        <p className="text-sm leading-relaxed text-gray-400">{created_at}</p>

        <span className="my-8 block h-1 w-8 rounded-full bg-gradient-light-horizontal" />

        <ul className="flex flex-col gap-10">
          <li>
            <Info
              title={pages_read}
              description="Páginas lidas"
              icon={BookOpen}
            />
          </li>

          <li>
            <Info
              title={books_rated}
              description="Livros avaliados"
              icon={Library}
            />
          </li>

          <li>
            <Info
              title={authors_read}
              description="Autores lidos"
              icon={UserCheck2}
            />
          </li>

          <li>
            <Info
              title={category_most_read}
              description="Categoria mais lida"
              icon={Bookmark}
            />
          </li>
        </ul>
      </div>
    </aside>
  )
}
