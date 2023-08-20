import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { z } from "zod"

const paramSchema = z.string().cuid().or(z.string().uuid())

export default withAuth(
  function middleware(request) {
    const sessionToken = request.cookies.get("next-auth.session-token")

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/", request.url).href)
    }

    if (request.nextUrl.pathname === "/perfil") {
      const searchParams = request.nextUrl.searchParams
      const userId = searchParams.get("user_id") || ""
      const userIdValid = paramSchema.safeParse(userId).success

      if (userId && !userIdValid) {
        return NextResponse.redirect(new URL("/perfil", request.url).href)
      }
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        return params.req.cookies.size > 0
      },
    },
  },
)

export const config = {
  matcher: ["/perfil"],
}
