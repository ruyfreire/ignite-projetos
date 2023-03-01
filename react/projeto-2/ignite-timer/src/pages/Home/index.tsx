import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  CountdownContainer,
  FormContainer,
  Separator,
  TaskInput,
  MinutesAmountInput,
  SubmitCountdownButton,
} from './styles'

const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Nome da tarefa obrigatório'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewTask = zod.infer<typeof newTaskFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewTask>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const handleSubmitNewTask = (data: NewTask) => {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitNewTask)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
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
              {...register('minutesAmount', { valueAsNumber: true })}
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

        <SubmitCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </SubmitCountdownButton>
      </form>
    </HomeContainer>
  )
}
