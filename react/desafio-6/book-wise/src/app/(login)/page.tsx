import Image from "next/image"

import ImageBackgroundHome from "@/assets/background-home.png"
import IconGithubLogo from "@/assets/icons/github-logo.svg"
import IconGoogleLogo from "@/assets/icons/google-logo.svg"
import IconRocket from "@/assets/icons/rocket.svg"
import SocialButton from "./components/SocialButton"

export default function Login() {
  return (
    <div className="grid w-full grid-cols-2 gap-5">
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
            <SocialButton icon={IconGoogleLogo}>Entrar com Google</SocialButton>

            <SocialButton icon={IconGithubLogo}>Entrar com Github</SocialButton>

            <SocialButton icon={IconRocket}>
              Acessar como visitante
            </SocialButton>
          </div>
        </div>
      </main>
    </div>
  )
}
