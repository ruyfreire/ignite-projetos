import { Avatar } from "@/components/Avatar"
import { BookOpen, Bookmark, Library, UserCheck2 } from "lucide-react"
import { Info } from "./Info"

export function AsideProfile() {
  return (
    <aside>
      <div className="flex flex-col items-center border-l-2 border-l-gray-700 p-5 pt-0">
        <Avatar
          alt="Ruy Freire"
          src="https://github.com/ruyfreire.png"
          size="large"
        />

        <h2 className="mt-5 text-xl font-bold text-gray-100">Ruy Freire</h2>
        <p className="text-sm leading-relaxed text-gray-400">
          membro desde 2019
        </p>

        <span className="my-8 block h-1 w-8 rounded-full bg-gradient-light-horizontal" />

        <ul className="flex flex-col gap-10">
          <li>
            <Info title="853" description="Páginas lidas" icon={BookOpen} />
          </li>

          <li>
            <Info title="3" description="Livros avaliados" icon={Library} />
          </li>

          <li>
            <Info title="3" description="Autores lidos" icon={UserCheck2} />
          </li>

          <li>
            <Info
              title="Horror"
              description="Categoria mais lida"
              icon={Bookmark}
            />
          </li>
        </ul>
      </div>
    </aside>
  )
}
