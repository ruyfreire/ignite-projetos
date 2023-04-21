import { MagnifyingGlass } from 'phosphor-react'
import { Form } from './styles'

export function SearchForm() {
  return (
    <Form>
      <input type="text" placeholder="Buscar transações" />

      <button>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Form>
  )
}
