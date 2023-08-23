"use client"

import { Book, ReadBook } from "@/@types/books"
import { Input } from "@/components/Input"
import { Title } from "@/components/Title"
import { api } from "@/lib/axios"
import { Glasses } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { BookDetails } from "./book-details"
import { BookExplorer } from "./components/BookExplorer"
import { Chip } from "./components/Chip"

interface ExplorarBooksProps {
  initialBooks: Book[]
  readBooks: ReadBook[]
}

export default function ExplorarBooks({
  initialBooks,
  readBooks,
}: ExplorarBooksProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [categorySelected, setCategorySelected] = useState<string[]>([])
  const debounceSearch = useRef<NodeJS.Timeout>()

  const router = useRouter()
  const searchParams = useSearchParams()
  const bookId = searchParams.get("book_id")

  const searchBooks = async (search?: string) => {
    try {
      const { data } = await api.get<{ books: Book[] }>("books", {
        params: search ? { search } : {},
      })

      setBooks(data.books)
    } catch (error) {
      console.error(error)
    }
  }

  function handleFilterCategory(category: string) {
    setCategorySelected((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((item) => item !== category)
      } else {
        return [...prevState, category]
      }
    })
  }

  function filterBookByCategory(book: Book) {
    if (categorySelected.length > 0) {
      return !categorySelected.some((category) => {
        return book.category.includes(category)
      })
    } else {
      return false
    }
  }

  function handleSearchBook(event: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(debounceSearch.current)

    debounceSearch.current = setTimeout(() => {
      const { value } = event.target
      searchBooks(value)
    }, 500)
  }

  const readBooksIds: string[] = useMemo(() => {
    return readBooks.map((read) => read.book.id)
  }, [readBooks])

  const categories: string[] = useMemo(() => {
    const categoryList = books.reduce((acc: string[], curr) => {
      return [...acc, ...curr.category]
    }, [])

    return Array.from(new Set(categoryList))
  }, [books])

  useEffect(() => {
    setCategorySelected((prevState) =>
      prevState.filter((category) => categories.includes(category)),
    )
  }, [categories])

  return (
    <div>
      <div className="my-10 flex items-center justify-between gap-4">
        <Title icon={Glasses}>Explorar</Title>
        <Input
          onChange={handleSearchBook}
          placeholder="Buscar livro ou autor"
          className="w-full max-w-md"
        />
      </div>

      <main>
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => {
            return (
              <Chip
                key={category}
                active={categorySelected.includes(category)}
                onClick={() => handleFilterCategory(category)}
              >
                {category}
              </Chip>
            )
          })}
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(18rem,_22rem))] gap-5">
          {books.map((book) => {
            if (filterBookByCategory(book)) {
              return null
            }

            let url: URL | null = null
            if (global.window) {
              url = new URL(window.location.href)
              url.searchParams.append("book_id", book.id)
            }

            return (
              <li key={book.title} onClick={() => url && router.push(url.href)}>
                <BookExplorer
                  author={book.author}
                  rating={book.rating}
                  title={book.title}
                  imageUrl={book.imageUrl}
                  read={readBooksIds.includes(book.id)}
                />
              </li>
            )
          })}
        </ul>
      </main>

      {!!bookId && <BookDetails bookId={bookId} />}
    </div>
  )
}
