import { Play } from 'phosphor-react'

import {
  HomeContainer,
  CountdownContainer,
  FormContainer,
  Separator,
  TaskInput,
  MinutesAmountInput,
  SubmitCountdownButton,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <span>
            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
              type="number"
              id="minutesAmount"
              placeholder="00"
              max={60}
              min={5}
              step={5}
            />

            <span>minutos.</span>
          </span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <SubmitCountdownButton type="submit">
          <Play size={24} />
          Começar
        </SubmitCountdownButton>
      </form>
    </HomeContainer>
  )
}
