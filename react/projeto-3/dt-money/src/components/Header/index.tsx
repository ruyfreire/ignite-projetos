import { ButtonNewTransaction, Container, Content } from './styles'
import Logo from '../../assets/logo.svg'

export function Header() {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="" />
        <ButtonNewTransaction>Nova transação</ButtonNewTransaction>
      </Content>
    </Container>
  )
}
