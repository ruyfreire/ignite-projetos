import { Cycle } from './reducer'

/* eslint no-unused-vars:
  [2, { "varsIgnorePattern":
    "ADD_NEW_CYCLE|FINISH_CYCLE|INTERRUPT_CYCLE"
  }]
*/
export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
}

export const addNewCycleAction = (newCycle: Cycle) => {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}

export const finishCycleAction = () => {
  return {
    type: CyclesActionTypes.FINISH_CYCLE,
  }
}

export const interruptCycleAction = () => {
  return {
    type: CyclesActionTypes.INTERRUPT_CYCLE,
  }
}
