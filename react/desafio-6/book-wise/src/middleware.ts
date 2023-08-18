import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

const paramSchema = z.string().uuid()

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/perfil") {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("user_id") || ""
    const userIdValid = paramSchema.safeParse(userId).success

    if (userId && !userIdValid) {
      return NextResponse.redirect(new URL("/perfil", request.url).href)
    }
  }
}

export const config = {
  matcher: ["/perfil"],
}
