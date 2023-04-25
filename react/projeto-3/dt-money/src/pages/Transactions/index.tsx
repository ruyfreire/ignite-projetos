import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { useContextTransactions } from '../../contexts/TransactionsContext'

import { Table, TableContainer, TextHighlight } from './styles'

export function Transactions() {
  const { transactions } = useContextTransactions()

  return (
    <div>
      <Header />
      <Summary />

      <TableContainer>
        <SearchForm />

        <Table>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <TextHighlight variant={transaction.type}>
                    {transaction.price}
                  </TextHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
