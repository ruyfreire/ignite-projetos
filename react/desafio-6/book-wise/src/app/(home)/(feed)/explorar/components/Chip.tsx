import clsx from "clsx"

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function Chip({ children, active, ...props }: ChipProps) {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "rounded-full border-1 border-purple-100 px-4 py-1 leading-relaxed transition-colors",
        {
          "border-purple-200 bg-purple-200 text-gray-100": active,
          "border-purple-100 text-purple-100": !active,
        },
      )}
    >
      {children}
    </button>
  )
}
