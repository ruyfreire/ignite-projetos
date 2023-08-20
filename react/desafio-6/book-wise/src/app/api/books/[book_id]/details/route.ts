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

  const bookDatabase = await prisma.book.findUnique({
    where: { id: book_id },
    select: {
      id: true,
      title: true,
      author: true,
      image_url: true,
      pages: true,
      categories: {
        select: {
          name: true,
        },
      },
      reviews: {
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
        orderBy: {
          created_at: "desc",
        },
      },
    },
  })

  if (!bookDatabase) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 })
  }

  const book_details = {
    id: bookDatabase.id,
    title: bookDatabase.title,
    author: bookDatabase.author,
    imageUrl: bookDatabase.image_url || "",
    rating:
      bookDatabase.reviews.reduce((acc, review) => acc + review.rating, 0) /
      bookDatabase.reviews.length,
    ratingCount: bookDatabase.reviews.length,
    categories: bookDatabase.categories.map((category) => category.name),
    pages: bookDatabase.pages,
    reviews: bookDatabase.reviews.map((review) => ({
      id: review.id,
      createdAt: review.created_at,
      rating: review.rating,
      description: review.description,
      user: {
        id: review.reviewer_user.id,
        name: review.reviewer_user.name,
        avatarUrl: review.reviewer_user.image || "",
      },
    })),
  }

  return NextResponse.json({ book_details })
}
