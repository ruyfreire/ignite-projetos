import styled, { css } from 'styled-components'

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    left: 0;
    background: ${theme.palette.base.background};
    z-index: 50;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: ${theme.container.padding};

      > a {
        font-size: 0;

        img {
          height: 2.5rem;
        }
      }
    }
  `}
`

export const HeaderCart = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.75rem;

    span,
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 0.5rem;
      border-radius: 8px;
    }

    span {
      background: ${theme.palette.purple.light};
      color: ${theme.palette.purple.dark};
      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.sm.size};
      font-weight: ${theme.font.text.sm.regular};
      line-height: ${theme.font.text.sm.height};

      svg {
        color: ${theme.palette.purple.base};
      }
    }

    a {
      position: relative;
      background: ${theme.palette.yellow.light};
      color: ${theme.palette.yellow.dark};
    }

    .cart-qtd {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: -0.625rem;
      right: -0.625rem;

      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;

      font-family: ${theme.font.text.family};
      font-size: 0.75rem;
      font-weight: ${theme.font.text.sm.bold};
      line-height: ${theme.font.text.sm.height};
      color: ${theme.palette.base.white};
      background: ${theme.palette.yellow.dark};
    }
  `}
`
