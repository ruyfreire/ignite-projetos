'use client'

import { useKeenSlider } from 'keen-slider/react'

interface KeepContainerProps {
  children: React.ReactNode
}

export default function KeepContainer({ children }: KeepContainerProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <div
      className="keen-slider flex w-full ml-auto min-h-[28.125rem] max-w-full-right"
      ref={sliderRef}
    >
      {children}
    </div>
  )
}
