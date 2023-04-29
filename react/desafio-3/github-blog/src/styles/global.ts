import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 1rem/1.6 'Nunito', sans-serif;
    color: ${(props) => props.theme.colors.base.text};
    background: ${(props) => props.theme.colors.base.background};
  }
  
`
