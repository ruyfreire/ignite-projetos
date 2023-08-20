-- DropForeignKey
ALTER TABLE "readed_books" DROP CONSTRAINT "readed_books_book_id_fkey";

-- DropForeignKey
ALTER TABLE "readed_books" DROP CONSTRAINT "readed_books_user_id_fkey";

-- AddForeignKey
ALTER TABLE "readed_books" ADD CONSTRAINT "readed_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readed_books" ADD CONSTRAINT "readed_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
