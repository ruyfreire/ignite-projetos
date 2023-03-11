import styled, { css } from 'styled-components'

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    left: 0;
    background: ${theme.palette.base.background};

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
      background: ${theme.palette.brand.light};
      color: ${theme.palette.brand.dark};
    }
  `}
`

export const SectionIntro = styled.section`
  ${() => css`
    img {
      width: 100%;
    }
  `}
`

export const SectionCatalog = styled.section`
  ${({ theme }) => css`
    h2 {
      font-family: ${theme.font.title.family};
      font-size: ${theme.font.title.lg.size};
      font-weight: ${theme.font.title.lg.extraBold};
      line-height: ${theme.font.title.lg.height};

      margin: 2rem 0 3.375rem;
    }

    > div {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(14rem, auto));
      row-gap: 2.5rem;
      column-gap: 2rem;
    }
  `}
`

export const CardCatalog = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.palette.base.card};
    border-radius: 0 2rem 0 2rem;
    padding: 0 1.25rem 1.25rem;

    img {
      height: 7.5rem;
      margin: -1.25rem auto 0;
    }

    .type {
      font-family: ${theme.font.components.family};
      font-size: ${theme.font.components.tag.size};
      font-weight: ${theme.font.components.tag.bold};
      line-height: ${theme.font.components.tag.height};
      text-transform: ${theme.font.components.tag.upper};
      color: ${theme.palette.brand.dark};

      padding: 0.25rem 0.5rem;
      margin: 0.875rem 0;
      border-radius: 20px;
      background: ${theme.palette.brand.light};
    }

    h4 {
      font-family: ${theme.font.title.family};
      font-size: ${theme.font.title.sm.size};
      font-weight: ${theme.font.title.sm.bold};
      line-height: ${theme.font.title.sm.height};
      color: ${theme.palette.base.subtitle};

      margin-bottom: 0.5rem;
    }

    .desc {
      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.sm.size};
      font-weight: ${theme.font.text.sm.regular};
      line-height: ${theme.font.text.sm.height};
      color: ${theme.palette.base.label};

      text-align: center;
      margin-bottom: 0.5rem;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 0.5rem;
      width: 100%;
      margin-top: 2rem;

      .currency {
        font-family: ${theme.font.title.family};
        font-size: ${theme.font.title.md.size};
        font-weight: ${theme.font.title.md.extraBold};
        line-height: ${theme.font.title.md.height};
        color: ${theme.palette.base.text};

        span {
          font-family: ${theme.font.text.family};
          font-size: ${theme.font.text.sm.size};
          font-weight: ${theme.font.text.sm.regular};
          line-height: ${theme.font.text.sm.height};
        }
      }

      .box {
        display: flex;
        gap: 0.5rem;

        .button-cart,
        .box-qtd {
          border-radius: 6px;
          padding: 0.5rem;
        }

        .box-qtd {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          background: ${theme.palette.base.button};

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
        }

        .button-cart {
          cursor: pointer;
          background: ${theme.palette.purple.dark};
          color: ${theme.palette.base.white};
          font-size: 0;
          border: 0;
          transition: background 0.1s;

          &:hover {
            background: ${theme.palette.purple.base};
          }
        }
      }
    }
  `}
`

export const Footer = styled.footer`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    margin-top: 4rem;
    background: ${theme.palette.purple.dark};

    color: ${theme.palette.base.white};
  `}
`
