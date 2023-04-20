import styled from 'styled-components'

export const Container = styled.header`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const Content = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ButtonNewTransaction = styled.button`
  background-color: ${(props) => props.theme['green-500']};
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: 6px;
  cursor: pointer;

  font: 700 1rem 'Roboto', sans-serif;
  color: ${(props) => props.theme.white};

  :hover {
    background-color: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }
`
