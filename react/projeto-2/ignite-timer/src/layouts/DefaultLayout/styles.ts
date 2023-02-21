import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 70rem;
  height: calc(100vh - 10rem);
  padding: 2.5rem;
  margin: 5rem auto;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
`
