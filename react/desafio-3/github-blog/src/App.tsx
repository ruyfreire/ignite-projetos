import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'
import { Home } from './pages/Home'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <Home />
    </ThemeProvider>
  )
}
