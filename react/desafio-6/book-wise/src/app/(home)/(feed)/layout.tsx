import Title from "@/components/Title"
import { Glasses } from "lucide-react"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <Title icon={Glasses}>Explorar</Title>

      <main className="w-full flex-1 bg-green-300 p-4">{children}</main>
    </div>
  )
}
