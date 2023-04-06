import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.palette.base.card};
    border-radius: 0.375rem 2.25rem;
    padding: 0 1.25rem 1.25rem;

    img {
      height: 7.5rem;
      margin: -1.25rem auto 0;
    }

    .type-container {
      display: flex;
      gap: 0.25rem;
      margin: 0.875rem 0;
    }

    .type {
      font-family: ${theme.font.components.family};
      font-size: ${theme.font.components.tag.size};
      font-weight: ${theme.font.components.tag.bold};
      line-height: ${theme.font.components.tag.height};
      text-transform: ${theme.font.components.tag.upper};
      color: ${theme.palette.yellow.dark};

      padding: 0.25rem 0.5rem;
      border-radius: 20px;
      background: ${theme.palette.yellow.light};
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

        .button-cart {
          cursor: pointer;
          background: ${theme.palette.purple.dark};
          color: ${theme.palette.base.white};
          font-size: 0;
          border: 0;
          border-radius: 6px;
          padding: 0.5rem;
          transition: background 0.1s;

          &:hover {
            background: ${theme.palette.purple.base};
          }
        }
      }
    }
  `}
`
