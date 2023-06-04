'use client'

import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react'
import { useState } from 'react'

interface KeepContainerProps {
  children: React.ReactNode
}

const WheelControls: KeenSliderPlugin = (slider) => {
  let touchTimeout: ReturnType<typeof setTimeout>
  let position: {
    x: number
    y: number
  }
  let wheelActive: boolean

  function dispatch(e: WheelEvent, name: string) {
    position.x -= e.deltaX
    position.y -= e.deltaY
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    )
  }

  function wheelStart(e: WheelEvent) {
    position = {
      x: e.pageX,
      y: e.pageY,
    }
    dispatch(e, 'ksDragStart')
  }

  function wheel(e: WheelEvent) {
    dispatch(e, 'ksDrag')
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, 'ksDragEnd')
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault()
    if (!wheelActive) {
      wheelStart(e)
      wheelActive = true
    }
    wheel(e)
    clearTimeout(touchTimeout)
    touchTimeout = setTimeout(() => {
      wheelActive = false
      wheelEnd(e)
    }, 50)
  }

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, {
      passive: false,
    })
  })
}

export default function KeepContainer({ children }: KeepContainerProps) {
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        origin: 'center',
        perView: 2,
        spacing: 48,
      },
      created() {
        setLoaded(true)
      },
    },
    [WheelControls]
  )

  return (
    <div className="relative w-screen">
      <div className="keen-slider w-full min-h-[28.125rem]" ref={sliderRef}>
        {children}
      </div>

      {loaded && instanceRef.current && (
        <>
          <div className="h-full w-32 p-4 flex items-center justify-center absolute top-0 left-0 bg-gradient-arrow-left pointer-events-none">
            <button
              className="p-1 text-none text-grayscale-text hover:text-brand-light cursor-pointer pointer-events-auto"
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
              </svg>
            </button>
          </div>

          <div className="h-full w-32 p-4 flex items-center justify-center absolute top-0 right-0 bg-gradient-arrow-right pointer-events-none">
            <button
              className="p-1 text-none text-grayscale-text hover:text-brand-light cursor-pointer pointer-events-auto"
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
