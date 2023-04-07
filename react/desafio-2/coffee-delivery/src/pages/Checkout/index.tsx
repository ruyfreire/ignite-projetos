import clsx from 'clsx'
import {
  Bank,
  CaretUp,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { theme } from '../../styles/themes/default'
import {
  BoxAddress,
  BoxPayment,
  BoxResumeCart,
  BoxTextTitle,
  ButtonShowItens,
  Container,
  SubTitle,
  FooterCart,
  WrapperInput,
} from './styles'
import { routesList } from '../../routes'
import { useCartContext } from '../../contexts/CartContext'
import { CardCheckout } from '../../components/CardCheckout'
import { formatCurrency } from '../../utils/currency'

export function Checkout() {
  const navigate = useNavigate()
  const { cart } = useCartContext()

  const [showCart, setShowCart] = useState(false)

  const totalItens = cart.reduce((total, item) => item.quantity + total, 0)
  const totalValue = cart.reduce((total, item) => item.total_value + total, 0)

  return (
    <main className="global-container">
      <Container className={clsx({ 'show-cart': showCart })}>
        <div className="left-container">
          <SubTitle>Complete seu pedido</SubTitle>

          <BoxAddress>
            <BoxTextTitle>
              <MapPinLine size={22} color={theme.palette.yellow.dark} />
              <div>
                <h6>Endereço de entrega</h6>
                <p>Informe o endereço onde deseja receber seu pedido</p>
              </div>
            </BoxTextTitle>

            <form>
              <WrapperInput colSpan={3}>
                <input name="cep" placeholder="CEP" />
              </WrapperInput>

              <WrapperInput>
                <input name="street" placeholder="Rua" />
              </WrapperInput>

              <WrapperInput colSpan={3}>
                <input name="number" placeholder="Número" />
              </WrapperInput>

              <WrapperInput colSpan={5} className="complement">
                <input name="complement" placeholder="Complemento" />
              </WrapperInput>

              <WrapperInput colSpan={3}>
                <input name="district" placeholder="Bairro" />
              </WrapperInput>

              <WrapperInput colSpan={4}>
                <input name="city" placeholder="Cidade" />
              </WrapperInput>

              <WrapperInput colSpan={1}>
                <input name="uf" placeholder="UF" />
              </WrapperInput>
            </form>
          </BoxAddress>

          <BoxPayment>
            <BoxTextTitle>
              <CurrencyDollar size={22} color={theme.palette.purple.base} />
              <div>
                <h6>Endereço de entrega</h6>
                <p>Informe o endereço onde deseja receber seu pedido</p>
              </div>
            </BoxTextTitle>

            <div className="payment-options">
              <Button icon={<CreditCard size={16} />}>Cartão de crédito</Button>

              <Button icon={<Bank size={16} />}>Cartão de débito</Button>

              <Button icon={<Money size={16} />} selected>
                Dinheiro
              </Button>
            </div>
          </BoxPayment>
        </div>

        <div className="right-container">
          <SubTitle>Cafés selecionados</SubTitle>

          <BoxResumeCart className={clsx({ 'show-cart': showCart })}>
            <div className="itens-cart">
              {cart.map((item) => (
                <CardCheckout key={item.id} itemCart={item} />
              ))}
            </div>

            <ButtonShowItens onClick={() => setShowCart((state) => !state)}>
              <CaretUp size={12} weight="bold" />
              mostrar itens
            </ButtonShowItens>

            <FooterCart>
              <div className="cart-line">
                <p>Total de itens</p>
                <p>{totalItens}</p>
              </div>

              <div className="cart-line">
                <p>Entrega</p>
                <p>R$ 3,50</p>
              </div>

              <div className="cart-total">
                <p>Total</p>
                <p>{formatCurrency(totalValue, true)}</p>
              </div>

              <button onClick={() => navigate(routesList.checkoutSuccess)}>
                Confirmar pedido
              </button>
            </FooterCart>
          </BoxResumeCart>
        </div>

        <div className="backdrop" onClick={() => setShowCart(false)} />
      </Container>
    </main>
  )
}
