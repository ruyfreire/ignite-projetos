import { LucideIcon } from "lucide-react"

interface TitleProps {
  icon?: LucideIcon
  children: string
}

export default function Title({ children, icon: Icon }: TitleProps) {
  return (
    <h1 className="col-span-2 my-10 flex items-center gap-3 text-2xl font-bold">
      {Icon && <Icon size={32} className="text-green-100" />}

      {children}
    </h1>
  )
}
