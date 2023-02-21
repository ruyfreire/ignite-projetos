import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    ${({ theme }) => css`
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${theme['gray-500']};
      }

      body {
        background: ${theme['gray-900']};
        color: ${theme['gray-300']};
        height: 100vh;
        padding: 1rem;
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
