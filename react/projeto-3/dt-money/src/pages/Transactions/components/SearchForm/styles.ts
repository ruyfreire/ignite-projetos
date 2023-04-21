import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    padding: 1rem;
    border: 0;
    background-color: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    border-radius: 6px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 6px;
    cursor: pointer;
    font: 700 1rem 'Roboto';

    border: 1px solid ${(props) => props.theme['green-300']};
    background-color: transparent;
    color: ${(props) => props.theme['green-300']};

    &:hover {
      border-color: ${(props) => props.theme['green-500']};
      background-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition: all 0.2s;
    }
  }
`
