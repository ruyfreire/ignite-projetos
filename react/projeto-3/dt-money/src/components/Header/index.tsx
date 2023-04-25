import * as Dialog from '@radix-ui/react-dialog'

import { NewTransactionModal } from '../NewTransactionModal'
import { ButtonNewTransaction, Container, Content } from './styles'
import Logo from '../../assets/logo.svg'

export function Header() {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ButtonNewTransaction>Nova transação</ButtonNewTransaction>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </Content>
    </Container>
  )
}
