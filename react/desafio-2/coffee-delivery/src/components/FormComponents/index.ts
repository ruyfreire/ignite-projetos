import styled, { css } from 'styled-components'

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 0.75rem;
`

interface InputWrapperProps {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  error?: boolean
}

export const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme, colSpan = 8, error = false }) => css`
    grid-column: span 8;
    position: relative;

    input {
      background: ${theme.palette.base.input};
      border: 1px solid ${theme.palette.base.button};
      border-radius: 4px;
      padding: 0.75rem;
      height: 2.625rem;
      width: 100%;

      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.sm.size};
      font-weight: ${theme.font.text.sm.regular};
      line-height: ${theme.font.text.sm.height};
      color: ${theme.palette.base.text};

      &[type='number'] {
        //remove arrows input
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
          color: red !important;
        }
      }

      &::placeholder {
        color: ${theme.palette.base.label};
      }
    }

    span {
      font-size: ${theme.font.components.tag.size};
      color: ${theme.palette.base.error};
      margin-top: 0.25rem;
    }

    ${error
      ? css`
          input {
            box-shadow: 0 0 0 2px ${theme.palette.base.error};
          }

          span {
            display: block;
          }
        `
      : css`
          input:focus {
            box-shadow: 0 0 0 2px ${theme.palette.yellow.dark};
          }

          span {
            display: none;
          }
        `}

    &.complement::after {
      content: 'Opcional';
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);

      font-size: 0.75rem;
      font-style: italic;
      color: ${theme.palette.base.label};
    }

    @media (min-width: ${theme.breakpoint.large}) {
      grid-column: ${`span ${colSpan}`};
    }
  `}
`
