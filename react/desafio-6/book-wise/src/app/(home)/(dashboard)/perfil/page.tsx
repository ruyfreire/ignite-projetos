import { Profile } from "@/@types/profile"
import { LastReview } from "@/@types/review"
import { Title } from "@/components/Title"
import { api } from "@/lib/axios"
import { User2 } from "lucide-react"
import { cookies } from "next/headers"
import { AsideProfile } from "./components/AsideProfile"
import { LinkReturn } from "./components/LinkReturn"
import ReviewsProfile from "./components/ReviewsProfile"

interface RouteProps {
  params: {}
  searchParams: {
    user_id?: string
  }
}

export default async function Perfil({ searchParams }: RouteProps) {
  const userId = searchParams.user_id || "me"

  async function getLastReviews() {
    try {
      const { data } = await api.get<{ last_reviews: LastReview[] }>(
        `reviews/${userId}`,
        {
          params: { limit: 5 },
          headers: { Cookie: cookies().toString() },
        },
      )

      return data.last_reviews || []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function getProfile() {
    try {
      const { data } = await api.get<{ profile: Profile }>(
        `profile/${userId}`,
        {
          headers: { Cookie: cookies().toString() },
        },
      )

      return data.profile || null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const lastReviews = await getLastReviews()
  const profile = await getProfile()

  return (
    <>
      <div className="col-span-2 my-10">
        {userId !== "me" ? <LinkReturn /> : <Title icon={User2}>Perfil</Title>}
      </div>

      <ReviewsProfile reviews={lastReviews} userId={userId} />

      <AsideProfile profile={profile} />
    </>
  )
}
