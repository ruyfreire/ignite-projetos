import { Title } from "@/components/Title"
import { LineChart } from "lucide-react"

import { AsidePopularBooks } from "./components/AsidePopularBooks"
import { LastReading } from "./components/LastReading"
import { RecentReviews } from "./components/RecentReviews"

export default function Inicio() {
  return (
    <>
      <Title icon={LineChart} className="col-span-2 my-10">
        Início
      </Title>

      <main className="flex flex-1 flex-col gap-10">
        <LastReading />
        <RecentReviews />
      </main>

      <div>
        <AsidePopularBooks />
      </div>
    </>
  )
}
