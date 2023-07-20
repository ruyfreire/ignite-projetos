import Title from "@/components/Title"
import { User2 } from "lucide-react"
import AsideProfile from "./aside-profile"

export default function Perfil() {
  return (
    <>
      <Title icon={User2}>Perfil</Title>

      <main className="bg-green-300 p-4">Posts</main>

      <AsideProfile />
    </>
  )
}
