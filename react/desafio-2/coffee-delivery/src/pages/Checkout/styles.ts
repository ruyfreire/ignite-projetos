import styled, { css } from 'styled-components'

export const SubTitle = styled.h4`
  ${({ theme }) => css`
    font-family: ${theme.font.title.family};
    font-weight: ${theme.font.title.xs.bold};
    font-size: ${theme.font.title.xs.size};
    line-height: ${theme.font.title.xs.height};
    color: ${theme.palette.base.subtitle};
    margin-bottom: 1rem;
  `}
`

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2.5rem 0;
    margin-bottom: 11.5625rem;

    .right-container {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${theme.palette.base.white};
      z-index: 20;

      ${SubTitle} {
        display: none;
      }
    }

    .backdrop {
      background: transparent;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      display: none;
    }

    &.show-cart {
      .backdrop {
        display: block;
      }
    }

    @media (min-width: ${theme.breakpoint.large}) {
      display: flex;
      gap: 2rem;

      .backdrop {
        display: none;
      }

      .right-container {
        position: initial;
        background: transparent;
      }

      .right-container {
        min-width: 28rem;

        ${SubTitle} {
          display: block;
        }
      }
    }
  `}
`

export const BoxBase = styled.div`
  ${({ theme }) => css`
    background: ${theme.palette.base.card};
    border-radius: 6px;
    padding: 1rem;

    & + & {
      margin-top: 0.75rem;
    }

    @media (min-width: ${theme.breakpoint.large}) {
      padding: 2.5rem;
    }
  `}
`

export const BoxAddress = styled(BoxBase)``

export const BoxPayment = styled(BoxBase)`
  ${({ theme }) => css`
    .payment-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;

      button {
        flex: 1;
      }

      @media (min-width: ${theme.breakpoint.large}) {
        flex-direction: row;
      }
    }

    .form-payment {
      margin-top: 2rem;
    }
  `}
`

export const ButtonShowItens = styled.button`
  ${({ theme }) => css`
    border: 0;
    background: transparent;
    width: 100%;
    padding: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.25rem;

    font-family: ${theme.font.components.family};
    font-size: ${theme.font.components.tag.size};
    font-weight: ${theme.font.components.tag.bold};
    line-height: ${theme.font.components.tag.height};
    text-transform: ${theme.font.components.tag.upper};
    color: ${theme.palette.base.subtitle};

    svg {
      transition: all 0.2s;
    }

    &:focus {
      box-shadow: none;
    }

    @media (min-width: ${theme.breakpoint.large}) {
      display: none;
    }
  `}
`

export const BoxResumeCart = styled.div`
  ${({ theme }) => css`
    background: transparent;
    padding: 0.75rem;
    border-radius: 6px 44px;

    .itens-cart {
      transition: max-height 0.2s;

      max-height: 0;
      overflow: hidden;
    }

    &.show-cart {
      .itens-cart {
        max-height: 12.5rem;
        overflow: auto;
      }

      ${ButtonShowItens} {
        svg {
          transform: rotate(180deg);
        }
      }
    }

    @media (min-width: ${theme.breakpoint.large}) {
      background: ${theme.palette.base.card};
      padding: 2.5rem;

      .itens-cart {
        max-height: none;
      }
    }
  `}
`

export const BoxTextTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;

    h6 {
      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.md.size};
      font-weight: ${theme.font.text.md.regular};
      line-height: ${theme.font.text.md.height};
      color: ${theme.palette.base.subtitle};
    }

    p {
      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.sm.size};
      font-weight: ${theme.font.text.sm.regular};
      line-height: ${theme.font.text.sm.height};
      color: ${theme.palette.base.text};
    }
  `}
`

export const FooterCart = styled.footer`
  ${({ theme }) => css`
    font-size: 0.75rem;

    .cart-total,
    .cart-line {
      display: flex;
      justify-content: space-between;
    }

    .cart-line {
      margin-bottom: 0.75em;

      p {
        font-family: ${theme.font.text.family};
        font-size: ${theme.font.text.sm.size};
        font-weight: ${theme.font.text.sm.regular};
        line-height: ${theme.font.text.sm.height};
        color: ${theme.palette.base.text};
      }
    }

    .cart-total {
      margin-bottom: 1.5em;

      p {
        font-family: ${theme.font.text.family};
        font-size: ${theme.font.text.lg.size};
        font-weight: ${theme.font.text.lg.bold};
        line-height: ${theme.font.text.lg.height};
        color: ${theme.palette.base.subtitle};
      }
    }

    button {
      width: 100%;
      border: 0;
      padding: 0.75rem 0.5rem;
      border-radius: 6px;

      font-family: ${theme.font.components.family};
      font-size: ${theme.font.components.button.lg.size};
      font-weight: ${theme.font.components.button.lg.bold};
      line-height: ${theme.font.components.button.lg.height};
      text-transform: ${theme.font.components.button.lg.upper};
      color: ${theme.palette.base.white};

      &:not(:disabled) {
        background: ${theme.palette.yellow.base};
        cursor: pointer;
      }

      &:disabled {
        background: ${theme.palette.base.hover};
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${theme.palette.yellow.dark};
      }
    }

    @media (min-width: 60rem) {
      font-size: 1rem;
    }
  `}
`
