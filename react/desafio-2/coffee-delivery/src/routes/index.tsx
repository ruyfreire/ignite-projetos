import { Routes, Route } from 'react-router-dom'

import { Checkout } from '../pages/Checkout'
import { Home } from '../pages/Home'
import { Delivery } from '../pages/Delivery'
import { Header } from '../components/Header'

export const routesList = {
  home: '/',
  checkout: '/carrinho',
  checkoutSuccess: '/entrega',
}

export function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={routesList.home} element={<Home />} />
        <Route path={routesList.checkout} element={<Checkout />} />
        <Route path={routesList.checkoutSuccess} element={<Delivery />} />
      </Routes>
    </div>
  )
}
