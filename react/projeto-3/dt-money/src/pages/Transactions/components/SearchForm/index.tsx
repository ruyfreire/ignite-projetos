import { MagnifyingGlass } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useContextTransactions } from '../../../../contexts/TransactionsContext'
import { Form } from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputsType = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { getTransactions } = useContextTransactions()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SearchFormInputsType>({
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearchTransactions = async (data: SearchFormInputsType) => {
    getTransactions(data.query)
  }

  return (
    <Form onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="search"
        placeholder="Buscar transações"
        {...register('query')}
      />

      <button disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Form>
  )
}
