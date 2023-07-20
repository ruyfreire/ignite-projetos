import clsx from "clsx"
import { LucideIcon } from "lucide-react"
import Link, { LinkProps } from "next/link"

interface NavLinkProps extends LinkProps {
  children: string
  icon?: LucideIcon
  active?: boolean
}

export default function NavLink({
  children,
  active,
  icon: Icon,
  ...props
}: NavLinkProps) {
  return (
    <Link
      {...props}
      className={clsx("my-2 flex items-center gap-3  leading-relaxed ", {
        "font-bold text-gray-100": active,
        "text-gray-400": !active,
      })}
    >
      <span
        className={clsx(
          "mr-1 h-full w-1 rounded-full bg-gradient-light-vertical",
          { invisible: !active },
        )}
      />

      {Icon && <Icon size={20} />}

      {children}
    </Link>
  )
}
