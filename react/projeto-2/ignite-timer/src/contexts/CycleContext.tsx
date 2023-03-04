import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface NewCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextPropTypes {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  titlePage: string
  totalSecondsPassed: number
  createNewCycle: (data: NewCycleData) => void
  setSecondsPassed: (seconds: number) => void
  interruptCurrentCycle: () => void
  finishCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

const titlePage = 'Ignite Timer'

export const CyclesContext = createContext({} as CyclesContextPropTypes)

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatchCycles] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storageState = localStorage.getItem(
        '@ignite-timer:cycles-state:1.0.0',
      )

      if (storageState) {
        return JSON.parse(storageState)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [totalSecondsPassed, setTotalSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  const createNewCycle = (data: NewCycleData) => {
    const id = crypto.randomUUID()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatchCycles(addNewCycleAction(newCycle))
    setTotalSecondsPassed(0)
  }

  const finishCurrentCycle = () => {
    dispatchCycles(finishCycleAction())
    setTotalSecondsPassed(0)
    document.title = titlePage
  }

  const interruptCurrentCycle = () => {
    dispatchCycles(interruptCycleAction())
    document.title = titlePage
  }

  const setSecondsPassed = (seconds: number) => {
    setTotalSecondsPassed(seconds)
  }

  useEffect(() => {
    const stateToJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state:1.0.0', stateToJSON)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        titlePage,
        activeCycle,
        totalSecondsPassed,
        createNewCycle,
        setSecondsPassed,
        finishCurrentCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
