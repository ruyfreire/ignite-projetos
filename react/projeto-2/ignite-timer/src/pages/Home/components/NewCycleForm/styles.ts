import styled from 'styled-components'

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
