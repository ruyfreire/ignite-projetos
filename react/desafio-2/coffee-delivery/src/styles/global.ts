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
        box-shadow: 0 0 0 2px ${theme.palette.purple.base};
      }

      body {
        background: ${theme.palette.base.background};
        color: ${theme.palette.base.text};
      }

      body,
      input,
      textarea,
      button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
      }

      .global-container {
        width: ${theme.container.width};
        max-width: ${theme.container.max};
        margin: ${theme.container.margin};
        padding-left: ${theme.container.padding};
        padding-right: ${theme.container.padding};
      }

      @media (max-width: 576px) {
        html {
          font-size: 75%;
        }
      }
    `}
`
