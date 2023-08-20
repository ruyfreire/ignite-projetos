import { Profile } from "@/@types/profile"
import { Avatar } from "@/components/Avatar"
import { getFormattedDate } from "@/utils/date"
import { BookOpen, Bookmark, Library, UserCheck2 } from "lucide-react"
import { Info } from "./Info"

interface AsideProfileProps {
  profile: Profile | null
}

export function AsideProfile({ profile }: AsideProfileProps) {
  const { user, infos } = profile || {}
  const { name = "", avatarUrl = "", createdAt = "" } = user || {}
  const {
    pagesRead = "",
    booksRated = "",
    authorsRead = "",
    categoryMostRead = "",
  } = infos || {}

  let { utcDate, date } = getFormattedDate(createdAt)
  let formattedDate = ""

  if (typeof date !== "string" && date.isValid()) {
    formattedDate = `membro desde ${date.year()}`
  }

  return (
    <aside>
      <div className="flex flex-col items-center border-l-2 border-l-gray-700 p-5 pt-0">
        {profile === null ? (
          <p>Sem dados do perfil do usuário</p>
        ) : (
          <>
            <Avatar alt={name} src={avatarUrl || "/profile.svg"} size="large" />

            <h2 className="mt-5 text-xl font-bold text-gray-100">{name}</h2>
            <time
              title={utcDate}
              dateTime={createdAt}
              className="text-sm leading-relaxed text-gray-400"
            >
              {formattedDate}
            </time>

            <span className="my-8 block h-1 w-8 rounded-full bg-gradient-light-horizontal" />

            <ul className="flex flex-col gap-10">
              <li>
                <Info
                  title={pagesRead}
                  description="Páginas lidas"
                  icon={BookOpen}
                />
              </li>

              <li>
                <Info
                  title={booksRated}
                  description="Livros avaliados"
                  icon={Library}
                />
              </li>

              <li>
                <Info
                  title={authorsRead}
                  description="Autores lidos"
                  icon={UserCheck2}
                />
              </li>

              <li>
                <Info
                  title={categoryMostRead || "-"}
                  description="Categoria mais lida"
                  icon={Bookmark}
                />
              </li>
            </ul>
          </>
        )}
      </div>
    </aside>
  )
}
