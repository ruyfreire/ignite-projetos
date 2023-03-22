import styled, { css } from 'styled-components'

export const CheckoutContainer = styled.main`
  display: flex;
  gap: 2rem;
`

export const CheckoutSubTitle = styled.h4`
  ${({ theme }) => css`
    font-family: ${theme.font.title.family};
    font-weight: ${theme.font.title.xs.bold};
    font-size: ${theme.font.title.xs.size};
    line-height: ${theme.font.title.xs.height};
    color: ${theme.palette.base.subtitle};
    margin-bottom: 1rem;
  `}
`

export const BoxBase = styled.div`
  ${({ theme }) => css`
    background: ${theme.palette.base.card};
    border-radius: 6px;
    padding: 2.5rem;
  `}
`

export const BoxAddress = styled(BoxBase)`
  ${({ theme }) => css`
    form {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      flex-wrap: wrap;
      row-gap: 1rem;
      column-gap: 0.75rem;

      div {
        position: relative;
      }

      .complement::after {
        content: 'Opcional';
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);

        font-size: 0.75rem;
        font-style: italic;
        color: ${theme.palette.base.label};
      }
    }
  `}
`

interface WrapperInputProps {
  colSpan?: number
}

export const WrapperInput = styled.div<WrapperInputProps>`
  ${({ theme, colSpan = 8 }) => css`
    grid-column: ${`span ${colSpan}`};

    input {
      background: ${theme.palette.base.input};
      border: 1px solid ${theme.palette.base.button};
      border-radius: 4px;
      padding: 0.75rem;
      min-height: 2.625rem;
      width: 100%;

      font-family: ${theme.font.text.family};
      font-size: ${theme.font.text.sm.size};
      font-weight: ${theme.font.text.sm.regular};
      line-height: ${theme.font.text.sm.height};
      color: ${theme.palette.base.text};

      &::placeholder {
        color: ${theme.palette.base.label};
      }

      &:focus {
        box-shadow: 0 0 0 2px ${theme.palette.yellow.dark};
      }
    }

    @media (max-width: 768px) {
      grid-column: span 6;
    }
  `}
`

export const BoxPayment = styled(BoxBase)`
  ${({ theme }) => css``}
`

export const BoxResumeCart = styled(BoxBase)`
  ${({ theme }) => css`
    border-radius: 6px 44px;
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
