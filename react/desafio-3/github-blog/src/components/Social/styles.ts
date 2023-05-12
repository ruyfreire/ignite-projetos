import styled from 'styled-components'

export const SocialContainer = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font: ${(props) => props.theme.fonts.text.medium};
      color: ${(props) => props.theme.colors.base.subtitle};
    }

    svg {
      color: ${(props) => props.theme.colors.base.label};
      font-size: 1.125rem;
    }
  }
`
