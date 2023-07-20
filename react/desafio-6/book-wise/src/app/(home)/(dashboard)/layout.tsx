export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid w-full grid-cols-[1fr_24rem] grid-rows-[auto_1fr] gap-x-10">
      {children}
    </div>
  )
}
