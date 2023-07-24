import { Input } from "@/components/Input"
import { Rating } from "@/components/Rating"
import { Title } from "@/components/Title"
import { ChevronLeft, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AsideProfile } from "./components/AsideProfile"

export default function Perfil() {
  const myProfile = true
  return (
    <>
      {myProfile ? (
        <Title icon={User2} className="col-span-2 my-10">
          Perfil
        </Title>
      ) : (
        <Link
          href="/inicio"
          className="col-span-2 my-10 flex items-center gap-3 font-bold leading-relaxed text-gray-100"
        >
          <ChevronLeft size={20} />
          Voltar
        </Link>
      )}

      <main className="flex flex-col gap-6">
        <Input className="mb-2" placeholder="Buscar livro avaliado" />

        <div>
          <h5 className="mb-2 text-sm leading-relaxed text-gray-300">
            Há 2 dias
          </h5>

          <div className="grid grid-cols-[98px_1fr] grid-rows-[134px_1fr] gap-6 rounded-lg bg-gray-700 p-6">
            <Image
              src="/books/entendendo-algoritmos.png"
              alt="Entendendo Algoritmos"
              width={98}
              height={134}
              className="rounded"
            />

            <div className="flex flex-col">
              <h4 className="text-lg font-bold text-gray-100">
                Entendendo Algoritmos
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                Aditya Bhargava
              </p>
              <Rating rating={4} className="mt-auto" />
            </div>

            <p className="col-span-2 text-sm leading-relaxed text-gray-300">
              Tristique massa sed enim lacinia odio. Congue ut faucibus nunc
              vitae non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla
              ut et suspendisse enim suspendisse vitae. Leo non eget lacus
              sollicitudin tristique pretium quam. Mollis et luctus amet sed
              convallis varius massa sagittis. Proin sed proin at leo quis ac
              sem. Nam donec accumsan curabitur amet tortor quam sit. Bibendum
              enim sit dui lorem urna amet elit rhoncus ut. Aliquet euismod
              vitae ut turpis. Aliquam amet integer pellentesque.
            </p>
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-sm leading-relaxed text-gray-300">
            Há 4 meses
          </h5>

          <div className="grid grid-cols-[98px_1fr] grid-rows-[134px_1fr] gap-6 rounded-lg bg-gray-700 p-6">
            <Image
              src="/books/o-hobbit.png"
              alt="O Hobbit"
              width={98}
              height={134}
              className="rounded"
            />

            <div className="flex flex-col">
              <h4 className="text-lg font-bold text-gray-100">O Hobbit</h4>
              <p className="text-sm leading-relaxed text-gray-400">
                J.R.R. Tolkien
              </p>
              <Rating rating={4} className="mt-auto" />
            </div>

            <p className="col-span-2 text-sm leading-relaxed text-gray-300">
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet.
            </p>
          </div>
        </div>
      </main>

      <AsideProfile />
    </>
  )
}
