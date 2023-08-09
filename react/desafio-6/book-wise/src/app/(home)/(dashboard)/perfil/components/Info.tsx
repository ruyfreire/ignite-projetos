import { LucideIcon } from "lucide-react"

interface InfoProps {
  title: number | string
  description: string
  icon: LucideIcon
}

export function Info({ title, description, icon: Icon }: InfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Icon size={32} className="text-green-100" />

      <div>
        <strong className="text-gray-200">{title}</strong>

        <p className="text-sm leading-relaxed text-gray-300">{description}</p>
      </div>
    </div>
  )
}
