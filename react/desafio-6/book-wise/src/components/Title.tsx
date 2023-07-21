import clsx from "clsx"
import { LucideIcon } from "lucide-react"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  icon?: LucideIcon
}

export function Title({ children, className, icon: Icon }: TitleProps) {
  return (
    <h1
      className={clsx(className, "flex items-center gap-3 text-2xl font-bold")}
    >
      {Icon && <Icon size={32} className="text-green-100" />}

      {children}
    </h1>
  )
}
