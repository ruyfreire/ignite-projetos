import Intro from '../../assets/images/intro.svg'
import { coffeesList } from '../../utils/coffees'
import { CardCatalog } from '../../components/CardCatalog'

import { Footer, SectionCatalog, SectionIntro } from './styles'

export function Home() {
  return (
    <div>
      <SectionIntro>
        <img src={Intro} alt="" />
      </SectionIntro>

      <SectionCatalog className="global-container">
        <h2>Nossos cafés</h2>

        <div>
          {coffeesList.map((coffee) => (
            <CardCatalog key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </SectionCatalog>

      <Footer>
        <h4>Coffee Delivery</h4>
      </Footer>
    </div>
  )
}
