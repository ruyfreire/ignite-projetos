import { ShoppingCart } from 'phosphor-react'

import Coffee from '../../assets/images/coffee'
import Intro from '../../assets/images/intro.svg'
import { Header } from '../../components/Header'
import { QuantityControl } from '../../components/QuantityControl'

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
                  <QuantityControl />

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
