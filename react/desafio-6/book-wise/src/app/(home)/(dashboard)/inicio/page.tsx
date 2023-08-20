import { Title } from "@/components/Title"
import { LineChart } from "lucide-react"

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"
import { AsidePopularBooks } from "./components/AsidePopularBooks"
import { LastReview } from "./components/LastReview"
import { RecentReviews } from "./components/RecentReviews"

export default async function Inicio() {
  const session = await getServerSession(authOptions)

  const isAuthenticated = !!session

  return (
    <>
      <Title icon={LineChart} className="col-span-2 my-10">
        Início
      </Title>

      <main className="flex flex-1 flex-col gap-10">
        {isAuthenticated && <LastReview />}
        <RecentReviews />
      </main>

      <AsidePopularBooks />
    </>
  )
}
