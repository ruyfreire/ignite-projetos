import 'styled-components'
import { theme } from '../styles/themes/default'

type ThemeTypes = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTypes {}
}
