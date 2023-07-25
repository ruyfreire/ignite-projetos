"use client"

import { Input } from "@/components/Input"
import { Title } from "@/components/Title"
import { Glasses } from "lucide-react"
import { useState } from "react"
import { BookExplorer } from "./components/BookExplorer"
import { Chip } from "./components/Chip"
import { ReviewDetails } from "./review-details"

interface Book {
  title: string
  author: string
  imageUrl: string
  rating: number
  read: boolean
  category: string
  pages: number
  ratingCount: number
}

const books: Book[] = [
  {
    title: "A revolução dos bichos",
    author: "George Orwell",
    imageUrl: "/books/a-revolucao-dos-bichos.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "14 Hábitos de desenvolvedores altamente produtivos",
    author: "Zeno Rocha",
    imageUrl: "/books/14-habitos-de-desenvolvedores-altamente-produtivos.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "O fim da eternidade",
    author: "Isaac Asimov",
    imageUrl: "/books/o-fim-da-eternidade.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Entendendo Algoritmos",
    author: "Aditya Y. Bhargava",
    imageUrl: "/books/entendendo-algoritmos.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Código limpo",
    author: "Robert C. Martin",
    imageUrl: "/books/codigo-limpo.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "O poder do hábito",
    author: "Charles Duhigg",
    imageUrl: "/books/o-poder-do-habito.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Arquitetura limpa",
    author: "Robert C. Martin",
    imageUrl: "/books/arquitetura-limpa.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    imageUrl: "/books/o-hobbit.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Histórias extraordinárias",
    author: "Edgar Allan Poe",
    imageUrl: "/books/historias-extraordinarias.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Refatoração",
    author: "Martin Fowler",
    imageUrl: "/books/refatoracao.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Domain-Driven Design",
    author: "Eric Evans",
    imageUrl: "/books/domain-driven-design.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Viagem ao Centro da Terra",
    author: "Julio Verne",
    imageUrl: "/books/viagem-ao-centro-da-terra.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "O guia do mochileiro das galáxias",
    author: "Douglas Adams",
    imageUrl: "/books/o-guia-do-mochileiro-das-galaxias.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "Fragmentos do Horror",
    author: "Junji Ito",
    imageUrl: "/books/fragmentos-do-horror.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
  {
    title: "O Programador Pragmático",
    author: "Andrew Hunt",
    imageUrl: "/books/o-programador-pragmatico.png",
    rating: 4,
    read: false,
    category: "Terror",
    pages: 200,
    ratingCount: 15,
  },
]

export default function Explorar() {
  const [bookSelected, setBookSelected] = useState<Book | null>(null)

  return (
    <div>
      <div className="my-10 flex items-center justify-between gap-4">
        <Title icon={Glasses}>Explorar</Title>
        <Input
          placeholder="Buscar livro ou autor"
          className="w-full max-w-md"
        />
      </div>

      <main>
        <div className="mb-12 flex flex-wrap gap-3">
          <Chip active>Tudo</Chip>
          <Chip>Computação</Chip>
          <Chip>Educação</Chip>
          <Chip>Fantasia</Chip>
          <Chip>Ficção científica</Chip>
          <Chip>Horror</Chip>
          <Chip>HQs</Chip>
          <Chip>Suspense</Chip>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(279px,_1fr))] gap-5">
          {books.map((book) => {
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
          book={{
            title: bookSelected.title,
            author: bookSelected.author,
            imageUrl: bookSelected.imageUrl,
            rating: bookSelected.rating,
            category: bookSelected.category,
            pages: bookSelected.pages,
            ratingCount: bookSelected.ratingCount,
          }}
          onClose={() => setBookSelected(null)}
        />
      )}
    </div>
  )
}
