import Image from "next/image"

import ImageBackgroundHome from "@/assets/background-home.png"
import IconGithubLogo from "@/assets/icons/github-logo.svg"
import IconGoogleLogo from "@/assets/icons/google-logo.svg"
import IconRocket from "@/assets/icons/rocket.svg"

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-2 gap-5 bg-gray-800 p-5">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={ImageBackgroundHome}
          alt=""
          className="h-full w-full object-cover"
          priority
          quality={100}
        />
        <Image
          src="/logo.svg"
          alt=""
          width={240}
          height={60}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform p-2"
          priority
        />
      </div>

      <main className="flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold">Boas vindas</h2>
          <p className="text-gray-200">
            Faça seu login ou acesse como visitante.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <button className="flex items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500">
              <Image src={IconGoogleLogo} alt="" />
              <span className="text-lg font-bold leading-relaxed text-gray-200">
                Entrar com Google
              </span>
            </button>

            <button className="flex items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500">
              <Image src={IconGithubLogo} alt="" />
              <span className="text-lg font-bold leading-relaxed text-gray-200">
                Entrar com Github
              </span>
            </button>

            <button className="flex items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 transition-colors hover:bg-gray-500">
              <Image src={IconRocket} alt="" />
              <span className="text-lg font-bold leading-relaxed text-gray-200">
                Acessar como visitante
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
