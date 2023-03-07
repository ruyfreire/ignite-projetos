import { ThemeProvider } from 'styled-components'
import { theme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <h1>Coffee Delivery</h1>
    </ThemeProvider>
  )
}
