import styled, { css } from 'styled-components'
import { theme as themeDefault } from '../../styles/themes/default'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2rem 0;

    .box-wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2.5rem;
    }

    img {
      max-width: 100%;
    }

    @media (min-width: ${theme.breakpoint.large}) {
      padding: 5rem 0;

      .box-wrapper {
        justify-content: space-between;
      }
    }
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    font-family: ${theme.font.title.family};
    font-weight: ${theme.font.title.lg.extraBold};
    font-size: ${theme.font.title.lg.size};
    line-height: ${theme.font.title.lg.height};
    color: ${theme.palette.yellow.dark};
    margin-bottom: 0.25rem;
    text-align: center;

    @media (min-width: ${theme.breakpoint.large}) {
      text-align: left;
    }
  `}
`

export const SubTitle = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.font.text.family};
    font-weight: ${theme.font.text.lg.regular};
    font-size: ${theme.font.text.lg.size};
    line-height: ${theme.font.text.lg.height};
    color: ${theme.palette.base.subtitle};
    text-align: center;

    @media (min-width: ${theme.breakpoint.large}) {
      text-align: left;
    }
  `}
`

export const Box = styled.div`
  ${({ theme }) => css`
    padding: 2.5rem;
    border-radius: 6px 36px;
    border: 1px solid transparent;
    background: ${`
        linear-gradient(${theme.palette.base.background}, ${theme.palette.base.background}) padding-box,
        linear-gradient(to right, ${theme.palette.yellow.base}, ${theme.palette.purple.base}) border-box
    `};
  `}
`

export const BoxLine = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    & + & {
      margin-top: 2rem;
    }

    div {
      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.md.size};
      line-height: ${theme.font.text.md.height};
      color: ${theme.palette.base.subtitle};
    }
  `}
`

const COLORS = {
  purple: themeDefault.palette.purple.base,
  yellow: themeDefault.palette.yellow.base,
  'yellow-dark': themeDefault.palette.yellow.dark,
}

interface IconProps {
  bgColor?: keyof typeof COLORS
}

export const Icon = styled.i<IconProps>`
  ${({ theme, bgColor = 'purple' }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;

    color: ${theme.palette.base.white};
    background: ${COLORS[bgColor]};
  `}
`
