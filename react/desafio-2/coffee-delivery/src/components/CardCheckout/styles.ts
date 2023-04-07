import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-bottom: 0.25rem;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid ${theme.palette.base.button};

    .card {
      display: flex;
      gap: 1.25rem;
      padding: 0.5rem 0.25rem;

      img {
        display: none;
      }

      .card-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        flex: 1;
      }

      .card-name {
        font-family: ${theme.font.text.family};
        font-size: ${theme.font.text.md.size};
        font-weight: ${theme.font.text.md.regular};
        line-height: ${theme.font.text.md.height};
        flex: 1;
      }

      .card-value {
        font-family: ${theme.font.text.family};
        font-size: ${theme.font.text.md.size};
        font-weight: ${theme.font.text.md.bold};
        line-height: ${theme.font.text.md.height};
        min-width: 3.75rem;
        text-align: right;
      }
    }

    @media (min-width: ${theme.breakpoint.large}) {
      padding-bottom: 1.5rem;
      margin-bottom: 1.5rem;

      .card {
        img {
          display: block;
          width: 4rem;
          height: 4rem;
        }

        .item {
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .card-content {
          align-items: flex-start;
        }

        .card-name {
          width: 100%;
          flex: initial;
        }

        .card-value {
          min-width: auto;
        }
      }
    }
  `}
`
