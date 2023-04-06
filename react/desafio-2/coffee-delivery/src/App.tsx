import { ThemeProvider } from 'styled-components'

import { theme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './contexts/CartContext'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <CartContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CartContextProvider>
    </ThemeProvider>
  )
}
