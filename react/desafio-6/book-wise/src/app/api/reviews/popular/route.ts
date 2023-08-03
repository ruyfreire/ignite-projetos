import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  let limit = params.get("limit")

  const takeLimit = Number(limit) || 10

  const popularReviews = await prisma.review.groupBy({
    by: ["book_id"],
    take: takeLimit,
    _avg: {
      rating: true,
    },
    orderBy: {
      _sum: {
        rating: "desc",
      },
    },
  })

  const reviewsDatabase = await prisma.review.findMany({
    where: { book_id: { in: popularReviews.map((review) => review.book_id) } },
    select: {
      id: true,
      rating: true,
      book: {
        select: {
          id: true,
          title: true,
          author: true,
          image_url: true,
        },
      },
    },
  })

  const reviews = []
  for (const popular of popularReviews) {
    const review = reviewsDatabase.find(
      (review) => review.book.id === popular.book_id,
    )

    if (!review || !popular._avg.rating) {
      continue
    }

    reviews.push({
      id: review.id,
      rating: popular._avg.rating,
      book: {
        title: review.book.title,
        author: review.book.author,
        imageUrl: review.book.image_url,
      },
    })
  }

  return NextResponse.json({ popular_reviews: reviews, popularReviews })
}
