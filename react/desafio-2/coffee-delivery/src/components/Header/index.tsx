import { MapPin, ShoppingCart } from 'phosphor-react'
import { Link } from 'react-router-dom'

import { HeaderCart, HeaderContainer } from './styles'

import Logo from '../../assets/logo.svg'
import { routesList } from '../../routes'

export function Header() {
  return (
    <HeaderContainer>
      <div className="global-container">
        <Link to={routesList.home}>
          <img src={Logo} alt="" />
          Coffee Delivery
        </Link>

        <HeaderCart>
          <span>
            <MapPin size={22} weight="fill" /> São Paulo, SP
          </span>

          <Link to={routesList.checkout}>
            <ShoppingCart size={22} weight="fill" />
          </Link>
        </HeaderCart>
      </div>
    </HeaderContainer>
  )
}
