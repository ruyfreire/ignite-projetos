"use client"

import { dayjs } from "@/lib/dayjs"
import { capitalizeString } from "@/utils/string"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { Avatar } from "./Avatar"
import { DialogLogin } from "./DialogLogin"
import { Rating } from "./Rating"

interface BookUserHeaderProps {
  user: {
    id: string
    name: string
    avatarUrl: string
  }
  date: string
  rating: number
}

export function BookUserHeader({ user, date, rating }: BookUserHeaderProps) {
  const [requestLogin, setRequestLogin] = useState(false)

  const session = useSession()
  const objectDate = dayjs(date)

  const distanceDate = objectDate.fromNow()
  const formattedDate = capitalizeString(distanceDate)
  const utcDate = capitalizeString(objectDate.format("LLLL"))

  const isAuthenticated = session.status === "authenticated"

  return (
    <>
      <header className="flex items-start gap-4">
        <Avatar src={user.avatarUrl || "/profile.svg"} alt={user.name} />

        <div className="flex-1">
          <p className="leading-relaxed text-gray-100">
            {isAuthenticated ? (
              <Link href={`/perfil/${user.id}`}>{user.name}</Link>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => setRequestLogin(true)}
              >
                {user.name}
              </span>
            )}
          </p>

          <time
            title={utcDate}
            dateTime={date}
            className="block text-sm leading-relaxed text-gray-400"
          >
            {formattedDate}
          </time>
        </div>

        <Rating rating={rating} />
      </header>

      {requestLogin && <DialogLogin onClose={() => setRequestLogin(false)} />}
    </>
  )
}
