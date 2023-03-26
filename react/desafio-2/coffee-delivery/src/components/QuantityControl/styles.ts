import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    background: ${theme.palette.base.button};
    border-radius: 6px;
    padding: 0.5rem;

    button,
    input {
      background: transparent;
      border-radius: 2px;
      border: 0;
    }

    button {
      font-size: 0;
      cursor: pointer;
      color: ${theme.palette.purple.base};

      &:hover {
        color: ${theme.palette.purple.dark};
      }
    }

    input {
      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.md.size};
      font-weight: ${theme.font.text.md.regular};
      line-height: ${theme.font.text.md.height};
      text-align: center;

      color: ${theme.palette.base.title};
      width: 1.25rem;

      //remove arrows input
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  `}
`
