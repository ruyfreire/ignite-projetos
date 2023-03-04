import { useContext, useEffect } from 'react'

import { differenceInSeconds } from 'date-fns'

import { CyclesContext } from '../../../../contexts/CycleContext'

import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    finishCurrentCycle,
    titlePage,
    totalSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - totalSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (diffInSeconds >= totalSeconds) {
          finishCurrentCycle()
          clearInterval(interval)
        } else {
          setSecondsPassed(diffInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, finishCurrentCycle, setSecondsPassed])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${titlePage} - ${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds, titlePage])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
