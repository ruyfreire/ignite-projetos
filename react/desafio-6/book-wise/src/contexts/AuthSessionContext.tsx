"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface AuthSessionContextProps {
  children: React.ReactNode
  session: Session | null
}

export function AuthSessionProvider({
  children,
  session,
}: AuthSessionContextProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
