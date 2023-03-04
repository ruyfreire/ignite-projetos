import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 70rem;
  height: 100%;
  min-height: 35rem;
  max-height: 45rem;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
`
