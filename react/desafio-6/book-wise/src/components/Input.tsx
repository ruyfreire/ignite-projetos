import clsx from "clsx"
import { Search } from "lucide-react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <label className={clsx(className, "relative block")}>
      <input
        {...props}
        className="h-12 w-full rounded border-1 border-gray-500 bg-gray-800 py-3 pl-5 pr-12 placeholder:text-sm placeholder:leading-relaxed placeholder:text-gray-400"
      />

      <Search
        size={20}
        className="absolute right-0 top-0 mr-5 h-12 text-gray-500"
      />
    </label>
  )
}
