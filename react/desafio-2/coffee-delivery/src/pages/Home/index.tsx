import { Minus, Plus, ShoppingCart } from 'phosphor-react'

import Coffee from '../../assets/images/coffee'
import Intro from '../../assets/images/intro.svg'
import { Header } from '../../components/Header'

import { CardCatalog, Footer, SectionCatalog, SectionIntro } from './styles'

export function Home() {
  return (
    <div>
      <Header />

      <SectionIntro>
        <img src={Intro} alt="" />
      </SectionIntro>

      <SectionCatalog className="global-container">
        <h2>Nossos cafés</h2>

        <div>
          {Object.entries(Coffee).map(([name, image]) => (
            <CardCatalog key={name}>
              <img src={image} alt={`Imagem do ${name}`} />

              <label className="type">Tradicional</label>

              <h4>Expresso Tradicional</h4>

              <p className="desc">
                O tradicional café feito com água quente e grãos moídos
              </p>

              <footer>
                <p className="currency">
                  <span>R$ </span>9,90
                </p>

                <div className="box">
                  <div className="box-qtd">
                    <button>
                      <Minus size={20} weight="bold" />
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      step={1}
                      defaultValue={1}
                    />
                    <button>
                      <Plus size={20} weight="bold" />
                    </button>
                  </div>

                  <button className="button-cart">
                    <ShoppingCart size={22} weight="fill" />
                  </button>
                </div>
              </footer>
            </CardCatalog>
          ))}
        </div>
      </SectionCatalog>

      <Footer>
        <h4>Coffee Delivery</h4>
      </Footer>
    </div>
  )
}
