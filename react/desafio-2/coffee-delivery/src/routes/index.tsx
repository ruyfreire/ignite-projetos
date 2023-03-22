import { createBrowserRouter } from 'react-router-dom'

import { Checkout } from '../pages/Checkout'
import { Home } from '../pages/Home'

export const routesList = {
  home: '/',
  checkout: '/checkout',
}

export const routes = createBrowserRouter([
  {
    path: routesList.home,
    element: <Home />,
  },
  {
    path: routesList.checkout,
    element: <Checkout />,
  },
])
