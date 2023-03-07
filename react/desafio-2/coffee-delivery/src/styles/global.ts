import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    ${({ theme }) => css`
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      :focus {
        outline: none;
        box-shadow: 0 0 0 2px ${theme.brand.yellowDark};
      }

      body {
        background: ${theme.background};
        color: ${theme.text};
      }

      body,
      input,
      textarea,
      button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
      }

      @media (max-width: 576px) {
        html {
          font-size: 75%;
        }
      }
    `}
`
