import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { Table, TableContainer, TextHighlight } from './styles'

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TableContainer>
        <SearchForm />

        <Table>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <TextHighlight variant="income">R$12.000</TextHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>

            <tr>
              <td width="50%">Hambúrguer</td>
              <td>
                <TextHighlight variant="outcome">- R$59,90</TextHighlight>
              </td>
              <td>Alimentação</td>
              <td>10/04/2022</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
