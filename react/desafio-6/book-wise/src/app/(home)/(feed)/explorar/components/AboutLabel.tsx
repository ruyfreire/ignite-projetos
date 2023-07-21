import { LucideIcon } from "lucide-react"

interface BookProps {
  label: string
  icon: LucideIcon
  children: React.ReactNode
}

export function AboutLabel({ label, children, icon: Icon }: BookProps) {
  return (
    <div className="flex items-center gap-4">
      <Icon size={24} className="text-green-100" />

      <div>
        <p className="text-sm leading-relaxed text-gray-300">{label}</p>

        <strong className="text-gray-200">{children}</strong>
      </div>
    </div>
  )
}
