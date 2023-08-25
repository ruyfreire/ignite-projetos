import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

interface PostParams {
  params: {
    book_id: string
  }
}

const paramSchema = z.object({
  book_id: z.string().uuid(),
})

const bodySchema = z.object({
  review: z
    .string({
      required_error: "Campo obrigatório",
      invalid_type_error: "Valor deve ser string",
    })
    .min(3, { message: "Digite ao menos 3 caracteres" })
    .max(450, { message: "O limite é de 450 caracteres" })
    .regex(new RegExp(/^[^<>&/*\\]+$/), {
      message: "Remover caracteres inválidos (<, >, &, /, *, \\)",
    }),
  rating: z
    .number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Valor deve ser número",
    })
    .min(1, { message: "Valor mínimo deve ser 1" })
    .max(5, { message: "Valor máximo deve ser 5" }),
})

export async function POST(request: NextRequest, context: PostParams) {
  try {
    const sessionToken = request.cookies
      .toString()
      .includes("next-auth.session-token")

    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
    }

    const session = await getServerSession(authOptions)
    const isAuthenticated = !!session

    if (!isAuthenticated) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { message: "User session not found" },
        { status: 404 },
      )
    }

    const userId = session.user.id

    const resultParams = paramSchema.safeParse(context.params)

    if (!resultParams.success) {
      return NextResponse.json(
        { message: "Invalid UUID param" },
        { status: 400 },
      )
    }

    const { book_id } = resultParams.data

    const body = await request.json()
    const result = bodySchema.safeParse(body)

    if (!result.success) {
      const responde = result.error.issues.map((issue) => {
        return {
          field: issue.path[0],
          message: issue.message,
        }
      })

      return NextResponse.json(
        { message: "Valores inválidos", errors: responde },
        { status: 400 },
      )
    }

    const book = await prisma.book.findUnique({
      where: {
        id: book_id,
      },
    })

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    const { rating, review } = result.data

    const reviewsDatabase = await prisma.review.create({
      data: {
        description: review,
        rating: rating,
        book_id: book_id,
        user_id: userId,
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
      },
    })

    const newReview = {
      id: reviewsDatabase.id,
      createdAt: reviewsDatabase.created_at,
      rating: reviewsDatabase.rating,
      description: reviewsDatabase.description,
      user: {
        id: reviewsDatabase.reviewer_user.id,
        name: reviewsDatabase.reviewer_user.name,
        avatarUrl: reviewsDatabase.reviewer_user.image || "",
      },
    }

    return NextResponse.json(
      { message: "Avaliação salva com sucesso", review: newReview },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: "Erro para salvar avaliação" },
      { status: 500 },
    )
  }
}
