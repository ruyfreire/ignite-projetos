import { Book } from "@/@types/books"
import { api } from "@/lib/axios"
import ExplorarBooks from "./explorer-books"

export default async function Explorar() {
  const searchBooks = async () => {
    try {
      const { data } = await api.get<{ books: Book[] }>("books")

      return data.books || []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const books = await searchBooks()

  return <ExplorarBooks initialBooks={books} />
}
