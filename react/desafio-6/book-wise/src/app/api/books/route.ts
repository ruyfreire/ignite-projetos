import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  let search = params.get("search") || ""

  const normalized = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const sanitized = normalized.replace(/[^a-zA-Z0-9 -.,]/g, "")

  if (sanitized) {
    search = sanitized
  }

  const booksDatabase = await prisma.book.findMany({
    where: {
      OR: [
        { author_normalized: { contains: search, mode: "insensitive" } },
        { title_normalized: { contains: search, mode: "insensitive" } },
      ],
    },
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
          rating: true,
        },
      },
    },
  })

  const books = booksDatabase.map((book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      imageUrl: book.image_url || "",
      category: book.categories.map((category) => category.name),
      pages: book.pages,
      rating: Math.floor(
        book.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
          book.reviews.length,
      ),
      ratingCount: book.reviews.length,
    }
  })

  return NextResponse.json({ books })
}
