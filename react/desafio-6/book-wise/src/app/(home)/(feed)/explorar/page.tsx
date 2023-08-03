"use client"

import { Book } from "@/@types/books"
import { Input } from "@/components/Input"
import { Loader } from "@/components/Loader"
import { Title } from "@/components/Title"
import { api } from "@/lib/axios"
import { Glasses } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { BookExplorer } from "./components/BookExplorer"
import { Chip } from "./components/Chip"
import { ReviewDetails } from "./review-details"

export default function Explorar() {
  const [bookSelected, setBookSelected] = useState<Book | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [categorySelected, setCategorySelected] = useState<string[]>([])
  const debounceSearch = useRef<NodeJS.Timeout>()

  const searchBooks = async (search?: string) => {
    try {
      const { data } = await api.get<{ books: Book[] }>("books", {
        params: search ? { search } : {},
      })

      const categoryList: string[] = data.books.reduce(
        (acc: string[], curr) => {
          return [...acc, ...curr.category]
        },
        [],
      )

      const categoryUniqueList = Array.from(new Set(categoryList))
      setCategories(categoryUniqueList)
      setCategorySelected((prevState) =>
        prevState.filter((category) => categoryUniqueList.includes(category)),
      )
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

  useEffect(() => {
    searchBooks()
  }, [])

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

        <Loader active={books.length === 0} />

        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(18rem,_22rem))] gap-5">
          {books.map((book) => {
            if (filterBookByCategory(book)) {
              return null
            }

            return (
              <li key={book.title} onClick={() => setBookSelected(book)}>
                <BookExplorer
                  author={book.author}
                  rating={book.rating}
                  title={book.title}
                  imageUrl={book.imageUrl}
                />
              </li>
            )
          })}
        </ul>
      </main>

      {!!bookSelected && (
        <ReviewDetails
          book={bookSelected}
          onClose={() => setBookSelected(null)}
        />
      )}
    </div>
  )
}
