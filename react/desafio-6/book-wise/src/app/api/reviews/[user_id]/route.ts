import { prisma } from "@/lib/prisma"
import { normalizeString, sanitizeString } from "@/utils/string"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { authOptions } from "../../auth/[...nextauth]/authOptions"

interface GetParams {
  params: {
    user_id: string
  }
}

const paramSchema = z.object({
  user_id: z.string().uuid(),
})

export async function GET(request: NextRequest, { params }: GetParams) {
  let { user_id } = params

  if (params.user_id === "me") {
    const session = await getServerSession(authOptions)

    const isAuthenticated = !!session

    if (!isAuthenticated) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
    }

    if (!session.user?.id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    user_id = session.user.id
  } else {
    const result = paramSchema.safeParse(params)

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid UUID param" },
        { status: 400 },
      )
    }

    user_id = result.data.user_id
  }

  const searchParams = request.nextUrl.searchParams
  let limit = searchParams.get("limit")
  let search = searchParams.get("search") || ""

  const normalized = normalizeString(search)
  const sanitized = sanitizeString(normalized)
  search = sanitized

  const takeLimit = Number(limit) || 3

  const reviewsDatabase = await prisma.review.findMany({
    where: { user_id, book: { title_normalized: { contains: search } } },
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
