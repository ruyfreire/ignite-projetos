import styled, { css } from 'styled-components'

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
