import { CardBook } from "@/components/CardBook"
import { Input } from "@/components/Input"
import { Title } from "@/components/Title"
import { Glasses } from "lucide-react"
import { Chip } from "./components/Chip"
import { ReviewDetails } from "./review-details"

const books = [
  {
    title: "A revolução dos bichos",
    author: "George Orwell",
    imageUrl: "/books/a-revolucao-dos-bichos.png",
    rating: 4,
    read: false,
  },
  {
    title: "14 Hábitos de desenvolvedores altamente produtivos",
    author: "Zeno Rocha",
    imageUrl: "/books/14-habitos-de-desenvolvedores-altamente-produtivos.png",
    rating: 4,
    read: false,
  },
  {
    title: "O fim da eternidade",
    author: "Isaac Asimov",
    imageUrl: "/books/o-fim-da-eternidade.png",
    rating: 4,
    read: false,
  },
  {
    title: "Entendendo Algoritmos",
    author: "Aditya Y. Bhargava",
    imageUrl: "/books/entendendo-algoritmos.png",
    rating: 4,
    read: false,
  },
  {
    title: "Código limpo",
    author: "Robert C. Martin",
    imageUrl: "/books/codigo-limpo.png",
    rating: 4,
    read: false,
  },
  {
    title: "O poder do hábito",
    author: "Charles Duhigg",
    imageUrl: "/books/o-poder-do-habito.png",
    rating: 4,
    read: false,
  },
  {
    title: "Arquitetura limpa",
    author: "Robert C. Martin",
    imageUrl: "/books/arquitetura-limpa.png",
    rating: 4,
    read: false,
  },
  {
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    imageUrl: "/books/o-hobbit.png",
    rating: 4,
    read: false,
  },
  {
    title: "Histórias extraordinárias",
    author: "Edgar Allan Poe",
    imageUrl: "/books/historias-extraordinarias.png",
    rating: 4,
    read: false,
  },
  {
    title: "Refatoração",
    author: "Martin Fowler",
    imageUrl: "/books/refatoracao.png",
    rating: 4,
    read: false,
  },
  {
    title: "Domain-Driven Design",
    author: "Eric Evans",
    imageUrl: "/books/domain-driven-design.png",
    rating: 4,
    read: false,
  },
  {
    title: "Viagem ao Centro da Terra",
    author: "Julio Verne",
    imageUrl: "/books/viagem-ao-centro-da-terra.png",
    rating: 4,
    read: false,
  },
  {
    title: "O guia do mochileiro das galáxias",
    author: "Douglas Adams",
    imageUrl: "/books/o-guia-do-mochileiro-das-galaxias.png",
    rating: 4,
    read: false,
  },
  {
    title: "Fragmentos do Horror",
    author: "Junji Ito",
    imageUrl: "/books/fragmentos-do-horror.png",
    rating: 4,
    read: false,
  },
  {
    title: "O Programador Pragmático",
    author: "Andrew Hunt",
    imageUrl: "/books/o-programador-pragmatico.png",
    rating: 4,
    read: false,
  },
]

export default function Explorar() {
  const openDetails = false

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
              <li key={book.title}>
                <CardBook
                  author={book.author}
                  rating={book.rating}
                  title={book.title}
                  imageUrl={book.imageUrl}
                  size="large"
                />
              </li>
            )
          })}
        </ul>
      </main>

      {openDetails && (
        <ReviewDetails
          book={{
            title: "14 Hábitos de Desenvolvedores Altamente Produtivos",
            author: "Zeno Rocha",
            imageUrl:
              "/books/14-habitos-de-desenvolvedores-altamente-produtivos.png",
            rating: 4,
            category: "Computação, educação",
            pages: 160,
            ratingCount: 3,
          }}
        />
      )}
    </div>
  )
}
