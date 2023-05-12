import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'
import { router } from './routes'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
