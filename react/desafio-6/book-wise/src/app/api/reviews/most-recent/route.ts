import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  let limit = params.get("limit")

  const takeLimit = Number(limit) || 15

  const reviewsDatabase = await prisma.review.findMany({
    take: takeLimit,
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      created_at: true,
      rating: true,
      description: true,
      reviewer_user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      book: {
        select: {
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
      user: {
        id: review.reviewer_user.id,
        name: review.reviewer_user.name,
        avatarUrl: review.reviewer_user.image || "",
      },
      book: {
        title: review.book.title,
        author: review.book.author,
        imageUrl: review.book.image_url,
      },
    }
  })

  return NextResponse.json({ recent_reviews: reviews })
}
