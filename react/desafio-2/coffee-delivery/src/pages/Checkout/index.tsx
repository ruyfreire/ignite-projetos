import { CurrencyDollar, MapPinLine } from 'phosphor-react'
import { Header } from '../../components/Header'
import { theme } from '../../styles/themes/default'
import {
  BoxAddress,
  BoxPayment,
  BoxResumeCart,
  BoxTextTitle,
  CheckoutContainer,
  CheckoutSubTitle,
  WrapperInput,
} from './styles'

export function Checkout() {
  return (
    <div>
      <Header />

      <section className="global-container">
        <CheckoutContainer>
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
                <button>
                  <i>icone</i>
                  Cartão de crédito
                </button>
                <button>
                  <i>icone</i>
                  Cartão de débito
                </button>
                <button>
                  <i>icone</i>
                  Dinheiro
                </button>
              </div>
            </BoxPayment>
          </div>

          <div className="right-container">
            <CheckoutSubTitle>Cafés selecionados</CheckoutSubTitle>

            <BoxResumeCart>
              <div className="item-cart">
                <img src="" alt="" />
                <div>
                  <div>
                    <p>Expresso tradicional</p>
                    <div>
                      <button>-</button>
                      <input />
                      <button>+</button>
                    </div>
                    <button>
                      <i>icone</i>
                      remover
                    </button>
                  </div>

                  <p>R$ 9,90</p>
                </div>
              </div>

              <div className="item-cart">
                <img src="" alt="" />
                <div>
                  <div>
                    <p>Expresso tradicional</p>
                    <div>
                      <button>-</button>
                      <input />
                      <button>+</button>
                    </div>
                    <button>
                      <i>icone</i>
                      remover
                    </button>
                  </div>

                  <p>R$ 9,90</p>
                </div>
              </div>

              <footer>
                <p>
                  <p>Total de itens</p>
                  <p>R$ 29,70</p>
                </p>
                <p>
                  <p>Entrega</p>
                  <p>R$ 3,50</p>
                </p>
                <p className="total">
                  <p>Total</p>
                  <p>R$ 33,20</p>
                </p>

                <button>Confirmar pedido</button>
              </footer>
            </BoxResumeCart>
          </div>
        </CheckoutContainer>
      </section>
    </div>
  )
}
