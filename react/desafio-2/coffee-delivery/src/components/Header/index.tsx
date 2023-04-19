import { MapPin, ShoppingCart } from 'phosphor-react'
import { Link } from 'react-router-dom'

import { HeaderCart, HeaderContainer } from './styles'

import Logo from '../../assets/logo.svg'
import { routesList } from '../../routes'
import { useCartContext } from '../../contexts/CartContext'

export function Header() {
  const { coffees, completedPurchase } = useCartContext()

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

          {!completedPurchase && (
            <Link to={routesList.checkout}>
              <ShoppingCart size={22} weight="fill" />

              {coffees.length > 0 && (
                <label className="cart-qtd">{coffees.length}</label>
              )}
            </Link>
          )}
        </HeaderCart>
      </div>
    </HeaderContainer>
  )
}
