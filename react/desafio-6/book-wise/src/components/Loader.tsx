import { Loader2 } from "lucide-react"

interface LoaderProps {
  active?: boolean
}

export function Loader({ active = false }: LoaderProps) {
  if (active === false) return null

  return (
    <div className="flex w-full justify-center">
      <Loader2 size={48} className="h-32 w-32 animate-spin text-gray-500" />
    </div>
  )
}
