import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  gap: 1rem;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;

  span {
    color: ${(props) => props.theme['gray-100']};
    flex: 1;
    text-align: center;

    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 992px) {
    gap: 1rem;
    font-size: 6rem;
    line-height: 6rem;
  }

  @media (max-width: 576px) {
    gap: 0.5rem;

    font-size: 3rem;
    line-height: 3rem;

    span {
      padding: 1rem 0;
    }
  }
`

export const Separator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 1;
  color: ${(props) => props.theme['green-500']};
`
