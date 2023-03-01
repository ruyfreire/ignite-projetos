import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 70rem;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
`
