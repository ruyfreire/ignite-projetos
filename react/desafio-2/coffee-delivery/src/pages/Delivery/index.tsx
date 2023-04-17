import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'

import MotoboyDelivery from '../../assets/images/motoby-delivery.svg'

import { Box, BoxLine, Container, Icon, SubTitle, Title } from './styles'
import { useCartContext } from '../../contexts/CartContext'
import { PaymentTypes } from '../../reducers/cart'
import { useEffect } from 'react'

export function Delivery() {
  const { address, payment, clearCoffees } = useCartContext()

  useEffect(() => {
    clearCoffees()
  }, [])

  return (
    <main className="global-container">
      <Container>
        <Title>Uhu! Pedido confirmado</Title>

        <SubTitle>
          Agora é só aguardar que logo o café chegará até você
        </SubTitle>

        <div className="box-wrapper">
          <Box>
            {address && (
              <BoxLine>
                <Icon>
                  <MapPin size={18} weight="fill" />
                </Icon>

                <div>
                  <p>
                    Entrega em{' '}
                    <strong>
                      {address.street}, {address.number}
                    </strong>
                  </p>
                  <p>
                    {address.neighborhood} - {address.city}, {address.uf}
                  </p>
                </div>
              </BoxLine>
            )}

            <BoxLine>
              <Icon bgColor="yellow">
                <Timer size={18} weight="fill" />
              </Icon>

              <div>
                <p>Previsão de entrega</p>
                <strong>20 min - 30 min</strong>
              </div>
            </BoxLine>

            {payment && (
              <BoxLine>
                <Icon bgColor="yellow-dark">
                  <CurrencyDollar size={18} weight="fill" />
                </Icon>

                <div>
                  <p>
                    {payment.type === PaymentTypes.money
                      ? 'Pagamento na entrega'
                      : 'Pagamento com cartão'}
                  </p>
                  <strong>{payment.type}</strong>
                </div>
              </BoxLine>
            )}
          </Box>

          <img src={MotoboyDelivery} alt="" />
        </div>
      </Container>
    </main>
  )
}
