import { Routes, Route } from 'react-router-dom'

import { Checkout } from '../pages/Checkout'
import { Home } from '../pages/Home'
import { Delivery } from '../pages/Delivery'
import { Main } from '../template/Main'

export const routesList = {
  home: '/',
  checkout: '/pedido/carrinho',
  checkoutSuccess: '/pedido/entrega',
}

export function Router() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path={routesList.home} element={<Home />} />
        <Route path={routesList.checkout} element={<Checkout />} />
        <Route path={routesList.checkoutSuccess} element={<Delivery />} />
      </Route>
    </Routes>
  )
}
