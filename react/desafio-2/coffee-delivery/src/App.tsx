import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { theme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { routes } from './routes'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}
