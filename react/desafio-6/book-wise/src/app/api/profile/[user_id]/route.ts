import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
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

  const user = await prisma.user.findUnique({
    where: { id: user_id },
  })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  const reviewsDatabase = await prisma.review.findMany({
    where: { user_id },
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

  /**
   * TODO: Mudar para retornar dados do usuário
   */
  return NextResponse.json({ reviews })
}
