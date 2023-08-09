import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/authOptions"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  const isAuthenticated = !!session

  if (!isAuthenticated) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
  }

  if (!session.user?.id) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  const params = request.nextUrl.searchParams
  let limit = params.get("limit")

  const takeLimit = Number(limit) || 3

  const reviewsDatabase = await prisma.review.findMany({
    where: { user_id: session.user.id },
    take: takeLimit,
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      created_at: true,
      rating: true,
      description: true,
      book: {
        select: {
          id: true,
          author: true,
          title: true,
          image_url: true,
        },
      },
    },
  })

  const reviews = reviewsDatabase.map((review) => {
    return {
      id: review.id,
      created_at: review.created_at,
      rating: review.rating,
      description: review.description,
      book: {
        id: review.book.id,
        title: review.book.title,
        author: review.book.author,
        imageUrl: review.book.image_url,
      },
    }
  })

  return NextResponse.json({ last_reviews: reviews })
}
