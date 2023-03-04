import { produce } from 'immer'

import { CyclesActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedData?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cyclesReducer = (state: CyclesState, action: any): CyclesState => {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE: {
      const { newCycle } = action.payload
      return produce(state, (draft) => {
        draft.cycles.push(newCycle)
        draft.activeCycleId = newCycle.id
      })
    }

    case CyclesActionTypes.FINISH_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedData = new Date()
        draft.activeCycleId = null
      })
    }

    case CyclesActionTypes.INTERRUPT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    default: {
      return state
    }
  }
}
