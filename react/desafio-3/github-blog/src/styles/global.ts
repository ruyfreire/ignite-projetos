import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.brand.blue};
  }
  

  body, input, textarea, button {
    font: 400 1rem/1.6 'Nunito', sans-serif;
    color: ${(props) => props.theme.colors.base.text};
    background: ${(props) => props.theme.colors.base.background};
  }

  a {
    text-decoration: none;
    border-bottom: 1px solid transparent;
    
    &:hover {
      border-color: ${(props) => props.theme.colors.brand.blue};
    }
    
  }
  
`
