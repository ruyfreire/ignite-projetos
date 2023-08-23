import { Book, ReadBook } from "@/@types/books"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { api } from "@/lib/axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import ExplorarBooks from "./explorer-books"

export default async function Explorar() {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session

  const searchBooks = async () => {
    try {
      const { data } = await api.get<{ books: Book[] }>("books")

      return data.books || []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const getReadBooks = async () => {
    try {
      const { data } = await api.get<{ read_books: ReadBook[] }>(
        "profile/me/read-books",
        { headers: { Cookie: cookies().toString() } },
      )

      return data.read_books || []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const books = await searchBooks()
  let readBooks: ReadBook[] = []

  if (isAuthenticated) {
    readBooks = await getReadBooks()
  }

  return <ExplorarBooks initialBooks={books} readBooks={readBooks} />
}
