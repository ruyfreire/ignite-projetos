import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'

import MotoboyDelivery from '../../assets/images/motoby-delivery.svg'

import { Box, BoxLine, Container, Icon, SubTitle, Title } from './styles'

export function Delivery() {
  return (
    <main className="global-container">
      <Container>
        <Title>Uhu! Pedido confirmado</Title>

        <SubTitle>
          Agora é só aguardar que logo o café chegará até você
        </SubTitle>

        <div className="box-wrapper">
          <Box>
            <BoxLine>
              <Icon>
                <MapPin size={18} weight="fill" />
              </Icon>

              <div>
                <p>
                  Entrega em <strong>Rua João Daniel Martinelli, 102</strong>
                </p>
                <p>Farrapos - Porto Alegre, RS</p>
              </div>
            </BoxLine>

            <BoxLine>
              <Icon bgColor="yellow">
                <Timer size={18} weight="fill" />
              </Icon>

              <div>
                <p>Previsão de entrega</p>
                <strong>20 min - 30 min</strong>
              </div>
            </BoxLine>

            <BoxLine>
              <Icon bgColor="yellow-dark">
                <CurrencyDollar size={18} weight="fill" />
              </Icon>

              <div>
                <p>Pagamento na entrega</p>
                <strong>Cartão de Crédito</strong>
              </div>
            </BoxLine>
          </Box>

          <img src={MotoboyDelivery} alt="" />
        </div>
      </Container>
    </main>
  )
}
