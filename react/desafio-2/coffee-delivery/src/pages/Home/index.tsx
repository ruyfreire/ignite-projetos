import { MapPin, ShoppingCart } from 'phosphor-react'
import ExpressoTradicional from '../../assets/images/expresso-tradicional.svg'
import Intro from '../../assets/images/intro.svg'
import Logo from '../../assets/logo.svg'

import { HeaderCart, HeaderContainer, SectionIntro } from './styles'

export function Home() {
  return (
    <div>
      <HeaderContainer>
        <div>
          <a href="#">
            <img src={Logo} alt="" />
            Coffee Delivery
          </a>

          <HeaderCart>
            <span>
              <MapPin size={22} weight="fill" /> São Paulo, SP
            </span>

            <a href="#">
              <ShoppingCart size={22} weight="fill" />
            </a>
          </HeaderCart>
        </div>
      </HeaderContainer>

      <SectionIntro>
        <img src={Intro} alt="" />
      </SectionIntro>

      <section>
        <h2>Nossos cafés</h2>

        <div>
          <div>
            <img src={ExpressoTradicional} alt="Imagem café" />
            <span>TRADICIONAL</span>
            <h4>Expresso tradicional</h4>
            <p>O tradicional café feito com água quente e grãos moídos</p>
            <footer>
              <p>
                <span>R$</span>9,90
              </p>
              <div>
                <input type="text" />
                <span>C</span>
              </div>
            </footer>
          </div>

          <div>
            <img src={ExpressoTradicional} alt="Imagem café" />
            <span>TRADICIONAL</span>
            <h4>Expresso tradicional</h4>
            <p>O tradicional café feito com água quente e grãos moídos</p>
            <footer>
              <p>
                <span>R$</span>9,90
              </p>
              <div>
                <input type="text" />
                <span>C</span>
              </div>
            </footer>
          </div>

          <div>
            <img src={ExpressoTradicional} alt="Imagem café" />
            <span>TRADICIONAL</span>
            <h4>Expresso tradicional</h4>
            <p>O tradicional café feito com água quente e grãos moídos</p>
            <footer>
              <p>
                <span>R$</span>9,90
              </p>
              <div>
                <input type="text" />
                <span>C</span>
              </div>
            </footer>
          </div>

          <div>
            <img src={ExpressoTradicional} alt="Imagem café" />
            <span>TRADICIONAL</span>
            <h4>Expresso tradicional</h4>
            <p>O tradicional café feito com água quente e grãos moídos</p>
            <footer>
              <p>
                <span>R$</span>9,90
              </p>
              <div>
                <input type="text" />
                <span>C</span>
              </div>
            </footer>
          </div>

          <div>
            <img src={ExpressoTradicional} alt="Imagem café" />
            <span>TRADICIONAL</span>
            <h4>Expresso tradicional</h4>
            <p>O tradicional café feito com água quente e grãos moídos</p>
            <footer>
              <p>
                <span>R$</span>9,90
              </p>
              <div>
                <input type="text" />
                <span>C</span>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  )
}
