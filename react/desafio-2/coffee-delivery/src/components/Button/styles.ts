import styled, { css } from 'styled-components'

type SizeType = 'md' | 'sm'

interface WrapperProps {
  size: SizeType
}

const sizeVariants = {
  md: css`
    padding: 1rem;
    gap: 0.75rem;
  `,
  sm: css`
    padding: 0.5rem;
    gap: 0.25rem;
  `,
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size }) => css`
    ${sizeVariants[size]};

    display: flex;
    align-items: center;

    background: ${theme.palette.base.button};
    border-radius: 6px;
    border: 0;
    cursor: pointer;

    font-family: ${theme.font.components.family};
    font-weight: ${theme.font.components.button.sm.regular};
    font-size: ${theme.font.components.button.sm.size};
    line-height: ${theme.font.components.button.sm.height};
    text-transform: ${theme.font.components.button.sm.upper};
    color: ${theme.palette.base.text};

    svg {
      color: ${theme.palette.purple.base};
    }

    &:hover:not(.selected) {
      background: ${theme.palette.base.hover};
    }

    &.selected {
      background: ${theme.palette.purple.light};
      box-shadow: 0 0 0 1px ${theme.palette.purple.base};
    }
  `}
`
