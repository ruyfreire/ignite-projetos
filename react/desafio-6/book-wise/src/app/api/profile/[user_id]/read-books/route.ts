import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../../auth/[...nextauth]/authOptions"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("next-auth.session-token")

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

    const readedBooksDatabase = await prisma.readedBooks.findMany({
      where: { user_id: userId, AND: { readed: true } },
      select: {
        id: true,
        readed: true,
        book: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return NextResponse.json(
      { read_books: readedBooksDatabase },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
