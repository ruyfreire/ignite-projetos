import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

interface GetParams {
  params: {
    book_id: string
  }
}

const paramSchema = z.object({
  book_id: z.string().uuid(),
})

export async function GET(request: NextRequest, { params }: GetParams) {
  const result = paramSchema.safeParse(params)

  if (!result.success) {
    return NextResponse.json({ message: "Invalid UUID param" }, { status: 400 })
  }

  const { book_id } = result.data

  const reviewsDatabase = await prisma.review.findMany({
    where: { book_id },
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
    },
  })

  if (!reviewsDatabase) {
    return NextResponse.json(
      { message: "Book has no reviews" },
      { status: 404 },
    )
  }

  const reviews = reviewsDatabase.map((review) => {
    return {
      id: review.id,
      createdAt: review.created_at,
      rating: review.rating,
      description: review.description,
      user: {
        id: review.reviewer_user.id,
        name: review.reviewer_user.name || "",
        avatarUrl: review.reviewer_user.image || "",
      },
    }
  })

  return NextResponse.json({ reviews })
}
