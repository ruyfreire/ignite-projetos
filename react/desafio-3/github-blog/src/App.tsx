import { ThemeProvider } from 'styled-components'

import Logo from './assets/logo.svg'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <img src={Logo} alt="" />

      <h1>Github Blog</h1>
    </ThemeProvider>
  )
}
