import { ThemeProvider } from 'styled-components'

import { theme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './routes'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}
