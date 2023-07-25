import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { Avatar } from "@/components/Avatar"
import { BookOpen, Bookmark, Library, UserCheck2 } from "lucide-react"
import { getServerSession } from "next-auth"
import { Info } from "./Info"

export async function AsideProfile() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  const name = session?.user?.name || ""
  const avatarUrl = session?.user?.image || "/profile.svg"

  return (
    <aside>
      <div className="flex flex-col items-center border-l-2 border-l-gray-700 p-5 pt-0">
        <Avatar alt={name} src={avatarUrl} size="large" />

        <h2 className="mt-5 text-xl font-bold text-gray-100">{name}</h2>
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
