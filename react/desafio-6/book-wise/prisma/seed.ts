import { fakerPT_BR as faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

import { books } from "./seeds/books"

const prisma = new PrismaClient()

function normalizeString(value: string) {
  if (typeof value !== "string") return value
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

async function main() {
  const bookBulk: any = []
  const reviewBulk: any = []

  const resetCategory = prisma.category.deleteMany()
  const resetBook = prisma.book.deleteMany()
  const resetReview = prisma.review.deleteMany()
  const resetRead = prisma.readedBooks.deleteMany()

  books.forEach((book) => {
    const userId = faker.string.uuid()
    const bookId = faker.string.uuid()
    const readId = faker.string.uuid()

    const fullName = faker.person.fullName()
    const userEmail = faker.internet.email()

    const categories = book.category
      .split(",")
      .map((category) => category.trim())
    const connectOrCreateCategory = categories.map((category) => {
      return {
        where: { name: category },
        create: { name: category },
      }
    })

    const queryBook = prisma.book.create({
      data: {
        id: bookId,
        title: book.title,
        title_normalized: normalizeString(book.title),
        author: book.author,
        author_normalized: normalizeString(book.author),
        pages: book.pages,
        image_url: book.imageUrl,
        categories: {
          connectOrCreate: connectOrCreateCategory,
        },
        readed_books: {
          connectOrCreate: {
            where: { id: readId },
            create: {
              id: readId,
              readed: true,
              user: {
                connectOrCreate: {
                  where: { id: userId, email: userEmail },
                  create: {
                    id: userId,
                    name: fullName,
                    email: userEmail,
                  },
                },
              },
            },
          },
        },
      },
    })

    const description = faker.lorem.paragraphs({ min: 1, max: 3 })
    const rating = faker.number.int({ min: 1, max: 5 })
    const createdAt = faker.date.past()
    const queryReview = prisma.review.create({
      data: {
        description,
        rating,
        created_at: createdAt,
        book: {
          connect: {
            id: bookId,
          },
        },
        reviewer_user: {
          connectOrCreate: {
            where: { id: userId, email: userEmail },
            create: {
              name: fullName,
              email: userEmail,
              readed_books: {
                connectOrCreate: {
                  where: { id: readId },
                  create: {
                    id: readId,
                    readed: true,
                    book_id: bookId,
                  },
                },
              },
            },
          },
        },
      },
    })

    bookBulk.push(queryBook)
    reviewBulk.push(queryReview)
  })

  await prisma.$transaction([
    resetCategory,
    resetBook,
    resetReview,
    resetRead,
    ...bookBulk,
    ...reviewBulk,
  ])
}

main()
  .then(async () => {
    console.log("Tabelas foram iniciadas")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
