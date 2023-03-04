import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  padding: 1rem;
  margin: auto;
  max-width: 45rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }
`

const BaseCountdownButton = styled.button`
  border: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  padding: 1rem;
  height: 4rem;

  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
