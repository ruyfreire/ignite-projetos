import clsx from 'clsx'
import {
  Bank,
  CaretUp,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
  Trash,
} from 'phosphor-react'
import { useState } from 'react'

import Coffee from '../../assets/images/coffee'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { QuantityControl } from '../../components/QuantityControl'
import { theme } from '../../styles/themes/default'
import {
  BoxAddress,
  BoxPayment,
  BoxResumeCart,
  BoxTextTitle,
  ButtonShowItens,
  CheckoutContainer,
  CheckoutSubTitle,
  FooterCart,
  WrapperInput,
} from './styles'

export function Checkout() {
  const [showCart, setShowCart] = useState(false)

  return (
    <div>
      <Header />

      <section className="global-container">
        <CheckoutContainer className={clsx({ 'show-cart': showCart })}>
          <div className="left-container">
            <CheckoutSubTitle>Complete seu pedido</CheckoutSubTitle>

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
                <Button icon={<CreditCard size={16} />}>
                  Cartão de crédito
                </Button>

                <Button icon={<Bank size={16} />}>Cartão de débito</Button>

                <Button icon={<Money size={16} />} selected>
                  Dinheiro
                </Button>
              </div>
            </BoxPayment>
          </div>

          <div className="right-container">
            <CheckoutSubTitle>Cafés selecionados</CheckoutSubTitle>

            <BoxResumeCart className={clsx({ 'show-cart': showCart })}>
              <div className="itens-cart">
                <div className="item">
                  <div className="card">
                    <img src={Coffee.Expresso} alt="" />

                    <div className="card-content">
                      <p className="card-name">Expresso tradicional</p>

                      <QuantityControl />

                      <Button icon={<Trash size={16} />} size="sm">
                        Remover
                      </Button>
                    </div>

                    <p className="card-value">R$ 9,90</p>
                  </div>
                </div>

                <div className="item">
                  <div className="card">
                    <img src={Coffee.Latte} alt="" />

                    <div className="card-content">
                      <p className="card-name">Latte</p>

                      <QuantityControl />

                      <Button icon={<Trash size={16} />} size="sm">
                        Remover
                      </Button>
                    </div>

                    <p className="card-value">R$ 9,90</p>
                  </div>
                </div>
              </div>

              <ButtonShowItens onClick={() => setShowCart((state) => !state)}>
                <CaretUp size={12} weight="bold" />
                mostrar itens
              </ButtonShowItens>

              <FooterCart>
                <div className="cart-line">
                  <p>Total de itens</p>
                  <p>R$ 29,70</p>
                </div>

                <div className="cart-line">
                  <p>Entrega</p>
                  <p>R$ 3,50</p>
                </div>

                <div className="cart-total">
                  <p>Total</p>
                  <p>R$ 33,20</p>
                </div>

                <button>Confirmar pedido</button>
              </FooterCart>
            </BoxResumeCart>
          </div>

          <div className="backdrop" onClick={() => setShowCart(false)} />
        </CheckoutContainer>
      </section>
    </div>
  )
}
