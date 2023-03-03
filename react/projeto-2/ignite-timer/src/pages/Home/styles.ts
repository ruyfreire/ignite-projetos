import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  padding: 4rem 1rem;
  margin: auto;
  max-width: 43rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
`

const BaseInput = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  color: ${(props) => props.theme['gray-100']};
  padding: 0.5rem;
  height: 2.5rem;
  text-align: center;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  &:focus {
    box-shadow: none;
  }

  &:not(:disabled):hover {
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4.5rem;
`

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

  /* @media (max-width: 576px) {
    gap: 0.5rem;

    font-size: 3rem;
    line-height: 1rem;

    span {
      padding: 1rem 0;
    }
  } */
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
