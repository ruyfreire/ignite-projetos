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

type Counter = {
  [key: string]: number
}

function countElements(list: string[]) {
  const count = list.reduce((acc: Counter, curr) => {
    if (acc[curr]) {
      acc[curr] += 1
    } else {
      acc[curr] = 1
    }

    return acc
  }, {})

  const max = Math.max(...Object.values(count))
  const element = Object.keys(count).find((key) => count[key] === max)

  return element || ""
}

export async function GET(request: NextRequest, { params }: GetParams) {
  let { user_id } = params

  if (params.user_id === "me") {
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

    user_id = session.user.id
  } else {
    const result = paramSchema.safeParse(params)

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid UUID param" },
        { status: 400 },
      )
    }
  }

  const user = await prisma.user.findUnique({
    where: { id: user_id },
  })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  const reviewsCount = await prisma.review.count({
    where: { user_id: user.id },
  })

  const readedBooksDatabase = await prisma.readedBooks.findMany({
    where: { user_id: user.id, AND: { readed: true } },
    select: {
      id: true,
      book: {
        select: {
          pages: true,
          author: true,
          categories: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  const authorsList = readedBooksDatabase.map((book) => book.book.author)
  const authors = Array.from(new Set(authorsList))

  const categoriesList = readedBooksDatabase.map((book) => book.book.categories)
  const categories = categoriesList.flat().map((category) => category.name)
  const categoryMostRead = countElements(categories)

  const profile = {
    user: {
      id: user.id,
      name: user.name || "",
      avatarUrl: user.image || "",
      createdAt: user.created_at,
    },
    infos: {
      pagesRead: readedBooksDatabase.reduce(
        (acc, curr) => acc + curr.book.pages,
        0,
      ),
      booksRated: reviewsCount,
      authorsRead: authors.length,
      categoryMostRead: categoryMostRead,
    },
  }

  return NextResponse.json({ profile })
}
