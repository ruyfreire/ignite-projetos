import Avatar from "@/components/Avatar"
import Rating from "@/components/Rating"
import Title from "@/components/Title"
import { LineChart } from "lucide-react"
import Image from "next/image"

import Link from "next/link"
import Aside from "./aside"

export default function Inicio() {
  return (
    <>
      <Title icon={LineChart}>Início</Title>

      <main className="flex flex-1 flex-col">
        <h3 className="mb-4 text-sm leading-relaxed">
          Avaliações mais recentes
        </h3>

        <ul className="flex flex-1 flex-col gap-3">
          <li>
            <article className="flex flex-col gap-8 rounded-lg bg-gray-700 p-6">
              <header className="flex items-start gap-4">
                <Avatar
                  src="https://github.com/ruyfreire.png"
                  alt="Jaxson Dias"
                />

                <div className="flex-1">
                  <h4 className="leading-relaxed text-gray-100">Jaxson Dias</h4>
                  <p className="text-sm leading-relaxed text-gray-400">Hoje</p>
                </div>

                <Rating rating={4} />
              </header>

              <div className="flex gap-5">
                <Image
                  src="/books/o-hobbit.png"
                  alt="O Hobbit"
                  width={108}
                  height={152}
                />

                <div className="flex flex-col">
                  <strong className="text-gray-100">O Hobbit</strong>

                  <p className="text-sm leading-relaxed text-gray-400">
                    J.R.R. Tolkien
                  </p>

                  <p className="mt-auto text-sm leading-relaxed text-gray-300">
                    Semper et sapien proin vitae nisi. Feugiat neque integer
                    donec et aenean posuere amet ultrices. Cras fermentum id
                    pulvinar varius leo a in. Amet libero pharetra nunc
                    elementum fringilla velit ipsum. Sed vulputate massa velit
                    nibh...{" "}
                    <Link
                      href="/"
                      className="text-sm font-bold leading-relaxed text-purple-100"
                    >
                      ver mais
                    </Link>
                  </p>
                </div>
              </div>
            </article>
          </li>

          <li>
            <article className="flex flex-col gap-8 rounded-lg bg-gray-700 p-6">
              <header className="flex items-start gap-4">
                <Avatar
                  src="https://github.com/ruyfreire.png"
                  alt="Brandon Botosh"
                />

                <div className="flex-1">
                  <h4 className="leading-relaxed text-gray-100">
                    Brandon Botosh
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-400">Ontem</p>
                </div>

                <Rating rating={4} />
              </header>

              <div className="flex gap-5">
                <Image
                  src="/books/o-guia-do-mochileiro-das-galaxias.png"
                  alt="O guia do mochileiro das galáxias"
                  width={108}
                  height={152}
                />

                <div className="flex flex-col">
                  <strong className="text-gray-100">
                    O guia do mochileiro das galáxias
                  </strong>

                  <p className="text-sm leading-relaxed text-gray-400">
                    Douglas Adams
                  </p>

                  <p className="mt-auto text-sm leading-relaxed text-gray-300">
                    Nec tempor nunc in egestas. Euismod nisi eleifend at et in
                    sagittis. Penatibus id vestibulum imperdiet a at imperdiet
                    lectus leo. Sit porta eget nec vitae sit vulputate eget
                  </p>
                </div>
              </div>
            </article>
          </li>

          <li>
            <article className="flex flex-col gap-8 rounded-lg bg-gray-700 p-6">
              <header className="flex items-start gap-4">
                <Avatar
                  src="https://github.com/ruyfreire.png"
                  alt="Lindsey Philips"
                />

                <div className="flex-1">
                  <h4 className="leading-relaxed text-gray-100">
                    Lindsey Philips
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-400">Ontem</p>
                </div>

                <Rating rating={4} />
              </header>

              <div className="flex gap-5">
                <Image
                  src="/books/entendendo-algoritmos.png"
                  alt="Entendendo Algoritmos"
                  width={108}
                  height={152}
                />

                <div className="flex flex-col">
                  <strong className="text-gray-100">
                    Entendendo Algoritmos
                  </strong>

                  <p className="text-sm leading-relaxed text-gray-400">
                    Aditya Bhargava
                  </p>

                  <p className="mt-auto text-sm leading-relaxed text-gray-300">
                    Integer at tincidunt sed mi. Venenatis nunc justo porta
                    viverra lacus scelerisque ut orci ultricies. Massa ultrices
                    lacus non lectus pellentesque cras posuere neque. Nunc nisl
                    curabitur et non. Tellus senectus elit porta lorem.
                  </p>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </main>

      <div>
        <Aside />
      </div>
    </>
  )
}
