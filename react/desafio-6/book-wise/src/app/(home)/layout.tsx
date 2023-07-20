import NavBar from "@/components/NavBar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid w-full grid-cols-[14.5rem_minmax(1rem,_96rem)] gap-10">
      <NavBar />

      {children}
    </div>
  )
}
