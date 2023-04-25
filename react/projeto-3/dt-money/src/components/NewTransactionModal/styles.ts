import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: #00000075;
`

export const Content = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme['gray-800']};
  border-radius: 6px;
  padding: 2.5rem 3rem;

  position: fixed;
  width: 100%;
  max-width: 32rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 1rem;
      background-color: ${(props) => props.theme['gray-900']};
      border-radius: 6px;
      border: 0;
      color: ${(props) => props.theme['gray-300']};
    }

    button[type='submit'] {
      background-color: ${(props) => props.theme['green-500']};
      padding: 1rem;
      border: 0;
      border-radius: 6px;
      margin-top: 1rem;
      cursor: pointer;

      font: 700 1rem 'Roboto', sans-serif;
      color: ${(props) => props.theme.white};

      :hover {
        background-color: ${(props) => props.theme['green-700']};
        transition: background-color 0.2s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background-color: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-400']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 0.5rem 0;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item
)<TransactionTypeButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;

  background: ${(props) => props.theme['gray-700']};
  border-radius: 6px;
  border: 0;
  color: ${(props) => props.theme['gray-300']};
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.variant === 'income'
          ? props.theme['green-500']
          : props.theme['red-500']};
  }

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  &[data-state='checked'] {
    transition: background-color 0.2s;
    color: ${(props) => props.theme.white};
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }

  &[data-state='unchecked']:hover {
    background: ${(props) => props.theme['gray-600']};
  }
`
