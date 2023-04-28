import { MagnifyingGlass } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { Form } from './styles'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputsType = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const getTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.getTransactions
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
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
